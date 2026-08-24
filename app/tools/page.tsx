import type { Metadata } from 'next';
import { toolCatalog } from '@/lib/library';

export const metadata: Metadata = {
  title: '金融小工具 · 财知道',
  description: '12 个金融计算器：复利、实际收益、贷款、储蓄、养老、DCF、债券、仓位与费用影响。',
};

export default function ToolsPage() {
  const categoryCount = new Set(toolCatalog.map((tool) => tool.category)).size;
  return (
    <main>
      <section className="page-hero tools-hero"><p>FINANCIAL TOOLKIT · 金融小工具</p><h1>每个问题，<br />都有一张独立计算页。</h1><div className="hero-metrics"><span><b>{toolCatalog.length}</b>个计算器</span><span><b>{categoryCount}</b>类问题</span><span><b>0</b>数据上传</span></div></section>
      <section className="tools-intro"><div><span>ONE TOOL, ONE PAGE</span><h2>目录只负责选择，计算留在详情页</h2></div><p>每个工具都有独立页面，包含变量解释、使用示例、结果读法和局限。输入全部在浏览器本地计算，不上传、不保存。</p></section>
      <section className="tool-directory-grid">
        {toolCatalog.map((tool, index) => <a href={`/tools/${tool.id}/`} key={tool.id}><header><span>{String(index + 1).padStart(2, '0')}</span><small>{tool.category}</small></header><h2>{tool.title}</h2><p>{tool.description}</p><footer><b>打开独立计算页</b><i>→</i></footer></a>)}
      </section>
    </main>
  );
}
