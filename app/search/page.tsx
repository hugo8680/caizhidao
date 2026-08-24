import type { Metadata } from 'next';
import { SearchExperience } from '@/components/search-experience';
import { searchRecords } from '@/lib/search';

export const metadata: Metadata = {
  title: '全站知识检索 · 财知道',
  description: '一次检索财经知识节点、学科主题、专题路线、系统课程、工具、历史、图书和中英文视频。',
};

export default function SearchPage() {
  return (
    <main>
      <section className="page-hero search-hero"><p>SMART SEARCH · 全站检索</p><h1>全站知识检索</h1><div><b>{searchRecords.length}</b><span>条可检索内容<br />支持中英文与 ISBN</span></div></section>
      <SearchExperience />
    </main>
  );
}
