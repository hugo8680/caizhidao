import type { Metadata } from 'next';
import { courses } from '@/lib/courses';

export const metadata: Metadata = {
  title: '系统课程 · 财知道',
  description: '金融通识、个人财务规划与投资产品基础课程。',
};

export default function CoursesPage() {
  return (
    <main className="course-catalog-page course-catalog-v2">
      <header className="course-catalog-intro">
        <p>系统课程</p>
        <h1>金融基础课程</h1>
        <p>从金融通识进入个人财务，再理解现金、债券、股票、基金与 ETF 的资产性质、收益来源、费用和风险。</p>
        <a href="/courses/start/">从第一课开始 →</a>
      </header>

      <section className="open-course-list" aria-labelledby="open-courses-title">
        <div className="course-section-heading">
          <div><h2 id="open-courses-title">课程目录</h2></div>
        </div>
        {courses.map((course, index) => (
          <article className="open-course-row" key={course.slug}>
            <div className="open-course-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="open-course-copy">
              <p><span>{course.category}</span></p>
              <h2><a href={`/courses/${course.slug}/`}>{course.title}</a></h2>
              <h3>{course.en}</h3>
              <p>{course.description}</p>
              <ol>{course.lessons.map((lesson) => <li key={lesson.slug}><a href={`/courses/${course.slug}/${lesson.slug}/`}>{lesson.title}</a></li>)}</ol>
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
