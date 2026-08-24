import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ConceptVisual } from '@/components/concept-visual';
import { getKnowledgeTerm, knowledgeTerms } from '@/lib/content';

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
    openGraph: { title: `${term.zh} · ${term.en}`, description: term.summary, images: [] },
    twitter: { title: `${term.zh} · ${term.en}`, description: term.summary, images: [] },
  };
}

export default async function KnowledgeDetailPage({ params }: TermPageProps) {
  const term = getKnowledgeTerm((await params).slug);
  if (!term) notFound();
  const related = term.related.map((slug) => getKnowledgeTerm(slug)).filter(Boolean);

  return (
    <main>
      <section className="term-hero">
        <div>
          <p><a href="/knowledge/">财经知识库</a><span>／</span>{term.category}</p>
          <h1>{term.zh}</h1>
          <h2>{term.en}{term.abbr ? ` · ${term.abbr}` : ''}</h2>
          <p className="term-lead">{term.summary}</p>
        </div>
        <ConceptVisual type={term.visual} label={term.zh} />
      </section>
      <section className="term-layout">
        <article className="term-article">
          <section><span>01 · IN PLAIN WORDS</span><h2>一句人话理解</h2><p>{term.why}</p></section>
          <section className="english-definition"><span>02 · ENGLISH EXPLANATION</span><h2>{term.en}</h2><p lang="en">{term.definitionEn}</p></section>
          <section><span>03 · EXAMPLE</span><h2>放进真实场景</h2><p>{term.example}</p></section>
          {term.formula && <section className="term-formula"><span>04 · FORMULA</span><h2>核心关系</h2><strong>{term.formula}</strong><small>公式是理解关系的地图，真实决策还需结合假设、费用与风险。</small></section>}
          <section className="term-fact"><span>{term.formula ? '05' : '04'} · DID YOU KNOW?</span><h2>记忆钩子</h2><p>{term.fact}</p></section>
        </article>
        <aside className="term-aside">
          <span>RELATED CONCEPTS</span><h3>接着学这三个概念</h3>
          {related.map((item) => item && <a href={`/knowledge/${item.slug}/`} key={item.slug}><b>{item.zh}</b><small>{item.en}</small><i>→</i></a>)}
          <a className="term-back" href="/knowledge/">← 返回完整知识库</a>
        </aside>
      </section>
    </main>
  );
}
