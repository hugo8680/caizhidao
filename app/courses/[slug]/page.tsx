import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
        <p><a href="/courses/">系统课程</a><span>／</span>{planned.level}</p>
        <article>
          <span>{planned.category} · 尚未开放</span>
          <h1>{planned.title}</h1>
          <h2>{planned.en}</h2>
          <p>{planned.description}</p>
          <div><strong>当前状态</strong><p>{planned.statusNote}</p></div>
          <p>课程内容在完成资料研究、案例校验和教学审校之前，不显示虚构的课时、时长或“开始学习”按钮。</p>
          <a href="/courses/">返回已开放课程</a>
        </article>
      </main>
    );
  }

  if (!course) notFound();
  const minutes = getCourseMinutes(course);

  return (
    <main className="course-overview-page">
      <header className="course-overview-head">
        <p><a href="/courses/">系统课程</a><span>／</span>{course.category}</p>
        <div>
          <span>入门课程 · 已完整开放</span>
          <h1>{course.title}</h1>
          <h2>{course.en}</h2>
          <p>{course.description}</p>
        </div>
        <dl>
          <div><dt>课时</dt><dd>{course.lessons.length} 节</dd></div>
          <div><dt>完整学习</dt><dd>{formatMinutes(minutes)}</dd></div>
          <div><dt>建议</dt><dd>按顺序学习</dd></div>
        </dl>
      </header>

      <div className="course-overview-layout">
        <article className="course-syllabus">
          <section className="course-overview-brief">
            <div><span>适合谁</span><p>{course.audience}</p></div>
            <div><span>前置知识</span><p>{course.prerequisite}</p></div>
            <div><span>学习方法</span><p>{course.method}</p></div>
          </section>

          <section className="course-outcomes">
            <h2>学完后应当能够</h2>
            <ol>{course.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ol>
          </section>

          <section className="course-syllabus-list">
            <header><span>课程目录</span><h2>八节完整课</h2><p>每节进入独立页面，从正文开头阅读，不在长页面中突然跳转。</p></header>
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
          <div><strong>课程原则</strong><p>不推荐具体产品，不承诺收益。所有公式均说明假设，案例用于教学而不是个人建议。</p></div>
        </aside>
      </div>
    </main>
  );
}
