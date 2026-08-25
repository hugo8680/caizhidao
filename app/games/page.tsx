import type { Metadata } from 'next';
import { FinanceGames } from '@/components/finance-games';

export const metadata: Metadata = {
  title: '金融小游戏 · 财知道',
  description: '用复利冲刺、目标配对和产品侦探三个小游戏检验金融直觉。',
};

export default function GamesPage() {
  return (
    <main>
      <FinanceGames />
    </main>
  );
}
