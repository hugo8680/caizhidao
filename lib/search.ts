import { knowledgeTerms } from './content';
import { getAtlasConceptProfile } from './atlas-content';
import { courses } from './courses';
import { books, toolCatalog, videos } from './library';
import { disciplines, learningRoutes, timelineEvents } from './system';
import type { SearchRecord } from './search-types';

const detailedNames = new Set(knowledgeTerms.map((term) => term.zh));
const mappedNames = new Set<string>();

const disciplineRecords: SearchRecord[] = disciplines.flatMap((discipline) => [
  {
    id: `discipline-${discipline.slug}`,
    kind: '学科' as const,
    title: discipline.name,
    english: discipline.en,
    description: discipline.summary,
    keywords: `${discipline.question} ${discipline.topics.map((topic) => `${topic.title} ${topic.en} ${topic.concepts.join(' ')}`).join(' ')}`,
    href: `/atlas/${discipline.slug}/`,
    priority: 9,
  },
  ...discipline.topics.map((topic, topicIndex) => ({
    id: `topic-${discipline.slug}-${topicIndex}`,
    kind: '学科' as const,
    title: topic.title,
    english: `${topic.en} · ${discipline.en}`,
    description: topic.summary,
    keywords: `${discipline.name} ${discipline.question} ${topic.concepts.join(' ')}`,
    href: `/atlas/${discipline.slug}/topic/${String(topicIndex + 1).padStart(2, '0')}/`,
    priority: 7,
  })),
]);

const mappedNodeRecords: SearchRecord[] = disciplines.flatMap((discipline) => discipline.topics.flatMap((topic, topicIndex) => topic.concepts.flatMap((concept, conceptIndex) => {
  if (detailedNames.has(concept) || mappedNames.has(concept)) return [];
  mappedNames.add(concept);
  const profile = getAtlasConceptProfile(discipline.slug, `${String(topicIndex + 1).padStart(2, '0')}-${String(conceptIndex + 1).padStart(2, '0')}`);
  return [{
    id: `map-${discipline.slug}-${concept}`,
    kind: '学科' as const,
    title: concept,
    english: profile?.en ?? `${topic.en} · ${discipline.en}`,
    description: profile?.brief ?? topic.summary,
    keywords: `${discipline.name} ${discipline.en} ${discipline.question} ${topic.title} ${topic.en} ${profile?.explanation ?? ''}`,
    href: `/atlas/${discipline.slug}/topic/${String(topicIndex + 1).padStart(2, '0')}/`,
    priority: 2,
  }];
})));

export const searchRecords: SearchRecord[] = [
  ...knowledgeTerms.map((term) => ({
    id: `knowledge-${term.slug}`,
    kind: '知识' as const,
    title: term.zh,
    english: `${term.en} ${term.abbr ?? ''}`,
    description: term.summary,
    keywords: `${term.category} ${term.why} ${term.formula ?? ''}`,
    href: `/knowledge/${term.slug}/`,
    priority: 12,
  })),
  ...disciplineRecords,
  ...mappedNodeRecords,
  ...learningRoutes.map((route) => ({
    id: `route-${route.slug}`,
    kind: '专题' as const,
    title: route.title,
    english: route.en,
    description: route.description,
    keywords: `${route.question} ${route.steps.map((step) => `${step.title} ${step.note}`).join(' ')}`,
    href: `/topics/${route.slug}/`,
    priority: 10,
  })),
  ...courses.flatMap((course) => [
    {
      id: `course-${course.slug}`,
      kind: '课程' as const,
      title: course.title,
      english: course.en,
      description: course.description,
      keywords: `${course.category} ${course.level} ${course.outcomes.join(' ')} ${course.lessons.map((lesson) => `${lesson.title} ${lesson.en}`).join(' ')}`,
      href: `/courses/${course.slug}/`,
      priority: 9,
    },
    ...course.lessons.map((lesson) => ({
      id: `lesson-${course.slug}-${lesson.slug}`,
      kind: '课程' as const,
      title: lesson.title,
      english: `${lesson.en} · ${course.title}`,
      description: lesson.summary,
      keywords: `${course.category} ${lesson.key} ${lesson.objectives.join(' ')} ${lesson.terms.map((term) => `${term.zh} ${term.en}`).join(' ')}`,
      href: `/courses/${course.slug}/${lesson.slug}/`,
      priority: 10,
    })),
  ]),
  ...books.map((book) => ({
    id: `book-${book.id}`,
    kind: '图书' as const,
    title: book.title,
    english: `${book.originalTitle ?? ''} ${book.author}`,
    description: book.intro,
    keywords: `${book.topic} ${book.language} ${book.level} ${book.publisher} ${book.isbn}`,
    href: `/books/${book.id}/`,
    priority: 4,
  })),
  ...videos.map((video) => ({
    id: `video-${video.id}`,
    kind: '视频' as const,
    title: video.title,
    english: video.titleEn ?? video.platform,
    description: video.description,
    keywords: `${video.topic} ${video.language} ${video.level} ${video.platform}`,
    href: `/videos/${video.id}/`,
    priority: 4,
  })),
  ...toolCatalog.map((tool) => ({
    id: `tool-${tool.id}`,
    kind: '工具' as const,
    title: tool.title,
    english: tool.category,
    description: tool.description,
    keywords: `${tool.category} 计算器 calculator`,
    href: `/tools/${tool.id}/`,
    priority: 7,
  })),
  ...timelineEvents.map((event, index) => ({
    id: `history-${event.year}-${index}`,
    kind: '历史' as const,
    title: `${event.year} · ${event.title}`,
    english: `Economic & Financial History · ${event.kind}`,
    description: event.description,
    keywords: `${event.kind} ${event.impact}`,
    href: `/timeline/${event.year}/`,
    priority: 5,
  })),
];
