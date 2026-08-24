import { knowledgeTerms } from './content';
import { courses } from './courses';
import { books, toolCatalog, videos } from './library';

export type SearchKind = '知识' | '课程' | '图书' | '视频' | '工具';

export type SearchRecord = {
  id: string;
  kind: SearchKind;
  title: string;
  english: string;
  description: string;
  keywords: string;
  href: string;
};

export const searchRecords: SearchRecord[] = [
  ...knowledgeTerms.map((term) => ({
    id: `knowledge-${term.slug}`,
    kind: '知识' as const,
    title: term.zh,
    english: `${term.en} ${term.abbr ?? ''}`,
    description: term.summary,
    keywords: `${term.category} ${term.why} ${term.formula ?? ''}`,
    href: `/knowledge/${term.slug}/`,
  })),
  ...courses.map((course) => ({
    id: `course-${course.slug}`,
    kind: '课程' as const,
    title: course.title,
    english: course.en,
    description: course.description,
    keywords: `${course.category} ${course.level} ${course.outcomes.join(' ')} ${course.lessons.map((lesson) => lesson.title).join(' ')}`,
    href: `/courses/${course.slug}/`,
  })),
  ...books.map((book) => ({
    id: `book-${book.id}`,
    kind: '图书' as const,
    title: book.title,
    english: `${book.originalTitle ?? ''} ${book.author}`,
    description: book.intro,
    keywords: `${book.topic} ${book.language} ${book.level} ${book.publisher} ${book.isbn}`,
    href: `/books/#${book.id}`,
  })),
  ...videos.map((video) => ({
    id: `video-${video.id}`,
    kind: '视频' as const,
    title: video.title,
    english: video.titleEn ?? video.platform,
    description: video.description,
    keywords: `${video.topic} ${video.language} ${video.level} ${video.platform}`,
    href: `/videos/#${video.id}`,
  })),
  ...toolCatalog.map((tool) => ({
    id: `tool-${tool.id}`,
    kind: '工具' as const,
    title: tool.title,
    english: tool.category,
    description: tool.description,
    keywords: `${tool.category} 计算器 calculator`,
    href: `/tools/#${tool.id}`,
  })),
];

function normalize(value: string) {
  return value.toLocaleLowerCase().replace(/[·—–_\-/（）()]/g, ' ').replace(/\s+/g, ' ').trim();
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
      if (!query) return { record, score: 1 };
      const full = normalize(`${record.title} ${record.english} ${record.description} ${record.keywords}`);
      if (!terms.every((term) => full.includes(term))) return { record, score: 0 };
      const score = terms.reduce((sum, term) => sum
        + scoreField(record.title, term, 80, 55, 38)
        + scoreField(record.english, term, 48, 34, 24)
        + scoreField(record.keywords, term, 24, 18, 12)
        + scoreField(record.description, term, 16, 12, 8), 0);
      return { record, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title, 'zh-CN'));
}
