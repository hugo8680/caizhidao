import { GlobalSearch } from './global-search';

const nav = [
  ['知识库', '/knowledge'],
  ['课程', '/courses'],
  ['小工具', '/tools'],
  ['图书', '/books'],
  ['视频', '/videos'],
  ['小游戏', '/games'],
];

export function SiteHeader() {
  return (
    <header className="platform-header">
      <a className="platform-brand" href="/" aria-label="财识首页">
        <span>财</span>
        <b>财识<small>FINANCE ATLAS</small></b>
      </a>
      <nav aria-label="主要导航">
        {nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <GlobalSearch />
    </header>
  );
}
