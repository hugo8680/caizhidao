'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Course } from '@/lib/courses';

export function CoursePlayer({ course }: { course: Course }) {
  const storageKey = `caishi-course-${course.slug}`;
  const [activeId, setActiveId] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const lesson = course.lessons.find((item) => item.id === activeId) ?? course.lessons[0];

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
    window.scrollTo({ top: 330, behavior: 'smooth' });
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
        <p className="course-reader-lead">{lesson.summary}</p>
        <section className="lesson-key"><span>本课核心关系</span><strong>{lesson.key}</strong></section>
        <section className="lesson-explain">
          <span>LEARNING METHOD</span><h2>四步学会这个概念</h2>
          <ol>
            <li><b>先说人话</b><p>{lesson.summary}</p></li>
            <li><b>找到变量</b><p>识别这条关系里可以改变的数字、时间与风险条件。</p></li>
            <li><b>做个反例</b><p>想一想：在什么情形下，直接套用“{lesson.key}”会得出误导结论？</p></li>
            <li><b>回到决策</b><p>把它放进自己的目标、期限和承受能力中，再决定是否行动。</p></li>
          </ol>
        </section>
        <details className="lesson-practice">
          <summary><span>随堂练习</span><b>{lesson.practice}</b><i>展开练习提示 ＋</i></summary>
          <p>先不用追求唯一答案。写下你的假设、计算过程或判断依据，再回看本课核心关系，检查是否遗漏了时间、风险、流动性或成本。</p>
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
