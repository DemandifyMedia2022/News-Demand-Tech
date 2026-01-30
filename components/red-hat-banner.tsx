"use client";

import React from "react";
import Image from "next/image";

interface RedHatBannerProps {
  className?: string;
}

export function RedHatBanner({ className = "" }: RedHatBannerProps) {
  return (
    <div
      className={`
        relative w-full max-w-[728px] h-[230px]
        rounded-2xl overflow-hidden
        bg-gradient-to-br from-[#0f2a32] via-[#0b1f2a] to-[#0a1622]
        shadow-[0_25px_60px_rgba(0,0,0,0.45)]
        ${className}
      `}
    >
      {/* subtle teal glow on top */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,179,0.35),transparent_60%)]" />

      {/* top labels */}
      <div className="absolute top-4 left-6 text-[11px] tracking-widest text-white/70 z-20">
        INLINE • 728×90
      </div>
      <div className="absolute top-4 right-6 text-[11px] tracking-widest text-emerald-400 z-20">
        HIGH CTR
      </div>

      {/* CENTER IMAGE — WITH BORDER RADIUS */}
     <div className="absolute inset-0 flex items-center justify-center z-10">
  <div className="relative w-[560px] h-[150px] bg-white rounded-2xl p-[2px] shadow-xl">
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <Image
        src="/img/banner-image.webp"
        alt="Banner Creative"
        fill
        priority
        className="object-contain"
      />
    </div>
  </div>
</div>
      {/* bottom helper text */}
      <div className="absolute bottom-2 left-6 text-[11px] text-white/70 z-20">
        Use this slot for thought-leadership, reports and gated assets.
      </div>
    </div>
  );
}
