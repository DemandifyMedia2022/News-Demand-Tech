"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock, TrendingUp, Target, Zap, BarChart, Megaphone, Mail, LineChart, Users2, Rocket } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/ui/header-3";
import { Switcher } from "@/components/ui/switcher";

const MARTEQ_ARTICLES = [
  {
    id: "1",
    title: "Marketing Automation 2026: The AI Revolution",
    excerpt: "How artificial intelligence is transforming marketing automation and personalization at scale.",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    readTime: "8 min",
    date: "Jan 28, 2026",
    author: "Alex Thompson",
    featured: true
  },
  {
    id: "2",
    title: "Content Intelligence: Data-Driven Storytelling",
    excerpt: "Leveraging AI and analytics to create compelling content that drives engagement and conversions.",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    readTime: "6 min",
    date: "Jan 26, 2026",
    author: "Rachel Green",
    featured: false
  },
  {
    id: "3",
    title: "Customer Journey Orchestration: Beyond Funnels",
    excerpt: "Modern approaches to mapping and optimizing customer journeys across multiple touchpoints.",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1600&q=80",
    readTime: "10 min",
    date: "Jan 24, 2026",
    author: "Mark Davis",
    featured: false
  },
  {
    id: "4",
    title: "Marketing Analytics: Metrics That Matter",
    excerpt: "Moving beyond vanity metrics to analytics that drive real business growth and ROI.",
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    readTime: "7 min",
    date: "Jan 22, 2026",
    author: "Lisa Chen",
    featured: false
  },
  {
    id: "5",
    title: "Account-Based Marketing 2.0: Precision Targeting",
    excerpt: "Advanced ABM strategies and technologies for B2B marketing success in 2026.",
    category: "ABM",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    readTime: "9 min",
    date: "Jan 20, 2026",
    author: "Tom Wilson",
    featured: false
  }
];

const CATEGORIES = ["All", "Automation", "Strategy", "Analytics", "ABM"];

export default function MARTEQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const unoptimized = process.env.NODE_ENV === "development";

  const filteredArticles = activeCategory === "All"
    ? MARTEQ_ARTICLES
    : MARTEQ_ARTICLES.filter(article => article.category === activeCategory);

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-[var(--background)] pt-32 pb-12 overflow-hidden">
        {/* Modern Geometric Accents */}
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-indigo-50/20 to-transparent pointer-events-none z-0" />
        <div className="absolute -top-40 -right-40 w-72 h-72 bg-indigo-100/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-16 lg:mb-20">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-indigo-600/5 border border-indigo-600/10 text-indigo-700 font-bold text-[10px] mb-6 tracking-widest uppercase">
                <Rocket size={14} className="animate-pulse" />
                MARTEQ CORE
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-gray-900 mb-6 leading-none">
                Market <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-4">Intelligence.</span>
              </h1>
              <p className="text-sm text-gray-500 max-w-lg leading-relaxed mb-8">
                The intersection of marketing strategy and technological innovation for high-performance growth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-black text-base transition-all hover:bg-black hover:scale-105 shadow-lg shadow-indigo-100">
                  Get Growth Insights
                </button>
                <div className="flex items-center gap-2">
                  <span className="h-1 w-8 bg-indigo-200 rounded-full" />
                  <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase">10k+ Leaders</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-3 max-w-sm ml-auto">
                {[
                  { icon: BarChart, label: "Analytics", val: "98%", desc: "ACCURACY" },
                  { icon: Users2, label: "Network", val: "50k+", desc: "GROWTH" },
                  { icon: Target, label: "ABM", val: "12x", desc: "HIGHER ROI" },
                  { icon: LineChart, label: "Growth", val: "4.5x", desc: "SPEED" }
                ].map((stat, i) => (
                  <div key={i} className="p-5 rounded-[1.5rem] bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-indigo-50 group">
                    <stat.icon size={18} className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-xl font-black text-gray-900 mb-0.5">{stat.val}</div>
                    <div className="text-[8px] font-black tracking-wider text-gray-400 uppercase">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Switcher */}
          <div className="flex justify-center mb-16">
            <Switcher
              options={CATEGORIES}
              activeOption={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* Featured Article */}
          {activeCategory === "All" && (
            <div className="group relative mb-16 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 p-3 md:p-6 flex flex-col lg:flex-row gap-8 transition-all hover:shadow-xl">
              <div className="relative lg:w-1/2 aspect-[16/9] lg:aspect-auto overflow-hidden rounded-xl">
                <Image
                  src={MARTEQ_ARTICLES[0].image}
                  alt={MARTEQ_ARTICLES[0].title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  unoptimized={unoptimized}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-indigo-600 text-white font-black text-[9px] uppercase rounded-lg shadow-lg">
                    FEATURED STORY
                  </span>
                </div>
              </div>
              <div className="lg:w-1/2 flex flex-col justify-center py-4 px-2">
                <div className="flex items-center gap-3 text-indigo-600 font-black text-[10px] mb-4 uppercase tracking-widest">
                  <span>{MARTEQ_ARTICLES[0].category}</span>
                  <span className="w-1 h-1 rounded-full bg-indigo-200" />
                  <span>{MARTEQ_ARTICLES[0].readTime}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 leading-tight">
                  {MARTEQ_ARTICLES[0].title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 uppercase line-clamp-2">
                  {MARTEQ_ARTICLES[0].excerpt}
                </p>
                <button className="flex items-center gap-2 text-indigo-600 font-black text-base transition-all hover:gap-4 group/btn">
                  START READING
                  <ArrowUpRight size={20} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </div>
            </div>
          )}

          {/* Grid articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {filteredArticles.filter(a => activeCategory !== "All" || !a.featured).map((article) => (
              <div key={article.id} className="group flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-4 bg-gray-100 shadow-sm border border-gray-100 transition-all group-hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] group-hover:translate-y-[-4px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized={unoptimized}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-indigo-600 text-[8px] font-black uppercase rounded shadow-lg">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-[9px] font-black mb-2 tracking-widest uppercase">
                  <span className="flex items-center gap-1"><Calendar size={10} /> {article.date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2 uppercase">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{article.author}</span>
                  <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Marketing CTA Section */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-indigo-600 p-8 md:p-14 text-center">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
              <div className="absolute -bottom-48 -left-48 w-72 h-72 bg-black/10 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full mb-6 border border-white/20">
                <Megaphone className="text-white" size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight">Scale Your Marketing with Precision.</h2>
              <p className="text-indigo-100 text-base mb-8 font-medium">
                The 2026 MarTeq Strategy Report is here. Get it before your competitors do.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-black text-base transition-all hover:scale-105 shadow-lg">
                  Download Report
                </button>
                <button className="px-8 py-3 border-2 border-white/30 text-white rounded-xl font-black text-base hover:bg-white/10 transition-all">
                  Contact Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
