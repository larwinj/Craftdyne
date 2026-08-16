import { allRoutes } from './app/config/site.js';

/** @type {import('@react-router/dev/config').Config} */
export default {
  // No server runtime: the build emits a static HTML file per route, which is
  // what makes crawlers and WhatsApp/LinkedIn link previews work.
  ssr: false,
  async prerender() {
    return allRoutes();
  },
};
