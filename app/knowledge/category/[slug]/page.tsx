import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ActionArrow } from '@/components/action-arrow';
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
  const categoryIndex = knowledgeCategoryPages.findIndex((item) => item.slug === category.slug);

  return (
    <main className="encyclopedia-index-page">
      <div className="encyclopedia-index-grid">
        <aside className="encyclopedia-index-rail">
          <header><p>百科分类</p><h1>{category.name}</h1><small lang="en">{category.en}</small></header>
          <nav aria-label="百科分类目录">
            {knowledgeCategoryPages.map((item, index) => (
              <a className={item.slug === category.slug ? 'active' : ''} aria-current={item.slug === category.slug ? 'page' : undefined} href={`/knowledge/category/${item.slug}/`} key={item.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span><b>{item.name}</b>
              </a>
            ))}
          </nav>
          <a className="encyclopedia-rail-back" href="/knowledge/">全部百科词条 <ActionArrow /></a>
        </aside>
        <section className="encyclopedia-index-body encyclopedia-category-page">
          <header className="encyclopedia-category-intro">
            <p><a href="/knowledge/">财经知识库</a><span>／</span>分类 {String(categoryIndex + 1).padStart(2, '0')}</p>
            <h2>{category.name}</h2>
            <small lang="en">{category.en}</small>
            <p>{category.overview}</p>
          </header>
          <div className="encyclopedia-term-list">
          {terms.map((term) => (
            <a href={`/knowledge/${term.slug}/`} key={term.slug}>
              <div><h3>{term.zh}</h3><span>{term.en}{term.abbr ? ` · ${term.abbr}` : ''}</span></div>
              <p>{term.summary}</p>
              <ActionArrow />
            </a>
          ))}
          </div>
        </section>
      </div>
    </main>
  );
}
