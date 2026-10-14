type SectionHeadingProps = {
  index: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ index, title, subtitle }: SectionHeadingProps) {
  return (
    <header className="mb-10">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.25em] text-accent">{index}</span>
        <span className="h-px flex-1 bg-rule" aria-hidden="true" />
      </div>
      <h2 className="display mt-4 text-balance text-[clamp(1.75rem,5vw,2.5rem)] leading-tight text-ink">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{subtitle}</p> : null}
    </header>
  );
}
