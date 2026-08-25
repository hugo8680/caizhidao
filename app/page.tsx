import { ConceptVisual } from '@/components/concept-visual';
import { knowledgeTerms } from '@/lib/content';
import { courses } from '@/lib/courses';
import { books, toolCatalog, videos } from '@/lib/library';
import {
  disciplines,
  knowledgeNodeCount,
  learningRoutes,
  popularQuestions,
  timelineEvents,
} from '@/lib/system';

const resourceLayers = [
  { no: '01', title: '百科词条', label: '查一个概念', metric: `${knowledgeTerms.length} 个`, text: '中英双语解释、概念图、公式、例子与相关知识。', href: '/knowledge/' },
  { no: '02', title: '系统课程', label: '按顺序学习', metric: `${courses.length} 套`, text: '从零基础到报表、估值、宏观、组合与全球风险。', href: '/courses/' },
  { no: '03', title: '金融工具', label: '动手算一算', metric: `${toolCatalog.length} 个`, text: '把复利、贷款、退休、债券与估值变成可计算问题。', href: '/tools/' },
  { no: '04', title: '财经图书', label: '继续阅读', metric: `${books.length} 本`, text: '汇总中英文版本、作者、出版社、ISBN、价格与购买入口。', href: '/books/' },
  { no: '05', title: '公开课程', label: '中文与英文', metric: `${videos.length} 组`, text: '连接国内高校、Yale、MIT、Coursera 与专业机构资源。', href: '/videos/' },
  { no: '06', title: '互动练习', label: '边玩边检验', metric: '3 个', text: '用小游戏体验复利速度、资产匹配与金融骗局识别。', href: '/games/' },
];

const featuredTimeline = timelineEvents.filter((event) => ['1776', '1929', '1944', '1971', '2008', '2020', '2022'].includes(event.year));

export default function Home() {
  return (
    <main>
      <section className="science-hero">
        <div className="science-copy">
          <p className="science-kicker"><span>财知道</span> 财经 · 金融 · 经济学知识库</p>
          <h1>从一个问题开始，<br /><em>看懂钱、市场与经济。</em></h1>
          <p className="science-lead">需要查一个名词、补一门课程，或梳理一整套知识，都可以从这里开始。</p>
          <div className="science-actions"><a href="/courses/finance-foundations/">从零开始学习 <span>→</span></a><a href="/search/">我想查一个概念</a></div>
          <div className="question-seeds"><span>从问题出发</span><a href="/search/?q=通胀">物价为什么会上涨？</a><a href="/search/?q=利率">加息影响了谁？</a><a href="/search/?q=股票">股票到底是什么？</a></div>
        </div>
        <aside className="system-board">
          <header><span>从这里认识财经世界</span><b>知识体系总览</b></header>
          <div className="system-core"><i /><div><small>一切经济问题的起点</small><strong>稀缺之下<br />如何选择？</strong></div></div>
          <div className="discipline-grid">
            {disciplines.map((discipline) => <a href={`/atlas/${discipline.slug}/`} key={discipline.slug}><span>{discipline.no}</span><b>{discipline.name}</b><small>{discipline.en}</small></a>)}
          </div>
          <footer><span><b>{disciplines.length}</b>个学科入口</span><span><b>{knowledgeNodeCount}</b>个体系节点</span><span><b>{knowledgeTerms.length}</b>个百科词条</span></footer>
        </aside>
      </section>

      <section className="home-system" id="system">
        <div className="home-section-head light">
          <div><span>知识全景</span><h2>先建立坐标，再深入细节。</h2></div>
          <p>经济学研究选择，金融学关心资金和风险，会计记录企业发生了什么。它们彼此相连：利率会改变融资，融资会影响经营，经营结果又会写进财报。</p>
        </div>
        <div className="home-discipline-grid">
          {disciplines.map((discipline) => (
            <a className={`home-discipline tone-${discipline.tone}`} href={`/atlas/${discipline.slug}/`} key={discipline.slug}>
              <header><span>{discipline.no}</span><small>{discipline.en}</small></header>
              <h3>{discipline.name}</h3>
              <b>{discipline.question}</b>
              <p>{discipline.summary}</p>
              <footer><span>{discipline.topics.length} 个主题 · {discipline.topics.reduce((sum, topic) => sum + topic.concepts.length, 0)} 个节点</span><i>↗</i></footer>
            </a>
          ))}
        </div>
        <a className="section-wide-link" href="/atlas/"><span>打开完整知识地图</span><b>12 学科 · 48 主题 · {knowledgeNodeCount} 节点</b><i>→</i></a>
      </section>

      <section className="question-lab">
        <div className="home-section-head dark">
          <div><span>生活里的财经问题</span><h2>先弄清问题，<br />再去认识术语。</h2></div>
          <p>工资、房价、利率和投资都不是孤立问题。先从熟悉的处境出发，再看看背后有哪些概念。</p>
        </div>
        <div className="question-grid">
          {popularQuestions.map((item, index) => (
            <a href={item.href} key={item.question}>
              <header><span>{String(index + 1).padStart(2, '0')}</span><small>{item.domain}</small></header>
              <h3>{item.question}</h3><p>{item.answer}</p><b>查看相关解释 →</b>
            </a>
          ))}
        </div>
      </section>

      <section className="route-showcase">
        <div className="home-section-head light">
          <div><span>专题路线</span><h2>一次弄清一个大问题。</h2></div>
          <p>八条路线把分散在不同学科的概念串成因果链。适合不想从目录第一页开始、但希望系统理解的人。</p>
        </div>
        <div className="route-grid">
          {learningRoutes.map((route) => (
            <a href={`/topics/${route.slug}/`} key={route.slug}>
              <header><span>{route.no}</span><small>{route.minutes} 分钟 · 5 个节点</small></header>
              <h3>{route.title}</h3><h4>{route.en}</h4><b>{route.question}</b><p>{route.description}</p>
              <ol>{route.steps.slice(0, 3).map((step) => <li key={step.title}>{step.title}</li>)}</ol>
              <footer><span>查看完整路线</span><i>→</i></footer>
            </a>
          ))}
        </div>
        <a className="section-wide-link" href="/topics/"><span>浏览全部专题路线</span><b>40 个递进学习步骤</b><i>→</i></a>
      </section>

      <section className="history-preview">
        <div className="home-section-head dark">
          <div><span>财经简史</span><h2>把今天，放回历史里理解。</h2></div>
          <p>财经制度往往是在危机后被重新设计。沿着时间轴看思想、技术、政策与市场如何彼此塑造。</p>
        </div>
        <div className="history-line">
          {featuredTimeline.map((event) => <a href={`/timeline/${event.year}/`} key={event.year}><span>{event.year}</span><i /><small>{event.kind}</small><h3>{event.title}</h3><p>{event.impact}</p></a>)}
        </div>
        <a className="dark-wide-link" href="/timeline/"><span>打开财经发展简史</span><b>{timelineEvents.length} 个关键节点</b><i>→</i></a>
      </section>

      <section className="resource-network">
        <div className="home-section-head light">
          <div><span>书、课程与工具</span><h2>读、算、看、练，互相连接。</h2></div>
          <p>想查名词可以看百科，想从头学可以选课程，遇到复利、贷款或估值问题可以直接打开计算器。书和视频放在后面，方便继续深入。</p>
        </div>
        <div className="resource-layer-grid">
          {resourceLayers.map((layer) => <a href={layer.href} key={layer.no}><header><span>{layer.no}</span><small>{layer.label}</small></header><strong>{layer.metric}</strong><h3>{layer.title}</h3><p>{layer.text}</p><b>打开看看 →</b></a>)}
        </div>
      </section>

      <section className="concept-preview">
        <div className="platform-section-title"><div><span>图解百科</span><h2>概念、公式与例证</h2></div><a href="/knowledge/">浏览全部百科词条 →</a></div>
        <div className="concept-preview-grid">
          {knowledgeTerms.slice(0, 4).map((term) => <a href={`/knowledge/${term.slug}/`} key={term.slug}><ConceptVisual type={term.visual} label={term.zh} /><span>{term.category}</span><h3>{term.zh}</h3><small>{term.en}</small><p>{term.summary}</p></a>)}
        </div>
      </section>
    </main>
  );
}
