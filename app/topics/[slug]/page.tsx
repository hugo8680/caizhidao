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
  return { title: `${route.title} · 财知道专题`, description: route.description };
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
          <div><b>{route.minutes}</b><small>建议分钟</small><b>{route.steps.length}</b><small>递进步骤</small></div>
        </div>
      </section>

      <section className="topic-learning-guide">
        <span>LEARNING METHOD</span>
        <div><h2>怎么走完这条路线？</h2><p>按顺序阅读五个节点，每一步只回答一个小问题。遇到熟悉内容可以跳过，但建议最后用自己的话复述整条因果链。</p></div>
        <ol><li>先读标题并猜答案</li><li>进入节点学习概念</li><li>回到本页连接前后关系</li></ol>
      </section>

      <section className="topic-step-list">
        {route.steps.map((step, index) => (
          <article id={`step-${index + 1}`} key={step.title}>
            <div className="topic-step-number"><span>STEP</span><b>{String(index + 1).padStart(2, '0')}</b><i /></div>
            <div className="topic-step-copy"><small>{step.note}</small><h2>{step.title}</h2><p>{index === 0 ? '先建立起点概念，明确这条路线要解释的对象与边界。' : index === route.steps.length - 1 ? '把前面的机制合并起来，形成可以迁移到新问题的完整解释。' : '把上一步的结论向前推进，观察新的变量如何改变结果。'}</p><a href={step.href}>打开学习节点 →</a></div>
            <aside><span>连接</span><b>{index === 0 ? '起点' : `${index} → ${index + 1}`}</b></aside>
          </article>
        ))}
      </section>

      <section className="topic-recap">
        <div><span>RECAP</span><h2>现在，用一句话串起来</h2><p>{route.question} 尝试不看页面，用“因为…所以…但如果…”复述五个步骤。能说清关系，比记住五个名词更重要。</p></div>
        <a href={`/search/?q=${encodeURIComponent(route.title)}`}>继续检索相关内容 →</a>
      </section>

      <nav className="topic-pagination" aria-label="专题路线翻页">
        {previous ? <a href={`/topics/${previous.slug}/`}><span>← 上一条</span><b>{previous.title}</b></a> : <span />}
        {next ? <a href={`/topics/${next.slug}/`}><span>下一条 →</span><b>{next.title}</b></a> : <a href="/atlas/"><span>回到</span><b>知识地图</b></a>}
      </nav>
    </main>
  );
}
