import { build } from 'esbuild';

const bundled = await build({
  stdin: {
    contents: [
      "export { knowledgeTerms } from './lib/content.ts';",
      "export { getKnowledgeArticle, knowledgeArticleSlugs } from './lib/knowledge-articles.ts';",
      "export { atlasTopicArticles } from './lib/atlas-topic-articles.ts';",
      "export { getAtlasTopicProfiles } from './lib/atlas-content.ts';",
      "export { disciplines, learningRoutes, timelineEvents } from './lib/system.ts';",
      "export { courses } from './lib/courses.ts';",
      "export { buildLessonGuide } from './lib/course-guides.ts';",
      "export { books, videos, toolCatalog } from './lib/library.ts';",
      "export { getBookGuide, getVideoGuide } from './lib/library-guides.ts';",
      "export { toolGuides } from './lib/guides.ts';",
      "export { historyGuides } from './lib/history-guides.ts';",
      "export { searchRecords } from './lib/search.ts';",
    ].join('\n'),
    resolveDir: process.cwd(),
    sourcefile: 'content-audit-entry.ts',
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
const problems = [];

const expectedSlugs = new Set(data.knowledgeTerms.map((term) => term.slug));
const actualSlugs = new Set(data.knowledgeArticleSlugs);
for (const slug of expectedSlugs) if (!actualSlugs.has(slug)) problems.push(`百科词条缺少深度文章：${slug}`);
for (const slug of actualSlugs) if (!expectedSlugs.has(slug)) problems.push(`深度文章没有对应百科词条：${slug}`);

for (const term of data.knowledgeTerms) {
  const article = data.getKnowledgeArticle(term.slug);
  if (!article) continue;
  const articleText = JSON.stringify(article);
  if (articleText.length < 900) problems.push(`百科文章内容过短：${term.slug}`);
  if (article.mechanism.length < 3) problems.push(`百科文章缺少机制：${term.slug}`);
  if (article.distinctions.length < 2) problems.push(`百科文章缺少概念辨析：${term.slug}`);
  if (article.checklist.length < 3) problems.push(`百科文章缺少分析检查项：${term.slug}`);
  if (article.sources.length < 2) problems.push(`百科文章缺少足够来源：${term.slug}`);
}

let topicCount = 0;
for (const discipline of data.disciplines) {
  discipline.topics.forEach((topic, topicIndex) => {
    topicCount += 1;
    const id = String(topicIndex + 1).padStart(2, '0');
    const key = `${discipline.slug}:${id}`;
    const article = data.atlasTopicArticles[key];
    if (!article) problems.push(`知识地图缺少主题文章：${key}`);
    else {
      const profiles = data.getAtlasTopicProfiles(discipline.slug, topicIndex);
      const renderedInputs = `${JSON.stringify(article)}${topic.summary}${JSON.stringify(profiles.map((profile) => ({ brief: profile.brief, example: profile.example, references: profile.references })))}`;
      if (renderedInputs.length < 900) problems.push(`知识地图主题内容过短：${key}`);
    }
    if (topic.concepts.length !== 5) problems.push(`主题不是五个核心概念：${key}`);
  });
}

if (topicCount !== 48) problems.push(`知识地图主题应为 48，当前为 ${topicCount}`);
if (data.knowledgeTerms.length !== 51) problems.push(`百科词条应为 51，当前为 ${data.knowledgeTerms.length}`);

let lessonCount = 0;
for (const course of data.courses) {
  if (course.lessons.length !== 8) problems.push(`课程应有 8 节：${course.slug}`);
  for (const lesson of course.lessons) {
    lessonCount += 1;
    const guide = data.buildLessonGuide(course, lesson);
    if (guide.why === lesson.summary) problems.push(`课程章节仍使用通用说明：${course.slug}/${lesson.id}`);
    if (guide.english.length < 30 || guide.why.length < 45 || guide.example.length < 40) problems.push(`课程章节解释过短：${course.slug}/${lesson.id}`);
    if (guide.misconceptions.length < 1 || guide.exerciseHint.length < 35) problems.push(`课程章节缺少误区或练习：${course.slug}/${lesson.id}`);
  }
}

for (const tool of data.toolCatalog) {
  const guide = data.toolGuides[tool.id];
  if (!guide) problems.push(`金融小工具缺少说明：${tool.id}`);
  else if (guide.inputs.length < 2 || guide.limits.length < 3 || guide.reading.length < 25) problems.push(`金融小工具说明不完整：${tool.id}`);
}

for (const book of data.books) {
  const guide = data.getBookGuide(book);
  if (guide.points.length < 3 || guide.fit.length < 20 || guide.reading.length < 30 || guide.caution.length < 25) problems.push(`图书导读不完整：${book.id}`);
}

for (const video of data.videos) {
  const guide = data.getVideoGuide(video);
  if (guide.focus.length < 3 || guide.before.length < 25 || guide.after.length < 25 || guide.caution.length < 25) problems.push(`视频课程说明不完整：${video.id}`);
}

for (const event of data.timelineEvents) {
  const guide = data.historyGuides[event.year];
  if (!guide) problems.push(`财经简史缺少背景说明：${event.year}`);
  else if ([guide.context, guide.mechanism, guide.caveat, guide.today].some((text) => text.length < 28)) problems.push(`财经简史解释过短：${event.year}`);
}

for (const route of data.learningRoutes) {
  if (route.steps.length < 4 || route.steps.some((step) => step.explanation.length < 35 || step.example.length < 20)) problems.push(`专题路线不完整：${route.slug}`);
}

if (data.courses.length !== 8 || lessonCount !== 64) problems.push(`课程应为 8 门 64 节，当前为 ${data.courses.length} 门 ${lessonCount} 节`);
if (data.toolCatalog.length !== 12) problems.push(`金融小工具应为 12 个，当前为 ${data.toolCatalog.length}`);
if (data.books.length !== 16) problems.push(`图书应为 16 本，当前为 ${data.books.length}`);
if (data.videos.length !== 12) problems.push(`视频课程应为 12 个，当前为 ${data.videos.length}`);
if (data.timelineEvents.length !== 18) problems.push(`财经简史事件应为 18 个，当前为 ${data.timelineEvents.length}`);
if (data.learningRoutes.length !== 8) problems.push(`专题路线应为 8 条，当前为 ${data.learningRoutes.length}`);
if (data.searchRecords.some((record) => /^\/atlas\/[^/]+\/\d{2}-\d{2}\/$/.test(record.href))) {
  problems.push('搜索索引仍指向旧的模板化概念页');
}

if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Content audit passed: ${data.knowledgeTerms.length} encyclopedia articles, ${topicCount} topic articles, ${data.courses.length} courses/${lessonCount} lessons, ${data.toolCatalog.length} tools, ${data.books.length} books, ${data.videos.length} videos, ${data.timelineEvents.length} history entries, ${data.learningRoutes.length} study routes, ${data.searchRecords.length} search records.`);
}
