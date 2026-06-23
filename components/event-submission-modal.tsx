"use client";

import React, { useState } from "react";
import { X, Calendar, MapPin, Tag, User, Mail, Plus, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EventSubmissionModalProps {
    onClose: () => void;
}

export default function EventSubmissionModal({ onClose }: EventSubmissionModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate submission
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />
                <div className="relative w-full max-w-[460px] p-12 text-center bg-white rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Submitted!</h2>
                    <p className="text-slate-500 font-medium">
                        Your event has been sent for review. Our team will contact you shortly.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden rounded-[3rem] border border-white/10 bg-white shadow-2xl animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-8 pt-10 pb-6 border-b border-slate-50 relative">
                    <button
                        onClick={onClose}
                        className="absolute right-8 top-8 rounded-full bg-slate-100 p-2 text-slate-500 transition-all hover:bg-slate-200"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-4 mb-2">
                        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                            <Plus className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Submit Your Event</h2>
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Share with our global community</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Event Basics */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Details</label>
                            <Input
                                placeholder="EVENT TITLE"
                                className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 px-6 font-bold text-sm"
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="CATEGORY"
                                        className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 pl-12 pr-6 font-bold text-xs"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="DATE RANGE"
                                        className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 pl-12 pr-6 font-bold text-xs"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    placeholder="LOCATION OR VIRTUAL URL"
                                    className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 pl-12 pr-6 font-bold text-xs"
                                    required
                                />
                            </div>
                            <Textarea
                                placeholder="EVENT DESCRIPTION..."
                                className="min-h-[120px] rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 px-6 py-4 font-bold text-xs leading-relaxed"
                                required
                            />
                        </div>

                        {/* Organizer Info */}
                        <div className="space-y-4 pt-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Organizer Information</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="CONTACT NAME"
                                        className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 pl-12 pr-6 font-bold text-xs"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        type="email"
                                        placeholder="CONTACT EMAIL"
                                        className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 pl-12 pr-6 font-bold text-xs"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-16 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 font-black text-lg shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] mt-4"
                        >
                            {isLoading ? (
                                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    SUBMIT FOR REVIEW <Sparkles className="w-5 h-5" />
                                </span>
                            )}
                        </Button>

                        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            By submitting, you agree to our curator guidelines
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
