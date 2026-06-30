import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), tailwindcss()],
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
