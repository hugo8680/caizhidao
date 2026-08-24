import type { Metadata } from 'next';
import { ConceptVisual } from '@/components/concept-visual';
import { knowledgeCategories, knowledgeTerms } from '@/lib/content';
import { getKnowledgeCategoryByName } from '@/lib/guides';

export const metadata: Metadata = {
  title: '财经知识库 · 财知道',
  description: '中英双语财经名词解释、概念图解、公式与学习趣闻。',
};

export default function KnowledgePage() {
  return (
    <main>
      <section className="page-hero compact-hero"><p>KNOWLEDGE BASE · 知识库</p><h1>把陌生名词，变成<br />一眼能懂的知识卡片。</h1><div><b>{knowledgeTerms.length}</b><span>个核心概念<br />包含英文、图解与趣闻</span></div></section>
      <section className="knowledge-layout">
        <aside><span>按主题进入独立页面</span>{knowledgeCategories.map((category) => {
          const page = getKnowledgeCategoryByName(category);
          return page ? <a href={`/knowledge/category/${page.slug}/`} key={category}>{category}</a> : null;
        })}</aside>
        <div className="knowledge-groups">
          {knowledgeCategories.map((category, categoryIndex) => (
            <section className="knowledge-group" key={category}>
              <header><span>{String(categoryIndex + 1).padStart(2, '0')}</span><h2>{category}</h2><small>{knowledgeTerms.filter((term) => term.category === category).length} 个概念</small></header>
              <div className="knowledge-list">
                {knowledgeTerms.filter((term) => term.category === category).map((term) => <a href={`/knowledge/${term.slug}/`} key={term.slug} className="knowledge-card">
                  <ConceptVisual type={term.visual} label={term.zh} />
                  <div className="knowledge-copy"><span>{term.category}</span><h2>{term.zh}</h2><h3>{term.en}{term.abbr ? ` · ${term.abbr}` : ''}</h3><p>{term.summary}</p><b>查看公式、英文解释与案例 →</b></div>
                </a>)}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
