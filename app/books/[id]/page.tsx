import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { books } from '@/lib/library';

type BookPageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return books.map((book) => ({ id: book.id }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = books.find((item) => item.id === id);
  if (!book) return {};
  return {
    title: `${book.title} · 财知道财经图书馆`,
    description: `${book.intro} ISBN ${book.isbn}，${book.publisher}。`,
    openGraph: { title: book.title, description: book.intro, images: [] },
    twitter: { title: book.title, description: book.intro, images: [] },
  };
}

export default async function BookDetailPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = books.find((item) => item.id === id);
  if (!book) notFound();
  const index = books.findIndex((item) => item.id === book.id);
  const previous = index > 0 ? books[index - 1] : undefined;
  const next = index < books.length - 1 ? books[index + 1] : undefined;
  const audience = book.level === '入门' ? '适合第一次系统接触这一主题、希望先建立直觉与词汇框架的读者。' : book.level === '进阶' ? '适合已经掌握基本术语，希望训练分析框架并校正决策习惯的读者。' : '适合愿意投入较长时间、结合公式、案例或课后练习深入学习的读者。';
  const readingPace = book.level === '专业' ? '建议按章节做笔记并复算关键例题，不必追求一次读完。' : '建议每天阅读一个小节，并用自己的例子复述核心观点。';

  return (
    <main>
      <section className="book-detail-hero"><p><a href="/books/">财经图书馆</a><span>／</span>{book.language} · {book.level}</p><div className="book-detail-spine"><span>{String(index + 1).padStart(2, '0')}</span><b>{book.topic}</b></div><div><small>{book.originalTitle ?? book.topic}</small><h1>{book.title}</h1><h2>{book.author}</h2><p>{book.intro}</p></div></section>

      <section className="book-detail-layout">
        <article>
          <section><span>01 · WHAT IT HELPS WITH</span><h2>这本书解决什么学习问题</h2><p>{book.intro} 阅读时不要只摘录结论，要留意作者如何从事实、假设或案例推到结论，以及这些结论在哪些条件下可能失效。</p></section>
          <section><span>02 · WHO IT IS FOR</span><h2>适合谁读</h2><p>{audience}</p><div className="book-reading-fit"><b>阅读语言</b><p>{book.language === '英文' ? '适合希望熟悉英文财经表达的读者。遇到术语时先根据上下文判断含义，再查词，不必逐句翻译。' : '中文版本适合建立概念框架；涉及译名时可同时记住原书名与关键英文术语。'}</p></div></section>
          <section><span>03 · READING PLAN</span><h2>三遍阅读法</h2><ol><li><b>第一遍：看结构</b><p>先读目录、前言与每章小结，标记作者反复出现的问题，不急着记细节。</p></li><li><b>第二遍：拆论证</b><p>记录“观点—证据—假设—反例”，并把关键概念换成自己的现实例子。</p></li><li><b>第三遍：做输出</b><p>写一页摘要：这本书改变了哪个旧理解，哪些结论仍需验证，下一步准备怎么用。</p></li></ol><p>{readingPace}</p></section>
          <section><span>04 · EDITION CHECK</span><h2>购买前核对版本</h2><p>同一本书可能存在不同译本、修订版、平装与电子版。请用 ISBN 核对具体版本，并以出版或销售页面的当前信息为准。</p><dl className="book-detail-meta"><div><dt>出版社</dt><dd>{book.publisher}</dd></div><div><dt>出版年份</dt><dd>{book.year}</dd></div><div><dt>ISBN</dt><dd>{book.isbn}</dd></div><div><dt>页数</dt><dd>{book.pages}</dd></div><div><dt>参考价格</dt><dd>{book.price}</dd></div><div><dt>主题</dt><dd>{book.topic}</dd></div></dl></section>
        </article>
        <aside><span>EXTERNAL LINKS</span><h2>核对与购买</h2><p>以下按钮会离开财知道，前往版本资料或销售检索页面。</p><a href={book.sourceUrl} target="_blank" rel="noreferrer">查看版本资料 ↗</a><a href={book.shopUrl} target="_blank" rel="noreferrer">查看当前渠道 ↗</a><small>价格与库存可能随时间变化。</small></aside>
      </section>

      <nav className="book-pagination" aria-label="图书翻页">{previous ? <a href={`/books/${previous.id}/`}><span>← 上一本</span><b>{previous.title}</b></a> : <a href="/books/"><span>← 返回</span><b>图书馆目录</b></a>}{next ? <a href={`/books/${next.id}/`}><span>下一本 →</span><b>{next.title}</b></a> : <a href="/books/"><span>完成</span><b>返回图书馆目录</b></a>}</nav>
    </main>
  );
}
