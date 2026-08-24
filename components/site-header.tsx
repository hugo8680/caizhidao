'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { GlobalSearch } from './global-search';

type SiteSection = {
  code: string;
  key: string;
  label: string;
  href: string;
  purpose: string;
};

const navSections: SiteSection[] = [
  { code: '01', key: 'atlas', label: '知识地图', href: '/atlas/', purpose: '定位学科、主题与概念之间的关系' },
  { code: '02', key: 'knowledge', label: '科普百科', href: '/knowledge/', purpose: '把财经术语讲清楚，并说明如何使用' },
  { code: '03', key: 'topics', label: '专题路线', href: '/topics/', purpose: '围绕一个问题串起完整因果链' },
  { code: '04', key: 'courses', label: '系统课程', href: '/courses/', purpose: '按顺序建立可以复用的知识框架' },
  { code: '05', key: 'tools', label: '金融工具', href: '/tools/', purpose: '把抽象金融关系放进具体数字' },
  { code: '06', key: 'timeline', label: '发展简史', href: '/timeline/', purpose: '用历史理解制度、思想与市场变化' },
  { code: '07', key: 'books', label: '财经图书', href: '/books/', purpose: '继续阅读经过整理的中英文图书' },
  { code: '08', key: 'videos', label: '视频课程', href: '/videos/', purpose: '通过中英文公开课程深入学习' },
  { code: '09', key: 'games', label: '互动实验', href: '/games/', purpose: '用互动练习巩固关键概念' },
];

const searchSection: SiteSection = {
  code: '10', key: 'search', label: '全站检索', href: '/search/', purpose: '快速找到全站相关知识与资源',
};

const homeSection: SiteSection = {
  code: '00', key: 'home', label: '全站总览', href: '/', purpose: '从全局认识财经、金融与经济学',
};

function normalizePath(pathname: string) {
  if (pathname === '/') return '/';
  return `${pathname.replace(/\/+$/, '')}/`;
}

function detailKind(section: SiteSection, path: string) {
  if (path === section.href) return '模块总览';
  if (section.key === 'atlas') return '学科地图';
  if (section.key === 'knowledge') return path.includes('/category/') ? '百科主题' : '词条详解';
  if (section.key === 'topics') return '专题详解';
  if (section.key === 'courses') return '课程学习';
  if (section.key === 'tools') return '计算工具';
  if (section.key === 'timeline') return '历史事件';
  if (section.key === 'books') return '图书详情';
  if (section.key === 'videos') return '课程详情';
  if (section.key === 'search') return '检索结果';
  return '互动实验';
}

export function SiteHeader() {
  const pathname = normalizePath(usePathname() || '/');
  const activeSection = pathname === '/'
    ? homeSection
    : navSections.find((section) => pathname.startsWith(section.href))
      ?? (pathname.startsWith(searchSection.href) ? searchSection : homeSection);
  const isHome = activeSection.key === 'home';
  const isDetail = !isHome && pathname !== activeSection.href;
  const fallbackTitle = detailKind(activeSection, pathname);
  const [pageTitle, setPageTitle] = useState(fallbackTitle);
  const navRef = useRef<HTMLElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!isDetail) {
        setPageTitle(fallbackTitle);
        return;
      }
      const title = document.title.replace(/\s*·\s*财知道.*$/, '').trim();
      setPageTitle(title && title !== '财知道' ? title : fallbackTitle);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [fallbackTitle, isDetail, pathname]);

  useEffect(() => {
    const nav = navRef.current;
    const item = activeItemRef.current;
    if (!nav || !item || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: Math.max(0, item.offsetLeft - (nav.clientWidth - item.offsetWidth) / 2), behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="site-chrome">
      <header className="platform-header">
        <a className={`platform-brand${isHome ? ' active' : ''}`} href="/" aria-label="财知道首页" aria-current={isHome ? 'page' : undefined}>
          <span>财</span>
          <b>财知道<small>ECONOMY KNOWLEDGE ATLAS</small></b>
        </a>
        <nav className="module-nav" aria-label="主要模块" ref={navRef}>
          {navSections.map((section) => {
            const active = section.key === activeSection.key;
            return (
              <a href={section.href} key={section.key} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined} ref={active ? activeItemRef : undefined}>
                <small>{section.code}</small><span>{section.label}</span>
              </a>
            );
          })}
        </nav>
        <GlobalSearch active={activeSection.key === 'search'} />
      </header>

      <div className="location-bar" aria-label="当前位置">
        <div className="location-inner">
          <div className="location-trail">
            <span className="location-prefix">当前位置</span>
            <a href="/" aria-current={isHome ? 'page' : undefined}>首页</a>
            {!isHome && <><i>›</i><a href={activeSection.href} aria-current={!isDetail ? 'page' : undefined}>{activeSection.label}</a></>}
            {isDetail && <><i>›</i><strong>{pageTitle}</strong></>}
            <span className="location-state">{isHome ? '知识总览' : detailKind(activeSection, pathname)}</span>
          </div>
          <div className="location-purpose">
            <span>{activeSection.code}</span>
            <p><small>MODULE PURPOSE</small><b>{activeSection.purpose}</b></p>
          </div>
        </div>
      </div>
    </div>
  );
}
