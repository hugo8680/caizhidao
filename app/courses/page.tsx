import type { Metadata } from 'next';
import { ActionArrow } from '@/components/action-arrow';
import { courses, formatMinutes, getCourseMinutes } from '@/lib/courses';

export const metadata: Metadata = {
  title: '系统课程 · 财知道',
  description: '金融通识、个人财务规划与投资产品基础课程。',
};

export default function CoursesPage() {
  return (
    <main className="course-index-page">
      <div className="course-index-grid">
        <aside className="course-index-rail">
          <header><p>按路径学习</p><h1>系统课程</h1><small>3 门入门课程 · 24 课</small></header>
          <nav aria-label="课程目录">
            {courses.map((course, index) => <a href={`/courses/${course.slug}/`} key={course.slug}><span>{String(index + 1).padStart(2, '0')}</span><b>{course.title}</b><small>{course.lessons.length} 课</small></a>)}
          </nav>
          <a className="course-index-start" href="/courses/start/">新手从这里开始 <ActionArrow /></a>
        </aside>

        <section className="course-index-body">
          <header className="course-index-intro"><h2>金融基础课程</h2><p>按金融通识、个人财务和投资产品的顺序建立基础。每课包含机制、公式或案例、误区辨析、练习答案与来源。</p></header>
          <div className="open-course-list" aria-label="课程目录">
            {courses.map((course, index) => (
              <article className="open-course-row" key={course.slug}>
                <div className="open-course-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="open-course-copy">
                  <p><span>{course.category}</span><small>{course.level} · {formatMinutes(getCourseMinutes(course))}</small></p>
                  <h3><a href={`/courses/${course.slug}/`}>{course.title}</a></h3>
                  <h4>{course.en}</h4>
                  <p>{course.description}</p>
                  <ol>{course.lessons.map((lesson) => <li key={lesson.slug}><a href={`/courses/${course.slug}/${lesson.slug}/`}>{String(lesson.id).padStart(2, '0')} · {lesson.title}</a></li>)}</ol>
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
