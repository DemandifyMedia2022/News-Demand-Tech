"use client";

import React from "react";
import { ArrowUpRight, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Contact", href: "/contact" }
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "Resources", href: "/resources" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Whitepapers", href: "/whitepapers" }
    ],
    solutions: [
      { name: "HRTEQ", href: "/tech/hrteq" },
      { name: "MARTEQ", href: "/tech/marteq" },
      { name: "FINTEQ", href: "/tech/finteq" },
      { name: "CXTEQ", href: "/tech/cxteq" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="relative bg-white border-t border-[var(--border)]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[20rem] w-[20rem] rounded-full bg-[rgba(30,58,138,0.03)] blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[25rem] w-[25rem] rounded-full bg-[rgba(30,58,138,0.02)] blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[var(--primary)] mb-2">News Demand-tech</h3>
                <p className="text-[var(--muted-foreground)] text-sm sm:text-base leading-relaxed">
                  Signal over noise for modern B2B decision-makers. Strategy, systems, and signals across demand, CX, HR, and fintech.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                  <Mail className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-sm">hello@news-demand-tech.com</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                  <Phone className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                  <MapPin className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-sm">New York, NY 10001</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h4 className="font-semibold text-black mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-4">Solutions</h4>
              <ul className="space-y-2">
                {footerLinks.solutions.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="font-semibold text-black mb-2">Stay Updated</h4>
                <p className="text-[var(--muted-foreground)] text-sm">
                  Get the latest insights and trends delivered to your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--surface)] text-black placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
                <button className="px-6 py-3 bg-[var(--primary)] text-white rounded-full font-semibold hover:bg-[var(--primary-hover)] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-[var(--muted-foreground)] text-sm">
                © {currentYear} News Demand-tech. All rights reserved.
              </div>
              <div className="flex flex-wrap gap-6">
                {footerLinks.legal.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
