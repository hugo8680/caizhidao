import type { Metadata } from 'next';
import { ActionArrow } from '@/components/action-arrow';
import { learningRoutes } from '@/lib/system';

export const metadata: Metadata = {
  title: '财经专题 · 财知道',
  description: '从钱的诞生、价格、经济周期、公司分析、投资、家庭财务、全球资本与行为偏差八个问题出发学习财经知识。',
};

export default function TopicsPage() {
  return (
    <main className="topic-index-page">
      <div className="topic-index-grid">
        <aside className="topic-index-rail">
          <header><p>问题式阅读</p><h1>财经专题</h1><small>{learningRoutes.length} 个现实问题</small></header>
          <nav aria-label="专题目录">{learningRoutes.map((route) => <a href={`/topics/${route.slug}/`} key={route.slug}><span>{route.no}</span><b>{route.title}</b></a>)}</nav>
        </aside>
        <section className="topic-index-body">
          {learningRoutes.map((route) => (
            <article className="topic-index-row" key={route.slug}>
              <span>{route.no}</span>
              <div>
                <small>{route.en}</small>
                <h2><a href={`/topics/${route.slug}/`}>{route.title}</a></h2>
                <strong>{route.question}</strong>
                <p>{route.description}</p>
                <ol>{route.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><b>{step.title}</b><small>{step.note}</small></li>)}</ol>
              </div>
              <a className="topic-index-read" href={`/topics/${route.slug}/`}>阅读专题 <ActionArrow /></a>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
