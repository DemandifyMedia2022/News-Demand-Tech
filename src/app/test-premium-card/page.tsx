import React from "react";
import { PremiumBlogCard } from "@/components/premium-blog-card";

export default function DemoPage() {
    const sampleBlogs = [
        {
            category: "Market Insights",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600",
            readingTime: "5 MIN READ",
            publishDate: "OCT 24, 2023",
            title: "The Future of AI in Modern Software Architecture: Trends and Predictions",
            excerpt: "Explore how artificial intelligence is reshaping the landscape of software engineering, from automated code generation to predictive system maintenance and self-healing infrastructures.",
            authorName: "Sarah Collins",
            authorInitial: "SC",
            href: "#"
        },
        {
            category: "Technology",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=600",
            readingTime: "8 MIN READ",
            publishDate: "OCT 25, 2023",
            title: "Quantum Computing: Breaking the Conventional Limits of Data Processing Power",
            excerpt: "An in-depth look at the current state of quantum supremacy and its potential to solve complex computational problems that are currently impossible for classical supercomputers.",
            authorName: "Michael Chen",
            authorInitial: "MC",
            href: "#"
        },
        {
            category: "B2B Solutions",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600",
            readingTime: "6 MIN READ",
            publishDate: "OCT 26, 2023",
            title: "Maximizing ROI with Next-Generation Cloud Migration Strategies for Enterprise",
            excerpt: "Learn how major enterprises are streamlining their move to the cloud while minimizing downtime and maximizing the efficiency of their digital infrastructure investments.",
            authorName: "Elena Rodriguez",
            authorInitial: "ER",
            href: "#"
        }
    ];

    return (
        <main className="min-h-screen bg-gray-50 py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Premium Blog Component Preview
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        A high-performance, aesthetically pleasing blog card designed for modern B2B tech platforms.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sampleBlogs.map((blog, idx) => (
                        <PremiumBlogCard key={idx} {...blog} />
                    ))}
                </div>
            </div>
        </main>
    );
}
