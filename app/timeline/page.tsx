import type { Metadata } from 'next';
import { timelineEvents } from '@/lib/system';

export const metadata: Metadata = {
  title: '财经发展简史 · 财知道',
  description: '从 1776 年到现代，用思想、制度、危机、市场、技术与政策节点理解财经世界如何形成。',
};

const kinds = ['思想', '制度', '危机', '市场', '冲击', '技术', '政策'];

export default function TimelinePage() {
  return (
    <main>
      <section className="timeline-hero">
        <div><p>ECONOMIC & FINANCIAL HISTORY</p><h1>财经发展简史</h1><p>一次思想突破解释旧问题，一场危机暴露制度缺口，一项政策又创造新的行为与风险。把概念放回时间，才能理解它为什么存在。</p></div>
        <aside><span>1776</span><i /><span>2023</span><b>{timelineEvents.length} 个关键节点</b></aside>
      </section>

      <section className="timeline-legend"><span>事件类型</span>{kinds.map((kind) => <b key={kind}>{kind}</b>)}<p>这是一条学习时间轴，不是完整的经济史年表。</p></section>

      <section className="timeline-layout">
        <aside>
          <span>READING LENS</span><h2>看每个节点时，问三个问题</h2>
          <ol><li><b>发生了什么？</b><p>先区分事实、解释与后见之明。</p></li><li><b>改变了什么？</b><p>观察制度、市场参与者与政策工具。</p></li><li><b>留下什么风险？</b><p>新方案通常也会生成新的约束。</p></li></ol>
          <p className="timeline-method-note">点击任一事件会进入独立的历史详情页，不会跳到其他模块或页面中段。</p>
        </aside>
        <div className="timeline-events">
          {timelineEvents.map((event, index) => (
            <article data-kind={event.kind} key={`${event.year}-${event.title}`}>
              <div><span>{event.year}</span><i /><small>{String(index + 1).padStart(2, '0')}</small></div>
              <a className="timeline-event-link" href={`/timeline/${event.year}/`}><header><b>{event.kind}</b><small>{index === 0 ? '起点' : `${Number(event.year) - Number(timelineEvents[index - 1].year)} 年后`}</small></header><h2>{event.title}</h2><p>{event.description}</p><blockquote><span>它改变了什么</span>{event.impact}</blockquote><strong>阅读事件详情 →</strong></a>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline-end"><span>HISTORY CONTINUES</span><h2>历史不会重复，<br />但机制经常押韵。</h2><p>下一次读到“前所未有”的财经新闻时，试着寻找它对应的旧机制：杠杆、流动性、预期、激励或制度约束。</p><a href="/timeline/1776/">从第一个历史节点开始 →</a></section>
    </main>
  );
}
