import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleFrame, type ArticleSectionLink } from '@/components/article-frame';
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
  const contents: ArticleSectionLink[] = [
    { id: 'question', label: '现实问题与结论' },
    { id: 'concepts', label: '五个核心概念' },
    ...article.analysis.map((section, index) => ({ id: `analysis-${index + 1}`, label: section.title })),
    { id: 'evidence', label: '证据与判断' },
    { id: 'boundary', label: '边界与误解' },
    { id: 'sources', label: '参考资料' },
  ];

  return (
    <ArticleFrame
      sectionLabel="财经知识地图"
      sectionHref="/atlas/"
      breadcrumb={<><a href="/atlas/">知识地图</a><span>／</span><a href={`/atlas/${slug}/`}>{discipline.name}</a><span>／</span>主题 {topicId}</>}
      title={topic.title}
      english={topic.en}
      meta={<><span>学科 {discipline.no}</span><span>{discipline.name}</span><span>主题 {topicId}</span></>}
      contents={contents}
      aside={<>
        <section>
          <h2>主题位置</h2>
          <dl className="reference-fact-list">
            <div><dt>所属学科</dt><dd><a href={`/atlas/${slug}/`}>{discipline.name}</a></dd></div>
            <div><dt>核心问题</dt><dd>{article.question}</dd></div>
          </dl>
        </section>
        <section>
          <h2>核心概念</h2>
          <ul className="reference-aside-links">{concepts.map((concept) => <li key={concept.id}><a href={`/atlas/${slug}/${concept.id}/`}><b>{concept.name}</b><small>{concept.en}</small></a></li>)}</ul>
        </section>
        {references.length > 0 && <section>
          <h2>主要资料</h2>
          <ol className="reference-aside-sources">{references.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><small>{source.publisher}</small></li>)}</ol>
        </section>}
      </>}
    >
      <section id="question">
        <h2>从一个现实问题开始</h2>
        <p className="reference-article-question">{article.question}</p>
        <p className="reference-article-lead">{topic.summary}</p>
        <p>{example}</p>
        <p className="knowledge-essay-thesis">{article.thesis}</p>
      </section>

      <section id="concepts">
        <h2>五个核心概念如何连在一起</h2>
        <p>{article.relationship}</p>
        <div className="atlas-topic-concepts">
          {concepts.map((concept, conceptIndex) => {
            const knowledgeTerm = knowledgeTerms.find((term) => term.zh === concept.name);
            return <section key={concept.id}>
              <header><span>{String(conceptIndex + 1).padStart(2, '0')}</span><div><h3><a href={`/atlas/${slug}/${concept.id}/`}>{concept.name}</a></h3><small>{concept.en}</small></div></header>
              <p>{concept.brief}</p>
              <footer><a href={`/atlas/${slug}/${concept.id}/`}>概念说明</a>{knowledgeTerm && <a href={`/knowledge/${knowledgeTerm.slug}/`}>百科词条</a>}</footer>
            </section>;
          })}
        </div>
      </section>

      {article.analysis.map((section, index) => <section id={`analysis-${index + 1}`} key={section.title}>
        <h2>{section.title}</h2>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>)}

      <section id="evidence">
        <h2>怎样用证据判断</h2>
        <p>{article.evidence}</p>
        <ul className="knowledge-essay-checklist">{article.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section id="boundary">
        <h2>适用边界与常见误解</h2>
        <p>{article.boundary}</p>
        <ol className="knowledge-essay-misconceptions">{article.misconceptions.map((item) => <li key={item}>{item}</li>)}</ol>
      </section>

      {references.length > 0 && <section id="sources" className="knowledge-essay-sources">
        <h2>参考资料</h2>
        <ol>{references.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span><p>{source.note}</p></li>)}</ol>
      </section>}

      <nav className="knowledge-essay-related" aria-label="返回学科目录"><a className="knowledge-essay-back" href={`/atlas/${slug}/`}>返回{discipline.name}的四个主题</a></nav>
    </ArticleFrame>
  );
}
