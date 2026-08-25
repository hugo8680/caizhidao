import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CoursePlayer } from '@/components/course-player';
import { courses, getCourse } from '@/lib/courses';

type CoursePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = getCourse((await params).slug);
  if (!course) return {};
  return {
    title: `${course.title} · 财知道课程`, description: course.description,
    openGraph: { title: `${course.title} · ${course.en}`, description: course.description, images: [] },
    twitter: { title: `${course.title} · ${course.en}`, description: course.description, images: [] },
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const course = getCourse((await params).slug);
  if (!course) notFound();
  return (
    <main>
      <section className={`course-detail-hero accent-${course.accent}`}>
        <p><a href="/courses/">系统课程</a><span>／</span>{course.level}</p>
        <div><span>{course.category}</span><h1>{course.title}</h1><h2>{course.en}</h2><p>{course.description}</p></div>
        <aside><b>{course.lessons.length}</b><span>节课<br />{course.duration}</span></aside>
      </section>
      <CoursePlayer course={course} />
    </main>
  );
}
