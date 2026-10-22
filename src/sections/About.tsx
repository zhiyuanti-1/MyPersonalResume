import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { Tag } from "../components/Tag";
import { capabilityDimensions, profile, skillGroups } from "../data/resume";

const workPrinciples = [
  "先对齐范围与验收标准，再进入实现。",
  "先小范围验证，再推广到全量。",
  "上线前留好回滚方案与交接文档。",
];

export function About() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <SectionHeading
          index="01"
          title="关于我"
          subtitle="技术、沟通、交付与工作方式：四个维度看一个完整的人。"
        />
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <p className="text-lg leading-relaxed text-ink">{profile.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile.education}，现居{profile.city}。
            </p>
            <div className="mt-8 border-t border-rule pt-6">
              <span className="label text-xs font-medium text-ink">做事原则 / PRINCIPLES</span>
              <ul className="mt-3 space-y-2">
                {workPrinciples.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2.5 h-px w-3 flex-none bg-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {capabilityDimensions.map((dimension, index) => (
              <div key={dimension.title} className="border-t border-rule pt-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="display text-xl leading-snug text-ink">{dimension.title}</h3>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{dimension.summary}</p>
                <ul className="mt-3 space-y-1.5">
                  {dimension.evidence.map((evidence) => (
                    <li key={evidence} className="flex gap-2 text-xs leading-relaxed text-muted">
                      <span className="mt-1.5 h-px w-2 flex-none bg-accent" aria-hidden="true" />
                      <span>{evidence}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {dimension.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-16 border-t border-rule pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className="label text-xs font-medium text-ink">技术栈与工具 / STACK</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted">持续更新</span>
          </div>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="label text-xs font-medium text-ink">{group.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
