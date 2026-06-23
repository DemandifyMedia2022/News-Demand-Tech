"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    ArrowUpRight,
    ArrowRight,
    Zap,
    Sparkles,
    PlusCircle,
    CheckCircle2,
    Search,
    Filter,
    Video,
    Globe,
    ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// --- Mock Event Data ---
const featuredEvent = {
    title: "Global B2B Tech Summit 2024",
    slug: "global-b2b-tech-summit-2024",
    type: "Hybrid",
    date: "Dec 12 - 14, 2024",
    location: "San Francisco, CA & Virtual",
    attendees: "5,000+",
    duration: "3 Days",
    category: "Architecture",
    excerpt: "The flagship event for B2B tech leaders. Join us for three days of deep-dives into AI, infrastructure, and demand generation strategies.",
    brandIcon: "summit-logo"
};

const upcomingEvents = [
    {
        title: "FinTeq Security Forum",
        slug: "finteq-security-forum",
        category: "FinTeq",
        date: "Nov 05, 2024",
        location: "New York, NY",
        excerpt: "Exploring the intersection of cybersecurity and digital banking infrastructure.",
        type: "In-person"
    },
    {
        title: "Gen-AI Content Ops Workshop",
        slug: "gen-ai-content-ops",
        category: "MarTeq",
        date: "Nov 18, 2024",
        location: "Virtual",
        excerpt: "Practical guide to scaling your content supply chain with generative AI.",
        type: "Virtual"
    },
    {
        title: "Future of Work: HRTeq Expo",
        slug: "future-of-work-hrteq",
        category: "HRTeq",
        date: "Dec 02, 2024",
        location: "London, UK",
        excerpt: "The leading European event for talent intelligence and people operations.",
        type: "Hybrid"
    }
];

const pastEvents = [
    {
        title: "MarTeq Global 2024",
        date: "Sept 12, 2024",
        location: "Chicago, IL",
        category: "Marketing",
        status: "Completed"
    },
    {
        title: "CX Innovation Day",
        date: "Aug 20, 2024",
        location: "Singapore",
        category: "Customer Experience",
        status: "Completed"
    },
    {
        title: "B2B SaaS Founders Meetup",
        date: "July 15, 2024",
        location: "Virtual",
        category: "Business",
        status: "Completed"
    },
    {
        title: "Cloud Infrastructure Summit",
        date: "June 05, 2024",
        location: "Austin, TX",
        category: "Cloud",
        status: "Completed"
    }
];

import { Textarea } from "@/components/ui/textarea";
import { createPortal } from "react-dom";

// ... (previous mock data)

export default function EventsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-[#F0F8FF] pt-20">
            {/* --- 1. HERO SECTION --- */}
            <section className="relative px-6 sm:px-12 py-16 lg:py-24 max-w-[1600px] mx-auto overflow-hidden">
                <div className="absolute top-0 right-0 w-[60%] h-full bg-orb opacity-10 pointer-events-none" />

                <div className="relative z-10 space-y-8 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/5 border border-[#1e3a8a]/10">
                        <Calendar className="w-3.5 h-3.5 text-[#1e3a8a]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">Event Collective</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05]">
                        Connect. Learn. <br />
                        <span className="text-gradient">Grow.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
                        The definitive calendar for B2B tech leaders. Curated global summits,
                        exclusive workshops, and industry networking events designed for the tech-forward professional.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button size="lg" className="rounded-2xl h-14 px-8 bg-[#1e3a8a] hover:bg-blue-800 text-sm font-black tracking-widest uppercase shadow-xl shadow-blue-900/10 active:scale-95 transition-all">
                            BROWSE ALL EVENTS
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-2xl h-14 px-8 border-slate-200 bg-white text-sm font-black tracking-widest uppercase hover:bg-slate-50 active:scale-95 transition-all"
                            onClick={() => setIsModalOpen(true)}
                        >
                            SUBMIT YOUR EVENT
                        </Button>
                    </div>
                </div>
            </section>

            {/* Event Submission Modal */}
            {isModalOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <Card className="relative w-full max-w-2xl border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <CardContent className="p-8 md:p-12">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Submit Event</h2>
                                    <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-widest">Industry Contribution</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Event Title</label>
                                        <Input placeholder="e.g. B2B Tech Expo 2024" className="h-12 bg-slate-50 border-slate-100 rounded-xl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Category</label>
                                        <select className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:bg-white transition-all outline-none">
                                            <option>FinTeq</option>
                                            <option>MarTeq</option>
                                            <option>HRTeq</option>
                                            <option>Tech Summit</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Date Range</label>
                                        <Input placeholder="Dec 12 - 14, 2024" className="h-12 bg-slate-50 border-slate-100 rounded-xl" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Location / URL</label>
                                        <Input placeholder="City or Virtual Link" className="h-12 bg-slate-50 border-slate-100 rounded-xl" required />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Description</label>
                                        <Textarea placeholder="Tell us about the event objective and target audience..." className="bg-slate-50 border-slate-100 rounded-xl min-h-[100px]" required />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Organizer Contact Info</label>
                                        <Input placeholder="Email or Website" className="h-12 bg-slate-50 border-slate-100 rounded-xl" required />
                                    </div>
                                </div>

                                <div className="pt-6 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <Button className="px-10 h-14 rounded-xl bg-[#1e3a8a] text-white font-black uppercase tracking-widest shadow-xl shadow-blue-900/20">
                                        Submit for Approval
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>,
                document.body
            )}

            {/* --- 2. FEATURED EVENT SHOWCASE --- */}
            <section className="px-6 sm:px-12 py-12 max-w-[1600px] mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Featured Showcase</h2>
                    <div className="h-0.5 flex-1 bg-slate-200/50 mx-8 hidden md:block" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">December Highlight</span>
                </div>

                <Card className="border-none shadow-2xl shadow-blue-900/5 bg-[#1e3a8a] text-white rounded-[3rem] overflow-hidden group">
                    <div className="grid lg:grid-cols-12">
                        {/* Visual Side */}
                        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600/20 to-[#1e3a8a]/40 relative min-h-[400px] flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-orb opacity-20 group-hover:scale-110 transition-transform duration-1000" />
                            <div className="relative z-10 p-12 text-center">
                                <div className="h-24 w-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/10">
                                    <Sparkles className="w-12 h-12 text-blue-300" />
                                </div>
                                <h4 className="text-xl font-black tracking-tighter uppercase opacity-40">Tech Summit 2024</h4>
                            </div>
                        </div>

                        {/* Info Side */}
                        <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest">
                                    {featuredEvent.type}
                                </span>
                                <div className="flex items-center gap-2 text-blue-300">
                                    <Zap className="w-4 h-4 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Official Selection</span>
                                </div>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
                                {featuredEvent.title}
                            </h3>

                            <p className="text-blue-100/60 text-lg mb-10 max-w-xl italic leading-relaxed">
                                "{featuredEvent.excerpt}"
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                                <DetailBox icon={Calendar} label="Date" value={featuredEvent.date} />
                                <DetailBox icon={MapPin} label="Location" value={featuredEvent.location} />
                                <DetailBox icon={Users} label="Attendees" value={featuredEvent.attendees} />
                                <DetailBox icon={Clock} label="Duration" value={featuredEvent.duration} />
                            </div>

                            <Button className="w-fit h-14 px-10 bg-white text-[#1e3a8a] font-black tracking-widest uppercase rounded-2xl shadow-xl shadow-black/20 hover:bg-blue-50 transition-all active:scale-95">
                                SECURE YOUR ACCESS <ArrowUpRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </section>

            {/* --- 3. UPCOMING EVENTS GRID --- */}
            <section className="px-6 sm:px-12 py-24 max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Upcoming Events</h2>
                        <p className="text-slate-500 font-medium">Explore the next wave of tech innovation and networking.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event, i) => (
                        <Card key={i} className="border-none shadow-xl shadow-blue-900/[0.02] bg-white rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 hover:-translate-y-2">
                            <div className="h-48 bg-slate-50 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#1e3a8a]/10 to-transparent" />
                                <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-white/90 border border-slate-100 text-[9px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]">
                                    {event.category}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center text-slate-200 text-6xl font-black opacity-30 transform -rotate-12 group-hover:scale-110 transition-transform duration-700">
                                    {event.category.substring(0, 2)}
                                </div>
                            </div>
                            <CardContent className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    {event.type === "Virtual" ? <Video className="w-4 h-4 text-slate-400" /> : <Globe className="w-4 h-4 text-slate-400" />}
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{event.type}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#1e3a8a] transition-colors leading-tight">{event.title}</h3>
                                <p className="text-sm text-slate-500 mb-8 font-medium line-clamp-2 italic">"{event.excerpt}"</p>

                                <div className="space-y-3 pt-6 border-t border-slate-50">
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                                        <Calendar className="w-4 h-4 text-[#1e3a8a] opacity-50" />
                                        {event.date}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                                        <MapPin className="w-4 h-4 text-[#1e3a8a] opacity-50" />
                                        {event.location}
                                    </div>
                                </div>

                                <Button variant="ghost" className="w-full mt-8 rounded-xl h-12 text-[10px] font-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white transition-all">
                                    DETAILS & TICKETS <ArrowRight className="ml-2 w-3 h-3" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* --- 4. PAST EVENTS RECAP --- */}
            <section className="py-24 bg-[#0F172A] relative overflow-hidden">
                <div className="absolute inset-0 bg-orb opacity-10" />

                <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
                    <div className="flex items-center justify-between mb-16">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                                <PlusCircle className="w-3.5 h-3.5 text-blue-400 rotate-45" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Knowledge Archive</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Recapping 2024</h2>
                            <p className="text-slate-400 text-lg">Watch recordings and read insights from our completed sessions.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pastEvents.map((event, i) => (
                            <div key={i} className="group p-8 rounded-[2rem] bg-slate-900/50 border border-white/5 hover:bg-slate-800/50 hover:border-white/10 transition-all duration-500">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{event.category}</div>
                                    <span className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-tighter">
                                        <CheckCircle2 className="w-3 h-3" />
                                        {event.status}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-6 leading-tight group-hover:text-blue-300 transition-colors">{event.title}</h3>
                                <div className="space-y-2 text-[11px] font-bold text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 opacity-40" />
                                        {event.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 opacity-40" />
                                        {event.location}
                                    </div>
                                </div>
                                <button className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">
                                    VIEW RECAP <ArrowUpRight className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

// --- Helper Components ---

function DetailBox({ icon: Icon, label, value }: any) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-300/60 font-black text-[10px] uppercase tracking-[0.2em]">
                <Icon className="w-3.5 h-3.5" />
                {label}
            </div>
            <div className="text-sm md:text-base font-bold text-white tracking-tight">{value}</div>
        </div>
    );
}
