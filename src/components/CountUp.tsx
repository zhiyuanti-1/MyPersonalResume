import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: string;
  className?: string;
};

const NUMERIC = /^([^\d]*)(\d[\d,]*)(.*)$/;
const DURATION = 450;
const reduceMotionQuery = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(reduceMotionQuery).matches;
}

const easeOut = (t: number) => 1 - (1 - t) ** 3;

/**
 * 数字滚动计数。仅当值为「前导数字」形式（如 "3 个"、"+70%"）时动画，
 * 否则原样渲染。最终值始终正确（未进入视口 / 关闭动效时直接显示终值）。
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [reduceMotion] = useState(prefersReducedMotion);

  const match = NUMERIC.exec(value);
  const isNumeric = match !== null;
  const prefix = match ? match[1] : "";
  const suffix = match ? match[3] : "";
  const finalText = match ? match[2] : "";
  const target = match ? Number(match[2].replace(/,/g, "")) : 0;

  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    if (!isNumeric || reduceMotion) return;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          setCurrent(Math.round(target * easeOut(progress)));
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            setCurrent(target);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "-40px" },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isNumeric, reduceMotion, target]);

  if (!isNumeric) {
    return <span className={className}>{value}</span>;
  }

  const shown = current === null ? finalText : String(current);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
