import { registerResources } from './index.js';

/**
 * Every locale, loaded eagerly for the prerender pass.
 *
 * Prerendering renders all 31 URLs in a single Node process and must be
 * synchronous, so the server needs the whole corpus up front.
 *
 * This lives in its own module — imported *only* from `entry.server.jsx` — so
 * plain static-import reachability keeps it out of the browser bundle. Guarding
 * an eager glob with `import.meta.env.SSR` inside the shared i18n module does
 * not work: Vite hoists the glob's imports to the top of the module and the
 * bundler keeps them, so all three languages shipped to every visitor.
 */
registerResources(import.meta.glob('./locales/*/*.json', { eager: true }));
