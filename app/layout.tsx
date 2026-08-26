import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';
import './editorial-system.css';
import './interface-policies-v5.css';
import './interface-policies-v6.css';
import './brand-lockup-v9.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://caizhidao.yrchr.com'),
  title: {
    default: '财知道 · 财经金融经济学科普知识库',
    template: '%s',
  },
  description: '系统介绍经济学、金融学、会计和个人财务，收录知识地图、双语百科、课程、计算工具、图书与公开视频。',
  icons: {
    icon: [{ url: '/favicon.svg?v=2', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg?v=2',
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
