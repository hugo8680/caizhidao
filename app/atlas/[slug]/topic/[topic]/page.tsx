import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAtlasTopicProfiles } from '@/lib/atlas-content';
import { atlasTopicArticles } from '@/lib/atlas-topic-articles';
import { knowledgeTerms } from '@/lib/content';
import { disciplines } from '@/lib/system';

type AtlasTopicPageProps = { params: Promise<{ slug: string; topic: string }> };

export function generateStaticParams() {
  return disciplines.flatMap((discipline) => discipline.topics.map((_, topicIndex) => ({
    slug: discipline.slug,
    topic: String(topicIndex + 1).padStart(2, '0'),
  })));
}

function getTopic(slug: string, topicId: string) {
  const discipline = disciplines.find((item) => item.slug === slug);
  const topicIndex = Number(topicId) - 1;
  const topic = /^\d{2}$/.test(topicId) ? discipline?.topics[topicIndex] : undefined;
  const article = atlasTopicArticles[`${slug}:${topicId}`];
  return discipline && topic && article ? { discipline, topic, topicIndex, article } : undefined;
}

export async function generateMetadata({ params }: AtlasTopicPageProps): Promise<Metadata> {
  const { slug, topic } = await params;
  const entry = getTopic(slug, topic);
  if (!entry) return {};
  return {
    title: `${entry.topic.title}：${entry.article.question} · 财知道`,
    description: entry.article.thesis,
    alternates: { canonical: `/atlas/${slug}/topic/${topic}/` },
    openGraph: { title: `${entry.topic.title} · ${entry.topic.en}`, description: entry.article.thesis, images: [] },
    twitter: { title: `${entry.topic.title} · ${entry.topic.en}`, description: entry.article.thesis, images: [] },
  };
}

export default async function AtlasTopicPage({ params }: AtlasTopicPageProps) {
  const { slug, topic: topicId } = await params;
  const entry = getTopic(slug, topicId);
  if (!entry) notFound();
  const { discipline, topic, topicIndex, article } = entry;
  const concepts = getAtlasTopicProfiles(slug, topicIndex);
  const example = concepts[0]?.example;
  const references = concepts[0]?.references ?? [];

  return (
    <main className="atlas-topic-essay-page">
      <header className="atlas-topic-essay-header">
        <p className="knowledge-essay-breadcrumb"><a href="/atlas/">财经知识地图</a><span>／</span><a href={`/atlas/${slug}/`}>{discipline.name}</a></p>
        <p className="knowledge-essay-kicker">{topic.en} · {discipline.en}</p>
        <h1>{topic.title}</h1>
        <p className="atlas-topic-question">{article.question}</p>
        <p className="atlas-topic-summary">{topic.summary}</p>
      </header>

      <article className="atlas-topic-essay">
        <section>
          <h2>从一个现实问题开始</h2>
          <p>{example}</p>
          <p className="knowledge-essay-thesis">{article.thesis}</p>
        </section>

        <section>
          <h2>五个概念如何连在一起</h2>
          <p>{article.relationship}</p>
          <div className="atlas-topic-concepts">
            {concepts.map((concept, conceptIndex) => {
              const knowledgeTerm = knowledgeTerms.find((term) => term.zh === concept.name);
              return <section key={concept.id}>
                <header><span>{String(conceptIndex + 1).padStart(2, '0')}</span><div><h3>{concept.name}</h3><small>{concept.en}</small></div></header>
                <p>{concept.brief}</p>
                {knowledgeTerm && <a href={`/knowledge/${knowledgeTerm.slug}/`}>阅读“{knowledgeTerm.zh}”百科词条 →</a>}
              </section>;
            })}
          </div>
        </section>

        {article.analysis.map((section) => <section key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>)}

        <section>
          <h2>怎样用证据判断</h2>
          <p>{article.evidence}</p>
          <ul className="knowledge-essay-checklist">{article.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section>
          <h2>适用边界与常见误解</h2>
          <p>{article.boundary}</p>
          <ol className="knowledge-essay-misconceptions">{article.misconceptions.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>

        {references.length > 0 && <section className="knowledge-essay-sources">
          <h2>参考资料</h2>
          <ol>{references.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span><p>{source.note}</p></li>)}</ol>
        </section>}

        <nav className="atlas-topic-back" aria-label="返回学科目录"><a href={`/atlas/${slug}/`}>← 返回{discipline.name}的四个主题</a></nav>
      </article>
    </main>
  );
}
