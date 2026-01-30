"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TrendingTopicsSection } from "@/components/trending-topics-section";
import { RedHatBanner } from "@/components/red-hat-banner";
import { FeaturedStoriesSection } from "@/components/featured-stories-section";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { FloatingBanner } from "@/components/floating-banner";
import { CompactGoogleBanner } from "@/components/compact-google-banner";
import { Footer } from "@/components/footer";

type CategoryKey = "trending" | "cxteq" | "marteq" | "hrteq" | "finteq";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: CategoryKey;
  image: string;
}

const BLOGS: Blog[] = [
  {
    id: "1",
    title: "Demand efficiency: the only GTM metric that matters in 2026",
    excerpt: "Why elite B2B teams are replacing volume obsession with efficiency.",
    category: "trending",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "2",
    title: "Funnels are dead — journeys win",
    excerpt: "Why orchestration replaces funnels in modern GTM motions.",
    category: "cxteq",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "3",
    title: "The MARTEQ stack built for content-led growth",
    excerpt: "A minimal blueprint for marketing systems that scale.",
    category: "marteq",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "4",
    title: "Hiring velocity without quality loss",
    excerpt: "Structured signals for better hiring outcomes.",
    category: "hrteq",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "5",
    title: "Payments, fraud, and AI risk in 2026",
    excerpt: "What fintech buyers actually care about.",
    category: "finteq",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function Home() {
  const featured = BLOGS[0];
  const unoptimized = process.env.NODE_ENV === "development";
  const [isUSMarket, setIsUSMarket] = React.useState(true); // US-based website

  // Dynamic content based on market
  const marketContent = {
    heroTitle: isUSMarket 
      ? "Signal over noise for modern US B2B decision-makers."
      : "Signal over noise for modern B2B decision-makers.",
    heroDescription: isUSMarket
      ? "Strategy, systems, and signals across demand, CX, HR, and fintech — built for US teams shaping the next decade."
      : "Strategy, systems, and signals across demand, CX, HR, and fintech — built for teams shaping the next decade.",
    trendingLabel: isUSMarket ? "US Trending Topics" : "Trending Topics",
    browseCategories: isUSMarket ? "Browse US Categories" : "Browse categories"
  };

  return (
    <>
      <main className="relative overflow-hidden bg-[var(--background)]">
        {/* Floating Banner - US Market */}
        {isUSMarket && <FloatingBanner />}
        
        <div className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[rgba(30,58,138,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute -right-56 top-32 h-[40rem] w-[40rem] rounded-full bg-[rgba(30,58,138,0.06)] blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-[52rem] h-[28rem] w-[28rem] rounded-full bg-[rgba(30,58,138,0.04)] blur-3xl" />

        {/* Hero Section */}
        <section className="relative pt-16 sm:pt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-6 sm:pb-8 mt-10">
            {/* Trending Topics */}
            <div>
             <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 mt-0">

                <span className="h-2 w-2 rounded-full bg-[#1e3a8a] animate-pulse" />
                <span className="text-sm font-semibold text-black">{marketContent.trendingLabel}</span>
              </div>
            </div>

           <div className="grid max-w-7xl items-start gap-6 md:gap-10 md:grid-cols-2 mt-4 sm:mt-5">
             <div className="relative">
                <h1 className="text-balance text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.01] tracking-tight">
                  <span className="text-gradient">Signal over noise</span>
                  <span className="text-black"> for modern B2B decision-makers.</span>
                </h1>

                <p className="mt-3 sm:mt-4 max-w-lg text-sm sm:text-base text-[color:var(--muted-foreground)]">
                  {marketContent.heroDescription}
                </p>

                <div className="mt-3 sm:mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button className="inline-flex h-9 sm:h-10 items-center justify-center gap-2 rounded-2xl bg-[#1e3a8a] px-4 sm:px-6 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#1e40af]">
                    Enter the signal
                    <ArrowUpRight size={16} />
                  </button>
                  <div className="inline-flex h-9 sm:h-10 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 sm:px-6 text-sm font-semibold text-black">
                    {marketContent.browseCategories}
                  </div>
                </div>

                {/* Red Hat Banner */}
                <div className="mt-6 sm:mt-8">
                  <RedHatBanner />
                </div>
                           
              </div>

              <div className="relative">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  width={400}
                  height={300}
                  className="w-full h-auto max-w-[400px] rounded-2xl shadow-2xl"
                  unoptimized={unoptimized}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Cards Section */}
        <section className="relative py-2 overflow-hidden">
          {/* Background decoration - matching hero section */}
          <div className="pointer-events-none absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full bg-[rgba(30,58,138,0.06)] blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[35rem] w-[35rem] rounded-full bg-[rgba(30,58,138,0.05)] blur-3xl" />
          
          <div className="mx-auto max-w-7xl px-4 relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 px-4 py-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
                <span className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider">Explore Categories</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[var(--primary)] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Discover Our Solutions
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-indigo-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* HRTEQ Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-white border border-[color:var(--border)] p-5 transition-all duration-300 hover:shadow-xl hover:border-[#1e3a8a]">
                <div className="mb-3">
                  <div className="h-12 w-12 rounded-xl bg-[#1e3a8a] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">HR</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">HRTEQ</h3>
                <p className="text-sm text-[color:var(--muted-foreground)] mb-3">Human Resources Technology insights and trends</p>
                <a href="/tech/hrteq" className="inline-flex items-center text-[#1e3a8a] font-semibold text-sm hover:text-[#1e40af]">
                  Explore HRTEQ
                  <ArrowUpRight size={16} className="ml-1" />
                </a>
              </div>

              {/* MARTEQ Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-white border border-[color:var(--border)] p-5 transition-all duration-300 hover:shadow-xl hover:border-[#1e3a8a]">
                <div className="mb-3">
                  <div className="h-12 w-12 rounded-xl bg-[#1e3a8a] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">MAR</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">MARTEQ</h3>
                <p className="text-sm text-[color:var(--muted-foreground)] mb-3">Marketing Technology and automation strategies</p>
                <a href="/tech/marteq" className="inline-flex items-center text-[#1e3a8a] font-semibold text-sm hover:text-[#1e40af]">
                  Explore MARTEQ
                  <ArrowUpRight size={16} className="ml-1" />
                </a>
              </div>

              {/* FINTEQ Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-white border border-[color:var(--border)] p-5 transition-all duration-300 hover:shadow-xl hover:border-[#1e3a8a]">
                <div className="mb-3">
                  <div className="h-12 w-12 rounded-xl bg-[#1e3a8a] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">FIN</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">FINTEQ</h3>
                <p className="text-sm text-[color:var(--muted-foreground)] mb-3">Financial Technology innovations and analysis</p>
                <a href="/tech/finteq" className="inline-flex items-center text-[#1e3a8a] font-semibold text-sm hover:text-[#1e40af]">
                  Explore FINTEQ
                  <ArrowUpRight size={16} className="ml-1" />
                </a>
              </div>

              {/* CXTEQ Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-white border border-[color:var(--border)] p-5 transition-all duration-300 hover:shadow-xl hover:border-[#1e3a8a]">
                <div className="mb-3">
                  <div className="h-12 w-12 rounded-xl bg-[#1e3a8a] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">CX</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">CXTEQ</h3>
                <p className="text-sm text-[color:var(--muted-foreground)] mb-3">Customer Experience technology and strategies</p>
                <a href="/tech/cxteq" className="inline-flex items-center text-[#1e3a8a] font-semibold text-sm hover:text-[#1e40af]">
                  Explore CXTEQ
                  <ArrowUpRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Google Banner */}
        <CompactGoogleBanner />

        
        {/* Featured Stories Section */}
        <FeaturedStoriesSection />

        {/* Newsletter Signup Section */}
        <NewsletterSignup />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
