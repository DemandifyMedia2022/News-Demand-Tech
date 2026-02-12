"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface MostViewedBlog {
  _id?: string;
  slug?: string;
  category?: string;
  title?: string;
  excerpt?: string;
  image?: string;
  author?: string;
}

export function MostViewedBlogsSection() {
  const [blogs, setBlogs] = useState<MostViewedBlog[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left column
      if (leftColumnRef.current) {
        gsap.from(leftColumnRef.current, {
          x: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true
          }
        });
      }

      // Animate right column
      if (rightColumnRef.current) {
        gsap.from(rightColumnRef.current, {
          x: 50,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true
          }
        });

        rightColumnRef.current.addEventListener('mouseenter', () => {
          gsap.to(rightColumnRef.current, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        rightColumnRef.current.addEventListener('mouseleave', () => {
          gsap.to(rightColumnRef.current, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }

      // Animate cards
      if (cardRefs.current.length > 0) {
        cardRefs.current.forEach((card, index) => {
          if (card) {
            gsap.from(card, {
              y: 30,
              opacity: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true
              }
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/cms/query?type=blog&limit=3&offset=0", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const result = Array.isArray(data?.result) ? data.result : [];
        setBlogs(result);
      } catch {
        // ignore
      }
    };
    run();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-6 sm:py-8 bg-[var(--background)] overflow-hidden">
      {/* Modern background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#1e3a8a]/15 to-[#1e40af]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-[#1e40af]/10 to-[#1e3a8a]/10 rounded-full blur-2xl" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 px-4 py-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
            <span className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider">Most Viewed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[var(--foreground)]">
            Trending Now
          </h2>
          <div className="w-24 h-1 bg-[var(--primary)] mx-auto rounded-full"></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Two Stacked Blogs */}
          <div ref={leftColumnRef} className="lg:col-span-2 space-y-3 sm:space-y-4">
            {blogs.slice(0, 2).map((blog, index) => (
              <div
                key={blog._id || blog.slug || index}
                ref={(el) => { if (el) cardRefs.current[index] = el; }}
                className="group relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
              >
                {/* Modern overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/3 via-transparent to-[#1e40af]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative h-48 md:h-auto md:w-1/3 overflow-hidden">
                    <Image
                      src={blog.image || ""}
                      alt={blog.title || ""}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-[#1e3a8a] border border-white/30">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6 relative z-10 flex-1">
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-black mb-3 line-clamp-2 group-hover:text-[#1e3a8a] transition-colors duration-300">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    {/* Author and Read More */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {(blog.author || "").split(' ').filter(Boolean).map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-xs text-gray-600">{blog.author}</span>
                      </div>
                      
                      <Link 
                        href={`/blog/${blog.slug || blog._id}`}
                        className="inline-flex items-center text-[#1e3a8a] font-semibold text-xs hover:text-[#1e40af] transition-all duration-300 group"
                      >
                        Read more
                        <ArrowUpRight 
                          size={14} 
                          className="ml-1 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Featured Blog */}
          <div ref={rightColumnRef} className="lg:col-span-1">
            {blogs[2] && (
              <div className="group relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer h-full">
                {/* Modern overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/3 via-transparent to-[#1e40af]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={blogs[2].image || ""}
                    alt={blogs[2].title || ""}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-[#1e3a8a] border border-white/30">
                      {blogs[2].category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 relative z-10">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-black mb-3 line-clamp-3 group-hover:text-[#1e3a8a] transition-colors duration-300">
                    {blogs[2].title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-4 leading-relaxed">
                    {blogs[2].excerpt}
                  </p>

                  {/* Author and Read More */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {(blogs[2].author || "").split(' ').filter(Boolean).map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">{blogs[2].author}</span>
                    </div>
                    
                    <Link 
                      href={`/blog/${blogs[2].slug || blogs[2]._id}`}
                      className="inline-flex items-center text-[#1e3a8a] font-semibold text-xs hover:text-[#1e40af] transition-all duration-300 group"
                    >
                      Read more
                      <ArrowUpRight 
                        size={14} 
                        className="ml-1 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
