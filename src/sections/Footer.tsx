import { Reveal } from "../components/Reveal";
import { profile } from "../data/resume";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl border-t border-rule px-6 py-8 sm:px-8">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-xs tracking-wide text-muted">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>Built with React &amp; Vite</span>
        </div>
      </Reveal>
    </footer>
  );
}
