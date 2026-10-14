import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: string;
  className?: string;
};

const NUMERIC = /^([^\d]*)(\d[\d,]*)(.*)$/;

/**
 * 数字滚动计数。仅当值为「前导数字」形式（如 "3 个"、"+70%"）时动画，
 * 否则原样渲染。最终值始终正确（未进入视口 / 关闭动效时直接显示终值）。
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  const match = NUMERIC.exec(value);
  const isNumeric = match !== null;
  const prefix = match ? match[1] : "";
  const suffix = match ? match[3] : "";
  const finalText = match ? match[2] : "";
  const target = match ? Number(match[2].replace(/,/g, "")) : 0;

  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    if (!isNumeric || reduceMotion || !inView) return;
    setCurrent(0);
    const controls = animate(0, target, {
      duration: 0.45,
      ease: "easeOut",
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isNumeric, reduceMotion, inView, target]);

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
