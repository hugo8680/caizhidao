'use client';

import { useEffect, useState } from 'react';

function storageKey(courseSlug: string) {
  return `caizhidao-course-${courseSlug}`;
}

function readProgress(courseSlug: string) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey(courseSlug)) ?? '[]');
    return Array.isArray(stored) ? stored.filter((value): value is number => Number.isInteger(value)) : [];
  } catch {
    return [];
  }
}

export function CourseProgressSummary({ courseSlug, lessonCount }: { courseSlug: string; lessonCount: number }) {
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setCompleted(readProgress(courseSlug)), 0);
    return () => window.clearTimeout(timer);
  }, [courseSlug]);

  const validCompleted = completed.filter((id) => id >= 1 && id <= lessonCount);
  const progress = Math.round((validCompleted.length / lessonCount) * 100);

  return (
    <div className="course-progress-summary" aria-label={`课程进度 ${progress}%`}>
      <div><span>本机学习进度</span><b>{validCompleted.length} / {lessonCount} 课</b></div>
      <i><span style={{ width: `${progress}%` }} /></i>
      <small>进度只保存在当前浏览器，不要求登录。</small>
    </div>
  );
}

type LessonCompletionProps = {
  courseSlug: string;
  lessonId: number;
  lessonCount: number;
};

export function LessonCompletion({ courseSlug, lessonId, lessonCount }: LessonCompletionProps) {
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setCompleted(readProgress(courseSlug)), 0);
    return () => window.clearTimeout(timer);
  }, [courseSlug]);

  const done = completed.includes(lessonId);
  const validCompleted = completed.filter((id) => id >= 1 && id <= lessonCount);
  const progress = Math.round((validCompleted.length / lessonCount) * 100);
  const toggle = () => {
    const next = done ? completed.filter((id) => id !== lessonId) : [...completed, lessonId].sort((a, b) => a - b);
    setCompleted(next);
    window.localStorage.setItem(storageKey(courseSlug), JSON.stringify(next));
  };

  return (
    <div className="lesson-completion">
      <button type="button" className={done ? 'done' : ''} onClick={toggle} aria-pressed={done}>
        {done ? '✓ 已完成本课' : '标记本课完成'}
      </button>
      <span>{validCompleted.length} / {lessonCount} 课完成</span>
      <i className="lesson-completion-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></i>
    </div>
  );
}
