"use client";

import React, { useEffect, useMemo, useState } from "react";
import { BarChart2, TrendingUp, Zap, Sparkles } from "lucide-react";
import { CmsBlog } from "@/lib/types";

interface TopicCardProps {
  rank: string;
  title: string;
  articles: number;
  status: 'Hot' | 'Rising' | 'Trending' | 'New';
}

const TopicCard: React.FC<TopicCardProps> = ({ rank, title, articles, status }) => {
  let statusColorClass = '';
  let statusIcon;

  switch (status) {
    case 'Hot':
      statusColorClass = 'bg-red-100 text-red-600';
      statusIcon = <Zap size={12} className="inline-block mr-1" />;
      break;
    case 'Rising':
      statusColorClass = 'bg-blue-100 text-blue-600';
      statusIcon = <TrendingUp size={12} className="inline-block mr-1" />;
      break;
    case 'Trending':
      statusColorClass = 'bg-purple-100 text-purple-600';
      statusIcon = <TrendingUp size={12} className="inline-block mr-1" />;
      break;
    case 'New':
      statusColorClass = 'bg-yellow-100 text-yellow-600';
      statusIcon = <Sparkles size={12} className="inline-block mr-1" />;
      break;
  }

  return (
    <div className="bg-[var(--surface)] p-6 rounded-xl shadow-sm border border-[var(--border)]">
      <div className="flex justify-between items-start mb-2">
        <span className="text-4xl font-bold text-[var(--muted-foreground)]">{rank}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColorClass}`}>
          {statusIcon}{status}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--muted-foreground)] flex items-center">
        <BarChart2 size={14} className="mr-1" /> {articles.toLocaleString()} articles
      </p>
    </div>
  );
};

export const TrendingTopicsSection: React.FC = () => {
  const [items, setItems] = useState<CmsBlog[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const params = new URLSearchParams({
          type: "blog",
          limit: "500",
          offset: "0",
          category: "Trending Topic",
          published: "true",
        });
        const res = await fetch(`/api/cms/query?${params.toString()}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load topics (${res.status})`);
        const data = await res.json();
        const result = Array.isArray(data?.result) ? (data.result as CmsBlog[]) : [];
        if (!cancelled) setItems(result);
      } catch {
        if (!cancelled) setItems([]);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const trendingTopics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of items) {
      const single = typeof post?.subcategory === "string" ? post.subcategory.trim() : "";
      const multi = Array.isArray(post?.subcategories) ? post.subcategories : [];
      const keys = [single, ...multi].map((x) => (typeof x === "string" ? x.trim() : "")).filter(Boolean);
      if (keys.length === 0) continue;
      for (const k of keys) counts.set(k, (counts.get(k) || 0) + 1);
    }

    const top = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    const statusByIndex: Array<TopicCardProps["status"]> = ["Hot", "Rising", "Trending", "New"];
    return top.map(([title, articles], idx) => ({
      rank: `#${idx + 1}`,
      title,
      articles,
      status: statusByIndex[idx] || "Trending",
    }));
  }, [items]);

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted-foreground)]">
              WHAT'S HOT
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1e3a8a]">
              •
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1e3a8a]">
              TRENDING NOW
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[color:var(--foreground)] mb-2">
            Trending Topics
          </h2>
          <p className="text-base text-[color:var(--muted-foreground)]">
            Most discussed topics in the tech community this week
          </p>
        </div>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingTopics.map((topic) => (
            <TopicCard
              key={topic.rank}
              rank={topic.rank}
              title={topic.title}
              articles={topic.articles}
              status={topic.status}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
