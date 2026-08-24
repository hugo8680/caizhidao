import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { historyGuides } from '@/lib/history-guides';
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
  const guide = historyGuides[year];
  if (!event || !guide) notFound();
  const index = timelineEvents.findIndex((item) => item.year === year);
  const previous = index > 0 ? timelineEvents[index - 1] : undefined;
  const next = index < timelineEvents.length - 1 ? timelineEvents[index + 1] : undefined;

  return (
    <main>
      <section className="event-detail-hero"><p><a href="/timeline/">财经发展简史</a><span>／</span>{event.kind}</p><div><small>EVENT {String(index + 1).padStart(2, '0')}</small><strong>{event.year}</strong><h1>{event.title}</h1><p>{event.description}</p></div></section>

      <section className="event-detail-layout">
        <article>
          <section><span>01 · BEFORE THE EVENT</span><h2>它发生在怎样的背景下</h2><p>{guide.context}</p></section>
          <section><span>02 · WHAT HAPPENED</span><h2>核心变化是什么</h2><p>{event.description} {guide.mechanism}</p></section>
          <section className="event-impact"><span>03 · WHY IT MATTERS</span><h2>它改变了什么</h2><blockquote>{event.impact}</blockquote><p>重要的不只是记住年份，而是看清新思想、制度或危机如何改变参与者的约束与行为，并由此产生新的政策工具。</p></section>
          <section><span>04 · COMMON MISREADING</span><h2>不要怎样误读</h2><p>{guide.caveat}</p></section>
          <section><span>05 · USE IT TODAY</span><h2>今天还能怎样使用这段历史</h2><p>{guide.today}</p><div className="event-question"><b>复盘问题</b><p>如果当时一个关键制度条件不存在，事件的传导路径会怎样改变？今天有哪些相似机制，又有哪些环境已经不同？</p></div></section>
        </article>
        <aside><span>EVENT CARD</span><dl><div><dt>年份</dt><dd>{event.year}</dd></div><div><dt>类型</dt><dd>{event.kind}</dd></div><div><dt>序号</dt><dd>{String(index + 1).padStart(2, '0')} / {timelineEvents.length}</dd></div></dl><p>本页属于财经发展简史模块，前后翻页只会进入相邻历史事件。</p></aside>
      </section>

      <nav className="event-pagination" aria-label="历史事件翻页">{previous ? <a href={`/timeline/${previous.year}/`}><span>← 上一事件</span><b>{previous.year} · {previous.title}</b></a> : <a href="/timeline/"><span>← 返回</span><b>历史时间轴目录</b></a>}{next ? <a href={`/timeline/${next.year}/`}><span>下一事件 →</span><b>{next.year} · {next.title}</b></a> : <a href="/timeline/"><span>完成</span><b>返回历史时间轴目录</b></a>}</nav>
    </main>
  );
}
