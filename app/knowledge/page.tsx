import type { Metadata } from 'next';
import { knowledgeCategories, knowledgeTerms } from '@/lib/content';
import { getKnowledgeCategoryByName } from '@/lib/guides';
import { getKnowledgeArticle } from '@/lib/knowledge-articles';
import styles from './knowledge-index.module.css';

export const metadata: Metadata = {
  title: '财经知识库 · 财知道',
  description: `${knowledgeTerms.length} 篇完整财经百科词条，包含定义、机制、公式、案例、现实使用、概念辨析与参考资料。`,
};

export default function KnowledgePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p>百科词条 · Reference</p>
        <h1>财经知识库</h1>
        <p>这里仅收录已经写成完整文章的词条。每篇至少包含定义、机制、案例、常见误解和资料来源；知识地图中尚未展开的概念不会在这里冒充百科文章。</p>
        <dl><div><dt>完整词条</dt><dd>{knowledgeTerms.length} 篇</dd></div><div><dt>主题分类</dt><dd>{knowledgeCategories.length} 类</dd></div><div><dt>内容标准</dt><dd><a href="/editorial-policy/">查看说明</a></dd></div></dl>
      </header>

      <div className={styles.layout}>
        <aside>
          <p>主题分类</p>
          <nav aria-label="百科主题目录">
            {knowledgeCategories.map((category) => {
              const page = getKnowledgeCategoryByName(category);
              const count = knowledgeTerms.filter((term) => term.category === category).length;
              return page ? <a href={`/knowledge/category/${page.slug}/`} key={category}><span>{category}</span><b>{count}</b></a> : null;
            })}
          </nav>
        </aside>

        <div className={styles.groups}>
          {knowledgeCategories.map((category, categoryIndex) => {
            const categoryPage = getKnowledgeCategoryByName(category);
            const terms = knowledgeTerms.filter((term) => term.category === category);
            return (
              <section key={category}>
                <header><span>{String(categoryIndex + 1).padStart(2, '0')}</span><div><h2>{category}</h2>{categoryPage && <p>{categoryPage.overview}</p>}</div></header>
                <div className={styles.termList}>
                  {terms.map((term) => {
                    const article = getKnowledgeArticle(term.slug);
                    return (
                      <a href={`/knowledge/${term.slug}/`} key={term.slug}>
                        <div><h3>{term.zh}</h3><span>{term.en}{term.abbr ? ` · ${term.abbr}` : ''}</span></div>
                        <p>{term.summary}</p>
                        <small>完整词条 · {article?.sources.length ?? 0} 项资料{term.formula ? ' · 含公式' : ''}</small>
                        <b>阅读全文 →</b>
                      </a>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
