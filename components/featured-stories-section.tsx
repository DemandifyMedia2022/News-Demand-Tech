"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { PremiumBlogCard } from "@/components/premium-blog-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Article {
  _id?: string;
  slug?: string;
  category?: string;
  readTime?: string;
  publishDate?: string;
  title?: string;
  excerpt?: string;
  image?: string;
  author?: string;
}

export function FeaturedStoriesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
            refreshPriority: 1
          }
        });
      }

      // Animate cards with stagger
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length > 0) {
        gsap.set(cards, { y: 100, opacity: 0, scale: 0.9 });

        gsap.to(cards, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current || sectionRef.current,
            start: "top 85%",
            once: true,
            refreshPriority: 1
          }
        });

        // Fallback
        setTimeout(() => {
          gsap.set(cards, { y: 0, opacity: 1, scale: 1 });
        }, 2000);
      }
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [articles]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/cms/query?type=blog&limit=3&offset=0", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const result = Array.isArray(data?.result) ? data.result : [];
        setArticles(result);
      } catch {
        // ignore
      }
    };
    run();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-20 bg-[var(--background)] overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 -top-20 h-[34rem] w-[34rem] rounded-full bg-[rgba(30,58,138,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute -right-56 top-10 h-[40rem] w-[40rem] rounded-full bg-[rgba(30,58,138,0.06)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 px-4 py-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
            <span className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider">Featured Stories</span>
          </div>
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-[var(--foreground)] tracking-tight leading-tight"
          >
            Latest Insights & Trends
          </h2>
          <div className="w-24 h-1.5 bg-[var(--primary)] mx-auto rounded-full mb-8"></div>
          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed">
            Dive deep into the latest trends, innovations, and insights shaping the future of technology and business.
          </p>
        </div>

        {/* Articles Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {articles.map((article, index) => (
            <div
              key={article._id || article.slug || index}
              ref={(el) => { if (el) cardRefs.current[index] = el; }}
              className="h-full"
            >
              <PremiumBlogCard
                category={article.category || "Tech"}
                image={article.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"}
                readingTime={article.readTime || "5 MIN READ"}
                publishDate={article.publishDate || "LATEST"}
                title={article.title || "Untitled Article"}
                excerpt={article.excerpt || ""}
                authorName={article.author || "Tech Editor"}
                authorInitial={(article.author || "T").charAt(0).toUpperCase()}
                href={`/blog/${article.slug || article._id}`}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => window.location.href = '/tech'}
            variant="outline"
            className="rounded-2xl h-14 px-10 border-slate-200 bg-white text-sm font-black tracking-widest uppercase hover:bg-slate-50 active:scale-95 transition-all shadow-lg"
          >
            View All Stories <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
