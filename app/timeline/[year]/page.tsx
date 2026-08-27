import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { historyGuides } from '@/lib/history-guides';
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
  const guide = historyGuides[year];
  const sources = historyReferences[year];
  if (!event || !guide || !sources) notFound();

  return (
    <main className="knowledge-essay-page">
      <header className="knowledge-essay-header">
        <p className="knowledge-essay-breadcrumb"><a href="/timeline/">财经发展简史</a><span>／</span>{event.kind}</p>
        <p className="knowledge-essay-kicker">{event.year} · Economic and Financial History</p>
        <h1>{event.title}</h1>
        <p className="knowledge-essay-question">{event.description}</p>
        <p className="knowledge-essay-deck">历史事件不是孤立日期。理解它，需要同时看到当时的制度、资产负债表、政策选择和冲击传播。</p>
      </header>

      <article className="knowledge-essay">
        <section>
          <h2>当时的背景</h2>
          <p>{guide.context}</p>
        </section>

        <section>
          <h2>变化是怎样传开的</h2>
          <p>{event.description} {guide.mechanism}</p>
          <p className="knowledge-essay-thesis">{event.impact}</p>
        </section>

        <section>
          <h2>容易被简化的地方</h2>
          <p>{guide.caveat}</p>
        </section>

        <section>
          <h2>为什么今天仍值得理解</h2>
          <p>{guide.today}</p>
        </section>

        <section className="knowledge-essay-sources">
          <h2>史料与参考资料</h2>
          <p>历史解释可能存在争论。这里优先列出原始文本、官方调查、国际机构和中央银行资料，便于核对事实与不同解释。</p>
          <ol>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span><p>{source.note}</p></li>)}</ol>
        </section>

        <nav className="atlas-topic-back" aria-label="返回财经简史"><a href="/timeline/">← 返回财经发展简史</a></nav>
      </article>
    </main>
  );
}
