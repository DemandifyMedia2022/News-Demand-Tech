"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock, TrendingUp, Zap, Cpu, Cloud, Shield, BarChart3, Headphones } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/ui/header-3";
import { Switcher } from "@/components/ui/switcher";

const TRENDING_ARTICLES = [
    {
        id: "1",
        title: "The State of AI in 2026: From Hype to Utility",
        excerpt: "Exploring how generative AI has transitioned from experimental tools to core business infrastructure.",
        category: "AI",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
        readTime: "8 min",
        date: "Jan 30, 2026",
        author: "Dr. Aris Thorne",
        featured: true
    },
    {
        id: "2",
        title: "Cloud Sovereignty: The New Frontier for Global Enterprise",
        excerpt: "Why regional cloud solutions are becoming the primary choice for data-sensitive industries.",
        category: "Cloud",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80",
        readTime: "6 min",
        date: "Jan 29, 2026",
        author: "Sarah Jenkins",
        featured: false
    },
    {
        id: "3",
        title: "Zero Trust Architecture: Lessons from the Latest Breaches",
        excerpt: "A deep dive into why perimeter-based security is failing and how Zero Trust is saving the day.",
        category: "Cyber",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
        readTime: "10 min",
        date: "Jan 28, 2026",
        author: "Marcus Vane",
        featured: false
    },
    {
        id: "4",
        title: "Predictive Analytics: Anticipating Market Shifts Before They Happen",
        excerpt: "How data-driven organizations are using advanced analytics to outpace their competitors.",
        category: "Data Analytics",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
        readTime: "7 min",
        date: "Jan 27, 2026",
        author: "Elena Rodriguez",
        featured: false
    },
    {
        id: "5",
        title: "The Human Element in CX: Balancing Automation and Empathy",
        excerpt: "Ensuring your customer experience doesn't lose its soul in the age of total automation.",
        category: "CX",
        image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1600&q=80",
        readTime: "9 min",
        date: "Jan 26, 2026",
        author: "David Chen",
        featured: false
    },
    {
        id: "6",
        title: "Quantum Computing: The 2026 Roadmap",
        excerpt: "What real-world applications are emerging as quantum processors finally hit critical stability.",
        category: "AI",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1600&q=80",
        readTime: "12 min",
        date: "Jan 25, 2026",
        author: "Dr. Leo Zhang",
        featured: false
    }
];

const CATEGORIES = ["All", "AI", "Cloud", "Cyber", "Data Analytics", "CX"];

export default function TrendingTopicsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const unoptimized = process.env.NODE_ENV === "development";

    const filteredArticles = activeCategory === "All"
        ? TRENDING_ARTICLES
        : TRENDING_ARTICLES.filter(article => article.category === activeCategory);

    const featuredArticle = TRENDING_ARTICLES.find(a => a.featured);

    return (
        <>
            <Header />
            <main className="relative min-h-screen bg-[var(--background)] pt-32 pb-12 overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#1e3a8a]/5 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 -right-48 w-full max-w-[400px] h-[400px] bg-[#1e3a8a]/3 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="mb-10 text-center lg:text-left lg:flex lg:items-center lg:justify-between gap-10">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/5 border border-[#1e3a8a]/10 mb-4">
                                <TrendingUp size={14} className="text-[#1e3a8a]" />
                                <span className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-wider">The Signal Over Noise</span>
                            </div>
                            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
                                Trending <span className="text-[#1e3a8a]">Topics</span>
                            </h1>
                            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-lg">
                                Stay ahead of the curve with our curated insights on the technologies shaping the B2B landscape.
                            </p>
                        </div>

                        <div className="hidden lg:grid grid-cols-2 gap-3 max-w-sm">
                            {[
                                { icon: Cpu, label: "AI & ML", color: "bg-blue-50/50 text-blue-600" },
                                { icon: Cloud, label: "Cloud Tech", color: "bg-indigo-50/50 text-indigo-600" },
                                { icon: Shield, label: "Cybersecurity", color: "bg-slate-50/50 text-slate-600" },
                                { icon: BarChart3, label: "Analytics", color: "bg-azure-50/50 text-azure-600" }
                            ].map((item, i) => (
                                <div key={i} className={cn("p-4 rounded-2xl border border-gray-100 flex flex-col gap-2 transition-all hover:shadow-md", item.color)}>
                                    <item.icon size={20} />
                                    <span className="font-bold text-xs tracking-tight">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Filtering Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-full flex justify-center mb-6">
                            <Switcher
                                options={CATEGORIES}
                                activeOption={activeCategory}
                                onChange={setActiveCategory}
                            />
                        </div>
                    </div>

                    {/* Featured Article (Full Width) */}
                    {activeCategory === "All" && featuredArticle && (
                        <div className="group relative mb-16 overflow-hidden rounded-[2.5rem] bg-gray-900 shadow-2xl transition-all duration-500 hover:shadow-cyan-900/10">
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={featuredArticle.image}
                                    alt={featuredArticle.title}
                                    fill
                                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                                    unoptimized={unoptimized}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                            </div>

                            <div className="relative z-10 p-8 md:p-14 lg:p-20 flex flex-col justify-end min-h-[500px] lg:min-h-[600px] max-w-4xl tracking-tight">
                                <div className="flex items-center gap-4 text-cyan-400 font-bold mb-6 text-sm uppercase tracking-widest">
                                    <span className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full">Featured Story</span>
                                    <span>•</span>
                                    <span>{featuredArticle.category}</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    {featuredArticle.title}
                                </h2>
                                <p className="text-lg text-gray-300 mb-8 max-w-2xl line-clamp-3">
                                    {featuredArticle.excerpt}
                                </p>
                                <div className="flex flex-wrap items-center gap-6">
                                    <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold transition-all hover:bg-cyan-50 hover:scale-105">
                                        Read Insights
                                        <ArrowUpRight size={20} />
                                    </button>
                                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                                        <span className="flex items-center gap-1.5"><Calendar size={16} /> {featuredArticle.date}</span>
                                        <span className="flex items-center gap-1.5"><Clock size={16} /> {featuredArticle.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {filteredArticles.filter(a => activeCategory !== "All" || !a.featured).map((article) => (
                            <div key={article.id} className="group bg-white rounded-2xl border border-gray-100 p-3 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(30,58,138,0.12)] hover:border-[#1e3a8a]/10">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        unoptimized={unoptimized}
                                    />
                                    <div className="absolute top-2 left-2">
                                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-[#1e3a8a] text-[9px] font-bold uppercase rounded shadow-sm">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="px-1 pb-1">
                                    <div className="flex items-center gap-2 text-gray-400 text-[10px] mb-2 font-medium uppercase tracking-wider">
                                        <span className="flex items-center gap-1"><Calendar size={10} /> {article.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1e3a8a] transition-colors line-clamp-2 leading-snug">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-tighter">{article.author}</span>
                                        <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-[#1e3a8a] group-hover:text-white transition-all transform group-hover:rotate-45">
                                            <ArrowUpRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Info Section */}
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1e3a8a] to-blue-900 p-8 md:p-14 text-center shadow-xl">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <Zap size={24} className="text-yellow-400 mx-auto mb-4" />
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Never Miss a Tech Shift</h2>
                            <p className="text-blue-100 text-sm mb-8 leading-relaxed">
                                The PACE of technology is relentless. Join our network of 50,000+ professionals getting the signal delivered weekly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button className="bg-white text-[#1e3a8a] px-8 py-3 rounded-xl font-bold text-base transition-transform hover:scale-105 shadow-md">
                                    Subscribe Now
                                </button>
                                <button className="border-2 border-white/20 text-white px-8 py-3 rounded-xl font-bold text-base hover:bg-white/10 transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
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
