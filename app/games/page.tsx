import type { Metadata } from 'next';
import { FinanceGames } from '@/components/finance-games';

export const metadata: Metadata = {
  title: '金融小游戏 · 财知道',
  description: '用复利冲刺、目标配对和产品侦探三个小游戏检验金融直觉。',
};

export default function GamesPage() {
  return (
    <main>
      <header className="catalog-head standalone-catalog-head"><div><span>练习工具 / 互动</span><h1>金融小游戏</h1></div><dl><div><dt>游戏</dt><dd>3 个</dd></div><div><dt>情景</dt><dd>10+ 种</dd></div><div><dt>练习</dt><dd>可重复</dd></div></dl></header>
      <FinanceGames />
    </main>
  );
}
