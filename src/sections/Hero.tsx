import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "../components/Button";
import { PhotoFrame } from "../components/PhotoFrame";
import { Reveal } from "../components/Reveal";
import { profile } from "../data/resume";

const base = import.meta.env.BASE_URL;

export function Hero() {
  const contacts = [profile.email, profile.phone, profile.city];
  const photoRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
      <div className="grid items-center gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
        <Reveal>
          <div>
            <span className="font-mono text-xs tracking-[0.35em] text-muted">PORTFOLIO / 2026</span>
            <h1 className="display mt-6 text-balance text-[clamp(2.75rem,11vw,6rem)] font-semibold leading-[1.05] text-ink">
              {profile.name}
            </h1>
            <p className="display mt-2 text-2xl text-ink sm:text-3xl">{profile.role}</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{profile.tagline}</p>
            <div className="mt-8">
              <Button href={base + profile.resumeFile} download>
                下载简历 PDF ↓
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs tracking-wide text-muted">
              {contacts.map((value, index) => (
                <span key={value} className="flex items-center gap-x-5">
                  {index > 0 ? <span className="h-3 w-px bg-rule" aria-hidden="true" /> : null}
                  {value}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <div ref={photoRef} className="flex justify-center md:justify-end">
          <motion.div style={reduceMotion ? undefined : { y: parallaxY }}>
            <PhotoFrame
              src={profile.photo ? base + profile.photo : ""}
              alt={`${profile.name} 的证件照`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
