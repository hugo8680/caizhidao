import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { KnowledgeArticlePage } from '@/components/knowledge-article';
import { getKnowledgeTerm, knowledgeTerms } from '@/lib/content';
import { getKnowledgeCategoryByName } from '@/lib/guides';
import { getKnowledgeArticle } from '@/lib/knowledge-articles';

type TermPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return knowledgeTerms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: TermPageProps): Promise<Metadata> {
  const term = getKnowledgeTerm((await params).slug);
  if (!term) return {};
  return {
    title: `${term.zh}（${term.en}）· 财知道知识库`,
    description: term.summary,
    alternates: { canonical: `/knowledge/${term.slug}/` },
    openGraph: { title: `${term.zh} · ${term.en}`, description: term.summary, images: [] },
    twitter: { title: `${term.zh} · ${term.en}`, description: term.summary, images: [] },
  };
}

export default async function KnowledgeDetailPage({ params }: TermPageProps) {
  const term = getKnowledgeTerm((await params).slug);
  if (!term) notFound();
  const related = term.related.map((slug) => getKnowledgeTerm(slug)).filter(Boolean);
  const category = getKnowledgeCategoryByName(term.category);
  const article = getKnowledgeArticle(term.slug);
  if (!article) notFound();

  return <KnowledgeArticlePage term={term} article={article} categoryHref={category ? `/knowledge/category/${category.slug}/` : '/knowledge/'} related={related.filter((item): item is NonNullable<typeof item> => Boolean(item))} />;
}
