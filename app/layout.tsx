import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://caizhidao.yrchr.com'),
  title: {
    default: '财知道 · 财经金融经济学科普知识库',
    template: '%s',
  },
  description: '连接经济学、金融学、会计与个人财务的科普知识体系：12 个学科、240 个知识节点、双语百科、专题路线、课程、工具与资源。',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: '财知道 · 财经金融经济学科普知识库',
    description: '看懂钱如何流动、市场为何波动、世界怎样做选择。',
    type: 'website',
    locale: 'zh_CN',
    siteName: '财知道',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '财知道 · 财经金融经济学科普知识库' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '财知道 · 财经金融经济学科普知识库',
    description: '看懂钱如何流动、市场为何波动、世界怎样做选择。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
