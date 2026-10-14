import { SectionHeading } from "../components/SectionHeading";
import { profile } from "../data/resume";

export function Contact() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
      <SectionHeading index="04" title="联系我" subtitle="有合适的机会，随时通过下面任一方式找到我。" />
      <p className="display text-[clamp(1.75rem,6vw,3.5rem)] font-semibold leading-tight text-ink">
        期待与你共事。
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10">
        <a
          href={`mailto:${profile.email}`}
          className="display text-xl text-ink transition-colors hover:text-accent sm:text-2xl"
        >
          {profile.email}
        </a>
        <a
          href={`tel:${profile.phone}`}
          className="font-mono text-lg tracking-wide text-ink transition-colors hover:text-accent sm:text-xl"
        >
          {profile.phone}
        </a>
        <span className="font-mono text-xs tracking-wide text-muted">{profile.city}</span>
      </div>
    </section>
  );
}
