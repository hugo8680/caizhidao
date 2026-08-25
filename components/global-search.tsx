'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { searchContent } from '@/lib/search';

export function GlobalSearch({ active = false }: { active?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchContent(query).slice(0, 8), [query]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  return (
    <>
      <button className={`search-entry${active ? ' active' : ''}`} type="button" onClick={() => setOpen(true)} aria-label="打开搜索" aria-current={active ? 'page' : undefined}>
        <kbd>⌘ K</kbd><span>搜索</span>
      </button>
      {open && (
        <div className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className="search-dialog" role="dialog" aria-modal="true" aria-label="全站搜索">
            <div className="search-dialog-input">
              <span>⌕</span>
              <input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="输入关键词、英文术语或 ISBN…" />
              <button type="button" onClick={() => setOpen(false)}>关闭</button>
            </div>
            <div className="search-dialog-results">
              {results.map(({ record }) => (
                <a href={record.href} key={record.id}>
                  <span>{record.kind}</span>
                  <div><b>{record.title}</b><small>{record.english}</small><p>{record.description}</p></div>
                  <i>↗</i>
                </a>
              ))}
            {query && results.length === 0 && <p className="search-empty">没有找到相关内容。可以试试“现金流”“ETF”或“通胀”这样的短词。</p>}
            </div>
          <footer><a href={`/search/?q=${encodeURIComponent(query)}`}>查看全部结果 →</a></footer>
          </section>
        </div>
      )}
    </>
  );
}
