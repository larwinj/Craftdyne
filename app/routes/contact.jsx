import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { ContactForm } from '../components/sections/contact-form.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { Section } from '../components/ui/section.jsx';
import { CONTACT } from '../config/contact.js';
import { getI18n } from '../i18n/index.js';
import { mailtoHref, telHref, whatsappHref } from '../lib/links.js';
import { breadcrumbSchema, buildMeta } from '../lib/seo.js';

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'contact');
  return buildMeta({
    lang: params.lang,
    path: 'contact',
    title: t('meta.title'),
    description: t('meta.description'),
  });
}

export default function Contact() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['contact', 'common']);

  const channels = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      href: whatsappHref(t('common:whatsappMessage')),
      value: CONTACT.phoneDisplay,
      external: true,
    },
    { id: 'phone', icon: Phone, href: telHref, value: CONTACT.phoneDisplay },
    { id: 'email', icon: Mail, href: mailtoHref, value: CONTACT.email },
  ];

  return (
    <>
      <JsonLd schema={breadcrumbSchema(lang, [{ name: t('common:nav.contact'), path: 'contact' }])} />

      <PageHero
        lang={lang}
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        crumbs={[{ label: t('common:nav.contact'), path: 'contact' }]}
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Direct channels come first on mobile: most visitors would rather
              tap WhatsApp than fill in a form on a phone. */}
          <div className="lg:order-last lg:col-span-5">
            <h2 className="text-fluid-xl">{t('channels.heading')}</h2>

            <ul className="mt-6 flex flex-col gap-4">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="bg-mist ring-brand-100 hover:bg-brand-50 flex gap-4 rounded-2xl p-5 ring-1 transition-colors"
                    >
                      <span className="bg-brand-600 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-white">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="font-display text-navy-700 block font-bold">
                          {t(`channels.${channel.id}.title`)}
                        </span>
                        <span className="text-fluid-sm mt-0.5 block break-words text-slate-600">{channel.value}</span>
                        <span className="text-fluid-sm text-brand-700 mt-1 block font-semibold">
                          {t(`channels.${channel.id}.action`)} →
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}

              <li className="flex gap-4 rounded-2xl border border-slate-200 p-5">
                <span className="bg-navy-700 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-white">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="font-display text-navy-700 block font-bold">{t('channels.office.title')}</span>
                  <address className="text-fluid-sm mt-1 text-slate-600 not-italic">
                    <span className="block">{t('channels.office.description')}</span>
                    {CONTACT.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-fluid-xl">{t('form.heading')}</h2>
            <p className="mt-2 text-slate-600">{t('form.description')}</p>
            <div className="mt-8">
              <ContactForm lang={lang} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
