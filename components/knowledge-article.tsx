import type { KnowledgeTerm } from '@/lib/content';
import type { KnowledgeArticle } from '@/lib/knowledge-articles';
import { ArticleFrame, type ArticleSectionLink } from './article-frame';

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
  const contents: ArticleSectionLink[] = [
    { id: 'definition', label: '定义与边界' },
    { id: 'mechanism', label: '它是怎样运作的' },
    ...article.analysis.map((section, index) => ({ id: `analysis-${index + 1}`, label: section.title })),
    ...(article.formulas && article.formulas.length > 0 ? [{ id: 'formula', label: '公式与变量' }] : []),
    { id: 'example', label: article.example.title },
    { id: 'interpretation', label: '现实中的观察与使用' },
    { id: 'distinctions', label: '相关概念辨析' },
    { id: 'checklist', label: '分析检查项' },
    { id: 'misconceptions', label: '常见误解' },
    { id: 'english', label: '英文定义' },
    { id: 'sources', label: '参考资料' },
  ];

  return (
    <ArticleFrame
      sectionLabel="财经知识库"
      sectionHref="/knowledge/"
      breadcrumb={<><a href="/knowledge/">百科词条</a><span>／</span><a href={categoryHref}>{term.category}</a></>}
      title={term.zh}
      english={`${term.en}${term.abbr ? ` · ${term.abbr}` : ''}`}
      meta={<><span>{term.category}</span><span>百科词条</span></>}
      contents={contents}
      aside={<>
        <section>
          <h2>词条信息</h2>
          <dl className="reference-fact-list">
            <div><dt>中文名称</dt><dd>{term.zh}</dd></div>
            <div><dt>英文名称</dt><dd lang="en">{term.en}</dd></div>
            {term.abbr && <div><dt>常用缩写</dt><dd>{term.abbr}</dd></div>}
            <div><dt>所属分类</dt><dd><a href={categoryHref}>{term.category}</a></dd></div>
          </dl>
        </section>
        {related.length > 0 && <section>
          <h2>相关词条</h2>
          <ul className="reference-aside-links">{related.slice(0, 6).map((item) => <li key={item.slug}><a href={`/knowledge/${item.slug}/`}><b>{item.zh}</b><small>{item.en}</small></a></li>)}</ul>
        </section>}
        <section>
          <h2>主要资料</h2>
          <ol className="reference-aside-sources">{article.sources.slice(0, 4).map((source, index) => <li key={`${source.title}-${index}`}>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a> : source.title}<small>{source.publisher}</small></li>)}</ol>
        </section>
      </>}
    >
        <section id="definition" className="knowledge-essay-opening">
          <h2>定义与边界</h2>
          <p className="reference-article-question">{article.question}</p>
          <p className="reference-article-lead">{term.summary}</p>
          {article.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="knowledge-essay-thesis">{article.takeaway}</p>
        </section>

        <section id="mechanism">
          <h2>它是怎样运作的</h2>
          <ol className="knowledge-essay-sequence">
            {article.mechanism.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}
          </ol>
        </section>

        {article.analysis.map((section, index) => <section id={`analysis-${index + 1}`} key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>)}

        {article.formulas && article.formulas.length > 0 && <section id="formula">
          <h2>公式与变量</h2>
          {article.formulas.map((formula) => <div className="knowledge-essay-formula" key={formula.expression}>
            <strong>{formula.expression}</strong>
            <p>{formula.explanation}</p>
            <dl>{formula.variables.map((variable) => <div key={variable.symbol}><dt>{variable.symbol}</dt><dd>{variable.meaning}</dd></div>)}</dl>
          </div>)}
        </section>}

        <section id="example">
          <h2>{article.example.title}</h2>
          <p>{article.example.setup}</p>
          <ol className="knowledge-essay-calculation">{article.example.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <p className="knowledge-essay-conclusion">{article.example.conclusion}</p>
        </section>

        <section id="interpretation">
          <h2>现实中的观察与使用</h2>
          {article.interpretation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section id="distinctions">
          <h2>相关概念辨析</h2>
          <dl className="knowledge-essay-distinctions">
            {article.distinctions.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.explanation}</dd></div>)}
          </dl>
        </section>

        <section id="checklist">
          <h2>分析检查项</h2>
          <ul className="knowledge-essay-checklist">{article.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section id="misconceptions">
          <h2>常见误解</h2>
          <ol className="knowledge-essay-misconceptions">{article.misconceptions.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>

        <section id="english" className="knowledge-essay-english">
          <h2>英文定义</h2>
          <p lang="en">{term.definitionEn}</p>
        </section>

        <section id="sources" className="knowledge-essay-sources">
          <h2>参考资料</h2>
          <ol>{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span><p>{source.note}</p></li>)}</ol>
        </section>

        {related.length > 0 && <nav className="knowledge-essay-related" aria-label="相关词条">
          <h2>继续阅读</h2>
          <div>{related.map((item) => <a href={`/knowledge/${item.slug}/`} key={item.slug}><b>{item.zh}</b><span>{item.en}</span><p>{item.summary}</p></a>)}</div>
          <a className="knowledge-essay-back" href={categoryHref}>返回{term.category}目录</a>
        </nav>}
    </ArticleFrame>
  );
}
