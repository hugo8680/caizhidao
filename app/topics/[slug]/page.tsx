import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routeGuides } from '@/lib/route-guides';
import { routeEssays } from '@/lib/route-essays';
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
  const guide = route ? routeGuides[route.slug] : undefined;
  const essay = route ? routeEssays[route.slug] : undefined;
  if (!route || !guide || !essay) notFound();

  return (
    <main className="knowledge-essay-page">
      <header className="knowledge-essay-header">
        <p className="knowledge-essay-breadcrumb"><a href="/topics/">专题路线</a><span>／</span>专题 {route.no}</p>
        <p className="knowledge-essay-kicker">{route.en}</p>
        <h1>{route.title}</h1>
        <p className="knowledge-essay-question">{route.question}</p>
        <p className="knowledge-essay-deck">{route.description}</p>
      </header>

      <article className="knowledge-essay">
        <section>
          <h2>先说结论</h2>
          <p className="knowledge-essay-thesis">{guide.conclusion}</p>
        </section>

        <section>
          <h2>把问题一步一步拆开</h2>
          <ol className="knowledge-essay-sequence">
            {route.steps.map((step) => (
              <li key={step.title}>
                <p className="knowledge-essay-kicker">{step.note}</p>
                <h3>{step.title}</h3>
                <p>{step.explanation}</p>
                <p><b>现实例子：</b>{step.example}</p>
              </li>
            ))}
          </ol>
        </section>

        {essay.map((section) => <section key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>)}

        <section>
          <h2>现实中怎样验证</h2>
          <ul className="knowledge-essay-checklist">{guide.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section>
          <h2>不能由此直接推出什么</h2>
          <ol className="knowledge-essay-misconceptions">{guide.caveats.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>

        <section className="knowledge-essay-sources">
          <h2>参考资料</h2>
          <ol>{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span><p>{source.note}</p></li>)}</ol>
        </section>

        <nav className="knowledge-essay-related" aria-label="专题相关知识">
          <h2>继续查阅</h2>
          <div>{guide.related.map((item) => <a href={item.href} key={item.href}><b>{item.title}</b><p>{item.note}</p></a>)}</div>
          <a className="knowledge-essay-back" href="/topics/">返回专题路线目录</a>
        </nav>
      </article>
    </main>
  );
}
