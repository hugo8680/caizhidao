import type { Metadata } from 'next';
import { learningRoutes } from '@/lib/system';

export const metadata: Metadata = {
  title: '财经专题路线 · 财知道',
  description: '从钱的诞生、价格、经济周期、公司分析、投资、家庭财务、全球资本与行为偏差八个问题出发学习财经知识。',
};

export default function TopicsPage() {
  return (
    <main>
      <section className="page-hero topics-hero">
        <p>GUIDED EXPLORATION · 专题路线</p>
        <h1>不从术语表开始，<br />从一个你真正关心的问题开始。</h1>
        <div className="hero-metrics"><span><b>{learningRoutes.length}</b>条路线</span><span><b>{learningRoutes.reduce((sum, route) => sum + route.steps.length, 0)}</b>个步骤</span><span><b>跨学科</b>连接理解</span></div>
      </section>
      <section className="topics-intro">
        <div><span>HOW IT WORKS</span><h2>每条路线都是一条因果链</h2></div>
        <p>先建立直觉，再补概念；先理解机制，再观察数据；最后把知识放回生活或市场。每个步骤都连接到知识地图、百科或可操作工具。</p>
      </section>
      <section className="topics-index-grid">
        {learningRoutes.map((route) => (
          <a href={`/topics/${route.slug}/`} key={route.slug}>
            <header><span>{route.no}</span><small>{route.minutes} MIN · {route.steps.length} STEPS</small></header>
            <h2>{route.title}</h2><h3>{route.en}</h3><strong>{route.question}</strong><p>{route.description}</p>
            <ol>{route.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span>{step.title}<small>{step.note}</small></li>)}</ol>
            <footer><b>进入专题</b><i>→</i></footer>
          </a>
        ))}
      </section>
    </main>
  );
}
