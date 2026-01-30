"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Mail, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function NewsletterSignup() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true
          }
        });
      }

      // Animate button
      if (buttonRef.current) {
        gsap.from(buttonRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true
          }
        });

        // Button hover effect
        buttonRef.current.addEventListener('mouseenter', () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
          });
        });

        buttonRef.current.addEventListener('mouseleave', () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-4 sm:py-6 bg-[var(--background)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="relative max-w-4xl mx-auto">
          {/* Newsletter Card */}
          <div className="relative bg-[var(--primary)] rounded-2xl shadow-lg overflow-hidden">
            {/* Inner content */}
            <div className="relative p-3 sm:p-4 md:p-6">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-full blur-xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/3 rounded-full blur-lg" />
              
              <div ref={contentRef} className="relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2 mb-4">
                  <Mail className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">Stay Updated</span>
                </div>
                
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Get Weekly Insights
                </h2>
                
                {/* Divider */}
                <div className="w-24 h-1 bg-white mx-auto rounded-full mb-6"></div>
                
                {/* Description */}
                <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-6">
                  Join 10,000+ B2B leaders getting the latest insights on demand generation, customer experience, and technology trends.
                </p>
                
                {/* Button */}
                <button 
                  ref={buttonRef}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[var(--primary)] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group"
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  Subscribe Now
                  <ArrowUpRight 
                    size={16} 
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                  />
                </button>
                
                {/* Social Proof */}
                <p className="text-xs text-white/60 mt-4">
                  Join 10,000+ professionals • Trusted by Fortune 500 companies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
