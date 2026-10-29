import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { pathToFileURL } from 'node:url';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

// Render existing React pages at build time. No browser, API, or runtime server needed.
await build({ configFile: false, plugins: [react()], build: { ssr: 'scripts/render.tsx', outDir: 'dist-ssr', rollupOptions: { output: { entryFileNames: 'render.mjs' } } } });
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
try {
  const { paths, render } = await import(pathToFileURL(path.resolve('dist-ssr/render.mjs')).href);
  const template = await readFile('dist/index.html', 'utf8');
  for (const route of [...paths, '/404']) {
    const { html, metadata } = render(route);
    let page = template
      .replace(/<script id="seo-metadata"[\s\S]*?<\/script>/, '')
      .replace(/<!-- Initial SEO Metadata Loader -->\s*<script>[\s\S]*?<\/script>/, '')
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(metadata.title)}</title>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    const image = metadata.ogImage || 'https://www.capemaywebdesign.com/img/projects/og.jpg';
    for (const [attribute, name, value] of [
      ['name', 'description', metadata.description], ['property', 'og:title', metadata.title],
      ['name', 'twitter:title', metadata.title], ['property', 'og:description', metadata.description],
      ['name', 'twitter:description', metadata.description], ['property', 'og:image', image],
      ['name', 'twitter:image', metadata.twitterImage || image],
      ['property', 'og:url', metadata.canonicalUrl || ''],
    ]) {
      page = page.replace(new RegExp(`<meta ${attribute}="${name}"[^>]*>`), `<meta ${attribute}="${name}" content="${escape(value)}" />`);
    }
    page = page.replace(/<link rel="canonical"[^>]*>/, metadata.canonicalUrl ? `<link rel="canonical" href="${escape(metadata.canonicalUrl)}" />` : '');
    if (route !== '/') page = page.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
    if (route === '/404') page = page.replace('</head>', '<meta name="robots" content="noindex,follow" /></head>');
    // Existing reveal animations must not conceal readable content without JavaScript.
    page = page.replace('</head>', '<noscript><style>#root .opacity-0{opacity:1!important;transform:none!important}</style></noscript></head>');
    const output = route === '/' ? 'dist/index.html' : `dist${route}.html`;
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, page);
  }
  // One canonical HTML file per route; Vercel cleanUrls serves these paths directly.
  for (const route of ['blog', 'privacy', 'terms']) await rm(`dist/${route}/index.html`, { force: true });
  console.log(`Prerendered ${paths.length} pages and a custom 404.`);
} finally {
  await rm('dist-ssr', { recursive: true, force: true });
}
