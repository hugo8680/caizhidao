import type { Metadata } from 'next';
import { disciplines } from '@/lib/system';

export const metadata: Metadata = {
  title: '财经知识地图 · 财知道',
  description: '按学科与主题梳理财经、金融与经济学概念，建立清晰的知识坐标。',
};

export default function AtlasPage() {
  return (
    <main>
      <section className="atlas-hero atlas-reference-head">
        <div>
          <p>知识结构索引</p>
          <h1>财经知识地图</h1>
          <p className="atlas-hero-lead">按学科和主题查阅概念，了解一项知识属于哪里、与哪些概念相邻。</p>
        </div>
      </section>

      <section className="atlas-directory">
        <div className="atlas-directory-grid">
          {disciplines.map((discipline) => (
            <a className={`tone-${discipline.tone}`} href={`/atlas/${discipline.slug}/`} key={discipline.slug}>
              <header><span>{discipline.no}</span><small>{discipline.en}</small></header>
              <h2>{discipline.name}</h2><strong>{discipline.question}</strong><p>{discipline.summary}</p>
              <ul>{discipline.topics.map((topic) => <li key={topic.title}>{topic.title}<small>{topic.en}</small></li>)}</ul>
              <footer><span>查看学科索引</span><i>→</i></footer>
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}
