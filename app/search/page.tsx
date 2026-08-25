import type { Metadata } from 'next';
import { SearchExperience } from '@/components/search-experience';

export const metadata: Metadata = {
  title: '全站知识检索 · 财知道',
  description: '一次检索财经知识节点、学科主题、专题路线、系统课程、工具、历史、图书和中英文视频。',
};

export default function SearchPage() {
  return (
    <main className="search-route">
      <SearchExperience />
    </main>
  );
}
