import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
};

const reduceMotionQuery = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(reduceMotionQuery).matches;
}

/** 进入视口时的克制入场：淡入 + 轻微上移，可通过 prefers-reduced-motion 关闭。 */
export function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduceMotion] = useState(prefersReducedMotion);
  const [visible, setVisible] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion || visible) return;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "-80px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, visible]);

  if (reduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 500ms ease-out ${delay}s, transform 500ms ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
