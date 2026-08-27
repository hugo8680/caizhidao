import { ActionArrow } from '@/components/action-arrow';
import { knowledgeTerms } from '@/lib/content';
import { disciplines, learningRoutes, popularQuestions } from '@/lib/system';

const resourceLayers = [
  { no: '01', title: '百科词条', label: '定义与机制', text: '查阅专业定义、作用机制、公式、案例、概念辨析和参考资料。', href: '/knowledge/' },
  { no: '02', title: '系统课程', label: '基础课程', text: '依次学习金融通识、个人财务和投资产品三门完整入门课程。', href: '/courses/' },
  { no: '03', title: '金融小工具', label: '计算与比较', text: '计算复利、贷款、实际收益、退休资金、债券价格和估值。', href: '/tools/compound/' },
  { no: '04', title: '财经图书', label: '书目资料', text: '查阅中英文书名、作者、出版社、ISBN、版本和参考价格。', href: '/books/' },
  { no: '05', title: '视频课程', label: '公开课程', text: '整理中文、英文和带字幕的高校与专业机构公开课程。', href: '/videos/' },
];

export default function Home() {
  return (
    <main className="library-home">
      <section className="library-home-intro">
        <p>财经 · 金融 · 经济学</p>
        <h1>财知道</h1>
        <h2>专业、系统的财经知识库</h2>
        <p className="library-home-summary">从经济学原理、金融市场和公司财务，到个人理财、会计与投资分析，准确解释概念、机制、公式及其现实边界。</p>
        <div className="library-home-actions">
          <a href="/search/"><span>搜索知识</span><ActionArrow /></a>
          <a href="/courses/start/"><span>新手入门</span><ActionArrow /></a>
        </div>
      </section>

      <section className="library-home-section">
        <header className="library-section-heading">
          <div><p>学科索引</p><h2>经济、金融与商业知识体系</h2></div>
          <a href="/atlas/"><span>完整知识地图</span><ActionArrow /></a>
        </header>
        <div className="library-discipline-directory">
          {disciplines.map((discipline) => (
            <a href={`/atlas/${discipline.slug}/`} key={discipline.slug}>
              <span>{discipline.no}</span>
              <div><h3>{discipline.name}</h3><small>{discipline.en}</small><p>{discipline.question}</p></div>
              <ActionArrow />
            </a>
          ))}
        </div>
      </section>

      <div className="library-home-split">
        <section className="library-home-section">
          <header className="library-section-heading"><div><p>问题索引</p><h2>常见财经问题</h2></div></header>
          <div className="library-question-directory">
            {popularQuestions.map((item, index) => (
              <a href={item.href} key={item.question}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{item.question}</h3><p>{item.answer}</p></div>
                <ActionArrow />
              </a>
            ))}
          </div>
        </section>

        <section className="library-home-section">
          <header className="library-section-heading"><div><p>专题文章</p><h2>围绕问题系统阅读</h2></div><a href="/topics/"><span>全部专题</span><ActionArrow /></a></header>
          <div className="library-topic-directory">
            {learningRoutes.map((route) => (
              <a href={`/topics/${route.slug}/`} key={route.slug}>
                <span>{route.no}</span>
                <div><h3>{route.title}</h3><small>{route.en}</small><p>{route.question}</p></div>
                <ActionArrow />
              </a>
            ))}
          </div>
        </section>
      </div>

      <section className="library-home-section">
        <header className="library-section-heading"><div><p>主要内容</p><h2>课程、工具与参考资料</h2></div></header>
        <div className="library-resource-directory">
          {resourceLayers.map((layer) => (
            <a href={layer.href} key={layer.no}>
              <span>{layer.no}</span>
              <div><small>{layer.label}</small><h3>{layer.title}</h3><p>{layer.text}</p></div>
              <ActionArrow />
            </a>
          ))}
        </div>
      </section>

      <section className="library-home-section library-home-terms">
        <header className="library-section-heading"><div><p>百科词条</p><h2>词条选录</h2></div><a href="/knowledge/"><span>全部百科词条</span><ActionArrow /></a></header>
        <div className="library-term-directory">
          {knowledgeTerms.slice(0, 12).map((term) => (
            <a href={`/knowledge/${term.slug}/`} key={term.slug}>
              <div><h3>{term.zh}</h3><small>{term.en}{term.abbr ? ` · ${term.abbr}` : ''}</small></div>
              <p>{term.summary}</p>
              <ActionArrow />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
