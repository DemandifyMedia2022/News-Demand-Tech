import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cms } from '@/lib/cms-client';
import { BlogPost } from '@/lib/types';
import { RichTextRenderer } from '@/components/rich-text-renderer';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';

export const revalidate = 60;

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const posts: BlogPost[] = await cms.fetch('blog');
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-[var(--background)] py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-10 mt-10">
                    <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-[#1e3a8a] transition-all hover:gap-2">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>
                </div>

                {/* Header Section */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-[color:var(--muted-foreground)] border-y border-[color:var(--border)] py-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post._createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Published by Demandteq
                        </div>
                        <div className="ml-auto">
                            <button className="flex items-center gap-2 text-[#1e3a8a] font-semibold hover:text-[#1e40af]">
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Image */}
                {post.image && (
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl mb-12 ring-1 ring-black/5">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[color:var(--border)] prose-headings:text-black">
                    <div className="text-lg leading-relaxed text-[color:var(--muted-foreground)]">
                        <RichTextRenderer content={post.content} />
                    </div>
                </div>
            </div>
        </article>
    );
}
