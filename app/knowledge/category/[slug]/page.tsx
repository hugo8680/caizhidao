import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { knowledgeTerms } from '@/lib/content';
import { getKnowledgeCategoryPage, knowledgeCategoryPages } from '@/lib/guides';
import styles from '../../knowledge-index.module.css';

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
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.breadcrumb}><a href="/knowledge/">财经知识库</a><span>／</span>{category.name}</p>
        <p className={styles.eyebrow}>{category.en}</p>
        <h1>{category.name}</h1>
        <p className={styles.intro}>{category.overview}</p>
      </header>
      <section className={styles.categoryBody}>
        <div className={styles.termList}>
          {terms.map((term) => (
            <a href={`/knowledge/${term.slug}/`} key={term.slug}>
              <div><h3>{term.zh}</h3><span>{term.en}{term.abbr ? ` · ${term.abbr}` : ''}</span></div>
              <p>{term.summary}</p>
              <span className={styles.termArrow} aria-hidden="true">→</span>
            </a>
          ))}
        </div>
        <a className={styles.categoryBack} href="/knowledge/">← 返回财经知识库全部主题</a>
      </section>
    </main>
  );
}
