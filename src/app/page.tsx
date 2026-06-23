"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar, Hash, Users, Sparkles } from "lucide-react";
import { Header } from "@/components/ui/header-3";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RedHatBanner } from "@/components/red-hat-banner";
import { NewsletterSignup } from "@/components/newsletter-signup";

interface Article {
  _id?: string;
  id?: string;
  slug?: string;
  category?: string;
  subcategory?: string;
  readTime?: string;
  publishDate?: string;
  title?: string;
  excerpt?: string;
  image?: string;
  author?: string;
  author_name?: string; // For community posts
  created_at?: string; // For community posts
}

export default function Home() {
  const [editorialBlogs, setEditorialBlogs] = useState<Article[]>([]);
  const [communityBlogs, setCommunityBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Editorial Blogs
        const editorialRes = await fetch("/api/cms/query?type=blog&limit=10", { cache: "no-store" });
        const editorialData = await editorialRes.json();
        setEditorialBlogs(editorialData?.result || []);

        // Fetch Community Blogs
        const communityRes = await fetch("/api/community/posts", { cache: "no-store" });
        const communityData = await communityRes.json();
        setCommunityBlogs(communityData?.posts?.slice(0, 6) || []);
      } catch (error) {
        console.error("Home page data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const highlights = editorialBlogs.slice(0, 3);
  const featured = editorialBlogs.slice(0, 3);
  const latestNews = editorialBlogs.slice(3, 9);

  return (
    <>
      <Header />
      <main className="relative bg-[var(--background)] pt-24 overflow-hidden">
        {/* Decorative Backgrounds */}
        <div className="pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-blue-600/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-56 top-32 h-[40rem] w-[40rem] rounded-full bg-blue-600/5 blur-3xl" />

        {/* Hero Section */}
        <section className="relative py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Side: Content */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-50 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-sm font-bold text-blue-900 uppercase tracking-wider">Premium Tech Insights</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                  Signal over noise for modern <span className="text-blue-600">B2B decision-makers.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                  Strategy, systems, and signals across demand, CX, HR, and fintech — built for teams shaping the next decade.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/tech">
                    <Button className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-105">
                      Explore News
                    </Button>
                  </Link>
                  <Link href="/event">
                    <Button variant="outline" className="h-12 px-8 rounded-xl border-gray-200 text-gray-900 font-bold hover:bg-gray-50 transition-all">
                      Upcoming Events
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Side: Highlights Box */}
              <div className="lg:col-span-5">
                <Card className="border-gray-100 shadow-2xl overflow-hidden bg-white/70 backdrop-blur-xl">
                  <CardContent className="p-0">
                    <div className="bg-gray-50/50 p-6 border-b border-gray-100">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        Today&apos;s Highlights
                      </h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {highlights.length > 0 ? (
                        highlights.map((post, i) => (
                          <Link key={post._id || i} href={`/blog/${post.slug || post._id}`} className="block p-6 hover:bg-blue-50/30 transition-colors group">
                            <span className="text-[10px] uppercase font-bold text-blue-600 tracking-widest block mb-2">{post.category}</span>
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                              {post.title}
                            </h3>
                          </Link>
                        ))
                      ) : (
                        <div className="p-6 text-gray-400 text-sm italic">Loading highlights...</div>
                      )}
                    </div>
                    <div className="p-6 bg-gray-50/30">
                      <Link href="/tech" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-2">
                        Read All Trending Stories <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Verticals Grid */}
        <section className="py-12 border-y border-gray-100 bg-white/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "HRTeq", desc: "Human Resources Tech", href: "/tech/hrteq", color: "bg-blue-600", label: "HR" },
                { name: "MarTeq", desc: "Marketing Technology", href: "/tech/marteq", color: "bg-indigo-600", label: "MAR" },
                { name: "FinTeq", desc: "Financial Innovations", href: "/tech/finteq", color: "bg-cyan-600", label: "FIN" },
                { name: "CXTeq", desc: "Customer Experience", href: "/tech/cxteq", color: "bg-blue-500", label: "CX" },
              ].map((category) => (
                <Link key={category.name} href={category.href} className="group">
                  <Card className="hover:border-blue-600/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`h-12 w-12 shrink-0 rounded-xl ${category.color} flex items-center justify-center text-white font-bold text-sm shadow-inner`}>
                        {category.label}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{category.name}</h3>
                        <p className="text-xs text-gray-500">{category.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Stories */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-50 px-4 py-2">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">In-Depth Analysis</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Featured Stories</h2>
              <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {featured.length > 0 ? (
                featured.map((post, i) => (
                  <Card key={post._id || i} className="group overflow-hidden border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.image || "/img/placeholder.webp"}
                        alt={post.title || ""}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-widest border border-white/20 shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-8 space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime || "5 MIN"}</div>
                        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.publishDate}</div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
                            {post.author ? post.author.charAt(0) : "A"}
                          </div>
                          <span className="text-xs font-bold text-gray-700">{post.author}</span>
                        </div>
                        <Link href={`/blog/${post.slug || post._id}`} className="text-blue-600 font-bold text-sm flex items-center gap-1 group/link">
                          Read article <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                [1, 2, 3].map((n) => <div key={n} className="h-[500px] rounded-3xl bg-gray-50 animate-pulse border border-gray-100" />)
              )}
            </div>
          </div>
        </section>

        {/* Latest Tech News (Mixed Feed) */}
        <section className="py-20 bg-gray-50/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center justify-between mb-12 border-b border-gray-200 pb-6">
              <h2 className="text-3xl font-bold text-gray-900">Latest Tech News</h2>
              <Link href="/tech" className="text-blue-600 font-bold flex items-center gap-1 hover:underline">
                View All <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Feed */}
              <div className="lg:col-span-8 space-y-6">
                {latestNews.length > 0 ? (
                  latestNews.map((post, i) => (
                    <Link key={post._id || i} href={`/blog/${post.slug || post._id}`} className="group block">
                      <Card className="bg-white border-transparent hover:border-blue-600/20 hover:shadow-xl shadow-sm transition-all rounded-2xl overflow-hidden">
                        <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                          <div className="relative w-full sm:w-1/3 h-48 sm:h-auto overflow-hidden">
                            <Image
                              src={post.image || "/img/placeholder.webp"}
                              alt={post.title || ""}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center space-y-3">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">
                              <span>BY {post.author}</span>
                              <span className="h-1 w-1 rounded-full bg-gray-300" />
                              <span>{post.publishDate}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                ) : (
                  [1, 2, 3].map((n) => <div key={n} className="h-40 rounded-2xl bg-white animate-pulse" />)
                )}
              </div>

              {/* Sidebar: Promotion/Banner */}
              <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-28 space-y-10">
                  <RedHatBanner className="max-w-full !h-[300px] !shadow-2xl" />

                  {/* Trending Topics List */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Hash className="w-5 h-5 text-blue-600" />
                      Trending Topics
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "AI & Machine Learning", count: "2.4k" },
                        { name: "Cybersecurity", count: "1.8k" },
                        { name: "Blockchain", count: "1.1k" },
                        { name: "Cloud Strategy", count: "950" }
                      ].map((topic) => (
                        <div key={topic.name} className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 group cursor-pointer hover:border-blue-600/30 transition-all">
                          <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">#{topic.name}</span>
                          <span className="text-[11px] font-black text-gray-400 uppercase tracking-tighter bg-gray-50 px-2 py-0.5 rounded">{topic.count} ARTICLES</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Publications (Community Feed) */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-50 px-4 py-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">Community Voice</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Recent Publications</h2>
                <p className="text-gray-500 max-w-xl text-lg">
                  Direct insights and stories shared by our community of technology experts and enthusiasts.
                </p>
              </div>
              <Link href="/community">
                <Button variant="outline" className="rounded-xl border-gray-200 font-bold px-8">
                  View All Community Stream
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communityBlogs.length > 0 ? (
                communityBlogs.map((post, i) => (
                  <Link key={post._id || post.id || i} href={`/community/${post.slug}`} className="group">
                    <Card className="h-full bg-white border-gray-100 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col">
                      <div className="p-8 flex-1 space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">
                          <span>{post.category}</span>
                          <span className="text-gray-300">•</span>
                          <span>{new Date(post.created_at || "").toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-relaxed line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="px-8 py-6 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm uppercase">
                            {post.author_name ? post.author_name.charAt(0) : "U"}
                          </div>
                          <span className="text-xs font-bold text-gray-800">{post.author_name}</span>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-gray-300 transition-colors group-hover:text-blue-600" />
                      </div>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-400 italic bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
                  Be the first to share your voice in our community.
                </div>
              )}
            </div>
          </div>
        </section>

        <NewsletterSignup />
      </main>
    </>
  );
}
