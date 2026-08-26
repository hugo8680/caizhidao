import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ConceptVisual } from '@/components/concept-visual';
import { knowledgeTerms } from '@/lib/content';
import { getKnowledgeCategoryPage, knowledgeCategoryPages } from '@/lib/guides';

type CategoryPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return knowledgeCategoryPages.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getKnowledgeCategoryPage((await params).slug);
  if (!category) return {};
  return {
    title: `${category.name}百科 · 财知道`,
    description: category.overview,
    openGraph: { title: `${category.name} · ${category.en}`, description: category.overview, images: [] },
    twitter: { title: `${category.name} · ${category.en}`, description: category.overview, images: [] },
  };
}

export default async function KnowledgeCategoryPage({ params }: CategoryPageProps) {
  const category = getKnowledgeCategoryPage((await params).slug);
  if (!category) notFound();
  const terms = knowledgeTerms.filter((term) => term.category === category.name);

  return (
    <main>
      <section className="knowledge-category-hero">
        <p><a href="/knowledge/">科普百科</a><span>／</span>主题目录</p>
        <small>{category.en}</small><h1>{category.name}</h1><p>{category.overview}</p>
      </section>
      <section className="knowledge-category-grid">
        {terms.map((term, index) => (
          <a href={`/knowledge/${term.slug}/`} key={term.slug}>
            <ConceptVisual type={term.visual} label={term.zh} />
            <div><span>{String(index + 1).padStart(2, '0')} · {term.en}</span><h2>{term.zh}</h2><p>{term.summary}</p><b>查看解释 →</b></div>
          </a>
        ))}
      </section>
      <nav className="category-pagination" aria-label="百科主题翻页">
        {knowledgeCategoryPages.map((item) => <a className={item.slug === category.slug ? 'active' : ''} href={`/knowledge/category/${item.slug}/`} key={item.slug}>{item.name}</a>)}
      </nav>
    </main>
  );
}
