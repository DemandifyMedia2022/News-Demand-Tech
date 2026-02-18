"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
    Calendar,
    Clock,
    TrendingUp,
    Zap,
    Brain,
    CloudCog,
    ShieldCheck,
    BarChart3,
    Headphones,
    Sparkles,
    Users,
    Eye,
    BookOpen,
    ArrowRight
} from "lucide-react";
import { Header } from "@/components/ui/header-3";
import { Switcher } from "@/components/ui/switcher";
import { CategoryDropdown } from "@/components/ui/category-dropdown";
import { CmsBlog } from "@/lib/types";

const CATEGORIES = ["All", "Trending Topic", "FinTeq", "CXTeq", "HRTeq"];

// Professional category colors aligned with navy blue theme
const CATEGORY_STYLES = {
    "Trending Topic": {
        gradient: "from-[#1e3a8a] to-[#1e40af]",
        bg: "bg-[#1e3a8a]",
        text: "text-[#1e3a8a]",
        icon: TrendingUp
    },
    "FinTeq": {
        gradient: "from-[#1e40af] to-[#2563eb]",
        bg: "bg-[#1e40af]",
        text: "text-[#1e40af]",
        icon: BarChart3
    },
    "CXTeq": {
        gradient: "from-[#1e3a8a] to-[#3730a3]",
        bg: "bg-[#1e3a8a]",
        text: "text-[#1e3a8a]",
        icon: Headphones
    },
    "HRTeq": {
        gradient: "from-[#2563eb] to-[#3b82f6]",
        bg: "bg-[#2563eb]",
        text: "text-[#2563eb]",
        icon: Users
    }
};

export default function TrendingTopicsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [articles, setArticles] = useState<CmsBlog[]>([]);
    const [isLoadingArticles, setIsLoadingArticles] = useState(false);
    const unoptimized = process.env.NODE_ENV === "development";

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setIsLoadingArticles(true);
            try {
                const params = new URLSearchParams({
                    type: "blog",
                    limit: "60",
                    offset: "0",
                    published: "true",
                });
                if (activeCategory !== "All") params.set("category", activeCategory);

                const res = await fetch(`/api/cms/query?${params.toString()}`, { cache: "no-store" });
                if (!res.ok) throw new Error(`Failed to load articles (${res.status})`);
                const data = await res.json();
                const result = Array.isArray(data?.result) ? data.result : [];
                if (!cancelled) setArticles(result);
            } catch {
                if (!cancelled) setArticles([]);
            } finally {
                if (!cancelled) setIsLoadingArticles(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [activeCategory]);

    const featuredArticle = useMemo(() => articles[0], [articles]);
    const filteredArticles = useMemo(() => {
        if (activeCategory === "All") return articles;
        return articles.filter((a) => (a?.category || "") === activeCategory);
    }, [activeCategory, articles]);

    return (
        <>
            <Header />
            <main className="relative min-h-screen bg-[var(--background)] pt-20 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
                {/* Professional Background with Navy Blue Accents */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    {/* Subtle navy blue orbs */}
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#1e3a8a]/8 rounded-full blur-3xl anim-orbit" />
                    <div className="absolute top-1/4 -right-40 w-80 h-80 bg-[#1e40af]/6 rounded-full blur-3xl anim-floaty" />
                    <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-[#2563eb]/5 rounded-full blur-3xl anim-drift" />

                    {/* Subtle grid pattern for professional feel */}
                    <div className="absolute inset-0 opacity-[0.015]" style={{
                        backgroundImage: `linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-visible">
                    {/* Professional Hero Section */}
                    <div className="mb-12 sm:mb-20">
                        <div className="text-center max-w-4xl mx-auto animate-fadeInUp">
                            {/* Premium Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-[#1e3a8a]/10 shadow-lg shadow-[#1e3a8a]/5 mb-6 sm:mb-8">
                                <Sparkles size={14} className="text-[#1e3a8a]" />
                                <span className="text-[10px] sm:text-xs font-bold text-[#1e3a8a] uppercase tracking-wider">
                                    Industry Insights & Thought Leadership
                                </span>
                                <TrendingUp size={14} className="text-[#1e3a8a]" />
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-4 sm:mb-8 leading-tight">
                                Discover{" "}
                                <span className="bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#2563eb] bg-clip-text text-transparent">
                                    Trending Topics
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className="text-sm sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-10 max-w-3xl mx-auto">
                                Stay ahead of the curve with curated insights on technologies shaping the B2B landscape.
                            </p>

                            {/* CTA and Stats */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-12">
                                <button className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#1e3a8a]/20 overflow-hidden">
                                    <span className="relative z-10">Explore All Topics</span>
                                    <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af] to-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>

                                <div className="flex items-center gap-4 sm:gap-6 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Users size={16} className="text-[#1e3a8a]" />
                                        <span className="font-semibold whitespace-nowrap">50K+ Readers</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <BookOpen size={16} className="text-[#1e3a8a]" />
                                        <span className="font-semibold whitespace-nowrap">500+ Articles</span>
                                    </div>
                                </div>
                            </div>

                            {/* Category Quick Links - Ultra Compact for Mobile */}
                            <div className="flex sm:grid sm:grid-cols-5 gap-2 sm:gap-4 max-w-4xl mx-auto overflow-x-auto sm:overflow-visible pb-2 scrollbar-none animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                                {Object.entries(CATEGORY_STYLES).map(([category, style], i) => {
                                    const IconComponent = style.icon;
                                    return (
                                        <div
                                            key={category}
                                            className="group relative shrink-0 bg-white/70 backdrop-blur-md rounded-lg sm:rounded-2xl px-3 py-2 sm:p-5 border border-white/60 shadow-sm sm:shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white cursor-pointer flex items-center sm:flex-col gap-2 sm:gap-0 justify-center overflow-hidden"
                                            style={{ animationDelay: `${i * 50}ms` }}
                                        >
                                            <div className={`absolute inset-0 rounded-lg sm:rounded-2xl bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity -z-10`} />

                                            <div className={`shrink-0 w-6 h-6 sm:w-12 sm:h-12 rounded-md sm:rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center sm:mb-3 group-hover:scale-110 transition-transform`}>
                                                <IconComponent className="text-white w-3 h-3 sm:w-6 sm:h-6" />
                                            </div>
                                            <span className="font-bold text-[9px] sm:text-xs text-gray-800 truncate whitespace-nowrap">{category}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Category Selector - Dropdown on Mobile, Switcher on Desktop */}
                    <div className="relative mb-12 sm:mb-16 animate-fadeInUp px-4 sm:px-0 overflow-visible" style={{ animationDelay: '200ms' }}>
                        {/* Mobile Dropdown */}
                        <div className="block sm:hidden max-w-md mx-auto relative z-[9999] overflow-visible">
                            <CategoryDropdown
                                options={CATEGORIES}
                                activeOption={activeCategory}
                                onChange={setActiveCategory}
                            />
                        </div>

                        {/* Desktop Switcher */}
                        <div className="hidden sm:flex justify-center">
                            <Switcher
                                options={CATEGORIES}
                                activeOption={activeCategory}
                                onChange={setActiveCategory}
                            />
                        </div>
                    </div>

                    {/* Featured Article - Premium Design */}
                    {activeCategory === "All" && featuredArticle && (
                        <div className="group relative mb-20 overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-700 hover:shadow-[#1e3a8a]/10 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                            {/* Navy blue accent border on hover */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10" />

                            <div className="flex flex-col lg:flex-row">
                                {/* Image Section */}
                                <div className="relative lg:w-1/2 h-[400px] lg:h-auto overflow-hidden">
                                    <Image
                                        src={featuredArticle.image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80"}
                                        alt={featuredArticle.title || "Featured"}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        unoptimized={unoptimized}
                                    />
                                    {/* Professional overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-gray-900/80" />

                                    {/* Featured Badge */}
                                    <div className="absolute top-6 left-6">
                                        <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] rounded-xl font-bold text-xs text-white shadow-lg overflow-hidden">
                                            <Sparkles size={14} />
                                            <span className="relative z-10 uppercase tracking-wider">Featured Article</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="lg:w-1/2 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
                                    <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
                                        <span className={`px-3 py-1 bg-gradient-to-r ${(CATEGORY_STYLES[(featuredArticle.category as keyof typeof CATEGORY_STYLES)] || CATEGORY_STYLES["Trending Topic"]).gradient} text-white text-[10px] sm:text-xs font-bold uppercase rounded-lg`}>
                                            {featuredArticle.category}
                                        </span>
                                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={12} />
                                                {featuredArticle.publishDate || ""}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Eye size={12} />
                                                {""}
                                            </span>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
                                        {featuredArticle.title}
                                    </h2>

                                    <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed line-clamp-3 sm:line-clamp-none">
                                        {featuredArticle.excerpt}
                                    </p>

                                    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6">
                                        <Link
                                            href={`/blog/${featuredArticle.slug || featuredArticle._id}`}
                                            className="w-full sm:w-auto group/btn inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#1e3a8a]/20"
                                        >
                                            Read Full Article
                                            <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                        </Link>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center text-white font-bold">
                                                {(featuredArticle.author || "A").charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{featuredArticle.author || ""}</p>
                                                <p className="text-xs text-gray-500">{featuredArticle.readTime || ""}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Professional Article Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {filteredArticles.filter((a) => activeCategory !== "All" || a !== featuredArticle).map((article, index) => {
                            const categoryStyle =
                                CATEGORY_STYLES[article.category as keyof typeof CATEGORY_STYLES] ||
                                CATEGORY_STYLES["Trending Topic"];
                            const CategoryIcon = categoryStyle.icon;

                            return (
                                <Link
                                    key={article.slug || article._id || String(index)}
                                    href={`/blog/${article.slug || article._id}`}
                                    className="group animate-fadeInUp"
                                    style={{ animationDelay: `${index * 80}ms` }}
                                >
                                    <div className="relative h-full bg-white rounded-3xl border border-gray-100 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-[#1e3a8a]/10 hover:-translate-y-2 cursor-pointer overflow-hidden">
                                        {/* Professional glow on hover */}
                                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${categoryStyle.gradient} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity -z-10`} />

                                        {/* Image */}
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={article.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"}
                                                alt={article.title || "Article"}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                unoptimized={unoptimized}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />

                                            {/* Category badge with icon */}
                                            <div className="absolute top-4 left-4">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${categoryStyle.gradient} text-white text-xs font-bold uppercase rounded-lg shadow-lg`}>
                                                    <CategoryIcon size={14} />
                                                    {article.category}
                                                </div>
                                            </div>

                                            {/* Views badge */}
                                            <div className="absolute bottom-4 right-4">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-lg">
                                                    <Eye size={12} />
                                                    {""}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Meta Info */}
                                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={13} />
                                                    {article.publishDate || ""}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock size={12} />
                                                    {article.readTime || ""}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#1e3a8a] transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                                                {article.excerpt}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                                                {/* Author */}
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${categoryStyle.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                                                        {(article.author || "A").charAt(0)}
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-700">
                                                        {(article.author || "").split(' ')[0] || ""}
                                                    </span>
                                                </div>

                                                {/* Read Button */}
                                                <button className={`w-10 h-10 rounded-full bg-gradient-to-br ${categoryStyle.gradient} flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-45`}>
                                                    <ArrowUpRight size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Professional CTA Section */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] p-12 lg:p-16 text-center shadow-2xl animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                        {/* Professional background patterns */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
                            <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-white rounded-full" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-full" />
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
                                <Zap size={32} className="text-yellow-300" />
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                Stay Ahead of the Curve
                            </h2>

                            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                                Join 50,000+ B2B professionals receiving curated technology insights and industry analysis every week.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button className="w-full sm:w-auto group/cta bg-white text-[#1e3a8a] px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center justify-center gap-2">
                                    Subscribe to Newsletter
                                    <ArrowRight size={20} className="group-hover/cta:translate-x-1 transition-transform" />
                                </button>
                                <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:bg-white/20 transition-all duration-300">
                                    Browse Archive
                                </button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-white/90 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span>Weekly Updates</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span>Expert Analysis</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span>Free Forever</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                
                @keyframes orbit {
                    0%, 100% {
                        transform: translate(0, 0);
                    }
                    25% {
                        transform: translate(20px, -20px);
                    }
                    50% {
                        transform: translate(-10px, 10px);
                    }
                    75% {
                        transform: translate(15px, 15px);
                    }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
                
                .animate-shimmer::after {
                    animation: shimmer 3s infinite;
                }
                
                .anim-orbit {
                    animation: orbit 20s ease-in-out infinite;
                }
            `}</style>
        </>
    );
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}
