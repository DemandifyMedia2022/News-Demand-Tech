"use client";

import React, { useState } from "react";
import { X, Save, Eye, PenSquare, Image, Tag, Type, Sparkles, Loader2, Check, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogEditorProps {
    onClose: () => void;
}

export default function BlogEditor({ onClose }: BlogEditorProps) {
    const [formData, setFormData] = useState({
        title: "",
        category: "AI & ML",
        excerpt: "",
        content: "",
    });
    const [isPublishing, setIsPublishing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const categories = ["AI & ML", "HRTeq", "CXTeq", "Marketing", "Technology", "Leadership"];

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPublishing(true);

        // Simulate API call
        setTimeout(() => {
            setIsPublishing(false);
            setIsSuccess(true);
            setTimeout(onClose, 2000);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Editor Modal */}
            <div className="relative h-full max-h-[95vh] w-full max-w-6xl overflow-hidden rounded-[3rem] border border-white/20 bg-white/95 p-1 shadow-2xl backdrop-blur-3xl animate-in zoom-in duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/5 via-transparent to-blue-500/5" />

                {/* Header Bar */}
                <div className="relative flex items-center justify-between border-b border-[#1e3a8a]/10 px-10 py-8">
                    <div className="flex items-center gap-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] shadow-xl shadow-[#1e3a8a]/20 text-white">
                            <PenSquare className="h-7 w-7" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tighter text-[#1e3a8a] uppercase">Studio Editor</h2>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Drafting: {formData.title || "Untitled Insight"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-xs font-black text-slate-500 transition-all hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a] uppercase tracking-widest">
                            <Save className="h-4 w-4" />
                            Draft
                        </button>
                        <button
                            onClick={handlePublish}
                            disabled={isPublishing || isSuccess}
                            className={cn(
                                "group relative flex items-center gap-2 overflow-hidden rounded-xl px-8 py-3 text-xs font-black text-white transition-all hover:scale-105 active:scale-95 uppercase tracking-widest",
                                isSuccess ? "bg-green-600" : "bg-[#1e3a8a] shadow-xl shadow-[#1e3a8a]/20"
                            )}
                        >
                            {isPublishing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : isSuccess ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                <Sparkles className="h-4 w-4" />
                            )}
                            {isPublishing ? "Processing" : isSuccess ? "Completed" : "Publish Now"}
                        </button>
                        <button
                            onClick={onClose}
                            className="ml-4 rounded-full bg-slate-100 p-3 text-slate-400 transition-all hover:bg-[#1e3a8a] hover:text-white"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Editor Body */}
                <div className="relative grid h-[calc(95vh-160px)] grid-cols-1 overflow-y-auto lg:grid-cols-4 scrollbar-hide">
                    {/* Main Input Area */}
                    <div className="col-span-3 space-y-12 p-12 border-r border-[#1e3a8a]/10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Article Title</label>
                            <textarea
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter a visionary headline..."
                                className="w-full resize-none border-none bg-transparent text-5xl font-black tracking-tighter text-[#1e3a8a] outline-none placeholder:text-[#1e3a8a]/10"
                                rows={2}
                            />
                        </div>

                        <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Intellectual Content</label>
                            <div className="relative min-h-[500px] rounded-[2.5rem] bg-slate-50/50 p-10 border border-slate-100">
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Begin sharing your expertise..."
                                    className="h-full min-h-[450px] w-full resize-none bg-transparent text-xl font-medium leading-relaxed text-[#1e3a8a] outline-none placeholder:text-[#1e3a8a]/20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Settings Area */}
                    <div className="space-y-12 bg-[#1e3a8a]/5 p-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">
                                <Tag className="h-4 w-4" />
                                Classification
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, category: cat })}
                                        className={cn(
                                            "rounded-xl px-4 py-3 text-[10px] font-black tracking-widest transition-all text-left uppercase",
                                            formData.category === cat
                                                ? "bg-[#1e3a8a] text-white shadow-lg"
                                                : "bg-white text-slate-400 hover:text-[#1e3a8a] border border-slate-100"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">
                                <Type className="h-4 w-4" />
                                Executive Summary
                            </div>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                placeholder="Core insights in 2 sentences..."
                                className="w-full rounded-2xl border border-slate-100 bg-white p-5 text-xs font-bold text-[#1e3a8a] outline-none transition-all focus:border-[#1e3a8a] focus:ring-4 focus:ring-[#1e3a8a]/5"
                                rows={4}
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">
                                <Image className="h-4 w-4" />
                                Visual Asset
                            </div>
                            <button className="group relative flex w-full flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-[#1e3a8a]/20 bg-white p-10 transition-all hover:bg-[#1e3a8a] hover:border-transparent">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 group-hover:bg-white/20">
                                    <Image className="h-7 w-7 text-slate-400 group-hover:text-white" />
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-white">Upload Media</p>
                                    <p className="text-[8px] font-bold text-slate-400 group-hover:text-white/60">Limit 10MB</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
