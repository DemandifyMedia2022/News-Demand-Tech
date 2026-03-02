"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
                className
            )}
            {...props}
        />
    );
}

function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-white font-semibold",
                className
            )}
            {...props}
        />
    );
}

export { Avatar, AvatarFallback };
