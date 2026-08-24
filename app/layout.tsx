import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
  title: '财识 · 零基础金融学习地图',
  description: '64 课系统建立金融思维：从金钱基础到个人财务、投资分析、组合管理与全球金融。',
  openGraph: {
    title: '财识 · 零基础金融学习地图',
    description: '64 课、8 大模块，从零到进阶系统建立金融思维。',
    type: 'website',
    locale: 'zh_CN',
    siteName: '财识',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '财识 · 64 课系统建立金融思维' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '财识 · 零基础金融学习地图',
    description: '64 课、8 大模块，从零到进阶系统建立金融思维。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
