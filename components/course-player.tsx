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
        <div className="course-progress-head"><span>你的本机进度</span><b>{progress}%</b></div>
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
        <header><span>LESSON {String(lesson.id).padStart(2, '0')} / {String(course.lessons.length).padStart(2, '0')}</span><small>{lesson.minutes} MINUTES</small></header>
        <h1>{lesson.title}</h1>
        <p className="course-reader-lead">{guide.plain}</p>
        <section className="lesson-key"><span>本课核心关系</span><strong>{lesson.key}</strong></section>
        <section className="lesson-context">
          <span>WHY IT MATTERS</span>
          <h2>为什么值得学</h2>
          <p>{guide.why}</p>
        </section>
        <section className="lesson-explain">
          <span>CONCEPT WALKTHROUGH</span><h2>把概念一步步拆开</h2>
          <ol>
            {guide.mechanism.map((item) => <li key={item.title}><b>{item.title}</b><p>{item.text}</p></li>)}
          </ol>
        </section>
        <section className="lesson-example">
          <div><span>WORKED EXAMPLE</span><h2>带数字的例子</h2></div>
          <p>{guide.example}</p>
        </section>
        <div className="lesson-depth-grid">
          <section className="lesson-misconceptions">
            <span>COMMON MISTAKES</span><h2>常见误区</h2>
            {guide.misconceptions.map((item, index) => <p key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</p>)}
          </section>
          <section className="lesson-checklist">
            <span>DECISION CHECKLIST</span><h2>学完要会问</h2>
            {guide.checklist.map((item) => <p key={item}>✓ {item}</p>)}
          </section>
        </div>
        <section className="lesson-english">
          <span>ENGLISH NOTE</span><h2>相关英文解释</h2><p lang="en">{guide.english}</p>
        </section>
        <details className="lesson-practice">
          <summary><span>随堂练习</span><b>{lesson.practice}</b><i>展开练习提示 ＋</i></summary>
          <p>{guide.exerciseHint}</p>
        </details>
        <section className="lesson-notice"><b>学习边界</b><p>本站课程用于建立分析框架，不构成个别产品推荐。真实决策还应核验费用、税务、合同与自身风险承受能力。</p></section>
        <div className="course-reader-actions">
          <button type="button" disabled={lesson.id === 1} onClick={() => move(-1)}>← 上一课</button>
          <button type="button" className={completed.includes(lesson.id) ? 'complete done' : 'complete'} onClick={toggleComplete}>{completed.includes(lesson.id) ? '✓ 已完成本课' : '标记本课完成'}</button>
          <button type="button" disabled={lesson.id === course.lessons.length} onClick={() => move(1)}>下一课 →</button>
        </div>
      </article>
    </section>
  );
}
