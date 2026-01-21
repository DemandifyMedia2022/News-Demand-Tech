"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

interface BannerScrollerProps {
  className?: string;
}

const BannerScroller = React.forwardRef<HTMLDivElement, BannerScrollerProps>(
  ({ className, ...props }, ref) => {
    const messages = [
      "🚀 New: Advanced analytics dashboard now available",
      "📊 Join 10,000+ tech professionals reading our insights",
      "💡 Latest: AI trends shaping the future of business",
      "🎯 Premium placements available - Contact us today"
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-sky-600 py-2 text-white",
          className
        )}
        {...props}
      >
        <div className="animate-scroll flex whitespace-nowrap">
          {[...messages, ...messages].map((message, index) => (
            <span
              key={index}
              className="mx-8 text-sm font-medium"
            >
              {message}
            </span>
          ))}
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}</style>
      </div>
    )
  }
)
BannerScroller.displayName = "BannerScroller"

export default BannerScroller