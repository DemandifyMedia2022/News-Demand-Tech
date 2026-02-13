"use client";

import React, { useState, useEffect, useRef } from "react";
import type { ComponentType } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/ui/header-3";
import {
    Clock,
    MapPin,
    Building2,
    Phone,
    Mail,
    Send,
    Loader2,
    XCircle,
    CheckCircle2,
    Sparkles,
    ArrowRight,
    MessageSquare,
    Zap,
    Headphones,
} from "lucide-react";
import gsap from "gsap";

type ContactInfo = {
    title: string;
    icon: ComponentType<{ className?: string }>;
    description: string;
}[];

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        consent: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);
    const [websiteValidation, setWebsiteValidation] = useState<{
        isValid: boolean;
        message: string;
    } | null>(null);

    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".animate-in", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
            });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "company") {
            if (value === "") {
                setWebsiteValidation(null);
            } else if (validateCompanyWebsite(value)) {
                setWebsiteValidation({ isValid: true, message: "Valid format" });
            } else {
                setWebsiteValidation({
                    isValid: false,
                    message: 'Format: www.example.com',
                });
            }
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, consent: e.target.checked }));
    };

    const validateCompanyWebsite = (website: string): boolean => {
        if (!website) return true;
        const cleanWebsite = website.replace(/^https?:\/\//, "").toLowerCase();
        const websitePattern = /^www\.[a-zA-Z0-9-]+\.com$/;
        return websitePattern.test(cleanWebsite);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.consent) {
            setSubmitStatus({ type: "error", message: "Please agree to receive communications" });
            return;
        }

        if (formData.company && !validateCompanyWebsite(formData.company)) {
            setSubmitStatus({ type: "error", message: 'Website format: www.example.com' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSubmitStatus({ type: "success", message: "Thank you! We'll respond within 24 hours." });
            setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", message: "", consent: false });
            setWebsiteValidation(null);
        } catch {
            setSubmitStatus({ type: "error", message: "Failed to submit. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo: ContactInfo = [
        { title: "Office Hours", icon: Clock, description: "Mon - Fri, 10 AM - 7 PM" },
        { title: "Location", icon: MapPin, description: "Liberty House, DIFC, Dubai" },
        { title: "Email", icon: Mail, description: "hello@news-demand-tech.com" },
        { title: "Phone", icon: Phone, description: "+1-316-888-9685" },
    ];

    return (
        <>
            <Header />
            <main ref={pageRef} className="relative min-h-screen bg-[var(--background)] pt-20 pb-8 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#1e3a8a]/8 rounded-full blur-3xl" />
                    <div className="absolute top-1/3 -right-32 w-64 h-64 bg-[#1e40af]/6 rounded-full blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.02]" style={{
                        backgroundImage: `linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }} />
                </div>

                <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
                    {/* Compact Header */}
                    <div className="animate-in text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-[#1e3a8a]/10 shadow-sm mb-3">
                            <MessageSquare size={12} className="text-[#1e3a8a]" />
                            <span className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-wider">Get in Touch</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                            Contact Our <span className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] bg-clip-text text-transparent">Team</span>
                        </h1>
                        <p className="text-sm text-gray-600 max-w-lg mx-auto">
                            Share your requirements and we&apos;ll get back to you within 24 hours.
                        </p>
                    </div>

                    {/* Quick Info Bar */}
                    <div className="animate-in grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                        {contactInfo.map((info, index) => {
                            const IconComponent = info.icon;
                            return (
                                <div key={index} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/80 backdrop-blur border border-[#1e3a8a]/10 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center flex-shrink-0">
                                        <IconComponent className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{info.title}</p>
                                        <p className="text-xs font-semibold text-gray-900 truncate">{info.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Main Grid */}
                    <div className="animate-in grid lg:grid-cols-[1fr_340px] gap-4">
                        {/* Form Card */}
                        <Card className="border border-[#1e3a8a]/10 bg-white/95 backdrop-blur shadow-xl">
                            <CardContent className="p-5 sm:p-6">
                                {/* Status Message */}
                                {submitStatus && (
                                    <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${submitStatus.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
                                        }`}>
                                        {submitStatus.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                        <span className="flex-1 font-medium">{submitStatus.message}</span>
                                        <button onClick={() => setSubmitStatus(null)} className="hover:bg-white/50 p-0.5 rounded">
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Row 1: Names */}
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">First Name *</label>
                                            <Input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" required disabled={isSubmitting}
                                                className="h-10 rounded-lg border-gray-200 focus-visible:ring-[#1e3a8a]/50" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name *</label>
                                            <Input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" required disabled={isSubmitting}
                                                className="h-10 rounded-lg border-gray-200 focus-visible:ring-[#1e3a8a]/50" />
                                        </div>
                                    </div>

                                    {/* Row 2: Email & Phone */}
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                                            <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" required disabled={isSubmitting}
                                                className="h-10 rounded-lg border-gray-200 focus-visible:ring-[#1e3a8a]/50" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
                                            <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 123-4567" disabled={isSubmitting}
                                                className="h-10 rounded-lg border-gray-200 focus-visible:ring-[#1e3a8a]/50" />
                                        </div>
                                    </div>

                                    {/* Row 3: Company */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Company Website</label>
                                        <Input name="company" value={formData.company} onChange={handleInputChange} placeholder="www.yourcompany.com" disabled={isSubmitting}
                                            className={`h-10 rounded-lg focus-visible:ring-[#1e3a8a]/50 ${websiteValidation === null ? "border-gray-200" : websiteValidation.isValid ? "border-green-400" : "border-red-400"
                                                }`} />
                                        {websiteValidation && (
                                            <p className={`text-[10px] mt-1 flex items-center gap-1 ${websiteValidation.isValid ? "text-green-600" : "text-red-600"}`}>
                                                {websiteValidation.isValid ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                {websiteValidation.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Row 4: Message */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Message *</label>
                                        <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your requirements..." rows={4} required disabled={isSubmitting}
                                            className="rounded-lg border-gray-200 focus:ring-[#1e3a8a]/50" />
                                    </div>

                                    {/* Consent */}
                                    <div className="flex items-start gap-2">
                                        <input id="consent" type="checkbox" checked={formData.consent} onChange={handleCheckboxChange} disabled={isSubmitting}
                                            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1e3a8a] focus:ring-[#1e3a8a]" />
                                        <label htmlFor="consent" className="text-xs text-gray-600 leading-relaxed">
                                            I agree to receive communications from News Demand-Tech.
                                        </label>
                                    </div>

                                    {/* Submit */}
                                    <button type="submit" disabled={isSubmitting}
                                        className="group w-full bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#1e3a8a]/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                        {isSubmitting ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                                        ) : (
                                            <>Submit Message <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" /></>
                                        )}
                                    </button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Right Sidebar */}
                        <div className="space-y-3">
                            {/* CTA Card */}
                            <Card className="border-0 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] text-white shadow-xl overflow-hidden relative">
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-4 right-4 w-20 h-20 border border-white rounded-full" />
                                    <div className="absolute bottom-4 left-4 w-16 h-16 border border-white rounded-full" />
                                </div>
                                <CardContent className="p-5 relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Zap size={18} className="text-yellow-300" />
                                        <h3 className="font-bold">Quick Response</h3>
                                    </div>
                                    <p className="text-blue-100 text-sm leading-relaxed">
                                        Our team typically responds within 24 hours. For urgent inquiries, call us directly.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Support Card */}
                            <Card className="border border-[#1e3a8a]/10 bg-white/95">
                                <CardContent className="p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center">
                                            <Headphones size={18} className="text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">Need Immediate Help?</h4>
                                            <p className="text-xs text-gray-500">Our support team is ready</p>
                                        </div>
                                    </div>
                                    <a href="tel:+13168889685" className="block w-full text-center py-2.5 rounded-lg bg-[#1e3a8a]/10 text-[#1e3a8a] font-semibold text-sm hover:bg-[#1e3a8a]/20 transition-colors">
                                        Call +1-316-888-9685
                                    </a>
                                </CardContent>
                            </Card>

                            {/* Map Card */}
                            <Card className="border border-[#1e3a8a]/10 bg-white/95 overflow-hidden">
                                <div className="h-40 relative">
                                    <iframe title="Office Location" src={`https://www.google.com/maps?q=${encodeURIComponent("Liberty House, DIFC, Dubai, UAE")}&output=embed`}
                                        className="absolute inset-0 w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-2">
                                        <Building2 size={16} className="text-[#1e3a8a] mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">News Demand-Tech</p>
                                            <p className="text-xs text-gray-500">Liberty House, DIFC, Dubai, UAE</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Trust Badge */}
                            <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/60 border border-[#1e3a8a]/10">
                                <Sparkles size={14} className="text-[#1e3a8a]" />
                                <span className="text-xs font-medium text-gray-600">Trusted by 50,000+ B2B Teams</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
