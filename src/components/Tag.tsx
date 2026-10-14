import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-block border border-rule px-2.5 py-1 font-mono text-xs tracking-wide text-muted transition-colors hover:border-accent hover:text-accent">
      {children}
    </span>
  );
}
