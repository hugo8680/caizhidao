export type CourseLevel = '入门' | '进阶' | '专业';

export type LessonFormula = {
  title: string;
  expression: string;
  explanation: string;
  variables: string[];
  conditions: string[];
};

export type LessonSection = {
  title: string;
  paragraphs: string[];
  points?: string[];
};

export type LessonMechanism = {
  title: string;
  explanation: string;
};

export type LessonExample = {
  title: string;
  premise: string;
  steps: string[];
  conclusion: string;
};

export type LessonMisconception = {
  claim: string;
  correction: string;
};

export type LessonTerm = {
  en: string;
  zh: string;
  definition: string;
};

export type LessonExercise = {
  question: string;
  answer: string;
};

export type LessonSource = {
  title: string;
  publisher: string;
  note: string;
  url?: string;
};

export type CourseLesson = {
  id: number;
  slug: string;
  title: string;
  en: string;
  minutes: number;
  summary: string;
  key: string;
  objectives: string[];
  prerequisite: string;
  sections: LessonSection[];
  mechanism: LessonMechanism[];
  formula?: LessonFormula;
  example: LessonExample;
  misconceptions: LessonMisconception[];
  checklist: string[];
  terms: LessonTerm[];
  exercises: LessonExercise[];
  sources: LessonSource[];
};

export type Course = {
  slug: string;
  title: string;
  en: string;
  level: '入门';
  category: string;
  description: string;
  audience: string;
  prerequisite: string;
  method: string;
  outcomes: string[];
  lessons: CourseLesson[];
};

export type PlannedCourse = {
  slug: string;
  title: string;
  en: string;
  level: Exclude<CourseLevel, '入门'>;
  category: string;
  description: string;
  statusNote: string;
};
