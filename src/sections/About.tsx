import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { Tag } from "../components/Tag";
import { profile, skillGroups } from "../data/resume";

export function About() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <SectionHeading index="01" title="关于我" subtitle="一句话介绍，加上日常使用的技术栈。" />
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <p className="text-lg leading-relaxed text-ink">{profile.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              以 {profile.role} 为目标，{profile.education}，现居{profile.city}。
            </p>
          </div>
          <div className="space-y-8">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{group.title}</h3>
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
