import { build } from 'esbuild';

const bundled = await build({
  stdin: {
    contents: [
      "export { knowledgeTerms } from './lib/content.ts';",
      "export { getKnowledgeArticle } from './lib/knowledge-articles.ts';",
      "export { atlasTopicArticles } from './lib/atlas-topic-articles.ts';",
      "export { getAtlasTopicProfiles } from './lib/atlas-content.ts';",
      "export { disciplines } from './lib/system.ts';",
      "export { courses } from './lib/courses.ts';",
    ].join('\n'),
    resolveDir: process.cwd(),
    sourcefile: 'content-depth-entry.ts',
    loader: 'ts',
  },
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node20',
  write: false,
});

const source = bundled.outputFiles[0].text;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const data = await import(moduleUrl);

function contentLength(value) {
  if (typeof value === 'string') return Array.from(value.replace(/\s/g, '')).length;
  if (Array.isArray(value)) return value.reduce((total, item) => total + contentLength(item), 0);
  if (value && typeof value === 'object') return Object.values(value).reduce((total, item) => total + contentLength(item), 0);
  return 0;
}

function summarize(records) {
  const ordered = [...records].sort((a, b) => a.length - b.length);
  const lengths = ordered.map((item) => item.length);
  return {
    count: records.length,
    minimum: lengths[0],
    median: lengths[Math.floor(lengths.length / 2)],
    average: Math.round(lengths.reduce((sum, length) => sum + length, 0) / lengths.length),
    maximum: lengths.at(-1),
    shortest: ordered.slice(0, 8),
  };
}

const knowledge = data.knowledgeTerms.map((term) => {
  const article = data.getKnowledgeArticle(term.slug);
  return {
    id: term.slug,
    title: term.zh,
    length: contentLength(article),
    sections: article.analysis.length,
    paragraphs: article.analysis.reduce((count, section) => count + section.paragraphs.length, 0),
  };
});

const atlas = data.disciplines.flatMap((discipline) => discipline.topics.map((topic, index) => {
  const id = String(index + 1).padStart(2, '0');
  const article = data.atlasTopicArticles[`${discipline.slug}:${id}`];
  const profiles = data.getAtlasTopicProfiles(discipline.slug, index);
  const renderedProfiles = {
    briefs: profiles.map((profile) => profile.brief),
    example: profiles[0]?.example,
    references: profiles[0]?.references ?? [],
  };
  return {
    id: `${discipline.slug}:${id}`,
    title: `${discipline.name}／${topic.title}`,
    length: contentLength({ article, topicSummary: topic.summary, renderedProfiles }),
    sections: article.analysis.length,
    paragraphs: article.analysis.reduce((count, section) => count + section.paragraphs.length, 0),
  };
}));

const lessons = data.courses.flatMap((course) => course.lessons.map((lesson) => ({
  id: `${course.slug}/${lesson.slug}`,
  title: `${course.title}／${lesson.title}`,
  length: contentLength(lesson),
  sections: lesson.sections.length,
  paragraphs: lesson.sections.reduce((count, section) => count + section.paragraphs.length, 0),
})));

console.log(JSON.stringify({
  knowledge: summarize(knowledge),
  atlas: summarize(atlas),
  lessons: summarize(lessons),
}, null, 2));
