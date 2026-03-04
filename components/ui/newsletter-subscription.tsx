"use client";

import { useState } from "react";
import { Send, Check, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewsletterSubscription() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
            setTimeout(() => setStatus("idle"), 5000);
        }, 1500);
    };

    return (
        <div className="group relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-xl border border-white/60 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:border-[#1e3a8a]/20">
            {/* Background Accent */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#1e3a8a]/5 blur-3xl transition-all group-hover:bg-[#1e3a8a]/10"></div>

            <div className="relative">
                {/* Icon & Badge */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] shadow-lg shadow-[#1e3a8a]/20">
                        <Send className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-[#1e3a8a]/10 bg-[#1e3a8a]/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">
                        <Sparkles className="h-3 w-3" />
                        WEEKLY DIGEST
                    </div>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-2xl font-black tracking-tighter text-[#1e3a8a] uppercase">
                    The Demand <span className="text-[#000000]">Pulse</span>
                </h3>
                <p className="mb-8 text-sm font-bold leading-relaxed text-[#000000]/50 uppercase tracking-tighter">
                    Join 12,000+ tech leaders for exclusive weekly insights on B2B marketing & innovation.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative group/input">
                        <input
                            type="email"
                            required
                            placeholder="YOUR WORK EMAIL"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-700 outline-none transition-all focus:border-[#1e3a8a]/40 focus:ring-4 focus:ring-[#1e3a8a]/5"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        className={cn(
                            "group/btn relative w-full overflow-hidden rounded-2xl py-4 transition-all duration-300 active:scale-95",
                            status === "success"
                                ? "bg-green-600 shadow-lg shadow-green-500/20"
                                : "bg-[#1e3a8a] shadow-xl shadow-[#1e3a8a]/20 hover:bg-[#1e40af]"
                        )}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white">
                            {status === "loading" ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : status === "success" ? (
                                <>
                                    <Check className="h-4 w-4" />
                                    SUBSCRIBED
                                </>
                            ) : (
                                <>
                                    JOIN NOW
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                </>
                            )}
                        </span>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transition-all group-hover/btn:h-full"></div>
                    </button>

                    <p className="text-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                        Zero spam. Premium insights only.
                    </p>
                </form>
            </div>
        </div>
    );
}
