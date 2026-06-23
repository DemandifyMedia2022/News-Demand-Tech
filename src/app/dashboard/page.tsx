"use client";

import React, { useState } from "react";
import {
    LayoutDashboard,
    FileText,
    PlusCircle,
    Settings,
    LogOut,
    Bell,
    Search,
    ChevronRight,
    Clock,
    CheckCircle,
    MoreHorizontal,
    TrendingUp,
    Users,
    MessageSquare,
    Globe,
    ExternalLink,
    Image as ImageIcon,
    Tag,
    BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// --- Mock Data ---
const mockSubmissions = [
    { id: 1, title: "Future of Generative AI in B2B Marketing", date: "2024-03-08", status: "pending", category: "MarTeq", views: 0 },
    { id: 2, title: "Why HRTeq is the New Competitive Advantage", date: "2024-03-05", status: "approved", category: "HRTeq", views: 1240 },
    { id: 3, title: "FinTeq Security Protocols for 2024", date: "2024-02-28", status: "approved", category: "FinTeq", views: 3500 },
];

const mockCommunityFeed = [
    { user: "Sarah Jenkins", title: "Customer Experience in the Age of Robots", time: "2h ago" },
    { user: "David Chen", title: "Cloud Spending Optimization for Scale-ups", time: "5h ago" },
    { user: "Emma Wilson", title: "Why Data Privacy is a Sales Hook", time: "1d ago" },
];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<"overview" | "posts" | "new">("overview");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex pt-16">
            {/* Sidebar */}
            <aside className={cn(
                "fixed left-0 top-16 bottom-0 bg-white border-r border-slate-200 transition-all duration-300 z-30",
                isSidebarOpen ? "w-64" : "w-20"
            )}>
                <div className="flex flex-col h-full py-6">
                    <nav className="flex-1 px-4 space-y-2">
                        <NavItem
                            icon={LayoutDashboard}
                            label="Overview"
                            active={activeTab === "overview"}
                            onClick={() => setActiveTab("overview")}
                            collapsed={!isSidebarOpen}
                        />
                        <NavItem
                            icon={FileText}
                            label="My Posts"
                            active={activeTab === "posts"}
                            onClick={() => setActiveTab("posts")}
                            collapsed={!isSidebarOpen}
                        />
                        <NavItem
                            icon={PlusCircle}
                            label="Submit New"
                            active={activeTab === "new"}
                            onClick={() => setActiveTab("new")}
                            collapsed={!isSidebarOpen}
                        />
                    </nav>

                    <div className="px-4 mt-auto border-t border-slate-100 pt-6">
                        <NavItem
                            icon={Settings}
                            label="Settings"
                            active={false}
                            collapsed={!isSidebarOpen}
                        />
                        <NavItem
                            icon={LogOut}
                            label="Sign Out"
                            active={false}
                            className="text-red-500 hover:bg-red-50"
                            collapsed={!isSidebarOpen}
                        />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "flex-1 transition-all duration-300 p-8",
                isSidebarOpen ? "ml-64" : "ml-20"
            )}>
                {/* Header Section */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            {activeTab === "overview" && "Account Overview"}
                            {activeTab === "posts" && "Manage Submissions"}
                            {activeTab === "new" && "New Publication"}
                        </h1>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Welcome back, <span className="text-[#1e3a8a] font-bold">Innovation Pioneer</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search my content..."
                                className="pl-10 h-10 w-64 bg-white border-slate-200 rounded-xl"
                            />
                        </div>
                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white" />
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && <OverviewTab onNewPost={() => setActiveTab("new")} />}
                {activeTab === "posts" && <PostsTab />}
                {activeTab === "new" && <NewPostTab />}

            </main>
        </div>
    );
}

// --- Sub-Components ---

function NavItem({ icon: Icon, label, active, onClick, className, collapsed }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm",
                active
                    ? "bg-[#1e3a8a]/5 text-[#1e3a8a]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                className
            )}
        >
            <Icon className={cn("h-5 w-5", active ? "text-[#1e3a8a]" : "text-slate-400")} />
            {!collapsed && <span>{label}</span>}
            {active && !collapsed && <div className="ml-auto w-1 h-4 bg-[#1e3a8a] rounded-full" />}
        </button>
    );
}

function OverviewTab({ onNewPost }: { onNewPost: () => void }) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Submissions" value="12" icon={FileText} trend="+2 this month" />
                <StatCard label="Total Views" value="24.8K" icon={BarChart3} trend="+15% surge" />
                <StatCard label="Followers" value="1,402" icon={Users} trend="+8 new" />
                <StatCard label="Global Rank" value="#42" icon={Globe} trend="Top 5%" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <Card className="xl:col-span-2 border-none shadow-xl shadow-blue-900/5 bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-slate-900">Recent Submissions</h3>
                            <button className="text-xs font-black text-[#1e3a8a] uppercase tracking-widest hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {mockSubmissions.map(post => (
                                <div key={post.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-100 transition-colors group">
                                    <div className={cn(
                                        "h-12 w-12 rounded-xl flex items-center justify-center font-bold text-xs uppercase cursor-default",
                                        post.category === "MarTeq" ? "bg-pink-50 text-pink-600" :
                                            post.category === "HRTeq" ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                                    )}>
                                        {post.category.substring(0, 2)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 group-hover:text-[#1e3a8a] transition-colors line-clamp-1">{post.title}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-medium">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.date}</span>
                                            <span className="flex items-center gap-1 uppercase tracking-tighter">
                                                {post.status === "approved" ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Clock className="w-3 h-3 text-amber-500" />}
                                                {post.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right pr-2">
                                        <div className="text-sm font-bold text-slate-900">{post.views.toLocaleString()}</div>
                                        <div className="text-[10px] uppercase font-black text-slate-300 tracking-widest">Views</div>
                                    </div>
                                    <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-900">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Quick Action */}
                    <Card className="border-none shadow-xl shadow-[#1e3a8a]/20 bg-[#1e3a8a] text-white rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                            <PlusCircle className="w-32 h-32" />
                        </div>
                        <h3 className="text-xl font-black mb-2 relative z-10">Start Writing</h3>
                        <p className="text-blue-100/60 text-sm mb-6 relative z-10">Have a new insight to share? Submit your blog for review.</p>
                        <Button onClick={onNewPost} className="bg-white text-[#1e3a8a] font-black hover:bg-blue-50 rounded-xl px-6 relative z-10">
                            Create New Post
                        </Button>
                    </Card>

                    {/* Community Insight */}
                    <Card className="border-none shadow-xl shadow-blue-900/5 bg-white/70 backdrop-blur-md rounded-3xl p-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            Community Feed
                        </h3>
                        <div className="space-y-6">
                            {mockCommunityFeed.map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-600 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 hover:text-[#1e3a8a] cursor-pointer line-clamp-2">{item.title}</p>
                                        <p className="text-[10px] font-medium text-slate-400 uppercase mt-1">
                                            {item.user} • {item.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function PostsTab() {
    return (
        <div className="animate-in fade-in duration-500">
            <Card className="border-none shadow-xl shadow-blue-900/5 bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                    <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-2 rounded-xl bg-slate-100 text-[#1e3a8a] font-bold text-xs uppercase tracking-widest">All</button>
                            <button className="px-4 py-2 rounded-xl text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-50">Approved</button>
                            <button className="px-4 py-2 rounded-xl text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-50">Pending</button>
                        </div>
                        <div className="text-[11px] font-black uppercase tracking-widest text-slate-300">
                            Showing 12 submissions
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50">
                                    <th className="px-8 py-4">Title</th>
                                    <th className="px-4 py-4">Category</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-4 py-4">Date</th>
                                    <th className="px-4 py-4">Views</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[...mockSubmissions, ...mockSubmissions].map((post, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-4 font-bold text-slate-900 truncate max-w-[200px]">{post.title}</td>
                                        <td className="px-4 py-4">
                                            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-tighter">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("h-1.5 w-1.5 rounded-full", post.status === "approved" ? "bg-green-500" : "bg-amber-500")} />
                                                <span className="text-xs font-bold text-slate-600 capitalize">{post.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-xs font-medium text-slate-400">{post.date}</td>
                                        <td className="px-4 py-4 text-xs font-bold text-slate-900">{post.views.toLocaleString()}</td>
                                        <td className="px-8 py-4 text-right">
                                            <button className="text-xs font-black text-[#1e3a8a] uppercase tracking-widest transition-opacity group-hover:opacity-100 flex items-center gap-2 ml-auto">
                                                Edit <ExternalLink className="w-3 h-3" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function NewPostTab() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Editor Card */}
            <Card className="border-none shadow-2xl shadow-blue-900/10 bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Article Title</label>
                            <Input
                                placeholder="Enter a compelling headline..."
                                className="py-7 px-6 text-xl font-bold bg-slate-50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all rounded-2xl"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Category</label>
                            <select className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white transition-all outline-none">
                                <option>FinTeq</option>
                                <option>MarTeq</option>
                                <option>HRTeq</option>
                                <option>CXTeq</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Featured Image</label>
                            <button className="w-full h-14 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-3 text-slate-400 font-bold hover:bg-slate-50 hover:border-blue-300 transition-all">
                                <ImageIcon className="w-5 h-5" />
                                <span>Upload URL or File</span>
                            </button>
                        </div>

                        <div className="space-y-4 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Excerpt</label>
                            <Textarea
                                placeholder="A brief summary of your article..."
                                className="min-h-[100px] p-6 bg-slate-50 border-slate-100 focus:bg-white rounded-2xl text-slate-900 font-medium"
                            />
                        </div>

                        <div className="space-y-4 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Content Body</label>
                            <div className="border border-slate-100 rounded-2xl min-h-[400px] flex flex-col overflow-hidden">
                                <div className="bg-slate-50 p-3 border-b border-slate-100 flex gap-2">
                                    <button className="p-2 hover:bg-white rounded-lg transition-colors font-bold text-sm">B</button>
                                    <button className="p-2 hover:bg-white rounded-lg transition-colors italic text-sm">I</button>
                                    <button className="p-2 hover:bg-white rounded-lg transition-colors underline text-sm">U</button>
                                    <div className="w-px h-6 bg-slate-200 mx-2 self-center" />
                                    <button className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400"><Tag className="w-4 h-4" /></button>
                                    <button className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400"><MessageSquare className="w-4 h-4" /></button>
                                </div>
                                <Textarea
                                    placeholder="Start writing your story..."
                                    className="flex-1 border-none bg-white p-8 focus:ring-0 text-lg leading-relaxed resize-none font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* SEO Section */}
            <Card className="border-none shadow-xl shadow-blue-900/5 bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden p-8">
                <div className="flex items-center gap-3 mb-8">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-900">Search Optimization (SEO)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Meta Title</label>
                        <Input
                            placeholder="Title used for search engines"
                            className="h-14 px-6 bg-white border-slate-100 rounded-2xl text-slate-900 font-medium"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Keywords</label>
                        <Input
                            placeholder="tech, ai, innovation"
                            className="h-14 px-6 bg-white border-slate-100 rounded-2xl text-slate-900 font-medium"
                        />
                    </div>
                    <div className="space-y-4 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Meta Description</label>
                        <Textarea
                            placeholder="A description that appears in search results"
                            className="min-h-[80px] p-6 bg-white border-slate-100 rounded-2xl text-slate-900 font-medium"
                        />
                    </div>
                </div>
            </Card>

            <div className="flex items-center justify-end gap-4 pb-12">
                <button className="px-8 py-4 rounded-2xl text-slate-400 font-black uppercase tracking-[0.15em] hover:text-slate-900 transition-colors">
                    Save Draft
                </button>
                <Button className="px-10 py-7 rounded-2xl bg-[#1e3a8a] text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 active:scale-95 transition-all">
                    Submit for Review
                </Button>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon: Icon, trend }: any) {
    return (
        <Card className="border-none shadow-xl shadow-blue-900/5 bg-white/70 backdrop-blur-md rounded-3xl p-6 group hover:scale-[1.02] transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                </div>
                {trend && (
                    <span className="text-[10px] font-black uppercase text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                        {trend}
                    </span>
                )}
            </div>
            <div className="text-2xl font-black text-slate-900">{value}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mt-1">{label}</div>
        </Card>
    );
}
