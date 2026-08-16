import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useLocation } from 'react-router';

import { DEFAULT_LOCALE, LOCALES } from './config/site.js';
import stylesheet from './app.css?url';

export const links = () => [
  { rel: 'stylesheet', href: stylesheet },
  // PNG rather than SVG: the icon is generated from the client's real logo
  // colours (see scripts/generate-assets.mjs), and raster is simplest to keep
  // in exact sync with that pipeline's output.
  { rel: 'icon', href: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
  { rel: 'icon', href: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
];

/** Read the locale straight off the URL so it is correct during prerendering. */
function useLocaleFromPath() {
  const { pathname } = useLocation();
  const first = pathname.split('/')[1];
  return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
}

export function Layout({ children }) {
  const lang = useLocaleFromPath();

  return (
    <html lang={lang} dir="ltr">
      <head>
        <meta charSet="utf-8" />
        {/* viewport-fit=cover is what lets env(safe-area-inset-*) resolve to
            real values on notched iPhones. */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#00a651" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  const isRouteError = isRouteErrorResponse(error);
  const title = isRouteError ? `${error.status}` : 'Something went wrong';
  const message = isRouteError
    ? error.status === 404
      ? 'We could not find that page.'
      : error.statusText
    : 'An unexpected error occurred. Please try again.';

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-brand-500 text-6xl font-extrabold">{title}</p>
      <h1 className="text-fluid-2xl mt-4">{message}</h1>
      <a
        href="/"
        className="bg-brand-600 mt-8 inline-flex min-h-11 items-center rounded-full px-6 font-semibold text-white"
      >
        Back to home
      </a>
      {import.meta.env.DEV && error instanceof Error ? (
        <pre className="mt-8 w-full overflow-x-auto rounded-lg bg-slate-100 p-4 text-left text-xs">{error.stack}</pre>
      ) : null}
    </main>
  );
}
