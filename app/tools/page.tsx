import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '金融小工具 · 财知道',
  description: '12 个金融计算器：复利、实际收益、贷款、储蓄、养老、DCF、债券、仓位与费用影响。',
  alternates: { canonical: '/tools/compound/' },
};

export default function ToolsPage() {
  return <meta httpEquiv="refresh" content="0; url=/tools/compound/" />;
}
