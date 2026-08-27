'use client';

import { useEffect, useMemo, useState } from 'react';
import { searchContent } from '@/lib/search-ranking';
import type { SearchKind } from '@/lib/search-types';
import { useSearchIndex } from './use-search-index';

const kinds: Array<SearchKind | '全部'> = ['全部', '知识', '课程', '专题', '学科', '工具', '图书', '视频', '历史'];
const suggestions = ['供需', '货币', '经济周期', '现金流', 'ETF', '通胀', '退休', '估值'];

export function SearchExperience() {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<SearchKind | '全部'>('全部');
  const { records, loading, failed } = useSearchIndex(true);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('q');
    const timer = value ? window.setTimeout(() => setQuery(value), 0) : undefined;
    return () => { if (timer) window.clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }, [query]);

  const results = useMemo(() => searchContent(records, query, kind), [records, query, kind]);
  const counts = useMemo(() => kinds.reduce<Record<string, number>>((map, item) => ({ ...map, [item]: searchContent(records, query, item).length }), {}), [records, query]);

  return (
    <section className="search-page-shell">
      <div className="search-page-box">
        <label><span>⌕</span><input type="search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="输入关键词、英文术语或 ISBN…" /><kbd>⌘ K</kbd></label>
        <div className="search-suggestions"><span>常用关键词</span>{suggestions.map((item) => <button type="button" onClick={() => setQuery(item)} key={item}>{item}</button>)}</div>
      </div>
      <div className="search-tabs" role="tablist" aria-label="结果类型">
        {kinds.map((item) => <button type="button" role="tab" aria-selected={kind === item} className={kind === item ? 'active' : ''} onClick={() => setKind(item)} key={item}><span>{item}</span><b>{counts[item]}</b></button>)}
      </div>
      <div className="search-results-head"><p>{query ? <>“{query}” 的搜索结果</> : <>浏览全部内容</>}<b>{results.length}</b></p><small>完整文章优先；“概念索引”表示该词目前在主题文章中解释</small></div>
      <div className="search-page-results">
        {loading && <div className="search-page-empty"><b>正在载入知识索引…</b><p>搜索数据只在需要时载入，不再随每个页面下载。</p></div>}
        {failed && <div className="search-page-empty"><b>搜索索引暂时无法载入</b><p>请刷新页面后重试。</p></div>}
        {results.slice(0, query ? 80 : 36).map(({ record }) => (
          <a href={record.href} key={record.id}>
            <span>{record.kind}</span><div><h2>{record.title}</h2><h3>{record.english}</h3><p>{record.description}</p></div><i>→</i>
          </a>
        ))}
        {!loading && !failed && results.length === 0 && <div className="search-page-empty"><b>没有找到相关内容</b><p>可以换一个短一点的关键词，或者切回“全部”。</p><button type="button" onClick={() => { setQuery(''); setKind('全部'); }}>清除条件</button></div>}
      </div>
      {!query && results.length > 36 && <p className="search-browse-note">这里先显示 36 条；输入关键词可以搜索全部 {records.length} 条内容。</p>}
    </section>
  );
}
