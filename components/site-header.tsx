import { GlobalSearch } from './global-search';

const nav = [
  ['知识地图', '/atlas/'],
  ['科普百科', '/knowledge/'],
  ['专题路线', '/topics/'],
  ['系统课程', '/courses/'],
  ['金融工具', '/tools/'],
  ['发展简史', '/timeline/'],
];

export function SiteHeader() {
  return (
    <header className="platform-header">
      <a className="platform-brand" href="/" aria-label="财知道首页">
        <span>知</span>
        <b>财知道<small>ECONOMY KNOWLEDGE ATLAS</small></b>
      </a>
      <nav aria-label="主要导航">
        {nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <GlobalSearch />
    </header>
  );
}
