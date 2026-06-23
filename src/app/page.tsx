"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  Sparkles,
  Zap,
  MessageSquare,
  ChevronRight,
  PlayCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FeaturedStoriesSection } from "@/components/featured-stories-section";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { CompactGoogleBanner } from "@/components/compact-google-banner";
import { PremiumBlogCard } from "@/components/premium-blog-card";

// --- Mock Data ---
const mockHighlights = [
  { title: "Nvidia's Next Leap: Blackwell Architecture Explained", time: "10 min read", category: "Hardware" },
  { title: "The Rise of Vertical AI in Fintech", time: "6 min read", category: "FinTeq" },
  { title: "CX Strategies for the Gen-Alpha Market", time: "8 min read", category: "CXTeq" },
];

const mockCommunityPosts = [
  { title: "How we scaled our HR stack to 10k employees", author: "Mark Thompson", date: "Mar 08", slug: "hr-stack-scale", category: "HRTeq" },
  { title: "Building a headless CMS for multi-tenant apps", author: "Elena Rossi", date: "Mar 07", slug: "headless-cms", category: "Tech" },
  { title: "Why MarTeq consolidation is inevitable in 2025", author: "Alex Chen", date: "Mar 05", slug: "marteq-consolidation", category: "MarTeq" },
  { title: "The case for Rust in backend development", author: "Sarah Wu", date: "Mar 03", slug: "rust-backend", category: "Engineering" },
];

const trendingTags = ["#GenerativeAI", "#CloudNative", "#ZeroTrust", "#EdgeComputing"];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#F0F8FF] pt-20">
      {/* Background Accents */}
      <div className="pointer-events-none absolute -left-40 top-40 h-[40rem] w-[40rem] rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50rem] w-[50rem] rounded-full bg-indigo-600/5 blur-[120px]" />

      {/* --- 1. HERO SECTION --- */}
      <section className="relative px-4 sm:px-8 py-12 lg:py-20 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/5 border border-[#1e3a8a]/10">
              <Zap className="w-3.5 h-3.5 text-[#1e3a8a]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">Signal Over Noise</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05]">
              Decision Intelligence <br />
              <span className="text-gradient">for the Tech-Forward.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
              Turn attention into pipeline. Blue-chip placements for B2B tech leaders,
              strategists, and innovators shaping the next decade.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-2xl h-14 px-8 bg-[#1e3a8a] hover:bg-blue-800 text-sm font-black tracking-widest uppercase shadow-xl shadow-blue-900/10 active:scale-95 transition-all">
                GET THE SIGNAL <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 bg-white text-sm font-black tracking-widest uppercase hover:bg-slate-50 active:scale-95 transition-all" onClick={() => (window.location.href = "/write-for-us")}>
                JOIN AS CREATOR
              </Button>
            </div>
          </div>

          {/* Hero Right: Today's Highlights */}
          <div className="lg:col-span-5">
            <Card className="border-none shadow-2xl shadow-blue-900/5 bg-white/70 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Today's Highlights
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Editorial Feed</span>
                </div>

                <div className="space-y-6">
                  {mockHighlights.map((item, i) => (
                    <div key={i} className="group cursor-pointer flex gap-4 p-4 rounded-3xl hover:bg-white transition-all duration-300">
                      <div className="h-10 w-10 shrink-0 rounded-2xl bg-[#1e3a8a]/5 flex items-center justify-center text-xs font-black text-[#1e3a8a]">
                        0{i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-[#1e3a8a] transition-all leading-snug">{item.title}</h4>
                        <div className="flex items-center gap-3 mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <span className="text-[#1e3a8a]">{item.category}</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="ghost" className="w-full mt-8 rounded-2xl h-14 border border-slate-100 text-xs font-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white transition-all">
                  VIEW ALL NEWS <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- 2. VERTICALS GRID --- */}
      <section className="py-20 bg-white shadow-[0_0_50px_rgba(30,58,138,0.03)] relative z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "FINTEQ", desc: "Digital assets, banking infra, and global payments.", color: "blue" },
              { name: "CXTEQ", desc: "Customer journey, CRM, and automated experience.", color: "indigo" },
              { name: "HRTEQ", desc: "Future of work, payroll, and talent intelligence.", color: "cyan" },
              { name: "MARTEQ", desc: "Data pipelines, content ops, and demand gen.", color: "pink" }
            ].map((v, i) => (
              <div key={i} className="group relative p-8 rounded-[2.5rem] bg-[#F8FAFC] border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="text-8xl font-black">{v.name[0]}</div>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-[#1e3a8a] flex items-center justify-center text-white font-black mb-6 group-hover:scale-110 transition-transform">
                  {v.name.substring(0, 2)}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{v.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{v.desc}</p>
                <Link href={`/tech/${v.name.toLowerCase()}`} className="inline-flex items-center text-xs font-black uppercase tracking-widest text-[#1e3a8a] hover:underline">
                  EXPLORE {v.name} <ArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. FEATURED STORIES --- */}
      <FeaturedStoriesSection />

      {/* --- 4. LATEST TECH NEWS (Mixed Feed) --- */}
      <section className="py-24 max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Latest Tech News</h2>
              <div className="h-0.5 flex-1 bg-slate-100 mx-8 hidden md:block" />
              <Link href="/news" className="text-xs font-black uppercase tracking-widest text-[#1e3a8a] hover:underline shrink-0">View Archive</Link>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <PremiumBlogCard
                category="Hardware"
                image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
                readingTime="5 MIN READ"
                publishDate="2 HOURS AGO"
                title="The Silicon Renaissance: How Manufacturing is Going Digital"
                excerpt="Manufacturing is undergoing a digital revolution, driven by smart sensors, predictive maintenance, and real-time data analytics."
                authorName="James Milner"
                authorInitial="JM"
                href="#"
              />
              <PremiumBlogCard
                category="Ethics"
                image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
                readingTime="8 MIN READ"
                publishDate="5 HOURS AGO"
                title="AI Ethics in 2024: From Principles to Compliance"
                excerpt="As AI becomes ubiquitous, companies are moving from vague principles to concrete compliance frameworks and ethical auditing."
                authorName="Dr. Aris Thorne"
                authorInitial="AT"
                href="#"
              />
              <PremiumBlogCard
                category="Quantum"
                image="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80"
                readingTime="12 MIN READ"
                publishDate="1 DAY AGO"
                title="Quantum Computing: The Mid-Scale Era Begins"
                excerpt="The first practical applications of quantum computing are emerging in material science and cryptography as hardware matures."
                authorName="Sarah Chen"
                authorInitial="SC"
                href="#"
              />
              <PremiumBlogCard
                category="Infrastructure"
                image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80"
                readingTime="6 MIN READ"
                publishDate="2 DAYS AGO"
                title="The Sustainable Data Center: Liquid Cooling & Beyond"
                excerpt="Data centers are finding new ways to reduce their carbon footprint through innovative cooling systems and renewable energy."
                authorName="Robert Glass"
                authorInitial="RG"
                href="#"
              />
            </div>
          </div>

          {/* Sidebar: Ads & Trending */}
          <div className="lg:col-span-4 space-y-8">
            {/* Ads Slot */}
            <Card className="border-none shadow-xl shadow-blue-900/5 bg-[#1e3a8a] text-white rounded-[2.5rem] p-8 aspect-square flex flex-col justify-center items-center text-center group transition-transform hover:scale-[1.02]">
              <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center mb-6">
                <PlayCircle className="w-8 h-8 text-blue-300" />
              </div>
              <h4 className="text-2xl font-black mb-4 px-4">Innovate Faster with Managed Services</h4>
              <p className="text-blue-100/60 text-sm mb-8 px-6">Scale your infrastructure without the overhead. Join the elite top 1%.</p>
              <Button className="bg-white text-[#1e3a8a] font-black h-12 px-8 rounded-xl shadow-lg">Learn More</Button>
              <span className="absolute top-6 right-8 text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Sponsored Content</span>
            </Card>

            {/* --- 5. TRENDING TOPICS --- */}
            <Card className="border-none shadow-xl shadow-blue-900/5 bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag, i) => (
                  <button key={i} className="px-5 py-2.5 rounded-2xl bg-white border border-slate-100 text-[11px] font-black text-slate-600 hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all">
                    {tag}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* --- 6. RECENT PUBLICATIONS (Community Feed) --- */}
      <section className="py-28 bg-[#F8FAFF] relative overflow-hidden">
        {/* Lighter, Modern Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[80%] bg-blue-100/40 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[70%] bg-indigo-100/30 rounded-full blur-[110px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Community Collective</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                Recent <span className="text-blue-600">Publications</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-xl font-medium leading-relaxed">
                Expert-led perspectives and technical deep-dives from the professional frontier.
              </p>
            </div>
            <Button
              variant="outline"
              className="h-16 px-10 rounded-2xl border-blue-200 bg-white text-blue-600 font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-500 group shadow-lg shadow-blue-900/5"
              onClick={() => (window.location.href = "/community")}
            >
              EXPLORE COMMUNITY <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockCommunityPosts.map((post, i) => (
              <Link
                href={`/community/${post.slug}`}
                key={i}
                className="group flex flex-col h-full rounded-[2.5rem] bg-white border border-blue-50/50 p-8 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 relative overflow-hidden"
              >
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 px-3 py-1 rounded-lg bg-blue-50 border border-blue-100">
                    {post.category}
                  </span>
                  <MessageSquare className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-8 group-hover:text-blue-700 transition-colors leading-[1.3] line-clamp-3 relative z-10">
                  {post.title}
                </h3>

                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-xs font-black text-white group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/20">
                      {post.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{post.author}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{post.date}</p>
                    </div>
                  </div>
                  <div className="translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CompactGoogleBanner />
      <NewsletterSignup />
    </main>
  );
}


