'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Course } from '@/lib/courses';
import { buildLessonGuide } from '@/lib/course-guides';

export function CoursePlayer({ course }: { course: Course }) {
  const storageKey = `caishi-course-${course.slug}`;
  const [activeId, setActiveId] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const readerRef = useRef<HTMLElement>(null);
  const readerHeadingRef = useRef<HTMLHeadingElement>(null);
  const lesson = course.lessons.find((item) => item.id === activeId) ?? course.lessons[0];
  const guide = buildLessonGuide(course, lesson);

  useEffect(() => {
    let timer: number | undefined;
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]');
      if (Array.isArray(saved)) timer = window.setTimeout(() => setCompleted(saved.filter((value) => Number.isInteger(value))), 0);
    } catch { /* A damaged local preference should never block learning. */ }
    return () => { if (timer) window.clearTimeout(timer); };
  }, [storageKey]);

  const saveCompleted = (next: number[]) => {
    setCompleted(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const progress = Math.round((completed.length / course.lessons.length) * 100);
  const totalMinutes = useMemo(() => course.lessons.reduce((sum, item) => sum + item.minutes, 0), [course.lessons]);
  const toggleComplete = () => saveCompleted(completed.includes(lesson.id) ? completed.filter((id) => id !== lesson.id) : [...completed, lesson.id]);

  const selectLesson = (lessonId: number) => {
    if (!course.lessons.some((item) => item.id === lessonId)) return;
    setActiveId(lessonId);

    window.requestAnimationFrame(() => {
      const reader = readerRef.current;
      if (!reader) return;
      const chromeHeight = document.querySelector<HTMLElement>('.site-chrome')?.getBoundingClientRect().height ?? 0;
      const top = Math.max(0, reader.getBoundingClientRect().top + window.scrollY - chromeHeight - 16);
      window.scrollTo({ top, behavior: 'auto' });
      readerHeadingRef.current?.focus({ preventScroll: true });
    });
  };

  const move = (offset: number) => {
    const lessonIndex = course.lessons.findIndex((item) => item.id === lesson.id);
    const nextIndex = Math.min(course.lessons.length - 1, Math.max(0, lessonIndex + offset));
    selectLesson(course.lessons[nextIndex].id);
  };

  return (
    <section className="course-player">
      <aside className="course-player-nav">
        <div className="course-progress-head"><span>学习进度</span><b>{progress}%</b></div>
        <div className="course-progress-bar"><i style={{ width: `${progress}%` }} /></div>
        <small>{completed.length} / {course.lessons.length} 课完成 · 共 {totalMinutes} 分钟</small>
        <div className="course-lesson-buttons">
          {course.lessons.map((item) => (
            <button type="button" className={item.id === lesson.id ? 'active' : ''} key={item.id} onClick={() => selectLesson(item.id)} aria-controls="course-reader" aria-current={item.id === lesson.id ? 'step' : undefined}>
              <span className={completed.includes(item.id) ? 'done' : ''}>{completed.includes(item.id) ? '✓' : String(item.id).padStart(2, '0')}</span>
              <b>{item.title}</b><small>{item.minutes} 分钟</small>
            </button>
          ))}
        </div>
        {completed.length > 0 && <button className="reset-course" type="button" onClick={() => saveCompleted([])}>清除本课程进度</button>}
      </aside>

      <article className="course-reader" id="course-reader" ref={readerRef} data-lesson-id={lesson.id}>
        <header><span>第 {lesson.id} 课 · 共 {course.lessons.length} 课</span><small>{lesson.minutes} 分钟</small></header>
        <h1 ref={readerHeadingRef} tabIndex={-1}>{lesson.title}</h1>
        <p className="course-reader-lead">{guide.plain}</p>
        <section className="lesson-key"><span>一句话记住</span><strong>{lesson.key}</strong></section>
        <section className="lesson-context">
          <h2>先把概念说清楚</h2>
          <p>{guide.why}</p>
        </section>
        <section className="lesson-explain">
          <h2>一步步看它怎样运作</h2>
          <ol>
            {guide.mechanism.map((item) => <li key={item.title}><b>{item.title}</b><p>{item.text}</p></li>)}
          </ol>
        </section>
        <section className="lesson-example">
          <div><h2>用具体数字算一遍</h2></div>
          <p>{guide.example}</p>
        </section>
        <div className="lesson-depth-grid">
          <section className="lesson-misconceptions">
            <h2>容易踩的坑</h2>
            {guide.misconceptions.map((item, index) => <p key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</p>)}
          </section>
          <section className="lesson-checklist">
            <h2>学完要能回答</h2>
            {guide.checklist.map((item) => <p key={item}>✓ {item}</p>)}
          </section>
        </div>
        <section className="lesson-english">
          <h2>英文怎么说</h2><p lang="en">{guide.english}</p>
        </section>
        <details className="lesson-practice" key={lesson.id}>
          <summary><span>小练习</span><b>{lesson.practice}</b><i>查看提示 ＋</i></summary>
          <p>{guide.exerciseHint}</p>
        </details>
        <section className="lesson-notice"><b>实际使用前</b><p>涉及真实资金时，还要核对费率、税务、合同和自己能承受的风险。</p></section>
        <div className="course-reader-actions">
          <button type="button" disabled={lesson.id === 1} onClick={() => move(-1)}>← 上一课</button>
          <button type="button" className={completed.includes(lesson.id) ? 'complete done' : 'complete'} onClick={toggleComplete}>{completed.includes(lesson.id) ? '✓ 已完成本课' : '标记本课完成'}</button>
          <button type="button" disabled={lesson.id === course.lessons.length} onClick={() => move(1)}>下一课 →</button>
        </div>
      </article>
    </section>
  );
}
