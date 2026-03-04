"use client";

import React, { useState } from "react";
import { X, Link as LinkIcon, Facebook, Twitter, Linkedin, Mail, Check, Share2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareModalProps {
    eventTitle: string;
    eventDescription?: string;
    eventUrl: string;
    onClose: () => void;
}

export function ShareModal({ eventTitle, eventDescription, eventUrl, onClose }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(eventUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/95 p-1 shadow-2xl backdrop-blur-3xl animate-in zoom-in duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/10 via-transparent to-blue-500/10" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 z-10 rounded-full bg-slate-100 p-2.5 text-slate-500 transition-all hover:bg-[#1e3a8a] hover:text-white"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="relative p-10">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] shadow-xl shadow-[#1e3a8a]/20">
                            <Share2 className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
                            Spread Wisdom
                        </h2>
                        <p className="mt-2 text-sm font-bold text-slate-500/60 uppercase tracking-widest">
                            Share this insight with your network
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="mb-10 grid grid-cols-4 gap-4">
                        {[
                            {
                                icon: Linkedin,
                                name: 'LINKEDIN',
                                color: 'bg-[#0077b5]',
                                hover: 'hover:bg-[#005885]',
                                url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`
                            },
                            {
                                icon: Twitter,
                                name: 'X',
                                color: 'bg-[#000000]',
                                hover: 'hover:bg-slate-800',
                                url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(eventTitle)}`
                            },
                            {
                                icon: Facebook,
                                name: 'FACEBOOK',
                                color: 'bg-[#1877f2]',
                                hover: 'hover:bg-[#0d65d9]',
                                url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`
                            },
                            {
                                icon: Mail,
                                name: 'EMAIL',
                                color: 'bg-[#1e3a8a]',
                                hover: 'hover:bg-[#1e40af]',
                                url: `mailto:?subject=${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(eventUrl)}`
                            }
                        ].map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-2"
                                title={social.name}
                            >
                                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-all group-hover:scale-110", social.color, social.hover)}>
                                    <social.icon className="h-5 w-5" />
                                </div>
                                <span className="text-[10px] font-black tracking-tighter text-slate-400 group-hover:text-[#1e3a8a]">
                                    {social.name}
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Copy Link */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Direct Link
                        </h3>
                        <div className="relative flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 border-dashed">
                            <div className="flex-1 truncate pl-3 text-xs font-bold text-slate-500">
                                {eventUrl}
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className={cn(
                                    "flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-black transition-all",
                                    copied
                                        ? "bg-green-600 text-white"
                                        : "bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
                                )}
                            >
                                {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                                {copied ? "COPIED" : "COPY"}
                            </button>
                        </div>
                    </div>

                    {/* Context Footer */}
                    <div className="mt-10 rounded-2xl bg-[#1e3a8a]/5 p-5 border border-[#1e3a8a]/10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]/40 mb-2">Subject</p>
                        <p className="text-sm font-black text-[#1e3a8a] line-clamp-1">{eventTitle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
