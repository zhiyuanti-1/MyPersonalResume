import { Link } from "react-router-dom";
import { Tag } from "./Tag";
import type { ProjectSummary } from "../data/types";

type ProjectCardProps = {
  project: ProjectSummary;
};

const base = import.meta.env.BASE_URL;

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/project/${project.slug}`}
      className="group block transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden border border-rule bg-[#efece4]">
        {project.cover ? (
          <img
            className="h-full w-full object-contain"
            src={base + project.cover}
            alt={project.title}
            loading="lazy"
          />
        ) : (
          <div className="paper-grain absolute inset-0" aria-hidden="true">
            <span className="absolute left-6 top-6 h-14 w-14 rounded-full border border-ink/15" />
            <span className="absolute right-8 top-10 h-20 w-20 rotate-45 border border-accent/40" />
            <span className="absolute bottom-8 left-1/4 h-24 w-px bg-rule" />
            <span className="absolute right-6 bottom-6 h-10 w-10 bg-accent/10" />
            <span className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-[0.3em] text-muted">
              {project.slug.toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-xl leading-snug text-ink sm:text-2xl">{project.title}</h3>
        <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">↗</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.subtitle}</p>
      <span
        className="mt-3 block h-px w-10 bg-rule transition-all duration-300 group-hover:w-20 group-hover:bg-accent"
        aria-hidden="true"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}
