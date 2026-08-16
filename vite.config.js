import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const BUILD_DIR = join(import.meta.dirname, 'build', 'client');

/**
 * Make `vite preview` resolve extensionless URLs to their prerendered
 * `index.html`, the way Netlify and Vercel do.
 *
 * Without this, `/ta` falls through to the SPA fallback (which is English)
 * while only `/ta/` serves the real Tamil page — so local verification would
 * disagree with production and hide real problems.
 */
function previewPrettyUrls() {
  return {
    name: 'preview-pretty-urls',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const [path, query] = (req.url ?? '/').split('?');
        if (path !== '/' && !path.endsWith('/') && !path.split('/').pop().includes('.')) {
          if (existsSync(join(BUILD_DIR, path, 'index.html'))) {
            req.url = `${path}/index.html${query ? `?${query}` : ''}`;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), previewPrettyUrls()],
  build: {
    // Mid-range Android over patchy data is the target device; keep chunks honest.
    chunkSizeWarningLimit: 300,
  },
});
