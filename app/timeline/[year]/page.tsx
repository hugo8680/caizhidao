import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { historyEssays } from '@/lib/history-essays';
import { historyReferences } from '@/lib/history-references';
import { timelineEvents } from '@/lib/system';

type TimelineEventPageProps = { params: Promise<{ year: string }> };

export function generateStaticParams() {
  return timelineEvents.map((event) => ({ year: event.year }));
}

export async function generateMetadata({ params }: TimelineEventPageProps): Promise<Metadata> {
  const { year } = await params;
  const event = timelineEvents.find((item) => item.year === year);
  if (!event) return {};
  return {
    title: `${event.year} · ${event.title} · 财知道`,
    description: `${event.description} ${event.impact}`,
    openGraph: { title: `${event.year} · ${event.title}`, description: event.description, images: [] },
    twitter: { title: `${event.year} · ${event.title}`, description: event.description, images: [] },
  };
}

export default async function TimelineEventPage({ params }: TimelineEventPageProps) {
  const year = (await params).year;
  const event = timelineEvents.find((item) => item.year === year);
  const essay = historyEssays[year];
  const sources = historyReferences[year];
  if (!event || !essay || !sources) notFound();

  return (
    <main className="knowledge-essay-page">
      <header className="knowledge-essay-header">
        <p className="knowledge-essay-breadcrumb"><a href="/timeline/">财经发展简史</a><span>／</span>{event.kind}</p>
        <p className="knowledge-essay-kicker">{event.year} · Economic and Financial History</p>
        <h1>{event.title}</h1>
        <p className="knowledge-essay-question">{event.description}</p>
      </header>

      <article className="knowledge-essay">
        <section>
          <h2>当时的背景</h2>
          {essay.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section>
          <h2>冲击与变化如何传播</h2>
          {essay.transmission.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section>
          <h2>关键事实</h2>
          {essay.evidence.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section>
          <h2>主要争论</h2>
          {essay.debate.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section>
          <h2>留下的制度与知识遗产</h2>
          {essay.legacy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section className="knowledge-essay-sources">
          <h2>史料与参考资料</h2>
          <ol>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span><p>{source.note}</p></li>)}</ol>
        </section>

        <nav className="atlas-topic-back" aria-label="返回财经简史"><a href="/timeline/">← 返回财经发展简史</a></nav>
      </article>
    </main>
  );
}
