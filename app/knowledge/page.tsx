import type { Metadata } from 'next';
import { ConceptVisual } from '@/components/concept-visual';
import { knowledgeCategories, knowledgeTerms } from '@/lib/content';
import { getKnowledgeCategoryByName } from '@/lib/guides';

export const metadata: Metadata = {
  title: '财经知识库 · 财知道',
  description: '专业、通俗的财经名词解释，包含作用机制、公式、可复算案例、现实分析、概念辨析与参考资料。',
};

export default function KnowledgePage() {
  return (
    <main>
      <section className="reference-index-head">
        <div><span>百科词条</span><h1>财经知识库</h1><p>按主题查找专业定义、作用机制、公式、现实案例、概念辨析与参考资料。</p></div>
      </section>
      <section className="knowledge-layout">
        <aside><span>主题分类</span>{knowledgeCategories.map((category) => {
          const page = getKnowledgeCategoryByName(category);
          return page ? <a href={`/knowledge/category/${page.slug}/`} key={category}>{category}</a> : null;
        })}</aside>
        <div className="knowledge-groups">
          {knowledgeCategories.map((category, categoryIndex) => (
            <section className="knowledge-group" key={category}>
              <header><span>{String(categoryIndex + 1).padStart(2, '0')}</span><h2>{category}</h2></header>
              <div className="knowledge-list">
                {knowledgeTerms.filter((term) => term.category === category).map((term) => <a href={`/knowledge/${term.slug}/`} key={term.slug} className="knowledge-card">
                  <ConceptVisual type={term.visual} label={term.zh} />
                  <div className="knowledge-copy"><span>{term.category}</span><h2>{term.zh}</h2><h3>{term.en}{term.abbr ? ` · ${term.abbr}` : ''}</h3><p>{term.summary}</p><b>查看解释 →</b></div>
                </a>)}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
