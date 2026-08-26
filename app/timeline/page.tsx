import type { Metadata } from 'next';
import { timelineEvents } from '@/lib/system';

export const metadata: Metadata = {
  title: '财经发展简史 · 财知道',
  description: '从 1776 年到现代，沿思想、制度、危机、市场、技术与政策变化理解财经世界如何形成。',
};

export default function TimelinePage() {
  return (
    <main>
      <section className="timeline-hero">
        <div><p>财经简史</p><h1>财经发展简史</h1><p>许多今天习以为常的制度，都经历过危机、争论和反复调整。沿着时间往回看，更容易理解它们为什么出现。</p></div>
      </section>

      <section className="timeline-layout timeline-content-only">
        <div className="timeline-events">
          {timelineEvents.map((event, index) => (
            <article data-kind={event.kind} key={`${event.year}-${event.title}`}>
              <div><span>{event.year}</span><i /><small>{String(index + 1).padStart(2, '0')}</small></div>
              <a className="timeline-event-link" href={`/timeline/${event.year}/`}><header><b>{event.kind}</b><small>{index === 0 ? '起点' : `${Number(event.year) - Number(timelineEvents[index - 1].year)} 年后`}</small></header><h2>{event.title}</h2><p>{event.description}</p><blockquote><span>带来的变化</span>{event.impact}</blockquote><strong>查看详情 →</strong></a>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
