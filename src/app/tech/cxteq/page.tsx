"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock, TrendingUp, Users, MessageSquare, Headphones, Star, Zap, ShieldCheck, HeartHandshake, Database } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/ui/header-3";
import { Switcher } from "@/components/ui/switcher";

const CXTEQ_ARTICLES = [
  {
    id: "1",
    title: "Customer Experience Platforms: The Complete Guide",
    excerpt: "How modern CX platforms are transforming customer interactions and driving business growth in 2026.",
    category: "CX Automation",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1600&q=80",
    readTime: "8 min",
    date: "Jan 28, 2026",
    author: "Sophia Martinez",
    featured: true
  },
  {
    id: "2",
    title: "AI-Powered Customer Service: Chatbots and Beyond",
    excerpt: "Advanced AI solutions revolutionizing customer support and engagement across all touchpoints.",
    category: "CX Automation",
    image: "https://images.unsplash.com/photo-1531297483762-372d3692f4ea?auto=format&fit=crop&w=1600&q=80",
    readTime: "6 min",
    date: "Jan 26, 2026",
    author: "James Wilson",
    featured: false
  },
  {
    id: "3",
    title: "Customer Journey Mapping: Data-Driven Insights",
    excerpt: "Using analytics and AI to understand and optimize every customer touchpoint for maximum satisfaction.",
    category: "Customer Journey",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    readTime: "10 min",
    date: "Jan 24, 2026",
    author: "Emily Chen",
    featured: false
  },
  {
    id: "4",
    title: "Omnichannel Customer Experience: Seamless Integration",
    excerpt: "Creating consistent, personalized experiences across all customer channels and devices.",
    category: "Customer Journey",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    readTime: "7 min",
    date: "Jan 22, 2026",
    author: "Michael Brown",
    featured: false
  },
  {
    id: "5",
    title: "CDP: The Engine of Personalized Customer Interaction",
    excerpt: "How Customer Data Platforms are enabling hyper-personalization at scale for B2B brands.",
    category: "Customer Data Platform",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    readTime: "9 min",
    date: "Jan 20, 2026",
    author: "Lisa Anderson",
    featured: false
  }
];

const CATEGORIES = ["All", "CX Automation", "Customer Journey", "Customer Data Platform"];

export default function CXTEQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const unoptimized = process.env.NODE_ENV === "development";

  const filteredArticles = activeCategory === "All"
    ? CXTEQ_ARTICLES
    : CXTEQ_ARTICLES.filter(article => article.category === activeCategory);

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-[var(--background)] pt-32 pb-12 overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/20 rounded-full blur-3xl -tr-1/2 pointer-events-none z-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section - Split Layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-center mb-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-100 shadow-sm mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CXTeq Intelligence</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
                Elevating the <span className="text-blue-600">Customer Journey.</span>
              </h1>
              <p className="text-sm text-gray-500 max-w-lg leading-relaxed mb-6">
                Unlock the full potential of your customer interactions with our deep dives into engagement and analytics.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold transition-all hover:bg-black hover:scale-105 shadow-md">
                  Explore Frameworks
                </button>
                <div className="px-4 py-3 flex items-center gap-2 bg-white border border-gray-100 rounded-xl">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-gray-200 relative">
                        <Image
                          src={`https://i.pravatar.cc/150?u=${i + 10}`}
                          alt="User"
                          fill
                          className="object-cover"
                          unoptimized={unoptimized}
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-gray-500">+12k Analysts</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md bg-white/50 backdrop-blur-xl border border-white rounded-[2rem] p-6 md:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="text-blue-600" size={20} />
                CX Focus Areas
              </h3>
              <div className="space-y-4">
                {[
                  { icon: MessageSquare, title: "CX Automation", desc: "AI-driven engagement strategies" },
                  { icon: HeartHandshake, title: "Customer Success", desc: "Proactive retention & loyalty" },
                  { icon: Database, title: "Journey Analytics", desc: "Data-driven touchpoint optimization" }
                ].map((item, i) => (
                  <div key={i} className="group p-4 rounded-xl border border-gray-100 bg-white transition-all hover:border-blue-50 hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{item.title}</h4>
                        <p className="text-[11px] text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col items-center mb-16">
            <Switcher
              options={CATEGORIES}
              activeOption={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredArticles.map((article) => (
              <div key={article.id} className="group bg-white rounded-2xl border border-gray-50 p-3 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.08)] hover:translate-y-[-4px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4 shadow-sm">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized={unoptimized}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-white/95 backdrop-blur-sm text-[#1e3a8a] text-[9px] font-bold uppercase rounded shadow-lg tracking-wider">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex items-center gap-3 text-gray-400 text-[10px] mb-2 font-bold tracking-widest uppercase">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-50 overflow-hidden relative">
                        <Image src="https://i.pravatar.cc/150?u=cx" alt={article.author} fill className="object-cover" unoptimized={unoptimized} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{article.author}</span>
                    </div>
                    <button className="inline-flex items-center gap-1 text-blue-600 font-bold text-[11px] group/btn">
                      Deep Dive
                      <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ad Space Section */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-100 p-8 md:p-14 mb-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-blue-600 font-extrabold mb-4 text-[10px] tracking-widest uppercase">
                  <Zap size={14} />
                  <span>SPONSORED SPOTLIGHT</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">Master the Modern CX Stack</h2>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  Download our technical blueprint for building a high-conversion CX ecosystem.
                </p>
                <button className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all hover:bg-blue-700 shadow-lg shadow-blue-100">
                  Get the Blueprint
                </button>
              </div>
              <div className="relative h-[240px] md:h-[300px] flex items-center justify-center">
                <div className="relative z-10 w-full max-w-[200px] aspect-[4/5] bg-gray-900 rounded-[1.5rem] p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="h-full border border-gray-800 rounded-xl p-6 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-8 h-1 bg-blue-600 rounded-full" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-tight">The 2026 CX Blueprint</h4>
                    </div>
                    <div className="text-[6px] text-gray-500 font-mono tracking-widest uppercase">EDITION 04.22 // CONFIDENTIAL</div>
                  </div>
                </div>
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
