"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------ DATA ------------------ */

const socials = [Facebook, Twitter, Linkedin, Instagram];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Advertise With Us", href: "/advertise-with-us" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "GDPR", href: "/gdpr" },
  { label: "CCPA", href: "ccpa" },
];

const solutionLinks = [
  { label: "HRTEQ", href: "/tech/hrteq" },
  { label: "MARTEQ", href: "/tech/marteq" },
  { label: "FINTEQ", href: "/tech/finteq" },
  { label: "CXTEQ", href: "/tech/cxteq" },
];

const exploreLinks = [
  { label: "Latest", href: "/latest" },
  { label: "Trending", href: "/trending" },
  { label: "Reports", href: "/reports" },
  { label: "Insights", href: "/insights" },
];

const categories = [
  "Digital Banking",
  "Customer Experience",
  "Cybersecurity",
  "Blockchain",
  "AI & Machine Learning",
];

/* ------------------ COMPONENT ------------------ */

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".f-left", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 85%", once: true },
      });

      gsap.from(".f-right", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 85%", once: true },
      });

      gsap.from(".f-fade", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 80%", once: true },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-white overflow-hidden border-t border-gray-200">

      {/* Accent Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-blue-300 to-transparent opacity-60" />

      {/* Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-14">

        {/* MAIN PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 rounded-3xl border border-gray-200 bg-white/70 backdrop-blur-xl p-10">

          {/* BRAND */}
          <div className="lg:col-span-4 f-left space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">
              News Demand-tech
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              A future-ready technology publication covering HR Tech, FinTech,
              CX, AI, and enterprise innovation.
            </p>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                info@newsdemandtech.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                San Francisco, CA
              </div>
            </div>

            <div className="flex gap-4 pt-3">
              {socials.map((Icon, i) => (
                <Icon
                  key={i}
                  className="w-4 h-4 text-gray-500 hover:text-blue-900 transition-colors cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* NAV */}
          <div className="lg:col-span-8 f-right grid grid-cols-2 md:grid-cols-4 gap-8">
            <FooterColumn title="Company" links={companyLinks} />
            <CategoryColumn />
            <FooterColumn title="Solutions" links={solutionLinks} />
            <FooterColumn title="Explore" links={exploreLinks} />
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 px-8 py-5 f-fade">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-700">
              Smart insights. Zero noise. Delivered weekly.
            </p>

            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email"
                className="w-full md:w-60 px-4 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <button className="px-5 py-2 text-sm font-semibold rounded-lg bg-blue-900 text-white hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-2 f-fade">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} News Demand-tech
          </p>
          <p className="text-xs text-gray-400">
            Designed for the future of digital intelligence
          </p>
        </div>
      </div>
    </footer>
  );
};

/* ------------------ COLUMNS ------------------ */

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div className="space-y-3">
    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
      {title}
    </h4>
    <ul className="space-y-2 text-sm text-gray-600">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="hover:text-blue-600 transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const CategoryColumn: React.FC = () => (
  <div className="space-y-3">
    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
      Topics
    </h4>
    <ul className="space-y-2 text-sm text-gray-600">
      {categories.map((item) => (
        <li key={item} className="opacity-70 cursor-default">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
