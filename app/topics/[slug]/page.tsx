import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLearningRoute, learningRoutes } from '@/lib/system';

type TopicPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return learningRoutes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const route = getLearningRoute((await params).slug);
  if (!route) return {};
  return {
    title: `${route.title} · 财知道专题`,
    description: route.description,
    openGraph: { title: `${route.title} · ${route.en}`, description: route.description, images: [] },
    twitter: { title: `${route.title} · ${route.en}`, description: route.description, images: [] },
  };
}

export default async function TopicDetailPage({ params }: TopicPageProps) {
  const route = getLearningRoute((await params).slug);
  if (!route) notFound();
  const routeIndex = learningRoutes.findIndex((item) => item.slug === route.slug);
  const previous = routeIndex > 0 ? learningRoutes[routeIndex - 1] : undefined;
  const next = routeIndex < learningRoutes.length - 1 ? learningRoutes[routeIndex + 1] : undefined;

  return (
    <main>
      <section className="topic-detail-hero">
        <p><a href="/topics/">专题路线</a><span>／</span>路线 {route.no}</p>
        <div>
          <span>{route.en}</span><h1>{route.title}</h1><h2>{route.question}</h2><p>{route.description}</p>
          <div><b>{route.minutes}</b><small>预计用时（分钟）</small><b>{route.steps.length}</b><small>个步骤</small></div>
        </div>
      </section>

      <section className="topic-step-list">
        {route.steps.map((step, index) => (
          <article key={step.title}>
            <div className="topic-step-number"><span>第</span><b>{String(index + 1).padStart(2, '0')}</b><i /></div>
            <div className="topic-step-copy"><small>{step.note}</small><h2>{step.title}</h2><p>{step.explanation}</p><div className="topic-step-example"><span>现实例子</span><p>{step.example}</p></div></div>
            <aside><span>进度</span><b>{index + 1} / {route.steps.length}</b></aside>
          </article>
        ))}
      </section>

      <nav className="topic-pagination" aria-label="专题路线翻页">
        {previous ? <a href={`/topics/${previous.slug}/`}><span>← 上一条</span><b>{previous.title}</b></a> : <span />}
        {next ? <a href={`/topics/${next.slug}/`}><span>下一条 →</span><b>{next.title}</b></a> : <a href="/topics/"><span>回到</span><b>专题路线目录</b></a>}
      </nav>
    </main>
  );
}
