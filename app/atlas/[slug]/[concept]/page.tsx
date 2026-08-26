import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { atlasConceptStaticParams, getAtlasConceptProfile } from '@/lib/atlas-content';
import { disciplines } from '@/lib/system';

type AtlasConceptPageProps = { params: Promise<{ slug: string; concept: string }> };

export function generateStaticParams() {
  return atlasConceptStaticParams;
}

export async function generateMetadata({ params }: AtlasConceptPageProps): Promise<Metadata> {
  const { slug, concept } = await params;
  const profile = getAtlasConceptProfile(slug, concept);
  if (!profile) return {};
  return {
    title: `${profile.name}（${profile.en}）· ${profile.disciplineName}知识地图 · 财知道`,
    description: `${profile.brief} 包含概念定义、理论机制、经济例证、适用条件和分析要点。`,
    openGraph: { title: `${profile.name} · ${profile.en}`, description: profile.brief, images: [] },
    twitter: { title: `${profile.name} · ${profile.en}`, description: profile.brief, images: [] },
  };
}

export default async function AtlasConceptPage({ params }: AtlasConceptPageProps) {
  const { slug, concept } = await params;
  const profile = getAtlasConceptProfile(slug, concept);
  if (!profile) notFound();
  const discipline = disciplines.find((item) => item.slug === slug);
  if (!discipline) notFound();
  const entries = discipline.topics.flatMap((topic, topicIndex) => topic.concepts.map((_, conceptIndex) => getAtlasConceptProfile(slug, `${String(topicIndex + 1).padStart(2, '0')}-${String(conceptIndex + 1).padStart(2, '0')}`))).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const entryIndex = entries.findIndex((item) => item.id === profile.id);
  const previous = entryIndex > 0 ? entries[entryIndex - 1] : undefined;
  const next = entryIndex < entries.length - 1 ? entries[entryIndex + 1] : undefined;

  return (
    <main>
      <section className="atlas-concept-head">
        <p><a href="/atlas/">财经知识地图</a><span>／</span><a href={`/atlas/${slug}/`}>{profile.disciplineName}</a><span>／</span>{profile.topicTitle}</p>
        <div><small>概念 {profile.disciplineNo}.{profile.topicIndex + 1}.{profile.conceptIndex + 1}</small><h1>{profile.name}</h1><h2>{profile.en}</h2><p>{profile.brief}</p></div>
      </section>

      <section className="atlas-concept-layout">
        <article className="atlas-concept-article">
          <section className="atlas-concept-definition"><span>概念定义</span><h2>定义与经济含义</h2><p className="atlas-concept-lead">{profile.brief}</p><p>{profile.explanation}</p></section>

          <section><span>理论机制</span><h2>学科位置与作用机制</h2><div className="atlas-concept-mechanism">{profile.mechanism.map((item, index) => <article key={item.title}><b>{String(index + 1).padStart(2, '0')}</b><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

          <section className="atlas-concept-example"><span>经济例证</span><h2>现实中的表现</h2><blockquote>{profile.example}</blockquote></section>

          <section className="atlas-concept-boundary"><span>适用条件</span><h2>理论成立的条件</h2><p>{profile.boundary}</p></section>

          <section className="atlas-concept-misconceptions"><span>概念辨析</span><h2>常见混淆</h2><ol>{profile.misconceptions.map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, '0')}</b><p>{item}</p></li>)}</ol></section>

          <section className="atlas-concept-checklist"><span>分析要点</span><h2>应用与观察</h2><ul>{profile.checklist.map((item) => <li key={item}>{item}</li>)}</ul></section>

          <section className="atlas-concept-english"><span>英文术语</span><h2>{profile.en}</h2><p lang="en">{profile.englishNote}</p></section>

          {profile.references.length > 0 && <section className="atlas-concept-sources"><span>参考文献</span><h2>教材与机构资料</h2><p>统计数据和制度规则可能更新，引用时应以发布机构的现行版本为准。</p><div>{profile.references.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><b>{source.title}</b><small>{source.publisher}</small><p>{source.note}</p><i>查看资料 ↗</i></a>)}</div></section>}
        </article>

        <aside className="atlas-concept-aside">
          <span>同主题概念</span><h3>{profile.topicTitle}</h3><p>{profile.topicSummary}</p>
          {profile.related.map((item) => <a href={item.href} key={item.href}><b>{item.name}</b><small>{item.en}</small><i>→</i></a>)}
          <a className="atlas-concept-back" href={`/atlas/${slug}/`}>← 返回{profile.disciplineName}索引</a>
        </aside>
      </section>

      <nav className="atlas-concept-pagination" aria-label="相邻概念">
        {previous ? <a href={`/atlas/${slug}/${previous.id}/`}><span>← 上一个概念</span><b>{previous.name}</b><small>{previous.en}</small></a> : <a href={`/atlas/${slug}/`}><span>← 返回</span><b>{profile.disciplineName}索引</b></a>}
        {next ? <a href={`/atlas/${slug}/${next.id}/`}><span>下一个概念 →</span><b>{next.name}</b><small>{next.en}</small></a> : <a href="/atlas/"><span>完成本学科</span><b>返回知识地图</b></a>}
      </nav>
    </main>
  );
}
