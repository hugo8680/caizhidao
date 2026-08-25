'use client';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="zh-CN">
      <body>
        <main className="plain-error-page">
          <section>
            <span>页面出错了</span>
            <h1>这次没有加载成功</h1>
            <p>可以再试一次；如果仍然不行，回到首页重新进入。</p>
            <div><button type="button" onClick={reset}>再试一次</button><a href="/">回到首页</a></div>
          </section>
        </main>
      </body>
    </html>
  );
}
