"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock, TrendingUp, Target, Zap, BarChart, Megaphone, Mail } from "lucide-react";
import { Footer } from "@/components/footer";

const MARTEQ_ARTICLES = [
  {
    id: "1",
    title: "Marketing Automation 2026: The AI Revolution",
    excerpt: "How artificial intelligence is transforming marketing automation and personalization at scale.",
    category: "Marketing Automation",
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
    category: "Content Strategy",
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
    category: "Customer Journey",
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
  },
  {
    id: "6",
    title: "Email Marketing Automation: Personalization at Scale",
    excerpt: "Building sophisticated email campaigns that adapt to customer behavior and preferences.",
    category: "Email Marketing",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd5a9ed?auto=format&fit=crop&w=1600&q=80",
    readTime: "5 min",
    date: "Jan 18, 2026",
    author: "Sarah Martinez",
    featured: false
  }
];

const MARTEQ_FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Marketing Automation",
    description: "Streamline campaigns with intelligent automation and personalization"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Precision Targeting",
    description: "Advanced audience segmentation and account-based marketing"
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: "Performance Analytics",
    description: "Real-time insights and ROI-driven marketing metrics"
  },
  {
    icon: <Megaphone className="w-6 h-6" />,
    title: "Content Intelligence",
    description: "AI-powered content creation and distribution strategies"
  }
];

export default function MARTEQPage() {
  const featuredArticle = MARTEQ_ARTICLES.find(article => article.featured);
  const regularArticles = MARTEQ_ARTICLES.filter(article => !article.featured);
  const unoptimized = process.env.NODE_ENV === "development";

  return (
    <>
      <main className="relative overflow-hidden bg-[var(--background)]">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[rgba(30,58,138,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute -right-56 top-32 h-[40rem] w-[40rem] rounded-full bg-[rgba(30,58,138,0.06)] blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-[52rem] h-[28rem] w-[28rem] rounded-full bg-[rgba(30,58,138,0.04)] blur-3xl" />

        {/* Hero Section */}
        <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 px-4 py-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
                <span className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider">MARTEQ</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6">
                Marketing Technology
              </h1>
              <div className="w-32 h-1 bg-[var(--primary)] mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed">
                Transform your marketing strategy with cutting-edge technology solutions for automation, analytics, and customer engagement.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {MARTEQ_FEATURES.map((feature, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center text-[var(--primary)] mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="relative py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">Featured Story</h2>
                <div className="w-24 h-1 bg-[var(--primary)] mx-auto rounded-full"></div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/40 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover"
                      unoptimized={unoptimized}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-[var(--primary)] border border-white/30">
                        {featuredArticle.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)] mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {featuredArticle.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {featuredArticle.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {featuredArticle.author}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-4 line-clamp-2">
                      {featuredArticle.title}
                    </h3>
                    
                    <p className="text-[var(--muted-foreground)] mb-6 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    
                    <button className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[var(--primary)]/90 hover:shadow-lg group">
                      Read Full Article
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Articles Grid */}
        <section className="relative py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">Latest MARTEQ Insights</h2>
              <div className="w-24 h-1 bg-[var(--primary)] mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <div key={article.id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group">
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized={unoptimized}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-[var(--primary)] border border-white/30">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)] mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {article.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                      {article.title}
                    </h3>
                    
                    <p className="text-[var(--muted-foreground)] mb-4 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--muted-foreground)]">{article.author}</span>
                      <button className="inline-flex items-center gap-1 text-[var(--primary)] font-semibold text-sm hover:text-[var(--primary)]/80 transition-colors">
                        Read More
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <div className="bg-[var(--primary)] rounded-3xl p-8 sm:p-12 shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Transform Your Marketing Strategy
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Get expert insights and cutting-edge strategies to build a marketing engine that drives growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center gap-2 bg-white text-[var(--primary)] px-8 py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                  <TrendingUp size={20} />
                  Get Marketing Insights
                  <ArrowUpRight size={16} />
                </button>
                <button className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-[var(--primary)]">
                  <Target size={20} />
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
