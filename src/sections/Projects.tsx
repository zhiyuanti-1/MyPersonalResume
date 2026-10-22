import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { projectSummaries } from "../data/projects";

export function Projects() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <SectionHeading index="03" title="精选项目" subtitle="点击卡片查看每个项目的背景、难点、业务场景与落地标准。" />
        <div className="grid gap-8 md:grid-cols-2">
          {projectSummaries.map((project, index) => (
            <div key={project.slug} className={index === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
