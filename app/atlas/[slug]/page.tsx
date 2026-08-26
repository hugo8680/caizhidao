import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  const index = disciplines.findIndex((item) => item.slug === discipline.slug);
  const previous = index > 0 ? disciplines[index - 1] : undefined;
  const next = index < disciplines.length - 1 ? disciplines[index + 1] : undefined;

  return (
    <main>
      <section className={`discipline-hero tone-${discipline.tone}`}>
        <p><a href="/atlas/">财经知识地图</a><span>／</span>学科 {discipline.no}</p>
        <div><small>{discipline.en}</small><h1>{discipline.name}</h1><h2>{discipline.question}</h2><p>{discipline.summary}</p></div>
      </section>

      <section className="discipline-topic-list">
        {discipline.topics.map((topic, topicIndex) => (
          <article key={topic.title}>
            <header><span>{discipline.no}.{topicIndex + 1}</span><small>{topic.en}</small></header>
            <div className="discipline-topic-copy"><h2><a href={`/atlas/${discipline.slug}/topic/${String(topicIndex + 1).padStart(2, '0')}/`}>{topic.title}</a></h2><p>{topic.summary}</p><p>{topic.concepts.join(' · ')}</p><a href={`/atlas/${discipline.slug}/topic/${String(topicIndex + 1).padStart(2, '0')}/`}>阅读主题科普 →</a></div>
          </article>
        ))}
      </section>

      <nav className="discipline-pagination" aria-label="相邻学科索引">
        {previous ? <a href={`/atlas/${previous.slug}/`}><span>← 上一学科</span><b>{previous.name}</b></a> : <a href="/atlas/"><span>← 返回</span><b>全部学科索引</b></a>}
        {next ? <a href={`/atlas/${next.slug}/`}><span>下一学科 →</span><b>{next.name}</b></a> : <a href="/atlas/"><span>返回</span><b>全部学科索引</b></a>}
      </nav>
    </main>
  );
}
