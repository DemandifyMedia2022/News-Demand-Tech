"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryOption {
    value: string;
    label: string;
    icon: LucideIcon;
}

interface CategoryDropdownProps {
    options: CategoryOption[];
    activeOption: string;
    onChange: (option: string) => void;
    className?: string;
}

export function CategoryDropdown({ options, activeOption, onChange, className }: CategoryDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const activeObj = options.find(o => o.value === activeOption) || options[0];

    // Calculate dropdown position relative to viewport (fixed positioning)
    const updatePosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 8, // Just the offset, no scrollY for fixed
                left: rect.left,
                width: Math.max(rect.width, 280) // Slightly wider for better text flow
            });
        }
    };

    useEffect(() => {
        if (isOpen) {
            updatePosition();
            window.addEventListener('resize', updatePosition);
            window.addEventListener('scroll', updatePosition, true);
        }
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const dropdownMenu = isOpen && typeof window !== 'undefined' ? createPortal(
        <div
            ref={dropdownRef}
            className="fixed bg-white/95 backdrop-blur-[30px] rounded-[1.8rem] border border-white/60 shadow-[0_30px_80px_rgba(30,58,138,0.15)] animate-dropdown-slide p-2 z-[1000] overflow-hidden flex flex-col"
            style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `260px`, // More compact width
                maxHeight: '320px'
            }}
        >
            <div className="mb-2 px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]/30 shrink-0">
                Topics
            </div>
            <div className="space-y-1 overflow-y-auto pr-1 custom-scrollbar scroll-smooth">
                {options.map((option) => {
                    const isActive = activeOption === option.value;
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "group/item w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-[1.2rem] transition-all duration-300",
                                isActive
                                    ? "bg-[#1e3a8a] text-white shadow-lg shadow-[#1e3a8a]/10"
                                    : "text-slate-600 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a]"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300",
                                    isActive ? "bg-white/10" : "bg-slate-50 group-hover/item:bg-white"
                                )}>
                                    <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-[#1e3a8a]/40 group-hover/item:text-[#1e3a8a]")} />
                                </div>
                                <span className="font-black text-[10px] tracking-widest uppercase">{option.label}</span>
                            </div>
                            {isActive && <Check className="h-3 w-3 text-white" />}
                        </button>
                    );
                })}
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <div className={cn("relative w-full", className)}>
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "group w-full flex items-center justify-between gap-3 px-4 py-2 bg-white/80 backdrop-blur-3xl rounded-[1.5rem] border border-white shadow-[0_5px_20px_rgba(30,58,138,0.03)] transition-all duration-500",
                    isOpen && "border-[#1e3a8a]/20 scale-[0.98]"
                )}
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] shadow-md shadow-[#1e3a8a]/15 group-hover:scale-105 transition-transform">
                        <activeObj.icon className="h-4.5 w-4.5 text-white" />
                    </div>
                    <div className="flex flex-col items-start leading-[1.1]">
                        <span className="text-[7px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]/30">Topic</span>
                        <span className="font-black text-[11px] text-slate-900 uppercase tracking-tight">{activeObj.label}</span>
                    </div>
                </div>
                <ChevronDown
                    size={14}
                    className={cn(
                        "text-[#1e3a8a]/30 group-hover:text-[#1e3a8a] transition-all",
                        isOpen && "rotate-180 text-[#1e3a8a]"
                    )}
                />
            </button>

            {/* Dropdown Menu - Rendered via Portal */}
            {dropdownMenu}

            <style jsx global>{`
                @keyframes dropdown-slide {
                    0% {
                        opacity: 0;
                        transform: translateY(-12px) scale(0.98);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-dropdown-slide {
                    animation: dropdown-slide 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(30, 58, 138, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(30, 58, 138, 0.2);
                }
            `}</style>
        </div>
    );
}
