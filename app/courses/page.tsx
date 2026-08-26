import type { Metadata } from 'next';
import { courses, formatMinutes, getCourseMinutes, plannedCourses } from '@/lib/courses';

export const metadata: Metadata = {
  title: '系统课程 · 财知道',
  description: '三门已完成的入门课程、24 节专业基础课。未完成的进阶与专业课程明确列为后续计划。',
};

export default function CoursesPage() {
  return (
    <main className="course-catalog-page course-catalog-v2">
      <header className="course-catalog-intro">
        <p>系统课程</p>
        <h1>先把基础学完整</h1>
        <p>当前开放三门入门课程，共 24 节。每节都包含概念边界、作用机制、公式条件、完整案例、误区、练习答案与资料来源。</p>
        <a href="/courses/start/">第一次学习？查看入门顺序 →</a>
      </header>

      <section className="open-course-list" aria-labelledby="open-courses-title">
        <div className="course-section-heading">
          <div><span>已完成并开放</span><h2 id="open-courses-title">基础课程</h2></div>
          <p>建议依次学习，也可以按自己的实际问题选择。</p>
        </div>
        {courses.map((course, index) => (
          <article className="open-course-row" key={course.slug}>
            <div className="open-course-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="open-course-copy">
              <p><span>{course.category}</span><i>入门</i><b>已开放</b></p>
              <h2><a href={`/courses/${course.slug}/`}>{course.title}</a></h2>
              <h3>{course.en}</h3>
              <p>{course.description}</p>
              <ul>{course.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
            </div>
            <aside>
              <dl>
                <div><dt>课时</dt><dd>{course.lessons.length} 节</dd></div>
                <div><dt>完整学习</dt><dd>{formatMinutes(getCourseMinutes(course))}</dd></div>
              </dl>
              <a href={`/courses/${course.slug}/`}>查看课程与目录 <span>→</span></a>
            </aside>
          </article>
        ))}
      </section>

      <section className="planned-course-section" aria-labelledby="planned-courses-title">
        <div className="course-section-heading">
          <div><span>尚未开放</span><h2 id="planned-courses-title">后续课程计划</h2></div>
          <p>这些主题不再用虚构课时和时长伪装成已完成课程。</p>
        </div>
        <div className="planned-course-list">
          {plannedCourses.map((course) => (
            <article key={course.slug}>
              <header><span>{course.level}</span><i>{course.category}</i></header>
              <h3>{course.title}</h3>
              <h4>{course.en}</h4>
              <p>{course.description}</p>
              <small>{course.statusNote}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
