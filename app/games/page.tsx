import type { Metadata } from 'next';
import { FinanceGames } from '@/components/finance-games';

export const metadata: Metadata = {
  title: '金融小游戏 · 财知道',
  description: '用复利冲刺、目标配对和产品侦探三个小游戏检验金融直觉。',
};

export default function GamesPage() {
  return (
    <main>
      <section className="page-hero games-hero"><p>LEARNING GAMES · 金融小游戏</p><h1>金融互动实验</h1><div className="hero-metrics"><span><b>3</b>个游戏</span><span><b>10+</b>种情景</span><span><b>∞</b>次重玩</span></div></section>
      <FinanceGames />
    </main>
  );
}
