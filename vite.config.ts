import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { blogPosts } from './components/blogPosts';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), tailwindcss(), {
        name: 'public-sitemap',
        generateBundle() {
          const origin = 'https://www.capemaywebdesign.com';
          const paths = ['/', '/blog', '/privacy', '/terms', ...blogPosts.map(post => `/blog/${post.slug}`)];
          const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
          this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source:
            '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            + [...new Set(paths)].map(path => `  <url><loc>${escape(origin + path)}</loc></url>`).join('\n')
            + '\n</urlset>\n'
          });
        },
      }],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            terms: path.resolve(__dirname, 'terms.html'),
            privacy: path.resolve(__dirname, 'privacy.html'),
            blog: path.resolve(__dirname, 'blog.html'),
            terms_dir: path.resolve(__dirname, 'terms/index.html'),
            privacy_dir: path.resolve(__dirname, 'privacy/index.html'),
            blog_dir: path.resolve(__dirname, 'blog/index.html'),
          }
        }
      }
    };
});
