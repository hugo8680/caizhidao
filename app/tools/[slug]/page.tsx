import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FinanceTools } from '@/components/finance-tools';
import { toolGuides } from '@/lib/guides';
import { toolCatalog } from '@/lib/library';
import { toolMethods } from '@/lib/tool-methods';

type ToolPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return toolCatalog.map((tool) => ({ slug: tool.id }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolCatalog.find((item) => item.id === slug);
  if (!tool) return {};
  return {
    title: `${tool.title} · 财知道金融小工具`,
    description: `${tool.description} 包含变量说明、使用示例、结果读法与局限。`,
    openGraph: { title: tool.title, description: tool.description, images: [] },
    twitter: { title: tool.title, description: tool.description, images: [] },
  };
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const slug = (await params).slug;
  const tool = toolCatalog.find((item) => item.id === slug);
  const guide = toolGuides[slug];
  const method = toolMethods[slug];
  if (!tool || !guide || !method) notFound();

  return (
    <main>
      <section className="tool-detail-calculator"><FinanceTools toolId={tool.id} /></section>

      <section className="tool-detail-guide">
        <article><span>输入项</span><h2>每个数字代表什么</h2><dl>{guide.inputs.map((input) => <div key={input.name}><dt>{input.name}</dt><dd>{input.meaning}</dd></div>)}</dl></article>
        <article><span>计算结果</span><h2>怎么看这个数字</h2><p>{guide.reading}</p><div className="tool-guide-example"><b>可以这样试</b><p>{guide.example}</p></div></article>
        <article><span>适用范围</span><h2>计算中未包含的因素</h2><ul>{guide.limits.map((limit) => <li key={limit}>{limit}</li>)}</ul><p>计算结果用于方案比较，不是报价或收益承诺；实际交易还会受到合同条款、费用、税收和风险条件影响。</p></article>
      </section>

      <article className="knowledge-essay">
        <section>
          <h2>计算依据</h2>
          <div className="knowledge-essay-formula">
            <strong>{method.formula}</strong>
            <p>{method.explanation}</p>
          </div>
        </section>

        <section>
          <h2>公式成立需要哪些条件</h2>
          <ul className="knowledge-essay-checklist">{method.conditions.map((condition) => <li key={condition}>{condition}</li>)}</ul>
        </section>

        <section className="knowledge-essay-sources">
          <h2>方法与资料来源</h2>
          <p>公式采用标准金融数学关系；产品合同、税费和市场规则发生变化时，应以合同、监管文件和最新资料为准。</p>
          <ol>{method.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span><p>{source.note}</p></li>)}</ol>
        </section>

        <nav className="knowledge-essay-related" aria-label="相关知识">
          <h2>先理解，再计算</h2>
          <div>{method.related.map((item) => <a href={item.href} key={item.href}><b>{item.title}</b><p>{item.note}</p></a>)}</div>
        </nav>
      </article>
    </main>
  );
}
