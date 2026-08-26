import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'esbuild';

const projectRoot = process.cwd();
const bundled = await build({
  entryPoints: [resolve(projectRoot, 'lib/search.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node20',
  write: false,
});
const source = bundled.outputFiles[0].text;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const { searchRecords } = await import(moduleUrl);
const publicDirectory = resolve(projectRoot, 'public');
const outputPath = resolve(publicDirectory, 'search-index.json');

await mkdir(publicDirectory, { recursive: true });
await writeFile(outputPath, `${JSON.stringify(searchRecords)}\n`, 'utf8');
console.log(`Generated ${searchRecords.length} search records at ${outputPath}`);
