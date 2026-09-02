import type { Metadata } from 'next';
import { ActionArrow } from '@/components/action-arrow';
import { books } from '@/lib/library';

export const metadata: Metadata = {
  title: '财经图书馆 · 财知道',
  description: '精选中文与英文财经书籍，汇总书名、作者、ISBN、出版社、页数、版本、参考价格和资料链接。',
};

export default function BooksPage() {
  return (
    <main>
      <section className="book-shelves">
        <header className="catalog-head resource-catalog-head">
          <div><span>图书资料</span><h1>财经图书</h1></div>
        </header>
        {(['中文', '英文'] as const).map((language) => (
          <section className="book-shelf" key={language}>
            <header><span>{language === '中文' ? '中文书' : '英文原版'}</span><h2>{language}精选</h2></header>
            <div className="book-grid">
              {books.filter((book) => book.language === language).map((book, index) => (
                <article className="book-card" key={book.id}>
                  <div className="book-spine"><span>{String(index + 1).padStart(2, '0')}</span><b>{book.topic}</b><i>{book.level}</i></div>
                  <div className="book-info">
                    <span>{book.language} · {book.level}</span><a className="book-title-link" href={`/books/${book.id}/`}><h3>{book.title}</h3>{book.originalTitle && <h4>{book.originalTitle}</h4>}</a><p>{book.intro}</p>
                    <dl><div><dt>作者</dt><dd>{book.author}</dd></div><div><dt>出版社</dt><dd>{book.publisher}</dd></div><div><dt>年份</dt><dd>{book.year}</dd></div><div><dt>ISBN</dt><dd>{book.isbn}</dd></div><div><dt>页数</dt><dd>{book.pages}</dd></div><div><dt>参考价</dt><dd>{book.price}</dd></div></dl>
                    <footer><a href={`/books/${book.id}/`}>查看图书详情 <ActionArrow /></a><a href={book.sourceUrl} target="_blank" rel="noreferrer">版本资料 <ActionArrow direction="external" /></a></footer>
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
