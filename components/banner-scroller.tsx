"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface ScrollArticle {
  _id?: string;
  id?: string;
  title: string;
  category?: string;
}

export function Banner({ size = "md" }: { size?: "xl" | "md" | "sm" }) {
  const sizes = {
    xl: "h-[420px]",
    md: "h-[260px]",
    sm: "h-[160px]",
  };

  return (
    <div
      className={`${sizes[size]} relative overflow-hidden rounded-[28px] 
      bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.85),rgba(255,255,255,0.55))] border border-[color:var(--border)]`}
    >
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[rgba(168,85,247,0.18)] blur-3xl" />
      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[rgba(109,40,217,0.14)] blur-3xl" />
      <div className="absolute inset-0 backdrop-blur-[10px]" />
    </div>
  );
}

export default function BannerScroller() {
  const [blogs, setBlogs] = useState<ScrollArticle[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/cms/query?type=blog&limit=10", { cache: "no-store" });
        const data = await res.json();
        if (data && data.result) {
          setBlogs(data.result);
        }
      } catch (err) {
        console.error("Failed to fetch blogs for scroller:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="w-full border-t border-[color:var(--border)] bg-white/80 backdrop-blur-xl py-2 relative overflow-hidden">
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 80s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex animate-marquee whitespace-nowrap items-center py-1">
        {/* First set of items */}
        {blogs.length > 0 ? (
          blogs.map((blog, idx) => (
            <div key={`idx1-${blog._id || idx}`} className="flex items-center gap-5 px-6 group">
              <span className="text-[11px] font-black text-blue-600 uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded">
                Update
              </span>
              <Link
                href={`/blog/${blog.id || blog._id}`}
                className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors uppercase tracking-tight"
              >
                {blog.title}
              </Link>
              <div className="h-1 w-1 rounded-full bg-blue-600/30" />
            </div>
          ))
        ) : (
          <div className="flex items-center gap-4 px-6 text-xs font-semibold text-gray-500">
            Loading latest Tech updates...
          </div>
        )}

        {/* Duplicate set for seamless loop */}
        {blogs.length > 0 ? (
          blogs.map((blog, idx) => (
            <div key={`idx2-${blog._id || idx}`} className="flex items-center gap-5 px-6 group">
              <span className="text-[11px] font-black text-blue-600 uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded">
                Update
              </span>
              <Link
                href={`/blog/${blog.id || blog._id}`}
                className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors uppercase tracking-tight"
              >
                {blog.title}
              </Link>
              <div className="h-1 w-1 rounded-full bg-blue-600/30" />
            </div>
          ))
        ) : (
          <div className="flex items-center gap-4 px-6 text-xs font-semibold text-gray-500">
            Loading latest Tech updates...
          </div>
        )}
      </div>
    </div>
  );
}
