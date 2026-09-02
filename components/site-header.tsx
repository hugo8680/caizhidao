'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { toolCatalog } from '@/lib/tool-catalog';
import { GlobalSearch } from './global-search';
import { ActionArrow } from './action-arrow';
import { HeaderIcon, type HeaderIconName } from './header-icon';

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

const beginnerHref = '/courses/start/';

const mobileNavItems: Array<{ label: string; href: string; icon: HeaderIconName; match: string }> = [
  { label: '学习', href: beginnerHref, icon: 'learn', match: '/courses/' },
  { label: '知识库', href: '/knowledge/', icon: 'reference', match: '/knowledge/' },
  { label: '工具', href: '/tools/compound/', icon: 'practice', match: '/tools/' },
  { label: '书架', href: '/books/', icon: 'resources', match: '/books/' },
  { label: '搜索', href: '/search/', icon: 'search', match: '/search/' },
];

const navGroups: NavGroup[] = [
  {
    key: 'learn', label: '学习', href: beginnerHref,
    items: [
      { key: 'beginner', label: '新手入门', href: beginnerHref },
      { key: 'courses', label: '系统课程', href: '/courses/' },
      { key: 'topics', label: '专题路线', href: '/topics/' },
    ],
  },
  {
    key: 'reference', label: '知识库', href: '/knowledge/',
    items: [
      { key: 'knowledge', label: '百科词条', href: '/knowledge/' },
      { key: 'atlas', label: '知识地图', href: '/atlas/' },
      { key: 'timeline', label: '财经简史', href: '/timeline/' },
    ],
  },
  {
    key: 'practice', label: '金融小工具', href: '/tools/',
    items: [
      { key: 'tools', label: '金融小工具', href: '/tools/' },
    ],
  },
  {
    key: 'resources', label: '图书与视频', href: '/books/',
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
  const siteChromeRef = useRef<HTMLDivElement>(null);
  const [toolMenuOpen, setToolMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const nav = subnavRef.current;
    const item = activeItemRef.current;
    if (!nav || !item || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: Math.max(0, item.offsetLeft - (nav.clientWidth - item.offsetWidth) / 2), behavior: 'auto' });
  }, [pathname]);

  useEffect(() => {
    function closeFromOutside(event: PointerEvent) {
      if (!toolMenuRef.current?.contains(event.target as Node)) setToolMenuOpen(false);
      if (!siteChromeRef.current?.contains(event.target as Node)) setMobileMenuOpen(false);
    }

    function closeFromKeyboard(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setToolMenuOpen(false);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeFromOutside);
    document.addEventListener('keydown', closeFromKeyboard);
    return () => {
      document.removeEventListener('pointerdown', closeFromOutside);
      document.removeEventListener('keydown', closeFromKeyboard);
    };
  }, []);

  return (
    <div ref={siteChromeRef} className={`site-chrome${isHome || isSearch ? ' compact' : ''}${activeGroup ? ` group-${activeGroup.key}` : ''}${mobileMenuOpen ? ' mobile-open' : ''}`}>
      <header className="platform-header">
        <a className={`platform-brand${isHome ? ' active' : ''}`} href="/" aria-label="财知道首页" aria-current={isHome ? 'page' : undefined}>
          <span className="brand-desktop-lockup" aria-hidden="true">
            <span className="brand-lockup-copy">
              <strong>财知道</strong>
              <small>系统的财经知识与金融工具</small>
            </span>
          </span>
          <span className="brand-mobile-mark" aria-hidden="true"><Image src="/caizhidao-mark.svg" alt="" width={31} height={31} priority /></span>
        </a>

        <nav className={`primary-nav${mobileMenuOpen ? ' open' : ''}`} id="primary-site-navigation" aria-label="主要分区">
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
                    <span>{group.label}</span>
                    <HeaderIcon name="caret" className="tool-menu-chevron" />
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
            return <a href={group.href} key={group.key} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}><span>{group.label}</span></a>;
          })}
        </nav>

        <div className="header-actions">
          <a className={`start-entry${pathname === beginnerHref ? ' active' : ''}`} href={beginnerHref}><span>从零开始</span><ActionArrow /></a>
          <GlobalSearch active={isSearch} />
          <button
            className="mobile-nav-toggle"
            type="button"
            aria-label={mobileMenuOpen ? '关闭导航' : '打开导航'}
            aria-controls="primary-site-navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <HeaderIcon name="menu" />
          </button>
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

      <nav className="mobile-bottom-nav" aria-label="移动端主要导航">
        {mobileNavItems.map((item) => {
          const active = pathname.startsWith(item.match);
          return <a href={item.href} key={item.label} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}><HeaderIcon name={item.icon} /><span>{item.label}</span></a>;
        })}
      </nav>
    </div>
  );
}
