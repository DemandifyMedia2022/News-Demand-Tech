"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import gsap from "gsap";

interface FloatingBannerProps {
  onClose?: () => void;
}

export function FloatingBanner({ onClose }: FloatingBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      gsap.from(bannerRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Subtle floating animation
      gsap.to(bannerRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    gsap.to(bannerRef.current, {
      x: 100,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        setIsVisible(false);
        onClose?.();
      }
    });
  };

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-24 sm:w-32 lg:w-40 bg-gradient-to-b from-blue-600 to-blue-700 rounded-lg shadow-2xl border border-blue-500/30 overflow-hidden"
    >
      {/* Banner Content */}
      <div className="relative h-full">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <X className="w-3 h-3 text-white" />
        </button>

        {/* Banner Image */}
        <div className="relative h-40 sm:h-48 lg:h-56">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80"
            alt="Vertical Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
        </div>

        {/* Text Content */}
        <div className="p-3 sm:p-4">
          <div className="text-center">
            <div className="text-white font-bold text-sm sm:text-base mb-1 sm:mb-2">
              US Market
            </div>
            <div className="text-white/80 text-xs sm:text-sm leading-tight">
              Premium Solutions
            </div>
          </div>

          {/* CTA */}
          <button className="w-full mt-2 sm:mt-3 bg-white text-blue-700 rounded-full py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
            <span>View</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </div>
  );
}
