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
    <main className="atlas-map-page">
      <section className="atlas-map-intro">
        <div><p>知识结构索引</p><h1>财经知识地图</h1></div>
        <p>十二个学科展开为四十八篇主题文章。每篇围绕一个真实经济问题，说明五个核心概念的定义、关系、证据和适用边界。</p>
      </section>

      <section className="atlas-map-directory">
        {disciplines.map((discipline) => (
          <article className="atlas-map-discipline" key={discipline.slug}>
            <header className="atlas-map-discipline-head">
              <span className="atlas-map-number">{discipline.no}</span>
              <div>
                <small>{discipline.en}</small>
                <h2>{discipline.name}</h2>
                <strong>{discipline.question}</strong>
                <p>{discipline.summary}</p>
              </div>
              <a href={`/atlas/${discipline.slug}/`}><span>阅读学科说明</span><ActionArrow /></a>
            </header>

            <div className="atlas-map-topics">
              {discipline.topics.map((topic, topicIndex) => {
                const concepts = getAtlasTopicProfiles(discipline.slug, topicIndex);
                return (
                  <section className="atlas-map-topic" key={topic.title}>
                    <header>
                      <span>{String(topicIndex + 1).padStart(2, '0')}</span>
                      <div><h3><a href={`/atlas/${discipline.slug}/topic/${String(topicIndex + 1).padStart(2, '0')}/`}>{topic.title}</a></h3><small>{topic.en}</small></div>
                    </header>
                    <p>{topic.summary}</p>
                    <ul>
                      {concepts.map((concept) => <li key={concept.id}><span><b>{concept.name}</b><small>{concept.en}</small></span></li>)}
                    </ul>
                    <a className="atlas-map-topic-read" href={`/atlas/${discipline.slug}/topic/${String(topicIndex + 1).padStart(2, '0')}/`}><span>阅读主题文章</span><ActionArrow /></a>
                  </section>
                );
              })}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
