import type { Metadata } from 'next';
import { videos } from '@/lib/library';

export const metadata: Metadata = {
  title: '中英文视频课程 · 财知道',
  description: '精选中文、英文与中文字幕金融公开课，覆盖金融市场、财务分析、估值、投资与经济学。',
};

const languageOrder = ['中文', '双语/中文字幕', '英文'] as const;

export default function VideosPage() {
  return (
    <main>
      <section className="video-sections">
        <header className="catalog-head resource-catalog-head">
          <div><span>书与视频 / 视频</span><h1>视频课程</h1></div>
        </header>
        {languageOrder.map((language) => (
          <section className="video-section" key={language}>
            <header><span>{language === '中文' ? '中文课程' : language === '英文' ? '英文课程' : '双语或带字幕'}</span><h2>{language}</h2></header>
            <div className="video-grid">
              {videos.filter((video) => video.language === language).map((video, index) => (
                <a href={`/videos/${video.id}/`} className="video-card" key={video.id}>
                  <div className="video-screen"><span>{video.platform}</span><i>▶</i><b>{String(index + 1).padStart(2, '0')}</b></div>
                  <div className="video-info"><span>{video.topic} · {video.level}</span><h3>{video.title}</h3>{video.titleEn && <h4>{video.titleEn}</h4>}<p>{video.description}</p><dl><div><dt>平台</dt><dd>{video.platform}</dd></div><div><dt>时长</dt><dd>{video.duration}</dd></div><div><dt>费用</dt><dd>{video.price}</dd></div></dl><b>查看课程详情 →</b></div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}
