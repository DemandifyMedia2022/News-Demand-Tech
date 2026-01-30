"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Clock, Calendar, Share2, Bookmark } from "lucide-react";
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
      {/* Background decoration - matching hero section */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[rgba(30,58,138,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute -right-56 top-20 h-[40rem] w-[40rem] rounded-full bg-[rgba(30,58,138,0.06)] blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-[40rem] h-[28rem] w-[28rem] rounded-full bg-[rgba(30,58,138,0.04)] blur-3xl" />
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <Link 
                href="/"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-4"
              >
                ← Back to articles
              </Link>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{post.publishDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Author Section */}
        <div 
          ref={metaRef}
          className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-8 shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {post.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-black">{post.author}</h3>
              <p className="text-gray-600 text-sm">{post.authorBio}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                <Share2 size={18} className="text-gray-700" />
              </button>
              <button className="p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                <Bookmark size={18} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div 
          ref={contentRef}
          className="prose prose-lg max-w-none bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-lg"
        >
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-black mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(BLOG_POSTS)
              .filter(article => article.id !== post.id)
              .slice(0, 2)
              .map(article => (
                <Link 
                  key={article.id}
                  href={`/blog/${article.id}`}
                  className="group bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#1e3a8a] bg-[#1e3a8a]/10 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-[#1e3a8a] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{article.excerpt}</p>
                </Link>
              ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Enjoyed this article?</h2>
          <p className="mb-6 text-white/90">Subscribe to our newsletter for more insights on technology and business trends.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg text-gray-900 bg-white/90 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-6 py-3 bg-white text-[#1e3a8a] font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
