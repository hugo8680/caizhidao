import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ConceptVisual } from '@/components/concept-visual';
import { getKnowledgeTerm, knowledgeTerms } from '@/lib/content';
import { buildKnowledgeGuide, getKnowledgeCategoryByName } from '@/lib/guides';

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
  const guide = buildKnowledgeGuide(term);
  const category = getKnowledgeCategoryByName(term.category);

  return (
    <main>
      <section className="term-hero">
        <div>
          <p><a href="/knowledge/">科普百科</a><span>／</span>{category ? <a href={`/knowledge/category/${category.slug}/`}>{term.category}</a> : term.category}</p>
          <h1>{term.zh}</h1>
          <h2>{term.en}{term.abbr ? ` · ${term.abbr}` : ''}</h2>
          <p className="term-lead">{term.summary}</p>
        </div>
        <ConceptVisual type={term.visual} label={term.zh} />
      </section>
      <section className="term-layout">
        <article className="term-article">
          <section className="term-definition"><span>通俗解释</span><h2>这个词怎么理解</h2><p>{term.why}</p></section>

          <section className="english-definition"><span>英文释义</span><h2>{term.en}</h2><p lang="en">{term.definitionEn}</p></section>

          {term.formula && <section className="term-formula"><span>公式</span><h2>变量之间的关系</h2><strong>{term.formula}</strong><p>计算前先统一单位、期间和百分比口径。</p></section>}

          <section className="term-scenario"><span>例子</span><h2>放到现实中看</h2><blockquote>{term.example}</blockquote></section>

          <section className="term-misconceptions"><span>容易弄错</span><h2>别忽略这一点</h2><p>{guide.caution}</p></section>

          <section className="term-checklist"><span>实际使用</span><h2>判断时看什么</h2><p>{guide.check}</p><div><b>常用资料</b><p>{guide.observation}</p></div></section>

          <section className="term-fact"><span>补充阅读</span><h2>顺带一提</h2><p>{term.fact}</p></section>
        </article>
        <aside className="term-aside">
          <span>相关词条</span><h3>继续了解</h3>
          {related.map((item) => item && <a href={`/knowledge/${item.slug}/`} key={item.slug}><b>{item.zh}</b><small>{item.en}</small><i>→</i></a>)}
          <a className="term-back" href={category ? `/knowledge/category/${category.slug}/` : '/knowledge/'}>← 返回本主题百科目录</a>
        </aside>
      </section>
    </main>
  );
}
