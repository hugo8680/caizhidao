import type { Metadata } from 'next';
import { FinanceGames } from '@/components/finance-games';

export const metadata: Metadata = {
  title: '金融小游戏 · 财识',
  description: '用复利冲刺、目标配对和产品侦探三个小游戏检验金融直觉。',
};

export default function GamesPage() {
  return (
    <main>
      <section className="page-hero games-hero"><p>LEARNING GAMES · 金融小游戏</p><h1>不背答案。<br />在小决策里练出金融直觉。</h1><div className="hero-metrics"><span><b>3</b>个游戏</span><span><b>10+</b>种情景</span><span><b>∞</b>次重玩</span></div></section>
      <section className="games-intro"><div><span>LEARN BY DOING</span><h2>三种能力，一次练习</h2></div><p>先估算复利速度，再为不同期限匹配资产，最后识别产品销售中的危险信号。得分只保存在当前页面，重点是复盘判断依据。</p></section>
      <FinanceGames />
    </main>
  );
}
