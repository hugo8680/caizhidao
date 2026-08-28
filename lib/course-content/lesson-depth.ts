import type { CourseLesson } from '../course-types';
import { foundationLessonDepth } from './lesson-depth-foundations';
import { investmentProductLessonDepth } from './lesson-depth-investment-products';
import { personalFinanceLessonDepth } from './lesson-depth-personal-finance';
import type { LessonDepthMap } from './lesson-depth-types';

export const lessonDepth: LessonDepthMap = {
  ...foundationLessonDepth,
  ...personalFinanceLessonDepth,
  ...investmentProductLessonDepth,
};

export function enrichLessons(courseSlug: string, lessons: CourseLesson[]): CourseLesson[] {
  return lessons.map((lesson) => {
    const key = courseSlug + '/' + lesson.slug;
    const depth = lessonDepth[key];
    if (!depth) throw new Error('Missing lesson depth sections: ' + key);
    return { ...lesson, sections: [...lesson.sections, ...depth] };
  });
}
