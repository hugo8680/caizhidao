import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleFrame, type ArticleSectionLink } from '@/components/article-frame';
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
  const eventIndex = timelineEvents.findIndex((item) => item.year === year);
  const previous = timelineEvents[eventIndex - 1];
  const next = timelineEvents[eventIndex + 1];
  const contents: ArticleSectionLink[] = [
    { id: 'context', label: '历史背景' },
    { id: 'transmission', label: '传播机制' },
    { id: 'evidence', label: '关键事实' },
    { id: 'debate', label: '主要争论' },
    { id: 'legacy', label: '制度遗产' },
    { id: 'sources', label: '史料与参考' },
  ];

  return (
    <ArticleFrame
      sectionLabel="财经发展简史"
      sectionHref="/timeline/"
      breadcrumb={<><a href="/timeline/">财经发展简史</a><span>／</span>{event.kind}</>}
      title={event.title}
      english={`${event.year} · Economic and Financial History`}
      meta={<><span>{event.year}</span><span>{event.kind}</span></>}
      contents={contents}
      aside={<>
        <section>
          <h2>事件摘要</h2>
          <p className="reference-aside-copy">{event.description}</p>
        </section>
        <section>
          <h2>带来的变化</h2>
          <p className="reference-aside-copy">{event.impact}</p>
        </section>
        <section>
          <h2>前后事件</h2>
          <ul className="reference-aside-links">
            {previous && <li><a href={`/timeline/${previous.year}/`}><b>{previous.year} · {previous.title}</b><small>上一事件</small></a></li>}
            {next && <li><a href={`/timeline/${next.year}/`}><b>{next.year} · {next.title}</b><small>下一事件</small></a></li>}
          </ul>
        </section>
      </>}
    >
      <section id="context">
        <h2>当时的背景</h2>
        <p className="reference-article-lead">{event.description}</p>
        {essay.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      <section id="transmission">
        <h2>冲击与变化如何传播</h2>
        {essay.transmission.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      <section id="evidence">
        <h2>关键事实</h2>
        {essay.evidence.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      <section id="debate">
        <h2>主要争论</h2>
        {essay.debate.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      <section id="legacy">
        <h2>留下的制度与知识遗产</h2>
        <p className="knowledge-essay-thesis">{event.impact}</p>
        {essay.legacy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      <section id="sources" className="knowledge-essay-sources">
        <h2>史料与参考资料</h2>
        <ol>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span><p>{source.note}</p></li>)}</ol>
      </section>

      <nav className="knowledge-essay-related" aria-label="财经简史事件导航">
        <a className="knowledge-essay-back" href="/timeline/">返回财经发展简史</a>
      </nav>
    </ArticleFrame>
  );
}
