"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock, TrendingUp, Shield, DollarSign, CreditCard, PieChart, Building } from "lucide-react";
import { Footer } from "@/components/footer";

const FINTEQ_ARTICLES = [
  {
    id: "1",
    title: "Digital Banking Revolution: AI-Powered Financial Services",
    excerpt: "How artificial intelligence is transforming digital banking and customer experience in 2026.",
    category: "Digital Banking",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=80",
    readTime: "8 min",
    date: "Jan 28, 2026",
    author: "Jennifer Lee",
    featured: true
  },
  {
    id: "2",
    title: "Blockchain in Finance: Beyond Cryptocurrency",
    excerpt: "Enterprise blockchain applications reshaping traditional financial services and operations.",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
    readTime: "6 min",
    date: "Jan 26, 2026",
    author: "Robert Chen",
    featured: false
  },
  {
    id: "3",
    title: "Fraud Detection 2.0: Machine Learning Security",
    excerpt: "Advanced ML algorithms and AI systems protecting financial institutions from sophisticated fraud attempts.",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=80",
    readTime: "10 min",
    date: "Jan 24, 2026",
    author: "Amanda Foster",
    featured: false
  },
  {
    id: "4",
    title: "Embedded Finance: The Future of Payments",
    excerpt: "How financial services are being integrated into non-financial platforms and applications.",
    category: "Payments",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    readTime: "7 min",
    date: "Jan 22, 2026",
    author: "David Park",
    featured: false
  },
  {
    id: "5",
    title: "RegTech: Compliance Automation in Finance",
    excerpt: "Technology solutions streamlining regulatory compliance and reducing operational risk in financial institutions.",
    category: "RegTech",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    readTime: "9 min",
    date: "Jan 20, 2026",
    author: "Michelle Wang",
    featured: false
  },
  {
    id: "6",
    title: "DeFi Evolution: Institutional Adoption",
    excerpt: "How traditional financial institutions are embracing decentralized finance and blockchain technology.",
    category: "DeFi",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
    readTime: "5 min",
    date: "Jan 18, 2026",
    author: "Kevin Zhang",
    featured: false
  }
];

const FINTEQ_FEATURES = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Digital Banking",
    description: "Next-generation banking platforms with AI-powered customer experiences"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Security & Compliance",
    description: "Advanced fraud detection and automated regulatory compliance"
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Payment Innovation",
    description: "Seamless payment solutions and embedded finance technologies"
  },
  {
    icon: <PieChart className="w-6 h-6" />,
    title: "Financial Analytics",
    description: "Real-time insights and predictive analytics for financial decision-making"
  }
];

export default function FINTEQPage() {
  const featuredArticle = FINTEQ_ARTICLES.find(article => article.featured);
  const regularArticles = FINTEQ_ARTICLES.filter(article => !article.featured);
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
                <span className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider">FINTEQ</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6">
                Financial Technology
              </h1>
              <div className="w-32 h-1 bg-[var(--primary)] mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed">
                Transform your financial operations with cutting-edge technology solutions for digital banking, payments, and security.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {FINTEQ_FEATURES.map((feature, index) => (
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
                        <Building size={14} />
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
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">Latest FINTEQ Insights</h2>
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
                Transform Your Financial Operations
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Get expert insights and cutting-edge strategies to build a future-ready financial technology stack.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center gap-2 bg-white text-[var(--primary)] px-8 py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                  <TrendingUp size={20} />
                  Get FinTech Insights
                  <ArrowUpRight size={16} />
                </button>
                <button className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-[var(--primary)]">
                  <DollarSign size={20} />
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
