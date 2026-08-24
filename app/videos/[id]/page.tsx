import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { videos } from '@/lib/library';

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
  const index = videos.findIndex((item) => item.id === video.id);
  const previous = index > 0 ? videos[index - 1] : undefined;
  const next = index < videos.length - 1 ? videos[index + 1] : undefined;

  return (
    <main>
      <section className="video-detail-hero"><p><a href="/videos/">视频课程专区</a><span>／</span>{video.language} · {video.level}</p><div className="video-detail-screen"><span>COURSE {String(index + 1).padStart(2, '0')}</span><i>▶</i><b>{video.platform}</b></div><div><small>{video.topic}</small><h1>{video.title}</h1>{video.titleEn && <h2>{video.titleEn}</h2>}<p>{video.description}</p></div></section>

      <section className="video-detail-facts"><div><span>平台</span><b>{video.platform}</b></div><div><span>语言</span><b>{video.language}</b></div><div><span>难度</span><b>{video.level}</b></div><div><span>时长</span><b>{video.duration}</b></div><div><span>费用</span><b>{video.price}</b></div></section>

      <section className="video-detail-content">
        <article><span>01 · WHY THIS COURSE</span><h2>为什么把它收进专区</h2><p>{video.description} 这项资源的价值在于提供连续讲解与原始课程材料，适合在已有基本概念后，观察教师如何组织一整套论证。</p></article>
        <article><span>02 · HOW TO STUDY</span><h2>不要只把视频“播放完”</h2><ol><li><b>课前</b><p>先读标题并写下三个想解决的问题，避免被动观看。</p></li><li><b>课中</b><p>每 15—20 分钟暂停一次，只记概念关系、关键假设和不理解之处。</p></li><li><b>课后</b><p>用一页纸复述本节逻辑，再尝试找一个现实案例验证或反驳。</p></li></ol></article>
        <article><span>03 · LANGUAGE NOTE</span><h2>语言与字幕怎么用</h2><p>{video.language === '英文' ? '先听懂论证结构，再查影响理解的关键词。金融英语中同一个普通单词常有专门含义，建议记录完整短语而不是孤立单词。' : video.language === '双语/中文字幕' ? '中文字幕适合建立理解，但遇到关键术语时建议同时记下英文原词，避免不同译名造成混淆。' : '中文讲解更容易进入主题；如果课程引用英文模型或指标，建议把中英文名称一起记录。'}</p></article>
        <aside><span>OFFICIAL COURSE</span><h2>准备好后前往课程</h2><p>下面的按钮会离开财知道，前往学校、平台或明确的课程检索页。开放状态、字幕和费用以目标页面为准。</p><a href={video.url} target="_blank" rel="noreferrer">前往课程页面 ↗</a></aside>
      </section>

      <nav className="video-pagination" aria-label="视频课程翻页">{previous ? <a href={`/videos/${previous.id}/`}><span>← 上一个</span><b>{previous.title}</b></a> : <a href="/videos/"><span>← 返回</span><b>视频课程目录</b></a>}{next ? <a href={`/videos/${next.id}/`}><span>下一个 →</span><b>{next.title}</b></a> : <a href="/videos/"><span>完成</span><b>返回视频课程目录</b></a>}</nav>
    </main>
  );
}
