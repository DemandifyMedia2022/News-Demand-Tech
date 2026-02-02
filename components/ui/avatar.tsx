"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> { }

function Avatar({ className, ...props }: AvatarProps) {
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

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> { }

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
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
