import type { Metadata } from 'next';
import { disciplines, knowledgeNodeCount } from '@/lib/system';

export const metadata: Metadata = {
  title: '财经知识地图 · 财知道',
  description: '用 12 个学科、48 个主题和 240 个知识节点，建立财经、金融与经济学的完整认知坐标。',
};

export default function AtlasPage() {
  const topicCount = disciplines.reduce((sum, item) => sum + item.topics.length, 0);
  return (
    <main>
      <section className="atlas-hero">
        <div>
          <p>KNOWLEDGE ATLAS · 财经知识地图</p>
          <h1>先知道知识在哪里，<br />再决定从哪里深入。</h1>
          <p className="atlas-hero-lead">知识地图只负责组织学科、主题和概念之间的层级，不承担百科、课程或工具的职责。点击任一学科后，仍会留在知识地图模块中查看它的完整结构。</p>
          <div className="atlas-hero-actions"><a href="/atlas/microeconomics/">从微观经济学开始 →</a><a href="/atlas/personal-finance/">从个人财务开始</a></div>
        </div>
        <aside>
          <span>MAP SCALE</span>
          <dl>
            <div><dt>学科</dt><dd>{disciplines.length}</dd></div>
            <div><dt>主题</dt><dd>{topicCount}</dd></div>
            <div><dt>体系节点</dt><dd>{knowledgeNodeCount}</dd></div>
            <div><dt>跳转方式</dt><dd>页面</dd></div>
          </dl>
          <p>每个学科都有独立页面，概念始终在当前地图的学科脉络中呈现。</p>
        </aside>
      </section>

      <section className="atlas-orientation">
        <div><span>01</span><b>学科</b><p>确定问题属于哪个观察尺度。</p></div>
        <div><span>02</span><b>主题</b><p>理解一组概念共同解释什么。</p></div>
        <div><span>03</span><b>节点</b><p>认识组成主题的关键术语。</p></div>
        <div><span>04</span><b>关系</b><p>看相邻主题怎样互相影响。</p></div>
      </section>

      <section className="atlas-directory">
        <header><div><span>12 DISCIPLINES</span><h2>选择一个学科，进入独立地图页</h2></div><p>每页包含学科边界、四个主题、二十个概念节点、主题关系和学习顺序。</p></header>
        <div className="atlas-directory-grid">
          {disciplines.map((discipline) => (
            <a className={`tone-${discipline.tone}`} href={`/atlas/${discipline.slug}/`} key={discipline.slug}>
              <header><span>{discipline.no}</span><small>{discipline.en}</small></header>
              <h2>{discipline.name}</h2><strong>{discipline.question}</strong><p>{discipline.summary}</p>
              <ul>{discipline.topics.map((topic) => <li key={topic.title}>{topic.title}<small>{topic.en}</small></li>)}</ul>
              <footer><span>进入学科地图</span><b>{discipline.topics.length} 主题 · {discipline.topics.reduce((sum, topic) => sum + topic.concepts.length, 0)} 节点</b><i>→</i></footer>
            </a>
          ))}
        </div>
      </section>

      <section className="module-responsibility">
        <span>MODULE RESPONSIBILITY</span><h2>本模块回答：“这项知识在整个体系的什么位置？”</h2><p>地图专注呈现学科边界、主题层级与概念关系。需要查阅词条或开始练习时，可以从顶部导航自主切换到“科普百科”或“系统课程”。</p>
      </section>
    </main>
  );
}
