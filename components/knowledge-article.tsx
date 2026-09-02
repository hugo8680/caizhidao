import type { KnowledgeTerm } from '@/lib/content';
import type { KnowledgeArticle } from '@/lib/knowledge-articles';

type RelatedTerm = Pick<KnowledgeTerm, 'slug' | 'zh' | 'en' | 'summary'>;

export function KnowledgeArticlePage({
  term,
  article,
  categoryHref,
  related,
}: {
  term: KnowledgeTerm;
  article: KnowledgeArticle;
  categoryHref: string;
  related: RelatedTerm[];
}) {
  const contents = [
    '定义与边界',
    '它是怎样运作的',
    ...article.analysis.map((section) => section.title),
    ...(article.formulas && article.formulas.length > 0 ? ['公式表达了什么'] : []),
    article.example.title,
    '现实中怎样观察和使用',
    '不要与这些概念混淆',
    '常见误解',
    '英文定义',
    '参考资料',
  ];

  return (
    <main className="knowledge-essay-page">
      <div className="knowledge-essay-shell">
        <aside className="knowledge-essay-toc" aria-label="文章目录">
          <h2>文章目录</h2>
          <ol>{contents.map((title, index) => <li key={`${title}-${index}`}><span>{index + 1}.</span><b>{title}</b></li>)}</ol>
        </aside>

        <article className="knowledge-essay">
        <header className="knowledge-essay-header">
          <p className="knowledge-essay-breadcrumb"><a href="/knowledge/">财经知识库</a><span>／</span><a href={categoryHref}>{term.category}</a></p>
          <h1>{term.zh}<small>（{term.en}{term.abbr ? ` · ${term.abbr}` : ''}）</small></h1>
          <p className="knowledge-essay-meta">分类：{term.category}<span>完整百科词条</span></p>
        </header>

        <section className="knowledge-essay-opening">
          <h2>定义与边界</h2>
          <p className="knowledge-essay-question">{article.question}</p>
          <p className="knowledge-essay-deck">{term.summary}</p>
          {article.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="knowledge-essay-thesis">{article.takeaway}</p>
        </section>

        <section>
          <h2>它是怎样运作的</h2>
          <ol className="knowledge-essay-sequence">
            {article.mechanism.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}
          </ol>
        </section>

        {article.analysis.map((section) => <section key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>)}

        {article.formulas && article.formulas.length > 0 && <section>
          <h2>公式表达了什么</h2>
          {article.formulas.map((formula) => <div className="knowledge-essay-formula" key={formula.expression}>
            <strong>{formula.expression}</strong>
            <p>{formula.explanation}</p>
            <dl>{formula.variables.map((variable) => <div key={variable.symbol}><dt>{variable.symbol}</dt><dd>{variable.meaning}</dd></div>)}</dl>
          </div>)}
        </section>}

        <section>
          <h2>{article.example.title}</h2>
          <p>{article.example.setup}</p>
          <ol className="knowledge-essay-calculation">{article.example.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <p className="knowledge-essay-conclusion">{article.example.conclusion}</p>
        </section>

        <section>
          <h2>现实中怎样观察和使用</h2>
          {article.interpretation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section>
          <h2>不要与这些概念混淆</h2>
          <dl className="knowledge-essay-distinctions">
            {article.distinctions.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.explanation}</dd></div>)}
          </dl>
        </section>

        <section>
          <h2>实际分析时检查什么</h2>
          <ul className="knowledge-essay-checklist">{article.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section>
          <h2>常见误解</h2>
          <ol className="knowledge-essay-misconceptions">{article.misconceptions.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>

        <section className="knowledge-essay-english">
          <h2>英文定义</h2>
          <p lang="en">{term.definitionEn}</p>
        </section>

        <section className="knowledge-essay-sources">
          <h2>参考资料</h2>
          <ol>{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span><p>{source.note}</p></li>)}</ol>
        </section>

        {related.length > 0 && <nav className="knowledge-essay-related" aria-label="相关词条">
          <h2>继续阅读</h2>
          <div>{related.map((item) => <a href={`/knowledge/${item.slug}/`} key={item.slug}><b>{item.zh}</b><span>{item.en}</span><p>{item.summary}</p></a>)}</div>
          <a className="knowledge-essay-back" href={categoryHref}>返回{term.category}目录</a>
        </nav>}
        </article>

        <aside className="knowledge-essay-support">
          <section><h2>本文内容</h2><ul>{contents.slice(0, 8).map((title) => <li key={title}>{title}</li>)}</ul></section>
          {related.length > 0 && <section><h2>延伸阅读</h2><ul>{related.slice(0, 5).map((item) => <li key={item.slug}><a href={`/knowledge/${item.slug}/`}>{item.zh}<small>{item.en}</small></a></li>)}</ul></section>}
          <section><h2>参考资料</h2><ol>{article.sources.slice(0, 3).map((source, index) => (
            <li key={`${source.title}-${index}`}>
              {source.url ? <a href={source.url} target="_blank" rel="noreferrer">[{index + 1}] {source.title}</a> : <span>[{index + 1}] {source.title}</span>}
            </li>
          ))}</ol></section>
        </aside>
      </div>
    </main>
  );
}
