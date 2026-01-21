"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

interface MenuToggleIconProps {
  open: boolean;
  className?: string;
  duration?: number;
}

export const MenuToggleIcon = React.forwardRef<HTMLDivElement, MenuToggleIconProps>(
  ({ open, className, duration = 300, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-5 w-5 flex-col justify-center gap-1", className)}
        {...props}
      >
        <span
          className={cn(
            "block h-0.5 w-full bg-current transition-all",
            open ? "translate-y-1.5 rotate-45" : ""
          )}
          style={{ transitionDuration: `${duration}ms` }}
        />
        <span
          className={cn(
            "block h-0.5 w-full bg-current transition-all",
            open ? "opacity-0" : ""
          )}
          style={{ transitionDuration: `${duration}ms` }}
        />
        <span
          className={cn(
            "block h-0.5 w-full bg-current transition-all",
            open ? "-translate-y-1.5 -rotate-45" : ""
          )}
          style={{ transitionDuration: `${duration}ms` }}
        />
      </div>
    )
  }
)
MenuToggleIcon.displayName = "MenuToggleIcon"