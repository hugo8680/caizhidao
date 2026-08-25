'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Course } from '@/lib/courses';
import { buildLessonGuide } from '@/lib/course-guides';

export function CoursePlayer({ course }: { course: Course }) {
  const storageKey = `caishi-course-${course.slug}`;
  const [activeId, setActiveId] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
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
  const move = (offset: number) => {
    const next = Math.min(course.lessons.length, Math.max(1, lesson.id + offset));
    setActiveId(next);
  };

  return (
    <section className="course-player">
      <aside className="course-player-nav">
        <div className="course-progress-head"><span>学习进度</span><b>{progress}%</b></div>
        <div className="course-progress-bar"><i style={{ width: `${progress}%` }} /></div>
        <small>{completed.length} / {course.lessons.length} 课完成 · 共 {totalMinutes} 分钟</small>
        <div className="course-lesson-buttons">
          {course.lessons.map((item) => (
            <button type="button" className={item.id === lesson.id ? 'active' : ''} key={item.id} onClick={() => setActiveId(item.id)}>
              <span className={completed.includes(item.id) ? 'done' : ''}>{completed.includes(item.id) ? '✓' : String(item.id).padStart(2, '0')}</span>
              <b>{item.title}</b><small>{item.minutes} 分钟</small>
            </button>
          ))}
        </div>
        {completed.length > 0 && <button className="reset-course" type="button" onClick={() => saveCompleted([])}>清除本课程进度</button>}
      </aside>

      <article className="course-reader">
        <header><span>第 {lesson.id} 课 · 共 {course.lessons.length} 课</span><small>{lesson.minutes} 分钟</small></header>
        <h1>{lesson.title}</h1>
        <p className="course-reader-lead">{guide.plain}</p>
        <section className="lesson-key"><span>本课核心关系</span><strong>{lesson.key}</strong></section>
        <section className="lesson-context">
          <span>理解这节课</span>
          <h2>先把概念说清楚</h2>
          <p>{guide.why}</p>
        </section>
        <section className="lesson-example">
          <div><span>例子</span><h2>放到具体数字里看</h2></div>
          <p>{guide.example}</p>
        </section>
        <div className="lesson-depth-grid single-column">
          <section className="lesson-misconceptions">
            <span>容易忽略</span><h2>常见误区</h2>
            {guide.misconceptions.map((item, index) => <p key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</p>)}
          </section>
        </div>
        <section className="lesson-english">
          <span>英文说法</span><h2>相关英文解释</h2><p lang="en">{guide.english}</p>
        </section>
        <details className="lesson-practice">
          <summary><span>练习一下</span><b>{lesson.practice}</b><i>查看提示 ＋</i></summary>
          <p>{guide.exerciseHint}</p>
        </details>
        <section className="lesson-notice"><b>说明</b><p>涉及真实资金时，还要核对费率、税务、合同和自己能承受的风险。</p></section>
        <div className="course-reader-actions">
          <button type="button" disabled={lesson.id === 1} onClick={() => move(-1)}>← 上一课</button>
          <button type="button" className={completed.includes(lesson.id) ? 'complete done' : 'complete'} onClick={toggleComplete}>{completed.includes(lesson.id) ? '✓ 已完成本课' : '标记本课完成'}</button>
          <button type="button" disabled={lesson.id === course.lessons.length} onClick={() => move(1)}>下一课 →</button>
        </div>
      </article>
    </section>
  );
}
