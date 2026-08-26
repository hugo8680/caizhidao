'use client';

import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { searchContent } from '@/lib/search';
import { ActionArrow } from './action-arrow';
import { HeaderIcon } from './header-icon';

export function GlobalSearch({ active = false }: { active?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
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
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const keepFocusInside = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('input, button:not(:disabled), a[href]'));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <button ref={triggerRef} className={`search-entry${active ? ' active' : ''}`} type="button" onClick={() => setOpen(true)} aria-label="打开搜索" aria-current={active ? 'page' : undefined} aria-haspopup="dialog" aria-expanded={open} aria-controls="site-search-dialog">
        <HeaderIcon name="search" className="search-entry-icon" /><span>搜索</span><kbd>⌘ K</kbd>
      </button>
      {open && (
        <div className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className="search-dialog" id="site-search-dialog" role="dialog" aria-modal="true" aria-label="全站搜索" onKeyDown={keepFocusInside}>
            <div className="search-dialog-input">
              <HeaderIcon name="search" />
              <input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="输入关键词、英文术语或 ISBN…" />
              <button type="button" onClick={() => setOpen(false)}>关闭</button>
            </div>
            <div className="search-dialog-results">
              {results.map(({ record }) => (
                <a href={record.href} key={record.id}>
                  <span>{record.kind}</span>
                  <div><b>{record.title}</b><small>{record.english}</small><p>{record.description}</p></div>
                  <ActionArrow />
                </a>
              ))}
            {query && results.length === 0 && <p className="search-empty">没有找到相关内容。可以试试“现金流”“ETF”或“通胀”这样的短词。</p>}
            </div>
          <footer><a href={`/search/?q=${encodeURIComponent(query)}`}><span>查看全部结果</span><ActionArrow /></a></footer>
          </section>
        </div>
      )}
    </>
  );
}
