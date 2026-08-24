export function SiteFooter() {
  return (
    <footer className="platform-footer">
      <div className="footer-brand"><b>财知道</b><small>ECONOMY KNOWLEDGE ATLAS</small><p>把财经世界连接成一张人人都能探索的知识地图。</p></div>
      <div className="footer-link-groups">
        <section><b>建立体系</b><a href="/atlas/">知识地图</a><a href="/topics/">专题路线</a><a href="/timeline/">发展简史</a></section>
        <section><b>深入学习</b><a href="/knowledge/">双语百科</a><a href="/courses/">系统课程</a><a href="/search/">全站检索</a></section>
        <section><b>资源与实践</b><a href="/tools/">金融工具</a><a href="/books/">财经图书</a><a href="/videos/">视频课程</a><a href="/games/">互动游戏</a></section>
      </div>
      <div className="footer-bottom"><span>© 2026 财知道</span><span>知识用于建立判断，不构成投资、税务或法律建议。</span></div>
    </footer>
  );
}
