import type { Metadata } from 'next';
import { courses } from '@/lib/courses';

export const metadata: Metadata = {
  title: '新手入门 · 财知道',
  description: '从货币、利率、风险与收益，到个人现金流、保障、负债和投资产品的金融基础课程。',
};

export default function CourseStartPage() {
  const firstCourse = courses[0];
  const firstLesson = firstCourse.lessons[0];
  return (
    <main className="course-start-page">
      <header className="course-start-intro">
        <p>新手入门</p>
        <h1>金融基础与个人财务</h1>
        <p>货币、利率、通胀、风险与收益构成金融判断的基础；现金流、负债和保障决定个人能够承担多少风险；股票、债券和基金则把资金连接到不同的资产与现金流。</p>
        <a className="course-start-direct" href={`/courses/${firstCourse.slug}/${firstLesson.slug}/`}><span>现在开始：第 1 课《{firstLesson.title}》</span><b>→</b></a>
      </header>

      <section className="course-start-path" aria-label="入门课程顺序">
        {courses.map((course, index) => (
          <article key={course.slug}>
            <div className="course-start-step">
              <span>阶段 {index + 1}</span><b>{String(index + 1).padStart(2, '0')}</b>
            </div>
            <div className="course-start-content">
              <p>{course.category}</p>
              <h2>{course.title}</h2>
              <h3>{course.en}</h3>
              <p>{course.description}</p>
              <ol className="course-start-lessons">
                {course.lessons.map((lesson) => <li key={lesson.slug}><a href={`/courses/${course.slug}/${lesson.slug}/`}>{lesson.title}</a></li>)}
              </ol>
            </div>
            <aside>
              <a href={`/courses/${course.slug}/`}>进入课程 <span>→</span></a>
            </aside>
          </article>
        ))}
      </section>
    </main>
  );
}
