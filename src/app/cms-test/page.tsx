"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CmsBlog } from "@/lib/types";

export default function CmsTestPage() {
  const [items, setItems] = useState<CmsBlog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const unoptimized = process.env.NODE_ENV === "development";

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          type: "blog",
          limit: "500",
          offset: "0",
          published: "true",
        });

        const res = await fetch(`/api/cms/query?${params.toString()}`, { cache: "no-store" });
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          const message = typeof data?.error === "string" ? data.error : `Request failed (${res.status})`;
          throw new Error(message);
        }

        const result = Array.isArray(data?.result) ? (data.result as CmsBlog[]) : [];
        if (!cancelled) setItems(result);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        if (!cancelled) {
          setItems([]);
          setError(msg);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const total = items.length;
  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const x of items) {
      const k = (x?.category || "(no category)").toString();
      map.set(k, (map.get(k) || 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [items]);

  return (
    <>
      <main className="min-h-screen pt-28 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">CMS Blogs Test</h1>
                <p className="text-sm text-gray-500 mt-1">
                  This page fetches blogs via <span className="font-mono">/api/cms/query</span> and renders them.
                </p>
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-semibold">Total:</span> {total}
              </div>
            </div>

            {isLoading && (
              <div className="mt-6 text-sm text-gray-600">Loading from CMS…</div>
            )}

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <div className="font-semibold">CMS fetch failed</div>
                <div className="mt-1 font-mono break-words">{error}</div>
                <div className="mt-3 text-red-700/80">
                  Check <span className="font-mono">CMS_BASE_URL</span>, <span className="font-mono">CMS_API_KEY</span>, and restart the dev server.
                </div>
              </div>
            )}

            {!isLoading && !error && (
              <div className="mt-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {byCategory.map(([cat, count]) => (
                    <span key={cat} className="px-3 py-1 rounded-full text-xs font-bold bg-gray-50 border border-gray-200 text-gray-700">
                      {cat}: {count}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((post, index) => (
                    <Link
                      key={post.slug || post._id || String(index)}
                      href={`/blog/${post.slug || post._id}`}
                      className="group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow"
                    >
                      <div className="relative aspect-[16/10] bg-gray-100">
                        <Image
                          src={post.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"}
                          alt={post.title || "Blog"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized={unoptimized}
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.category && (
                            <span className="px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700">
                              {post.category}
                            </span>
                          )}
                          {Array.isArray(post.subcategories) && post.subcategories.length > 0 && (
                            <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-gray-50 text-gray-700">
                              {post.subcategories.join(", ")}
                            </span>
                          )}
                          {(!Array.isArray(post.subcategories) || post.subcategories.length === 0) && post.subcategory && (
                            <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-gray-50 text-gray-700">
                              {post.subcategory}
                            </span>
                          )}
                        </div>

                        <h2 className="text-lg font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
                          {post.title || "Untitled"}
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt || ""}</p>

                        <div className="mt-4 text-xs text-gray-500 flex items-center justify-between">
                          <span className="font-semibold">{post.author || ""}</span>
                          <span>{post.publishDate || post.readTime || ""}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {items.length === 0 && (
                  <div className="mt-6 text-sm text-gray-600">
                    No posts returned. If you have posts in CMS, check that they are marked <span className="font-mono">published=true</span> and their taxonomy matches the whitelist.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
