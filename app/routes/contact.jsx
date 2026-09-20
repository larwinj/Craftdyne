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

              <li className="rounded-2xl border border-slate-200 p-5">
                <div className="flex gap-4">
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
                    {CONTACT.mapsUrl && (
                      <a
                        href={CONTACT.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-700 hover:text-brand-800 mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                      >
                        <MapPin className="size-4 text-brand-600" />
                        Open Registered Office in Google Maps →
                      </a>
                    )}
                  </span>
                </div>
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

      {/* Embedded Google Map Section */}
      <Section tone="mist">
        <div className="mx-auto max-w-5xl text-center">
          <span className="bg-brand-100 text-brand-800 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <MapPin className="size-4 text-brand-600" /> Office Location
          </span>
          <h2 className="text-fluid-2xl mt-3 font-bold text-navy-900">Find Us on Google Maps</h2>
          <p className="mt-2 text-slate-600">
            Registered Office: 1003/5, Saraswathi Nagar Collecterate post, Silapadi, Dindigul, Tamil Nadu, 624005.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 shadow-md">
          <iframe
            title="CraftDyne Registered Office Location Map"
            src={CONTACT.mapsEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full bg-slate-100"
          ></iframe>
        </div>

        <div className="mt-6 text-center">
          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-700 hover:shadow-lg"
          >
            <MapPin className="size-4" />
            Open Location in Google Maps App
          </a>
        </div>
      </Section>
    </>
  );
}
