import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleFrame, type ArticleSectionLink } from '@/components/article-frame';
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
  const contents: ArticleSectionLink[] = [
    { id: 'conclusion', label: '核心结论' },
    { id: 'steps', label: '问题拆解' },
    ...essay.map((section, index) => ({ id: `analysis-${index + 1}`, label: section.title })),
    { id: 'evidence', label: '现实证据' },
    { id: 'caveats', label: '判断边界' },
    { id: 'sources', label: '参考资料' },
  ];

  return (
    <ArticleFrame
      sectionLabel="财经专题"
      sectionHref="/topics/"
      breadcrumb={<><a href="/topics/">财经专题</a><span>／</span>专题 {route.no}</>}
      title={route.title}
      english={route.en}
      meta={<><span>专题 {route.no}</span><span>约 {route.minutes} 分钟</span></>}
      contents={contents}
      aside={<>
        <section>
          <h2>专题问题</h2>
          <p className="reference-aside-copy">{route.question}</p>
        </section>
        <section>
          <h2>分析路径</h2>
          <ol className="reference-aside-sources">{route.steps.map((step, index) => <li key={step.title}><b>{String(index + 1).padStart(2, '0')} · {step.title}</b><small>{step.note}</small></li>)}</ol>
        </section>
        <section>
          <h2>相邻专题</h2>
          <ul className="reference-aside-links">{learningRoutes.filter((item) => item.slug !== route.slug).slice(0, 4).map((item) => <li key={item.slug}><a href={`/topics/${item.slug}/`}><b>{item.title}</b><small>{item.en}</small></a></li>)}</ul>
        </section>
      </>}
    >
      <section id="conclusion">
        <h2>核心结论</h2>
        <p className="reference-article-question">{route.question}</p>
        <p className="reference-article-lead">{route.description}</p>
        <p className="knowledge-essay-thesis">{guide.conclusion}</p>
      </section>

      <section id="steps">
        <h2>把问题一步一步拆开</h2>
        <ol className="knowledge-essay-sequence">
          {route.steps.map((step) => (
            <li key={step.title}>
              <small>{step.note}</small>
              <h3>{step.title}</h3>
              <p>{step.explanation}</p>
              <p><b>现实例子：</b>{step.example}</p>
            </li>
          ))}
        </ol>
      </section>

      {essay.map((section, index) => <section id={`analysis-${index + 1}`} key={section.title}>
        <h2>{section.title}</h2>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>)}

      <section id="evidence">
        <h2>现实中怎样验证</h2>
        <ul className="knowledge-essay-checklist">{guide.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section id="caveats">
        <h2>不能由此直接推出什么</h2>
        <ol className="knowledge-essay-misconceptions">{guide.caveats.map((item) => <li key={item}>{item}</li>)}</ol>
      </section>

      <section id="sources" className="knowledge-essay-sources">
        <h2>参考资料</h2>
        <ol>{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span><p>{source.note}</p></li>)}</ol>
      </section>

      <nav className="knowledge-essay-related" aria-label="专题相关知识">
        <h2>继续查阅</h2>
        <div>{guide.related.map((item) => <a href={item.href} key={item.href}><b>{item.title}</b><p>{item.note}</p></a>)}</div>
        <a className="knowledge-essay-back" href="/topics/">返回财经专题目录</a>
      </nav>
    </ArticleFrame>
  );
}
