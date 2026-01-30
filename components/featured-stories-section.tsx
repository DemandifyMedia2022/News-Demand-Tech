"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Article {
  id: string;
  category: string;
  readTime: string;
  publishDate: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
}

const ARTICLES: Article[] = [
  {
    id: "1",
    category: "FINTEQ",
    readTime: "5 min read",
    publishDate: "Jan 28, 2024",
    title: "The Future of Digital Banking: AI-Powered Solutions",
    excerpt: "Explore how artificial intelligence is revolutionizing the banking sector with personalized customer experiences and enhanced security measures.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=80",
    author: "Sarah Mitchell"
  },
  {
    id: "2",
    category: "CXTEQ",
    readTime: "3 min read",
    publishDate: "Jan 26, 2024",
    title: "Building Customer-Centric Experiences in 2024",
    excerpt: "Learn the latest strategies for creating exceptional customer journeys that drive loyalty and business growth in the digital age.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=400&q=80",
    author: "Michael Chen"
  },
  {
    id: "3",
    category: "HRTEQ",
    readTime: "4 min read",
    publishDate: "Jan 24, 2024",
    title: "Talent Acquisition Trends: What's Working Now",
    excerpt: "Discover the most effective recruitment strategies and technologies that are helping companies attract and retain top talent in competitive markets.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
    author: "Emily Rodriguez"
  }
];

export function FeaturedStoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title with typewriter effect
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

      // Animate cards with stagger - ensure they load immediately
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length > 0) {
        // Set initial state
        gsap.set(cards, { y: 100, opacity: 0, scale: 0.9 });
        
        // Animate with stagger
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

        // Fallback: ensure cards are visible after 2 seconds
        setTimeout(() => {
          gsap.set(cards, { y: 0, opacity: 1, scale: 1 });
        }, 2000);
      }

      // Add hover animations
      cards.forEach((card) => {
        if (card) {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });
    }, sectionRef);

    // Refresh ScrollTrigger to ensure proper initialization
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-6 sm:py-8 bg-[var(--background)] overflow-hidden">
      {/* Background decoration - matching hero section */}
      <div className="pointer-events-none absolute -left-40 -top-20 h-[34rem] w-[34rem] rounded-full bg-[rgba(30,58,138,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute -right-56 top-10 h-[40rem] w-[40rem] rounded-full bg-[rgba(30,58,138,0.06)] blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[rgba(30,58,138,0.04)] blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 px-4 py-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider">Featured Stories</span>
            </div>
            <h2 
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[var(--foreground)]"
            >
              Latest Insights & Trends
            </h2>
            <div className="w-24 h-1 bg-[var(--primary)] mx-auto rounded-full mb-6"></div>
            <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed">
              Dive deep into the latest trends, innovations, and insights shaping the future of technology and business.
            </p>
          </div>

        {/* Articles Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8"
        >
          {ARTICLES.map((article, index) => (
            <div
              key={article.id}
              ref={(el) => { if (el) cardRefs.current[index] = el; }}
              className="group relative bg-white/80 rounded-3xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer opacity-100"
              style={{ opacity: 1, transform: 'none' }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/5 via-transparent to-[#1e3a8a]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-[#1e3a8a] border border-white/20">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative z-10 bg-white/90">
                {/* Meta info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{article.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-black mb-3 line-clamp-2 group-hover:text-[#1e3a8a] transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Author and Read More */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {article.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{article.author}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${article.id}`}
                    className="inline-flex items-center text-[#1e3a8a] font-semibold text-sm hover:text-[#1e40af] transition-all duration-300 group"
                  >
                    Read more
                    <ArrowUpRight 
                      size={16} 
                      className="ml-1 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                    />
                  </Link>
                </div>

                {/* View All Articles Button */}
                <div className="mt-4 pt-4 border-t border-gray-200/50">
                  <Link 
                    href={`/tech/${article.category.toLowerCase()}`}
                    className="inline-flex items-center justify-center w-full gap-2 bg-gradient-to-r from-[#1e3a8a]/10 to-[#1e40af]/10 hover:from-[#1e3a8a]/20 hover:to-[#1e40af]/20 text-[#1e3a8a] hover:text-[#1e40af] px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 border border-[#1e3a8a]/20 hover:border-[#1e3a8a]/40"
                  >
                    View all {article.category} articles
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
