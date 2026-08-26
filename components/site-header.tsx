'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { toolCatalog } from '@/lib/tool-catalog';
import { GlobalSearch } from './global-search';
import { HeaderIcon, type HeaderIconName } from './header-icon';
import { ActionArrow } from './action-arrow';

type NavItem = {
  key: string;
  label: string;
  href: string;
};

type NavGroup = {
  key: string;
  label: string;
  icon: HeaderIconName;
  href: string;
  items: NavItem[];
};

const beginnerHref = '/courses/finance-foundations/';

const navGroups: NavGroup[] = [
  {
    key: 'learn', label: '学习', icon: 'learn', href: '/courses/',
    items: [
      { key: 'beginner', label: '新手入门', href: beginnerHref },
      { key: 'courses', label: '系统课程', href: '/courses/' },
      { key: 'topics', label: '专题路线', href: '/topics/' },
    ],
  },
  {
    key: 'reference', label: '查知识', icon: 'reference', href: '/knowledge/',
    items: [
      { key: 'knowledge', label: '百科词条', href: '/knowledge/' },
      { key: 'atlas', label: '知识地图', href: '/atlas/' },
      { key: 'timeline', label: '财经简史', href: '/timeline/' },
    ],
  },
  {
    key: 'practice', label: '金融小工具', icon: 'practice', href: '/tools/',
    items: [
      { key: 'tools', label: '金融小工具', href: '/tools/' },
    ],
  },
  {
    key: 'resources', label: '书与视频', icon: 'resources', href: '/books/',
    items: [
      { key: 'books', label: '财经图书', href: '/books/' },
      { key: 'videos', label: '视频课程', href: '/videos/' },
    ],
  },
];

function normalizePath(pathname: string) {
  if (pathname === '/') return '/';
  return `${pathname.replace(/\/+$/, '')}/`;
}

function itemIsActive(item: NavItem, pathname: string) {
  if (item.key === 'beginner') return pathname === beginnerHref;
  if (item.key === 'courses') return pathname.startsWith('/courses/') && pathname !== beginnerHref;
  return pathname.startsWith(item.href);
}

export function SiteHeader() {
  const pathname = normalizePath(usePathname() || '/');
  const isHome = pathname === '/';
  const isSearch = pathname.startsWith('/search/');
  const activeGroup = navGroups.find((group) => group.items.some((item) => itemIsActive(item, pathname)));
  const activeItem = activeGroup?.items.find((item) => itemIsActive(item, pathname));
  const subnavRef = useRef<HTMLElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);
  const toolMenuRef = useRef<HTMLDivElement>(null);
  const [toolMenuOpen, setToolMenuOpen] = useState(false);

  useEffect(() => {
    const nav = subnavRef.current;
    const item = activeItemRef.current;
    if (!nav || !item || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: Math.max(0, item.offsetLeft - (nav.clientWidth - item.offsetWidth) / 2), behavior: 'auto' });
  }, [pathname]);

  useEffect(() => {
    function closeFromOutside(event: PointerEvent) {
      if (!toolMenuRef.current?.contains(event.target as Node)) setToolMenuOpen(false);
    }

    function closeFromKeyboard(event: KeyboardEvent) {
      if (event.key === 'Escape') setToolMenuOpen(false);
    }

    document.addEventListener('pointerdown', closeFromOutside);
    document.addEventListener('keydown', closeFromKeyboard);
    return () => {
      document.removeEventListener('pointerdown', closeFromOutside);
      document.removeEventListener('keydown', closeFromKeyboard);
    };
  }, []);

  return (
    <div className={`site-chrome${isHome || isSearch ? ' compact' : ''}${activeGroup ? ` group-${activeGroup.key}` : ''}`}>
      <header className="platform-header">
        <a className={`platform-brand${isHome ? ' active' : ''}`} href="/" aria-label="财知道首页" aria-current={isHome ? 'page' : undefined}>
          <span className="brand-emblem" aria-hidden="true">
            <i>财</i>
            <span className="brand-ledger"><em /><em /><em /></span>
          </span>
          <span className="brand-wordmark"><b>财知道</b><small>财经 · 金融 · 经济学知识库</small></span>
        </a>

        <nav className="primary-nav" aria-label="主要分区">
          {navGroups.map((group) => {
            const active = group.key === activeGroup?.key;
            if (group.key === 'practice') {
              return (
                <div
                  className={`tool-nav-menu${active ? ' active' : ''}${toolMenuOpen ? ' open' : ''}`}
                  key={group.key}
                  ref={toolMenuRef}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setToolMenuOpen(false);
                  }}
                >
                  <button
                    className="tool-nav-trigger"
                    type="button"
                    aria-expanded={toolMenuOpen}
                    aria-controls="financial-tool-menu"
                    onClick={() => setToolMenuOpen((open) => !open)}
                  >
                    <HeaderIcon name={group.icon} className="primary-nav-icon" />
                    <span>{group.label}</span>
                    <i className="tool-menu-chevron" aria-hidden="true" />
                  </button>
                  <div className="tool-nav-dropdown" id="financial-tool-menu" aria-label="金融小工具">
                    {toolCatalog.map((tool) => {
                      const href = `/tools/${tool.id}/`;
                      const current = pathname === href;
                      return (
                        <a href={href} key={tool.id} className={current ? 'active' : ''} aria-current={current ? 'page' : undefined}>
                          <b>{tool.title}</b>
                          <small>{tool.category}</small>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            }
            return <a href={group.href} key={group.key} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}><HeaderIcon name={group.icon} className="primary-nav-icon" /><span>{group.label}</span></a>;
          })}
        </nav>

        <div className="header-actions">
          <a className={`start-entry${pathname === beginnerHref ? ' active' : ''}`} href={beginnerHref}><span>从零开始</span><ActionArrow /></a>
          <GlobalSearch active={isSearch} />
        </div>
      </header>

      {activeGroup && activeGroup.items.length > 1 && (
        <div className="section-nav">
          <div className="section-nav-inner">
            <nav aria-label={`${activeGroup.label}二级导航`} ref={subnavRef}>
              {activeGroup.items.map((item) => {
                const active = item.key === activeItem?.key;
                return <a href={item.href} key={item.key} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined} ref={active ? activeItemRef : undefined}>{item.label}</a>;
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
