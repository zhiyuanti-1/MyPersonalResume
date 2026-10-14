import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { TimelineItem } from "../components/TimelineItem";
import { experiences } from "../data/resume";

export function Experience() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <SectionHeading index="02" title="经历" subtitle="从实习到全栈项目，把需求落到可用的产品。" />
        <ol className="mt-4">
          {experiences.map((item, index) => (
            <TimelineItem key={item.org} item={item} index={index} />
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
