import { Link, useParams } from "react-router-dom";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <span className="font-mono text-xs tracking-[0.35em] text-accent">PROJECT</span>
      <h1 className="display mt-6 text-3xl leading-tight text-ink sm:text-4xl">{slug}</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">项目详情页建设中。</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 border border-ink px-5 py-3 font-mono text-xs tracking-[0.15em] text-ink transition-colors hover:border-accent hover:text-accent"
      >
        ← 返回首页
      </Link>
    </main>
  );
}
