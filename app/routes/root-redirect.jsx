import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { COMPANY } from '../config/contact.js';
import { DEFAULT_LOCALE, LOCALE_LABELS, LOCALES, SITE_URL } from '../config/site.js';

export function meta() {
  return [
    { title: `${COMPANY.legalName} — ${COMPANY.tagline}` },
    { tagName: 'link', rel: 'canonical', href: new URL(`/${DEFAULT_LOCALE}`, SITE_URL).toString() },
    ...LOCALES.map((code) => ({
      tagName: 'link',
      rel: 'alternate',
      hreflang: code,
      href: new URL(`/${code}`, SITE_URL).toString(),
    })),
    {
      tagName: 'link',
      rel: 'alternate',
      hreflang: 'x-default',
      href: new URL(`/${DEFAULT_LOCALE}`, SITE_URL).toString(),
    },
  ];
}

/**
 * Language gateway for "/".
 *
 * Netlify and Vercel are configured to 302 "/" straight to "/en", so in
 * production almost nobody sees this. It exists as a real, working fallback for
 * any host without those rules and for visitors whose JavaScript has not run:
 * the three links below are plain anchors, so the page is never a dead end.
 */
export default function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const preferred = navigator.languages ?? [navigator.language];
    const match = preferred.map((tag) => tag?.split('-')[0]?.toLowerCase()).find((code) => LOCALES.includes(code));

    navigate(`/${match ?? DEFAULT_LOCALE}`, { replace: true });
  }, [navigate]);

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-display text-navy-700 text-2xl font-extrabold">{COMPANY.legalName}</p>
      <p className="mt-2 text-slate-600">{COMPANY.tagline}</p>

      <nav aria-label="Select language" className="mt-8">
        <ul className="xs:flex-row flex flex-col gap-3">
          {LOCALES.map((code) => (
            <li key={code}>
              <a
                href={`/${code}`}
                className="border-brand-600 font-display text-brand-700 hover:bg-brand-50 xs:w-auto inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 px-6 font-semibold"
              >
                {LOCALE_LABELS[code].native}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
