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
  const index = toolCatalog.findIndex((item) => item.id === tool.id);
  const previous = index > 0 ? toolCatalog[index - 1] : undefined;
  const next = index < toolCatalog.length - 1 ? toolCatalog[index + 1] : undefined;

  return (
    <main>
      <section className="tool-detail-hero"><p><a href="/tools/">金融工具目录</a><span>／</span>{tool.category}</p><small>TOOL {String(index + 1).padStart(2, '0')}</small><h1>{tool.title}</h1><h2>{guide.question}</h2><p>{guide.explanation}</p></section>

      <section className="tool-detail-calculator"><FinanceTools toolId={tool.id} /></section>

      <section className="tool-detail-guide">
        <article><span>01 · INPUTS</span><h2>每个输入代表什么</h2><dl>{guide.inputs.map((input) => <div key={input.name}><dt>{input.name}</dt><dd>{input.meaning}</dd></div>)}</dl></article>
        <article><span>02 · HOW TO READ</span><h2>怎样读结果</h2><p>{guide.reading}</p><div className="tool-guide-example"><b>建议练习</b><p>{guide.example}</p></div></article>
        <article><span>03 · LIMITS</span><h2>计算没有包含什么</h2><ul>{guide.limits.map((limit) => <li key={limit}>{limit}</li>)}</ul><p>结果用于理解变量关系，不是报价、收益承诺或个别建议。真实决策应核对合同、费用、税务和风险。</p></article>
      </section>

      <nav className="tool-pagination" aria-label="金融工具翻页">
        {previous ? <a href={`/tools/${previous.id}/`}><span>← 上一个工具</span><b>{previous.title}</b></a> : <a href="/tools/"><span>← 返回</span><b>工具目录</b></a>}
        {next ? <a href={`/tools/${next.id}/`}><span>下一个工具 →</span><b>{next.title}</b></a> : <a href="/tools/"><span>返回</span><b>全部工具</b></a>}
      </nav>
    </main>
  );
}
