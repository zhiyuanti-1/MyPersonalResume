import type { ExperienceItem } from "../data/types";

type TimelineItemProps = {
  item: ExperienceItem;
  index: number;
};

export function TimelineItem({ item, index }: TimelineItemProps) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8">
      <div className="flex flex-col items-center">
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-accent" aria-hidden="true" />
        <span className="mt-1 w-px flex-1 bg-rule" aria-hidden="true" />
      </div>
      <div className="pb-12">
        <span className="font-mono text-xs tracking-[0.2em] text-muted">{item.period}</span>
        <h3 className="display mt-2 text-2xl leading-tight text-ink sm:text-3xl">{item.org}</h3>
        <p className="mt-2 text-sm font-medium text-accent">{item.role}</p>
        {item.stack ? (
          <p className="mt-2 font-mono text-xs leading-relaxed text-muted">{item.stack}</p>
        ) : null}
        <ul className="mt-4 space-y-2.5">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-2 h-px w-3 flex-none bg-muted" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
