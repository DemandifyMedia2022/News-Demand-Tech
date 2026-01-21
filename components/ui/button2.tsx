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
          "group relative overflow-hidden rounded-xl border border-sky-200 bg-sky-50 px-6 py-2.5 text-sm font-semibold text-sky-900 transition-all duration-300 hover:bg-sky-100 hover:border-sky-300",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{text}</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-sky-200/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
      </button>
    )
  }
)
FlowButton2.displayName = "FlowButton2"