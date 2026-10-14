import { useState } from "react";

type PhotoFrameProps = {
  src: string;
  alt: string;
};

export function PhotoFrame({ src, alt }: PhotoFrameProps) {
  const [failed, setFailed] = useState(false);
  const showImage = src !== "" && !failed;

  return (
    <div className="relative w-full max-w-xs">
      <div className="absolute -bottom-3 -right-3 h-16 w-16 bg-accent" aria-hidden="true" />
      <div className="relative aspect-[3/4] w-full -translate-y-2 translate-x-2 overflow-hidden border border-ink bg-[#efece4]">
        {showImage ? (
          <img
            className="h-full w-full object-cover object-top"
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs tracking-[0.25em] text-muted">PHOTO</span>
          </div>
        )}
      </div>
    </div>
  );
}
