"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryDropdownProps {
    options: string[];  
    activeOption: string;
    onChange: (option: string) => void;
    className?: string;
}

export function CategoryDropdown({ options, activeOption, onChange, className }: CategoryDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Calculate dropdown position
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
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

    // Close on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener("scroll", handleScroll, true);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll, true);
        };
    }, [isOpen]);

    const dropdownMenu = isOpen && typeof window !== 'undefined' ? createPortal(
        <div
            ref={dropdownRef}
            className="fixed bg-white/95 backdrop-blur-2xl rounded-xl border border-white/60 shadow-2xl shadow-[#1e3a8a]/10 overflow-hidden animate-dropdown-slide"
            style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
                zIndex: 99999
            }}
        >
            {options.map((option) => {
                const isActive = activeOption === option;
                return (
                    <button
                        key={option}
                        onClick={() => {
                            onChange(option);
                            setIsOpen(false);
                        }}
                        className={cn(
                            "w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-200",
                            isActive
                                ? "bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white"
                                : "text-gray-700 hover:bg-[#1e3a8a]/5"
                        )}
                    >
                        {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                        <span className={cn(
                            "font-semibold text-sm",
                            isActive && "ml-0",
                            !isActive && "ml-5"
                        )}>
                            {option}
                        </span>
                    </button>
                );
            })}
        </div>,
        document.body
    ) : null;

    return (
        <div className={cn("relative w-full", className)}>
            {/* Dropdown Button */}
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between gap-3 px-5 py-4 bg-white/40 backdrop-blur-2xl rounded-xl border border-white/60 shadow-lg transition-all duration-300",
                    isOpen && "border-[#1e3a8a]/30 shadow-xl"
                )}
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#1e40af]" />
                    <span className="font-bold text-sm text-gray-900">{activeOption}</span>
                </div>
                <ChevronDown
                    size={20}
                    className={cn(
                        "text-[#1e3a8a] transition-transform duration-300",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {/* Dropdown Menu - Rendered via Portal */}
            {dropdownMenu}

            <style jsx global>{`
                @keyframes dropdown-slide {
                    0% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-dropdown-slide {
                    animation: dropdown-slide 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>
        </div>
    );
}
