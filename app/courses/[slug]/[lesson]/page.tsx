import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LessonCompletion } from '@/components/course-progress';
import { courses, getCourse, getLesson } from '@/lib/courses';

type LessonPageProps = { params: Promise<{ slug: string; lesson: string }> };

export function generateStaticParams() {
  return courses.flatMap((course) => course.lessons.map((lesson) => ({ slug: course.slug, lesson: lesson.slug })));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const route = await params;
  const course = getCourse(route.slug);
  const lesson = course ? getLesson(course, route.lesson) : undefined;
  if (!course || !lesson) return {};
  return {
    title: `${lesson.title} · ${course.title} · 财知道`,
    description: lesson.summary,
    openGraph: { title: `${lesson.title} · ${lesson.en}`, description: lesson.summary, images: [] },
    twitter: { title: `${lesson.title} · ${lesson.en}`, description: lesson.summary, images: [] },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const route = await params;
  const course = getCourse(route.slug);
  const lesson = course ? getLesson(course, route.lesson) : undefined;
  if (!course || !lesson) notFound();

  const lessonIndex = course.lessons.findIndex((item) => item.slug === lesson.slug);
  const previous = course.lessons[lessonIndex - 1];
  const next = course.lessons[lessonIndex + 1];

  return (
    <main className="lesson-page">
      <header className="lesson-page-head">
        <p><a href="/courses/">系统课程</a><span>／</span><a href={`/courses/${course.slug}/`}>{course.title}</a><span>／</span>第 {lesson.id} 课</p>
        <div>
          <small>第 {lesson.id} 课 · 共 {course.lessons.length} 课 · 约 {lesson.minutes} 分钟</small>
          <h1>{lesson.title}</h1>
          <h2>{lesson.en}</h2>
          <p>{lesson.summary}</p>
        </div>
      </header>

      <div className="lesson-layout">
        <article className="lesson-article">
          <section className="lesson-opening">
            <p className="lesson-key">{lesson.key}</p>
            <div className="lesson-objectives">
              <h2>本课要点</h2>
              <ul>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
              <p><b>前置知识：</b>{lesson.prerequisite}</p>
            </div>
          </section>

          {lesson.sections.map((section) => (
            <section className="lesson-reading-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
            </section>
          ))}

          <section className="lesson-mechanism-section">
            <h2>作用机制</h2>
            <ol>
              {lesson.mechanism.map((step, index) => (
                <li key={step.title}><b>{String(index + 1).padStart(2, '0')}</b><div><h3>{step.title}</h3><p>{step.explanation}</p></div></li>
              ))}
            </ol>
          </section>

          {lesson.formula && (
            <section className="lesson-formula-section">
              <h2>{lesson.formula.title}</h2>
              <div className="lesson-formula-expression">{lesson.formula.expression}</div>
              <p>{lesson.formula.explanation}</p>
              <div className="lesson-formula-notes">
                <div><h3>变量</h3><ul>{lesson.formula.variables.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h3>使用条件</h3><ul>{lesson.formula.conditions.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
            </section>
          )}

          <section className="lesson-case-section">
            <h2>{lesson.example.title}</h2>
            <p>{lesson.example.premise}</p>
            <ol>{lesson.example.steps.map((step, index) => <li key={step}><b>{index + 1}</b><p>{step}</p></li>)}</ol>
            <div><strong>结论</strong><p>{lesson.example.conclusion}</p></div>
          </section>

          <section className="lesson-misconception-section">
            <h2>常见误解</h2>
            {lesson.misconceptions.map((item, index) => (
              <article key={item.claim}><b>{String(index + 1).padStart(2, '0')}</b><div><h3>{item.claim}</h3><p>{item.correction}</p></div></article>
            ))}
          </section>

          <section className="lesson-checklist-section">
            <h2>分析时需要检查什么</h2>
            <ul>{lesson.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="lesson-terms-section">
            <h2>本课术语</h2>
            <dl>{lesson.terms.map((term) => <div key={term.en}><dt lang="en">{term.en}</dt><dd><b>{term.zh}</b><p>{term.definition}</p></dd></div>)}</dl>
          </section>

          <section className="lesson-exercises-section">
            <h2>练习与答案</h2>
            {lesson.exercises.map((exercise, index) => (
              <details key={exercise.question}>
                <summary><b>{String(index + 1).padStart(2, '0')}</b><span>{exercise.question}</span><i>展开答案</i></summary>
                <p>{exercise.answer}</p>
              </details>
            ))}
          </section>

          <section className="lesson-sources-section">
            <h2>来源与延伸阅读</h2>
            <ol>
              {lesson.sources.map((source) => (
                <li key={`${source.publisher}-${source.title}`}>
                  <div><strong>{source.title}</strong><span>{source.publisher}</span><p>{source.note}</p></div>
                  {source.url && <a href={source.url} target="_blank" rel="noreferrer">访问来源 ↗</a>}
                </li>
              ))}
            </ol>
          </section>

          <nav className="lesson-page-navigation" aria-label="课程课时导航">
            {previous ? <a href={`/courses/${course.slug}/${previous.slug}/`}><span>上一课</span><b>← {previous.title}</b></a> : <span />}
            {next ? <a href={`/courses/${course.slug}/${next.slug}/`}><span>下一课</span><b>{next.title} →</b></a> : <a href={`/courses/${course.slug}/`}><span>课程完成</span><b>返回课程目录 →</b></a>}
          </nav>
        </article>

        <aside className="lesson-aside">
          <span>{course.title}</span>
          <strong>{String(lesson.id).padStart(2, '0')} / {String(course.lessons.length).padStart(2, '0')}</strong>
          <LessonCompletion courseSlug={course.slug} lessonId={lesson.id} lessonCount={course.lessons.length} />
          <a href={`/courses/${course.slug}/`}>查看课程目录</a>
        </aside>
      </div>
    </main>
  );
}
