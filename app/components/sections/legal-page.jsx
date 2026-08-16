import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Mail, Phone } from 'lucide-react';

import { COMPANY, CONTACT } from '../../config/contact.js';
import { LEGAL_LAST_UPDATED } from '../../config/site.js';
import { mailtoHref, telHref } from '../../lib/links.js';
import { Section } from '../ui/section.jsx';
import { PageHero } from './page-hero.jsx';

/**
 * Shared renderer for the privacy and terms pages — same structure, different
 * section keys, so the two routes stay a few lines each.
 */
export function LegalPage({ docKey, path, sectionKeys }) {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['pages', 'common']);
  const base = `legal.${docKey}`;

  return (
    <>
      <PageHero
        lang={lang}
        title={t(`${base}.title`)}
        description={`${t(`${base}.updated`)}: ${LEGAL_LAST_UPDATED}`}
        crumbs={[{ label: t(`${base}.title`), path }]}
      />

      <Section tone="white" containerSize="narrow">
        <div className="flex flex-col gap-9">
          {sectionKeys.map((key) => (
            <section key={key}>
              <h2 className="text-fluid-xl">{t(`${base}.sections.${key}.heading`)}</h2>
              <p className="mt-3 text-pretty text-slate-600">{t(`${base}.sections.${key}.body`)}</p>
            </section>
          ))}

          <div className="bg-mist ring-brand-100 rounded-2xl p-6 ring-1">
            <p className="font-display text-navy-700 font-bold">{COMPANY.legalName}</p>
            <address className="text-fluid-sm mt-1 text-slate-600 not-italic">
              {CONTACT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
              <a href={mailtoHref} className="text-brand-700 inline-flex min-h-11 items-center gap-2 hover:underline">
                <Mail className="size-5 shrink-0" aria-hidden="true" />
                <span className="break-all">{CONTACT.email}</span>
              </a>
              <a href={telHref} className="text-brand-700 inline-flex min-h-11 items-center gap-2 hover:underline">
                <Phone className="size-5 shrink-0" aria-hidden="true" />
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
