"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User, Sparkles, ArrowRight, Github, Chrome, Phone, Building2, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthModalProps {
    onClose: () => void;
    onSuccess: () => void;
    initialMode?: "login" | "signup";
}

export default function AuthModal({ onClose, onSuccess, initialMode = "login" }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(initialMode === "login");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate auth
        setTimeout(() => {
            setIsLoading(false);
            onSuccess();
        }, 1500);
    };

    const handleGoogleAuth = () => {
        setIsLoading(true);
        // This initiates a real Google account picker redirect
        // In a production environment, you would use your Google Client ID here
        const clientId = "YOUR_GOOGLE_CLIENT_ID"; // Placeholder for real ID
        const redirectUri = window.location.origin + "/api/auth/callback/google";
        const scope = "email profile openid";
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=select_account`;

        window.location.href = authUrl;
    };

    const handleGithubAuth = () => {
        setIsLoading(true);
        const clientId = "YOUR_GITHUB_CLIENT_ID"; // Placeholder for real ID
        const redirectUri = window.location.origin + "/api/auth/callback/github";
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;

        window.location.href = authUrl;
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Professional Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[460px] max-h-[92vh] flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl animate-in zoom-in-95 duration-300 dark:bg-slate-900">
                {/* Header Section (Fixed at top) */}
                <div className="relative px-8 pt-8 pb-4">
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-6 z-10 rounded-full bg-slate-100 p-2 text-slate-500 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1e3a8a] shadow-lg shadow-blue-900/10">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {isLogin ? "Welcome Back" : "Join Our Professional Network"}
                        </h2>
                        <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {isLogin
                                ? "Access your premium tech insights"
                                : "Create a mandatory professional account to continue"}
                        </p>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto px-8 pb-10 scrollbar-hide">
                    {/* Social Auth */}
                    <div className="grid grid-cols-2 gap-4 my-6">
                        <button
                            type="button"
                            onClick={handleGoogleAuth}
                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                        >
                            <Chrome className="h-4 w-4 text-blue-600" />
                            GOOGLE
                        </button>
                        <button
                            type="button"
                            onClick={handleGithubAuth}
                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                        >
                            <Github className="h-4 w-4 text-slate-900 dark:text-white" />
                            GITHUB
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100 dark:border-slate-800" />
                        </div>
                        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em]">
                            <span className="bg-white px-4 text-slate-400 dark:bg-slate-900">
                                or use professional email
                            </span>
                        </div>
                    </div>

                    {/* Form - All fields mandatory */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <>
                                <div className="group relative">
                                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1e3a8a]" />
                                    <input
                                        type="text"
                                        placeholder="FULL NAME"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-4 pl-12 pr-4 text-xs font-bold outline-none transition-all focus:bg-white focus:border-[#1e3a8a] focus:ring-4 focus:ring-[#1e3a8a]/5 dark:border-slate-800 dark:bg-slate-950/30 dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="group relative">
                                    <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1e3a8a]" />
                                    <input
                                        type="tel"
                                        placeholder="PHONE NUMBER"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-4 pl-12 pr-4 text-xs font-bold outline-none transition-all focus:bg-white focus:border-[#1e3a8a] focus:ring-4 focus:ring-[#1e3a8a]/5 dark:border-slate-800 dark:bg-slate-950/30 dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="group relative">
                                    <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1e3a8a]" />
                                    <input
                                        type="text"
                                        placeholder="COMPANY NAME"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-4 pl-12 pr-4 text-xs font-bold outline-none transition-all focus:bg-white focus:border-[#1e3a8a] focus:ring-4 focus:ring-[#1e3a8a]/5 dark:border-slate-800 dark:bg-slate-950/30 dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="group relative">
                                    <Briefcase className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1e3a8a]" />
                                    <input
                                        type="text"
                                        placeholder="JOB TITLE"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-4 pl-12 pr-4 text-xs font-bold outline-none transition-all focus:bg-white focus:border-[#1e3a8a] focus:ring-4 focus:ring-[#1e3a8a]/5 dark:border-slate-800 dark:bg-slate-950/30 dark:text-white"
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <div className="group relative">
                            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1e3a8a]" />
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-4 pl-12 pr-4 text-xs font-bold outline-none transition-all focus:bg-white focus:border-[#1e3a8a] focus:ring-4 focus:ring-[#1e3a8a]/5 dark:border-slate-800 dark:bg-slate-950/30 dark:text-white"
                                required
                            />
                        </div>
                        <div className="group relative">
                            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1e3a8a]" />
                            <input
                                type="password"
                                placeholder="PASSWORD"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-4 pl-12 pr-4 text-xs font-bold outline-none transition-all focus:bg-white focus:border-[#1e3a8a] focus:ring-4 focus:ring-[#1e3a8a]/5 dark:border-slate-800 dark:bg-slate-950/30 dark:text-white"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full overflow-hidden rounded-xl bg-[#1e3a8a] py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-blue-800 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                        >
                            <span className="relative flex items-center justify-center gap-2 tracking-widest pt-0.5">
                                {isLoading ? (
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                ) : (
                                    <>
                                        {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Navigation */}
                    <p className="mt-8 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        {isLogin ? "Join our network?" : "Have a profile?"}{" "}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-1 text-[#1e3a8a] underline underline-offset-4 hover:text-blue-700 dark:text-blue-400"
                        >
                            {isLogin ? "GET STARTED" : "LOGIN"}
                        </button>
                    </p>
                </div>

                {/* Status Bar */}
                {isLoading && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-100 dark:bg-slate-800">
                        <div className="h-full bg-blue-600 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    </div>
                )}
            </div>
        </div>
    );
}
