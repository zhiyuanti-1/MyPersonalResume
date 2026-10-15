import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="label inline-block border border-rule px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent">
      {children}
    </span>
  );
}
