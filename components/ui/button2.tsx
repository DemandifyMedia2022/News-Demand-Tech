"use client";

import * as React from "react"
import { cn } from "@/lib/utils";

interface FlowButton2Props {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const FlowButton2 = React.forwardRef<HTMLButtonElement, FlowButton2Props>(
  ({ text, onClick, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          "group relative overflow-hidden rounded-xl border border-[#1e3a8a] bg-[#1e3a8a] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1e40af] hover:border-[#1e40af]",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{text}</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
      </button>
    )
  }
)
FlowButton2.displayName = "FlowButton2"