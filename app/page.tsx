import { ConceptVisual } from '@/components/concept-visual';
import { ActionArrow } from '@/components/action-arrow';
import { HeaderIcon } from '@/components/header-icon';
import { knowledgeTerms } from '@/lib/content';
import {
  disciplines,
  learningRoutes,
  popularQuestions,
  timelineEvents,
} from '@/lib/system';

const resourceLayers = [
  { no: '01', title: '百科词条', label: '查一个概念', text: '专业定义、作用机制、公式、可复算例子与常见误解。', href: '/knowledge/' },
  { no: '02', title: '系统课程', label: '按顺序学习', text: '从零基础到报表、估值、宏观、组合与全球风险。', href: '/courses/' },
  { no: '03', title: '金融小工具', label: '动手算一算', text: '把复利、贷款、退休、债券与估值变成可计算问题。', href: '/tools/compound/' },
  { no: '04', title: '财经图书', label: '继续阅读', text: '汇总中英文版本、作者、出版社、ISBN、价格与购买入口。', href: '/books/' },
  { no: '05', title: '公开课程', label: '中文与英文', text: '连接国内高校、Yale、MIT、Coursera 与专业机构资源。', href: '/videos/' },
];

const featuredTimeline = timelineEvents.filter((event) => ['1776', '1929', '1944', '1971', '2008', '2020', '2022'].includes(event.year));
const historyLead = featuredTimeline[0];
const historyBriefs = featuredTimeline.slice(1);

export default function Home() {
  return (
    <main>
      <section className="science-hero">
        <div className="science-copy">
          <p className="science-kicker"><span>财知道</span> 财经 · 金融 · 经济学知识库</p>
          <h1>从一个问题开始，<br /><em>看懂钱、市场与经济。</em></h1>
          <p className="science-lead">需要查一个名词、补一门课程，或梳理一整套知识，都可以从这里开始。</p>
          <div className="science-actions">
            <a href="/courses/finance-foundations/"><span>从零开始学习</span><ActionArrow /></a>
            <a className="science-search-action" href="/search/"><HeaderIcon name="search" /><span>我想查一个概念</span></a>
          </div>
          <div className="question-seeds"><a href="/search/?q=通胀">物价为什么会上涨？</a><a href="/search/?q=利率">加息影响了谁？</a><a href="/search/?q=股票">股票到底是什么？</a></div>
        </div>
        <aside className="system-board">
          <header><span>从这里认识财经世界</span></header>
          <div className="system-core"><i /><div><small>一切经济问题的起点</small><strong>稀缺之下<br />如何选择？</strong></div></div>
          <div className="discipline-grid">
            {disciplines.map((discipline) => <a href={`/atlas/${discipline.slug}/`} key={discipline.slug}><span>{discipline.no}</span><b>{discipline.name}</b><small>{discipline.en}</small></a>)}
          </div>
        </aside>
      </section>

      <section className="home-system" id="system">
        <div className="home-section-head light">
          <div><span>学科地图</span><h2>先理解学科关系，再逐步深入。</h2></div>
          <p>经济学研究选择，金融学关心资金和风险，会计记录企业发生了什么。它们彼此相连：利率会改变融资，融资会影响经营，经营结果又会写进财报。</p>
        </div>
        <div className="home-discipline-grid">
          {disciplines.map((discipline) => (
            <a className={`home-discipline tone-${discipline.tone}`} href={`/atlas/${discipline.slug}/`} key={discipline.slug}>
              <header><span>{discipline.no}</span><small>{discipline.en}</small></header>
              <h3>{discipline.name}</h3>
              <b>{discipline.question}</b>
              <p>{discipline.summary}</p>
              <footer><span>查看学科索引</span><ActionArrow /></footer>
            </a>
          ))}
        </div>
        <a className="section-wide-link" href="/atlas/"><span>打开完整知识地图</span><ActionArrow /></a>
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
              <h3>{item.question}</h3><p>{item.answer}</p><b><span>查看相关解释</span><ActionArrow /></b>
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
              <header><span>{route.no}</span><small>预计学习时长 {route.minutes} 分钟</small></header>
              <h3>{route.title}</h3><h4>{route.en}</h4><b>{route.question}</b><p>{route.description}</p>
              <ol>{route.steps.slice(0, 3).map((step, index) => <li key={step.title}><span>{index + 1}</span>{step.title}</li>)}</ol>
              <footer><span>查看完整路线</span><ActionArrow /></footer>
            </a>
          ))}
        </div>
        <a className="section-wide-link" href="/topics/"><span>浏览全部专题路线</span><ActionArrow /></a>
      </section>

      <section className="history-preview">
        <div className="home-section-head dark">
          <div><span>财经简史</span><h2>把今天，放回历史里理解。</h2></div>
          <p>财经制度往往是在危机后被重新设计。沿着时间轴看思想、技术、政策与市场如何彼此塑造。</p>
        </div>
        <div className="history-editorial">
          {historyLead && (
            <a className="history-feature" href={`/timeline/${historyLead.year}/`}>
              <header><small>{historyLead.kind}</small><ActionArrow /></header>
              <div><span>{historyLead.year}</span><h3>{historyLead.title}</h3><p>{historyLead.impact}</p></div>
            </a>
          )}
          <div className="history-brief-grid">
            {historyBriefs.map((event) => (
              <a className="history-brief" href={`/timeline/${event.year}/`} key={event.year}>
                <header><span>{event.year}</span><small>{event.kind}</small><ActionArrow /></header>
                <h3>{event.title}</h3><p>{event.impact}</p>
              </a>
            ))}
          </div>
        </div>
        <a className="history-more-link" href="/timeline/"><span>浏览完整财经简史</span><ActionArrow /></a>
      </section>

      <section className="resource-network">
        <div className="home-section-head light">
          <div><span>书、课程与工具</span><h2>查、学、算、读、看，互相连接。</h2></div>
          <p>想查名词可以看百科，想从头学可以选课程，遇到复利、贷款或估值问题可以直接打开计算器。书和视频放在后面，方便继续深入。</p>
        </div>
        <div className="resource-layer-grid">
          {resourceLayers.map((layer) => <a href={layer.href} key={layer.no}><header><span>{layer.no}</span><small>{layer.label}</small></header><h3>{layer.title}</h3><p>{layer.text}</p><b><span>打开看看</span><ActionArrow /></b></a>)}
        </div>
      </section>

      <section className="concept-preview">
        <div className="platform-section-title"><div><span>百科精选</span><h2>定义、机制、公式与例证</h2></div><a href="/knowledge/"><span>浏览全部百科词条</span><ActionArrow /></a></div>
        <div className="concept-preview-grid">
          {knowledgeTerms.slice(0, 4).map((term) => <a href={`/knowledge/${term.slug}/`} key={term.slug}><ConceptVisual type={term.visual} label={term.zh} /><span>{term.category}</span><h3>{term.zh}</h3><small>{term.en}</small><p>{term.summary}</p></a>)}
        </div>
      </section>
    </main>
  );
}
