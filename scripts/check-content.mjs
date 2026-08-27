import { build } from 'esbuild';

const bundled = await build({
  stdin: {
    contents: [
      "export { knowledgeTerms } from './lib/content.ts';",
      "export { getKnowledgeArticle, knowledgeArticleSlugs } from './lib/knowledge-articles.ts';",
      "export { atlasTopicArticles } from './lib/atlas-topic-articles.ts';",
      "export { getAtlasTopicProfiles } from './lib/atlas-content.ts';",
      "export { disciplines, learningRoutes, timelineEvents } from './lib/system.ts';",
      "export { routeGuides } from './lib/route-guides.ts';",
      "export { courses, plannedCourses } from './lib/courses.ts';",
      "export { books, videos, toolCatalog } from './lib/library.ts';",
      "export { getBookGuide, getVideoGuide } from './lib/library-guides.ts';",
      "export { toolGuides } from './lib/guides.ts';",
      "export { toolMethods } from './lib/tool-methods.ts';",
      "export { historyGuides } from './lib/history-guides.ts';",
      "export { historyReferences } from './lib/history-references.ts';",
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
  if (!course.audience || !course.prerequisite || !course.method) problems.push(`课程缺少教学说明：${course.slug}`);
  const lessonSlugs = new Set();
  for (const [lessonIndex, lesson] of course.lessons.entries()) {
    lessonCount += 1;
    const key = `${course.slug}/${lesson.slug}`;
    if (lesson.id !== lessonIndex + 1) problems.push(`课程课号不连续：${key}`);
    if (!lesson.slug || lessonSlugs.has(lesson.slug)) problems.push(`课程课时 slug 缺失或重复：${key}`);
    lessonSlugs.add(lesson.slug);
    if (JSON.stringify(lesson).length < 2500) problems.push(`课程正文仍然过短：${key}`);
    if (lesson.objectives.length < 3 || lesson.sections.length < 2) problems.push(`课程缺少目标或系统解释：${key}`);
    if (lesson.sections.some((section) => section.paragraphs.length < 2)) problems.push(`课程章节论述不足：${key}`);
    if (lesson.mechanism.length < 4) problems.push(`课程缺少完整作用机制：${key}`);
    if (!lesson.formula || lesson.formula.variables.length < 3 || lesson.formula.conditions.length < 3) problems.push(`课程缺少公式变量或使用条件：${key}`);
    if (lesson.example.steps.length < 3 || lesson.example.conclusion.length < 20) problems.push(`课程缺少完整案例：${key}`);
    if (lesson.misconceptions.length < 3 || lesson.checklist.length < 5) problems.push(`课程缺少误区辨析或决策清单：${key}`);
    if (lesson.terms.length < 4 || lesson.exercises.length < 3 || lesson.sources.length < 3) problems.push(`课程缺少术语、练习或资料来源：${key}`);
  }
}

if (data.plannedCourses.length !== 5) problems.push(`后续课程计划应为 5 门，当前为 ${data.plannedCourses.length} 门`);
if (data.plannedCourses.some((course) => 'lessons' in course || 'duration' in course)) problems.push('未开放课程不应包含虚假课时或时长');

for (const tool of data.toolCatalog) {
  const guide = data.toolGuides[tool.id];
  const method = data.toolMethods[tool.id];
  if (!guide) problems.push(`金融小工具缺少说明：${tool.id}`);
  else if (guide.inputs.length < 2 || guide.limits.length < 3 || guide.reading.length < 25) problems.push(`金融小工具说明不完整：${tool.id}`);
  if (!method) problems.push(`金融小工具缺少计算依据：${tool.id}`);
  else if (method.formula.length < 12 || method.explanation.length < 50 || method.conditions.length < 3 || method.sources.length < 1 || method.related.length < 1) problems.push(`金融小工具计算依据不完整：${tool.id}`);
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
  const references = data.historyReferences[event.year];
  if (!guide) problems.push(`财经简史缺少背景说明：${event.year}`);
  else if ([guide.context, guide.mechanism, guide.caveat, guide.today].some((text) => text.length < 28)) problems.push(`财经简史解释过短：${event.year}`);
  if (!references || references.length < 2 || references.some((source) => !source.title || !source.publisher || !source.url || source.note.length < 15)) problems.push(`财经简史缺少可追溯资料：${event.year}`);
}

for (const route of data.learningRoutes) {
  if (route.steps.length < 4 || route.steps.some((step) => step.explanation.length < 35 || step.example.length < 20)) problems.push(`专题路线不完整：${route.slug}`);
  const guide = data.routeGuides[route.slug];
  if (!guide) problems.push(`专题路线缺少长文说明：${route.slug}`);
  else if (guide.conclusion.length < 100 || guide.evidence.length < 4 || guide.caveats.length < 3 || guide.related.length < 3 || guide.sources.length < 3) problems.push(`专题路线缺少结论、证据、边界、关联知识或来源：${route.slug}`);
}

if (data.courses.length !== 3 || lessonCount !== 24) problems.push(`已开放课程应为 3 门 24 节，当前为 ${data.courses.length} 门 ${lessonCount} 节`);
if (data.searchRecords.some((record) => data.plannedCourses.some((course) => record.href === `/courses/${course.slug}/`))) problems.push('搜索索引不应把未开放课程当作可学习课程');
if (data.toolCatalog.length !== 12) problems.push(`金融小工具应为 12 个，当前为 ${data.toolCatalog.length}`);
if (data.books.length !== 16) problems.push(`图书应为 16 本，当前为 ${data.books.length}`);
if (data.videos.length !== 12) problems.push(`视频课程应为 12 个，当前为 ${data.videos.length}`);
if (data.timelineEvents.length !== 18) problems.push(`财经简史事件应为 18 个，当前为 ${data.timelineEvents.length}`);
if (data.learningRoutes.length !== 8) problems.push(`专题路线应为 8 条，当前为 ${data.learningRoutes.length}`);
if (data.searchRecords.some((record) => /^\/atlas\/[^/]+\/\d{2}-\d{2}\/$/.test(record.href))) {
  problems.push('搜索索引仍指向旧的模板化概念页');
}
if (data.searchRecords.some((record) => record.id.startsWith('map-') && (record.kind !== '概念索引' || !record.description.includes('尚未单独成篇')))) {
  problems.push('未展开概念必须明确标为概念索引，不能冒充完整知识文章');
}

if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Content audit passed: ${data.knowledgeTerms.length} encyclopedia articles, ${topicCount} topic articles, ${data.courses.length} open courses/${lessonCount} complete lessons, ${data.plannedCourses.length} planned courses, ${data.toolCatalog.length} tools, ${data.books.length} books, ${data.videos.length} videos, ${data.timelineEvents.length} history entries, ${data.learningRoutes.length} study routes, ${data.searchRecords.length} search records.`);
}
