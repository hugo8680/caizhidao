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
          <section className="term-definition"><span>通俗定义 · IN PLAIN WORDS</span><h2>它到底是什么意思</h2><p>{term.why}</p><div className="term-reading-note"><b>辨认口径</b><p>判断它描述谁、覆盖多长时间，以及变化后影响哪一笔现金流或哪一种风险。</p></div></section>

          <section className="term-mechanism"><span>运作机制 · MECHANISM</span><h2>组成部分与相互关系</h2><div className="term-mechanism-grid">{guide.mechanism.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

          <section className="english-definition"><span>英文释义 · ENGLISH DEFINITION</span><h2>{term.en}</h2><p lang="en">{term.definitionEn}</p><small>英文资料中的具体含义仍需结合对象、期间与上下文判断。</small></section>

          {term.formula && <section className="term-formula"><span>关系式 · FORMULA</span><h2>变量关系</h2><strong>{term.formula}</strong><p>固定其他条件时，改变一个变量，结果会朝什么方向变化。代入数字前应统一单位、期间和百分比口径。</p><small>公式是关系的简化表达；真实决策还需结合假设、费用与风险。</small></section>}

          <section className="term-scenario"><span>现实案例 · REAL-WORLD EXAMPLE</span><h2>放进具体场景</h2><blockquote>{term.example}</blockquote><h3>条件变化时</h3><p>金额、期限或关键条件一旦改变，结论也可能变化；这个例子用于说明关系，不代表所有情形。</p></section>

          <section className="term-misconceptions"><span>常见误区 · COMMON MISTAKES</span><h2>容易混淆的边界</h2><ol>{guide.misconceptions.map((item) => <li key={item}><p>{item}</p></li>)}</ol></section>

          <section className="term-checklist"><span>判断清单 · PRACTICAL CHECKLIST</span><h2>实际使用时核对什么</h2><ul>{guide.checklist.map((item) => <li key={item}>{item}</li>)}</ul><div><b>常见观察来源</b><p>{guide.observation}</p></div></section>

          <section className="term-fact"><span>知识趣闻 · DID YOU KNOW?</span><h2>补充背景</h2><p>{term.fact}</p></section>
        </article>
        <aside className="term-aside">
          <span>RELATED ENTRIES</span><h3>相关百科词条</h3>
          {related.map((item) => item && <a href={`/knowledge/${item.slug}/`} key={item.slug}><b>{item.zh}</b><small>{item.en}</small><i>→</i></a>)}
          <a className="term-back" href={category ? `/knowledge/category/${category.slug}/` : '/knowledge/'}>← 返回本主题百科目录</a>
        </aside>
      </section>
    </main>
  );
}
