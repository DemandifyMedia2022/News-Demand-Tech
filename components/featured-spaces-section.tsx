"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Facebook, Home, Send } from "lucide-react";

export const FeaturedSpacesSection: React.FC = () => {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl font-bold text-[color:var(--foreground)] mb-2">
              Featured Spaces
            </h2>
            <p className="text-base text-[color:var(--muted-foreground)] mb-4">
              Premium banner inventory for your stories
            </p>
            
            {/* Tags */}
            <div className="flex gap-2 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Fast-loading
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                Brand-safe
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-[color:var(--muted-foreground)]">
                Showcase launches, events and campaigns in high-impact slots designed for modern B2B brands.
              </p>
            </div>

            {/* Bottom Info Text */}
            <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-200">
              <p className="text-xs text-green-700">
                Use this slot for thought-leadership, reports and gated assets.
              </p>
            </div>
          </div>

          {/* Right Column - Banner */}
          <div className="order-1 lg:order-2">
            {/* Banner Container */}
            <div className="relative w-full bg-gradient-to-br from-green-50 to-green-100 rounded-[20px] overflow-hidden border border-black/10">
              {/* Banner Content */}
              <div className="relative h-[300px]">
                {/* Background Image */}
                <Image
                  src="/img/banner-image.webp"
                  alt="Tech News Team"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Banner Labels */}
                <div className="absolute top-4 left-4 text-white text-xs font-medium">
                  HERO BANNER B7 1600X600
                </div>
                <div className="absolute top-4 right-4 text-white text-xs font-medium">
                  HIGH CTR
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex items-center h-full px-8">

                  {/* Right side - Text Content */}
                  <div className="flex-1 text-white">
                    <h2 className="text-xl font-bold mb-2">Creative Business Banner</h2>
                    <p className="text-xs mb-3 text-white/90 max-w-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                    </p>
                    
                    {/* Social Icons */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                        <Facebook size={12} className="text-gray-700" />
                      </div>
                      <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                        <Home size={12} className="text-gray-700" />
                      </div>
                      <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                        <Send size={12} className="text-gray-700" />
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="inline-flex items-center gap-1 bg-white hover:bg-gray-50 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold transition-colors border border-gray-300">
                      MORE INFO
                      <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Prime Slot Badge */}
                <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                  Prime slot
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
