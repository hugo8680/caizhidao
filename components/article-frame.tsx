import type { ReactNode } from 'react';

export type ArticleSectionLink = {
  id: string;
  label: string;
};

type ArticleFrameProps = {
  sectionLabel: string;
  sectionHref: string;
  breadcrumb?: ReactNode;
  title: string;
  english?: string;
  meta?: ReactNode;
  contents: ArticleSectionLink[];
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function ArticleFrame({
  sectionLabel,
  sectionHref,
  breadcrumb,
  title,
  english,
  meta,
  contents,
  aside,
  children,
  className = '',
}: ArticleFrameProps) {
  return (
    <main className={`reference-article-page${className ? ` ${className}` : ''}`}>
      <div className="reference-article-grid">
        <aside className="reference-article-rail" aria-label="文章目录">
          <a className="reference-article-section" href={sectionHref}>{sectionLabel}</a>
          <ol>
            {contents.map((item, index) => (
              <li key={item.id}>
                <span>{String(index + 1).padStart(2, '0')}</span><b>{item.label}</b>
              </li>
            ))}
          </ol>
        </aside>

        <article className="reference-article">
          <header className="reference-article-header">
            {breadcrumb && <p className="reference-breadcrumb">{breadcrumb}</p>}
            <h1>{title}</h1>
            {english && <p className="reference-article-english" lang="en">{english}</p>}
            {meta && <div className="reference-article-meta">{meta}</div>}
          </header>
          <div className="reference-article-body">{children}</div>
        </article>

        {aside && <aside className="reference-article-aside">{aside}</aside>}
      </div>
    </main>
  );
}
