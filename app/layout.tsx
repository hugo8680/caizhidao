import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://caishi.yrchr.com'),
  title: '财识 · 一站式财经学习平台',
  description: '财经知识库、8 套系统课程、12 个金融工具、全站检索、图书、双语视频和小游戏。',
  openGraph: {
    title: '财识 · 一站式财经学习平台',
    description: '知识、课程、工具、图书与视频，在同一张财经学习地图中互相连接。',
    type: 'website',
    locale: 'zh_CN',
    siteName: '财识',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '财识 · 一站式财经学习平台' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '财识 · 一站式财经学习平台',
    description: '知识、课程、工具、图书与视频，在同一张财经学习地图中互相连接。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
