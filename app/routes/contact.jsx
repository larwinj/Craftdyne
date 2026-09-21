import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useOutletContext } from 'react-router';
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
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <JsonLd schema={breadcrumbSchema(lang, [{ name: t('common:nav.contact'), path: 'contact' }])} />

      <PageHero
        lang={lang}
        eyebrow={t('hero.eyebrow', { defaultValue: 'Get in Touch' })}
        title={t('hero.title', { defaultValue: 'Contact CraftDyne' })}
        description={t('hero.description', { defaultValue: 'We are here to answer your technical questions, assist with orders, and support your farming needs.' })}
        crumbs={[{ label: t('common:nav.contact'), path: 'contact' }]}
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div id="office-info" className="lg:col-span-5 scroll-mt-28">
            <h2 className="text-fluid-2xl font-bold text-navy-900">{t('info.heading', { defaultValue: 'Direct Contact Channels' })}</h2>
            <p className="mt-3 text-slate-600">{t('info.sub', { defaultValue: 'Reach our agronomist and support team directly via email, phone, or WhatsApp.' })}</p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-100/70 shrink-0 rounded-xl p-3 text-brand-700">
                  <Mail className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-navy-900">Email Us</h3>
                  <a href={mailtoHref} className="hover:text-brand-700 text-slate-600 transition-colors">
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-100/70 shrink-0 rounded-xl p-3 text-brand-700">
                  <Phone className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-navy-900">Call Us</h3>
                  <a href={telHref} className="hover:text-brand-700 text-slate-600 transition-colors">
                    {CONTACT.phoneDisplay}
                  </a>
                  <p className="mt-1 text-xs text-slate-500">Mon - Sat: 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-100/70 shrink-0 rounded-xl p-3 text-brand-700">
                  <MessageCircle className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-navy-900">WhatsApp Support</h3>
                  <a
                    href={whatsappHref(t('common:whatsappMessage'))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-700 font-medium text-brand-600 transition-colors"
                  >
                    Chat with Us directly on WhatsApp →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-100/70 shrink-0 rounded-xl p-3 text-brand-700">
                  <MapPin className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-navy-900">Registered Office</h3>
                  <div className="mt-1 space-y-0.5 text-slate-600">
                    {CONTACT.addressLines.map((line, idx) => (
                      <p key={idx} className={idx === 0 ? 'font-bold text-navy-900' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                  <a
                    href={CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-700 mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 transition-colors"
                  >
                    Open Registered Office in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div id="enquiry-form" className="lg:col-span-7 scroll-mt-28">
            <div className="shadow-card rounded-3xl bg-white p-6 sm:p-10 ring-1 ring-slate-100">
              <h2 className="text-fluid-xl font-bold text-navy-900">{t('form.heading', { defaultValue: 'Send Us a Message' })}</h2>
              <p className="mt-1.5 text-xs text-slate-500">{t('form.sub', { defaultValue: 'Fill out the form below and our team will get back to you shortly.' })}</p>
              <div className="mt-6">
                <ContactForm lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </Section>

    </>
  );
}
