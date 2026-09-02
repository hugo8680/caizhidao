import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ActionArrow } from '@/components/action-arrow';
import { CourseProgressSummary } from '@/components/course-progress';
import { courses, formatMinutes, getCourse, getCourseMinutes, getPlannedCourse, plannedCourses } from '@/lib/courses';

type CoursePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...courses, ...plannedCourses].map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const course = getCourse(slug) ?? getPlannedCourse(slug);
  if (!course) return {};
  const description = getCourse(slug) ? course.description : `${course.description}${getPlannedCourse(slug)?.statusNote ?? ''}`;
  return {
    title: `${course.title} · 财知道课程`, description,
    openGraph: { title: `${course.title} · ${course.en}`, description, images: [] },
    twitter: { title: `${course.title} · ${course.en}`, description, images: [] },
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const slug = (await params).slug;
  const course = getCourse(slug);
  const planned = getPlannedCourse(slug);
  if (!course && !planned) notFound();

  if (!course && planned) {
    return (
      <main className="planned-course-page">
        <div className="planned-course-layout">
          <aside><p>课程状态</p><strong>尚未开放</strong><a href="/courses/">返回已开放课程 <ActionArrow /></a></aside>
          <article>
            <p><a href="/courses/">系统课程</a><span>／</span>{planned.level}</p>
            <small>{planned.category}</small>
            <h1>{planned.title}</h1>
            <h2>{planned.en}</h2>
            <p>{planned.description}</p>
            <section><h3>当前状态</h3><p>{planned.statusNote}</p></section>
          </article>
        </div>
      </main>
    );
  }

  if (!course) notFound();
  return (
    <main className="course-overview-page">
      <div className="course-overview-grid">
        <aside className="course-overview-rail">
          <header><p>{course.category}</p><h1>{course.title}</h1><small>{course.lessons.length} 课 · {formatMinutes(getCourseMinutes(course))}</small></header>
          <nav aria-label="课程章节目录">{course.lessons.map((lesson) => <a href={`/courses/${course.slug}/${lesson.slug}/`} key={lesson.slug}><span>{String(lesson.id).padStart(2, '0')}</span><b>{lesson.title}</b></a>)}</nav>
          <a className="course-index-start" href="/courses/">全部课程 <ActionArrow /></a>
        </aside>

        <section className="course-overview-content">
          <header className="course-overview-head">
            <p><a href="/courses/">系统课程</a><span>／</span>{course.category}</p>
            <small>{course.level}课程</small>
            <h2>{course.title}</h2>
            <h3>{course.en}</h3>
            <p>{course.description}</p>
          </header>

          <section className="course-profile">
            <dl>
              <div><dt>适用层次</dt><dd>{course.audience}</dd></div>
              <div><dt>前置知识</dt><dd>{course.prerequisite}</dd></div>
              <div><dt>课程组织</dt><dd>{course.method}</dd></div>
              <div><dt>课程目标</dt><dd><ul>{course.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></dd></div>
            </dl>
          </section>

          <div className="course-overview-layout">
            <article className="course-syllabus">
              <section className="course-syllabus-list">
                <header><h2>课程目录</h2></header>
                {course.lessons.map((lesson) => (
                  <a href={`/courses/${course.slug}/${lesson.slug}/`} key={lesson.slug}>
                    <span>{String(lesson.id).padStart(2, '0')}</span>
                    <div><h3>{lesson.title}</h3><h4>{lesson.en}</h4><p>{lesson.summary}</p><b>{lesson.key}</b></div>
                    <small>{lesson.minutes} 分钟 <ActionArrow /></small>
                  </a>
                ))}
              </section>
            </article>

            <aside className="course-overview-aside">
              <CourseProgressSummary courseSlug={course.slug} lessonCount={course.lessons.length} />
              <a className="course-begin-button" href={`/courses/${course.slug}/${course.lessons[0].slug}/`}>从第 1 课开始 <ActionArrow /></a>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
