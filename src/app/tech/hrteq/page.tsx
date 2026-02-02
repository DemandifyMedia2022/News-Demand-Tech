"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock, TrendingUp, Users, Target, Brain, Heart, Briefcase, ChevronRight, ArrowRight } from "lucide-react";
import { Footer } from "@/components/footer";

const HR_CATEGORIES = [
  {
    id: "recruitment",
    title: "Recruitment & Staff Augmentation",
    icon: <Users className="w-5 h-5" />
  },
  {
    id: "payroll",
    title: "Payroll management",
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    id: "learning",
    title: "Learning & Development",
    icon: <Brain className="w-5 h-5" />
  },
  {
    id: "hrms",
    title: "HRMS",
    icon: <Target className="w-5 h-5" />
  },
  {
    id: "hcm",
    title: "HCM",
    icon: <Heart className="w-5 h-5" />
  }
];

interface Story {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  date: string;
}

interface StoriesData {
  [key: string]: Story[];
}

const STORIES_DATA: StoriesData = {
  recruitment: [
    {
      id: "1",
      title: "Modern Recruitment Strategies",
      excerpt: "Discover how leading companies are transforming their hiring processes with data-driven approaches and AI-powered tools.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read",
      date: "2024-01-15"
    },
    {
      id: "2",
      title: "AI in Hiring Process",
      excerpt: "Explore the impact of artificial intelligence on recruitment efficiency and candidate experience optimization.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      readTime: "7 min read",
      date: "2024-01-12"
    },
    {
      id: "3",
      title: "Candidate Experience Matters",
      excerpt: "Why creating a positive candidate journey is crucial for employer branding and talent acquisition success.",
      image: "https://images.unsplash.com/photo-1517048678631-a9a63c065ed4?auto=format&fit=crop&w=800&q=80",
      readTime: "4 min read",
      date: "2024-01-10"
    },
    {
      id: "4",
      title: "Talent Sourcing Automation",
      excerpt: "Leverage automated tools to identify and engage top talent across multiple platforms efficiently.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read",
      date: "2024-01-08"
    },
    {
      id: "5",
      title: "Diversity in Tech Hiring",
      excerpt: "Building inclusive recruitment strategies that promote diversity and eliminate bias in hiring processes.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      readTime: "8 min read",
      date: "2024-01-05"
    }
  ],
  payroll: [
    {
      id: "6",
      title: "Automated Payroll Solutions",
      excerpt: "Streamline your payroll processing with automated systems that ensure accuracy and compliance.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read",
      date: "2024-01-14"
    },
    {
      id: "7",
      title: "Global Payroll Management",
      excerpt: "Managing multi-country payroll operations with unified platforms and local compliance expertise.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      readTime: "8 min read",
      date: "2024-01-11"
    },
    {
      id: "8",
      title: "Payroll Analytics Insights",
      excerpt: "Data-driven approaches to optimize payroll costs and improve financial forecasting accuracy.",
      image: "https://images.unsplash.com/photo-1554469384-e58e1667c60f?auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read",
      date: "2024-01-09"
    }
  ],
  learning: [
    {
      id: "9",
      title: "Personalized Learning Paths",
      excerpt: "Create tailored development programs that adapt to individual employee needs and career goals.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read",
      date: "2024-01-13"
    },
    {
      id: "10",
      title: "Skills Gap Analysis",
      excerpt: "Identify and address critical skill gaps within your organization through comprehensive assessment tools.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3e77fb8?auto=format&fit=crop&w=800&q=80",
      readTime: "7 min read",
      date: "2024-01-11"
    }
  ],
  hrms: [
    {
      id: "11",
      title: "Integrated HRMS Platforms",
      excerpt: "Comprehensive human resource management systems that unify all HR functions in one place.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      readTime: "7 min read",
      date: "2024-01-09"
    },
    {
      id: "12",
      title: "Cloud-Based HR Solutions",
      excerpt: "Benefits of migrating HR systems to cloud infrastructure for enhanced accessibility and scalability.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read",
      date: "2024-01-07"
    }
  ],
  hcm: [
    {
      id: "13",
      title: "Strategic HCM Solutions",
      excerpt: "Human capital management tools that align workforce strategy with business objectives.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read",
      date: "2024-01-08"
    },
    {
      id: "14",
      title: "Employee Engagement Platforms",
      excerpt: "Digital solutions to measure and improve employee satisfaction and organizational culture.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read",
      date: "2024-01-06"
    }
  ]
};

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
  const [selectedCategory, setSelectedCategory] = useState("recruitment");
  const [showMoreBlogs, setShowMoreBlogs] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const unoptimized = process.env.NODE_ENV === "development";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <main className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
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
                  <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white px-4 py-2 mb-6 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold uppercase tracking-wider">
                      HRTEQ
                    </span>
                  </div>
                  
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
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                          {index === 0 && <Users className="w-5 h-5" />}
                          {index === 1 && <Briefcase className="w-5 h-5" />}
                          {index === 2 && <Brain className="w-5 h-5" />}
                          {index === 3 && <Target className="w-5 h-5" />}
                        </div>
                        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                          {feature.title}
                        </h3>
                        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Banner - Smaller */}
              <div className="lg:col-span-2 mt-20">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-2xl opacity-25 group-hover:opacity-35 transition-opacity duration-300 blur-xl"></div>
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-[var(--border)]">
                    <div className="relative h-84 overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
                        alt="HR Technology Analytics"
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        unoptimized={unoptimized}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* Floating Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-white text-xs font-medium">LIVE ANALYTICS</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-white">
                            <div>
                              <div className="text-lg font-bold">94%</div>
                              <div className="text-xs opacity-80">Accuracy</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold">2.1M</div>
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
              </div>
            </div>
          </div>
        </section>

        {/* Control Center */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gradient leading-tight">
                  Neural Command Interface
                  <br />
                  <span className="text-lg md:text-xl font-light opacity-70">Advanced HR Analytics & Control Systems</span>
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
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                          selectedCategory === category.id
                            ? "bg-[var(--primary)] text-white shadow-lg"
                            : "hover:bg-[var(--surface-2)]"
                        }`}
                        style={{
                          color: selectedCategory === category.id ? '#ffffff' : 'var(--muted-foreground)'
                        }}
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
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
                    {STORIES_DATA[selectedCategory]?.slice(0, showMoreBlogs ? undefined : 4).map((story: Story, index: number) => (
                      <article key={story.id} className="group bg-white rounded-xl border border-[var(--border)] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={story.image}
                            alt={story.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            unoptimized={unoptimized}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm" style={{ color: 'var(--primary)' }}>
                              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
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
                                {story.readTime}
                              </span>
                              <span>{story.date}</span>
                            </div>
                            <button className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-xs font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                              Read more
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {STORIES_DATA[selectedCategory]?.length > 4 && (
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

      {/* Footer */}
      <Footer />
    </>
  );
}
