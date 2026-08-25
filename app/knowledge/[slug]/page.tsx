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
          <section className="term-definition">
            <span>概念定义</span><h2>定义与经济含义</h2>
            <p>{term.summary}</p>
          </section>

          <section className="term-mechanism"><span>概念关系</span><h2>经济含义与相关概念</h2><div className="term-mechanism-grid">{guide.mechanism.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

          <section className="english-definition"><span>英文定义</span><h2>{term.en}</h2><p lang="en">{term.definitionEn}</p></section>

          {term.formula && <section className="term-formula"><span>数学表达</span><h2>公式与变量关系</h2><strong>{term.formula}</strong><p>公式表示其他条件不变时各变量之间的数量关系；使用时应保持时间单位和百分比单位一致。</p></section>}

          <section className="term-scenario"><span>经济例证</span><h2>数值或现实例子</h2><blockquote>{term.example}</blockquote></section>

          <section className="term-misconceptions"><span>理论边界</span><h2>适用条件与常见误解</h2><p>{guide.boundary}</p><ol>{guide.misconceptions.map((item) => <li key={item}><p>{item}</p></li>)}</ol></section>

          <section className="term-checklist"><span>分析方法</span><h2>应用这一概念时需要考察什么</h2><ul>{guide.checklist.map((item) => <li key={item}>{item}</li>)}</ul><div><b>常用数据与资料</b><p>{guide.observation}</p></div></section>

          <section className="term-sources"><span>参考文献</span><h2>教材与机构资料</h2><p>统计数据和制度规则可能更新，引用时应以发布机构的现行版本为准。</p><div>{guide.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><b>{source.title}</b><small>{source.publisher}</small><p>{source.note}</p><i>查看资料 ↗</i></a>)}</div></section>

          <section className="term-fact"><span>延伸理解</span><h2>补充说明</h2><p>{term.fact}</p></section>
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
