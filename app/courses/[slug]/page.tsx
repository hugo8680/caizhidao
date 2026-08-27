import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CourseProgressSummary } from '@/components/course-progress';
import { courses, getCourse, getPlannedCourse, plannedCourses } from '@/lib/courses';

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
        <p><a href="/courses/">系统课程</a><span>／</span>{planned.level}</p>
        <article>
          <span>{planned.category} · 尚未开放</span>
          <h1>{planned.title}</h1>
          <h2>{planned.en}</h2>
          <p>{planned.description}</p>
          <div><strong>当前状态</strong><p>{planned.statusNote}</p></div>
          <a href="/courses/">返回已开放课程</a>
        </article>
      </main>
    );
  }

  if (!course) notFound();
  return (
    <main className="course-overview-page">
      <header className="course-overview-head">
        <p><a href="/courses/">系统课程</a><span>／</span>{course.category}</p>
        <div>
          <span>{course.category}</span>
          <h1>{course.title}</h1>
          <h2>{course.en}</h2>
          <p>{course.description}</p>
        </div>
      </header>

      <div className="course-overview-layout">
        <article className="course-syllabus">
          <section className="course-syllabus-list">
            <header><h2>课程目录</h2></header>
            {course.lessons.map((lesson) => (
              <a href={`/courses/${course.slug}/${lesson.slug}/`} key={lesson.slug}>
                <span>{String(lesson.id).padStart(2, '0')}</span>
                <div><h3>{lesson.title}</h3><h4>{lesson.en}</h4><p>{lesson.summary}</p><b>{lesson.key}</b></div>
                <small>{lesson.minutes} 分钟 <i>→</i></small>
              </a>
            ))}
          </section>
        </article>

        <aside className="course-overview-aside">
          <CourseProgressSummary courseSlug={course.slug} lessonCount={course.lessons.length} />
          <a className="course-begin-button" href={`/courses/${course.slug}/${course.lessons[0].slug}/`}>从第 1 课开始 <span>→</span></a>
        </aside>
      </div>
    </main>
  );
}
