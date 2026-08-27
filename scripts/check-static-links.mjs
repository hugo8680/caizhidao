import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const outputRoot = path.resolve(process.argv[2] ?? 'out');
const attributePattern = /\b(?:href|src)=(?:"([^"]+)"|'([^']+)')/g;
const externalPattern = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
}

async function exists(target) {
  try {
    return (await stat(target)).isFile();
  } catch {
    return false;
  }
}

function pageRoute(file) {
  const relative = path.relative(outputRoot, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -10)}`;
  return `/${relative}`;
}

function resolveTarget(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return undefined;
  }
  if (decoded.includes('\0') || decoded.split('/').includes('..')) return undefined;
  const relative = decoded.replace(/^\/+/, '');
  if (!relative) return path.join(outputRoot, 'index.html');
  if (decoded.endsWith('/')) return path.join(outputRoot, relative, 'index.html');
  if (path.extname(relative)) return path.join(outputRoot, relative);
  return path.join(outputRoot, relative, 'index.html');
}

const files = await walk(outputRoot);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const htmlCache = new Map();
const missing = new Set();
let internalReferences = 0;
let anchors = 0;

for (const file of htmlFiles) {
  const contents = await readFile(file, 'utf8');
  const route = pageRoute(file);
  for (const match of contents.matchAll(attributePattern)) {
    const raw = match[1] ?? match[2];
    if (!raw || raw === '#' || externalPattern.test(raw)) continue;
    let url;
    try {
      url = new URL(raw, `https://static.local${route}`);
    } catch {
      missing.add(`${route} -> invalid URL: ${raw}`);
      continue;
    }
    if (url.origin !== 'https://static.local') continue;
    const target = resolveTarget(url.pathname);
    internalReferences += 1;
    if (!target || !await exists(target)) {
      missing.add(`${route} -> ${url.pathname}`);
      continue;
    }
    if (!url.hash || !target.endsWith('.html')) continue;
    let fragment;
    try {
      fragment = decodeURIComponent(url.hash.slice(1));
    } catch {
      missing.add(`${route} -> invalid anchor: ${raw}`);
      continue;
    }
    const targetContents = htmlCache.has(target) ? htmlCache.get(target) : await readFile(target, 'utf8');
    htmlCache.set(target, targetContents);
    const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp(`(?:id|name)=["']${escaped}["']`).test(targetContents)) missing.add(`${route} -> missing #${fragment} on ${url.pathname}`);
    anchors += 1;
  }
}

if (missing.size > 0) {
  console.error([...missing].sort().join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Static link audit passed: ${htmlFiles.length} HTML pages, ${internalReferences} internal references, ${anchors} anchors, 0 missing targets.`);
}
