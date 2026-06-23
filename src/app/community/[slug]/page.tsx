"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Clock,
    User,
    MessageSquare,
    Share2,
    ArrowLeft,
    ChevronRight,
    Copy,
    Facebook,
    Twitter,
    Linkedin,
    Sparkles,
    Zap,
    ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CommunityPostPage({ params }: { params: { slug: string } }) {
    // In a real app, we'd fetch the post by slug
    const mockPost = {
        title: "The Zero-Trust Era: Why Firewalls are Dying",
        author: "Mark Thompson",
        role: "Solutions Architect",
        date: "March 08, 2024",
        category: "Security",
        readTime: "12 min read",
        content: `
            <p className="text-xl font-medium text-slate-600 leading-relaxed mb-8">
                The traditional network perimeter is no longer sufficient. As workloads move to the cloud and employees work from anywhere, identity has become the new perimeter. 
            </p>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6 tracking-tight">The Death of the "Castle-and-Moat"</h2>
            <p className="mb-6">
                For decades, enterprise security was built on a simple premise: trust everything inside the network and verify everything outside. This is the "Castle-and-Moat" architecture. But in a world of SaaS, mobile, and hybrid work, there is no "inside" anymore.
            </p>
            <p className="mb-8">
                Zero Trust operates on the principle of "never trust, always verify." Every access request must be authenticated, authorized, and continuously validated before granting access to data or applications.
            </p>
            <div className="bg-[#1e3a8a]/5 border-l-4 border-[#1e3a8a] p-8 my-10 rounded-r-3xl italic font-bold text-lg text-slate-700">
                "In a Zero Trust world, the network is irrelevant. The only things that matter are the user, the device, and the data they are trying to access."
            </div>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6 tracking-tight">Implementing Identity-Based Security</h2>
            <p className="mb-6">
                The first step towards Zero Trust is strong identity management. This means more than just MFA; it means using context-aware authentication—looking at the device health, the location, and the behavioral patterns of the user at the moment of access.
            </p>
        `,
        tags: ["Security", "Zero Trust", "Cloud Native", "Networking"]
    };

    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            {/* --- TOP NAV BAR --- */}
            <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 hidden lg:block">
                <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                    <Link href="/community" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#1e3a8a] transition-all group">
                        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                        BACK TO GALLERY
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1e3a8a] bg-blue-50 px-3 py-1 rounded-full">Community Insights</span>
                        <div className="h-4 w-px bg-slate-100" />
                        <span className="text-[11px] font-bold text-slate-900 truncate max-w-[300px]">{mockPost.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-[#1e3a8a]"><Share2 className="w-4 h-4" /></button>
                        <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-[#1e3a8a]"><Copy className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>

            {/* --- POST HEADER --- */}
            <header className="pt-16 pb-12 lg:pt-24 lg:pb-20 max-w-[1000px] mx-auto px-6">
                <div className="space-y-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/5 border border-[#1e3a8a]/10">
                        <Zap className="w-3.5 h-3.5 text-[#1e3a8a]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">{mockPost.category} Publication</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] text-balance">
                        {mockPost.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center pt-8 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-[1.5rem] bg-[#1e3a8a] flex items-center justify-center text-xl font-black text-white shadow-xl shadow-blue-900/10 hover:scale-105 transition-transform cursor-pointer">
                                {mockPost.author[0]}
                            </div>
                            <div className="text-left">
                                <p className="text-base font-black text-slate-900 tracking-tight">{mockPost.author}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{mockPost.role}</p>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-slate-100 hidden md:block" />

                        <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-400">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-300" />
                                {mockPost.readTime}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                {mockPost.date}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- CORE CONTENT --- */}
            <article className="max-w-[760px] mx-auto px-6">
                <div
                    className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: mockPost.content }}
                />

                <div className="mt-20 pt-10 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2">
                        {mockPost.tags.map((tag, i) => (
                            <span key={i} className="px-4 py-2 rounded-xl bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all cursor-pointer">
                                #{tag.replace(/\s/g, "")}
                            </span>
                        ))}
                    </div>
                </div>
            </article>

            {/* --- SIDEBAR SHARE & ENGAGEMENT --- */}
            <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 text-slate-300">
                <button className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center hover:bg-[#1e3a8a] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-blue-900/[0.02]">
                    <Linkedin className="w-5 h-5" />
                </button>
                <button className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center hover:bg-[#1e3a8a] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-blue-900/[0.02]">
                    <Twitter className="w-5 h-5" />
                </button>
                <button className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center hover:bg-[#1e3a8a] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-blue-900/[0.02]">
                    <Facebook className="w-5 h-5" />
                </button>
                <div className="h-24 w-px bg-slate-100 mx-auto my-4" />
                <button className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center hover:bg-slate-50 hover:text-[#1e3a8a] transition-all">
                    <MessageSquare className="w-5 h-5" />
                </button>
            </div>

            {/* --- AUTHOR FOOTER CARD --- */}
            <section className="max-w-[760px] mx-auto px-6 mt-24">
                <Card className="border-none shadow-2xl shadow-blue-900/5 bg-[#F8FAFC] rounded-[2.5rem] p-10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <User className="w-32 h-32 text-[#1e3a8a]" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                        <div className="h-24 w-24 shrink-0 rounded-[2rem] bg-[#1e3a8a] text-white flex items-center justify-center text-4xl font-black shadow-2xl shadow-blue-900/20">
                            {mockPost.author[0]}
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#1e3a8a] mb-2">Written By</h4>
                            <h3 className="text-2xl font-black text-slate-900 mb-4">{mockPost.author}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium italic">
                                Senior technology analyst and solutions architect specializing in security, cloud infrastructure, and the future of Zero Trust networking.
                            </p>
                            <div className="flex justify-center md:justify-start gap-4">
                                <Button className="bg-[#1e3a8a] text-white font-black h-12 px-6 rounded-xl text-[10px] tracking-widest uppercase">
                                    FOLLOW {mockPost.author.split(' ')[0]}
                                </Button>
                                <Button variant="outline" className="border-slate-200 bg-white text-slate-900 font-black h-12 px-6 rounded-xl text-[10px] tracking-widest uppercase hover:bg-slate-50">
                                    VIEW ARTICLES
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* --- RELATED ARTICLES --- */}
            <section className="max-w-[1200px] mx-auto px-6 mt-32">
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">More from the Community</h3>
                    <Link href="/community" className="text-xs font-black uppercase tracking-widest text-[#1e3a8a] hover:underline flex items-center gap-1">
                        View Gallery <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[16/10] bg-slate-100 rounded-[2rem] mb-6 overflow-hidden relative border border-slate-50">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#1e3a8a]/20 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-black text-4xl opacity-10 transform -rotate-12 group-hover:scale-110 transition-transform duration-700">
                                    related
                                </div>
                            </div>
                            <h4 className="font-bold text-slate-900 leading-snug group-hover:text-[#1e3a8a] transition-all line-clamp-2">
                                Future of Edge Computing in Global Manufacturing {i}
                            </h4>
                            <div className="mt-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <span>TECH Feed</span>
                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                <span>8 min read</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
