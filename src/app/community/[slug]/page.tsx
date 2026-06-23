import { pool } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// The DB query
async function getCommunityPost(slug: string) {
    const client = await pool.connect();
    try {
        const result = await client.query(`
      SELECT b.id, b.title, b.content, b.excerpt, b.slug, b.cover_image, b.category, 
             b.subcategory, b.created_at, b.meta_title, b.meta_description, b.meta_keywords, 
             u.name as author_name
      FROM website_blog_submissions b
      JOIN website_users u ON b.user_id = u.id
      WHERE b.status = 'reviewed' AND b.slug = $1
    `, [slug]);

        if (result.rows.length === 0) return null;
        return { ...result.rows[0], created_at: result.rows[0].created_at.toISOString() };
    } catch (error) {
        console.error("Fetch community post error:", error);
        return null;
    } finally {
        client.release();
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getCommunityPost(slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        keywords: post.meta_keywords ? post.meta_keywords.split(',') : [post.category, post.subcategory],
    };
}

export default async function CommunityPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getCommunityPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white">
            {post.cover_image && (
                <div className="w-full h-64 md:h-96 w-full object-cover">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                </div>
            )}

            <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
                <div className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-x-4 text-sm mb-6">
                        <time dateTime={post.created_at} className="text-gray-500">
                            {new Date(post.created_at).toLocaleDateString()}
                        </time>
                        <span className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-[#1e3a8a]">
                            {post.category}
                        </span>
                        <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                            {post.subcategory}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-x-4 mt-8">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold uppercase text-lg">
                            {post.author_name.charAt(0)}
                        </div>
                        <div className="text-left">
                            <p className="font-semibold text-gray-900">{post.author_name}</p>
                            <p className="text-gray-500 text-sm">Community Contributor</p>
                        </div>
                    </div>
                </div>

                <div className="prose prose-lg md:prose-xl prose-blue max-w-none text-gray-700 mx-auto">
                    {/* We'll render raw HTML or basic text structure. Since it's a simple text area, using whitespace-pre-wrap works nicely for markdown-lite */}
                    <div className="whitespace-pre-wrap leading-relaxed">
                        {post.content}
                    </div>
                </div>

                <div className="mt-16 pt-16 border-t border-gray-100 text-center">
                    <h2 className="text-xl font-bold mb-4">Want to share your own insights?</h2>
                    <Link
                        href="/write-for-us"
                        className="inline-flex items-center justify-center rounded-xl bg-[#1e3a8a] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#1e40af]"
                    >
                        Become a Contributor
                    </Link>
                </div>
            </div>
        </article>
    );
}
