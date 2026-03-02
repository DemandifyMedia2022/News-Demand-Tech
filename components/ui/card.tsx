"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-[var(--border)] bg-white/80 backdrop-blur-lg shadow-lg",
                className
            )}
            {...props}
        />
    );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-6", className)} {...props} />;
}

export { Card, CardContent };
