"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SwitcherProps {
    options: string[];
    activeOption: string;
    onChange: (option: string) => void;
    className?: string;
}

export function Switcher({ options, activeOption, onChange, className }: SwitcherProps) {
    const activeIndex = options.indexOf(activeOption);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

    // Update indicator position and width based on active button
    useEffect(() => {
        const activeButton = buttonRefs.current[activeIndex];
        if (activeButton) {
            const { offsetLeft, offsetWidth } = activeButton;
            setIndicatorStyle({
                left: offsetLeft,
                width: offsetWidth
            });
        }
    }, [activeIndex, activeOption]);

    return (
        <div
            className={cn(
                "group/switcher relative inline-flex p-1.5 bg-white/40 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(30,58,138,0.08)] transition-all duration-500 max-w-full overflow-hidden",
                className
            )}
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#1e3a8a]/[0.02] to-transparent pointer-events-none" />

            {/* Scrolling Container for Mobile */}
            <div className="flex items-center overflow-x-auto scrollbar-none relative">
                {/* Sliding Indicator Container */}
                <div
                    className="absolute top-1.5 bottom-1.5 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0 pointer-events-none"
                    style={{
                        left: `${indicatorStyle.left}px`,
                        width: `${indicatorStyle.width}px`,
                    }}
                >
                    {/* The actual colored pill */}
                    <div className="relative w-full h-full">
                        <div className="w-full h-full bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] rounded-xl shadow-[0_4px_20px_rgba(30,58,138,0.4)] overflow-hidden relative">
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] animate-switcher-shimmer" />

                            {/* Top highlight (3D edge) */}
                            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/30 rounded-t-xl" />

                            {/* Bottom shadow (3D edge) */}
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/10 rounded-b-xl" />

                            {/* Center highlight dot */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 rounded-full blur-xl" />
                        </div>
                    </div>
                </div>

                {options.map((option, index) => {
                    const isActive = activeOption === option;
                    return (
                        <button
                            key={option}
                            ref={(el) => { buttonRefs.current[index] = el; }}
                            onClick={() => onChange(option)}
                            className={cn(
                                "relative z-10 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 outline-none flex items-center justify-center whitespace-nowrap flex-shrink-0",
                                isActive
                                    ? "text-white"
                                    : "text-slate-600 hover:text-[#1e3a8a]"
                            )}
                            aria-pressed={isActive}
                        >
                            {/* Inactive Hover State */}
                            {!isActive && (
                                <div className="absolute inset-0 bg-[#1e3a8a]/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            )}

                            <span className={cn(
                                "relative z-10 tracking-tight transition-all duration-500",
                                isActive
                                    ? "scale-105 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                                    : "scale-100 group-active:scale-95"
                            )}>
                                {option}
                            </span>
                        </button>
                    );
                })}
            </div>

            <style jsx global>{`
                @keyframes switcher-shimmer {
                    0% { transform: translateX(-250%) skewX(-25deg); }
                    100% { transform: translateX(250%) skewX(-25deg); }
                }
                .animate-switcher-shimmer {
                    animation: switcher-shimmer 5s infinite cubic-bezier(0.4, 0, 0.2, 1);
                }
                /* Hide scrollbar but keep functionality */
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
