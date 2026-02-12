"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GDPR() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1, ease: "power3.out" });
      gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 1, delay: 0.2, ease: "power3.out" });
      gsap.from(".content-card", { opacity: 0, y: 60, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".content-card", start: "top 85%" } });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-8 pb-4">
        {/* Custom Banner */}
        <div className="relative h-64 md:h-80 mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 shadow-2xl border border-blue-800">
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            <div className="absolute top-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-white/8 rounded-full blur-xl" />
            <div className="absolute bottom-20 right-10 w-28 h-28 bg-white/6 rounded-full blur-lg" />
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          {/* Shield Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
            <div className="w-48 h-48 border-8 border-white rounded-full flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-white rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-lg" />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-6">
              <h1 className="hero-title text-4xl md:text-5xl font-bold mb-2">
                GDPR
                <span className="block text-2xl md:text-3xl mt-2 font-medium">General Data Protection Regulation</span>
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-4 opacity-90">
                Protecting your privacy and data rights across the European Union
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-[var(--border)] rounded-full mb-3">
              <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-[var(--accent)]">GDPR Compliance</span>
            </div>
            
            <p className="hero-subtitle text-base text-[var(--muted-foreground)] max-w-3xl mx-auto mb-4">
              The General Data Protection Regulation (GDPR) enhances privacy rights and data protection for individuals in the European Union. DemandTeqmedia is committed to full GDPR compliance.
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <div className="px-3 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white rounded-lg text-sm font-medium">
                EU Regulation 2016/679
              </div>
              <div className="px-3 py-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white rounded-lg text-sm font-medium">
                Data Rights Protected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-3">
            
            {/* What is GDPR */}
            <div className="content-card bg-slate-100 rounded-lg p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-3">What is GDPR?</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area.
              </p>
            </div>

            {/* Your GDPR Rights */}
            <div className="content-card bg-slate-100 rounded-lg p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Your GDPR Rights</h2>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">Right to be Informed</h3>
                  <p className="text-sm text-slate-600">Know what data we collect and why</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">Right of Access</h3>
                  <p className="text-sm text-slate-600">Request access to your personal data</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">Right to Rectification</h3>
                  <p className="text-sm text-slate-600">Correct inaccurate personal data</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">Right to Erasure</h3>
                  <p className="text-sm text-slate-600">Request deletion of your personal data</p>
                </div>
              </div>
            </div>

            {/* Our Commitment */}
            <div className="content-card bg-slate-100 rounded-lg p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Our GDPR Commitment</h2>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">Lawful Processing</h3>
                  <p className="text-sm text-slate-600">We process data only with legal basis and consent.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">Data Minimization</h3>
                  <p className="text-sm text-slate-600">We collect only data necessary for our services.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">Transparency</h3>
                  <p className="text-sm text-slate-600">Clear information about data processing activities.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">Security</h3>
                  <p className="text-sm text-slate-600">Robust measures to protect your personal data.</p>
                </div>
              </div>
            </div>

            {/* Data Processing & Security */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="content-card bg-slate-100 rounded-lg p-6 shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Data Processing Activities</h2>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">Service Provision</p>
                    <p className="text-sm text-slate-600">Legal Basis: Contractual Necessity</p>
                    <p className="text-sm text-slate-600">Data: Name, Email, Contact Info</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">Marketing</p>
                    <p className="text-sm text-slate-600">Legal Basis: Consent</p>
                    <p className="text-sm text-slate-600">Data: Email, Preferences</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">Analytics</p>
                    <p className="text-sm text-slate-600">Legal Basis: Legitimate Interest</p>
                    <p className="text-sm text-slate-600">Data: Usage Data, IP Address</p>
                  </div>
                </div>
              </div>

              <div className="content-card bg-slate-100 rounded-lg p-6 shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Data Breach Procedures</h2>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">72-Hour Notification</p>
                    <p className="text-sm text-slate-600">Notify supervisory authority within 72 hours</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">Individual Notification</p>
                    <p className="text-sm text-slate-600">Inform affected individuals if high risk</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">Documentation</p>
                    <p className="text-sm text-slate-600">Document all breaches and remediation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="content-card bg-slate-100 rounded-lg p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4">GDPR Contact</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="font-medium text-slate-900">gdpr@newsdemandtech.com</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="font-medium text-slate-900">+1 (555) 123-4567</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="font-medium text-slate-900">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">Response Time</p>
                    <p className="text-sm text-slate-600">We will respond to GDPR requests within 30 days of receipt.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
