import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ActionArrow } from '@/components/action-arrow';
import { getAtlasTopicProfiles } from '@/lib/atlas-content';
import { disciplines } from '@/lib/system';

type DisciplinePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return disciplines.map((discipline) => ({ slug: discipline.slug }));
}

export async function generateMetadata({ params }: DisciplinePageProps): Promise<Metadata> {
  const { slug } = await params;
  const discipline = disciplines.find((item) => item.slug === slug);
  if (!discipline) return {};
  return {
    title: `${discipline.name}知识地图 · 财知道`,
    description: discipline.summary,
    openGraph: { title: `${discipline.name} · ${discipline.en}`, description: discipline.summary, images: [] },
    twitter: { title: `${discipline.name} · ${discipline.en}`, description: discipline.summary, images: [] },
  };
}

export default async function DisciplinePage({ params }: DisciplinePageProps) {
  const { slug } = await params;
  const discipline = disciplines.find((item) => item.slug === slug);
  if (!discipline) notFound();

  return (
    <main className="atlas-index-page">
      <div className="atlas-index-grid">
        <aside className="atlas-index-rail">
          <header><p>学科目录</p><h1>{discipline.name}</h1><small lang="en">{discipline.en}</small></header>
          <nav aria-label="全部学科">
            {disciplines.map((item) => <a className={item.slug === slug ? 'active' : ''} aria-current={item.slug === slug ? 'page' : undefined} href={`/atlas/${item.slug}/`} key={item.slug}><span>{item.no}</span><b>{item.name}</b></a>)}
          </nav>
          <a className="encyclopedia-rail-back" href="/atlas/">完整知识地图 <ActionArrow /></a>
        </aside>

        <section className="discipline-directory">
          <header className="discipline-directory-intro">
            <p><a href="/atlas/">财经知识地图</a><span>／</span>学科 {discipline.no}</p>
            <small>{discipline.en}</small>
            <h2>{discipline.name}</h2>
            <strong>{discipline.question}</strong>
            <p>{discipline.summary}</p>
          </header>

          <div className="discipline-topic-list">
            {discipline.topics.map((topic, topicIndex) => {
              const topicId = String(topicIndex + 1).padStart(2, '0');
              const concepts = getAtlasTopicProfiles(discipline.slug, topicIndex);
              return (
                <article key={topic.title}>
                  <header><span>{discipline.no}.{topicIndex + 1}</span><small>{topic.en}</small></header>
                  <div className="discipline-topic-copy">
                    <h3><a href={`/atlas/${discipline.slug}/topic/${topicId}/`}>{topic.title}</a></h3>
                    <p>{topic.summary}</p>
                    <ul>{concepts.map((concept) => <li key={concept.id}><a href={`/atlas/${discipline.slug}/${concept.id}/`}>{concept.name}<small>{concept.en}</small></a></li>)}</ul>
                    <a className="discipline-topic-read" href={`/atlas/${discipline.slug}/topic/${topicId}/`}>阅读主题文章 <ActionArrow /></a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
