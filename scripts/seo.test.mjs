import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const origin = 'https://www.capemaywebdesign.com';
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
for (const url of urls) {
  test(`crawlable page and canonical: ${url}`, async () => {
    const route = new URL(url).pathname;
    const html = await readFile(route === '/' ? 'dist/index.html' : `dist${route}.html`, 'utf8');
    assert.match(html, /<h1[\s>]/);
    assert.match(html, /<main[\s>]/);
    assert.ok(html.includes(`rel="canonical" href="${url}"`));
    assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1);
    assert.ok(!html.includes('id="seo-metadata"'));
    assert.ok(!html.includes('<div id="root"></div>'));
    if (route.startsWith('/blog/')) {
      assert.ok(!html.includes(`rel="canonical" href="${origin}/"`));
      assert.match(html, /<title>(?!Cape May Web Design \|)[^<]+<\/title>/);
    }
  });
}
test('unknown routes are not rewritten to homepage', async () => {
  const config = JSON.parse(await readFile('vercel.json', 'utf8'));
  assert.equal(config.rewrites, undefined);
  assert.equal(config.cleanUrls, true);
  const html = await readFile('dist/404.html', 'utf8');
  assert.match(html, /Page not found/);
  assert.match(html, /noindex,follow/);
  assert.doesNotMatch(html, /rel="canonical"/);
  assert.ok(!urls.some(url => url.endsWith('/404')));
});
