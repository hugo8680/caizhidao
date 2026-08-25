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
      <header className="catalog-head standalone-catalog-head"><div><span>练习工具 / 计算</span><h1>金融小工具</h1></div><dl><div><dt>计算器</dt><dd>{toolCatalog.length} 个</dd></div><div><dt>分类</dt><dd>{categoryCount} 类</dd></div><div><dt>运行</dt><dd>本地计算</dd></div></dl></header>
      <section className="tool-directory-grid">
        {toolCatalog.map((tool, index) => <a href={`/tools/${tool.id}/`} key={tool.id}><header><span>{String(index + 1).padStart(2, '0')}</span><small>{tool.category}</small></header><h2>{tool.title}</h2><p>{tool.description}</p><footer><b>开始计算</b><i>→</i></footer></a>)}
      </section>
    </main>
  );
}
