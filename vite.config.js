import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

import { createMemoryStore, createVisitorStore, handleVisitors } from './server/visitors.js';

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

/**
 * Serve `/api/visitors` from `vite dev` and `vite preview` using the same
 * handler as the Netlify/Vercel functions. Uses Redis when the Upstash
 * variables are in `.env`, otherwise an in-memory store so the counter still
 * works locally without touching the production count.
 */
function visitorApi(env) {
  let store;
  const getStore = () => {
    if (!store) {
      store = createVisitorStore(env);
      if (!store) {
        store = createMemoryStore();
        console.info('Visitor counter: Upstash not configured, using an in-memory count.');
      }
    }
    return store;
  };

  const middleware = async (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/visitors') return next();
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const headers = Object.entries(req.headers).filter(([, value]) => typeof value === 'string');
      const request = new Request(new URL(req.url, `http://${req.headers.host}`), {
        method: req.method,
        headers,
        body: req.method === 'GET' || req.method === 'HEAD' ? undefined : Buffer.concat(chunks),
      });
      const response = await handleVisitors(request, { store: getStore(), ip: req.socket.remoteAddress });
      res.statusCode = response.status;
      response.headers.forEach((value, key) => res.setHeader(key, value));
      res.end(await response.text());
    } catch (err) {
      next(err);
    }
  };

  return {
    name: 'visitor-api',
    configureServer: (server) => void server.middlewares.use(middleware),
    configurePreviewServer: (server) => void server.middlewares.use(middleware),
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), reactRouter(), previewPrettyUrls(), visitorApi(loadEnv(mode, process.cwd(), ''))],
  build: {
    // Mid-range Android over patchy data is the target device; keep chunks honest.
    chunkSizeWarningLimit: 300,
  },
}));
