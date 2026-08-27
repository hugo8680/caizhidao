import type { Metadata } from 'next';
import { TrafficDashboard } from '@/components/traffic-dashboard';
import styles from './site-statistics.module.css';

export const metadata: Metadata = {
  title: '访问统计 · 财知道',
  description: '财知道公开、聚合且不使用 Cookie 的网站访问统计。',
  openGraph: { title: '访问统计 · 财知道', description: '公开了解财知道的访问趋势与热门内容。', images: [] },
  twitter: { title: '访问统计 · 财知道', description: '公开了解财知道的访问趋势与热门内容。', images: [] },
};

export default function SiteStatisticsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p><a href="/">财知道</a> ／ Site statistics</p>
        <h1>访问统计</h1>
        <p>这里公开展示聚合后的页面浏览、访客估算和热门内容。从 2026 年 8 月 27 日开始记录，不补造此前数据，也不使用 Cookie 或第三方跟踪脚本。</p>
      </header>
      <TrafficDashboard />
      <section className={styles.explanation}>
        <h2>这些数字应该怎样理解</h2>
        <div>
          <article><h3>页面浏览量（PV）</h3><p>一次成功加载正文页面记为一次页面浏览。图片、样式、搜索索引和统计数据本身不会计入。</p></article>
          <article><h3>访客数（UV）</h3><p>在相应统计期内，将相同网络地址与浏览器标识的匿名组合估算为一位访客。多人共用网络或一人使用多台设备都会造成偏差，因此它是估算值，不是人口统计。</p></article>
          <article><h3>隐私与过滤</h3><p>服务器只输出汇总数字，不公开网络地址、完整浏览器标识或个人访问轨迹。常见搜索爬虫、监控程序和命令行请求会被排除。</p></article>
        </div>
      </section>
    </main>
  );
}
