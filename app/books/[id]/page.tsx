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

  return (
    <main>
      <section className="book-detail-hero"><p><a href="/books/">财经图书馆</a><span>／</span>{book.language} · {book.level}</p><div className="book-detail-spine"><span>{String(index + 1).padStart(2, '0')}</span><b>{book.topic}</b></div><div><small>{book.originalTitle ?? book.topic}</small><h1>{book.title}</h1><h2>{book.author}</h2><p>{book.intro}</p></div></section>

      <section className="book-detail-layout">
        <article>
          <section><span>内容简介</span><h2>这本书讲什么</h2><p>{book.intro}</p></section>
          <section><span>版本信息</span><h2>书目信息</h2><p>同一本书可能有不同译本、修订版、平装版和电子版。购买时请以 ISBN 为准。</p><dl className="book-detail-meta"><div><dt>作者</dt><dd>{book.author}</dd></div><div><dt>出版社</dt><dd>{book.publisher}</dd></div><div><dt>出版年份</dt><dd>{book.year}</dd></div><div><dt>ISBN</dt><dd>{book.isbn}</dd></div><div><dt>页数</dt><dd>{book.pages}</dd></div><div><dt>参考价格</dt><dd>{book.price}</dd></div><div><dt>语言</dt><dd>{book.language}</dd></div><div><dt>难度</dt><dd>{book.level}</dd></div><div><dt>主题</dt><dd>{book.topic}</dd></div></dl></section>
        </article>
        <aside><span>站外链接</span><h2>版本与购买</h2><p>链接会在新窗口打开。价格与库存以对方页面为准。</p><a href={book.sourceUrl} target="_blank" rel="noreferrer">查看版本资料 ↗</a><a href={book.shopUrl} target="_blank" rel="noreferrer">查看购买渠道 ↗</a></aside>
      </section>

      <nav className="book-pagination" aria-label="图书翻页">{previous ? <a href={`/books/${previous.id}/`}><span>← 上一本</span><b>{previous.title}</b></a> : <a href="/books/"><span>← 返回</span><b>图书馆目录</b></a>}{next ? <a href={`/books/${next.id}/`}><span>下一本 →</span><b>{next.title}</b></a> : <a href="/books/"><span>完成</span><b>返回图书馆目录</b></a>}</nav>
    </main>
  );
}
