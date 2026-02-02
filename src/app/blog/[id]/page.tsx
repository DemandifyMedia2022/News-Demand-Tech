"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Clock, Calendar, Share2, Bookmark, ChevronDown, ChevronRight, Menu, X, List, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface BlogPostProps {
  params: {
    id: string;
  };
}

const BLOG_POSTS = {
  "1": {
    id: "1",
    category: "FINTEQ",
    readTime: "5 min read",
    publishDate: "Jan 28, 2024",
    title: "The Future of Digital Banking: AI-Powered Solutions",
    excerpt: "Explore how artificial intelligence is revolutionizing the banking sector with personalized customer experiences and enhanced security measures.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    author: "Sarah Mitchell",
    authorBio: "Senior fintech analyst with 10+ years of experience in digital banking transformation.",
    faq: [
      {
        question: "How is AI changing customer service in banking?",
        answer: "AI is revolutionizing banking customer service through 24/7 chatbots, personalized recommendations, and predictive support that anticipates customer needs before they arise."
      },
      {
        question: "What are the main security benefits of AI in banking?",
        answer: "AI enhances banking security through real-time fraud detection, pattern recognition, behavioral analysis, and continuous learning algorithms that adapt to new threats."
      },
      {
        question: "Will AI replace human bankers completely?",
        answer: "AI will augment rather than replace human bankers, handling routine tasks while humans focus on complex relationships, strategic advice, and emotional intelligence."
      }
    ],
    content: `
      <h2>The AI Revolution in Banking</h2>
      <p>Artificial intelligence is fundamentally transforming the banking sector, bringing unprecedented levels of personalization and efficiency to financial services. From chatbots that handle customer inquiries 24/7 to sophisticated fraud detection systems that protect millions of transactions, AI is becoming the backbone of modern banking operations.</p>
      
      <h3>Personalized Customer Experiences</h3>
      <p>Today's banking customers expect experiences tailored to their unique needs and preferences. AI-powered recommendation engines analyze spending patterns, financial goals, and life events to offer personalized product suggestions, financial advice, and proactive support. This level of personalization was previously impossible at scale, but AI makes it accessible to banks of all sizes.</p>
      
      <h3>Enhanced Security Measures</h3>
      <p>Security remains a top priority in the financial sector, and AI is dramatically improving fraud detection and prevention. Machine learning algorithms can analyze millions of transactions in real-time, identifying suspicious patterns that would be impossible for humans to detect. These systems continuously learn and adapt, becoming more effective over time.</p>
      
      <h3>The Road Ahead</h3>
      <p>As we look to the future, AI will continue to evolve and integrate more deeply into banking operations. From voice-activated banking to predictive financial planning, the possibilities are endless. Banks that embrace these technologies will be better positioned to serve the next generation of digitally-native customers.</p>
      
      <h3>Conclusion</h3>
      <p>The integration of AI in banking is not just a trend—it's a fundamental shift that's reshaping the entire industry. Financial institutions that invest in AI capabilities today will be the leaders of tomorrow, delivering superior customer experiences while maintaining the security and trust that customers expect.</p>
    `
  },
  "2": {
    id: "2",
    category: "CXTEQ",
    readTime: "3 min read",
    publishDate: "Jan 26, 2024",
    title: "Building Customer-Centric Experiences in 2024",
    excerpt: "Learn the latest strategies for creating exceptional customer journeys that drive loyalty and business growth in the digital age.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80",
    author: "Michael Chen",
    authorBio: "Customer experience strategist specializing in digital transformation and journey mapping.",
    faq: [
      {
        question: "What makes a customer experience truly customer-centric?",
        answer: "A truly customer-centric experience puts the customer's needs, preferences, and convenience at the center of every decision, using data and feedback to continuously improve interactions."
      },
      {
        question: "How can small businesses compete with large companies in CX?",
        answer: "Small businesses can compete by leveraging their agility, personal relationships, and deep understanding of local customer needs to create authentic, memorable experiences."
      },
      {
        question: "What role does technology play in modern customer experience?",
        answer: "Technology enables personalization at scale, real-time support, data-driven insights, and seamless omnichannel experiences that meet modern customer expectations."
      }
    ],
    content: `
      <h2>The Evolution of Customer Experience</h2>
      <p>Customer experience has evolved from a nice-to-have to a critical business differentiator. In 2024, companies that prioritize customer-centric approaches are seeing significant improvements in customer loyalty, retention rates, and overall business performance.</p>
      
      <h3>Understanding the Modern Customer</h3>
      <p>Today's customers are more informed, connected, and demanding than ever before. They expect seamless experiences across all touchpoints, personalized interactions, and immediate responses to their needs. Meeting these expectations requires a deep understanding of customer behavior and preferences.</p>
      
      <h3>Key Strategies for Success</h3>
      <p>Successful customer-centric organizations share several key characteristics: they listen to customer feedback, invest in the right technologies, empower their teams to make customer-focused decisions, and continuously measure and optimize the customer journey.</p>
      
      <h3>Technology as an Enabler</h3>
      <p>While technology plays a crucial role in enabling great customer experiences, it's important to remember that it's just a tool. The real magic happens when technology is combined with genuine human empathy and a commitment to solving customer problems.</p>
      
      <h3>Looking Forward</h3>
      <p>The future of customer experience lies in hyper-personalization, predictive support, and creating emotional connections with customers. Organizations that master these elements will build lasting relationships that drive sustainable growth.</p>
    `
  },
  "3": {
    id: "3",
    category: "HRTEQ",
    readTime: "4 min read",
    publishDate: "Jan 24, 2024",
    title: "Talent Acquisition Trends: What's Working Now",
    excerpt: "Discover the most effective recruitment strategies and technologies that are helping companies attract and retain top talent in competitive markets.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    author: "Emily Rodriguez",
    authorBio: "HR technology consultant helping companies build high-performing teams through innovative recruitment strategies.",
    faq: [
      {
        question: "What's the biggest challenge in talent acquisition today?",
        answer: "The biggest challenge is standing out in a crowded market while meeting candidate expectations for remote work, company culture, and career development opportunities."
      },
      {
        question: "How can AI improve recruitment without losing the human touch?",
        answer: "AI can handle repetitive tasks like screening and scheduling, allowing recruiters to focus on building relationships, cultural fit assessment, and candidate experience."
      },
      {
        question: "What metrics should companies track to measure recruitment success?",
        answer: "Key metrics include time-to-hire, quality-of-hire, cost-per-hire, candidate satisfaction scores, and retention rates of new hires."
      }
    ],
    content: `
      <h2>The New Landscape of Talent Acquisition</h2>
      <p>The talent acquisition landscape has undergone dramatic changes in recent years. Companies are no longer just filling positions—they're building strategic talent pipelines that align with long-term business objectives.</p>
      
      <h3>Data-Driven Recruitment</h3>
      <p>Modern recruitment is increasingly data-driven. Organizations are leveraging analytics to identify the most effective sourcing channels, optimize interview processes, and predict candidate success. This approach helps reduce time-to-hire while improving quality of hire.</p>
      
      <h3>The Candidate Experience Revolution</h3>
      <p>Candidate experience has become a critical factor in attracting top talent. Companies are treating candidates like customers, providing clear communication, smooth application processes, and personalized interactions throughout the recruitment journey.</p>
      
      <h3>Technology and Automation</h3>
      <p>AI-powered tools are transforming recruitment by automating repetitive tasks, screening resumes, and even conducting initial interviews. This allows recruiters to focus on building relationships and making strategic decisions.</p>
      
      <h3>Building Employer Brands</h3>
      <p>Strong employer brands are essential in competitive talent markets. Companies are investing in content marketing, social media presence, and employee advocacy programs to showcase their culture and values.</p>
    `
  }
};

export default function BlogPost({ params }: BlogPostProps) {
  const post = BLOG_POSTS[params.id as keyof typeof BLOG_POSTS];
  
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Extract headings for TOC
  const extractHeadings = (content: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const headings = tempDiv.querySelectorAll('h2, h3');
    return Array.from(headings).map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.textContent || '',
      level: heading.tagName.toLowerCase(),
      element: heading
    }));
  };

  const headings = post ? extractHeadings(post.content) : [];

  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // Animate meta information
      gsap.from(metaRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });

      // Animate content paragraphs
      const paragraphs = contentRef.current?.querySelectorAll('p, h2, h3');
      if (paragraphs) {
        gsap.from(paragraphs, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.4,
          ease: "power2.out"
        });
      }
    }, contentRef);

    return () => ctx.revert();
  }, [post]);

  useEffect(() => {
    // Add IDs to headings for smooth scrolling
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h2, h3');
      headings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });
    }

    // Handle scroll spy for TOC
    const handleScroll = () => {
      const headingElements = document.querySelectorAll('h2, h3');
      let current = "";
      
      headingElements.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 150) {
          current = heading.id;
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileTocOpen(false);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
          <Link href="/" className="text-[#1e3a8a] hover:text-[#1e40af]">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[var(--background)] relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[rgba(30,58,138,0.08)] blur-3xl anim-drift" />
      <div className="pointer-events-none absolute -right-56 top-20 h-[40rem] w-[40rem] rounded-full bg-[rgba(30,58,138,0.06)] blur-3xl anim-floaty" />
      <div className="pointer-events-none absolute left-1/3 top-[40rem] h-[28rem] w-[28rem] rounded-full bg-[rgba(30,58,138,0.04)] blur-3xl anim-drift" />
      
      {/* Floating particles for futuristic effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[rgba(30,58,138,0.3)] rounded-full anim-floaty" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-[rgba(30,58,138,0.2)] rounded-full anim-drift" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-[rgba(30,58,138,0.15)] rounded-full anim-floaty" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-[rgba(30,58,138,0.25)] rounded-full anim-drift" />
      </div>

      {/* Mobile TOC Toggle */}
      <button
        onClick={() => setMobileTocOpen(!mobileTocOpen)}
        className="fixed top-4 right-4 z-50 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 md:hidden"
      >
        {mobileTocOpen ? <X size={20} className="text-gray-700" /> : <List size={20} className="text-gray-700" />}
      </button>

      {/* Enhanced Hero Section */}
      <div className="relative h-[32rem] md:h-[40rem] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transform scale-105 hover:scale-110 transition-transform duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent" />
        
        {/* Animated overlay pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
            animation: 'shimmer 3s ease-in-out infinite'
          }} />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <Link 
                href="/"
                className="inline-flex items-center text-white/80 hover:text-white transition-all duration-300 mb-4 group"
              >
                <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
                Back to articles
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="hover:text-white transition-colors" />
                  <span>{post.publishDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="hover:text-white transition-colors" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            <h1 
              ref={titleRef}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            >
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-white to-transparent rounded-full" />
          </div>
        </div>
      </div>

      {/* Table of Contents - Desktop */}
      <div className="hidden md:block">
        <div className="fixed left-8 top-1/2 -translate-y-1/2 w-64 max-h-[70vh] overflow-y-auto glass-dark rounded-2xl p-6 border border-white/10 z-40">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <List size={16} />
            Contents
          </h3>
          <nav className="space-y-2">
            {headings.map((heading, index) => (
              <button
                key={index}
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === heading.id
                    ? 'bg-white/20 text-white font-medium'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                } ${heading.level === 'h3' ? 'pl-6 text-sm' : ''}`}
              >
                <div className="flex items-center gap-2">
                  {activeSection === heading.id && <ChevronRight size={12} />}
                  <span className="truncate">{heading.text}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile TOC */}
      {mobileTocOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileTocOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-lg shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <List size={18} />
                  Contents
                </h3>
                <button onClick={() => setMobileTocOpen(false)}>
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <nav className="space-y-2">
                {headings.map((heading, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`block w-full text-left px-3 py-3 rounded-lg transition-all duration-300 ${
                      activeSection === heading.id
                        ? 'bg-blue-100 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${heading.level === 'h3' ? 'pl-6 text-sm' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      {activeSection === heading.id && <ChevronRight size={12} />}
                      <span className="truncate">{heading.text}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Enhanced Author Section */}
        <div 
          ref={metaRef}
          className="glass rounded-3xl border border-white/20 p-6 md:p-8 mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 group"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-white text-2xl font-bold">
                {post.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-black mb-1">{post.author}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{post.authorBio}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300 hover:scale-110 group">
                <Share2 size={18} className="text-gray-700 group-hover:text-blue-600" />
              </button>
              <button className="p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300 hover:scale-110 group">
                <Bookmark size={18} className="text-gray-700 group-hover:text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Blog Content */}
        <div 
          ref={contentRef}
          className="glass rounded-3xl border border-white/20 p-8 md:p-12 shadow-xl mb-12"
        >
          <div 
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-xl shadow-lg">
              <HelpCircle size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-black">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {post.faq.map((faq, index) => (
              <div
                key={index}
                className="glass rounded-2xl border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/50 transition-colors duration-300"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <div className={`transform transition-transform duration-300 ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown size={20} className="text-gray-600" />
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ${
                  expandedFaq === index ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Related Articles */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-black mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(BLOG_POSTS)
              .filter(article => article.id !== post.id)
              .slice(0, 2)
              .map(article => (
                <Link 
                  key={article.id}
                  href={`/blog/${article.id}`}
                  className="group glass rounded-2xl border border-white/20 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#1e3a8a] bg-[#1e3a8a]/10 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-[#1e3a8a] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-[#1e3a8a] text-sm font-medium group-hover:text-[#1e40af] transition-colors">
                    Read more
                    <ArrowUpRight size={16} className="ml-1 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#2563eb] opacity-90" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }} />
          <div className="relative glass-dark rounded-3xl p-8 md:p-12 text-center border border-white/20">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Enjoyed this article?
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Subscribe to our newsletter for more insights on technology and business trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-6 py-4 rounded-xl text-gray-900 bg-white/90 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
                />
                <button className="px-8 py-4 bg-white text-[#1e3a8a] font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </article>
  );
}
