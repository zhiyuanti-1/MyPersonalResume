import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  variant?: "solid" | "ghost";
  children: ReactNode;
};

export function Button({ href, variant = "solid", children }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-5 py-3 font-mono text-xs tracking-[0.15em] transition-colors duration-200";
  const styles =
    variant === "solid"
      ? "bg-ink text-paper hover:bg-accent"
      : "border border-ink text-ink hover:border-accent hover:text-accent";

  return (
    <a className={`${base} ${styles}`} href={href}>
      {children}
    </a>
  );
}
