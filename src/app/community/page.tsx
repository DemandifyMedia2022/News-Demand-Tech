"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Users,
    ArrowRight,
    MessageSquare,
    TrendingUp,
    Clock,
    Zap,
    Search,
    ChevronDown,
    Filter,
    Calendar,
    ChevronRight,
    Play
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// --- Mock Community Data ---
const communityPosts = [
    {
        title: "The Zero-Trust Era: Why Firewalls are Dying",
        author: "Mark Thompson",
        date: "Mar 08, 2024",
        slug: "zero-trust-firewalls",
        category: "Security",
        excerpt: "Inside the shift from castle-and-moat security to identity-driven zero-trust architectures in high-scale B2B environments.",
        image: "/img/blog/blog-1.jpg",
        views: 2450,
        comments: 12
    },
    {
        title: "Building a headless CMS for multi-tenant apps",
        author: "Elena Rossi",
        date: "Mar 07, 2024",
        slug: "headless-cms",
        category: "Tech",
        excerpt: "How we architected a multi-tenant content system using decentralized APIs and Edge computing to achieve sub-100ms latency.",
        image: "/img/blog/blog-2.jpg",
        views: 1840,
        comments: 8
    },
    {
        title: "Why MarTeq consolidation is inevitable in 2025",
        author: "Alex Chen",
        date: "Mar 05, 2024",
        slug: "marteq-consolidation",
        category: "MarTeq",
        excerpt: "The complexity tax is becoming too high for average marketing teams. Here's why the stack of the future is smaller but smarter.",
        image: "/img/blog/blog-3.jpg",
        views: 3100,
        comments: 24
    },
    {
        title: "The case for Rust in backend development",
        author: "Sarah Wu",
        date: "Mar 03, 2024",
        slug: "rust-backend",
        category: "Engineering",
        excerpt: "From memory safety to raw performance, Rust is moving from a niche systems language to a core backend tool for modern startups.",
        image: "/img/blog/blog-4.jpg",
        views: 1240,
        comments: 5
    },
    {
        title: "Customer Success in a Product-Led World",
        author: "Daniel Craig",
        date: "Mar 01, 2024",
        slug: "customer-success-plg",
        category: "CXTeq",
        excerpt: "Traditional CS is reactive. PLG demands a proactive, data-driven approach to keeping customers engaged and successful.",
        image: "/img/blog/blog-5.jpg",
        views: 2800,
        comments: 15
    },
    {
        title: "FinTech Compliance in Emerging Markets",
        author: "Amara Okeke",
        date: "Feb 28, 2024",
        slug: "fintech-compliance",
        category: "FinTeq",
        excerpt: "Navigating the regulatory landscape of Africa and SE Asia requires a deep understanding of local laws and global standards.",
        image: "/img/blog/blog-6.jpg",
        views: 1560,
        comments: 9
    },
];

const trendingContributors = [
    { name: "Mark Thompson", rank: 1, posts: 24, badge: "Architect" },
    { name: "Elena Rossi", rank: 2, posts: 18, badge: "Explorer" },
    { name: "Alex Chen", rank: 3, posts: 15, badge: "Strategist" },
];

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
            {/* --- HERO SECTION --- */}
            <section className="px-6 sm:px-12 py-16 lg:py-24 max-w-[1600px] mx-auto text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-orb opacity-10 pointer-events-none" />

                <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/5 border border-[#1e3a8a]/10">
                        <Users className="w-3.5 h-3.5 text-[#1e3a8a]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">Community Collective</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05]">
                        Insights from the <br />
                        <span className="text-gradient">Professional Frontier.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                        The ultimate repository of B2B tech intelligence, shared by verified practitioners and leaders across the globe.
                    </p>

                    <div className="pt-8 flex justify-center">
                        <Button size="lg" className="rounded-2xl h-16 px-10 bg-[#1e3a8a] hover:bg-blue-800 text-sm font-black tracking-widest uppercase shadow-xl shadow-blue-900/10 active:scale-95 transition-all" onClick={() => (window.location.href = "/write-for-us")}>
                            SUBMIT YOUR STORY
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- FILTER & SEARCH BAR --- */}
            <section className="px-6 lg:px-12 pb-12 max-w-[1600px] mx-auto">
                <Card className="border-none shadow-2xl shadow-blue-900/5 bg-white/70 backdrop-blur-md rounded-[2.5rem] p-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#1e3a8a] transition-colors" />
                            <Input
                                placeholder="Search community publications..."
                                className="h-14 w-full pl-12 pr-6 border-slate-100 bg-white/50 rounded-2xl text-slate-900 font-medium focus:ring-4 focus:ring-blue-500/5 transition-all"
                            />
                        </div>

                        <div className="flex gap-4 w-full lg:w-auto shrink-0 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
                            <button className="flex items-center gap-2 px-6 h-14 bg-[#1e3a8a] text-white rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all">
                                ALL TOPICS
                            </button>
                            <TopicButton icon={Zap} label="FINTEQ" />
                            <TopicButton icon={TrendingUp} label="MARTEQ" />
                            <TopicButton icon={Clock} label="HRTEQ" />
                            <TopicButton icon={Calendar} label="CXTEQ" />
                        </div>

                        <button className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-slate-900 group transition-all">
                            <Filter className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                    </div>
                </Card>
            </section>

            {/* --- GALLERY CONTENT --- */}
            <section className="px-6 lg:px-12 max-w-[1600px] mx-auto pb-32">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Main Gallery Feed */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="grid md:grid-cols-2 gap-8">
                            {communityPosts.map((post, i) => (
                                <Link href={`/community/${post.slug}`} key={i} className="group flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-blue-900/[0.02] hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 hover:-translate-y-1">
                                    <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1e3a8a]/20 to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-black text-6xl opacity-20 transform -rotate-12 group-hover:scale-110 transition-transform duration-700">
                                            {post.category}
                                        </div>
                                        <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase tracking-widest text-slate-900">
                                            {post.category}
                                        </div>
                                    </div>

                                    <CardContent className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            <span>{post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                                            <span className="text-[#1e3a8a]">Reviewed</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#1e3a8a] transition-all leading-snug line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm text-slate-500 line-clamp-2 mb-8 font-medium italic opacity-70">
                                            "{post.excerpt}"
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-[#1e3a8a] flex items-center justify-center text-[10px] font-black text-white">
                                                    {post.author[0]}
                                                </div>
                                                <span className="text-xs font-bold text-slate-600">{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-400">
                                                <div className="flex items-center gap-1.5">
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{post.comments}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Link>
                            ))}
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button variant="outline" className="rounded-2xl h-14 px-10 border-slate-200 text-xs font-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white transition-all">
                                LOAD MORE PUBLICATIONS
                            </Button>
                        </div>
                    </div>

                    {/* Sidebar: Trending & Featured */}
                    <div className="lg:col-span-4 space-y-10">

                        {/* Featured Contributor Card */}
                        <Card className="border-none shadow-2xl shadow-blue-900/5 bg-[#1e3a8a] text-white rounded-[2.5rem] p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                                <Users className="w-40 h-40" />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 mb-6">Trending Leader</h4>
                            <div className="h-24 w-24 rounded-[2rem] bg-white p-1 mb-8">
                                <div className="w-full h-full rounded-[1.8rem] bg-slate-100 flex items-center justify-center text-slate-300 text-4xl font-black">M</div>
                            </div>
                            <h3 className="text-2xl font-black mb-2">Mark Thompson</h3>
                            <p className="text-blue-100/60 text-sm mb-8 leading-relaxed">Pioneer in Cloud Security and Zero-Trust architecture with 12+ years experience.</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center">
                                    <div className="text-xl font-black">24</div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-blue-300 mt-1">Posts</div>
                                </div>
                                <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center">
                                    <div className="text-xl font-black">42K</div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-blue-300 mt-1">Reach</div>
                                </div>
                            </div>
                        </Card>

                        {/* Leaderboard Card */}
                        <Card className="border-none shadow-2xl shadow-blue-900/5 bg-white/70 backdrop-blur-md rounded-[2.5rem] p-10">
                            <h3 className="text-xl font-black text-slate-900 mb-10 flex items-center justify-between">
                                Contributors
                                <TrendingUp className="w-5 h-5 text-green-500" />
                            </h3>
                            <div className="space-y-8">
                                {trendingContributors.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 flex items-center justify-center text-xs font-black text-slate-300 group-hover:text-[#1e3a8a] transition-all">
                                                0{i + 1}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 group-hover:text-[#1e3a8a] transition-all">{c.name}</p>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{c.badge}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 transform group-hover:translate-x-1 group-hover:text-[#1e3a8a] transition-all" />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}

function TopicButton({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <button className="flex items-center gap-2.5 px-6 h-14 bg-white border border-slate-100 text-slate-500 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:border-[#1e3a8a] hover:text-[#1e3a8a] hover:bg-white transition-all shrink-0">
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );
}
