"use client";

import React, { useEffect, useRef } from "react";
import { Header } from "@/components/ui/header-3";
import { Card, CardContent } from "@/components/ui/card";
import {
    Sparkles,
    Users,
    Target,
    Zap,
    Brain,
    Shield,
    Cloud,
    Smartphone,
    TrendingUp,
    Award,
    Globe,
    BookOpen,
    ArrowRight,
    CheckCircle2,
    HeartHandshake,
    BarChart3,
    Lightbulb,
    Rocket,
} from "lucide-react";
import gsap from "gsap";

type FocusCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    gradient: string;
};

function FocusCard({ title, description, icon, gradient }: FocusCardProps) {
    return (
        <div className="group relative rounded-2xl border border-[#1e3a8a]/10 bg-white p-5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1e3a8a]/15 hover:border-[#1e3a8a]/20 overflow-hidden">
            {/* Hover gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
            {/* Top accent line */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1e3a8a] transition-colors">{title}</h4>
                <p className="text-sm leading-relaxed text-gray-600">{description}</p>
            </div>
        </div>
    );
}

type TopicItemProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
};

function TopicItem({ title, description, icon }: TopicItemProps) {
    return (
        <div className="group flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-white to-blue-50 border border-[#1e3a8a]/10 hover:border-[#1e3a8a]/20 hover:shadow-lg hover:shadow-[#1e3a8a]/10 transition-all duration-300 cursor-pointer hover:-translate-y-0.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <p className="text-sm font-bold text-[#1e3a8a]">{title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-gray-600">{description}</p>
            </div>
        </div>
    );
}

type StatItemProps = {
    value: string;
    label: string;
    icon: React.ReactNode;
};

function StatItem({ value, label, icon }: StatItemProps) {
    return (
        <div className="group text-center p-4 rounded-2xl bg-white border border-[#1e3a8a]/10 hover:border-[#1e3a8a]/20 hover:shadow-xl hover:shadow-[#1e3a8a]/10 transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] bg-clip-text text-transparent">
                {value}
            </p>
            <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
        </div>
    );
}

export default function AboutUsPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".animate-in", {
                y: 25,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
            });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    const focusAreas = [
        {
            title: "HRTeq",
            description: "Redefining workforce management with digital recruitment, payroll automation, and people analytics.",
            icon: <Users className="w-6 h-6 text-white" />,
            gradient: "from-[#1e3a8a] to-[#3b82f6]",
        },
        {
            title: "FinTeq",
            description: "FinTech, BankingTech, PayTech insights driving digital transformation and inclusive economies.",
            icon: <BarChart3 className="w-6 h-6 text-white" />,
            gradient: "from-[#1e40af] to-[#6366f1]",
        },
        {
            title: "CXTeq",
            description: "Reshaping customer engagement through automation, personalization, and omnichannel intelligence.",
            icon: <HeartHandshake className="w-6 h-6 text-white" />,
            gradient: "from-[#2563eb] to-[#8b5cf6]",
        },
    ];

    const topics = [
        { title: "Artificial Intelligence", description: "Ethics and applications across industries", icon: <Brain className="w-4 h-4 text-white" /> },
        { title: "Cyber Security", description: "Threats and protection best practices", icon: <Shield className="w-4 h-4 text-white" /> },
        { title: "Cloud Software", description: "Infrastructure and business solutions", icon: <Cloud className="w-4 h-4 text-white" /> },
        { title: "Mobile Technology", description: "Devices and connectivity innovation", icon: <Smartphone className="w-4 h-4 text-white" /> },
    ];

    const stats = [
        { value: "50K+", label: "Monthly Readers", icon: <Users className="w-5 h-5 text-white" /> },
        { value: "500+", label: "Articles", icon: <BookOpen className="w-5 h-5 text-white" /> },
        { value: "100+", label: "Experts", icon: <Award className="w-5 h-5 text-white" /> },
        { value: "2018", label: "Founded", icon: <Rocket className="w-5 h-5 text-white" /> },
    ];

    const values = [
        { title: "Innovation First", description: "Ahead of emerging trends", icon: <Lightbulb className="w-4 h-4" /> },
        { title: "Data-Driven", description: "Research-backed insights", icon: <BarChart3 className="w-4 h-4" /> },
        { title: "Business Focus", description: "Real outcome technology", icon: <Target className="w-4 h-4" /> },
        { title: "Global Reach", description: "Worldwide coverage", icon: <Globe className="w-4 h-4" /> },
    ];

    return (
        <>
            <Header />
            <main ref={pageRef} className="relative min-h-screen bg-[var(--background)] pt-24 pb-10 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-[#1e3a8a]/10 to-[#3b82f6]/5 rounded-full blur-3xl" />
                    <div className="absolute top-1/3 -right-32 w-96 h-96 bg-gradient-to-bl from-[#1e40af]/8 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-t from-[#2563eb]/6 to-transparent rounded-full blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.02]" style={{
                        backgroundImage: `radial-gradient(#1e3a8a 1px, transparent 1px)`,
                        backgroundSize: "32px 32px",
                    }} />
                </div>

                <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
                    {/* Hero Section */}
                    <header className="animate-in text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-[#1e3a8a]/10 shadow-lg shadow-[#1e3a8a]/5 mb-4">
                            <Sparkles size={14} className="text-[#1e3a8a]" />
                            <span className="text-[10px] sm:text-xs font-bold text-[#1e3a8a] uppercase tracking-wider">
                                Tech Publishing · Insight Hub
                            </span>
                            <Globe size={14} className="text-[#1e3a8a]" />
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-3">
                            About{" "}
                            <span className="bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#2563eb] bg-clip-text text-transparent">
                                News Demand-Tech
                            </span>
                        </h1>

                        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed mb-6">
                            Your trusted destination for technology news and industry insights across fast-evolving tech sectors.
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
                            {stats.map((stat, index) => (
                                <StatItem key={index} {...stat} />
                            ))}
                        </div>
                    </header>

                    {/* Main Grid */}
                    <div className="grid lg:grid-cols-[1fr_300px] gap-5">
                        {/* Left Content */}
                        <div className="space-y-5">
                            {/* Who We Are - Premium Card */}
                            <div className="animate-in relative rounded-3xl bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-[#1e3a8a]/15 shadow-2xl shadow-[#1e3a8a]/10 overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#1e3a8a]/5 rounded-full blur-2xl" />
                                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#2563eb]/5 rounded-full blur-2xl" />
                                    <div className="absolute top-8 right-8 w-24 h-24 border border-[#1e3a8a]/10 rounded-full" />
                                    <div className="absolute bottom-8 left-8 w-16 h-16 border border-[#1e3a8a]/10 rounded-full" />
                                </div>
                                <div className="relative z-10 p-6 sm:p-8">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e3a8a] mb-4">
                                        <Award size={14} className="text-yellow-300" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-white">Who We Are</span>
                                    </div>
                                    <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                                        News Demand-Tech is a global tech publication and insights hub focused on connecting innovation with business growth. We simplify complex technologies like AI, Cloud, FinTech, HRTech, CXTech, and Cybersecurity into actionable intelligence.
                                    </p>
                                </div>
                            </div>

                            {/* Mission Card */}
                            <Card className="animate-in border border-[#1e3a8a]/10 bg-white shadow-lg hover:shadow-xl transition-shadow">
                                <CardContent className="p-5 sm:p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center shadow-lg">
                                            <Target size={20} className="text-white" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        To make technology accessible and impactful by providing insights that bridge the gap between innovation and business outcomes. We empower leaders with the knowledge to make smarter decisions.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Focus Areas */}
                            <div className="animate-in">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center shadow-lg">
                                        <BookOpen size={20} className="text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">What We Cover</h2>
                                </div>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {focusAreas.map((area) => (
                                        <FocusCard key={area.title} {...area} />
                                    ))}
                                </div>
                            </div>

                            {/* Why Us Card */}
                            <Card className="animate-in border border-[#1e3a8a]/10 bg-white shadow-lg">
                                <CardContent className="p-5 sm:p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center shadow-lg">
                                            <Zap size={20} className="text-white" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">Why Choose Us</h2>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-sm mb-4">
                                        With years of experience in B2B content strategy and tech storytelling, we stand at the intersection of marketing intelligence and digital innovation.
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {values.map((value, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-[#1e3a8a]/5 to-transparent hover:from-[#1e3a8a]/10 transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-[#1e3a8a]/10 flex items-center justify-center text-[#1e3a8a]">
                                                    {value.icon}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-900">{value.title}</p>
                                                    <p className="text-[10px] text-gray-500">{value.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Sidebar */}
                        <aside className="space-y-4">
                            {/* Topics Card */}
                            <Card className="animate-in border border-[#1e3a8a]/10 bg-white shadow-lg">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center">
                                            <TrendingUp size={14} className="text-white" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-900">Sections We Cover</span>
                                    </div>
                                    <div className="space-y-2">
                                        {topics.map((topic, index) => (
                                            <TopicItem key={index} {...topic} />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Editorial Note */}
                            <Card className="animate-in border border-[#1e3a8a]/10 bg-gradient-to-br from-gray-50 to-white">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 size={14} className="text-[#1e3a8a]" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1e3a8a]">Editorial Note</span>
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        Every story bridges the gap between technology vision and business outcomes, connecting enterprise leaders and innovators.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* CTA Card */}
                            <div className="animate-in relative rounded-2xl bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] text-white shadow-xl overflow-hidden">
                                <div className="absolute inset-0">
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />
                                </div>
                                <div className="relative z-10 p-5 text-center">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-3">
                                        <Sparkles size={22} className="text-yellow-300" />
                                    </div>
                                    <h4 className="font-bold mb-1">Stay Updated</h4>
                                    <p className="text-xs text-blue-100/80 mb-4">Get the latest tech insights delivered to your inbox.</p>
                                    <a href="/contact-us" className="group inline-flex items-center gap-2 bg-white text-[#1e3a8a] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all hover:scale-105 shadow-lg">
                                        Contact Us
                                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </>
    );
}
