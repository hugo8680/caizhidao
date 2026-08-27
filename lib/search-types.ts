export type SearchKind = '知识' | '概念索引' | '学科' | '专题' | '课程' | '图书' | '视频' | '工具' | '历史';

export type SearchRecord = {
  id: string;
  kind: SearchKind;
  title: string;
  english: string;
  description: string;
  keywords: string;
  href: string;
  priority: number;
};
