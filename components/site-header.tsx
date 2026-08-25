'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { GlobalSearch } from './global-search';

type NavItem = {
  key: string;
  label: string;
  href: string;
};

type NavGroup = {
  key: string;
  label: string;
  href: string;
  items: NavItem[];
};

const beginnerHref = '/courses/finance-foundations/';

const navGroups: NavGroup[] = [
  {
    key: 'learn', label: '学习', href: '/courses/',
    items: [
      { key: 'beginner', label: '新手入门', href: beginnerHref },
      { key: 'courses', label: '系统课程', href: '/courses/' },
      { key: 'topics', label: '专题路线', href: '/topics/' },
    ],
  },
  {
    key: 'reference', label: '查知识', href: '/knowledge/',
    items: [
      { key: 'knowledge', label: '百科词条', href: '/knowledge/' },
      { key: 'atlas', label: '知识地图', href: '/atlas/' },
      { key: 'timeline', label: '财经简史', href: '/timeline/' },
    ],
  },
  {
    key: 'practice', label: '练习工具', href: '/tools/',
    items: [
      { key: 'tools', label: '计算工具', href: '/tools/' },
      { key: 'games', label: '互动练习', href: '/games/' },
    ],
  },
  {
    key: 'resources', label: '书与视频', href: '/books/',
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

  useEffect(() => {
    const nav = subnavRef.current;
    const item = activeItemRef.current;
    if (!nav || !item || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: Math.max(0, item.offsetLeft - (nav.clientWidth - item.offsetWidth) / 2), behavior: 'auto' });
  }, [pathname]);

  return (
    <div className={`site-chrome${isHome || isSearch ? ' compact' : ''}${activeGroup ? ` group-${activeGroup.key}` : ''}`}>
      <header className="platform-header">
        <a className={`platform-brand${isHome ? ' active' : ''}`} href="/" aria-label="财知道首页" aria-current={isHome ? 'page' : undefined}>
          <span>财</span>
          <b>财知道<small>财经知识库</small></b>
        </a>

        <nav className="primary-nav" aria-label="主要分区">
          {navGroups.map((group) => {
            const active = group.key === activeGroup?.key;
            return <a href={group.href} key={group.key} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}><span>{group.label}</span></a>;
          })}
        </nav>

        <div className="header-actions">
          <a className={`start-entry${pathname === beginnerHref ? ' active' : ''}`} href={beginnerHref}>从零开始</a>
          <GlobalSearch active={isSearch} />
        </div>
      </header>

      {activeGroup && (
        <div className="section-nav">
          <div className="section-nav-inner">
            <span className="section-nav-label"><b>{activeGroup.label}</b></span>
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
