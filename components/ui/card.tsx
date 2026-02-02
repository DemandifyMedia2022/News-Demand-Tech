"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

function Card({ className, ...props }: CardProps) {
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

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> { }

function CardContent({ className, ...props }: CardContentProps) {
    return <div className={cn("p-6", className)} {...props} />;
}

export { Card, CardContent };
