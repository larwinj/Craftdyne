import { Container } from '../components/ui/container.jsx';
import { Section } from '../components/ui/section.jsx';
import { buildMeta } from '../lib/seo.js';

export function meta({ params }) {
  return buildMeta({
    title: 'Blog Preview — CraftDyne',
    description:
      'This is a sample page showcasing the Blog section. Once the Blog link is provided, it will be integrated and displayed here.',
    lang: params.lang,
    path: 'blogs',
  });
}

export default function BlogsPage() {
  return (
    <main id="main-content">
      <Section tone="light" className="py-20 sm:py-32 min-h-[60vh] flex items-center justify-center">
        <Container size="normal" className="text-center">
          <h1 className="font-display text-fluid-3xl font-extrabold text-navy-900 mb-6">
            Blog Preview
          </h1>
          <p className="text-fluid-lg max-w-2xl mx-auto text-slate-600 leading-relaxed">
            This is a sample page showcasing the Blog section. Once the Blog link is provided, it will be integrated and displayed here.
          </p>
        </Container>
      </Section>
    </main>
  );
}
