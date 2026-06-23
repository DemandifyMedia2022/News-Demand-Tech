"use client";

import React, { useState } from "react";
import { Mail, Lock, User, Sparkles, ArrowRight, Loader2, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WriteForUsPage() {
    const [mode, setMode] = useState<"login" | "signup" | "forgot">("signup");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Simulation for UI demonstration
        setTimeout(() => {
            setIsLoading(false);
            if (mode === "signup" && formData.password !== formData.confirmPassword) {
                setError("Passwords do not match");
                return;
            }
            // For now, just redirect to a mock dashboard
            router.push("/dashboard");
        }, 1500);
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setMode("login");
            alert("Reset link sent!");
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-20 flex bg-[#F0F8FF]">
            {/* Left Side: Visual/Context */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1e3a8a]">
                <div className="absolute inset-0 opacity-40">
                    <Image
                        src="/img/b2b_tech_community_hero_1773054895945.png"
                        alt="Community Hero"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/90 via-[#1e3a8a]/70 to-blue-600/50" />

                <div className="relative z-10 w-full flex flex-col justify-center p-16 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
                        <Zap className="w-3.5 h-3.5 text-blue-300" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-100">Official Creator Program</span>
                    </div>

                    <h2 className="text-5xl font-black tracking-tight mb-6 leading-[1.1] animate-in fade-in slide-in-from-left-6 duration-700">
                        Amplify Your <br />
                        <span className="text-blue-300">Tech Voice.</span>
                    </h2>

                    <p className="text-lg text-blue-100/80 mb-12 max-w-md animate-in fade-in slide-in-from-left-8 duration-1000">
                        Join 50,000+ industry leaders sharing insights on Demand Tech. Build your authority in the B2B tech space today.
                    </p>

                    <div className="grid gap-6 animate-in fade-in slide-in-from-left-10 duration-1000">
                        {[
                            { icon: CheckCircle2, title: "Global Reach", desc: "Your content delivered to key decision makers." },
                            { icon: ShieldCheck, title: "Industry Authority", desc: "Verified creator badge for your profile." },
                            { icon: Sparkles, title: "Premium Tools", desc: "Access to our AI-powered content editor." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                                    <item.icon className="w-5 h-5 text-blue-300" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base">{item.title}</h4>
                                    <p className="text-sm text-blue-100/60">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]" />
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px]" />
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-[440px] animate-in fade-in zoom-in-95 duration-700">
                    <div className="mb-10 lg:hidden">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e3a8a] shadow-lg mb-4">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            {mode === "login" ? "Welcome Back" : "Join as Creator"}
                        </h1>
                    </div>

                    <div className="space-y-1 mb-10">
                        <h3 className="text-2xl font-bold text-slate-900 hidden lg:block">
                            {mode === "login" && "Login to Dashboard"}
                            {mode === "signup" && "Create Your Account"}
                            {mode === "forgot" && "Reset Password"}
                        </h3>
                        <p className="text-sm font-medium text-slate-500">
                            {mode === "login" && "Enter your credentials to manage your submissions."}
                            {mode === "signup" && "Fill in the details below to get started."}
                            {mode === "forgot" && "Instructions will be sent to your email."}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={mode === "forgot" ? handleForgotPassword : handleSubmit} className="space-y-5">
                        {mode === "signup" && (
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Full Name</label>
                                <div className="group relative">
                                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1e3a8a]" />
                                    <Input
                                        type="text"
                                        placeholder="John Doe"
                                        className="py-6 pl-12 pr-4 bg-white border-slate-200 focus:border-[#1e3a8a] rounded-xl"
                                        required
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Email Address</label>
                            <div className="group relative">
                                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1e3a8a]" />
                                <Input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="py-6 pl-12 pr-4 bg-white border-slate-200 focus:border-[#1e3a8a] rounded-xl"
                                    required
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {mode !== "forgot" && (
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Password</label>
                                    {mode === "login" && (
                                        <button
                                            type="button"
                                            onClick={() => setMode("forgot")}
                                            className="text-[10px] font-bold text-[#1e3a8a] hover:underline"
                                        >
                                            FORGOT?
                                        </button>
                                    )}
                                </div>
                                <div className="group relative">
                                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1e3a8a]" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="py-6 pl-12 pr-4 bg-white border-slate-200 focus:border-[#1e3a8a] rounded-xl"
                                        required
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}

                        {mode === "signup" && (
                            <div className="space-y-1.5 animate-in fade-in duration-500">
                                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Confirm Password</label>
                                <div className="group relative">
                                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1e3a8a]" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="py-6 pl-12 pr-4 bg-white border-slate-200 focus:border-[#1e3a8a] rounded-xl"
                                        required
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-7 mt-4 text-xs font-black tracking-[0.25em] rounded-xl shadow-xl shadow-blue-900/10 active:scale-[0.98] bg-[#1e3a8a] hover:bg-blue-800 transition-all duration-300"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-3">
                                    {mode === "login" ? "SIGN IN" : (mode === "forgot" ? "SEND RESET" : "GET STARTED")}
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                            {mode === "login" ? "New to the platform?" : "Already have an account?"}{" "}
                            <button
                                type="button"
                                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                                className="ml-1 text-[#1e3a8a] font-black hover:text-blue-800"
                            >
                                {mode === "login" ? "CREATE ACCOUNT" : "LOGIN"}
                            </button>
                        </p>
                    </div>

                    {mode === "forgot" && (
                        <div className="mt-6 text-center">
                            <button
                                type="button"
                                onClick={() => setMode("login")}
                                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600"
                            >
                                Back to login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
