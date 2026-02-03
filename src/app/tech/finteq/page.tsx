"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, TrendingUp, Shield, DollarSign, CreditCard, PieChart, Building, ChevronRight, ArrowRight } from "lucide-react";
import { Footer } from "@/components/footer";

const FIN_CATEGORIES = [
  {
    id: "digital-banking",
    title: "Digital Banking",
    icon: <Building className="w-5 h-5" />
  },
  {
    id: "blockchain",
    title: "Blockchain",
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: "payments",
    title: "Payments",
    icon: <CreditCard className="w-5 h-5" />
  },
  {
    id: "security",
    title: "Security",
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: "regtech",
    title: "RegTech",
    icon: <PieChart className="w-5 h-5" />
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
  "digital-banking": [
    {
      id: "1",
      title: "Digital Banking Revolution: AI-Powered Financial Services",
      excerpt: "How artificial intelligence is transforming digital banking and customer experience in 2026.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
      readTime: "8 min read",
      date: "2024-01-28"
    },
    {
      id: "2",
      title: "Next-Gen Mobile Banking Platforms",
      excerpt: "Revolutionary mobile banking solutions with biometric authentication and personalized financial insights.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read",
      date: "2024-01-25"
    },
    {
      id: "3",
      title: "Open Banking API Ecosystems",
      excerpt: "Building comprehensive financial ecosystems through API integration and third-party partnerships.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      readTime: "7 min read",
      date: "2024-01-22"
    },
    {
      id: "4",
      title: "Digital-Only Bank Success Stories",
      excerpt: "How challenger banks are disrupting traditional banking with innovative digital-first approaches.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read",
      date: "2024-01-20"
    },
    {
      id: "5",
      title: "Voice Banking and AI Assistants",
      excerpt: "The future of banking interactions through voice commands and intelligent financial assistants.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read",
      date: "2024-01-18"
    }
  ],
  blockchain: [
    {
      id: "6",
      title: "Blockchain in Finance: Beyond Cryptocurrency",
      excerpt: "Enterprise blockchain applications reshaping traditional financial services and operations.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read",
      date: "2024-01-26"
    },
    {
      id: "7",
      title: "Smart Contracts for Financial Services",
      excerpt: "Automating financial agreements and transactions with self-executing smart contracts.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      readTime: "8 min read",
      date: "2024-01-23"
    },
    {
      id: "8",
      title: "DeFi Integration with Traditional Banking",
      excerpt: "Bridging decentralized finance with traditional banking systems for enhanced services.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      readTime: "7 min read",
      date: "2024-01-21"
    }
  ],
  payments: [
    {
      id: "9",
      title: "Embedded Finance: The Future of Payments",
      excerpt: "How financial services are being integrated into non-financial platforms and applications.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      readTime: "7 min read",
      date: "2024-01-24"
    },
    {
      id: "10",
      title: "Real-Time Payment Systems",
      excerpt: "Instant payment solutions transforming how businesses and consumers transact globally.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read",
      date: "2024-01-19"
    }
  ],
  security: [
    {
      id: "11",
      title: "Fraud Detection 2.0: Machine Learning Security",
      excerpt: "Advanced ML algorithms and AI systems protecting financial institutions from sophisticated fraud attempts.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
      readTime: "10 min read",
      date: "2024-01-24"
    },
    {
      id: "12",
      title: "Biometric Authentication in Banking",
      excerpt: "Next-generation security using facial recognition, fingerprints, and behavioral biometrics.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read",
      date: "2024-01-17"
    }
  ],
  regtech: [
    {
      id: "13",
      title: "RegTech: Compliance Automation in Finance",
      excerpt: "Technology solutions streamlining regulatory compliance and reducing operational risk in financial institutions.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      readTime: "9 min read",
      date: "2024-01-20"
    },
    {
      id: "14",
      title: "AML and KYC Digital Transformation",
      excerpt: "Digital solutions for anti-money laundering and know-your-customer compliance processes.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      readTime: "7 min read",
      date: "2024-01-16"
    }
  ]
};

const FIN_FEATURES = [
  {
    title: "Digital Banking",
    description: "Next-generation banking platforms with AI-powered customer experiences"
  },
  {
    title: "Security & Compliance",
    description: "Advanced fraud detection and automated regulatory compliance"
  },
  {
    title: "Payment Innovation",
    description: "Seamless payment solutions and embedded finance technologies"
  },
  {
    title: "Financial Analytics",
    description: "Real-time insights and predictive analytics for financial decision-making"
  }
];

export default function FINTEQPage() {
  const [selectedCategory, setSelectedCategory] = useState("digital-banking");
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
                      FINTEQ
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight mt-5">
                    <span className="bg-gradient-to-r from-[var(--foreground)] via-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                      Next-Generation Financial
                    </span>
                    <br />
                    <span className="text-2xl md:text-3xl font-light opacity-90">
                      Technology Platform
                    </span>
                  </h1>
                  
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
                    Transform your financial operations with AI-powered automation, blockchain technology, 
                    and intelligent payment solutions.
                  </p>
                </div>

                {/* Feature Cards - Smaller */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FIN_FEATURES.map((feature: any, index: number) => (
                    <div key={index} className="group relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-300 blur-lg"></div>
                      <div className="relative bg-white rounded-xl p-4 border border-[var(--border)] shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                          {index === 0 && <Building className="w-5 h-5" />}
                          {index === 1 && <Shield className="w-5 h-5" />}
                          {index === 2 && <CreditCard className="w-5 h-5" />}
                          {index === 3 && <PieChart className="w-5 h-5" />}
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
                        src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&q=80"
                        alt="Financial Technology Analytics"
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
                              <div className="text-lg font-bold">$2.4B</div>
                              <div className="text-xs opacity-80">Transactions</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold">99.9%</div>
                              <div className="text-xs opacity-80">Uptime</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-white">
                      <h3 className="text-base font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                        AI-Powered Financial Solutions
                      </h3>
                      <p className="text-xs mb-3 leading-relaxed line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>
                        Advanced machine learning algorithms that optimize transactions, detect fraud, and predict market trends.
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
                  <span className="text-lg md:text-xl font-light opacity-70">Advanced Financial Analytics & Control Systems</span>
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
                    {FIN_CATEGORIES.map((category) => (
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
                        Discover trends and innovations in financial technology
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
                              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')}
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
                            <Link 
                              href={`/blog/${story.id}`}
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
