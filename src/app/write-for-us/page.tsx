"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WriteForUsPage() {
    const [view, setView] = useState<"login" | "register" | "forgot">("login");
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (view === "login") {
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: formData.email, password: formData.password })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Login failed");
                router.push("/dashboard");
            } else if (view === "register") {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Registration failed");
                router.push("/dashboard");
            } else if (view === "forgot") {
                // Mock forgot password for now as it wasn't strictly required in API routes
                await new Promise(r => setTimeout(r, 1000));
                setError("If an account exists, a reset link has been sent.");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-24 flex items-center justify-center bg-gray-50/50">
            <div className="max-w-md w-full mx-auto p-8 bg-white shadow-xl shadow-[#1e3a8a]/5 rounded-2xl border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        {view === "login" && "Welcome back"}
                        {view === "register" && "Join the Community"}
                        {view === "forgot" && "Reset Password"}
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        {view === "login" && "Sign in to your account to write and manage your posts."}
                        {view === "register" && "Create an account to submit your ideas to our audience."}
                        {view === "forgot" && "Enter your email to receive a password reset link."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    {view === "register" && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <Input
                                type="text"
                                placeholder="John Doe"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    {view !== "forgot" && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Please wait..." : view === "login" ? "Sign In" : view === "register" ? "Sign Up" : "Send Reset Link"}
                    </Button>
                </form>

                <div className="mt-6 flex flex-col items-center space-y-2 text-sm text-gray-500">
                    {view === "login" && (
                        <>
                            <button onClick={() => setView("forgot")} className="hover:text-[#1e3a8a] transition-colors">
                                Forgot password?
                            </button>
                            <div className="pt-2">
                                Don&apos;t have an account?{" "}
                                <button onClick={() => setView("register")} className="font-semibold text-[#1e3a8a] hover:underline">
                                    Sign up
                                </button>
                            </div>
                        </>
                    )}

                    {view === "register" && (
                        <div>
                            Already have an account?{" "}
                            <button onClick={() => setView("login")} className="font-semibold text-[#1e3a8a] hover:underline">
                                Sign in
                            </button>
                        </div>
                    )}

                    {view === "forgot" && (
                        <button onClick={() => setView("login")} className="font-semibold text-[#1e3a8a] hover:underline flex items-center gap-1">
                            &larr; Back to login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
