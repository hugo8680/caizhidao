import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
  title: '财识 · 零基础金融学习地图',
  description: '28 天系统建立金融思维：从复利、通胀与风险，到资产、公司与市场。',
  openGraph: {
    title: '财识 · 零基础金融学习地图',
    description: '28 天建立金融思维，每天一个概念、一个案例、一道练习。',
    type: 'website',
    locale: 'zh_CN',
    siteName: '财识',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '财识 · 28 天建立金融思维' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '财识 · 零基础金融学习地图',
    description: '28 天建立金融思维，每天一个概念、一个案例、一道练习。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
