"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Submission {
    id: number;
    title: string;
    category: string;
    status: string;
    created_at: string;
    slug: string;
}

export default function DashboardOverview() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const [communityPosts, setCommunityPosts] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/blog/submissions");
                if (!res.ok) {
                    if (res.status === 401) {
                        router.push("/write-for-us");
                        return;
                    }
                    throw new Error("Failed to load submissions");
                }
                const data = await res.json();
                setSubmissions(data.submissions || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        async function fetchCommunity() {
            try {
                const res = await fetch("/api/community/posts");
                if (res.ok) {
                    const data = await res.json();
                    setCommunityPosts(data.posts?.slice(0, 5) || []);
                }
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
        fetchCommunity();
    }, [router]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/write-for-us");
    };

    if (loading) return <div className="min-h-screen py-24 flex justify-center text-gray-500 font-medium">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50/50 py-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-outfit">Your Dashboard</h1>
                        <p className="text-gray-500 mt-2">Manage your blog submissions or start a new one.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/blog/new">
                            <Button className="rounded-xl shadow-lg shadow-[#1e3a8a]/20">New Post</Button>
                        </Link>
                        <Button variant="outline" onClick={handleLogout} className="rounded-xl border-gray-200">Log Out</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Your Submissions</h2>
                        {submissions.length === 0 ? (
                            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
                                <p className="text-gray-500 mb-6">You haven&apos;t submitted any posts yet.</p>
                                <Link href="/dashboard/blog/new">
                                    <Button className="rounded-xl">Create Your First Submission</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-100">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Title</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-50">
                                        {submissions.map((sub) => (
                                            <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="text-sm font-semibold text-gray-900 line-clamp-1">{sub.title}</div>
                                                    <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">
                                                        {new Date(sub.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-blue-50 text-[#1e3a8a] uppercase tracking-wider">
                                                        {sub.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <span className={`px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider ${sub.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                                                            sub.status === 'reviewed' ? 'bg-green-50 text-green-700' :
                                                                'bg-red-50 text-red-700'
                                                        }`}>
                                                        {sub.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                                                    {sub.status === 'pending' ? (
                                                        <Link href={`/dashboard/blog/edit/${sub.id}`} className="text-[#1e3a8a] font-bold hover:underline">
                                                            Edit
                                                        </Link>
                                                    ) : sub.status === 'reviewed' ? (
                                                        <Link href={`/community/${sub.slug}`} className="text-green-600 font-bold hover:underline">
                                                            View
                                                        </Link>
                                                    ) : (
                                                        <span className="text-gray-300">Locked</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Community Stream</h2>
                        <div className="space-y-4">
                            {communityPosts.length === 0 ? (
                                <p className="text-sm text-gray-400 italic">No community posts yet.</p>
                            ) : (
                                communityPosts.map((post) => (
                                    <Link href={`/community/${post.slug}`} key={post.id} className="block group">
                                        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group-hover:-translate-y-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[10px] font-bold text-[#1e3a8a] bg-blue-50 px-2 py-0.5 rounded uppercase">{post.category}</span>
                                                <span className="text-[10px] text-gray-300">•</span>
                                                <span className="text-[10px] text-gray-400">{post.author_name}</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#1e3a8a] line-clamp-2 leading-snug">
                                                {post.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))
                            )}
                            <div className="pt-4">
                                <Link href="/community" className="text-sm text-[#1e3a8a] hover:underline font-bold flex items-center gap-2">
                                    View Full Stream <span className="text-lg">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
