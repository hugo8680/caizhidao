import { knowledgeTerms } from './content';
import { getAtlasConceptHref, getAtlasConceptProfile } from './atlas-content';
import { courses } from './courses';
import { books, toolCatalog, videos } from './library';
import { disciplines, learningRoutes, timelineEvents } from './system';

export type SearchKind = '知识' | '学科' | '专题' | '课程' | '图书' | '视频' | '工具' | '历史';

export type SearchRecord = {
  id: string;
  kind: SearchKind;
  title: string;
  english: string;
  description: string;
  keywords: string;
  href: string;
  priority: number;
};

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
    href: `/atlas/${discipline.slug}/`,
    priority: 7,
  })),
]);

const mappedNodeRecords: SearchRecord[] = disciplines.flatMap((discipline) => discipline.topics.flatMap((topic, topicIndex) => topic.concepts.flatMap((concept, conceptIndex) => {
  if (detailedNames.has(concept) || mappedNames.has(concept)) return [];
  mappedNames.add(concept);
  const profile = getAtlasConceptProfile(discipline.slug, `${String(topicIndex + 1).padStart(2, '0')}-${String(conceptIndex + 1).padStart(2, '0')}`);
  return [{
    id: `map-${discipline.slug}-${concept}`,
    kind: '知识' as const,
    title: concept,
    english: profile?.en ?? `${topic.en} · ${discipline.en}`,
    description: profile?.brief ?? topic.summary,
    keywords: `${discipline.name} ${discipline.en} ${discipline.question} ${topic.title} ${topic.en} ${profile?.explanation ?? ''}`,
    href: getAtlasConceptHref(discipline.slug, topicIndex, conceptIndex),
    priority: 5,
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
  ...courses.map((course) => ({
    id: `course-${course.slug}`,
    kind: '课程' as const,
    title: course.title,
    english: course.en,
    description: course.description,
    keywords: `${course.category} ${course.level} ${course.outcomes.join(' ')} ${course.lessons.map((lesson) => lesson.title).join(' ')}`,
    href: `/courses/${course.slug}/`,
    priority: 8,
  })),
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

function normalize(value: string) {
  return value.toLocaleLowerCase().replace(/[·—–_\-/（）()《》“”]/g, ' ').replace(/\s+/g, ' ').trim();
}

function scoreField(field: string, query: string, exact: number, starts: number, contains: number) {
  const value = normalize(field);
  if (!value) return 0;
  if (value === query) return exact;
  if (value.startsWith(query)) return starts;
  if (value.includes(query)) return contains;
  return 0;
}

export function searchContent(input: string, kind: SearchKind | '全部' = '全部') {
  const query = normalize(input);
  const terms = query.split(' ').filter(Boolean);

  return searchRecords
    .filter((record) => kind === '全部' || record.kind === kind)
    .map((record) => {
      if (!query) return { record, score: record.priority };
      const full = normalize(`${record.title} ${record.english} ${record.description} ${record.keywords}`);
      if (!terms.every((term) => full.includes(term))) return { record, score: 0 };
      const score = record.priority + terms.reduce((sum, term) => sum
        + scoreField(record.title, term, 80, 55, 38)
        + scoreField(record.english, term, 48, 34, 24)
        + scoreField(record.keywords, term, 24, 18, 12)
        + scoreField(record.description, term, 16, 12, 8), 0);
      return { record, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.record.priority - a.record.priority || a.record.title.localeCompare(b.record.title, 'zh-CN'));
}
