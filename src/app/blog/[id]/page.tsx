"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Clock, Calendar, Share2, Bookmark, ChevronDown, ChevronRight, Menu, X, List, HelpCircle } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer";

interface BlogPostProps {
  params: Promise<{
    id: string;
  }>;
}

const BLOG_POSTS = {
  "1": {
    id: "1",
    category: "FINTEQ",
    subcategory: "Digital Banking",
    readTime: "5 min read",
    publishDate: "Jan 28, 2024",
    title: "The Future of Digital Banking: AI-Powered Solutions",
    excerpt: "Explore how artificial intelligence is revolutionizing the banking sector with personalized customer experiences and enhanced security measures.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    author: "Sarah Mitchell",
    authorBio: "Senior fintech analyst with 10+ years of experience in digital banking transformation.",
    tags: ["AI", "Digital Banking", "Customer Experience", "Security"],
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
    subcategory: "Customer Experience",
    readTime: "3 min read",
    publishDate: "Jan 26, 2024",
    title: "Building Customer-Centric Experiences in 2024",
    excerpt: "Learn the latest strategies for creating exceptional customer journeys that drive loyalty and business growth in the digital age.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80",
    author: "Michael Chen",
    authorBio: "Customer experience strategist specializing in digital transformation and journey mapping.",
    tags: ["Customer Experience", "Digital Transformation", "Journey Mapping", "2024 Trends"],
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
    subcategory: "Talent Acquisition",
    readTime: "4 min read",
    publishDate: "Jan 24, 2024",
    title: "Talent Acquisition Trends: What's Working Now",
    excerpt: "Discover the most effective recruitment strategies and technologies that are helping companies attract and retain top talent in competitive markets.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    author: "Emily Rodriguez",
    authorBio: "HR technology consultant helping companies build high-performing teams through innovative recruitment strategies.",
    tags: ["Talent Acquisition", "Recruitment", "HR Technology", "Trends"],
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
  },
  "4": {
    id: "4",
    category: "FINTEQ",
    subcategory: "Digital Banking",
    readTime: "6 min read",
    publishDate: "Jan 25, 2024",
    title: "Next-Gen Mobile Banking Platforms",
    excerpt: "Revolutionary mobile banking solutions with biometric authentication and personalized financial insights.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    author: "David Park",
    authorBio: "Mobile banking specialist with expertise in UX design and biometric security systems.",
    tags: ["Mobile Banking", "Biometrics", "UX Design", "Fintech"],
    faq: [
      {
        question: "How secure are biometric authentication methods?",
        answer: "Modern biometric systems use advanced encryption and liveness detection to prevent spoofing, making them more secure than traditional passwords."
      },
      {
        question: "What features define next-gen mobile banking?",
        answer: "Key features include AI-powered insights, voice banking, personalized offers, real-time notifications, and seamless integration with other financial services."
      }
    ],
    content: `
      <h2>The Mobile Banking Revolution</h2>
      <p>Mobile banking has evolved from simple transaction apps to comprehensive financial platforms that serve as customers' primary banking interface. The latest generation of mobile banking platforms leverages cutting-edge technology to deliver unprecedented convenience and security.</p>
      
      <h3>Biometric Authentication</h3>
      <p>Fingerprint scanning, facial recognition, and voice biometrics are replacing traditional passwords, offering both enhanced security and improved user experience. These technologies use advanced AI to detect liveness and prevent spoofing attempts.</p>
      
      <h3>AI-Powered Personalization</h3>
      <p>Machine learning algorithms analyze spending patterns, financial goals, and life events to provide personalized insights, budget recommendations, and product suggestions. This proactive approach helps customers make better financial decisions.</p>
      
      <h3>Voice Banking and Conversational AI</h3>
      <p>Natural language processing enables customers to perform banking tasks through voice commands and chat conversations. This hands-free approach is particularly valuable for accessibility and convenience.</p>
      
      <h3>Conclusion</h3>
      <p>The future of mobile banking lies in creating seamless, intelligent experiences that anticipate customer needs while maintaining the highest security standards. Banks that invest in these technologies will lead the digital transformation.</p>
    `
  },
  "5": {
    id: "5",
    category: "FINTEQ",
    subcategory: "Blockchain",
    readTime: "8 min read",
    publishDate: "Jan 26, 2024",
    title: "Blockchain in Finance: Beyond Cryptocurrency",
    excerpt: "Enterprise blockchain applications reshaping traditional financial services and operations.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    author: "Robert Chen",
    authorBio: "Blockchain consultant specializing in enterprise implementations and DeFi integrations.",
    tags: ["Blockchain", "Enterprise", "DeFi", "Cryptocurrency"],
    faq: [
      {
        question: "How are financial institutions using blockchain beyond cryptocurrency?",
        answer: "Banks use blockchain for cross-border payments, trade finance, identity verification, smart contracts, and settlement systems to reduce costs and improve efficiency."
      },
      {
        question: "What are the main benefits of blockchain in traditional finance?",
        answer: "Key benefits include reduced transaction costs, faster settlement times, improved transparency, enhanced security, and reduced operational complexity."
      }
    ],
    content: `
      <h2>Blockchain's Financial Revolution</h2>
      <p>While cryptocurrency brought blockchain to mainstream attention, the technology's true potential lies in transforming traditional financial services. From cross-border payments to trade finance, blockchain is reshaping how financial institutions operate.</p>
      
      <h3>Cross-Border Payments</h3>
      <p>Blockchain enables near-instant international payments at a fraction of traditional costs. By eliminating intermediaries and using digital currencies or stablecoins, banks can settle transactions in minutes rather than days.</p>
      
      <h3>Trade Finance Revolution</h3>
      <p>Smart contracts automate trade finance processes, reducing paperwork and fraud while increasing transparency. All parties can track shipments and payments in real-time on an immutable ledger.</p>
      
      <h3>Digital Identity and KYC</h3>
      <p>Blockchain-based identity systems allow customers to control their data while simplifying KYC processes. Once verified, customer credentials can be securely shared across institutions with customer consent.</p>
      
      <h3>Conclusion</h3>
      <p>Blockchain technology is moving beyond speculation to become a fundamental infrastructure for modern finance. Early adopters will gain significant competitive advantages in efficiency and innovation.</p>
    `
  },
  "6": {
    id: "6",
    category: "FINTEQ",
    subcategory: "Security",
    readTime: "10 min read",
    publishDate: "Jan 24, 2024",
    title: "Fraud Detection 2.0: Machine Learning Security",
    excerpt: "Advanced ML algorithms and AI systems protecting financial institutions from sophisticated fraud attempts.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    author: "Amanda Foster",
    authorBio: "Cybersecurity expert specializing in AI-powered fraud detection and financial crime prevention.",
    tags: ["Security", "Machine Learning", "Fraud Detection", "AI"],
    faq: [
      {
        question: "How does ML improve fraud detection compared to traditional methods?",
        answer: "ML can analyze millions of transactions in real-time, identify subtle patterns, and adapt to new fraud tactics, while traditional rule-based systems are static and limited."
      },
      {
        question: "What types of fraud can ML detect most effectively?",
        answer: "ML excels at detecting account takeover, identity theft, transaction fraud, money laundering patterns, and emerging fraud schemes that would evade rule-based systems."
      }
    ],
    content: `
      <h2>The New Era of Financial Security</h2>
      <p>Financial fraud has become increasingly sophisticated, requiring advanced detection methods. Machine learning and AI are revolutionizing fraud detection, enabling real-time identification of suspicious activities with unprecedented accuracy.</p>
      
      <h3>Real-Time Transaction Monitoring</h3>
      <p>ML algorithms analyze every transaction as it occurs, comparing it against historical patterns and known fraud indicators. This real-time analysis can block fraudulent transactions before they complete.</p>
      
      <h3>Behavioral Analytics</h3>
      <p>AI systems learn each customer's normal behavior patterns, including transaction amounts, locations, timing, and device usage. Deviations from these patterns trigger immediate alerts for review.</p>
      
      <h3>Network Analysis</h3>
      <p>Advanced ML techniques analyze relationships between accounts, identifying fraud rings and organized crime networks that might be missed when examining accounts in isolation.</p>
      
      <h3>Conclusion</h3>
      <p>The future of fraud detection lies in AI systems that continuously learn and adapt to new threats. Financial institutions that embrace these technologies will be better positioned to protect their customers and maintain trust.</p>
    `
  },
  "7": {
    id: "7",
    category: "HRTEQ",
    subcategory: "Recruitment",
    readTime: "5 min read",
    publishDate: "Jan 15, 2024",
    title: "Modern Recruitment Strategies",
    excerpt: "Discover how leading companies are transforming their hiring processes with data-driven approaches and AI-powered tools.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    author: "Lisa Thompson",
    authorBio: "Talent acquisition leader with experience in implementing AI-powered recruitment solutions.",
    tags: ["Recruitment", "AI", "Data-Driven", "Hiring"],
    faq: [
      {
        question: "How are companies using AI in recruitment?",
        answer: "Companies use AI for resume screening, candidate matching, interview scheduling, assessment analysis, and predicting candidate success based on historical data."
      },
      {
        question: "What makes a recruitment strategy modern?",
        answer: "Modern strategies use data analytics, AI tools, candidate experience focus, social media recruiting, and continuous improvement based on metrics."
      }
    ],
    content: `
      <h2>Transforming Talent Acquisition</h2>
      <p>The recruitment landscape has been revolutionized by technology and data analytics. Modern recruitment strategies leverage AI, machine learning, and advanced analytics to identify, attract, and retain top talent more effectively than ever before.</p>
      
      <h3>AI-Powered Candidate Matching</h3>
      <p>Machine learning algorithms analyze job requirements and candidate profiles to identify the best matches, going beyond keywords to understand skills, experience, and potential cultural fit.</p>
      
      <h3>Predictive Analytics</h3>
      <p>Advanced analytics predict which candidates are most likely to succeed in specific roles based on historical hiring data, performance metrics, and retention patterns.</p>
      
      <h3>Automated Screening</h3>
      <p>AI systems can review thousands of applications in minutes, identifying qualified candidates and ranking them based on job fit, significantly reducing time-to-hire.</p>
      
      <h3>Conclusion</h3>
      <p>Modern recruitment is about combining technology efficiency with human judgment. The most successful strategies use AI to handle repetitive tasks while freeing recruiters to focus on building relationships and making strategic decisions.</p>
    `
  }
};

export default function BlogPost({ params }: BlogPostProps) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      setPost(BLOG_POSTS[id as keyof typeof BLOG_POSTS]);
      setLoading(false);
    };
    load();
  }, [params]);

  if (loading) return null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Post not found</h1>
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--accent)]">
            Go Home <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- TOC ---------------- */

  const extractHeadings = (html: string) => {
    const regex = /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/g;
    const items: any[] = [];
    let match;
    let i = 0;

    while ((match = regex.exec(html))) {
      items.push({
        id: `heading-${i}`,
        text: match[2].replace(/<[^>]*>/g, ""),
        level: match[1],
      });
      i++;
    }
    return items;
  };

  const headings = extractHeadings(post.content);

  const processedContent = post.content.replace(
    /<h([2-3])([^>]*)>(.*?)<\/h[2-3]>/g,
    (
      _match: string,
      level: "2" | "3",
      attrs: string,
      text: string
    ) => {

      const index = headings.findIndex(h => h.text === text.replace(/<[^>]*>/g, ""));
      return `<h${level}${attrs} id="heading-${index}">${text}</h${level}>`;
    }
  );

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ---------- HERO ---------- */}
      <section className="w-full bg-gradient-to-br from-[var(--primary)]/10 via-[var(--background)] to-[var(--accent)]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-6">


          {/* IMAGE CARD */}
          <div className="relative overflow-hidden rounded-3xl glass shadow-xl mt-20">

            {/* Featured Image */}
            <div className="w-full h-100 rounded-3xl overflow-hidden bg-[var(--surface)] shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />


              {/* Soft gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>


            {/* CONTENT OVER IMAGE */}
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-5">
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/90 text-[var(--primary)] text-sm font-semibold">
                {post.category}
              </span>

              <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-white max-w-4xl">
                {post.title}
              </h1>

              <p className="mt-3 text-base md:text-lg text-white/85 max-w-3xl">
                {post.excerpt}
              </p>

              {/* META ROW */}
              <div className="flex flex-wrap items-center gap-6 px-8 py-4 bg-[var(--surface)] border-t border-[var(--border)] rounded-2xl mt-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white text-sm font-semibold flex items-center justify-center">
                    {post.author.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <span className="text-sm font-medium">{post.author}</span>
                </div>

                <span className="text-sm text-[var(--muted-foreground)]">
                  {post.publishDate}
                </span>

                <span className="text-sm text-[var(--muted-foreground)]">
                  {post.readTime}
                </span>

                <button className="ml-auto p-2 rounded-lg hover:bg-[var(--surface-2)]">
                  <Share2 size={18} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ---------- CONTENT ---------- */}
      <section className="max-w-8xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 mt-[-40px]">

        {/* TOC */}
        <aside className="hidden lg:block sticky top-3 h-fit glass rounded-xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <List size={20} /> Contents
          </h3>
          <nav className="space-y-1 text-sm">
            {headings.map((h, i) => (
              <a
                key={i}
                href={`#${h.id}`}
                className={`block px-2 py-1 rounded-md transition hover:bg-[var(--primary)]/10 ${h.level === "3" ? "ml-4 text-[var(--muted-foreground)]" : "font-medium"
                  }`}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </aside>

        {/* ARTICLE */}
      <article className="lg:col-span-3">
        <div className="relative glass rounded-3xl p-10 md:p-20 shadow-2xl neon-ring">
          
          {/* Left accent border */}
          <div className="absolute left-0 top-0.5 h-full w-2 bg-gradient-to-b from-[var(--primary)] via-[var(--accent)] to-transparent rounded-l-3xl" />
          
          <div 
            className="relative z-10 space-y-12"
            style={{
              fontSize: '1.20rem', // Base font size for paragraphs
              lineHeight: '1.3'
            }}
            dangerouslySetInnerHTML={{ 
              __html: processedContent.replace(
                /<h([2-3])([^>]*)>(.*?)<\/h[2-3]>/g,
                (match: string, level: string, attrs: string, text: string) => {
                  const size = level === '2' ? '1.5rem' : '1.3rem';
                  const weight = level === '2' ? '700' : '500';
                  const color = level === '2' ? 'var(--foreground)' : 'var(--primary)';
                  const marginTop = level === '1' ? '1.2rem' : '0.7rem';
                  const marginBottom = level === '2' ? '1.2rem' : '1rem';
                  const borderBottom = level === '2' ? '2px solid var(--primary)' : 'none';
                  const paddingBottom = level === '2' ? '0.5rem' : '0';
                  
                  return `<h${level}${attrs} style="font-size: ${size}; font-weight: ${weight}; color: ${color}; margin-top: ${marginTop}; margin-bottom: ${marginBottom}; border-bottom: ${borderBottom}; padding-bottom: ${paddingBottom}; letter-spacing: -0.01em;">${text}</h${level}>`;
                }
              ).replace(
                /<p([^>]*)>(.*?)<\/p>/g,
                (match: string, attrs: string, text: string) => {
                  return `<p${attrs} style="margin: 1rem 0; color: var(--muted-foreground);">${text}</p>`;
                }
              ).replace(
                /<strong([^>]*)>(.*?)<\/strong>/g,
                (match: string, attrs: string, text: string) => {
                  return `<strong${attrs} style="font-size: 1.2rem; font-weight: 700; color: var(--foreground);">${text}</strong>`;
                }
              ).replace(
                /<ul([^>]*)>(.*?)<\/ul>/g,
                (match: string, attrs: string, text: string) => {
                  return `<ul${attrs} style="font-size: 1.2rem; margin: 1.5rem 0; color: var(--muted-foreground);">${text}</ul>`;
                }
              ).replace(
                /<li([^>]*)>(.*?)<\/li>/g,
                (match: string, attrs: string, text: string) => {
                  return `<li${attrs} style="margin: 0.75rem 0; line-height: 1.6;">${text}</li>`;
                }
              ).replace(
                /<blockquote([^>]*)>(.*?)<\/blockquote>/g,
                (match: string, attrs: string, text: string) => {
                  return `<blockquote${attrs} style="font-size: 1.2rem; font-style: italic; border-left: 3px solid var(--primary); background: linear-gradient(to right, var(--primary)/8, transparent); padding: 1.2rem; margin: 1rem 0; color: var(--muted-foreground); border-radius: 0 0.55rem 0.55rem 0;">${text}</blockquote>`;
                }
              ).replace(
                /<code([^>]*)>(.*?)<\/code>/g,
                (match: string, attrs: string, text: string) => {
                  return `<code${attrs} style="font-size: 1.2rem; background: var(--surface-2); color: var(--accent); padding: 0.5rem 1rem; border-radius: 0.5rem; font-family: monospace; font-weight: 600;">${text}</code>`;
                }
              ).replace(
                /<hr([^>]*)>/g,
                (match: string, attrs: string) => {
                  return `<hr${attrs} style="border: 1px solid var(--primary); margin: 2.2rem 0; opacity: 0.3;">`;
                }
              )
            }} 
          />
          
          {/* Bottom decorative gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/90 to-transparent rounded-b-3xl pointer-events-none" />
        </div>
      </article>
</section>

      {/* ---------- FAQ ---------- */}
      {post.faq?.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle size={22} /> FAQs
            </h2>
            <div className="space-y-2">
              {post.faq.map((f: any, i: number) => (
                <FAQItem key={i} {...f} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </main>
  );
}

/* ---------------- FAQ ---------------- */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[var(--border)] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 text-left hover:bg-[var(--surface-2)]"
      >
        <span className="font-medium">{question}</span>
        <ChevronDown size={18} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-[var(--muted-foreground)]">
          {answer}
        </div>
      )}
    </div>
  );
}