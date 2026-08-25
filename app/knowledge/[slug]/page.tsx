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
            <span>完整定义</span><h2>先把概念说清楚</h2>
            <p>{term.summary}</p><p>{term.why}</p>
            <div className="term-reading-note"><b>阅读时先确认</b><p>它描述谁、覆盖多长时间、使用什么计量单位，以及变化最终影响哪一笔现金流或哪一种风险。</p></div>
          </section>

          <section className="term-mechanism"><span>运作机制</span><h2>它是怎样发生作用的</h2><div className="term-mechanism-grid">{guide.mechanism.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

          <section className="english-definition"><span>英文释义</span><h2>{term.en}</h2><p lang="en">{term.definitionEn}</p><small>英文资料中的具体含义仍要结合对象、期间和上下文判断。</small></section>

          {term.formula && <section className="term-formula"><span>公式与口径</span><h2>变量之间有什么关系</h2><strong>{term.formula}</strong><p>公式只是一种简化表达。代入数字前应统一单位、期间和百分比口径，并说明哪些条件被暂时固定。</p></section>}

          <section className="term-scenario"><span>现实案例</span><h2>放进具体情景</h2><blockquote>{term.example}</blockquote><h3>怎样读这个例子</h3><p>先找出主体、金额和时间，再改变一个关键条件，观察结论是否仍然成立。例子用于解释关系，不代表所有情形。</p></section>

          <section className="term-misconceptions"><span>常见误区</span><h2>哪些地方最容易理解错</h2><ol>{guide.misconceptions.map((item) => <li key={item}><p>{item}</p></li>)}</ol></section>

          <section className="term-checklist"><span>判断清单</span><h2>实际使用时核对什么</h2><ul>{guide.checklist.map((item) => <li key={item}>{item}</li>)}</ul><div><b>常见观察资料</b><p>{guide.observation}</p></div></section>

          <section className="term-sources"><span>延伸核验</span><h2>从哪里继续查</h2><p>下面列的是本主题常用的官方或专业资料入口。具体数字、规则和产品条款应以最新原始资料为准。</p><div>{guide.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><b>{source.title}</b><small>{source.publisher}</small><p>{source.note}</p><i>访问资料 ↗</i></a>)}</div></section>

          <section className="term-fact"><span>补充背景</span><h2>还有一个值得记住的细节</h2><p>{term.fact}</p></section>
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
