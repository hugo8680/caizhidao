import type { Metadata } from 'next';
import { ActionArrow } from '@/components/action-arrow';
import { getAtlasTopicProfiles } from '@/lib/atlas-content';
import { disciplines } from '@/lib/system';

export const metadata: Metadata = {
  title: '财经知识地图 · 财知道',
  description: '按学科与主题梳理财经、金融与经济学概念，建立清晰的知识坐标。',
};

export default function AtlasPage() {
  return (
    <main className="atlas-index-page">
      <div className="atlas-index-grid">
        <aside className="atlas-index-rail">
          <header><p>知识结构</p><h1>财经知识地图</h1><small>12 个学科 · 48 个主题</small></header>
          <nav aria-label="学科目录">
            {disciplines.map((discipline) => <a href={`/atlas/${discipline.slug}/`} key={discipline.slug}><span>{discipline.no}</span><b>{discipline.name}</b></a>)}
          </nav>
        </aside>

        <section className="atlas-index-body">
          {disciplines.map((discipline) => (
            <article className="atlas-index-discipline" key={discipline.slug}>
              <header>
                <span>{discipline.no}</span>
                <div><small>{discipline.en}</small><h2>{discipline.name}</h2><strong>{discipline.question}</strong><p>{discipline.summary}</p></div>
                <a href={`/atlas/${discipline.slug}/`}>学科目录 <ActionArrow /></a>
              </header>
              <div className="atlas-index-topics">
                {discipline.topics.map((topic, topicIndex) => {
                  const concepts = getAtlasTopicProfiles(discipline.slug, topicIndex);
                  const topicId = String(topicIndex + 1).padStart(2, '0');
                  return (
                    <section key={topic.title}>
                      <a href={`/atlas/${discipline.slug}/topic/${topicId}/`}>
                        <span>{discipline.no}.{topicIndex + 1}</span>
                        <div><h3>{topic.title}</h3><small>{topic.en}</small><p>{topic.summary}</p></div>
                        <ActionArrow />
                      </a>
                      <ul>{concepts.map((concept) => <li key={concept.id}><a href={`/atlas/${discipline.slug}/${concept.id}/`}>{concept.name}</a></li>)}</ul>
                    </section>
                  );
                })}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
