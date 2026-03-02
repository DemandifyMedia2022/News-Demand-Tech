"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Users, ArrowRight, BarChart3, Target, Briefcase, Brain, Heart, Plus, Clock } from "lucide-react";
import { CmsBlog } from "@/lib/types";

const HR_CATEGORIES = [
  {
    id: "Recruitment & Staff Augmentation",
    title: "Recruitment & Staff Augmentation",
    icon: <Users className="w-5 h-5" />
  },
  {
    id: "Payroll management",
    title: "Payroll management",
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    id: "Learning & Development",
    title: "Learning & Development",
    icon: <Brain className="w-5 h-5" />
  },
  {
    id: "HRMS",
    title: "HRMS",
    icon: <Target className="w-5 h-5" />
  },
  {
    id: "HCM",
    title: "HCM",
    icon: <Heart className="w-5 h-5" />
  }
];

type Story = CmsBlog;

const HR_FEATURES = [
  {
    title: "Recruitment & TA",
    description: "Streamline your talent acquisition with AI-powered sourcing and automated screening"
  },
  {
    title: "Payroll & Compliance",
    description: "Ensure accurate payroll processing and regulatory compliance across all jurisdictions"
  },
  {
    title: "Engagement & Growth",
    description: "Foster employee development and boost engagement with personalized learning paths"
  },
  {
    title: "People Analytics",
    description: "Make data-driven decisions with comprehensive workforce insights and predictive analytics"
  }
];

export default function HRTEQPage() {
  const [selectedCategory, setSelectedCategory] = useState("Recruitment & Staff Augmentation");
  const [showMoreBlogs, setShowMoreBlogs] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const unoptimized = process.env.NODE_ENV === "development";
  const leftBannerRef = useRef<HTMLDivElement | null>(null);
  const analyticsBannerRef = useRef<HTMLDivElement | null>(null);
  const leftBannerSize = useElementSize(leftBannerRef);
  const analyticsBannerSize = useElementSize(analyticsBannerRef);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const params = new URLSearchParams({
          type: "blog",
          limit: "50",
          offset: "0",
          category: "HRTeq",
          subcategory: selectedCategory,
          published: "true",
        });
        const res = await fetch(`/api/cms/query?${params.toString()}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load stories (${res.status})`);
        const data = await res.json();
        const result = Array.isArray(data?.result) ? data.result : [];
        if (!cancelled) setStories(result);
      } catch {
        if (!cancelled) setStories([]);
      } finally {
        // No-op since we removed isLoadingStories state
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [selectedCategory]);

  return (
    <>
      <main className="min-h-screen mt-16" style={{ backgroundColor: 'var(--background)' }}>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Orbs */}
          <div className="absolute inset-0 bg-orb"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-orb anim-drift"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orb anim-floaty"></div>
          
          <div className="relative px-6 py-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
              {/* Left Content */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight mt-5">
                    <span className="bg-gradient-to-r from-[var(--foreground)] via-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                      Next-Generation HR
                    </span>
                    <br />
                    <span className="text-2xl md:text-3xl font-light opacity-90">
                      Technology Platform
                    </span>
                  </h1>
                  
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
                    Revolutionize your workforce with AI-powered automation, predictive analytics, 
                    and intelligent talent management solutions.
                  </p>
                </div>

                {/* Feature Cards - Smaller */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {HR_FEATURES.map((feature, index) => (
                    <div key={index} className="group relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-300 blur-lg"></div>
                      <div className="relative bg-white rounded-xl p-4 border border-[var(--border)] shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        <div className="w-5 h-5 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                          {index === 0 && <Users className="w-5 h-5" />}
                          {index === 1 && <Briefcase className="w-5 h-5" />}
                          {index === 2 && <Brain className="w-5 h-5" />}
                          {index === 3 && <Target className="w-5 h-5" />}
                        </div>
                        <h3 className="text-md font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                          {feature.title}
                        </h3>
                        <p className="text-md leading-relaxed line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden lg:block mt-6">
                  <div ref={leftBannerRef} className="relative w-full h-56 xl:h-64 rounded-2xl overflow-hidden shadow-lg border border-[var(--border)]">
                    <Image
                      src="/img/tech-banner.webp"
                      alt="HR Technology Banner"
                      fill
                      className="object-cover"
                      unoptimized={unoptimized}
                    />
                    <div className="absolute top-3 right-3 z-10 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                      {leftBannerSize.w}×{leftBannerSize.h}px
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Banner - Enhanced Attractive UI */}
              <div className="lg:col-span-2 mt-6 lg:mt-5">
                <div className="space-y-6">
                  {/* Main Analytics Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-2xl opacity-25 group-hover:opacity-35 transition-opacity duration-300 blur-xl"></div>
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-[var(--border)]">
                      <div ref={analyticsBannerRef} className="relative h-72 md:h-80 overflow-hidden">
                        <Image
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
                          alt="HR Technology Analytics"
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          unoptimized={unoptimized}
                        />
                        <div className="absolute top-3 right-3 z-10 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                          {analyticsBannerSize.w}×{analyticsBannerSize.h}px
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        
                        {/* Enhanced Floating Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 neon-ring">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-white text-xs font-bold uppercase tracking-wider">Live Analytics</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-white">
                              <div className="bg-white/10 rounded-lg p-2 text-center">
                                <div className="text-xl font-bold">94%</div>
                                <div className="text-xs opacity-80">Accuracy</div>
                              </div>
                              <div className="bg-white/10 rounded-lg p-2 text-center">
                                <div className="text-xl font-bold">2.1M</div>
                                <div className="text-xs opacity-80">Data Points</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-gray-50 to-white">
                        <h3 className="text-base font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                          AI-Powered Talent Solutions
                        </h3>
                        <p className="text-xs mb-3 leading-relaxed line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>
                          Advanced machine learning algorithms that optimize recruitment, retention, and workforce planning.
                        </p>
                        <button className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 text-sm">
                          Explore Dashboard
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass rounded-xl p-4 neon-ring hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium text-green-600">+12%</span>
                      </div>
                      <div className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>8,432</div>
                      <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Active Employees</div>
                    </div>

                    <div className="glass rounded-xl p-4 neon-ring hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <Target className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium text-green-600">+8%</span>
                      </div>
                      <div className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>92%</div>
                      <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Goal Achievement</div>
                    </div>
                  </div>

                  {/* Quick Actions Card */}
                  <div className="glass rounded-xl p-4 neon-ring">
                    <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--foreground)' }}>Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 rounded-lg bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 transition-colors duration-200 flex items-center gap-2 group">
                        <div className="w-6 h-6 bg-[var(--primary)] rounded flex items-center justify-center">
                          <Plus className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium group-hover:text-[var(--primary)]" style={{ color: 'var(--foreground)' }}>Create Campaign</span>
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-lg bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 transition-colors duration-200 flex items-center gap-2 group">
                        <div className="w-6 h-6 bg-[var(--accent)] rounded flex items-center justify-center">
                          <BarChart3 className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium group-hover:text-[var(--accent)]" style={{ color: 'var(--foreground)' }}>View Reports</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Control Center */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gradient leading-tight mt-[-50px]">
                  Neural Command Interface
               </h2>
                <div className="w-24 h-1 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Navigation */}
              <div className="lg:col-span-1">
                <div className="glass rounded-xl p-4 sticky top-8 neon-ring">
                  <h3 className="text-base font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                    CAPABILITIES
                  </h3>
                  <nav className="space-y-2">
                    {HR_CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-md font-medium flex items-center gap-2 transition-all duration-300 ${
                          selectedCategory === category.id
                            ? "bg-[var(--primary)] text-white shadow-md"
                            : "hover:bg-[var(--surface-2)]"
                        }`}
                        style={{
                          color: selectedCategory === category.id ? '#ffffff' : 'var(--muted-foreground)'
                        }}
                      >
                        <div className="w-3 h-3 flex items-center justify-center">
                          {category.icon}
                        </div>
                        {category.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-[var(--border)]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                        Latest Insights
                      </h3>
                      <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                        Discover trends and innovations in HR technology
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white rounded-full text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      <span>Updated</span>
                    </div>
                  </div>
                  
                  {/* Blog Cards - Vertical 2-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stories.slice(0, showMoreBlogs ? undefined : 4).map((story: Story, index: number) => (
                      <article key={story.slug || story._id || String(index)} className="group bg-white rounded-xl border border-[var(--border)] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={story.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"}
                            alt={story.title || "Blog"}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            unoptimized={unoptimized}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm" style={{ color: 'var(--primary)' }}>
                              {selectedCategory}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <h4 className="text-base font-bold mb-3 group-hover:text-[var(--accent)] cursor-pointer transition-colors line-clamp-2" style={{ color: 'var(--foreground)' }}>
                            {story.title}
                          </h4>
                          <p className="text-sm mb-4 leading-relaxed line-clamp-3" style={{ color: 'var(--muted-foreground)' }}>
                            {story.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {story.readTime || ""}
                              </span>
                              <span>{story.publishDate || ""}</span>
                            </div>
                            <Link 
                              href={`/blog/${story.slug || story._id}`}
                              className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-xs font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                              style={{ color: 'white' }}
                            >
                              <span style={{ color: 'white' }}>Read more</span>
                              <ArrowUpRight className="w-3 h-3" style={{ color: 'white' }} />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {stories.length > 4 && (
                    <div className="mt-6 text-center">
                      <button 
                        onClick={() => setShowMoreBlogs(!showMoreBlogs)}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-[var(--border)] text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md text-sm"
                      >
                        <span>{showMoreBlogs ? 'Show less articles' : 'Show more articles'}</span>
                        <ArrowRight className={`w-4 h-4 transition-transform ${showMoreBlogs ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function useElementSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return size;
}
