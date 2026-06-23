"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Youtube,
  ArrowUpRight
} from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Advertise", href: "/advertise" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" }
  ],
  topics: [
    { name: "Digital Banking", href: "#" },
    { name: "Customer Experience", href: "#" },
    { name: "Cybersecurity", href: "#" },
    { name: "AI & Machine Learning", href: "#" },
    { name: "Blockchain", href: "#" }
  ],
  solutions: [
    { name: "FINTEQ", href: "/tech/finteq" },
    { name: "CXTEQ", href: "/tech/cxteq" },
    { name: "HRTEQ", href: "/tech/hrteq" },
    { name: "MARTEQ", href: "/tech/marteq" }
  ],
  explore: [
    { name: "Latest", href: "/latest" },
    { name: "Trending", href: "/trending" },
    { name: "Reports", href: "/reports" },
    { name: "Insights", href: "/insights" },
    { name: "Podcasts", href: "/podcasts" }
  ]
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" }
]

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(".f-brand", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true }
      })

      gsap.from(".f-col", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 85%", once: true }
      })

      gsap.from(".f-newsletter", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 80%", once: true }
      })

      gsap.from(".f-bottom", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 75%", once: true }
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-[#1e3a8a] overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />

      {/* Accent Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Main Content */}
        <div className="py-20">
          {/* Top Section - Glass Card */}
          <div className="glass-premium rounded-3xl p-10 lg:p-14 mb-16">
            <div className="grid lg:grid-cols-12 gap-16">
              {/* Brand Column */}
              <div className="lg:col-span-4 f-brand">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#1e3a8a] flex items-center justify-center shadow-lg shadow-blue-900/20">
                    <span className="text-white font-bold text-2xl">T</span>
                  </div>
                  <span className="text-3xl font-bold text-[#1e3a8a] tracking-tight">TEQ Media</span>
                </div>

                <p className="text-[#475569] text-base leading-relaxed mb-8 max-w-sm">
                  A future-ready technology publication covering HR Tech, FinTech, CX, AI, and enterprise innovation.
                </p>

                <div className="space-y-4 mb-10">
                  <a href="mailto:info@teqmedia.com" className="flex items-center gap-3 text-[#1e3a8a] hover:text-blue-600 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">info@teqmedia.com</span>
                  </a>
                  <a href="tel:+15551234567" className="flex items-center gap-3 text-[#1e3a8a] hover:text-blue-600 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">+1 (555) 123-4567</span>
                  </a>
                  <div className="flex items-center gap-3 text-[#475569]">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#1e3a8a]" />
                    </div>
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-11 h-11 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-900/20"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Links Columns */}
              <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
                <FooterColumn title="Company" links={footerLinks.company} />
                <FooterColumn title="Topics" links={footerLinks.topics} />
                <FooterColumn title="Solutions" links={footerLinks.solutions} />
                <FooterColumn title="Explore" links={footerLinks.explore} />
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="f-newsletter glass rounded-2xl p-8 lg:p-10 border border-white/20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-bold text-white mb-2">Smart insights. Zero noise.</h3>
                <p className="text-white/60 text-sm">Join 50,000+ tech leaders getting our weekly digest.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full sm:w-72 px-5 py-3.5 text-sm rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  />
                </div>
                <button className="px-8 py-3.5 text-sm font-semibold rounded-xl bg-white text-[#1e3a8a] hover:bg-blue-50 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-black/10 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="f-bottom py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
              <p className="text-white/50 text-sm">
                © {new Date().getFullYear()} TEQ Media. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="text-white/50 hover:text-white text-sm transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-white/50 hover:text-white text-sm transition-colors">
                  Terms
                </Link>
                <Link href="/cookies" className="text-white/50 hover:text-white text-sm transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
            <p className="text-white/40 text-sm italic">
              Designed for the future of digital intelligence
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface FooterColumnProps {
  title: string
  links: { name: string; href: string }[]
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="f-col">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-[#1e3a8a]/60 mb-6">
        {title}
      </h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="group flex items-center gap-1 text-[#1e3a8a] text-sm hover:text-blue-600 transition-colors"
            >
              <span>{link.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
