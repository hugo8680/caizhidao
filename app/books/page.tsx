import type { Metadata } from 'next';
import { books } from '@/lib/library';

export const metadata: Metadata = {
  title: '财经图书馆 · 财知道',
  description: '精选中文与英文财经书籍，汇总书名、作者、ISBN、出版社、页数、版本、参考价格和资料链接。',
};

export default function BooksPage() {
  return (
    <main>
      <section className="page-hero library-hero"><p>FINANCE LIBRARY · 财经图书馆</p><h1>从一本好书开始，<br />把碎片知识连成体系。</h1><div className="hero-metrics"><span><b>{books.length}</b>本精选</span><span><b>{books.filter((book) => book.language === '中文').length}</b>本中文</span><span><b>{books.filter((book) => book.language === '英文').length}</b>本英文</span></div></section>
      <section className="library-note"><div><span>EDITION MATTERS</span><h2>先核对版本，再决定购买</h2></div><p>下列 ISBN、页数与价格按列出的具体版本汇总。价格仅为参考，会随渠道和时间变化；点击“版本资料”可交叉核验，点击“购书检索”可查看当前渠道信息。</p></section>
      <section className="book-shelves">
        {(['中文', '英文'] as const).map((language) => (
          <section className="book-shelf" key={language}>
            <header><span>{language === '中文' ? 'CHINESE EDITIONS' : 'ENGLISH EDITIONS'}</span><h2>{language}精选</h2><small>{books.filter((book) => book.language === language).length} 本</small></header>
            <div className="book-grid">
              {books.filter((book) => book.language === language).map((book, index) => (
                <article className="book-card" key={book.id}>
                  <div className="book-spine"><span>{String(index + 1).padStart(2, '0')}</span><b>{book.topic}</b><i>{book.level}</i></div>
                  <div className="book-info">
                    <span>{book.language} · {book.level}</span><a className="book-title-link" href={`/books/${book.id}/`}><h3>{book.title}</h3>{book.originalTitle && <h4>{book.originalTitle}</h4>}</a><p>{book.intro}</p>
                    <dl><div><dt>作者</dt><dd>{book.author}</dd></div><div><dt>出版社</dt><dd>{book.publisher}</dd></div><div><dt>年份</dt><dd>{book.year}</dd></div><div><dt>ISBN</dt><dd>{book.isbn}</dd></div><div><dt>页数</dt><dd>{book.pages}</dd></div><div><dt>参考价</dt><dd>{book.price}</dd></div></dl>
                    <footer><a href={`/books/${book.id}/`}>阅读选书指南 →</a><a href={book.sourceUrl} target="_blank" rel="noreferrer">版本资料 ↗</a></footer>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}
