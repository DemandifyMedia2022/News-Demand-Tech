"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            className={cn(
                "flex min-h-[100px] w-full rounded-xl border border-[var(--border)] bg-white/80 px-4 py-3 text-sm text-black placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none",
                className
            )}
            {...props}
        />
    );
}

export { Textarea };
