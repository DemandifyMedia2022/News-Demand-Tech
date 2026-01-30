"use client";

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#1e3a8a] text-white hover:bg-[#1e40af]",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-[#1e3a8a] bg-white hover:bg-[#1e3a8a] hover:text-white",
        secondary:
          "bg-[#1e3a8a] text-white hover:bg-[#1e40af]",
        ghost: "hover:bg-[#1e3a8a] hover:text-white",
        link: "text-[#1e3a8a] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// FlowButton component
interface FlowButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const FlowButton = React.forwardRef<HTMLButtonElement, FlowButtonProps>(
  ({ text, onClick, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          "group relative overflow-hidden rounded-xl bg-[#1e3a8a] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1e40af] hover:shadow-lg hover:shadow-[#1e3a8a]/25",
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
FlowButton.displayName = "FlowButton"

export { Button, buttonVariants }