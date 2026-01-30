"use client";

import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    let cancelled = false;

    (async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled || !ref.current) return;

      gsap.fromTo(
        ref.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
        },
      );
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return ref;
}
