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
    Plus,
    CheckCircle2,
    Trophy,
    Filter,
    Search,
    Sparkles
} from "lucide-react";
import { Header } from "@/components/ui/header-3";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EventSubmissionModal from "@/components/event-submission-modal";

// Mock Data Structure
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
}

const MOCK_EVENTS: Event[] = [
    {
        id: "1",
        slug: "global-tech-summit-2025",
        title: "Global AI & B2B Tech Summit 2025",
        description: "The definitive gathering for B2B tech leaders, focusing on the intersection of AI, demand generation, and customer experience. Join 5,000+ industry peers for three days of intensive learning and networking.",
        excerpt: "The definitive gathering for B2B tech leaders, focusing on AI and demand generation.",
        type: 'Hybrid',
        category: 'AI & ML',
        date: "June 15-17, 2025",
        location: "San Francisco, CA & Virtual",
        attendees: "5,000+",
        duration: "3 Days",
        image: "/img/featured_event.png",
        status: 'upcoming'
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
        status: 'upcoming'
    },
    {
        id: "3",
        slug: "marteq-expo-2025",
        title: "MarTeq Expo: Marketing Automation Reimagined",
        description: "Explore the latest in marketing technology and how to build a unified stack that drives revenue.",
        excerpt: "Latest innovations in marketing technology and unified stack strategies.",
        type: 'Virtual',
        category: 'MarTeq',
        date: "August 5, 2025",
        location: "Global / Virtual",
        attendees: "2,500+",
        duration: "2 Days",
        image: "/img/standard_event.png",
        status: 'upcoming'
    },
    {
        id: "4",
        slug: "cxteq-innovation-lab",
        title: "CXTeq Innovation Lab: Human-Centric Design",
        description: "A workshop-style event focused on customer experience and human-centric design in the age of automation.",
        excerpt: "Workshop on customer experience and human-centric design strategies.",
        type: 'In-person',
        category: 'CXTeq',
        date: "September 12, 2025",
        location: "Austin, TX",
        attendees: "300+",
        duration: "1 Day",
        image: "/img/standard_event.png",
        status: 'upcoming'
    },
    {
        id: "5",
        slug: "hrteq-future-of-work",
        title: "HRTeq: The Future of Remote Talent",
        description: "How technology is reshaping recruitment, retention, and culture in a remote-first world.",
        excerpt: "Insights into reshaping recruitment and culture for remote work.",
        type: 'Virtual',
        category: 'HRTeq',
        date: "October 20, 2024",
        location: "Global / Virtual",
        attendees: "1,500+",
        duration: "1 Day",
        image: "/img/standard_event.png",
        status: 'past'
    },
    {
        id: "6",
        slug: "demand-gen-workshop-2024",
        title: "Advanced Demand Gen Workshop",
        description: "Hands-on workshop for growth marketers on account-based marketing and lead scoring.",
        excerpt: "Hands-on ABM and lead scoring workshop for growth marketers.",
        type: 'In-person',
        category: 'Strategy',
        date: "November 12, 2024",
        location: "New York, NY",
        attendees: "150+",
        duration: "1 Day",
        image: "/img/standard_event.png",
        status: 'past'
    }
];

export default function EventsPage() {
    const [showModal, setShowModal] = useState(false);
    const featuredEvent = MOCK_EVENTS[0];
    const upcomingEvents = MOCK_EVENTS.filter(e => e.status === 'upcoming' && e.id !== featuredEvent.id);
    const pastEvents = MOCK_EVENTS.filter(e => e.status === 'past');

    return (
        <>
            <Header />
            <main className="relative bg-[var(--background)] pt-24 overflow-hidden">
                {/* Decorative Backgrounds */}
                <div className="pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-blue-600/5 blur-3xl" />
                <div className="pointer-events-none absolute -right-56 top-32 h-[40rem] w-[40rem] rounded-full bg-blue-600/5 blur-3xl" />

                {/* Hero Section */}
                <section className="relative py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                        <div className="flex flex-col items-center text-center space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-50 px-4 py-2">
                                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                                <span className="text-sm font-bold text-blue-900 uppercase tracking-wider italic">Expert Networking</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                                Connect. Learn. <span className="text-blue-600">Grow.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                                Join our curated series of tech events, workshops, and summits designed for professionals shaping the future of B2B technology.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button className="h-14 px-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-105">
                                    Browse All Events
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-14 px-10 rounded-xl border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-all flex items-center gap-2"
                                    onClick={() => setShowModal(true)}
                                >
                                    <Plus className="w-5 h-5" /> Submit Your Event
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Event Showcase */}
                <section className="py-12 bg-white/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                        <div className="flex items-center gap-2 mb-8">
                            <Sparkles className="w-6 h-6 text-blue-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Featured Event Showcase</h2>
                        </div>

                        <Card className="group overflow-hidden border-blue-600/10 shadow-2xl rounded-[2.5rem] bg-white/70 backdrop-blur-xl">
                            <CardContent className="p-0">
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    <div className="relative h-80 lg:h-auto overflow-hidden">
                                        <Image
                                            src={featuredEvent.image}
                                            alt={featuredEvent.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                                Featured Event
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                                            <span>{featuredEvent.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-blue-300" />
                                            <span>{featuredEvent.type}</span>
                                        </div>
                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                                            {featuredEvent.title}
                                        </h3>
                                        <p className="text-gray-600 text-lg leading-relaxed">
                                            {featuredEvent.description}
                                        </p>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-gray-100">
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Date</span>
                                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                                    <Calendar className="w-4 h-4 text-blue-600" />
                                                    <span className="text-sm">{featuredEvent.date}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Location</span>
                                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                                    <MapPin className="w-4 h-4 text-blue-600" />
                                                    <span className="text-sm">{featuredEvent.location}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Attendees</span>
                                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                                    <Users className="w-4 h-4 text-blue-600" />
                                                    <span className="text-sm">{featuredEvent.attendees}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Duration</span>
                                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                                    <Clock className="w-4 h-4 text-blue-600" />
                                                    <span className="text-sm">{featuredEvent.duration}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Link href={`/event/${featuredEvent.slug}`}>
                                                <Button className="h-12 px-8 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold transition-all flex items-center gap-2 group/btn">
                                                    View Details <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Upcoming Events Grid */}
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
                                <p className="text-gray-500 max-w-xl">
                                    Don&apos;t miss out on these upcoming opportunities to level up your skills and network with leaders.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search events..."
                                        className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all w-64 text-sm"
                                    />
                                </div>
                                <Button variant="outline" className="rounded-xl border-gray-100 h-10 px-4 flex items-center gap-2">
                                    <Filter className="w-4 h-4" /> Filter
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.map((event) => (
                                <Link key={event.id} href={`/event/${event.slug}`} className="group">
                                    <Card className="h-full border-gray-100 hover:border-blue-600/30 hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden flex flex-col bg-white">
                                        <div className="relative h-56 overflow-hidden">
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-widest border border-white/20 shadow-sm">
                                                    {event.category}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 right-4">
                                                <span className="bg-gray-900/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest">
                                                    {event.type}
                                                </span>
                                            </div>
                                        </div>
                                        <CardContent className="p-8 flex-1 flex flex-col justify-between space-y-4">
                                            <div className="space-y-3">
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                                                    {event.title}
                                                </h3>
                                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                                    {event.excerpt}
                                                </p>
                                            </div>

                                            <div className="pt-4 space-y-3 border-t border-gray-50">
                                                <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                                                    <Calendar className="w-4 h-4 text-blue-600" />
                                                    <span>{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                                                    <MapPin className="w-4 h-4 text-blue-600" />
                                                    <span>{event.location}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Past Events Recap */}
                <section className="py-24 bg-gray-50/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                        <div className="flex flex-col items-center text-center space-y-4 mb-16">
                            <div className="inline-flex items-center gap-2 rounded-full border border-green-600/20 bg-green-50 px-4 py-2">
                                <Trophy className="w-4 h-4 text-green-600" />
                                <span className="text-xs font-bold text-green-900 uppercase tracking-widest">2024 Highlights</span>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900">Past Events Recap</h2>
                            <p className="text-gray-500 max-w-xl text-lg">
                                Caught the highlights? Look back at our most impactful events and sessions from the past year.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {pastEvents.map((event) => (
                                <div key={event.id} className="group relative">
                                    <Card className="bg-white border-transparent hover:border-gray-200 shadow-lg hover:shadow-xl transition-all rounded-3xl overflow-hidden grayscale hover:grayscale-0 opacity-80 hover:opacity-100">
                                        <CardContent className="p-0 flex flex-col sm:flex-row">
                                            <div className="relative w-full sm:w-1/3 h-48 sm:h-auto overflow-hidden">
                                                <Image
                                                    src={event.image}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gray-900/10" />
                                            </div>
                                            <div className="p-8 flex-1 flex flex-col justify-center space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{event.category}</span>
                                                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">
                                                        <CheckCircle2 className="w-3 h-3" /> Completed
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {event.title}
                                                </h3>
                                                <p className="text-gray-500 text-sm line-clamp-2">
                                                    {event.excerpt}
                                                </p>
                                                <div className="flex items-center gap-4 pt-2">
                                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                                                        <Calendar className="w-3 h-3" /> {event.date}
                                                    </div>
                                                    <Link href={`/event/${event.slug}`} className="text-xs font-bold text-gray-900 hover:text-blue-600 flex items-center gap-1 ml-auto">
                                                        Read Recap <ArrowUpRight className="w-3 h-3" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Button variant="outline" className="rounded-xl border-gray-200 px-8 font-bold">
                                View All Past Events
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Community Submission CTA */}
                <section className="py-24">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6">
                        <Card className="bg-blue-600 border-none shadow-[0_20px_50px_rgba(30,58,138,0.3)] rounded-[3rem] overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl capitalize" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                            <CardContent className="p-12 md:p-20 text-center relative z-10">
                                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                                    Have an event the community should know about?
                                </h2>
                                <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                                    Submit your tech events, webinars, or workshops to our global audience of B2B decision-makers and professionals.
                                </p>
                                <Button
                                    className="h-16 px-12 rounded-2xl bg-white text-blue-600 hover:bg-blue-50 font-black text-lg transition-all hover:scale-105 shadow-xl"
                                    onClick={() => setShowModal(true)}
                                >
                                    Submit Your Event Now
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <Footer />
            </main>

            {showModal && (
                <EventSubmissionModal onClose={() => setShowModal(false)} />
            )}
        </>
    );
}
