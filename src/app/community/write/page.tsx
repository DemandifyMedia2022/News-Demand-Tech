"use client";

import React, { useState, useEffect } from "react";
import {
    X, Save, Eye, PenSquare, Image as ImageIcon, Tag, Type,
    Sparkles, Loader2, Check, ArrowUpRight,
    Globe, Search, Settings, ChevronLeft,
    Layers, Hash, Terminal, LayoutDashboard, FileText, ListChecks, Clock, User, BarChart,
    Bold, Italic, Link2, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header-3";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

export default function WritePage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "AI & ML",
        subcategory: "",
        authorAttribution: "",
        excerpt: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        tags: "",
        featuredImage: ""
    });

    const [isPublishing, setIsPublishing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState<"dashboard" | "step1" | "step2" | "preview">("dashboard");

    const categories = ["AI & ML", "HRTeq", "CXTeq", "Marketing", "Technology", "Leadership"];

    // Mock dashboard submissions data
    const mockSubmissions = [
        { id: 1, title: "The Future of AI in Enterprise Resource Planning", status: "Published", date: "Mar 1, 2026", type: "Insight" },
        { id: 2, title: "Building Customer Loyalty in the Digital Age", status: "Under Review", date: "Mar 2, 2026", type: "Case Study" },
        { id: 3, title: "Draft: Web3 in FinTeq", status: "Draft", date: "Mar 2, 2026", type: "Insight" }
    ];

    // Auth Protection
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    router.push("/community");
                }
            } catch (err) {
                router.push("/community");
            }
        };
        checkAuth();
    }, [router]);

    // Auto-generate slug from title
    useEffect(() => {
        if (formData.title) {
            const suggestedSlug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setFormData(prev => ({ ...prev, slug: suggestedSlug }));
        }
    }, [formData.title]);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-[#F0F8FF] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#1e3a8a] animate-pulse flex items-center justify-center">
                        <Terminal className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1e3a8a]/40">Initializing Studio...</p>
                </div>
            </div>
        );
    }

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPublishing(true);

        // Simulate API call
        setTimeout(() => {
            setIsPublishing(false);
            setIsSuccess(true);
            setTimeout(() => {
                window.location.href = "/community";
            }, 2000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#F0F8FF] text-[#000000] selection:bg-[#1e3a8a]/10">
            <Header />

            {/* Premium Mesh Gradient Background */}
            <div className="fixed inset-0 -z-10 bg-[#F0F8FF]">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.02),transparent_70%)]" />
            </div>

            <main className="relative pt-36 pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Top Bar / Breadcrumb */}
                    <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <button
                                onClick={() => router.back()}
                                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-[#1e3a8a]/10 text-[#1e3a8a] transition-all hover:bg-[#1e3a8a] hover:text-white"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-black uppercase tracking-tighter text-[#1e3a8a]">Studio Editor</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Creation Laboratory • Environment Active</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-2xl bg-white border border-[#1e3a8a]/10 px-8 py-3.5 text-[10px] font-black text-[#1e3a8a] transition-all hover:bg-[#1e3a8a]/5 uppercase tracking-widest shadow-sm">
                                <Save className="h-4 w-4" />
                                Save Draft
                            </button>
                            <button
                                onClick={handlePublish}
                                disabled={isPublishing || isSuccess}
                                className={cn(
                                    "flex-1 md:flex-none group relative flex items-center gap-2 overflow-hidden rounded-2xl px-10 py-3.5 text-[10px] font-black text-white transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest shadow-xl shadow-[#1e3a8a]/20",
                                    isSuccess ? "bg-green-600" : "bg-[#1e3a8a]"
                                )}
                            >
                                {isPublishing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : isSuccess ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Sparkles className="h-4 w-4" />
                                )}
                                {isPublishing ? "Syncing..." : isSuccess ? "Published" : "Deploy Insight"}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-3 space-y-4">
                            <div className="sticky top-32 space-y-3">
                                {activeTab === "dashboard" ? (
                                    <>
                                        {/* Dashboard Links */}
                                        <button
                                            onClick={() => setActiveTab("dashboard")}
                                            className="flex w-full items-center gap-4 rounded-3xl p-5 transition-all duration-500 border bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-2xl shadow-[#1e3a8a]/30"
                                        >
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-500 bg-white/20">
                                                <LayoutDashboard className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-[11px] font-black uppercase tracking-widest">Overview</div>
                                                <div className="text-[9px] font-bold uppercase tracking-tighter opacity-60 text-white">Status & Activity</div>
                                            </div>
                                        </button>

                                        <button
                                            className="flex w-full items-center gap-4 rounded-3xl p-5 transition-all duration-500 border glass-premium text-slate-500 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a] border-transparent"
                                        >
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-500 bg-[#1e3a8a]/5">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-[11px] font-black uppercase tracking-widest">My Insights</div>
                                                <div className="text-[9px] font-bold uppercase tracking-tighter opacity-60 text-slate-400">Manage Drafts</div>
                                            </div>
                                        </button>

                                        <button
                                            className="flex w-full items-center gap-4 rounded-3xl p-5 transition-all duration-500 border glass-premium text-slate-500 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a] border-transparent"
                                        >
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-500 bg-[#1e3a8a]/5">
                                                <BarChart className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-[11px] font-black uppercase tracking-widest">Performance</div>
                                                <div className="text-[9px] font-bold uppercase tracking-tighter opacity-60 text-slate-400">Views & Reach</div>
                                            </div>
                                        </button>

                                        <button
                                            className="flex w-full items-center gap-4 rounded-3xl p-5 transition-all duration-500 border glass-premium text-slate-500 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a] border-transparent"
                                        >
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-500 bg-[#1e3a8a]/5">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-[11px] font-black uppercase tracking-widest">Author Profile</div>
                                                <div className="text-[9px] font-bold uppercase tracking-tighter opacity-60 text-slate-400">Bio & Credentials</div>
                                            </div>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/* Editor Mode Header/Back Link */}
                                        <button
                                            onClick={() => setActiveTab("dashboard")}
                                            className="group flex w-full items-center gap-3 rounded-2xl p-4 transition-all duration-300 hover:bg-[#1e3a8a]/5 text-slate-500 hover:text-[#1e3a8a] mb-2"
                                        >
                                            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                                            <span className="text-[11px] font-black uppercase tracking-widest">Exit to Dashboard</span>
                                        </button>

                                        <div className="pb-2 px-2 flex items-center gap-3 opacity-60">
                                            <div className="h-px flex-1 bg-slate-300"></div>
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#1e3a8a]">Active Protocol</span>
                                            <div className="h-px flex-1 bg-slate-300"></div>
                                        </div>

                                        <button
                                            onClick={() => setActiveTab("step1")}
                                            className={cn(
                                                "flex w-full items-center gap-4 rounded-3xl p-5 transition-all duration-500 border",
                                                activeTab === "step1"
                                                    ? "bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-2xl shadow-[#1e3a8a]/30"
                                                    : "glass-premium text-slate-500 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a] border-transparent"
                                            )}
                                        >
                                            <div className={cn(
                                                "flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-500",
                                                activeTab === "step1" ? "bg-white/20" : "bg-[#1e3a8a]/5"
                                            )}>
                                                <Settings className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-[11px] font-black uppercase tracking-widest">Step 1</div>
                                                <div className={cn("text-[9px] font-bold uppercase tracking-tighter opacity-60", activeTab === "step1" ? "text-white" : "text-slate-400")}>Metadata & Config</div>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setActiveTab("step2")}
                                            className={cn(
                                                "flex w-full items-center gap-4 rounded-3xl p-5 transition-all duration-500 border",
                                                activeTab === "step2"
                                                    ? "bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-2xl shadow-[#1e3a8a]/30"
                                                    : "glass-premium text-slate-500 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a] border-transparent"
                                            )}
                                        >
                                            <div className={cn(
                                                "flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-500",
                                                activeTab === "step2" ? "bg-white/20" : "bg-[#1e3a8a]/5"
                                            )}>
                                                <PenSquare className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-[11px] font-black uppercase tracking-widest">Step 2</div>
                                                <div className={cn("text-[9px] font-bold uppercase tracking-tighter opacity-60", activeTab === "step2" ? "text-white" : "text-slate-400")}>Write Insight Content</div>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setActiveTab("preview")}
                                            className={cn(
                                                "flex w-full items-center gap-4 rounded-3xl p-5 transition-all duration-500 border",
                                                activeTab === "preview"
                                                    ? "bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-2xl shadow-[#1e3a8a]/30"
                                                    : "glass-premium text-slate-500 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a] border-transparent"
                                            )}
                                        >
                                            <div className={cn(
                                                "flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-500",
                                                activeTab === "preview" ? "bg-white/20" : "bg-[#1e3a8a]/5"
                                            )}>
                                                <Eye className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-[11px] font-black uppercase tracking-widest">Final Review</div>
                                                <div className={cn("text-[9px] font-bold uppercase tracking-tighter opacity-60", activeTab === "preview" ? "text-white" : "text-slate-400")}>Insight Preview</div>
                                            </div>
                                        </button>

                                        <div className="mt-10 rounded-[2.5rem] bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] p-8 text-white shadow-2xl overflow-hidden relative group">
                                            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-3xl transition-all group-hover:bg-white/20 animate-pulse"></div>
                                            <div className="relative z-10">
                                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                                                    <Sparkles className="h-6 w-6" />
                                                </div>
                                                <h3 className="text-base font-black uppercase tracking-tight mb-3">Editor Protocol</h3>
                                                <p className="text-xs font-medium leading-relaxed text-blue-100/70 mb-6">
                                                    High-impact insights perform 40% better when paired with clean imagery and accurate metatags.
                                                </p>
                                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-white w-2/3 transition-all duration-1000"></div>
                                                </div>
                                                <div className="mt-3 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/50">
                                                    <span>Integrity Scan</span>
                                                    <span>65% Complete</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Main Editor Area */}
                        <div className="lg:col-span-9">
                            <div className="rounded-[3rem] bg-white border border-white p-10 shadow-[0_40px_100px_rgba(30,58,138,0.08)] md:p-16 relative overflow-hidden min-h-[800px]">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                                    <Terminal className="h-80 w-80 rotate-12" />
                                </div>

                                {activeTab === "dashboard" && (
                                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">

                                        {/* Guidelines Section */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                                <div className="h-10 w-10 rounded-2xl bg-[#1e3a8a]/10 flex items-center justify-center text-[#1e3a8a]">
                                                    <ListChecks className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-black uppercase tracking-widest text-[#1e3a8a]">Editorial Protocol</h2>
                                                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Demandify Contribution Guidelines</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {[
                                                    { step: "01", title: "Original Insights", desc: "No AI-generated or plagiarized content. Share unique perspectives." },
                                                    { step: "02", title: "Executive Value", desc: "Ensure your content provides actionable takeaways for decision-makers." },
                                                    { step: "03", title: "Rich Media", desc: "Include high-quality header images and properly formatted text structure." },
                                                ].map((guide, idx) => (
                                                    <div key={idx} className="rounded-3xl border border-slate-100 bg-slate-50 p-6 hover:shadow-lg transition-all hover:border-[#1e3a8a]/20">
                                                        <span className="text-3xl font-black text-[#1e3a8a]/10">{guide.step}</span>
                                                        <h3 className="text-[12px] font-black uppercase tracking-widest text-[#1e1e1e] mt-2 mb-2">{guide.title}</h3>
                                                        <p className="text-[11px] font-bold text-slate-500 leading-relaxed">{guide.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* My Submissions Section */}
                                        <div className="space-y-6 pt-6 border-t border-slate-100">
                                            <div className="flex items-center justify-between pb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-2xl bg-[#1e3a8a]/10 flex items-center justify-center text-[#1e3a8a]">
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h2 className="text-xl font-black uppercase tracking-widest text-[#1e3a8a]">Your Insights</h2>
                                                        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Status & Tracking</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => setActiveTab("step1")} className="rounded-xl bg-[#1e3a8a] text-white px-5 py-2.5 text-[10px] font-black shadow-lg shadow-[#1e3a8a]/20 uppercase tracking-widest hover:scale-105 transition-all">
                                                    + New Insight
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                {mockSubmissions.map((sub) => (
                                                    <div key={sub.id} className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl transition-all hover:border-[#1e3a8a]/20">
                                                        <div className="flex flex-col">
                                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                                <span className={cn(
                                                                    "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                                                                    sub.status === "Published" ? "bg-green-50 text-green-700 border-green-200" :
                                                                        sub.status === "Under Review" ? "bg-[#1e3a8a]/5 text-[#1e3a8a] border-[#1e3a8a]/20" :
                                                                            "bg-slate-100 text-slate-500 border-slate-200"
                                                                )}>
                                                                    {sub.status}
                                                                </span>
                                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{sub.type}</span>
                                                            </div>
                                                            <h3 className="text-lg font-black text-[#1e1e1e] group-hover:text-[#1e3a8a] transition-all line-clamp-1">{sub.title}</h3>
                                                        </div>
                                                        <div className="flex items-center gap-6">
                                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                                <Clock className="h-3 w-3" />
                                                                {sub.date}
                                                            </div>
                                                            <button
                                                                onClick={() => setActiveTab("step1")}
                                                                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 border border-slate-200 hover:bg-[#1e3a8a] hover:text-white hover:border-transparent transition-all"
                                                            >
                                                                <PenSquare className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                )}

                                {/* STEP 1: Configuration (Metadata, Categories, etc.) */}
                                {activeTab === "step1" && (
                                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                            <div className="h-10 w-10 rounded-2xl bg-[#1e3a8a]/10 flex items-center justify-center text-[#1e3a8a]">
                                                <Settings className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-black uppercase tracking-widest text-[#1e3a8a]">Step 1: Configuration</h2>
                                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Metadata, Custom URI & Taxonomy</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-10">
                                                <div className="space-y-6">
                                                    <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                                                        <div className="h-px w-8 bg-slate-200"></div>
                                                        Meta Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.metaTitle}
                                                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                                        placeholder="Browser tab title..."
                                                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-5 px-8 text-[11px] font-black uppercase tracking-widest text-[#1e3a8a] outline-none transition-all focus:border-[#1e3a8a]/40 focus:bg-white"
                                                    />
                                                </div>

                                                <div className="space-y-6">
                                                    <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                                                        <div className="h-px w-8 bg-slate-200"></div>
                                                        Custom URI (Slug)
                                                    </label>
                                                    <div className="relative group">
                                                        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">/community/</div>
                                                        <input
                                                            type="text"
                                                            value={formData.slug}
                                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                            placeholder="url-friendly-slug"
                                                            className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-5 pl-32 pr-8 text-[11px] font-black text-[#1e3a8a] outline-none transition-all focus:border-[#1e3a8a]/40 focus:bg-white"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                                                        <div className="h-px w-8 bg-slate-200"></div>
                                                        Meta Description
                                                    </label>
                                                    <textarea
                                                        value={formData.metaDescription}
                                                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                                        placeholder="Snippet for search engine results..."
                                                        className="w-full rounded-[2rem] border border-slate-100 bg-slate-50/50 p-8 text-[12px] font-medium text-slate-600 outline-none transition-all focus:border-[#1e3a8a]/40 focus:bg-white focus:ring-4 focus:ring-[#1e3a8a]/5"
                                                        rows={3}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-10">
                                                <div className="space-y-6">
                                                    <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                                                        <div className="h-px w-8 bg-slate-200"></div>
                                                        Taxonomy (Category)
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {categories.map((cat) => (
                                                            <button
                                                                key={cat}
                                                                type="button"
                                                                onClick={() => setFormData({ ...formData, category: cat })}
                                                                className={cn(
                                                                    "group flex items-center justify-between rounded-2xl px-5 py-4 text-[10px] font-black tracking-widest transition-all text-left uppercase border",
                                                                    formData.category === cat
                                                                        ? "bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-lg shadow-[#1e3a8a]/20"
                                                                        : "bg-white text-slate-400 hover:text-[#1e3a8a] border-slate-100/80 hover:border-[#1e3a8a]/20"
                                                                )}
                                                            >
                                                                {cat}
                                                                {formData.category === cat && <Check className="h-3 w-3 text-white" />}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                                                        <div className="h-px w-8 bg-slate-200"></div>
                                                        Subcategory (Optional)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.subcategory}
                                                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                                                        placeholder="e.g. Data Analytics"
                                                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-5 px-8 text-[11px] font-black uppercase tracking-widest text-[#1e3a8a] outline-none transition-all focus:border-[#1e3a8a]/40 focus:bg-white"
                                                    />
                                                </div>

                                                <div className="space-y-6">
                                                    <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                                                        <div className="h-px w-8 bg-slate-200"></div>
                                                        Keywords & Tags
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.tags}
                                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                                        placeholder="SaaS, AI, ENTERPRISE (Separated by commas)"
                                                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-5 px-8 text-[11px] font-black uppercase tracking-widest text-slate-700 outline-none transition-all focus:border-[#1e3a8a]/40 focus:bg-white focus:shadow-lg focus:shadow-[#1e3a8a]/5"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-8 flex justify-end border-t border-slate-100">
                                            <button
                                                onClick={() => setActiveTab("step2")}
                                                className="flex items-center gap-3 rounded-2xl bg-[#1e3a8a] text-white px-8 py-4 text-[11px] font-black shadow-xl shadow-[#1e3a8a]/20 uppercase tracking-widest hover:scale-105 transition-all"
                                            >
                                                Next: Proceed to Content <ArrowRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: Content (Headline, Body, Cover Asset) */}
                                {activeTab === "step2" && (
                                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                            <div className="h-10 w-10 rounded-2xl bg-[#1e3a8a]/10 flex items-center justify-center text-[#1e3a8a]">
                                                <PenSquare className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-black uppercase tracking-widest text-[#1e3a8a]">Step 2: Content Generation</h2>
                                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Headline, Cover & Core Insight</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                                                <div className="h-px w-8 bg-slate-200"></div>
                                                Insight Headline
                                            </label>
                                            <textarea
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                placeholder="Enter a visionary headline..."
                                                className="w-full resize-none border-none bg-transparent text-5xl md:text-6xl font-black tracking-tighter text-[#1e1e1e] outline-none placeholder:text-slate-200 leading-[1.05]"
                                                rows={2}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-6">
                                                <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                                                    <div className="h-px w-8 bg-slate-200"></div>
                                                    Author Attribution
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.authorAttribution}
                                                    onChange={(e) => setFormData({ ...formData, authorAttribution: e.target.value })}
                                                    placeholder="John Doe, Chief Data Officer"
                                                    className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-5 px-8 text-[11px] font-black uppercase tracking-widest text-[#1e1e1e] outline-none transition-all focus:border-[#1e3a8a]/40 focus:bg-white"
                                                />
                                            </div>
                                            <div className="space-y-6">
                                                <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                                                    <div className="h-px w-8 bg-slate-200"></div>
                                                    Cover Asset
                                                </label>
                                                <div className="group relative flex w-full flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 transition-all hover:bg-white hover:border-[#1e3a8a]/30 hover:shadow-xl hover:shadow-[#1e3a8a]/5 cursor-pointer">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md transition-all group-hover:bg-[#1e3a8a] group-hover:text-white">
                                                        <ImageIcon className="h-5 w-5 text-slate-300 transition-colors group-hover:text-white" />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#1e1e1e]">Upload Header Media</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                                                <div className="h-px w-8 bg-slate-200"></div>
                                                Executive Excerpt
                                            </label>
                                            <textarea
                                                value={formData.excerpt}
                                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                                placeholder="Provide a high-level summary for the community feed..."
                                                className="w-full rounded-[2rem] border border-slate-100 bg-slate-50/50 p-8 text-base font-medium text-slate-600 outline-none transition-all focus:border-[#1e3a8a]/40 focus:bg-white focus:ring-4 focus:ring-[#1e3a8a]/5"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                                                    <div className="h-px w-8 bg-slate-200"></div>
                                                    Core Manuscript
                                                </label>
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest space-x-2">
                                                    <span className={cn(
                                                        formData.content.trim().split(/\s+/).filter(word => word.length > 0).length > 500 ? "text-rose-500" : "text-slate-400"
                                                    )}>
                                                        {formData.content.trim().split(/\s+/).filter(word => word.length > 0).length}/500 Words
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Rich Text Toolbar */}
                                            <div className="flex items-center gap-2 rounded-t-3xl bg-slate-50 border border-b-0 border-slate-100 p-3 px-6">
                                                <button className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#1e3a8a] hover:shadow-sm text-slate-400 transition-all"><Bold className="h-4 w-4" /></button>
                                                <button className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#1e3a8a] hover:shadow-sm text-slate-400 transition-all"><Italic className="h-4 w-4" /></button>
                                                <div className="h-4 w-px bg-slate-200 mx-2"></div>
                                                <button className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#1e3a8a] hover:shadow-sm text-slate-400 transition-all"><Link2 className="h-4 w-4" /></button>
                                                <button className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#1e3a8a] hover:shadow-sm text-slate-400 transition-all"><ImageIcon className="h-4 w-4" /></button>
                                            </div>

                                            <div className="relative min-h-[500px] rounded-b-3xl rounded-tr-3xl bg-white p-8 border border-slate-100 transition-all focus-within:ring-4 focus-within:ring-[#1e3a8a]/5 focus-within:border-[#1e3a8a]/20">
                                                <textarea
                                                    value={formData.content}
                                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                                    placeholder="Begin sharing your expertise with the community..."
                                                    className="h-full min-h-[450px] w-full resize-none border-none bg-transparent text-lg font-medium leading-relaxed text-slate-700 outline-none placeholder:text-slate-300"
                                                />
                                            </div>
                                            {formData.content.trim().split(/\s+/).filter(word => word.length > 0).length > 500 && (
                                                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest text-right px-4 mt-2">Maximum word limit exceeded. Insight should be concise (500 max).</p>
                                            )}
                                        </div>

                                        <div className="pt-8 flex items-center justify-between border-t border-slate-100">
                                            <button
                                                onClick={() => setActiveTab("step1")}
                                                className="flex items-center gap-3 rounded-2xl bg-white text-slate-500 border border-slate-200 px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:text-[#1e3a8a] transition-all"
                                            >
                                                <ChevronLeft className="h-4 w-4" /> Back
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("preview")}
                                                className="flex items-center gap-3 rounded-2xl bg-[#1e3a8a] text-white px-8 py-4 text-[11px] font-black shadow-xl shadow-[#1e3a8a]/20 uppercase tracking-widest hover:scale-105 transition-all"
                                            >
                                                Next: Final Preview <ArrowRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: PREVIEW */}
                                {activeTab === "preview" && (
                                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                            <div className="h-10 w-10 rounded-2xl bg-[#1e3a8a]/10 flex items-center justify-center text-[#1e3a8a]">
                                                <Eye className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-black uppercase tracking-widest text-[#1e3a8a]">Insight Preview</h2>
                                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Review before finalizing deployment</p>
                                            </div>
                                        </div>

                                        <div className="rounded-[3rem] border border-slate-100 bg-[#f8fafc] p-10 mt-8 shadow-inner overflow-hidden relative">
                                            {/* Preview Header */}
                                            <div className="mb-10 pt-10 px-4 max-w-4xl mx-auto flex flex-col items-center text-center">
                                                <div className="mb-6 flex gap-3">
                                                    <span className="rounded-full bg-[#1e3a8a]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">
                                                        {formData.category || "Uncategorized"}
                                                    </span>
                                                </div>
                                                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1e1e1e] leading-[1.1] mb-8">
                                                    {formData.title || "Your Insight Headline Will Appear Here"}
                                                </h1>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-slate-200" />
                                                    <div className="text-left">
                                                        <div className="text-[11px] font-bold text-slate-900">{formData.authorAttribution || "Author Name"}</div>
                                                        <div className="text-[9px] font-semibold text-slate-500">March 2, 2026 • Read Time: 3 Min</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Mock Header Image */}
                                            <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-slate-200 h-[300px] md:h-[450px] mb-12 flex items-center justify-center border border-white/50 shadow-sm relative overflow-hidden group">
                                                <ImageIcon className="h-12 w-12 text-slate-400 group-hover:scale-110 transition-transform" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                                                    <p className="text-white/80 font-bold text-sm tracking-wide">Cover Asset Pre-visualization</p>
                                                </div>
                                            </div>

                                            {/* Preview Body */}
                                            <div className="mx-auto max-w-3xl px-4 prose prose-lg prose-slate prose-headings:font-black prose-headings:tracking-tight hover:prose-a:text-[#1e3a8a]">
                                                {formData.content ? (
                                                    <div className="whitespace-pre-wrap font-medium leading-relaxed text-slate-700">
                                                        {formData.content}
                                                    </div>
                                                ) : (
                                                    <p className="text-slate-400 italic">Insight core text structure goes here...</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-8 flex items-center justify-between border-t border-slate-100">
                                            <button
                                                onClick={() => setActiveTab("step2")}
                                                className="flex items-center gap-3 rounded-2xl bg-white text-slate-500 border border-slate-200 px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:text-[#1e3a8a] transition-all"
                                            >
                                                <ChevronLeft className="h-4 w-4" /> Back to Edit
                                            </button>
                                            <button
                                                onClick={handlePublish}
                                                disabled={formData.content.trim().split(/\s+/).filter(word => word.length > 0).length > 500 || isPublishing}
                                                className="flex items-center gap-3 rounded-2xl bg-green-600 text-white px-10 py-4 text-[11px] font-black shadow-xl shadow-green-600/20 uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                                            >
                                                {isPublishing ? "Processing..." : "Submit for Approval"} <Check className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
