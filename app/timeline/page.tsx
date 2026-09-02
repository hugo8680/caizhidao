import type { Metadata } from 'next';
import { ActionArrow } from '@/components/action-arrow';
import { timelineEvents } from '@/lib/system';

export const metadata: Metadata = {
  title: '财经发展简史 · 财知道',
  description: '从 1776 年到现代，沿思想、制度、危机、市场、技术与政策变化理解财经世界如何形成。',
};

export default function TimelinePage() {
  return (
    <main className="timeline-index-page">
      <div className="timeline-index-grid">
        <aside className="timeline-index-rail">
          <header><p>思想与制度</p><h1>财经发展简史</h1><small>{timelineEvents.length} 个关键事件</small></header>
          <nav aria-label="年代目录">{timelineEvents.map((event) => <a href={`/timeline/${event.year}/`} key={`${event.year}-${event.title}`}><span>{event.year}</span><b>{event.title}</b></a>)}</nav>
        </aside>

        <section className="timeline-index-body">
          <header><h2>从 1776 年到现代</h2><p>把概念放回它出现的制度与危机之中，理解今天的市场、政策与监管为何形成。</p></header>
          <div className="timeline-events">
            {timelineEvents.map((event, index) => (
              <article data-kind={event.kind} key={`${event.year}-${event.title}`}>
                <div><span>{event.year}</span><small>{String(index + 1).padStart(2, '0')}</small></div>
                <a className="timeline-event-link" href={`/timeline/${event.year}/`}><header><b>{event.kind}</b><small>{index === 0 ? '起点' : `${Number(event.year) - Number(timelineEvents[index - 1].year)} 年后`}</small></header><h3>{event.title}</h3><p>{event.description}</p><blockquote><span>带来的变化</span>{event.impact}</blockquote><strong>查看详情 <ActionArrow /></strong></a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
