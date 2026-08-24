import type { Metadata } from 'next';
import { courses } from '@/lib/courses';

export const metadata: Metadata = {
  title: '系统课程 · 财知道',
  description: '8 套金融与财经课程、64 节课，从金融通识、个人理财到估值、宏观与全球风险。',
};

export default function CoursesPage() {
  const lessonCount = courses.reduce((sum, course) => sum + course.lessons.length, 0);
  return (
    <main>
      <section className="page-hero course-index-hero">
        <p>LEARNING PATHS · 系统课程</p>
        <h1>系统课程</h1>
        <div className="hero-metrics"><span><b>{courses.length}</b>套课程</span><span><b>{lessonCount}</b>节课</span><span><b>3</b>个难度</span></div>
      </section>
      <section className="course-index-intro">
        <div><span>HOW TO LEARN</span><h2>从哪里开始？</h2></div>
        <p>完全零基础先走 01；想整理家庭财务从 02 开始；已经会看产品，可直接选择报表、估值、宏观或组合路径。每套课程都会在当前设备保存完成进度。</p>
      </section>
      <section className="course-index-grid">
        {courses.map((course, index) => (
          <a href={`/courses/${course.slug}/`} className={`course-index-card accent-${course.accent}`} key={course.slug}>
            <header><span>{String(index + 1).padStart(2, '0')}</span><small>{course.level} · {course.category}</small></header>
            <h2>{course.title}</h2><h3>{course.en}</h3><p>{course.description}</p>
            <ul>{course.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
            <footer><span>{course.lessons.length} 课 · {course.duration}</span><b>进入课程 →</b></footer>
          </a>
        ))}
      </section>
    </main>
  );
}
