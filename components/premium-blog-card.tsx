"use client";

import React from "react";
import Image from "next/image";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumBlogCardProps {
    category: string;
    image: string;
    readingTime: string;
    publishDate: string;
    title: string;
    excerpt: string;
    authorName: string;
    authorInitial: string;
    href?: string;
}

/**
 * PremiumBlogCard Component
 * 
 * A high-end B2B tech blog card with sophisticated hover effects and typography.
 * Implemented according to premium design requirements.
 */
export function PremiumBlogCard({
    category,
    image,
    readingTime,
    publishDate,
    title,
    excerpt,
    authorName,
    authorInitial,
    href = "#",
}: PremiumBlogCardProps) {
    return (
        <article
            className={cn(
                "group relative bg-white rounded-3xl border border-gray-100 shadow-lg",
                "transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden h-full flex flex-col"
            )}
        >
            {/* Image Header */}
            <div className="relative h-64 overflow-hidden shrink-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-[700ms] group-hover:scale-110"
                />

                {/* Category Label */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                    <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest block leading-none">
                        {category}
                    </span>
                </div>

                {/* Bottom-up Overlay Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900/40 to-transparent pointer-events-none" />
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-grow space-y-4">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                        <Clock size={12} className="shrink-0" />
                        <span>{readingTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="shrink-0" />
                        <span>{publishDate}</span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                    {title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {excerpt}
                </p>

                {/* Spacer for sticky footer */}
                <div className="flex-grow" />

                {/* Footer */}
                <div className="pt-5 flex items-center justify-between border-t border-gray-50">
                    {/* Author Identity */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {authorInitial}
                        </div>
                        <span className="text-sm font-bold text-gray-900 truncate max-w-[120px]">
                            {authorName}
                        </span>
                    </div>

                    {/* Call to Action */}
                    <a
                        href={href}
                        className="flex items-center gap-1 text-blue-600 text-sm font-bold group/link hover:text-blue-700 transition-colors"
                    >
                        Read article
                        <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        />
                    </a>
                </div>
            </div>
        </article>
    );
}
