"use client";

import Navbar from "@/components/ui/navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, BadgeCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type CategoryKey = "trending" | "cxteq" | "marteq" | "hrteq" | "finteq";

const categories: Array<{
  key: CategoryKey;
  title: string;
  tagline: string;
}> = [
  {
    key: "trending",
    title: "Trending Topic",
    tagline: "The stories shaping demand, growth, and go-to-market now.",
  },
  {
    key: "cxteq",
    title: "CXTEQ",
    tagline: "Customer experience tech, journeys, and retention playbooks.",
  },
  {
    key: "marteq",
    title: "MARTEQ",
    tagline: "Marketing tech stacks, attribution, automation, and ops.",
  },
  {
    key: "hrteq",
    title: "HRTEQ",
    tagline: "People ops, hiring intelligence, and workforce technology.",
  },
  {
    key: "finteq",
    title: "FINTEQ",
    tagline: "Fintech innovation, payments, risk, and modern finance.",
  },
];

const featuredPostsSeed: Array<{
  id: string;
  title: string;
  excerpt: string;
  category: CategoryKey;
  readTime: string;
  date: string;
}> = [
  {
    id: "1",
    title: "What ‘Demand Efficiency’ means in 2026",
    excerpt: "A practical framework for getting more pipeline with fewer moving parts.",
    category: "trending",
    readTime: "6 min",
    date: "Jan 2026",
  },
  {
    id: "2",
    title: "CX systems that reduce churn without discounts",
    excerpt: "How to pair product signals + lifecycle messaging to keep customers longer.",
    category: "cxteq",
    readTime: "7 min",
    date: "Jan 2026",
  },
  {
    id: "3",
    title: "MARTEQ stack blueprint for content-led acquisition",
    excerpt: "From tracking to distribution: the minimum viable stack that scales.",
    category: "marteq",
    readTime: "8 min",
    date: "Dec 2025",
  },
  {
    id: "4",
    title: "HRTEQ: hiring velocity without quality loss",
    excerpt: "Scorecards, structured interviews, and tooling that keeps teams aligned.",
    category: "hrteq",
    readTime: "5 min",
    date: "Dec 2025",
  },
  {
    id: "5",
    title: "FINTEQ signals to watch: payments, fraud, and AI risk",
    excerpt: "A clear lens on where fintech is heading and what buyers care about.",
    category: "finteq",
    readTime: "9 min",
    date: "Dec 2025",
  },
  {
    id: "6",
    title: "Trending: the banner formats that convert in B2B media",
    excerpt: "Why certain sizes win — and how to design creative that performs.",
    category: "trending",
    readTime: "6 min",
    date: "Nov 2025",
  },
];

function classNames(...values: Array<string | false | undefined | null>) {
  return values.filter(Boolean).join(" ");
}

function placeholderImageSrc(width: number, height: number, text: string) {
  const label = encodeURIComponent(text);
  return `https://placehold.co/${width}x${height}/e2e8f0/0f172a.png?text=${label}`;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("trending");
  const [showBottomAd, setShowBottomAd] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const featuredPosts = useMemo(() => {
    return featuredPostsSeed.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-item]",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-section]").forEach((el: HTMLElement) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowBottomAd(true);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-orb]", {
        y: -10,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.25,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen font-sans text-slate-900">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-28 text-[17px] sm:px-6 sm:text-[19px] md:px-8">
        <section data-section className="mb-6">
          <div className="rounded-3xl border border-sky-200 bg-white/70 p-4 backdrop-blur-xl shadow-[0_16px_50px_rgba(2,132,199,0.12)]">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <div className="text-xs font-semibold text-slate-600">Recommended placement</div>
                <div className="mt-1 text-sm font-semibold text-slate-950">Top leaderboard</div>
              </div>
              <div className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-900">
                970×90 (desktop) / 320×100 (mobile)
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="hidden h-20 w-full items-center justify-center overflow-hidden rounded-2xl border border-sky-200 bg-white sm:flex">
                <img
                  src={placeholderImageSrc(970, 90, "970×90 Leaderboard")}
                  alt="Leaderboard ad placeholder"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex h-20 w-full items-center justify-center overflow-hidden rounded-2xl border border-sky-200 bg-white sm:hidden">
                <img
                  src={placeholderImageSrc(320, 100, "320×100 Mobile")}
                  alt="Mobile ad placeholder"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <button className="inline-flex h-12 items-center justify-center rounded-2xl bg-sky-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-500">
                Get placement
              </button>
            </div>
          </div>
        </section>

        <section
          ref={heroRef}
          className="relative overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-[0_22px_80px_rgba(2,132,199,0.12)]"
        >
          <div className="absolute inset-0">
            <div
              className="absolute -left-36 -top-36 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl"
              data-orb
            />
            <div
              className="absolute -right-40 top-24 h-[28rem] w-[28rem] rounded-full bg-indigo-500/15 blur-3xl"
              data-orb
            />
            <div
              className="absolute bottom-[-12rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-sky-400/15 blur-3xl"
              data-orb
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(2,132,199,0.08),transparent_60%)]" />
          </div>

          <div className="relative grid gap-10 p-8 md:grid-cols-2 md:gap-12 md:p-12">
            <div className="flex flex-col gap-6">
              <div
                data-hero-item
                className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-900"
              >
                <Sparkles className="h-4 w-4" />
                Premium visibility for tech brands
              </div>

              <h1
                data-hero-item
                className="text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl"
              >
                Turn attention into pipeline.
                <span className="text-sky-700"> Blue‑chip placements for B2B tech.</span>
              </h1>

              <p
                data-hero-item
                className="max-w-xl text-pretty text-base leading-7 text-slate-600 sm:text-xl"
              >
                Reach readers who are actively comparing tools, building stacks, and buying. We combine clean design, category targeting, and premium ad placements.
              </p>

              <div
                data-hero-item
                className="flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href="#categories"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-500"
                >
                  Browse stories
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-5 text-sm font-semibold text-sky-900 transition-colors hover:bg-sky-100"
                >
                  Request rates
                </a>
              </div>

              <div data-hero-item className="grid grid-cols-3 gap-3 sm:max-w-lg">
                <div className="rounded-2xl border border-sky-100 bg-gradient-to-b from-white to-sky-50 p-4">
                  <div className="text-2xl font-semibold text-slate-950">5</div>
                  <div className="mt-1 text-xs font-medium text-slate-600">Blog categories</div>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-gradient-to-b from-white to-sky-50 p-4">
                  <div className="text-2xl font-semibold text-slate-950">6+</div>
                  <div className="mt-1 text-xs font-medium text-slate-600">Ad placements</div>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-gradient-to-b from-white to-sky-50 p-4">
                  <div className="text-2xl font-semibold text-slate-950">High</div>
                  <div className="mt-1 text-xs font-medium text-slate-600">Buyer intent</div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div data-hero-item className="rounded-3xl border border-sky-100 bg-gradient-to-b from-white to-sky-50 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-950">Featured placement</div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700">
                    <BadgeCheck className="h-4 w-4" />
                    Verified inventory
                  </div>
                </div>
                <div className="mt-5 rounded-2xl border border-sky-200 bg-white p-5">
                  <div className="text-xs font-semibold text-slate-600">Billboard preview</div>
                  <div className="mt-3 h-28 w-full overflow-hidden rounded-xl border border-sky-200/70 bg-white">
                    <img
                      src={placeholderImageSrc(970, 250, "970×250 Billboard")}
                      alt="Billboard ad placeholder"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 text-sm text-slate-600">Own the first impression on the homepage.</div>
                </div>
              </div>

              <div data-hero-item className="rounded-3xl border border-sky-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-950">Hero companion</div>
                  <div className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-900">
                    300×250
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl border border-sky-200 bg-white">
                  <img
                    src={placeholderImageSrc(300, 250, "300×250 Companion")}
                    alt="Companion ad placeholder"
                    className="h-[250px] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div data-hero-item className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
                  <div className="text-sm font-semibold text-slate-950">Category targeting</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">Match your banner to the right readers.</div>
                </div>
                <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
                  <div className="text-sm font-semibold text-slate-950">Fast swaps</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">Update creatives quickly as offers change.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-section className="mt-12">
          <div className="rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-50 via-white to-indigo-50 p-8 shadow-[0_20px_70px_rgba(2,132,199,0.12)]">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="text-xs font-semibold text-sky-900">Why brands choose us</div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Clean design, strong attention, measurable outcomes.
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
                  We keep the reading experience fast and premium while still giving advertisers high-visibility placements.
                  Category alignment helps your message show up next to the right buyers.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-sky-200 bg-white p-5">
                  <div className="text-sm font-semibold text-slate-950">High intent</div>
                  <div className="mt-2 text-sm text-slate-600">Ads sit next to buying research.</div>
                </div>
                <div className="rounded-2xl border border-sky-200 bg-white p-5">
                  <div className="text-sm font-semibold text-slate-950">Brand-safe</div>
                  <div className="mt-2 text-sm text-slate-600">Curated categories & clean UI.</div>
                </div>
                <div className="rounded-2xl border border-sky-200 bg-white p-5">
                  <div className="text-sm font-semibold text-slate-950">Fast swaps</div>
                  <div className="mt-2 text-sm text-slate-600">Change creative without delays.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-section className="mt-12">
          <div className="rounded-3xl border border-sky-200 bg-white p-6 shadow-[0_18px_60px_rgba(2,132,199,0.10)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-600">Recommended placement</div>
                <div className="mt-1 text-xl font-semibold text-slate-950">Mid‑page billboard</div>
                <div className="mt-1 text-sm text-slate-600">A wide banner that appears between sections to capture attention.</div>
              </div>
              <div className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-900">
                970×250
              </div>
            </div>
            <div className="mt-4 flex h-28 w-full items-center justify-center overflow-hidden rounded-2xl border border-sky-200 bg-white">
              <img
                src={placeholderImageSrc(970, 250, "970×250 Billboard")}
                alt="Mid-page billboard placeholder"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section id="categories" data-section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Blog Categories</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Trending Topic, CXTEQ, MARTEQ, HRTEQ, FINTEQ.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-5">
            {categories.map((c) => {
              const isActive = c.key === activeCategory;
              return (
                <button
                  key={c.key}
                  onClick={() => setActiveCategory(c.key)}
                  className={classNames(
                    "text-left rounded-3xl border p-5 transition-colors",
                    isActive ? "border-sky-200 bg-sky-50" : "border-slate-200 bg-white hover:border-slate-300",
                  )}
                >
                  <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                    <img
                      src={placeholderImageSrc(600, 360, c.title)}
                      alt={`${c.title} category placeholder`}
                      className="h-28 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-sm font-semibold text-slate-950">{c.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{c.tagline}</div>
                  <div className={classNames("mt-4 text-xs font-semibold", isActive ? "text-sky-800" : "text-slate-600")}>
                    View posts
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section data-section className="mt-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Featured in {categories.find((c) => c.key === activeCategory)?.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Curated posts for the selected category.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex h-11 w-fit items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              View all posts
            </a>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-4 md:grid-cols-2">
              {featuredPosts.map((post, index) => (
                <div key={post.id} className="contents">
                  <a
                    href="#"
                    className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(2,132,199,0.06)] transition-colors hover:border-sky-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-900">
                        {categories.find((c) => c.key === post.category)?.title}
                      </div>
                      <div className="text-xs font-medium text-slate-600">{post.date}</div>
                    </div>
                    <div className="mt-4 text-lg font-semibold leading-7 text-slate-950 group-hover:text-sky-700">
                      {post.title}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">{post.excerpt}</div>
                    <div className="mt-5 flex items-center justify-between text-xs font-medium text-slate-600">
                      <div>{post.readTime} read</div>
                      <div className="inline-flex items-center gap-1 text-sky-700">
                        Read
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </a>

                  {index === 1 ? (
                    <a
                      href="#"
                      className="rounded-3xl border border-sky-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-[0_12px_40px_rgba(2,132,199,0.10)] transition-colors hover:border-sky-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold text-slate-600">Recommended</div>
                        <div className="text-[11px] font-medium text-slate-500">300×250</div>
                      </div>
                      <div className="mt-4 overflow-hidden rounded-2xl border border-sky-200 bg-white">
                        <img
                          src={placeholderImageSrc(300, 250, "300×250 In-feed")}
                          alt="In-feed ad placeholder"
                          className="h-[140px] w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </a>
                  ) : null}
                </div>
              ))}
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <div className="rounded-3xl border border-sky-200 bg-gradient-to-b from-sky-50 to-white p-5 shadow-[0_12px_40px_rgba(2,132,199,0.10)]">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-slate-600">Recommended</div>
                    <div className="text-[11px] font-medium text-slate-500">300×600</div>
                  </div>
                  <div className="mt-3 overflow-hidden rounded-2xl border border-sky-200 bg-white">
                    <img
                      src={placeholderImageSrc(300, 600, "300×600 Sidebar")}
                      alt="Sidebar ad placeholder"
                      className="h-[280px] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-slate-950">Want more visibility?</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">
                    Place your banner next to high-intent tech readers.
                  </div>
                  <button className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white hover:bg-sky-500">
                    Request pricing
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <div
        className={
          "fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 transition-transform duration-500 sm:px-6 md:px-8 " +
          (showBottomAd ? "translate-y-0" : "translate-y-[140%]")
        }
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-sky-200 bg-white shadow-[0_18px_60px_rgba(2,132,199,0.18)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(2,132,199,0.14),transparent_60%)]" />
            <div className="relative grid gap-4 p-5 sm:grid-cols-[1fr_360px] sm:items-center">
              <div>
                <div className="text-xs font-semibold text-slate-600">Recommended</div>
                <div className="mt-1 text-base font-semibold text-slate-950">Boost your visibility today</div>
                <div className="mt-1 text-sm text-slate-600">
                  This bottom banner stays in view—perfect for offers & launches.
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <button className="inline-flex h-11 items-center justify-center rounded-xl bg-sky-600 px-5 text-sm font-semibold text-white hover:bg-sky-500">
                    Get the media kit
                  </button>
                  <button
                    onClick={() => setShowBottomAd(false)}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                  >
                    Dismiss
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-sky-200 bg-white">
                <img
                  src={placeholderImageSrc(728, 90, "728×90 Bottom Banner")}
                  alt="Bottom banner placeholder"
                  className="hidden h-[90px] w-full object-cover sm:block"
                  loading="lazy"
                />
                <img
                  src={placeholderImageSrc(320, 100, "320×100 Bottom Banner")}
                  alt="Bottom banner placeholder mobile"
                  className="h-[90px] w-full object-cover sm:hidden"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
