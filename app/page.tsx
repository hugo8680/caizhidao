import { ConceptVisual } from '@/components/concept-visual';
import { knowledgeTerms } from '@/lib/content';
import { courses } from '@/lib/courses';
import { books, toolCatalog, videos } from '@/lib/library';

const sections = [
  { no: '01', title: '财经知识库', en: 'Knowledge Base', text: `${knowledgeTerms.length} 个中英双语名词、图解、公式与小趣闻`, href: '/knowledge/' },
  { no: '02', title: '多套系统课程', en: 'Learning Paths', text: `${courses.length} 套课程、64 节课，从个人理财到全球金融`, href: '/courses/' },
  { no: '03', title: '金融小工具', en: 'Financial Toolkit', text: `${toolCatalog.length} 个复利、贷款、估值与资产配置计算器`, href: '/tools/' },
  { no: '04', title: '高效知识检索', en: 'Smart Search', text: '按相关性跨知识、课程、图书、视频和工具查询', href: '/search/' },
  { no: '05', title: '财经图书馆', en: 'Finance Library', text: `${books.length} 本中英文书籍，含 ISBN、版本、价格与链接`, href: '/books/' },
  { no: '06', title: '视频课程专区', en: 'Video Academy', text: `${videos.length} 个中文、英文与中文字幕公开课入口`, href: '/videos/' },
  { no: '07', title: '金融小游戏', en: 'Learning Games', text: '通过复利、资产匹配与骗局识别挑战金融直觉', href: '/games/' },
];

export default function Home() {
  return (
    <main>
      <section className="platform-hero">
        <div className="hero-main">
          <p className="platform-kicker">CAISHI · 财经学习基础设施</p>
          <h1>不是一门课，<br />是一座可以反复探索的<br /><em>财经知识城。</em></h1>
          <p>从一个陌生名词出发，找到图解、英文表达、相关课程、计算工具、书籍和视频。知识不再散落在不同地方。</p>
          <div className="platform-actions"><a href="/knowledge/">从知识库开始 <span>→</span></a><span>多页学习平台 · 持续扩充</span></div>
        </div>
        <aside className="atlas-card">
          <div className="atlas-top"><span>FINANCE ATLAS</span><b>知识地图 · 预览</b></div>
          <div className="atlas-map">
            {['金钱', '市场', '公司', '投资', '经济'].map((label, index) => <span key={label} style={{ '--i': index } as React.CSSProperties}>{label}</span>)}
            <i /><i /><i />
          </div>
          <div className="atlas-stats"><span><b>{courses.length}</b>套课程</span><span><b>{knowledgeTerms.length}</b>核心概念</span><span><b>{toolCatalog.length}</b>实用工具</span></div>
        </aside>
      </section>

      <section className="platform-sections" id="modules">
        <div className="platform-section-title"><div><span>EXPLORE</span><h2>六个入口，同一张知识网络</h2></div><p>每一个模块都独立成页，并通过相关内容互相连接。</p></div>
        <div className="section-cards">
          {sections.map((section) => <a href={section.href} className="section-card" key={section.no}><span>{section.no}</span><small>{section.en}</small><h3>{section.title}</h3><p>{section.text}</p><b>进入模块 →</b></a>)}
        </div>
      </section>

      <section className="concept-preview">
        <div className="platform-section-title"><div><span>VISUAL KNOWLEDGE</span><h2>先看懂，再记住</h2></div><a href="/knowledge/">浏览完整知识库 →</a></div>
        <div className="concept-preview-grid">
          {knowledgeTerms.slice(0, 4).map((term) => <a href={`/knowledge/${term.slug}/`} key={term.slug}><ConceptVisual type={term.visual} label={term.zh} /><span>{term.category}</span><h3>{term.zh}</h3><small>{term.en}</small><p>{term.summary}</p></a>)}
        </div>
      </section>
    </main>
  );
}
