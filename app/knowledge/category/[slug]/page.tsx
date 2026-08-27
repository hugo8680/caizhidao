import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { knowledgeTerms } from '@/lib/content';
import { getKnowledgeCategoryPage, knowledgeCategoryPages } from '@/lib/guides';
import { getKnowledgeArticle } from '@/lib/knowledge-articles';
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
        <p><a href="/knowledge/">财经知识库</a> ／ {category.en}</p>
        <h1>{category.name}</h1>
        <p>{category.overview}</p>
        <dl><div><dt>完整词条</dt><dd>{terms.length} 篇</dd></div><div><dt>学习目标</dt><dd>{category.learningGoal}</dd></div></dl>
      </header>
      <section className={styles.categoryBody}>
        <div className={styles.termList}>
          {terms.map((term) => {
            const article = getKnowledgeArticle(term.slug);
            return (
              <a href={`/knowledge/${term.slug}/`} key={term.slug}>
                <div><h3>{term.zh}</h3><span>{term.en}{term.abbr ? ` · ${term.abbr}` : ''}</span></div>
                <p>{term.summary}</p>
                <small>完整词条 · {article?.sources.length ?? 0} 项资料{term.formula ? ' · 含公式' : ''}</small>
                <b>阅读全文 →</b>
              </a>
            );
          })}
        </div>
        <a className={styles.categoryBack} href="/knowledge/">← 返回财经知识库全部主题</a>
      </section>
    </main>
  );
}
