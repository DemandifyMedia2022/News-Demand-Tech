"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SwitcherProps {
    options: string[];
    activeOption: string;
    onChange: (option: string) => void;
    className?: string;
}

export function Switcher({ options, activeOption, onChange, className }: SwitcherProps) {
    return (
        <div
            className={cn(
                "inline-flex p-1.5 bg-gray-100/50 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-inner",
                className
            )}
        >
            {options.map((option) => {
                const isActive = activeOption === option;
                return (
                    <button
                        key={option}
                        onClick={() => onChange(option)}
                        className={cn(
                            "px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden",
                            isActive
                                ? "bg-white text-[#1e3a8a] shadow-md scale-100"
                                : "text-gray-500 hover:text-gray-900 hover:bg-white/50 scale-95 hover:scale-100"
                        )}
                    >
                        {isActive && (
                            <span className="absolute inset-0 bg-gradient-to-tr from-[#1e3a8a]/5 to-transparent pointer-events-none" />
                        )}
                        <span className="relative z-10">{option}</span>
                    </button>
                );
            })}
        </div>
    );
}
