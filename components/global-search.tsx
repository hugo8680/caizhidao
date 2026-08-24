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
      <button className={`search-entry${active ? ' active' : ''}`} type="button" onClick={() => setOpen(true)} aria-label="打开全站检索" aria-current={active ? 'page' : undefined}>
        <kbd>⌘ K</kbd><span>检索全站知识</span>
      </button>
      {open && (
        <div className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className="search-dialog" role="dialog" aria-modal="true" aria-label="全站检索">
            <div className="search-dialog-input">
              <span>⌕</span>
              <input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索术语、课程、ISBN、工具或视频…" />
              <button type="button" onClick={() => setOpen(false)}>ESC</button>
            </div>
            <div className="search-dialog-results">
              {results.map(({ record }) => (
                <a href={record.href} key={record.id}>
                  <span>{record.kind}</span>
                  <div><b>{record.title}</b><small>{record.english}</small><p>{record.description}</p></div>
                  <i>↗</i>
                </a>
              ))}
              {query && results.length === 0 && <p className="search-empty">没有找到完全匹配的内容，试试更短的词，例如“现金流”“ETF”或“通胀”。</p>}
            </div>
            <footer><span>↑ ↓ 浏览</span><span>Enter 打开</span><a href={`/search/?q=${encodeURIComponent(query)}`}>进入高级检索 →</a></footer>
          </section>
        </div>
      )}
    </>
  );
}
