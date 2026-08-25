import type { Metadata } from 'next';
import { disciplines, knowledgeNodeCount } from '@/lib/system';

export const metadata: Metadata = {
  title: '财经知识地图 · 财知道',
  description: '用 12 个学科、48 个主题和 240 个知识节点，建立财经、金融与经济学的完整认知坐标。',
};

export default function AtlasPage() {
  const topicCount = disciplines.reduce((sum, item) => sum + item.topics.length, 0);
  return (
    <main>
      <section className="atlas-hero atlas-reference-head">
        <div>
          <p>REFERENCE MAP · 知识结构索引</p>
          <h1>财经知识地图</h1>
          <p className="atlas-hero-lead">这是一张查阅用的学科索引：用 12 个学科、48 个主题和 240 个节点，定位一项知识属于哪里、与什么相邻。</p>
        </div>
        <dl className="atlas-scale">
          <div><dt>学科</dt><dd>{disciplines.length}</dd></div>
          <div><dt>主题</dt><dd>{topicCount}</dd></div>
          <div><dt>概念节点</dt><dd>{knowledgeNodeCount}</dd></div>
        </dl>
      </section>

      <section className="atlas-directory">
        <div className="atlas-directory-grid">
          {disciplines.map((discipline) => (
            <a className={`tone-${discipline.tone}`} href={`/atlas/${discipline.slug}/`} key={discipline.slug}>
              <header><span>{discipline.no}</span><small>{discipline.en}</small></header>
              <h2>{discipline.name}</h2><strong>{discipline.question}</strong><p>{discipline.summary}</p>
              <ul>{discipline.topics.map((topic) => <li key={topic.title}>{topic.title}<small>{topic.en}</small></li>)}</ul>
              <footer><span>查看学科索引</span><b>{discipline.topics.length} 主题 · {discipline.topics.reduce((sum, topic) => sum + topic.concepts.length, 0)} 节点</b><i>→</i></footer>
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}
