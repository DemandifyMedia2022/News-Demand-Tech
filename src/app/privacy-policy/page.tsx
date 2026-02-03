"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPolicy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(heroRef.current,
        {
          opacity: 0,
          y: -30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }
      );

      // Content sections stagger animation
      contentRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref,
            {
              opacity: 0,
              y: 20
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.2 + (index * 0.1),
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 85%",
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
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-[var(--background)] to-blue-50/40">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-4">
        <div className="w-full px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-[var(--border)] rounded-full mb-3 shadow-sm">
              <span className="text-md font-semibold text-[var(--accent)]" style={{ fontFamily: 'var(--font-heading)' }}>Privacy Policy</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-semibold text-[var(--foreground)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Privacy Policy
              <span className="block text-xl text-[var(--accent)] mt-1 font-medium">
                Your data protection is our priority
              </span>
            </h1>
            
            <p className="text-lg text-[var(--muted-foreground)] max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              We are committed to protecting your personal information and ensuring transparency in how we collect, use, and store your data.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pb-4">
        <div className="w-full px-6">
          <div className="space-y-3">
            
            {/* Who is DemandTeq */}
            <div ref={el => { contentRefs.current[0] = el; }} className="bg-white rounded-xl p-4 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow duration-200">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2 pb-2 border-b border-[var(--border)]" style={{ fontFamily: 'var(--font-heading)' }}>Who is DemandTeq?</h2>
              <p className="text-base text-[var(--muted-foreground)] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                We have an extensive experience of 16 years in the B2B space and an array of marketing strategies to help you connect with Tech Buyers across the board. We assist Marketing and Sales teams achieve ROI from their marketing campaigns and go a step ahead of their competition. Our triple layer Intent strategy helps us verify the prospects' interest by gauging the Intent specialities searched, duration of their activity and the various signals they have shared thanks to their online activities.
              </p>
            </div>

            {/* How do you collect information */}
            <div ref={el => { contentRefs.current[1] = el; }} className="bg-white rounded-xl p-4 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow duration-200">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2 pb-2 border-b border-[var(--border)]" style={{ fontFamily: 'var(--font-heading)' }}>How do you collect information about me?</h2>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-[var(--background)] rounded-lg p-3">
                  <p className="text-base text-[var(--foreground)] font-medium mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Direct Information</p>
                  <p className="text-md text-[var(--muted-foreground)] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    The information we collect is primarily provided by you, such as when you are asked to provide us with personal and/or billing information.
                  </p>
                </div>
                <div className="bg-[var(--background)] rounded-lg p-3">
                  <p className="text-base text-[var(--foreground)] font-medium mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Automated Collection</p>
                  <p className="text-md text-[var(--muted-foreground)] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    We automatically collect information through the use of third party "cookies," such as SharpSpring and Google Analytics. Cookies are text files placed on your computer to collect standard Internet log information and visitor behavior information.
                  </p>
                </div>
                <div className="bg-[var(--background)] rounded-lg p-3">
                  <p className="text-base text-[var(--foreground)] font-medium mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Third-Party Sources</p>
                  <p className="text-md text-[var(--muted-foreground)] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    Occasionally we may obtain personal information about you from third-party sources, but only where we have confirmed that these third parties either have your consent or are otherwise legally permitted or required to disclose your personal information to us.
                  </p>
                </div>
              </div>
            </div>

            {/* What information & Storage */}
            <div ref={el => { contentRefs.current[2] = el; }} className="grid md:grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow duration-200">
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>What information about me do you collect?</h2>
                <p className="text-base text-[var(--muted-foreground)] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  We may contact you by phone, email or social media. Should you have any preferences on the manner in which we contact you, please let us know using the details below.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow duration-200">
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>How long do you store my information?</h2>
                <div className="space-y-2">
                  <p className="text-md text-[var(--muted-foreground)] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    We will not keep your personal data that we process for longer than is necessary for the purpose(s) the data is collected.
                  </p>
                  <p className="text-md text-[var(--muted-foreground)] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    We may retain your personal data where such retention is necessary for compliance with a legal obligation or to protect your vital interests.
                  </p>
                </div>
              </div>
            </div>

            {/* Security & Contact */}
            <div ref={el => { contentRefs.current[3] = el; }} className="grid md:grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow duration-200">
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Is my personal data secure?</h2>
                <p className="text-base text-[var(--muted-foreground)] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  Only authorized personnel are allowed access to your personal information. We take the appropriate standard of care in the storage of your information and comply with all relevant laws.
                </p>
              </div>

              <div className="bg-gradient-to-r from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-xl p-4 shadow-sm border border-[var(--border)]">
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>How can I contact you?</h2>
                <div className="space-y-2">
                  <p className="text-base text-[var(--muted-foreground)]" style={{ fontFamily: 'var(--font-sans)' }}>
                    If you have any questions about this privacy policy or the data we hold on you, or if you would like to opt out of receiving communications from us, you may contact us at:
                  </p>
                  <p className="text-base text-[var(--foreground)] font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                    Office 806, 8th Floor, Liberty House, (DIFC) Dubai, United Arab Emirates.
                  </p>
                  <p className="text-base text-[var(--accent)] font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                    contact@demandteq.com
                  </p>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div ref={el => { contentRefs.current[4] = el; }} className="bg-white rounded-xl p-4 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow duration-200">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>With whom do you share my personal information?</h2>
              <div className="space-y-2">
                <p className="text-base text-[var(--muted-foreground)] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  We share your personal information with our other group companies for internal reasons, primarily for business and operational purposes. As we continue to develop our business, we may sell or purchase assets. If another entity acquires us or merges with us your personal information will be disclosed to such entity. Also, if any bankruptcy or reorganization proceeding is brought by or against us, all such information will be considered an asset of ours and as such it is possible they will be sold or transferred to third parties.
                </p>
                <p className="text-base text-[var(--muted-foreground)] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  We may share your personal information with our customers if you have expressed an interest in their goods or services. This interest may be expressed in numerous ways, including submitting your information to us in order to download a digital asset (such as a whitepaper or ebook), by engaging with any of our email marketing or clicking on a digital advert hosted by us. Please ensure that you read and agree to our customers' privacy policies before expressing any interest in their product as outlined above. Please also note that you have the right to object to any processing by our customer, and any further processing by us.
                </p>
                <p className="text-base text-[var(--muted-foreground)] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  Where required we share your personal information with third parties to comply with a legal obligation; when we believe in good faith that an applicable law requires it; at the request of governmental authorities conducting an investigation; to verify or enforce our terms of use or other applicable policies; to detect and protect against fraud, or any technical or security vulnerabilities; to respond to an emergency; or otherwise to protect the rights, property, safety, or security of third parties, visitors to our website, our business or the public.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-xl p-4 shadow-sm border border-[var(--border)]">
              <div className="text-center space-y-2">
                <p className="text-base text-[var(--muted-foreground)]" style={{ fontFamily: 'var(--font-sans)' }}>
                  <strong>Last revised:</strong> May 8, 2022
                </p>
                <p className="text-base text-[var(--muted-foreground)] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  This policy may be updated or revised from time to time. It is the responsibility of the user to periodically review the policy statement to determine if there are any substantive changes.
                </p>
                <p className="text-base text-[var(--muted-foreground)]" style={{ fontFamily: 'var(--font-sans)' }}>
                  © 2022 Demandteq PVT. LTD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
