"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    ArrowLeft,
    Share2,
    CheckCircle2,
    Globe,
    Mail,
    ExternalLink,
    ChevronRight
} from "lucide-react";
import { Header } from "@/components/ui/header-3";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

// Reusing same mock data for consistency
interface Event {
    id: string;
    slug: string;
    title: string;
    description: string;
    excerpt: string;
    type: 'Hybrid' | 'In-person' | 'Virtual';
    category: string;
    date: string;
    location: string;
    attendees: string;
    duration: string;
    image: string;
    status: 'upcoming' | 'past';
    organizer?: { name: string; email: string; website?: string };
    cost?: string;
}

const MOCK_EVENTS: Event[] = [
    {
        id: "1",
        slug: "global-tech-summit-2025",
        title: "Global AI & B2B Tech Summit 2025",
        description: `
      The definitive gathering for B2B tech leaders, focusing on the intersection of AI, demand generation, and customer experience. Join 5,000+ industry peers for three days of intensive learning and networking.
      
      This summit will feature keynotes from industry titans, deep-dive workshops, and unmatched networking opportunities. Whether you're a CMO looking for the next growth lever or a CTO building AI-first infrastructure, this event is built for you.
      
      Key Themes:
      - The Future of Generative AI in B2B
      - Scaling ABM with Data Intelligence
      - Human-Centric Innovation in a Digital World
      - Transitioning from Insights to Pipeline
    `,
        excerpt: "The definitive gathering for B2B tech leaders, focusing on AI and demand generation.",
        type: 'Hybrid',
        category: 'AI & ML',
        date: "June 15-17, 2025",
        location: "San Francisco, CA & Virtual",
        attendees: "5,000+",
        duration: "3 Days",
        image: "/img/featured_event.png",
        status: 'upcoming',
        organizer: { name: "Demand Tech Events", email: "events@demandtech.com", website: "https://summit.demandtech.com" },
        cost: "Early Bird: $499 | General: $899"
    },
    {
        id: "2",
        slug: "finteq-roundtable-london",
        title: "FinTeq Leadership Roundtable: Future of Payments",
        description: "An exclusive invite-only event for financial technology executives to discuss the evolving landscape of global payments.",
        excerpt: "Exclusive roundtable for fintech executives on the future of global payments.",
        type: 'In-person',
        category: 'FinTeq',
        date: "July 22, 2025",
        location: "London, UK",
        attendees: "100+",
        duration: "1 Day",
        image: "/img/standard_event.png",
        status: 'upcoming',
        organizer: { name: "FinTeq Global", email: "london@finteq.com" },
        cost: "Invite Only"
    }
];

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const event = MOCK_EVENTS.find(e => e.slug === slug);

    if (!event) {
        return notFound();
    }

    return (
        <>
            <Header />
            <main className="relative bg-[var(--background)] pt-24 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
                    {/* Breadcrumbs / Back Button */}
                    <div className="mb-10">
                        <Link href="/event" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all">
                            <ArrowLeft className="w-4 h-4" /> Back to Events
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content Area */}
                        <div className="lg:col-span-8 space-y-10">
                            {/* Header */}
                            <div className="space-y-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        {event.category}
                                    </span>
                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gray-200">
                                        {event.type}
                                    </span>
                                    {event.status === 'past' && (
                                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-200 flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> Event Concluded
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                                    {event.title}
                                </h1>
                                <div className="flex items-center gap-6 py-6 border-y border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Date</span>
                                            <span className="text-sm font-bold text-gray-900">{event.date}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Location</span>
                                            <span className="text-sm font-bold text-gray-900">{event.location}</span>
                                        </div>
                                    </div>
                                    <div className="ml-auto flex items-center gap-3">
                                        <Button variant="outline" className="h-10 w-10 p-0 rounded-full border-gray-200">
                                            <Share2 className="w-4 h-4 text-gray-600" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Main Image */}
                            <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-black/5">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Content Body */}
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100">
                                <div className="prose prose-lg prose-blue max-w-none">
                                    {event.description.split('\n').map((para, i) => (
                                        para.trim() && <p key={i} className="text-gray-600 leading-relaxed mb-6">{para.trim()}</p>
                                    ))}

                                    {event.status === 'upcoming' && (
                                        <div className="mt-12 p-8 bg-blue-50 rounded-3xl border border-blue-100">
                                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Why Attend?</h3>
                                            <ul className="space-y-4">
                                                {[
                                                    "Direct access to top industry experts and thought leaders.",
                                                    "Actionable insights you can implement immediately in your B2B strategy.",
                                                    "Network with thousands of peers from around the globe.",
                                                    "Exclusive first looks at the latest technology innovations."
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-blue-800">
                                                        <ChevronRight className="w-5 h-5 mt-1 shrink-0" />
                                                        <span className="font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Event Info Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-28 space-y-8">
                                {/* Registration Card */}
                                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                                    <div className="bg-gray-900 p-8 text-white">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Registration</span>
                                        <h3 className="text-2xl font-bold">{event.cost || "Free Registration"}</h3>
                                    </div>
                                    <CardContent className="p-8 space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                                <div className="flex items-center gap-3 text-gray-500">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Duration</span>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{event.duration}</span>
                                            </div>
                                            <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                                <div className="flex items-center gap-3 text-gray-500">
                                                    <Users className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Expected</span>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{event.attendees}</span>
                                            </div>
                                            <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                                <div className="flex items-center gap-3 text-gray-500">
                                                    <Globe className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Language</span>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">English</span>
                                            </div>
                                        </div>

                                        <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-lg shadow-blue-600/20 transition-all">
                                            {event.status === 'upcoming' ? 'Register Now' : 'View Post-Event Content'}
                                        </Button>

                                        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                            Registration closes 2 days before the event
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Organizer Info */}
                                <Card className="border-gray-100 shadow-xl rounded-[2.5rem] bg-white/50 backdrop-blur-md">
                                    <CardContent className="p-8 space-y-6">
                                        <h3 className="text-xl font-bold text-gray-900">Organizer Details</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-900 font-bold">
                                                    {event.organizer?.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <span className="text-sm font-bold text-gray-900 block">{event.organizer?.name}</span>
                                                    <span className="text-xs text-gray-500">Trusted Partner</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2 pt-2">
                                                <a href={`mailto:${event.organizer?.email}`} className="flex items-center gap-3 text-xs font-bold text-gray-600 hover:text-blue-600 transition-colors">
                                                    <Mail className="w-4 h-4" /> {event.organizer?.email}
                                                </a>
                                                {event.organizer?.website && (
                                                    <a href={event.organizer.website} target="_blank" className="flex items-center gap-3 text-xs font-bold text-gray-600 hover:text-blue-600 transition-colors">
                                                        <ExternalLink className="w-4 h-4" /> Visit Website
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Share Card */}
                                <div className="p-8 rounded-[2.5rem] bg-gray-900 text-white flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold">Share this event</h4>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Spread the word with your network</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-full bg-white/10 hover:bg-white/20">
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </main>
        </>
    );
}
