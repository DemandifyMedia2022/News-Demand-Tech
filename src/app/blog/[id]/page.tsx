"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Clock, Calendar, Share2, Bookmark, ChevronDown, ChevronRight, Menu, X, List, HelpCircle } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer";
import { RichTextRenderer } from "@/components/rich-text-renderer";

interface BlogPostProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BlogPost({ params }: BlogPostProps) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      try {
        const res = await fetch(`/api/cms/blog?slug=${encodeURIComponent(id)}`, { cache: "no-store" });
        if (!res.ok) {
          setPost(null);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPost(data?.result || null);
        setLoading(false);
      } catch {
        setPost(null);
        setLoading(false);
      }
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

  const extractTextFromLexicalNode = (node: any): string => {
    if (!node) return "";
    if (node.type === "text" && typeof node.text === "string") return node.text;
    if (Array.isArray(node.children)) return node.children.map(extractTextFromLexicalNode).join("");
    return "";
  };

  const extractHeadingsFromLexical = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      const items: Array<{ id: string; text: string; level: string }> = [];
      let i = 0;

      const walk = (node: any) => {
        if (!node) return;
        if (node.type === "heading") {
          const tag = typeof node.tag === "string" ? node.tag : "h2";
          const level = tag.replace(/^h/i, "");
          const text = extractTextFromLexicalNode(node).trim();
          if (text) {
            items.push({ id: `heading-${i}`, text, level });
            i += 1;
          }
        }
        if (Array.isArray(node.children)) node.children.forEach(walk);
      };

      walk(parsed?.root);
      return items;
    } catch {
      return [];
    }
  };

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

  const rawContent = typeof post?.content === "string" ? post.content : "";
  const isLexicalJson = (() => {
    if (!rawContent) return false;
    const trimmed = rawContent.trim();
    if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return false;
    try {
      const parsed = JSON.parse(trimmed);
      return Boolean(parsed && typeof parsed === "object" && (parsed as any).root);
    } catch {
      return false;
    }
  })();

  const headings = isLexicalJson ? extractHeadingsFromLexical(rawContent) : extractHeadings(rawContent);

  const processedContent = isLexicalJson
    ? ""
    : rawContent.replace(
        /<h([2-3])([^>]*)>(.*?)<\/h[2-3]>/g,
        (
          _match: string,
          level: "2" | "3",
          attrs: string,
          text: string
        ) => {
          const index = headings.findIndex((h) => h.text === text.replace(/<[^>]*>/g, ""));
          return `<h${level}${attrs} id="heading-${index}">${text}</h${level}>`;
        }
      );

  /* ---------------- UI ---------------- */

  const normalizedFaq: Array<{ question: string; answer: string }> = (() => {
    const raw = post?.faq ?? post?.faqs ?? post?.FAQ ?? post?.Faq;
    if (!raw) return [];

    let value: unknown = raw;
    if (typeof raw === "string") {
      try {
        value = JSON.parse(raw);
      } catch {
        return [];
      }
    }

    if (!Array.isArray(value) && value && typeof value === "object") {
      const obj = value as any;
      const candidate = obj.items ?? obj.faq ?? obj.faqs ?? obj.questions;
      if (Array.isArray(candidate)) value = candidate;
    }

    if (!Array.isArray(value)) return [];
    return value
      .map((x: any) => ({
        question: typeof x?.question === "string" ? x.question : (typeof x?.q === "string" ? x.q : ""),
        answer: typeof x?.answer === "string" ? x.answer : (typeof x?.a === "string" ? x.a : ""),
      }))
      .filter((x) => Boolean(x.question) && Boolean(x.answer));
  })();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ---------- HERO ---------- */}
      <section className="w-full bg-gradient-to-br from-[var(--primary)]/10 via-[var(--background)] to-[var(--accent)]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-6">


          {/* IMAGE CARD */}
          <div className="relative overflow-hidden rounded-3xl glass shadow-xl mt-20">

            {/* Featured Image */}
            <div className="w-full h-72 md:h-80 rounded-3xl overflow-hidden bg-[var(--surface)] shadow-lg">
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
                    {(post.author || "A")
                      .split(" ")
                      .filter(Boolean)
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                  <span className="text-sm font-medium">{post.author || ""}</span>
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
        {post.author && headings.length > 0 && (
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
        )}

        {/* ARTICLE */}
      <article className="lg:col-span-3">
        <div className="relative glass rounded-3xl p-10 md:p-20 shadow-2xl neon-ring">
          
          {/* Left accent border */}
          <div className="absolute left-0 top-0.5 h-full w-2 bg-gradient-to-b from-[var(--primary)] via-[var(--accent)] to-transparent rounded-l-3xl" />
          
          {isLexicalJson ? (
            <div className="relative z-10 space-y-12" style={{ fontSize: "1.20rem", lineHeight: "1.3" }}>
              <RichTextRenderer content={rawContent} />
            </div>
          ) : (
            <div
              className="relative z-10 space-y-12"
              style={{
                fontSize: "1.20rem",
                lineHeight: "1.3",
              }}
              dangerouslySetInnerHTML={{
                __html: processedContent
                  .replace(
                    /<h([2-3])([^>]*)>(.*?)<\/h[2-3]>/g,
                    (match: string, level: string, attrs: string, text: string) => {
                      const size = level === "2" ? "1.5rem" : "1.3rem";
                      const weight = level === "2" ? "700" : "500";
                      const color = level === "2" ? "var(--foreground)" : "var(--primary)";
                      const marginTop = level === "1" ? "1.2rem" : "0.7rem";
                      const marginBottom = level === "2" ? "1.2rem" : "1rem";
                      const borderBottom = level === "2" ? "2px solid var(--primary)" : "none";
                      const paddingBottom = level === "2" ? "0.5rem" : "0";

                      return `<h${level}${attrs} style="font-size: ${size}; font-weight: ${weight}; color: ${color}; margin-top: ${marginTop}; margin-bottom: ${marginBottom}; border-bottom: ${borderBottom}; padding-bottom: ${paddingBottom}; letter-spacing: -0.01em;">${text}</h${level}>`;
                    }
                  )
                  .replace(/<p([^>]*)>(.*?)<\/p>/g, (match: string, attrs: string, text: string) => {
                    return `<p${attrs} style="margin: 1rem 0; color: var(--muted-foreground);">${text}</p>`;
                  })
                  .replace(
                    /<strong([^>]*)>(.*?)<\/strong>/g,
                    (match: string, attrs: string, text: string) => {
                      return `<strong${attrs} style="font-size: 1.2rem; font-weight: 700; color: var(--foreground);">${text}</strong>`;
                    }
                  )
                  .replace(/<ul([^>]*)>(.*?)<\/ul>/g, (match: string, attrs: string, text: string) => {
                    return `<ul${attrs} style="font-size: 1.2rem; margin: 1.5rem 0; color: var(--muted-foreground);">${text}</ul>`;
                  })
                  .replace(/<li([^>]*)>(.*?)<\/li>/g, (match: string, attrs: string, text: string) => {
                    return `<li${attrs} style="margin: 0.75rem 0; line-height: 1.6;">${text}</li>`;
                  })
                  .replace(
                    /<blockquote([^>]*)>(.*?)<\/blockquote>/g,
                    (match: string, attrs: string, text: string) => {
                      return `<blockquote${attrs} style="font-size: 1.2rem; font-style: italic; border-left: 3px solid var(--primary); background: linear-gradient(to right, var(--primary)/8, transparent); padding: 1.2rem; margin: 1rem 0; color: var(--muted-foreground); border-radius: 0 0.55rem 0.55rem 0;">${text}</blockquote>`;
                    }
                  )
                  .replace(/<code([^>]*)>(.*?)<\/code>/g, (match: string, attrs: string, text: string) => {
                    return `<code${attrs} style="font-size: 1.2rem; background: var(--surface-2); color: var(--accent); padding: 0.5rem 1rem; border-radius: 0.5rem; font-family: monospace; font-weight: 600;">${text}</code>`;
                  })
                  .replace(/<hr([^>]*)>/g, (match: string, attrs: string) => {
                    return `<hr${attrs} style="border: 1px solid var(--primary); margin: 2.2rem 0; opacity: 0.3;">`;
                  }),
              }}
            />
          )}
          
          {/* Bottom decorative gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/90 to-transparent rounded-b-3xl pointer-events-none" />
        </div>
      </article>
</section>

      {/* ---------- FAQ ---------- */}
      {normalizedFaq.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle size={22} /> FAQs
            </h2>
            <div className="space-y-2">
              {normalizedFaq.map((f: any, i: number) => (
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