import type { Metadata } from 'next';
import { ActionArrow } from '@/components/action-arrow';
import { courses, formatMinutes, getCourseMinutes } from '@/lib/courses';

export const metadata: Metadata = {
  title: '新手入门 · 财知道',
  description: '从货币、利率、风险与收益，到个人现金流、保障、负债和投资产品的金融基础课程。',
};

export default function CourseStartPage() {
  const firstCourse = courses[0];
  const firstLesson = firstCourse.lessons[0];
  return (
    <main className="course-index-page course-start-page">
      <div className="course-index-grid">
        <aside className="course-index-rail">
          <header><p>学习入口</p><h1>新手入门</h1><small>从第 1 课顺序学习</small></header>
          <nav aria-label="入门课程阶段">
            {courses.map((course, index) => <a href={`/courses/${course.slug}/`} key={course.slug}><span>{String(index + 1).padStart(2, '0')}</span><b>{course.title}</b><small>{course.lessons.length} 课</small></a>)}
          </nav>
          <a className="course-index-start" href={`/courses/${firstCourse.slug}/${firstLesson.slug}/`}>开始第 1 课 <ActionArrow /></a>
        </aside>

        <section className="course-index-body">
          <header className="course-index-intro">
            <h2>金融基础与个人财务</h2>
            <p>先理解货币、利率、通胀、风险与收益，再处理现金流、负债和保障，最后进入股票、债券、基金与 ETF。课程按以下顺序展开。</p>
          </header>

          <div className="course-start-path" aria-label="入门课程顺序">
            {courses.map((course, index) => (
              <article key={course.slug}>
                <div className="course-start-step"><span>阶段</span><b>{String(index + 1).padStart(2, '0')}</b></div>
                <div className="course-start-content">
                  <p>{course.category}<small>{course.level} · {formatMinutes(getCourseMinutes(course))}</small></p>
                  <h3><a href={`/courses/${course.slug}/`}>{course.title}</a></h3>
                  <h4>{course.en}</h4>
                  <p>{course.description}</p>
                  <ol className="course-start-lessons">
                    {course.lessons.map((lesson) => <li key={lesson.slug}><a href={`/courses/${course.slug}/${lesson.slug}/`}><span>{String(lesson.id).padStart(2, '0')}</span><b>{lesson.title}</b><small>{lesson.minutes} 分钟</small></a></li>)}
                  </ol>
                </div>
                <aside><a href={`/courses/${course.slug}/`}>课程目录 <ActionArrow /></a></aside>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
