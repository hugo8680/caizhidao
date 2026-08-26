import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { videos } from '@/lib/library';
import { getVideoGuide } from '@/lib/library-guides';

type VideoPageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return videos.map((video) => ({ id: video.id }));
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { id } = await params;
  const video = videos.find((item) => item.id === id);
  if (!video) return {};
  return {
    title: `${video.title} · 财知道视频课程`,
    description: video.description,
    openGraph: { title: video.titleEn ?? video.title, description: video.description, images: [] },
    twitter: { title: video.titleEn ?? video.title, description: video.description, images: [] },
  };
}

export default async function VideoDetailPage({ params }: VideoPageProps) {
  const { id } = await params;
  const video = videos.find((item) => item.id === id);
  if (!video) notFound();
  const guide = getVideoGuide(video);
  const index = videos.findIndex((item) => item.id === video.id);
  const previous = index > 0 ? videos[index - 1] : undefined;
  const next = index < videos.length - 1 ? videos[index + 1] : undefined;

  return (
    <main>
      <section className="video-detail-hero"><p><a href="/videos/">视频课程专区</a><span>／</span>{video.language} · {video.level}</p><div className="video-detail-screen"><span>{video.topic}</span><i>▶</i><b>{video.platform}</b></div><div><small>{video.topic}</small><h1>{video.title}</h1>{video.titleEn && <h2>{video.titleEn}</h2>}<p>{video.description}</p></div></section>

      <section className="video-detail-facts"><div><span>平台</span><b>{video.platform}</b></div><div><span>语言</span><b>{video.language}</b></div><div><span>难度</span><b>{video.level}</b></div><div><span>时长</span><b>{video.duration}</b></div><div><span>费用</span><b>{video.price}</b></div></section>

      <section className="video-detail-content">
        <article><span>先修要求</span><h2>适合的知识基础</h2><p>{guide.before}</p></article>
        <article><span>课程重点</span><h2>主要内容</h2><ol>{guide.focus.map((point, pointIndex) => <li key={point}><b>{String(pointIndex + 1).padStart(2, '0')}</b><p>{point}</p></li>)}</ol></article>
        <article><span>课后练习</span><h2>学习任务</h2><p>{guide.after}</p><div className="video-course-caution"><b>使用说明</b><p>{guide.caution}</p></div></article>
        <aside><span>课程链接</span><h2>{video.platform}</h2><p>将在新窗口打开。课程状态、字幕和费用以对方页面为准。</p><a href={video.url} target="_blank" rel="noreferrer">打开课程页面 ↗</a></aside>
      </section>

      <nav className="video-pagination" aria-label="视频课程翻页">{previous ? <a href={`/videos/${previous.id}/`}><span>← 上一个</span><b>{previous.title}</b></a> : <a href="/videos/"><span>← 返回</span><b>视频课程目录</b></a>}{next ? <a href={`/videos/${next.id}/`}><span>下一个 →</span><b>{next.title}</b></a> : <a href="/videos/"><span>完成</span><b>返回视频课程目录</b></a>}</nav>
    </main>
  );
}
