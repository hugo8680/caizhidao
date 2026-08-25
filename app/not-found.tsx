export default function NotFoundPage() {
  return (
    <main className="plain-error-page">
      <section>
        <span>404</span>
        <h1>这个页面不在这里</h1>
        <p>链接可能写错了，也可能已经调整。回到首页，或搜索想看的内容。</p>
        <div><a href="/">回到首页</a><a href="/search/">搜索内容</a></div>
      </section>
    </main>
  );
}
