import type { Metadata } from 'next';
import { courses, formatMinutes, getCourseMinutes } from '@/lib/courses';

export const metadata: Metadata = {
  title: '新手入门 · 财知道',
  description: '从金融通识、个人财务规划到投资产品的三阶段入门学习路径。',
};

const reasons = [
  '先建立货币、利率、风险和回报的共同语言，避免只会记产品名称。',
  '再把概念放进个人现金流、负债、保障和长期目标，建立自己的财务次序。',
  '最后学习产品结构与尽调，知道收益从哪里来、风险由谁承担。',
];

export default function CourseStartPage() {
  const totalMinutes = courses.reduce((total, course) => total + getCourseMinutes(course), 0);
  return (
    <main className="course-start-page">
      <header className="course-start-intro">
        <p>新手入门</p>
        <h1>从第一门课开始，不需要先懂金融</h1>
        <p>这条路径只安排已经完整编写的课程。按顺序学完 3 门、24 节，你应当能独立解释一项金融选择的目标、现金流、收益来源、主要风险和全部成本。</p>
        <dl>
          <div><dt>课程</dt><dd>3 门</dd></div>
          <div><dt>课时</dt><dd>24 节</dd></div>
          <div><dt>预计投入</dt><dd>{formatMinutes(totalMinutes)}</dd></div>
        </dl>
      </header>

      <section className="course-start-path" aria-label="入门课程顺序">
        {courses.map((course, index) => (
          <article key={course.slug}>
            <div className="course-start-step">
              <span>阶段 {index + 1}</span><b>{String(index + 1).padStart(2, '0')}</b>
            </div>
            <div className="course-start-content">
              <p>{course.category} · {course.lessons.length} 节 · {formatMinutes(getCourseMinutes(course))}</p>
              <h2>{course.title}</h2>
              <h3>{course.en}</h3>
              <p>{course.description}</p>
              <strong>为什么放在这里</strong>
              <p>{reasons[index]}</p>
              <div><span>完成后你能</span>{course.outcomes.map((outcome) => <b key={outcome}>{outcome}</b>)}</div>
            </div>
            <aside>
              <small>{index === 0 ? '无需前置知识' : `建议先完成阶段 ${index}`}</small>
              <a href={`/courses/${course.slug}/`}>{index === 0 ? '开始第一门课' : '查看本阶段课程'} <span>→</span></a>
            </aside>
          </article>
        ))}
      </section>

      <section className="course-start-method">
        <h2>怎样使用这套课程</h2>
        <div>
          <article><span>01</span><h3>先读机制，再记公式</h3><p>公式必须连同变量、假设和适用条件理解；看不懂时先回到因果链和数值例子。</p></article>
          <article><span>02</span><h3>练习先作答，再展开答案</h3><p>每课三道题都对应正文关键判断。答案不仅给结果，也说明推理边界。</p></article>
          <article><span>03</span><h3>把真实问题写进清单</h3><p>个人财务与产品尽调课需要使用自己的流水、合同和目标，课程不会替你推荐产品。</p></article>
        </div>
      </section>
    </main>
  );
}
