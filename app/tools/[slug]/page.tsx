import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FinanceTools } from '@/components/finance-tools';
import { toolGuides } from '@/lib/guides';
import { toolCatalog } from '@/lib/library';

type ToolPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return toolCatalog.map((tool) => ({ slug: tool.id }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolCatalog.find((item) => item.id === slug);
  if (!tool) return {};
  return {
    title: `${tool.title} · 财知道金融工具`,
    description: `${tool.description} 包含变量说明、使用示例、结果读法与局限。`,
    openGraph: { title: tool.title, description: tool.description, images: [] },
    twitter: { title: tool.title, description: tool.description, images: [] },
  };
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const slug = (await params).slug;
  const tool = toolCatalog.find((item) => item.id === slug);
  const guide = toolGuides[slug];
  if (!tool || !guide) notFound();

  return (
    <main>
      <section className="tool-detail-calculator"><FinanceTools toolId={tool.id} /></section>

      <section className="tool-detail-guide">
        <article><span>输入项</span><h2>每个数字代表什么</h2><dl>{guide.inputs.map((input) => <div key={input.name}><dt>{input.name}</dt><dd>{input.meaning}</dd></div>)}</dl></article>
        <article><span>计算结果</span><h2>怎么看这个数字</h2><p>{guide.reading}</p><div className="tool-guide-example"><b>可以这样试</b><p>{guide.example}</p></div></article>
        <article><span>适用范围</span><h2>计算中未包含的因素</h2><ul>{guide.limits.map((limit) => <li key={limit}>{limit}</li>)}</ul><p>计算结果用于方案比较，不是报价或收益承诺；实际交易还会受到合同条款、费用、税收和风险条件影响。</p></article>
      </section>
    </main>
  );
}
