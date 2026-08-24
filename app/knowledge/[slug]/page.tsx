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
          <section><span>01 · IN PLAIN WORDS</span><h2>先用一句人话说清楚</h2><p>{term.why}</p><div className="term-reading-note"><b>阅读重点</b><p>不要急着背定义。先回答：它描述谁、发生在多长时间内、改变后会影响哪一笔现金流或哪一种风险。</p></div></section>

          <section><span>02 · MECHANISM</span><h2>一步一步理解机制</h2><div className="term-mechanism-grid">{guide.mechanism.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

          <section className="english-definition"><span>03 · ENGLISH EXPLANATION</span><h2>{term.en}</h2><p lang="en">{term.definitionEn}</p><small>阅读英文材料时，先辨认术语对应的对象和上下文，不要只依赖逐字翻译。</small></section>

          {term.formula && <section className="term-formula"><span>04 · FORMULA</span><h2>公式在表达什么关系</h2><strong>{term.formula}</strong><p>公式的价值是把变量关系写清楚：固定其他条件时，改变一个变量，结果会朝什么方向变化。代入数字前先统一单位、期间和百分比口径。</p><small>公式是理解关系的地图，不是对真实世界的完整复制；真实决策还需结合假设、费用与风险。</small></section>}

          <section className="term-scenario"><span>{term.formula ? '05' : '04'} · REAL-WORLD EXAMPLE</span><h2>放进真实场景</h2><blockquote>{term.example}</blockquote><h3>怎么继续追问？</h3><p>把例子中的金额、期限或关键条件改变一次，再观察结论是否仍成立。科普学习的目标不是记住这个数字，而是掌握可以迁移到新场景的关系。</p></section>

          <section className="term-misconceptions"><span>{term.formula ? '06' : '05'} · COMMON MISTAKES</span><h2>三个常见误解</h2><ol>{guide.misconceptions.map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, '0')}</b><p>{item}</p></li>)}</ol></section>

          <section className="term-checklist"><span>{term.formula ? '07' : '06'} · PRACTICAL CHECKLIST</span><h2>现实中遇到它，先检查这四件事</h2><ul>{guide.checklist.map((item) => <li key={item}>{item}</li>)}</ul><div><b>去哪里观察</b><p>{guide.observation}</p></div></section>

          <section className="term-fact"><span>{term.formula ? '08' : '07'} · DID YOU KNOW?</span><h2>记忆钩子</h2><p>{term.fact}</p></section>
        </article>
        <aside className="term-aside">
          <span>RELATED CONCEPTS</span><h3>接着学这三个概念</h3>
          {related.map((item) => item && <a href={`/knowledge/${item.slug}/`} key={item.slug}><b>{item.zh}</b><small>{item.en}</small><i>→</i></a>)}
          <a className="term-back" href={category ? `/knowledge/category/${category.slug}/` : '/knowledge/'}>← 返回本主题百科目录</a>
        </aside>
      </section>
    </main>
  );
}
