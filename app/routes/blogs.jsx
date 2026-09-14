import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Calendar, Clock, ArrowRight, Tag, Search, User, X } from 'lucide-react';

import { PageHero } from '../components/sections/page-hero.jsx';
import { Container } from '../components/ui/container.jsx';
import { Section } from '../components/ui/section.jsx';
import { Button } from '../components/ui/button.jsx';
import { buildMeta } from '../lib/seo.js';
import { localePath } from '../lib/links.js';

export function meta({ params }) {
  return buildMeta({
    title: 'Blogs & Insights — Green Chemistry & Sustainable Farming',
    description:
      'Read latest insights, agronomy guides, and field evaluation reports on Green Chemistry and EcoAgta sustainable crop protection.',
    lang: params.lang,
    path: 'blogs',
  });
}

const SAMPLE_BLOGS = [
  {
    id: 'green-chemistry-future',
    title: 'Green Chemistry in Modern Farming: Eliminating Toxic Residues from Soil & Produce',
    category: 'Green Chemistry',
    readTime: '5 min read',
    date: 'September 10, 2026',
    author: 'Dr. R. Sundaram, Chief Agronomist',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80',
    summary:
      'How IUPAC Green Chemistry principles are transforming crop protection by designing non-toxic, readily biodegradable active formulations that leave zero chemical residue.',
    content: `
      <h3>The Paradigm Shift in Agricultural Chemistry</h3>
      <p>For decades, agricultural yield improvements came at a steep environmental cost. Synthetic chemicals accumulated in topsoil, leached into groundwater, and presented applicator safety risks. Green Chemistry reverses this equation by designing safety and degradability into the molecule from day one.</p>
      
      <h3>Key IUPAC Principles Applied in the Field</h3>
      <ul>
        <li><strong>Design for Degradation:</strong> Formulations that break down into harmless organic compounds post-treatment.</li>
        <li><strong>Inherently Safer Formulations:</strong> Water-based, non-fuming solutions safe for spray operators.</li>
        <li><strong>Zero Harm to Food Chain:</strong> Non-accumulating active ingredients ideal for export-oriented crops.</li>
      </ul>
      
      <p>By prioritizing ecological compatibility alongside high field efficacy, growers no longer have to choose between profitability and environmental stewardship.</p>
    `,
  },
  {
    id: 'coconut-rsw-management',
    title: 'Protecting Coconut Canopies from Rugose Spiraling Whitefly & Sooty Mold',
    category: 'Crop Protection',
    readTime: '6 min read',
    date: 'August 28, 2026',
    author: 'CraftDyne Technical Team',
    image: 'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?auto=format&fit=crop&w=1000&q=80',
    summary:
      'Rugose Spiraling Whitefly (RSW) drains palm vitality and excretes honeydew that fuels sooty mold. Here is how EcoAgta EZ3+ restores canopy photosynthesis.',
    content: `
      <h3>Understanding the Dual Threat in Coconut Orchards</h3>
      <p>Rugose Spiraling Whitefly (RSW) poses a double challenge for coconut growers. Direct sap-feeding drains palm nutrients, while heavy honeydew deposits coat fronds in black sooty mold fungus (Capnodium spp.), suppressing vital photosynthesis.</p>
      
      <h3>Triple Action Recovery Strategy</h3>
      <p>Using EcoAgta EZ3+ Concentrate at a 1:300 starting dilution provides three key benefits:</p>
      <ol>
        <li>Deters whitefly adult feeding and egg laying on lower frond surfaces.</li>
        <li>Dissolves fungal honeydew films, restoring light absorption within weeks.</li>
        <li>Promotes natural foliage vigor and nut retention through long protection windows.</li>
      </ol>
    `,
  },
  {
    id: 'cardamom-thrips-fungal-shield',
    title: 'Cardamom Plantation Best Practices: Managing Thrips & Fungal Capsule Rot',
    category: 'Plantation Crops',
    readTime: '4 min read',
    date: 'August 14, 2026',
    author: 'K. V. Ramanathan, Plantation Specialist',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1000&q=80',
    summary:
      'High humidity hill ecosystems present intense pest and disease pressure. Discover how dual protection with EZ3+ and Myco Spectra safeguards cardamom yields.',
    content: `
      <h3>High Humidity & Spice Quality</h3>
      <p>Cardamom thrives in misty high-altitude environments, but these conditions also foster Thrips (Sciothrips cardamom) and fungal pathogens like Phytophthora and Pythium causing capsule rot.</p>
      
      <h3>Dual Spray Recommendation</h3>
      <p>Combining EcoAgta EZ3+ (for sap-suckers and virus vector suppression) with Myco Spectra Fungicide (1:400 dilution) creates a complete protective shield without compromising spice aroma or export residue standards.</p>
    `,
  },
  {
    id: 'soil-health-carbon-restoration',
    title: 'Restoring Depleted Soils: The Role of Organic Carbon & Limonoids',
    category: 'Soil Health',
    readTime: '5 min read',
    date: 'July 30, 2026',
    author: 'CraftDyne R&D Unit',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=80',
    summary:
      'Improving soil organic carbon and cation exchange capacity using plant-based soil amendments like CraftDyne Soil Amend (EcoPop).',
    content: `
      <h3>Why Soil Structure Matters</h3>
      <p>Intensive farming depletes soil organic matter, leading to compaction, reduced aeration, and root-knot nematode vulnerability. Incorporating plant-based soil amendments restores moisture retention and root oxygenation for up to 4 years.</p>
    `,
  },
];

export default function BlogsPage({ loaderData }) {
  const { t } = useTranslation();
  const lang = loaderData?.lang || 'en';
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'Green Chemistry', 'Crop Protection', 'Plantation Crops', 'Soil Health'];

  const filteredBlogs = SAMPLE_BLOGS.filter((post) => {
    const matchesTag = selectedTag === 'All' || post.category === selectedTag;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Blogs & Agronomy Insights"
        title="Sustainable Agriculture & Green Chemistry Insights"
        description="Explore the latest articles, agronomy guides, and field evaluation studies on non-toxic, eco-friendly crop protection."
      />

      <Section tone="light" className="py-12 sm:py-16">
        <Container size="wide">
          {/* Controls: Search & Category Filter */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedTag(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                    selectedTag === cat
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm font-medium text-slate-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Featured Post Banner */}
          {filteredBlogs.length > 0 && selectedTag === 'All' && !searchQuery ? (
            <div className="mb-14 overflow-hidden rounded-3xl bg-linear-to-br from-navy-900 via-navy-800 to-emerald-950 text-white shadow-xl grid lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold tracking-wider text-emerald-300 uppercase backdrop-blur-xs border border-emerald-500/30">
                    <Tag className="size-3.5" /> Featured Article
                  </span>
                  <h2 className="font-display mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl text-white leading-tight">
                    {SAMPLE_BLOGS[0].title}
                  </h2>
                  <p className="mt-4 text-slate-300 text-sm sm:text-base line-clamp-3">
                    {SAMPLE_BLOGS[0].summary}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-4 text-xs text-slate-300">
                    <span className="flex items-center gap-1"><User className="size-3.5 text-emerald-400" /> {SAMPLE_BLOGS[0].author}</span>
                    <span className="flex items-center gap-1"><Calendar className="size-3.5 text-emerald-400" /> {SAMPLE_BLOGS[0].date}</span>
                    <span className="flex items-center gap-1"><Clock className="size-3.5 text-emerald-400" /> {SAMPLE_BLOGS[0].readTime}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(SAMPLE_BLOGS[0])}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-brand-500 hover:shadow-lg"
                  >
                    Read Article <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[280px]">
                <img
                  src={SAMPLE_BLOGS[0].image}
                  alt={SAMPLE_BLOGS[0].title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          ) : null}

          {/* Article Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-navy-900/80 backdrop-blur-md px-3 py-1 text-[0.6875rem] font-bold text-emerald-300 uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1"><Calendar className="size-3.5" /> {post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="size-3.5" /> {post.readTime}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">{post.author}</span>
                    <button
                      type="button"
                      onClick={() => setActiveArticle(post)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:text-brand-700"
                    >
                      Read Story <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="py-16 text-center">
              <BookOpen className="mx-auto size-12 text-slate-300" />
              <p className="mt-4 font-display text-lg font-bold text-slate-700">No articles found</p>
              <p className="text-sm text-slate-500">Try adjusting your search query or category filter.</p>
            </div>
          ) : null}
        </Container>
      </Section>

      {/* Article Detail Modal */}
      {activeArticle ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-10 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 inline-flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="size-5" />
            </button>

            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              {activeArticle.category}
            </span>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl font-extrabold text-navy-900">
              {activeArticle.title}
            </h2>
            <div className="mt-3 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-100 pb-4">
              <span>By {activeArticle.author}</span>
              <span>•</span>
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
            </div>

            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              className="mt-6 aspect-16/9 w-full rounded-2xl object-cover shadow-md"
            />

            <div
              className="prose prose-slate mt-6 max-w-none prose-headings:font-display prose-headings:text-navy-900 prose-a:text-brand-600"
              dangerouslySetInnerHTML={{ __html: activeArticle.content }}
            />

            <div className="mt-8 border-t border-slate-100 pt-6 flex justify-end">
              <Button onClick={() => setActiveArticle(null)} size="sm">
                Close Article
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
