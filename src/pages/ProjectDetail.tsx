import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CountUp } from "../components/CountUp";
import { Reveal } from "../components/Reveal";
import { Rule } from "../components/Rule";
import { SectionHeading } from "../components/SectionHeading";
import { Tag } from "../components/Tag";
import { projectsBySlug } from "../data/projects";
import { profile } from "../data/resume";
import { NotFound } from "./NotFound";

const base = import.meta.env.BASE_URL;

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsBySlug[slug] : undefined;

  useEffect(() => {
    document.title = project ? `${project.title} · ${profile.name}` : `${profile.name} · ${profile.role}`;
    return () => {
      document.title = `${profile.name} · ${profile.role}`;
    };
  }, [project]);

  if (!project) {
    return <NotFound />;
  }

  const architecture = project.architecture ?? [];

  return (
    <main className="mx-auto w-full max-w-5xl overflow-x-hidden px-6 pb-24 pt-20 sm:px-8 sm:pt-28">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 font-mono text-xs tracking-[0.15em] text-ink transition-colors hover:border-accent hover:text-accent"
        >
          ← 返回首页
        </Link>
        <span className="font-mono text-xs tracking-[0.3em] text-accent">PROJECT</span>
      </div>

      <Reveal>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden border border-rule bg-[#efece4]">
          {project.cover ? (
            <img className="h-full w-full object-cover" src={base + project.cover} alt={project.title} />
          ) : (
            <div className="paper-grain absolute inset-0" aria-hidden="true">
              <span className="absolute left-8 top-8 h-16 w-16 rounded-full border border-ink/15" />
              <span className="absolute right-10 top-12 h-24 w-24 rotate-45 border border-accent/40" />
              <span className="absolute bottom-10 left-1/4 h-32 w-px bg-rule" />
              <span className="absolute bottom-8 right-8 h-12 w-12 bg-accent/10" />
              <span className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-[0.3em] text-muted">
                {project.slug.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <header className="mt-10">
          <h1 className="display text-balance text-[clamp(1.75rem,6vw,3.5rem)] font-semibold leading-[1.1] text-ink">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted">{project.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </header>
      </Reveal>

      <Rule />

      <Reveal>
        <p className="display text-balance text-xl leading-relaxed text-ink sm:text-2xl">{project.overview}</p>
      </Reveal>

      <Reveal>
        <section className="mt-16">
          <SectionHeading index="01" title="背景与痛点" />
          <ol className="space-y-4">
            {project.background.map((item, index) => (
              <li key={item} className="flex gap-4">
                <span className="pt-0.5 font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-base leading-relaxed text-muted">{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16">
          <SectionHeading index="02" title="难点与方案" />
          {architecture.length > 0 ? (
            <div className="mb-12">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
                架构示意 / ARCHITECTURE
              </span>
              <div className="mt-5 space-y-5">
                {architecture.map((layer) => (
                  <div
                    key={layer.label}
                    className="grid gap-3 border-t border-rule pt-5 sm:grid-cols-[7rem_1fr] sm:gap-6"
                  >
                    <span className="font-mono text-xs tracking-[0.2em] text-accent">{layer.label}</span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
                        {layer.nodes.map((node, nodeIndex) => (
                          <Fragment key={node}>
                            {nodeIndex > 0 ? (
                              <span className="font-mono text-xs text-accent" aria-hidden="true">
                                →
                              </span>
                            ) : null}
                            <span className="max-w-full break-words border border-ink/20 bg-paper px-3 py-2 font-mono text-xs leading-snug text-ink">
                              {node}
                            </span>
                          </Fragment>
                        ))}
                      </div>
                      {layer.note ? (
                        <p className="mt-2.5 text-xs leading-relaxed text-muted">{layer.note}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="space-y-8">
            {project.challenges.map((challenge, index) => (
              <div key={challenge.title} className="grid gap-3 border-t border-rule pt-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                <span className="font-mono text-xs tracking-[0.2em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-xl leading-snug text-ink sm:text-2xl">{challenge.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{challenge.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16">
          <SectionHeading index="03" title="成果数据" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                {/\d/.test(metric.value) ? (
                  <CountUp
                    value={metric.value}
                    className="block font-mono text-[clamp(1.75rem,6vw,3rem)] font-semibold leading-none tracking-tight text-accent"
                  />
                ) : (
                  <p className="display text-balance text-lg leading-snug text-ink sm:text-xl">{metric.value}</p>
                )}
                <p className="mt-3 font-mono text-xs tracking-wide text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Rule />

      <Link
        to="/"
        className="mt-4 inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-muted transition-colors hover:text-accent"
      >
        ← 返回首页
      </Link>
    </main>
  );
}
