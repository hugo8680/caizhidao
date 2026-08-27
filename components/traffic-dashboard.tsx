'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './traffic-dashboard.module.css';

type Period = { pageViews: number; visitors: number };
type DailyPoint = { date: string; pageViews: number; visitors: number };
type TrafficSummary = {
  generatedAt: string | null;
  trackingSince: string;
  timezone: string;
  periods: { today: Period; days7: Period; days30: Period };
  daily: DailyPoint[];
  topPages: Array<{ path: string; title: string; pageViews: number }>;
  referrers: Array<{ domain: string; pageViews: number }>;
  devices: Array<{ name: string; pageViews: number }>;
  method: { cookies: boolean; botsExcluded: boolean; visitorDefinition: string };
};

const emptySummary: TrafficSummary = {
  generatedAt: null,
  trackingSince: '2026-08-27',
  timezone: 'Asia/Shanghai',
  periods: {
    today: { pageViews: 0, visitors: 0 },
    days7: { pageViews: 0, visitors: 0 },
    days30: { pageViews: 0, visitors: 0 },
  },
  daily: [],
  topPages: [],
  referrers: [],
  devices: [],
  method: { cookies: false, botsExcluded: true, visitorDefinition: '匿名访客估算' },
};

const periods = [
  { key: 'today' as const, label: '今天' },
  { key: 'days7' as const, label: '最近 7 天' },
  { key: 'days30' as const, label: '最近 30 天' },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat('zh-CN').format(value);
}

function safePageHref(path: string) {
  return path.startsWith('/') && !path.startsWith('//') ? path : '/';
}

function formatUpdatedAt(value: string | null) {
  if (!value) return '等待第一次汇总';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '更新时间未知';
  return `更新于 ${new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Shanghai' }).format(date)}`;
}

export function TrafficDashboard() {
  const [summary, setSummary] = useState<TrafficSummary>(emptySummary);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetch('/site-statistics/summary.json', { cache: 'no-store', signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<TrafficSummary>;
      })
      .then((data) => { setSummary(data); setStatus('ready'); })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setStatus('error');
      });
    return () => controller.abort();
  }, []);

  const maxDailyViews = useMemo(() => Math.max(1, ...summary.daily.map((point) => point.pageViews)), [summary.daily]);

  return (
    <section className={styles.dashboard} aria-live="polite">
      <div className={styles.statusLine}>
        <span>{formatUpdatedAt(summary.generatedAt)}</span>
        <span>统计时区：北京时间</span>
      </div>

      <div className={styles.periods}>
        {periods.map((period) => {
          const value = summary.periods[period.key];
          return <article key={period.key}><p>{period.label}</p><dl><div><dt>页面浏览</dt><dd>{formatNumber(value.pageViews)}</dd></div><div><dt>访客估算</dt><dd>{formatNumber(value.visitors)}</dd></div></dl></article>;
        })}
      </div>

      {status === 'error' && <p className={styles.notice}>统计数据暂时无法读取，页面内容仍可正常使用。</p>}
      {status !== 'error' && summary.daily.length === 0 && <p className={styles.notice}>{status === 'loading' ? '正在读取最新汇总……' : '统计刚开始记录，积累访问后会显示趋势和热门页面。'}</p>}

      {summary.daily.length > 0 && <section className={styles.trend}>
        <header><div><p>30 日趋势</p><h2>每天的页面浏览与访客估算</h2></div><p>柱形表示 PV，数字表示当日 UV。</p></header>
        <div className={styles.chart} role="img" aria-label="最近三十天页面浏览量柱形图">
          {summary.daily.map((point) => <div key={point.date} title={`${point.date}：${point.pageViews} PV，${point.visitors} UV`}><i style={{ height: point.pageViews === 0 ? 0 : `${Math.max(3, (point.pageViews / maxDailyViews) * 100)}%` }} /><b>{point.visitors}</b><span>{point.date.slice(5)}</span></div>)}
        </div>
      </section>}

      <div className={styles.detailGrid}>
        <section>
          <header><p>最近 30 天</p><h2>热门页面</h2></header>
          {summary.topPages.length > 0 ? <ol className={styles.ranking}>{summary.topPages.map((page) => <li key={page.path}><a href={safePageHref(page.path)}><span><b>{page.title || page.path}</b><small>{page.path}</small></span><strong>{formatNumber(page.pageViews)}</strong></a></li>)}</ol> : <p className={styles.empty}>暂无足够数据。</p>}
        </section>

        <section>
          <header><p>最近 30 天</p><h2>外部来源域名</h2></header>
          <p className={styles.definition}>只统计带有外部来源网址的页面浏览；直接输入网址、书签和无法识别来源的访问不会被猜测归类。</p>
          {summary.referrers.length > 0 ? <ol className={styles.compactList}>{summary.referrers.map((item) => <li key={item.domain}><span>{item.domain}</span><b>{formatNumber(item.pageViews)}</b></li>)}</ol> : <p className={styles.empty}>暂无可识别的外部来源。</p>}
        </section>

        <section>
          <header><p>最近 30 天</p><h2>设备类别</h2></header>
          <p className={styles.definition}>根据浏览器标识粗略区分，不用于识别个人。</p>
          {summary.devices.length > 0 ? <ol className={styles.compactList}>{summary.devices.map((item) => <li key={item.name}><span>{item.name}</span><b>{formatNumber(item.pageViews)}</b></li>)}</ol> : <p className={styles.empty}>暂无足够数据。</p>}
        </section>
      </div>
    </section>
  );
}
