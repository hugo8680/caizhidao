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
      <section className="event-detail-hero"><p><a href="/timeline/">财经发展简史</a><span>／</span>{event.kind}</p><div><small>第 {index + 1} 个节点</small><strong>{event.year}</strong><h1>{event.title}</h1><p>{event.description}</p></div></section>

      <section className="event-detail-layout">
        <article>
          <section><span>背景</span><h2>当时发生了什么</h2><p>{guide.context}</p></section>
          <section><span>过程</span><h2>变化是怎样传开的</h2><p>{event.description} {guide.mechanism}</p></section>
          <section className="event-impact"><span>影响</span><h2>它带来了什么变化</h2><blockquote>{event.impact}</blockquote></section>
          <section><span>容易忽略</span><h2>不能只看表面</h2><p>{guide.caveat}</p></section>
          <section><span>当代影响</span><h2>对今天的影响</h2><p>{guide.today}</p></section>
        </article>
        <aside><span>事件信息</span><dl><div><dt>年份</dt><dd>{event.year}</dd></div><div><dt>类型</dt><dd>{event.kind}</dd></div><div><dt>序号</dt><dd>{String(index + 1).padStart(2, '0')} / {timelineEvents.length}</dd></div></dl></aside>
      </section>

      <nav className="event-pagination" aria-label="历史事件翻页">{previous ? <a href={`/timeline/${previous.year}/`}><span>← 上一事件</span><b>{previous.year} · {previous.title}</b></a> : <a href="/timeline/"><span>← 返回</span><b>历史时间轴目录</b></a>}{next ? <a href={`/timeline/${next.year}/`}><span>下一事件 →</span><b>{next.year} · {next.title}</b></a> : <a href="/timeline/"><span>完成</span><b>返回历史时间轴目录</b></a>}</nav>
    </main>
  );
}
