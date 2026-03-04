"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/header-3";
import Footer from "@/components/footer";

import NewsletterSubscription from "@/components/ui/newsletter-subscription";
import { ShareModal } from "@/components/ui/share-modal";
import AuthModal from "@/components/ui/auth-modal";
import { CategoryDropdown } from "@/components/ui/category-dropdown";
import Link from "next/link";
import {
    Search,
    TrendingUp,
    Clock,
    User,
    PenSquare,
    Sparkles,
    Eye,
    Heart,
    MessageCircle,
    Calendar,
    ArrowRight,
    Share2,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Check,
    Headset,
    Layers,
    BarChart3,
    Flame,
    Grid3x3,
    Cpu,
    Users,
    Megaphone,
    Crown,
    X,
    Filter,
    ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Utility function to format dates consistently
const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch {
        return 'Recently';
    }
};

const categories = [
    { value: "All", label: "All Categories", icon: Grid3x3 },
    { value: "Trending", label: "Trending Topics", icon: Flame },
    { value: "FinTeq", label: "FinTeq", icon: BarChart3 },
    { value: "HRTeq", label: "HRTeq", icon: Users },
    { value: "CXTeq", label: "CXTeq", icon: Headset },
    { value: "MarTeq", label: "MarTeq", icon: Megaphone },
];

const sortOptions = [
    { value: "latest", label: "Latest First", icon: Clock, description: "Newest articles" },
    { value: "popular", label: "Most Popular", icon: TrendingUp, description: "Most viewed" },
    { value: "trending", label: "Trending Now", icon: Sparkles, description: "Rising topics" }
];

// Placeholder data for demonstration
const MOCK_POSTS = [
    {
        id: 1,
        title: "The Future of AI in Enterprise Resource Planning",
        slug: "future-of-ai-erp",
        excerpt: "Discover how machine learning is revolutionizing the way large organizations manage their resources and data pipelines.",
        category: "AI & ML",
        date: "2024-03-20",
        author: "Alex Rivers",
        authorSlug: "alex-rivers",
        readTime: "8 min read",
        views: 1240,
        likes: 85,
        comments: 12,
        trending: true,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Building Customer Loyalty in the Digital Age",
        slug: "digital-customer-loyalty",
        excerpt: "Strategies for high-growth tech companies to maintain meaningful connections with their users beyond the initial sale.",
        category: "CXTeq",
        date: "2024-03-18",
        author: "Sarah Chen",
        authorSlug: "sarah-chen",
        readTime: "6 min read",
        views: 940,
        likes: 120,
        comments: 8,
        trending: false,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "The Evolution of Remote Work Culture",
        slug: "remote-work-evolution",
        excerpt: "How leadership teams are adapting to the permanent shift in global workforce distribution and employee expectations.",
        category: "Leadership",
        date: "2024-03-15",
        author: "Jordan Smith",
        authorSlug: "jordan-smith",
        readTime: "5 min read",
        views: 2100,
        likes: 340,
        comments: 45,
        trending: true,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
    }
];

export default function CommunityPage() {
    const [blogPosts, setBlogPosts] = useState<any[]>(MOCK_POSTS);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authModalMode, setAuthModalMode] = useState<"login" | "signup">("login");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
    const [showShareModal, setShowShareModal] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<"latest" | "popular" | "trending">("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) setIsAuthenticated(true);
            } catch (err) {
                console.log("Auth check failed (expected if not logged in)");
            }
        };
        checkAuth();
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [selectedCategory, sortBy, searchQuery]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                category: selectedCategory,
                sort: sortBy,
                q: searchQuery
            });
            const response = await fetch(`/api/community/posts?${params.toString()}`);
            const data = await response.json();
            if (data.success && data.posts && data.posts.length > 0) {
                setBlogPosts(data.posts);
            } else {
                // Keep mock posts if nothing found or API fails/returns empty
                console.log("Using mock data as API returned empty or failed");
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(blogPosts.length / postsPerPage);
    const paginatedPosts = blogPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    const trendingPosts = blogPosts.filter(post => post.trending).slice(0, 3);

    return (
        <div className="min-h-screen bg-[#F0F8FF] text-[#000000] transition-colors duration-300">
            {/* Header */}
            <Header />

            {/* Hero Section - The Innovation Hub */}
            <section className="relative overflow-hidden pt-24 pb-16 lg:pt-36 lg:pb-24 bg-white selection:bg-[#1e3a8a]/10">
                {/* 🌊 Advanced Mesh Gradient Background */}
                <div className="absolute inset-0 -z-10 bg-white">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1e3a8a]/5 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#1e40af]/3 rounded-full blur-[150px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.02),transparent_70%)]" />
                </div>

                {/* 🧊 Floating Decorative Glass Elements (Synced with Global CSS) */}
                <div className="absolute top-40 left-[10%] hidden xl:block anim-floaty">
                    <div className="h-16 w-16 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl flex items-center justify-center rotate-12">
                        <Cpu className="h-8 w-8 text-[#1e3a8a]/40" />
                    </div>
                </div>
                <div className="absolute top-60 right-[15%] hidden xl:block anim-floaty [animation-delay:1s]">
                    <div className="h-20 w-20 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl flex items-center justify-center -rotate-12">
                        <Sparkles className="h-10 w-10 text-[#1e40af]/30" />
                    </div>
                </div>
                <div className="absolute bottom-40 left-[15%] hidden xl:block anim-floaty [animation-delay:2s]">
                    <div className="h-12 w-12 rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl flex items-center justify-center rotate-45">
                        <Layers className="h-6 w-6 text-[#1e3a8a]/30" />
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
                    {/* Badge */}
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#1e3a8a]/10 bg-white shadow-[0_4px_20px_rgba(30,58,138,0.05)] px-4 py-1.5 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 group cursor-default">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#1e3a8a] animate-ping" />
                        <span className="text-[9px] font-black text-[#1e3a8a] uppercase tracking-[0.3em]">The Global Exchange</span>
                    </div>

                    {/* Main Title - Clean & Editorial */}
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#1e1e1e] mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 leading-tight">
                        Insights that <span className="text-[#1e3a8a]">shape the future</span>
                    </h1>

                    {/* Description */}
                    <p className="mx-auto max-w-2xl text-base md:text-lg font-medium text-slate-500 mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Join an elite circle of 10,000+ technology pioneers. <br className="hidden md:block" />
                        Share high-impact insights on AI & Enterprise Strategy.
                    </p>

                    {/* Action Hub - Elite Button Interactions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
                        {isAuthenticated ? (
                            <Link
                                href="/community/write"
                                className="group relative overflow-hidden rounded-xl bg-[#1e3a8a] px-8 py-4 text-sm font-black shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-95"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                                <span className="relative flex items-center gap-2 !text-white">
                                    <PenSquare className="h-4 w-4 transition-transform group-hover:rotate-6 !text-white" />
                                    <span className="uppercase tracking-widest !text-white">Start Contributing</span>
                                </span>
                            </Link>
                        ) : (
                            <button
                                onClick={() => {
                                    setAuthModalMode("signup");
                                    setShowAuthModal(true);
                                }}
                                className="group relative overflow-hidden rounded-xl bg-[#1e3a8a] px-8 py-4 text-sm font-black shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-95"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                                <span className="relative flex items-center gap-2 !text-white">
                                    <PenSquare className="h-4 w-4 transition-transform group-hover:rotate-6 !text-white" />
                                    <span className="uppercase tracking-widest !text-white">Start Contributing</span>
                                </span>
                            </button>
                        )}

                        <button className="group relative flex items-center gap-2 rounded-xl border border-[#1e3a8a]/20 bg-white px-8 py-4 text-sm font-black text-[#1e3a8a] shadow-sm transition-all duration-300 hover:bg-slate-50 hover:border-[#1e3a8a]/40 hover:scale-[1.03] active:scale-95">
                            <span className="uppercase tracking-widest">Browse Topics</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                    {/* Contributing Blueprint - Filling the whitespace */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                        {[
                            {
                                step: "01",
                                title: "Craft Content",
                                desc: "Share your unique perspective on emerging technology and market shifts.",
                                icon: PenSquare,
                                color: "from-blue-500/20 to-blue-600/20"
                            },
                            {
                                step: "02",
                                title: "Expert Review",
                                desc: "Our editorial board ensures your insights meet the highest industry standards.",
                                icon: Sparkles,
                                color: "from-[#1e3a8a]/20 to-[#1e40af]/20"
                            },
                            {
                                step: "03",
                                title: "Global Impact",
                                desc: "Reach thousands of global decision-makers and C-suite executives.",
                                icon: TrendingUp,
                                color: "from-blue-600/20 to-blue-700/20"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group/card relative rounded-[2rem] bg-white border border-[#1e3a8a]/5 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#1e3a8a]/20 hover:shadow-[0_20px_50px_rgba(30,58,138,0.1)] active:scale-[0.98]">
                                <div className="absolute top-6 right-6 text-3xl font-black text-[#1e3a8a]/5 group-hover/card:text-[#1e3a8a]/10 transition-colors uppercase tracking-tighter">{item.step}</div>
                                <div className={cn(
                                    "mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-500",
                                    "bg-slate-50 text-[#1e3a8a] group-hover/card:scale-110 group-hover/card:bg-[#1e3a8a] group-hover/card:text-white"
                                )}>
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-base font-black uppercase tracking-widest text-[#1e1e1e] mb-2">{item.title}</h3>
                                <p className="text-xs font-medium text-slate-500/80 leading-relaxed">{item.desc}</p>
                                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 rounded-[2rem] -z-10 pointer-events-none" />
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Stats Banner */}
                    <div className="mt-12 flex flex-wrap justify-center gap-10 border-t border-[#1e3a8a]/5 pt-8 opacity-50">
                        {[
                            { label: "Contributors", value: "10K+" },
                            { label: "Weekly Insights", value: "500+" },
                            { label: "Active Topics", value: "48" }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span className="text-xl font-black text-[#1e3a8a]">{stat.value}</span>
                                <span className="text-[8px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Filters & Search (The Control Center) */}
            <section className="sticky top-20 z-40 py-4 transition-all">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative group overflow-visible rounded-[2rem] border border-white/90 bg-white/10 p-1.5 shadow-[0_20px_60px_rgba(30,58,138,0.1)] backdrop-blur-[30px] border-solid">
                        {/* High-end decorative accents */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1e3a8a]/40 to-transparent" />
                        <div className="absolute -inset-1 bg-gradient-to-br from-[#1e3a8a]/5 to-transparent rounded-[3.2rem] -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">

                            {/* Topic Selection Engine */}
                            <div className="w-full lg:w-[240px] shrink-0">
                                <CategoryDropdown
                                    options={categories}
                                    activeOption={selectedCategory}
                                    onChange={(val) => {
                                        setSelectedCategory(val);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>

                            {/* Integrated Research Console (Search + Sort) */}
                            <div className="flex flex-1 flex-col md:flex-row items-center gap-2 w-full bg-white/60 p-1 rounded-[1.5rem] border border-white shadow-[inset_0_1px_4px_rgba(0,0,0,0.01)]">

                                {/* Optimized Search Core */}
                                <div className="relative flex-1 group/search w-full">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                                        <Search className="h-3.5 w-3.5 text-[#1e3a8a]/40 group-focus-within/search:text-[#1e3a8a] transition-all" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Filter insights..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full rounded-xl border-none bg-transparent py-2.5 pl-10 pr-10 text-[11px] font-black text-[#1e3a8a] outline-none placeholder:text-[#1e3a8a]/20 uppercase tracking-wider"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#1e3a8a]/5 text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white transition-all transform hover:rotate-90 shadow-sm"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>

                                {/* Visual Separator */}
                                <div className="h-6 w-px bg-[#1e3a8a]/5 hidden md:block" />

                                {/* Smart Sorting Module */}
                                <div className="relative w-full md:w-auto">
                                    <button
                                        onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                                        className={cn(
                                            "flex w-full md:min-w-[170px] items-center justify-between gap-3 rounded-xl px-4 py-2.5 transition-all duration-500",
                                            isSortDropdownOpen
                                                ? "bg-[#1e3a8a] text-white shadow-[0_10px_30px_rgba(30,58,138,0.2)]"
                                                : "bg-[#1e3a8a]/5 text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white group/sort"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "flex h-6 w-6 items-center justify-center rounded-lg transition-all duration-500",
                                                isSortDropdownOpen ? "bg-white/20" : "bg-white shadow-sm group-hover/sort:bg-white/20"
                                            )}>
                                                <Filter className={cn("h-3 w-3", isSortDropdownOpen ? "text-white" : "text-[#1e3a8a]")} />
                                            </div>
                                            <span className={cn("text-[10px] font-black uppercase tracking-widest", isSortDropdownOpen ? "text-white" : "text-[#1e3a8a]")}>
                                                {sortOptions.find(o => o.value === sortBy)?.label}
                                            </span>
                                        </div>
                                        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-700", isSortDropdownOpen && "rotate-180")} />
                                    </button>

                                    {isSortDropdownOpen && (
                                        <div
                                            className="absolute right-0 mt-3 w-64 rounded-[1.8rem] border border-white/90 bg-white/95 backdrop-blur-[30px] p-2 shadow-[0_30px_80px_rgba(30,58,138,0.2)] animate-in fade-in slide-in-from-top-4 duration-500 z-50 border-solid"
                                        >
                                            <div className="mb-2 px-4 py-1.5 border-b border-[#1e3a8a]/5">
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#1e3a8a]/30">Sort</span>
                                            </div>
                                            <div className="space-y-1">
                                                {sortOptions.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => {
                                                            setSortBy(opt.value as any);
                                                            setIsSortDropdownOpen(false);
                                                            setCurrentPage(1);
                                                        }}
                                                        className={cn(
                                                            "group/opt flex w-full items-center gap-3 rounded-[1.2rem] px-3 py-2.5 text-left transition-all duration-300",
                                                            sortBy === opt.value
                                                                ? "bg-[#1e3a8a] text-white shadow-xl shadow-[#1e3a8a]/20"
                                                                : "text-slate-500 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a]"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300",
                                                            sortBy === opt.value ? "bg-white/10" : "bg-slate-50 group-hover/opt:bg-white"
                                                        )}>
                                                            <opt.icon className={cn("h-4 w-4", sortBy === opt.value ? "text-white" : "text-[#1e3a8a]/40 group-hover/opt:text-[#1e3a8a]")} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">{opt.label}</span>
                                                            <span className={cn(
                                                                "text-[8px] font-bold uppercase tracking-tight leading-none mt-1 opacity-60",
                                                                sortBy === opt.value ? "text-white" : "text-slate-400"
                                                            )}>{opt.description}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feed Section */}
            <main className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Feed Main Column */}
                        <div className="lg:col-span-8 space-y-10">
                            {paginatedPosts.map((post, idx) => (
                                <article
                                    key={post.id}
                                    className="group relative flex flex-col md:flex-row gap-8 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#1e3a8a]/20"
                                >
                                    {/* Article Image Container */}
                                    <div className="relative w-full md:w-72 shrink-0 overflow-hidden rounded-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/20 to-transparent z-10" />
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute bottom-4 left-4 z-20">
                                            <span className="inline-block rounded-lg bg-[#1e3a8a]/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md shadow-lg">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Article Content */}
                                    <div className="flex flex-col py-2">
                                        <div className="mb-4 flex items-center gap-3">
                                            <Link
                                                href={`/community/author/${post.authorSlug}`}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="h-8 w-8 rounded-full border-2 border-white shadow-md" style={{ backgroundImage: `url('https://i.pravatar.cc/100?u=${post.authorSlug}')`, backgroundSize: 'cover' }}></div>
                                                <span className="text-sm font-bold text-[#1e3a8a]">{post.author}</span>
                                            </Link>
                                            <span className="text-[#1e3a8a]/20">•</span>
                                            <span className="text-[10px] font-black text-[#1e3a8a]/40 uppercase tracking-widest">{formatDate(post.date)}</span>
                                        </div>

                                        <Link href={`/community/${post.slug}`}>
                                            <h2 className="mb-4 text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-[#000000] transition-colors group-hover:text-[#1e3a8a]">
                                                {post.title}
                                            </h2>
                                        </Link>

                                        <p className="mb-8 text-[#000000]/60 line-clamp-2 text-base leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-6">
                                                <button
                                                    onClick={() => {
                                                        const fresh = new Set(likedPosts);
                                                        fresh.has(post.id) ? fresh.delete(post.id) : fresh.add(post.id);
                                                        setLikedPosts(fresh);
                                                    }}
                                                    className={cn(
                                                        "flex items-center gap-2 text-xs font-black transition-all",
                                                        likedPosts.has(post.id) ? "text-rose-600" : "text-[#1e3a8a]/40 hover:text-[#1e3a8a]"
                                                    )}
                                                >
                                                    <Heart className={cn("h-4 w-4", likedPosts.has(post.id) && "fill-current")} />
                                                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                                                </button>
                                                <div className="flex items-center gap-2 text-xs font-black text-[#1e3a8a]/40">
                                                    <MessageCircle className="h-4 w-4" />
                                                    {post.comments}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-black text-[#1e3a8a]/40">
                                                    <Clock className="h-4 w-4" />
                                                    {post.readTime}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setShowShareModal(post.id)}
                                                className="h-10 w-10 flex items-center justify-center rounded-xl bg-white text-[#1e3a8a]/40 border border-[#1e3a8a]/10 shadow-sm transition-all hover:bg-[#1e3a8a] hover:text-white hover:scale-110 active:scale-90"
                                            >
                                                <Share2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}

                            {/* Pagination */}
                            <div className="mt-16 flex items-center justify-center gap-4">
                                <button className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/40 px-6 py-3 text-xs font-black text-[#1e3a8a] transition-all hover:bg-white hover:shadow-lg disabled:opacity-30">
                                    <ChevronLeft className="h-4 w-4" />
                                    PREV
                                </button>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3].map(p => (
                                        <button key={p} className={cn(
                                            "h-10 w-10 rounded-xl text-xs font-black transition-all",
                                            p === 1 ? "bg-[#1e3a8a] text-white shadow-lg" : "text-[#1e3a8a]/40 hover:bg-white"
                                        )}>{p}</button>
                                    ))}
                                </div>
                                <button className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/40 px-6 py-3 text-xs font-black text-[#1e3a8a] transition-all hover:bg-white hover:shadow-lg">
                                    NEXT
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <aside className="lg:col-span-4 space-y-10">

                            {/* Write for Us Card */}
                            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] p-8 text-white shadow-2xl">
                                <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>
                                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
                                <div className="relative">
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                                        <PenSquare className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="mb-4 text-2xl font-extrabold tracking-tight">Share Your Voice</h3>
                                    <p className="mb-8 text-sm leading-relaxed text-blue-100/80 font-medium">
                                        Have deep insights into technology? Join our global contributor network
                                        and reach 50,000+ monthly decision makers.
                                    </p>
                                    {isAuthenticated ? (
                                        <Link
                                            href="/community/write"
                                            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-black text-[#1e3a8a] shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Open Studio Editor
                                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setAuthModalMode("signup");
                                                setShowAuthModal(true);
                                            }}
                                            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-black text-[#1e3a8a] shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Open Studio Editor
                                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Trending Column */}
                            <div className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
                                <h3 className="mb-8 flex items-center gap-3 text-xl font-black text-[#1e3a8a] uppercase tracking-tighter">
                                    <TrendingUp className="h-6 w-6 text-[#1e3a8a]" />
                                    Hot Insights
                                </h3>
                                <div className="space-y-8">
                                    {trendingPosts.map((post, i) => (
                                        <Link key={post.id} href={`/community/${post.slug}`} className="group block">
                                            <div className="flex gap-4">
                                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1e3a8a]/5 text-sm font-black text-[#1e3a8a]/40 transition-all group-hover:bg-[#1e3a8a] group-hover:text-white">
                                                    0{i + 1}
                                                </span>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-extrabold leading-snug text-[#000000] group-hover:text-[#1e3a8a] transition-colors">
                                                        {post.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-[#1e3a8a]/40">
                                                        <span>{post.views} VIEWS</span>
                                                        <span className="text-[#1e3a8a]/20">•</span>
                                                        <span className="text-[#1e3a8a]">{post.category}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar Ad/Newsletter */}
                            <NewsletterSubscription />

                            {/* Tags Cloud */}
                            <div className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
                                <h3 className="mb-6 text-xl font-black text-[#1e3a8a] uppercase tracking-tighter">Top Topics</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["SaaS", "Data Privacy", "Web3", "MarTech", "Remote Operations", "Sustainability", "Cloud Native", "DevOps"].map(tag => (
                                        <button key={tag} className="rounded-xl border border-white/60 bg-white/40 px-3 py-2 text-xs font-black text-[#1e3a8a] transition-all hover:bg-[#1e3a8a] hover:text-white shadow-sm">
                                            #{tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </aside>
                    </div>
                </div>
            </main>

            {/* Modals */}
            {showAuthModal && (
                <AuthModal
                    onClose={() => setShowAuthModal(false)}
                    onSuccess={() => {
                        setShowAuthModal(false);
                        setIsAuthenticated(true);
                        router.push("/community/write");
                    }}
                    initialMode={authModalMode}
                />
            )}
            {showShareModal !== null && (() => {
                const post = blogPosts.find(p => p.id === showShareModal);
                return post ? (
                    <ShareModal
                        eventTitle={post.title}
                        eventDescription={post.excerpt}
                        eventUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/community/${post.slug}`}
                        onClose={() => setShowShareModal(null)}
                    />
                ) : null;
            })()}

            {/* Footer */}
            <Footer />
        </div>
    );
}
