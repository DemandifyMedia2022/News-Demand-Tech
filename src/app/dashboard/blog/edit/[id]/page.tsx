"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditSubmission({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;

    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        category: "",
        subcategory: "",
        cover_image: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`/api/blog/submissions/${id}`);
                if (!res.ok) {
                    if (res.status === 401) router.push("/write-for-us");
                    throw new Error("Failed to load submission");
                }
                const data = await res.json();

                // Populate form data
                setFormData({
                    title: data.submission.title || "",
                    excerpt: data.submission.excerpt || "",
                    content: data.submission.content || "",
                    meta_title: data.submission.meta_title || "",
                    meta_description: data.submission.meta_description || "",
                    meta_keywords: data.submission.meta_keywords || "",
                    category: data.submission.category || "",
                    subcategory: data.submission.subcategory || "",
                    cover_image: data.submission.cover_image || "",
                });

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            const res = await fetch(`/api/blog/submissions/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to update");
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this submission?")) return;
        try {
            const res = await fetch(`/api/blog/submissions/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            router.push("/dashboard");
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (loading) return <div className="min-h-screen py-24 flex justify-center text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen py-24 bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Submission</h1>
                        <p className="text-gray-500 mt-2">Update your pending draft.</p>
                    </div>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete Draft
                    </Button>
                </div>

                {error && (
                    <div className="mb-6 p-4 text-red-700 bg-red-50 rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Title</label>
                            <Input
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="The Future of AI in B2B"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Excerpt</label>
                            <Textarea
                                required
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                placeholder="A short summary of your article..."
                                className="h-20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <Input
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="Technology"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Subcategory</label>
                            <Input
                                required
                                value={formData.subcategory}
                                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                                placeholder="AI & Machine Learning"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Cover Image URL</label>
                            <Input
                                value={formData.cover_image}
                                onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Content (Markdown supported)</label>
                            <Textarea
                                required
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Write your full article here..."
                                className="min-h-[300px]"
                            />
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="space-y-6">
                        <h3 className="text-lg font-medium text-gray-900">SEO Settings (Optional)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Meta Title</label>
                                <Input
                                    value={formData.meta_title}
                                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                    placeholder="SEO optimized title"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Meta Keywords</label>
                                <Input
                                    value={formData.meta_keywords}
                                    onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                                    placeholder="AI, B2B, Tech"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Meta Description</label>
                                <Textarea
                                    value={formData.meta_description}
                                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                    placeholder="SEO description..."
                                    className="h-20"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
