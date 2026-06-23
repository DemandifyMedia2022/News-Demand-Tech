import { pool } from "@/lib/db";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const revalidate = 60; // Revalidate every minute

async function getCommunityPosts() {
    const client = await pool.connect();
    try {
        const result = await client.query(`
      SELECT b.id, b.title, b.excerpt, b.slug, b.cover_image, b.category, b.created_at, u.name as author_name
      FROM website_blog_submissions b
      JOIN website_users u ON b.user_id = u.id
      WHERE b.status = 'reviewed'
      ORDER BY b.created_at DESC
    `);

        // We map so we serialize the dates to string or primitive for RSC
        return result.rows.map(row => ({
            ...row,
            created_at: row.created_at.toISOString()
        }));
    } catch (error) {
        console.error("Fetch community posts error:", error);
        return [];
    } finally {
        client.release();
    }
}

export default async function CommunityFeed() {
    const posts = await getCommunityPosts();

    return (
        <div className="min-h-screen pt-32 pb-24 bg-gray-50/50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                        Community Stream
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Insights, opinions, and stories from technology leaders around the globe.
                    </p>
                    <div className="mt-8">
                        <Link
                            href="/write-for-us"
                            className="inline-flex items-center justify-center rounded-xl bg-[#1e3a8a] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#1e40af] hover:shadow-lg active:scale-95"
                        >
                            Write for us
                        </Link>
                    </div>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No community posts yet. Be the first to publish!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/community/${post.slug}`} className="group relative flex flex-col items-start justify-between bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.created_at} className="text-gray-500">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </time>
                                    <span className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-[#1e3a8a] hover:bg-gray-100">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-4 text-xl font-semibold leading-relaxed text-gray-900 group-hover:text-[#1e3a8a] line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <div className="text-sm leading-6 flex gap-2 items-center">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold uppercase overflow-hidden">
                                            {post.author_name.charAt(0)}
                                        </div>
                                        <p className="font-semibold text-gray-900">
                                            <span className="absolute inset-0" />
                                            {post.author_name}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
