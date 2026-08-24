import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { disciplines } from '@/lib/system';

type DisciplinePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return disciplines.map((discipline) => ({ slug: discipline.slug }));
}

export async function generateMetadata({ params }: DisciplinePageProps): Promise<Metadata> {
  const { slug } = await params;
  const discipline = disciplines.find((item) => item.slug === slug);
  if (!discipline) return {};
  return {
    title: `${discipline.name}知识地图 · 财知道`,
    description: `${discipline.summary} 包含 ${discipline.topics.length} 个主题和 ${discipline.topics.reduce((sum, topic) => sum + topic.concepts.length, 0)} 个概念节点。`,
    openGraph: { title: `${discipline.name} · ${discipline.en}`, description: discipline.summary, images: [] },
    twitter: { title: `${discipline.name} · ${discipline.en}`, description: discipline.summary, images: [] },
  };
}

export default async function DisciplinePage({ params }: DisciplinePageProps) {
  const { slug } = await params;
  const discipline = disciplines.find((item) => item.slug === slug);
  if (!discipline) notFound();
  const index = disciplines.findIndex((item) => item.slug === discipline.slug);
  const previous = index > 0 ? disciplines[index - 1] : undefined;
  const next = index < disciplines.length - 1 ? disciplines[index + 1] : undefined;

  return (
    <main>
      <section className={`discipline-hero tone-${discipline.tone}`}>
        <p><a href="/atlas/">财经知识地图</a><span>／</span>学科 {discipline.no}</p>
        <div><small>{discipline.en}</small><h1>{discipline.name}</h1><h2>{discipline.question}</h2><p>{discipline.summary}</p></div>
        <aside><b>{discipline.topics.length}</b><span>个主题</span><b>{discipline.topics.reduce((sum, topic) => sum + topic.concepts.length, 0)}</b><span>个节点</span></aside>
      </section>

      <section className="discipline-boundary">
        <div><span>WHAT IT STUDIES</span><h2>这个学科负责解释什么？</h2></div>
        <p>{discipline.summary} 它提供的是一组观察问题的框架：先确定参与者和约束，再梳理变量之间的关系，最后检查结论在哪些条件下会改变。</p>
      </section>

      <section className="discipline-topic-list">
        {discipline.topics.map((topic, topicIndex) => (
          <article key={topic.title}>
            <header><span>{discipline.no}.{topicIndex + 1}</span><small>{topic.en}</small></header>
            <div className="discipline-topic-copy"><h2>{topic.title}</h2><p>{topic.summary}</p></div>
            <div className="discipline-concepts">
              {topic.concepts.map((concept, conceptIndex) => <div key={concept}><span>{String(conceptIndex + 1).padStart(2, '0')}</span><b>{concept}</b></div>)}
            </div>
          </article>
        ))}
      </section>

      <section className="discipline-sequence">
        <header><span>CONNECTIONS</span><h2>四个主题如何连接</h2><p>按顺序阅读，可以把零散术语还原成一个完整分析过程。</p></header>
        <ol>{discipline.topics.map((topic, topicIndex) => <li key={topic.title}><span>{String(topicIndex + 1).padStart(2, '0')}</span><div><b>{topic.title}</b><p>{topic.summary}</p></div>{topicIndex < discipline.topics.length - 1 && <i>→</i>}</li>)}</ol>
      </section>

      <section className="discipline-self-check">
        <span>SELF CHECK</span><h2>学完这张地图，试着回答</h2>
        <div><p>① {discipline.question}</p><p>② 四个主题分别解决哪一层问题？</p><p>③ 哪两个概念最容易被混淆，它们的边界是什么？</p><p>④ 如果一个关键条件改变，原来的结论还成立吗？</p></div>
      </section>

      <nav className="discipline-pagination" aria-label="学科翻页">
        {previous ? <a href={`/atlas/${previous.slug}/`}><span>← 上一学科</span><b>{previous.name}</b></a> : <a href="/atlas/"><span>← 返回</span><b>知识地图目录</b></a>}
        {next ? <a href={`/atlas/${next.slug}/`}><span>下一学科 →</span><b>{next.name}</b></a> : <a href="/atlas/"><span>完成</span><b>返回知识地图目录</b></a>}
      </nav>
    </main>
  );
}
