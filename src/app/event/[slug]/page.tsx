"use client";

import React from "react";
import Link from "next/link";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    Share2,
    ArrowLeft,
    ArrowUpRight,
    CheckCircle2,
    Video,
    Globe,
    ExternalLink,
    Mail,
    Ticket,
    Info,
    ChevronRight,
    Linkedin,
    Twitter,
    Facebook
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EventDetailPage({ params }: { params: { slug: string } }) {
    // Mock event data
    const mockEvent = {
        title: "Global B2B Tech Summit 2024",
        slug: "global-b2b-tech-summit-2024",
        category: "Architecture",
        type: "Hybrid",
        date: "Dec 12 - 14, 2024",
        time: "09:00 AM - 05:00 PM PST",
        location: "Moscone Center, San Francisco",
        virtualLink: "https://zoom.it/b2b-summit",
        cost: "$499 - $1,299",
        attendees: "5,000+ Professionals",
        organizer: "Tech Collective Global",
        contact: "events@techcollective.com",
        excerpt: "The flagship event for B2B tech leaders. Join us for three days of deep-dives into AI, infrastructure, and demand generation strategies.",
        content: `
            <p className="text-xl font-medium text-slate-600 leading-relaxed mb-8">
                Welcome to the 12th annual Global B2B Tech Summit. This year, we're bringing together the brightest minds in architecture, demand gen, and enterprise sales to discuss the roadmap for 2025.
            </p>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6 tracking-tight">Keynote: The AI Infrastructure Tax</h2>
            <p className="mb-6">
                Our opening keynote will address the growing complexity and cost of AI deployments in the enterprise. Learn how top Fortune 500 companies are navigating the hidden "tax" of large language model integration.
            </p>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6 tracking-tight">What to Expect</h2>
            <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <span><strong>12+ Workshops:</strong> Hands-on sessions with leading engineering teams.</span>
                </li>
                <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <span><strong>Networking Lounges:</strong> Dedicated spaces for peer-to-peer connection.</span>
                </li>
                <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <span><strong>Exhibition Hall:</strong> 50+ partners showcasing the next generation of B2B tools.</span>
                </li>
            </ul>
            <p className="mb-6">
                Whether you're joining us live in San Francisco or tuning in via our high-fidelity virtual platform, you'll have full access to all session recordings and networking tools for 90 days following the event.
            </p>
        `
    };

    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            {/* --- TOP NAV BAR --- */}
            <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 hidden lg:block">
                <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
                    <Link href="/event" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#1e3a8a] transition-all group">
                        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                        BACK TO EVENTS
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1e3a8a] bg-blue-50 px-3 py-1 rounded-full">Event Detail</span>
                        <div className="h-4 w-px bg-slate-100" />
                        <span className="text-[11px] font-bold text-slate-900 truncate max-w-[400px]">{mockEvent.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button className="h-10 px-6 rounded-xl bg-[#1e3a8a] text-white text-[10px] font-black uppercase tracking-widest">
                            REGISTER NOW
                        </Button>
                    </div>
                </div>
            </div>

            {/* --- EVENT HEADER --- */}
            <header className="pt-16 pb-12 lg:pt-24 lg:pb-20 max-w-[1400px] mx-auto px-6">
                <div className="max-w-[1000px] mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/5 border border-[#1e3a8a]/10">
                        <Calendar className="w-3.5 h-3.5 text-[#1e3a8a]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">{mockEvent.category} Event</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] text-balance">
                        {mockEvent.title}
                    </h1>
                </div>
            </header>

            {/* --- MAIN PAGE CONTENT (Article + Sidebar) --- */}
            <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-20">

                {/* ARTICLE CONTENT (Left/Center) */}
                <article className="lg:col-span-8">
                    <div className="aspect-[16/9] bg-slate-100 rounded-[3rem] mb-12 overflow-hidden relative border border-slate-50 group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1e3a8a]/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center text-slate-200 font-black text-8xl opacity-10 transform -rotate-12 group-hover:scale-110 transition-transform duration-1000">
                            event
                        </div>
                    </div>

                    <div
                        className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed font-medium"
                        dangerouslySetInnerHTML={{ __html: mockEvent.content }}
                    />

                    {/* Meta info footer for Mobile */}
                    <div className="mt-12 lg:hidden">
                        <EventInfoCard event={mockEvent} />
                    </div>
                </article>

                {/* EVENT INFO SIDEBAR (Right) */}
                <aside className="lg:col-span-4 hidden lg:block space-y-8">
                    <div className="sticky top-40">
                        <EventInfoCard event={mockEvent} />
                    </div>
                </aside>
            </div>

            {/* --- RELATED EVENTS --- */}
            <section className="max-w-[1400px] mx-auto px-6 mt-32">
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Similar Industry Events</h3>
                    <Link href="/event" className="text-xs font-black uppercase tracking-widest text-[#1e3a8a] hover:underline flex items-center gap-1">
                        View Calendar <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <Card key={i} className="border-none shadow-xl shadow-blue-900/[0.02] bg-[#F8FAFC] rounded-[2.5rem] p-8 group cursor-pointer hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Marketing</span>
                                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#1e3a8a] transition-all" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 leading-snug mb-6 line-clamp-2">
                                Global MarTeq Summit: Infrastructure Edition {i}
                            </h4>
                            <div className="space-y-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 opacity-40 text-[#1e3a8a]" />
                                    Nov 24, 2024
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-3.5 h-3.5 opacity-40 text-[#1e3a8a]" />
                                    London, UK
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </main>
    );
}

// --- Specialized Component: Event Info Sidebar Card ---

function EventInfoCard({ event }: { event: any }) {
    return (
        <Card className="border-none shadow-2xl shadow-blue-900/5 bg-[#F8FAFC] rounded-[3rem] overflow-hidden">
            <CardContent className="p-10 space-y-8">
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1e3a8a] mb-6">Logistical Details</h4>
                    <div className="space-y-6">
                        <InfoItem icon={Calendar} label="Date" value={event.date} />
                        <InfoItem icon={Clock} label="Time" value={event.time} />
                        <InfoItem icon={MapPin} label="Location" value={event.location} />
                        {event.virtualLink && (
                            <div className="pt-2">
                                <Link
                                    href={event.virtualLink}
                                    className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"
                                >
                                    <Video className="w-4 h-4" />
                                    Access Virtual Platform <ExternalLink className="w-3 h-3" />
                                </Link>
                            </div>
                        )}
                        <div className="h-px bg-slate-200/50" />
                        <InfoItem icon={Ticket} label="Cost" value={event.cost} />
                        <InfoItem icon={Users} label="Attendees" value={event.attendees} />
                        <div className="h-px bg-slate-200/50" />
                        <InfoItem icon={Mail} label="Organizer" value={event.organizer} subValue={event.contact} />
                    </div>
                </div>

                <div className="pt-4 space-y-4">
                    <Button className="w-full h-16 rounded-2xl bg-[#1e3a8a] text-white font-black tracking-widest uppercase shadow-xl shadow-blue-900/20 active:scale-95 transition-all">
                        REGISTER NOW
                    </Button>
                    <p className="text-[9px] text-center font-bold text-slate-400 uppercase tracking-widest px-4">
                        * Early bird pricing ends on Nov 15th
                    </p>
                </div>

                {/* Social Share in Sidebar */}
                <div className="pt-8 border-t border-slate-200/50">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 text-center">Spread the Word</div>
                    <div className="flex justify-center gap-3">
                        <SocialIcon icon={Linkedin} />
                        <SocialIcon icon={Twitter} />
                        <SocialIcon icon={Facebook} />
                        <SocialIcon icon={Share2} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function InfoItem({ icon: Icon, label, value, subValue }: any) {
    return (
        <div className="flex gap-4">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#1e3a8a] shadow-sm">
                <Icon className="w-4.5 h-4.5" />
            </div>
            <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{label}</p>
                <p className="text-sm font-bold text-slate-900 leading-snug">{value}</p>
                {subValue && <p className="text-[10px] font-medium text-slate-500 mt-1">{subValue}</p>}
            </div>
        </div>
    );
}

function SocialIcon({ icon: Icon }: any) {
    return (
        <button className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:bg-[#1e3a8a] hover:text-white hover:-translate-y-1 transition-all duration-300">
            <Icon className="w-4 h-4" />
        </button>
    );
}
