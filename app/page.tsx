import { ActionArrow } from '@/components/action-arrow';
import { HeaderIcon } from '@/components/header-icon';
import { knowledgeCategories, knowledgeTerms } from '@/lib/content';
import { courses, formatMinutes, getCourseMinutes } from '@/lib/courses';
import { getKnowledgeCategoryByName } from '@/lib/guides';
import { disciplines, popularQuestions } from '@/lib/system';
import styles from './home.module.css';

const exploreLinks = [
  { title: '知识地图', text: '按微观、宏观、银行、市场、会计等学科理解概念关系。', href: '/atlas/' },
  { title: '专题文章', text: '围绕钱、价格、周期、公司、投资和家庭财务完整解释一个问题。', href: '/topics/' },
  { title: '财经简史', text: '从思想、制度与危机理解今天的货币和金融体系。', href: '/timeline/' },
  { title: '金融小工具', text: '先读公式和使用条件，再计算复利、贷款、债券与估值。', href: '/tools/compound/' },
  { title: '图书与课程', text: '按基础、难度和学习目标选择书籍与公开课程。', href: '/books/' },
];

export default function Home() {
  const firstCourse = courses[0];
  const firstLesson = firstCourse.lessons[0];
  const totalLessons = courses.reduce((sum, course) => sum + course.lessons.length, 0);
  const totalMinutes = courses.reduce((sum, course) => sum + getCourseMinutes(course), 0);
  const firstLessonHref = `/courses/${firstCourse.slug}/${firstLesson.slug}/`;

  return (
    <main className={styles.home}>
      <section className={styles.intro}>
        <div className={styles.introCopy}>
          <p className={styles.kicker}>财知道 · 财经、金融与经济学知识库</p>
          <h1>想系统学习，<br />就从第一课开始。</h1>
          <p className={styles.lead}>这里不要求你先懂术语。入门路径从货币、利率和风险讲起，再进入个人财务与投资产品；已经有基础的人，可以直接检索完整词条和专题文章。</p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href={firstLessonHref}><span>开始第 1 课</span><ActionArrow /></a>
            <a className={styles.secondaryAction} href="/search/"><HeaderIcon name="search" /><span>查一个概念</span></a>
          </div>
          <p className={styles.scope}>{courses.length} 门已完成课程 · {totalLessons} 节完整课 · 约 {formatMinutes(totalMinutes)}。未完成内容不会标成可学习课程。</p>
        </div>

        <aside className={styles.firstLesson}>
          <p>新手第一课 · 约 {firstLesson.minutes} 分钟</p>
          <h2>{firstLesson.title}</h2>
          <h3>{firstLesson.en}</h3>
          <p>{firstLesson.summary}</p>
          <strong>学完后，你应当能够：</strong>
          <ul>{firstLesson.objectives.slice(0, 3).map((objective) => <li key={objective}>{objective}</li>)}</ul>
          <a href={firstLessonHref}>直接进入正文 <ActionArrow /></a>
        </aside>
      </section>

      <section className={styles.learning}>
        <header className={styles.sectionHeader}>
          <div><p>新手学习主线</p><h2>只按这一条顺序学</h2></div>
          <p>三门基础课已经完整编写。先建立共同语言，再处理自己的现金流，最后学习产品结构；高阶内容暂不占用这条主线。</p>
        </header>
        <ol className={styles.coursePath}>
          {courses.map((course, index) => (
            <li key={course.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p>{course.category} · {course.lessons.length} 节 · {formatMinutes(getCourseMinutes(course))}</p>
                <h3>{course.title}</h3>
                <small>{course.en}</small>
                <p>{course.description}</p>
              </div>
              <a href={`/courses/${course.slug}/`}>{index === 0 ? '从这里开始' : '查看课程'} <ActionArrow /></a>
            </li>
          ))}
        </ol>
        <a className={styles.textLink} href="/courses/start/">查看完整入门顺序与学习方法 <ActionArrow /></a>
      </section>

      <section className={styles.reference}>
        <header className={styles.sectionHeader}>
          <div><p>查阅入口</p><h2>已经知道问题，就直接查</h2></div>
          <p>完整百科词条包含定义、机制、公式、案例、辨析、检查清单和来源。知识地图中的其他概念会明确标为“概念索引”，不会伪装成完整文章。</p>
        </header>

        <div className={styles.referenceLayout}>
          <div className={styles.questions}>
            <h3>从一个真实问题开始</h3>
            {popularQuestions.slice(0, 6).map((item) => (
              <a href={item.href} key={item.question}>
                <span>{item.domain}</span>
                <div><b>{item.question}</b><p>{item.answer}</p></div>
                <ActionArrow />
              </a>
            ))}
          </div>

          <aside className={styles.categories}>
            <h3>{knowledgeTerms.length} 篇完整百科词条</h3>
            <p>按查阅主题进入，不需要先浏览整张学科地图。</p>
            <nav aria-label="百科主题">
              {knowledgeCategories.map((category) => {
                const count = knowledgeTerms.filter((term) => term.category === category).length;
                const categoryPage = getKnowledgeCategoryByName(category);
                return categoryPage ? <a href={`/knowledge/category/${categoryPage.slug}/`} key={category}><span>{category}</span><b>{count} 篇</b></a> : null;
              })}
            </nav>
            <a className={styles.categoryAll} href="/knowledge/">进入财经知识库 <ActionArrow /></a>
          </aside>
        </div>
      </section>

      <section className={styles.explore}>
        <header className={styles.sectionHeader}>
          <div><p>进一步探索</p><h2>需要时，再打开其他模块</h2></div>
          <p>{disciplines.length} 个学科、专题、历史、工具和资源各有不同用途，不要求新手一次看完。</p>
        </header>
        <div className={styles.exploreList}>
          {exploreLinks.map((item, index) => (
            <a href={item.href} key={item.href}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ActionArrow /></a>
          ))}
        </div>
      </section>

      <section className={styles.editorial}>
        <div><p>内容原则</p><h2>不把几句话包装成一篇文章</h2></div>
        <p>定义之后必须继续解释机制、成立条件、现实证据、反例和资料来源。暂未达到标准的概念只保留在知识地图中，并明确标注为索引内容。</p>
        <a href="/editorial-policy/">查看内容标准 <ActionArrow /></a>
      </section>
    </main>
  );
}
