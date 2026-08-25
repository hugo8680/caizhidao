import type { Metadata } from 'next';
import { timelineEvents } from '@/lib/system';

export const metadata: Metadata = {
  title: '财经发展简史 · 财知道',
  description: '从 1776 年到现代，用思想、制度、危机、市场、技术与政策节点理解财经世界如何形成。',
};

export default function TimelinePage() {
  return (
    <main>
      <section className="timeline-hero">
        <div><p>ECONOMIC & FINANCIAL HISTORY</p><h1>财经发展简史</h1><p>一次思想突破解释旧问题，一场危机暴露制度缺口，一项政策又创造新的行为与风险。把概念放回时间，才能理解它为什么存在。</p></div>
        <aside><span>1776</span><i /><span>2023</span><b>{timelineEvents.length} 个关键节点</b></aside>
      </section>

      <section className="timeline-layout timeline-content-only">
        <div className="timeline-events">
          {timelineEvents.map((event, index) => (
            <article data-kind={event.kind} key={`${event.year}-${event.title}`}>
              <div><span>{event.year}</span><i /><small>{String(index + 1).padStart(2, '0')}</small></div>
              <a className="timeline-event-link" href={`/timeline/${event.year}/`}><header><b>{event.kind}</b><small>{index === 0 ? '起点' : `${Number(event.year) - Number(timelineEvents[index - 1].year)} 年后`}</small></header><h2>{event.title}</h2><p>{event.description}</p><blockquote><span>它改变了什么</span>{event.impact}</blockquote><strong>阅读事件详情 →</strong></a>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
