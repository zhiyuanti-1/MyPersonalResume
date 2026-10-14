import { useEffect } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/resume";

export function NotFound() {
  useEffect(() => {
    document.title = `页面未找到 · ${profile.name}`;
    return () => {
      document.title = `${profile.name} · ${profile.role}`;
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <span className="font-mono text-xs tracking-[0.35em] text-accent">404</span>
      <h1 className="display mt-6 text-3xl leading-tight text-ink sm:text-4xl">页面走丢了</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        你访问的地址没有对应内容，可能是链接有误，或该页面已经移动。
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 border border-ink px-5 py-3 font-mono text-xs tracking-[0.15em] text-ink transition-colors hover:border-accent hover:text-accent"
      >
        ← 返回首页
      </Link>
    </main>
  );
}
