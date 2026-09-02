import { ActionArrow } from '@/components/action-arrow';
import { HeaderIcon } from '@/components/header-icon';
import { knowledgeTerms } from '@/lib/content';
import { courses } from '@/lib/courses';
import { disciplines, learningRoutes, popularQuestions } from '@/lib/system';

const resourceLayers = [
  { title: '百科词条', detail: '51 篇完整词条', href: '/knowledge/' },
  { title: '知识地图', detail: '12 个学科体系', href: '/atlas/' },
  { title: '系统课程', detail: '3 门入门课程', href: '/courses/' },
  { title: '金融小工具', detail: '12 个计算工具', href: '/tools/' },
  { title: '图书与视频', detail: '28 项参考资料', href: '/books/' },
];

const leadCourse = courses[0];
const starterLessons = leadCourse.lessons.slice(0, 5);
const latestTerms = knowledgeTerms.slice(0, 6);
const focusRoutes = [
  ...courses.map((course) => ({ title: course.title, href: `/courses/${course.slug}/`, detail: `共 ${course.lessons.length} 课时` })),
  ...learningRoutes.slice(0, 2).map((route) => ({ title: route.title, href: `/topics/${route.slug}/`, detail: `约 ${route.minutes} 分钟` })),
];

export default function Home() {
  return (
    <main className="reference-home-page">
      <header className="reference-mobile-brand">
        <h1>财知道</h1>
        <p>系统的财经知识与金融工具</p>
        <a className="reference-mobile-search" href="/search/">
          <span>搜索知识库、文章与工具</span>
          <HeaderIcon name="search" />
        </a>
      </header>

      <div className="reference-home-grid">
        <aside className="reference-home-catalog">
          <h2>知识库分类</h2>
          <ol>
            {disciplines.slice(0, 6).map((discipline) => (
              <li key={discipline.slug}>
                <a href={`/atlas/${discipline.slug}/`}><span>{discipline.no}</span><b>{discipline.name}</b></a>
                <ul>{discipline.topics.slice(0, 3).map((topic) => <li key={topic.title}><a href={`/atlas/${discipline.slug}/`}>{topic.title}</a></li>)}</ul>
              </li>
            ))}
          </ol>
          <a className="reference-catalog-all" href="/atlas/">所有分类目录 <ActionArrow /></a>
        </aside>

        <div className="reference-home-main">
          <section className="reference-home-start">
            <h1>从零开始</h1>
            <div className="reference-start-list">
              {starterLessons.map((lesson, index) => (
                <a href={`/courses/${leadCourse.slug}/${lesson.slug}/`} key={lesson.slug}>
                  <span>{index + 1}</span>
                  <div><b>{lesson.title}</b><small>{lesson.summary}</small></div>
                </a>
              ))}
            </div>
            <a className="reference-section-link" href="/courses/start/">查看完整入门路径 <ActionArrow /></a>
          </section>

          <section className="reference-home-latest">
            <header><h2>最新与精选长文</h2></header>
            <div className="reference-article-table" role="table" aria-label="精选财经文章">
              <div role="row" className="reference-table-head"><span>标题</span><span>分类</span><span>内容</span></div>
              {latestTerms.map((term, index) => (
                <a href={`/knowledge/${term.slug}/`} role="row" key={term.slug}>
                  <span><i>{index + 1}</i><b>{term.zh}</b><small>（{term.en}）</small></span>
                  <span>{term.category}</span>
                  <span>完整词条</span>
                </a>
              ))}
            </div>
            <a className="reference-section-link" href="/knowledge/">查看全部文章 <ActionArrow /></a>
          </section>
        </div>

        <aside className="reference-home-routes">
          <h2>重点学习路径</h2>
          <ol>
            {focusRoutes.map((route, index) => (
              <li key={route.href}><a href={route.href}><span>{String(index + 1).padStart(2, '0')}</span><b>{route.title}</b><small>{route.detail}</small></a></li>
            ))}
          </ol>
          <a className="reference-section-link" href="/courses/">查看全部学习路径 <ActionArrow /></a>
        </aside>
      </div>

      <section className="reference-home-directory">
        <div>
          <header><h2>按学科查阅</h2><a href="/atlas/">完整知识地图 <ActionArrow /></a></header>
          <nav>{disciplines.map((discipline) => <a href={`/atlas/${discipline.slug}/`} key={discipline.slug}><span>{discipline.no}</span><b>{discipline.name}</b><small>{discipline.en}</small></a>)}</nav>
        </div>
        <div>
          <header><h2>现实财经问题</h2></header>
          <nav>{popularQuestions.slice(0, 6).map((item, index) => <a href={item.href} key={item.question}><span>{String(index + 1).padStart(2, '0')}</span><b>{item.question}</b></a>)}</nav>
        </div>
        <aside>
          <header><h2>主要内容</h2></header>
          <nav>{resourceLayers.map((item) => <a href={item.href} key={item.title}><b>{item.title}</b><small>{item.detail}</small><ActionArrow /></a>)}</nav>
        </aside>
      </section>
    </main>
  );
}
