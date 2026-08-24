import type { Metadata } from 'next';
import { FinanceTools } from '@/components/finance-tools';
import { toolCatalog } from '@/lib/library';

export const metadata: Metadata = {
  title: '金融小工具 · 财识',
  description: '12 个金融计算器：复利、实际收益、贷款、储蓄、养老、DCF、债券、仓位与费用影响。',
};

export default function ToolsPage() {
  return (
    <main>
      <section className="page-hero tools-hero"><p>FINANCIAL TOOLKIT · 金融小工具</p><h1>别只记公式。<br />把问题换成你自己的数字。</h1><div className="hero-metrics"><span><b>{toolCatalog.length}</b>个计算器</span><span><b>6</b>类问题</span><span><b>0</b>数据上传</span></div></section>
      <section className="tools-intro"><div><span>LOCAL & PRIVATE</span><h2>计算全部在你的浏览器完成</h2></div><p>输入不会上传或保存。结果用于理解变量之间的关系，并非收益承诺、报价或个别投资建议；涉及贷款、税务与退休规划时请核对真实合同。</p></section>
      <FinanceTools />
    </main>
  );
}
