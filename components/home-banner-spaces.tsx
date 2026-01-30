"use client";

import React from "react";
import Image from "next/image";

type BannerVariant = "default" | "finteq" | "marteq" | "cxteq" | "hrteq";

interface HomeBannerSpacesProps {
  variant?: BannerVariant;
}

const VARIANT_CONFIG: Record<BannerVariant, {
  badgeText: string;
  title: string;
  subtitle: string;
  badgeToneClass: string;
  accentPillText: string;
  backgroundGradient: string;
  primaryBorder: string;
}> = {
  default: {
    badgeText: "Featured spaces",
    title: "Premium banner inventory for your stories",
    subtitle:
      "Showcase launches, events and campaigns in high-impact slots designed for modern B2B brands.",
    badgeToneClass:
      "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
    accentPillText: "Fast-loading · Non-intrusive · Brand-safe",
    backgroundGradient:
      "from-emerald-500/20 via-emerald-500/5 to-transparent",
    primaryBorder: "border-emerald-400/25",
  },
  finteq: {
    badgeText: "Banking & Fintech placements",
    title: "Own the premium slots across FinTeq stories",
    subtitle:
      "Highlight core banking stacks, payments, and wealth products in hero and sidebar placements.",
    badgeToneClass:
      "border-sky-400/50 bg-sky-500/15 text-sky-100",
    accentPillText: "Finance-grade · High-intent · Board-ready",
    backgroundGradient:
      "from-sky-500/25 via-emerald-400/10 to-transparent",
    primaryBorder: "border-sky-400/30",
  },
  marteq: {
    badgeText: "Campaign & launch takeovers",
    title: "Give your Mar-Tech stories the hero treatment",
    subtitle:
      "Perfect for multi-channel launches, playbooks, and analytics deep dives that drive pipeline.",
    badgeToneClass:
      "border-fuchsia-400/50 bg-fuchsia-500/15 text-fuchsia-100",
    accentPillText: "Launch-ready · Story-first · Conversion-aware",
    backgroundGradient:
      "from-fuchsia-500/25 via-rose-500/10 to-transparent",
    primaryBorder: "border-fuchsia-400/40",
  },
  hrteq: {
    badgeText: "HR & people ops placements",
    title: "Position your HR and people platforms where leaders look first",
    subtitle:
      "Spotlight recruitment, payroll, HRMS and HCM stories in high-intent HRTeq inventory.",
    badgeToneClass:
      "border-amber-400/60 bg-amber-500/15 text-amber-100",
    accentPillText: "People-first · Compliance-ready · Team-scale",
    backgroundGradient:
      "from-amber-400/25 via-emerald-400/10 to-transparent",
    primaryBorder: "border-amber-400/40",
  },
  cxteq: {
    badgeText: "CX & support placements",
    title: "Showcase what modern CX teams ship next",
    subtitle:
      "Position AI copilots, automation and customer journey platforms in premium CX inventory.",
    badgeToneClass:
      "border-emerald-400/50 bg-emerald-500/15 text-emerald-100",
    accentPillText: "Signal-rich · Always-on · CX-first",
    backgroundGradient:
      "from-emerald-500/25 via-cyan-400/10 to-transparent",
    primaryBorder: "border-emerald-400/35",
  },
};

export function HomeBannerSpaces({ variant = "default" }: HomeBannerSpacesProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 md:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div
          className={
            "absolute inset-x-0 top-0 h-40 bg-gradient-to-b " +
            config.backgroundGradient
          }
        />
        <div className="absolute -left-24 top-10 h-40 w-40 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.85)_0,_transparent_55%)]" />
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p
            className={
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] " +
              config.badgeToneClass
            }
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{config.badgeText}</span>
          </p>
          <h2
            className="mt-3 text-xl font-semibold text-slate-50 sm:text-2xl"
            style={{ fontFamily: "'InterDisplay', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}
          >
            {config.title}
          </h2>
          <p
            className="mt-2 max-w-2xl text-xs text-slate-100/80 sm:text-sm"
            style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}
          >
            {config.subtitle}
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 rounded-full border border-emerald-500/40 bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-emerald-400/20 px-3 py-1 text-[11px] font-medium text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.25)] sm:inline-flex">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
          <span>{config.accentPillText}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div
          className={
            "group relative col-span-1 overflow-hidden rounded-2xl border bg-gradient-to-br from-emerald-500/25 via-emerald-500/10 to-slate-950/90 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_80px_rgba(0,0,0,0.95)] md:col-span-2 " +
            config.primaryBorder
          }
        >
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-emerald-100/90">
            <span>Hero banner · 1200x400</span>
            <span className="rounded-full border border-emerald-300/40 bg-black/40 px-2 py-0.5 text-[9px] font-semibold text-emerald-100/90">
              Prime slot
            </span>
          </div>
          <a href="#" target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative overflow-hidden rounded-xl border border-emerald-200/40 bg-black/40">
              <div className="relative aspect-[3/1] w-full">
                <Image
                  src="/img/banner-image.webp"
                  alt="Hero banner ad slot"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/40" />
              </div>
            </div>
          </a>
          <div className="mt-2 flex items-center justify-between text-[11px] text-emerald-50/85">
            <span>Perfect for flagship campaigns, annual events and major launches.</span>
          </div>
          <div className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-emerald-400/25 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />
          <div className="pointer-events-none absolute -bottom-20 right-6 h-44 w-44 rounded-full border border-emerald-400/40" />
          <div className="pointer-events-none absolute inset-0 opacity-35 mix-blend-screen group-hover:opacity-55">
            <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,_rgba(209,250,229,0.4)_0,_transparent_60%)]" />
          </div>
        </div>

        <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-700/70 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.55)_0,_rgba(15,23,42,0.95)_52%,_rgba(15,23,42,1)_100%)] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/60 hover:shadow-[0_28px_70px_rgba(0,0,0,0.95)]">
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-200/90">
            <span>Sidebar · 300x600</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-200">
              High viewability
            </span>
          </div>
          <a href="#" target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative overflow-hidden rounded-md border border-slate-500/60 bg-black/40">
              <div className="relative aspect-[3/6] w-full">
                <Image
                  src="/img/banner-image.webp"
                  alt="Sidebar banner ad slot"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />
              </div>
            </div>
          </a>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-200/85">
            <span>Ideal for always-on messaging and brand recall.</span>
          </div>
        </div>

        <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-700/70 bg-[radial-gradient(circle_at_top,_rgba(6,148,162,0.6)_0,_rgba(15,23,42,1)_55%)] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/60 hover:shadow-[0_28px_70px_rgba(0,0,0,0.95)]">
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-200/90">
            <span>Inline · 728x90</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-200">
              High CTR
            </span>
          </div>
          <a href="#" target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative overflow-hidden rounded-xl border border-slate-500/60 bg-black/40">
              <div className="relative aspect-[6/2] w-full">
                <Image
                  src="/img/banner-image.webp"
                  alt="Inline banner ad slot"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/55" />
              </div>
            </div>
          </a>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-200/85">
            <span>Use this slot for thought-leadership, reports and gated assets.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
