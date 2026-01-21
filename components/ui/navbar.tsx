"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, ArrowRight, Github } from "lucide-react";

const navItems = [
  { name: "Products", href: "#" },
  { name: "Solutions", href: "#" },
  { name: "Developers", href: "#" },
  { name: "Pricing", href: "#" },
];

export default function ModernNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // Reveal animation on mount
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        clipPath: "circle(141.4% at 100% 0)",
        duration: 0.6,
        ease: "power4.inOut",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: "circle(0% at 100% 0)",
        duration: 0.6,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex justify-center p-6">
      {/* Main Glass Container */}
      <div 
        ref={navRef}
        className="flex w-full max-w-7xl items-center justify-between rounded-2xl border border-sky-200/70 bg-white/80 px-6 py-3 backdrop-blur-xl shadow-[0_12px_40px_rgba(2,132,199,0.10)] transition-all duration-300 hover:border-sky-300"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-[0_0_20px_rgba(14,165,233,0.3)]" />
          <span className="text-xl font-bold tracking-tight text-slate-900">Demand</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <button className="p-2 text-slate-600 hover:text-slate-950 transition-colors">
            <Github size={20} />
          </button>
          <button className="group flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95">
            Get Started
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-sky-600/10 text-sky-950 md:hidden hover:bg-sky-600/15"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Modern Mobile Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 flex flex-col bg-slate-50 px-8 py-24 md:hidden"
        style={{ clipPath: "circle(0% at 100% 0)" }}
      >
        <div className="flex flex-col gap-8">
          {navItems.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              className="text-4xl font-bold text-slate-950 transition-opacity hover:opacity-70"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <div className="h-px w-full bg-slate-200" />
          <p className="text-sm text-slate-600">Ready to build your next demand tech?</p>
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 py-4 text-lg font-bold text-white">
            Get Started <ArrowRight />
          </button>
        </div>
      </div>
    </nav>
  );
}