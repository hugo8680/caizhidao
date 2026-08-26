import type { SearchKind, SearchRecord } from './search-types';

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

export function searchContent(records: SearchRecord[], input: string, kind: SearchKind | '全部' = '全部') {
  const query = normalize(input);
  const terms = query.split(' ').filter(Boolean);

  return records
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
