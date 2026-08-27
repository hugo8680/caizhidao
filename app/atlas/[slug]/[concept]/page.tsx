import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { disciplines } from '@/lib/system';

type AtlasConceptPageProps = { params: Promise<{ slug: string; concept: string }> };

export function generateStaticParams() {
  return disciplines.flatMap((discipline) => discipline.topics.flatMap((topic, topicIndex) => topic.concepts.map((_, conceptIndex) => ({
    slug: discipline.slug,
    concept: `${String(topicIndex + 1).padStart(2, '0')}-${String(conceptIndex + 1).padStart(2, '0')}`,
  }))));
}

function getLegacyConcept(slug: string, conceptId: string) {
  const discipline = disciplines.find((item) => item.slug === slug);
  const match = /^(\d{2})-(\d{2})$/.exec(conceptId);
  const topicIndex = match ? Number(match[1]) - 1 : -1;
  const conceptIndex = match ? Number(match[2]) - 1 : -1;
  const topic = discipline?.topics[topicIndex];
  const name = topic?.concepts[conceptIndex];
  return discipline && topic && name ? { discipline, topic, name, topicIndex } : undefined;
}

export async function generateMetadata({ params }: AtlasConceptPageProps): Promise<Metadata> {
  const { slug, concept } = await params;
  const entry = getLegacyConcept(slug, concept);
  if (!entry) return {};
  const destination = `/atlas/${slug}/topic/${String(entry.topicIndex + 1).padStart(2, '0')}/`;
  return {
    title: `${entry.name} · ${entry.topic.title} · 财知道`,
    description: entry.topic.summary,
    alternates: { canonical: destination },
    robots: { index: false, follow: true },
  };
}

export default async function AtlasConceptPage({ params }: AtlasConceptPageProps) {
  const { slug, concept } = await params;
  const entry = getLegacyConcept(slug, concept);
  if (!entry) notFound();
  const destination = `/atlas/${slug}/topic/${String(entry.topicIndex + 1).padStart(2, '0')}/`;

  return (
    <main className="atlas-legacy-redirect">
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace(${JSON.stringify(destination)});` }} />
      <p><a href="/atlas/">财经知识地图</a><span>／</span>{entry.discipline.name}</p>
      <h1>{entry.name}</h1>
      <p>{entry.topic.summary}</p>
      <a href={destination}>{entry.topic.title} →</a>
    </main>
  );
}
