import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { PhotoFrame } from "../components/PhotoFrame";
import { Reveal } from "../components/Reveal";
import { profile } from "../data/resume";

const base = import.meta.env.BASE_URL;
const reduceMotionQuery = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(reduceMotionQuery).matches;
}

/* 首屏文案逐行入场：容器负责节奏，子项各自淡入上移。 */
const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Hero() {
  const contacts = [profile.email, profile.phone, profile.city];
  const photoRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [reduceMotion] = useState(prefersReducedMotion);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const frameNode = parallaxRef.current;
    if (!frameNode) return;

    if (reduceMotion) {
      frameNode.style.transform = "";
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const node = photoRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const progress = rect.height > 0 ? Math.min(Math.max(-rect.top / rect.height, 0), 1) : 0;
      frameNode.style.transform = `translateY(${(-40 * progress).toFixed(2)}px)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduceMotion]);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
      <div className="grid items-center gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
        <motion.div
          variants={heroStagger}
          initial={prefersReduced ? false : "hidden"}
          animate={prefersReduced ? false : "visible"}
        >
          <motion.div variants={heroItem}>
            <span className="font-mono text-xs tracking-[0.35em] text-muted">PORTFOLIO / 2026</span>
          </motion.div>
          <motion.h1
            variants={heroItem}
            className="display mt-6 text-balance text-[clamp(2.75rem,11vw,6rem)] font-semibold leading-[1.05] text-ink"
          >
            {profile.name}
          </motion.h1>
          <motion.p variants={heroItem} className="display mt-2 text-2xl text-ink sm:text-3xl">
            {profile.role}
          </motion.p>
          <motion.p variants={heroItem} className="mt-6 max-w-md text-base leading-relaxed text-muted">
            {profile.tagline}
          </motion.p>
          <motion.div variants={heroItem} className="mt-8">
            <Button href={base + profile.resumeFile} download>
              下载简历 PDF ↓
            </Button>
          </motion.div>
          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs tracking-wide text-muted"
          >
            {contacts.map((value, index) => (
              <span key={value} className="flex items-center gap-x-5">
                {index > 0 ? <span className="h-3 w-px bg-rule" aria-hidden="true" /> : null}
                {value}
              </span>
            ))}
          </motion.div>
        </motion.div>
        <div ref={photoRef} className="flex justify-center md:justify-end">
          <Reveal delay={0.15}>
            <div ref={parallaxRef}>
              <PhotoFrame
                src={profile.photo ? base + profile.photo : ""}
                alt={`${profile.name} 的证件照`}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
