import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cms } from '@/lib/cms-client';
import { BlogPost } from '@/lib/types';

export const revalidate = 60;

export default async function BlogListingPage() {
    const posts: BlogPost[] = await cms.fetch('blog');

    return (
        <div className="min-h-screen bg-[var(--background)] py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 mt-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Latest Insights</h1>
                    <p className="text-xl text-[color:var(--muted-foreground)] max-w-2xl mx-auto">
                        Stay ahead of the curve with our latest thoughts on B2B technology, demand generation, and marketing innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post._id} href={`/blog/${post.slug}`} className="group">
                            <article className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-[color:var(--border)] transition-all duration-300 hover:shadow-2xl hover:border-[#1e3a8a]">
                                <div className="relative h-48 w-full overflow-hidden">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[color:var(--surface-2)]" />
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-semibold text-[#1e3a8a] uppercase tracking-wider">
                                            {new Date(post._createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold text-black mb-3 group-hover:text-[#1e3a8a] transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-[color:var(--muted-foreground)] text-sm line-clamp-3 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto flex items-center text-[#1e3a8a] font-semibold text-sm">
                                        Read More
                                        <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-medium text-[color:var(--muted-foreground)]">No blog posts found. Check back soon!</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
