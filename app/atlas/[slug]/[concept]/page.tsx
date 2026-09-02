import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleFrame, type ArticleSectionLink } from '@/components/article-frame';
import { atlasConceptStaticParams, getAtlasConceptProfile } from '@/lib/atlas-content';

type AtlasConceptPageProps = { params: Promise<{ slug: string; concept: string }> };

export function generateStaticParams() {
  return atlasConceptStaticParams;
}

export async function generateMetadata({ params }: AtlasConceptPageProps): Promise<Metadata> {
  const { slug, concept } = await params;
  const profile = getAtlasConceptProfile(slug, concept);
  if (!profile) return {};
  const description = `${profile.brief}${profile.explanation}`;
  return {
    title: `${profile.name} · ${profile.topicTitle} · 财知道`,
    description,
    alternates: { canonical: `/atlas/${slug}/${concept}/` },
    openGraph: { title: `${profile.name} · ${profile.en}`, description, images: [] },
    twitter: { title: `${profile.name} · ${profile.en}`, description, images: [] },
  };
}

export default async function AtlasConceptPage({ params }: AtlasConceptPageProps) {
  const { slug, concept } = await params;
  const profile = getAtlasConceptProfile(slug, concept);
  if (!profile) notFound();
  const topicHref = `/atlas/${slug}/topic/${String(profile.topicIndex + 1).padStart(2, '0')}/`;
  const contents: ArticleSectionLink[] = [
    { id: 'definition', label: '定义与学科位置' },
    { id: 'mechanism', label: '作用机制' },
    { id: 'example', label: '现实例子' },
    { id: 'boundary', label: '适用边界' },
    { id: 'misconceptions', label: '常见误解' },
    { id: 'checklist', label: '分析检查项' },
    { id: 'english', label: '英文说明' },
    { id: 'sources', label: '参考资料' },
  ];

  return (
    <ArticleFrame
      sectionLabel="财经知识地图"
      sectionHref="/atlas/"
      breadcrumb={<><a href="/atlas/">知识地图</a><span>／</span><a href={`/atlas/${slug}/`}>{profile.disciplineName}</a><span>／</span><a href={topicHref}>{profile.topicTitle}</a></>}
      title={profile.name}
      english={profile.en}
      meta={<><span>学科 {profile.disciplineNo}</span><span>{profile.topicTitle}</span><span>概念 {profile.id}</span></>}
      contents={contents}
      aside={<>
        <section>
          <h2>概念位置</h2>
          <dl className="reference-fact-list">
            <div><dt>所属学科</dt><dd><a href={`/atlas/${slug}/`}>{profile.disciplineName}</a></dd></div>
            <div><dt>所属主题</dt><dd><a href={topicHref}>{profile.topicTitle}</a></dd></div>
            <div><dt>英文名称</dt><dd lang="en">{profile.en}</dd></div>
          </dl>
        </section>
        <section>
          <h2>同主题概念</h2>
          <ul className="reference-aside-links">{profile.related.map((item) => <li key={item.href}><a href={item.href}><b>{item.name}</b><small>{item.en}</small></a></li>)}</ul>
        </section>
        {profile.references.length > 0 && <section>
          <h2>主要资料</h2>
          <ol className="reference-aside-sources">{profile.references.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><small>{source.publisher}</small></li>)}</ol>
        </section>}
      </>}
    >
      <section id="definition">
        <h2>定义与学科位置</h2>
        <p className="reference-article-lead">{profile.brief}</p>
        <p>{profile.explanation}</p>
      </section>

      <section id="mechanism">
        <h2>作用机制</h2>
        <ol className="knowledge-essay-sequence">
          {profile.mechanism.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}
        </ol>
      </section>

      <section id="example">
        <h2>现实例子</h2>
        <p>{profile.example}</p>
        <p className="knowledge-essay-conclusion">例子用于说明关系如何发生，而不是证明所有时期、市场和参与者都会得到相同结果。真正分析时还要核对样本、时间、制度环境和替代解释。</p>
      </section>

      <section id="boundary">
        <h2>适用边界</h2>
        <p>{profile.boundary}</p>
      </section>

      <section id="misconceptions">
        <h2>常见误解</h2>
        <ol className="knowledge-essay-misconceptions">{profile.misconceptions.map((item) => <li key={item}>{item}</li>)}</ol>
      </section>

      <section id="checklist">
        <h2>分析检查项</h2>
        <ul className="knowledge-essay-checklist">{profile.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section id="english" className="knowledge-essay-english">
        <h2>英文说明</h2>
        <p lang="en">{profile.englishNote}</p>
      </section>

      {profile.references.length > 0 && <section id="sources" className="knowledge-essay-sources">
        <h2>参考资料</h2>
        <ol>{profile.references.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span><p>{source.note}</p></li>)}</ol>
      </section>}

      <nav className="knowledge-essay-related" aria-label="同主题概念">
        <h2>继续查阅</h2>
        <div>{profile.related.map((item) => <a href={item.href} key={item.href}><b>{item.name}</b><span>{item.en}</span><p>{item.brief}</p></a>)}</div>
        <a className="knowledge-essay-back" href={topicHref}>返回“{profile.topicTitle}”主题文章</a>
      </nav>
    </ArticleFrame>
  );
}
