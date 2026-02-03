"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GDPR() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(heroRef.current,
        {
          opacity: 0,
          y: -40
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        }
      );

      // Content sections stagger animation
      contentRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref,
            {
              opacity: 0,
              y: 30,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: 0.3 + (index * 0.15),
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: ref,
                start: "top 80%",
                once: true
              }
            }
          );
        }
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16">
        <div className="w-full px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-blue-200 rounded-full mb-8 shadow-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>GDPR Compliance</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              GDPR
              <span className="block text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2 font-bold">
                Data Protection Rights
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
              We are fully compliant with the General Data Protection Regulation (GDPR) and are committed to protecting your data rights with transparency and security.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                🇪🇺 EU Regulation 2016/679
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                ✅ Fully Compliant
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                🛡️ Your Rights Protected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pb-16">
        <div className="w-full px-6">
          <div className="space-y-8">
            
            {/* What is GDPR */}
            <div ref={el => { contentRefs.current[0] = el; }} className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4 relative" style={{ fontFamily: 'var(--font-heading)' }}>
                What is GDPR?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed relative" style={{ fontFamily: 'var(--font-sans)' }}>
                The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area. It also addresses the transfer of personal data outside the EU and EEA areas, ensuring robust protection of personal information.
              </p>
            </div>

            {/* Our Commitment */}
            <div ref={el => { contentRefs.current[1] = el; }} className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-2xl" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6 relative" style={{ fontFamily: 'var(--font-heading)' }}>
                Our GDPR Commitment
              </h2>
              <div className="grid md:grid-cols-2 gap-6 relative">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">✓</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Lawful Processing</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    We process data only with legal basis and your consent, ensuring full compliance with GDPR requirements.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">✓</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Data Minimization</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    We collect only data necessary for our services, following the principle of data minimization.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">✓</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Transparency</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    Clear information about data processing activities, ensuring you understand how your data is used.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">✓</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Security</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    Robust measures to protect your personal data with enterprise-grade security protocols.
                  </p>
                </div>
              </div>
            </div>

            {/* Your GDPR Rights */}
            <div ref={el => { contentRefs.current[2] = el; }} className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6 relative" style={{ fontFamily: 'var(--font-heading)' }}>
                Your GDPR Rights
              </h2>
              <div className="grid md:grid-cols-2 gap-4 relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Right to be Informed</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    You have the right to be informed about the collection and use of your personal data.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Right of Access</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    You can request access to your personal data and obtain a copy.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Right to Rectification</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    You can request correction of inaccurate personal data.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border border-orange-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Right to Erasure</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    You can request deletion of your personal data in certain circumstances.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 border border-indigo-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Right to Portability</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    You can request transfer of your data to another controller.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-5 border border-pink-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Right to Object</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    You can object to processing of your personal data.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Processing & Security */}
            <div ref={el => { contentRefs.current[3] = el; }} className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 shadow-xl text-white hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Data Processing Activities</h2>
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="font-semibold mb-1">Service Provision</p>
                    <p className="text-blue-100 text-sm">Legal Basis: Contractual Necessity</p>
                    <p className="text-blue-100 text-sm">Data: Name, Email, Contact Info</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="font-semibold mb-1">Marketing</p>
                    <p className="text-blue-100 text-sm">Legal Basis: Consent</p>
                    <p className="text-blue-100 text-sm">Data: Email, Preferences</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="font-semibold mb-1">Analytics</p>
                    <p className="text-blue-100 text-sm">Legal Basis: Legitimate Interest</p>
                    <p className="text-blue-100 text-sm">Data: Usage Data, IP Address</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 shadow-xl text-white hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Data Breach Procedures</h2>
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="font-semibold mb-1">📢 72-Hour Notification</p>
                    <p className="text-purple-100 text-sm">Notify supervisory authority within 72 hours</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="font-semibold mb-1">👥 Individual Notification</p>
                    <p className="text-purple-100 text-sm">Inform affected individuals if high risk</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="font-semibold mb-1">📝 Documentation</p>
                    <p className="text-purple-100 text-sm">Document all breaches and remediation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div ref={el => { contentRefs.current[4] = el; }} className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl text-white">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>GDPR Contact</h2>
                  <div className="space-y-3">
                    <p className="text-gray-300" style={{ fontFamily: 'var(--font-sans)' }}>
                      For GDPR-related inquiries or to exercise your rights, please contact our Data Protection Officer:
                    </p>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-white font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                        📧 gdpr@newsdemandtech.com
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-white font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                        📞 +1 (555) 123-4567
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-white font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                        📍 San Francisco, CA
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-3">
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
                      <p className="text-yellow-300 font-semibold mb-1">⏰ Response Time</p>
                      <p className="text-gray-300" style={{ fontFamily: 'var(--font-sans)' }}>
                        We will respond to GDPR requests within 30 days of receipt.
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                      Your privacy is our priority. We ensure all GDPR requests are handled with the utmost care and confidentiality.
                    </p>
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
