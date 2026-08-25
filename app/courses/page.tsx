import type { Metadata } from 'next';
import { courses } from '@/lib/courses';

export const metadata: Metadata = {
  title: '系统课程 · 财知道',
  description: '8 套金融与财经课程、64 节课，从金融通识、个人理财到估值、宏观与全球风险。',
};

export default function CoursesPage() {
  const lessonCount = courses.reduce((sum, course) => sum + course.lessons.length, 0);
  return (
    <main className="course-catalog-page">
      <section className="course-catalog-head">
        <div>
          <span>课程目录</span>
          <h1>从基础认知，到独立判断</h1>
          <p>第一次来，可以从「金融通识入门」开始；如果已经有基础，直接选择自己关心的主题即可。</p>
        </div>
        <dl>
          <div><dt>课程</dt><dd>{courses.length}<small>套</small></dd></div>
          <div><dt>课时</dt><dd>{lessonCount}<small>节</small></dd></div>
          <div><dt>难度</dt><dd>3<small>级</small></dd></div>
        </dl>
      </section>
      <section className="course-index-grid course-bento-grid">
        {courses.map((course, index) => (
          <a href={`/courses/${course.slug}/`} className={`course-index-card accent-${course.accent}`} data-course={String(index + 1).padStart(2, '0')} key={course.slug}>
            <header><span>{String(index + 1).padStart(2, '0')}</span><small>{course.level}</small><em>{course.category}</em></header>
            <h2>{course.title}</h2><h3>{course.en}</h3><p>{course.description}</p>
            <ul>{course.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
            <footer><span><strong>{course.lessons.length}</strong> 课 · {course.duration}</span><b>开始学习 <i>↗</i></b></footer>
          </a>
        ))}
      </section>
    </main>
  );
}
