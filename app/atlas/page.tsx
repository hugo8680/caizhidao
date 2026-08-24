import type { Metadata } from 'next';
import { knowledgeTerms } from '@/lib/content';
import { disciplines, knowledgeNodeCount } from '@/lib/system';

export const metadata: Metadata = {
  title: '财经知识地图 · 财知道',
  description: '用 12 个学科、48 个主题和 240 个知识节点，建立财经、金融与经济学的完整认知坐标。',
};

const termByName = new Map(knowledgeTerms.map((term) => [term.zh, term]));

function nodeHref(name: string, discipline: string) {
  const detailed = termByName.get(name);
  return detailed ? `/knowledge/${detailed.slug}/` : `/search/?q=${encodeURIComponent(name)}&from=${discipline}`;
}

export default function AtlasPage() {
  return (
    <main>
      <section className="atlas-hero">
        <div>
          <p>KNOWLEDGE ATLAS · 财经知识地图</p>
          <h1>一张地图，定位<br />整个财经世界。</h1>
          <p className="atlas-hero-lead">这里不是按字母排列的词典，而是按“选择—生产—信用—市场—制度—生活”组织的知识网络。先找到问题所属的位置，再沿着相邻概念向外探索。</p>
          <div className="atlas-hero-actions"><a href="#microeconomics">从第一学科开始 →</a><a href="/topics/">按专题学习</a></div>
        </div>
        <aside>
          <span>MAP SCALE</span>
          <dl>
            <div><dt>学科</dt><dd>{disciplines.length}</dd></div>
            <div><dt>主题</dt><dd>{disciplines.reduce((sum, item) => sum + item.topics.length, 0)}</dd></div>
            <div><dt>体系节点</dt><dd>{knowledgeNodeCount}</dd></div>
            <div><dt>深度百科</dt><dd>{knowledgeTerms.length}</dd></div>
          </dl>
          <p>带“详解”标记的节点已有双语百科；其余节点可直接进入全站检索，继续连接课程与资源。</p>
        </aside>
      </section>

      <section className="atlas-orientation">
        <div><span>01</span><b>它解释什么？</b><p>先用学科问题确定观察尺度。</p></div>
        <div><span>02</span><b>因果怎样连接？</b><p>再从主题进入相邻的概念簇。</p></div>
        <div><span>03</span><b>现实如何验证？</b><p>用数据、报表、案例和历史检查解释。</p></div>
        <div><span>04</span><b>决策怎样落地？</b><p>用课程、工具和清单形成行动。</p></div>
      </section>

      <section className="atlas-layout">
        <aside className="atlas-index">
          <span>12 DISCIPLINES</span>
          {disciplines.map((discipline) => <a href={`#${discipline.slug}`} key={discipline.slug}><i>{discipline.no}</i>{discipline.name}</a>)}
        </aside>
        <div className="atlas-disciplines">
          {disciplines.map((discipline) => (
            <section className={`atlas-discipline tone-${discipline.tone}`} id={discipline.slug} key={discipline.slug}>
              <header>
                <div><span>{discipline.no} · {discipline.en}</span><h2>{discipline.name}</h2></div>
                <strong>{discipline.question}</strong>
              </header>
              <p className="atlas-discipline-summary">{discipline.summary}</p>
              <div className="atlas-topic-grid">
                {discipline.topics.map((topic, topicIndex) => (
                  <article key={topic.title}>
                    <header><span>{discipline.no}.{topicIndex + 1}</span><small>{topic.en}</small></header>
                    <h3>{topic.title}</h3><p>{topic.summary}</p>
                    <div className="atlas-nodes">
                      {topic.concepts.map((concept) => {
                        const detailed = termByName.has(concept);
                        return <a href={nodeHref(concept, discipline.slug)} className={detailed ? 'detailed' : ''} key={concept}><span>{concept}</span>{detailed && <small>详解</small>}</a>;
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="atlas-next">
        <span>NEXT STEP</span><h2>地图告诉你“在哪里”，<br />专题路线告诉你“怎么走”。</h2><p>如果不想逐个浏览 240 个节点，可以从一个现实问题出发，按五步路线跨学科学习。</p><a href="/topics/">选择一条专题路线 →</a>
      </section>
    </main>
  );
}
