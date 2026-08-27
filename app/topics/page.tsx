import type { Metadata } from 'next';
import { learningRoutes } from '@/lib/system';

export const metadata: Metadata = {
  title: '财经专题路线 · 财知道',
  description: '从钱的诞生、价格、经济周期、公司分析、投资、家庭财务、全球资本与行为偏差八个问题出发学习财经知识。',
};

export default function TopicsPage() {
  return (
    <main>
      <header className="catalog-head standalone-catalog-head"><div><span>学习 / 专题</span><h1>专题学习路线</h1></div></header>
      <section className="topics-index-grid">
        {learningRoutes.map((route) => (
          <a href={`/topics/${route.slug}/`} key={route.slug}>
            <header><span>{route.no}</span></header>
            <h2>{route.title}</h2><h3>{route.en}</h3><strong>{route.question}</strong><p>{route.description}</p>
            <ol>{route.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span>{step.title}<small>{step.note}</small></li>)}</ol>
            <footer><b>进入专题</b><i>→</i></footer>
          </a>
        ))}
      </section>
    </main>
  );
}
