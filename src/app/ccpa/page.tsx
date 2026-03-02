"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Eye, Database, UserCheck, FileText, DollarSign, Mail, Phone, MapPin, AlertCircle, Globe, Users, Clock, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CCPA() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });

      gsap.from(".hero-badges", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.4,
        ease: "power3.out"
      });

      // Card animations
      gsap.from(".content-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".content-card",
          start: "top 85%"
        }
      });

      // Floating elements
      gsap.to(".floating-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Glow effects
      gsap.from(".glow-effect", {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ".glow-effect",
          start: "top 90%"
        }
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-25 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl floating-icon" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl floating-icon" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-15 left-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl floating-icon" style={{ animationDelay: "2s" }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* Hero Content - Left Side */}
            <div className="lg:col-span-2">
              <div className="text-left mb-6">
                <div className="inline-flex items-left gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-white/50 rounded-full mb-4 shadow-xl">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-900 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-700">California Consumer Privacy Act</span>
                </div>

                <h1 className="hero-title text-3xl md:text-4xl font-semibold bg-gradient-to-r from-gray-900 via-blue-900 to-blue-900 bg-clip-text text-transparent mb-2">
                  CCPA
                  <span className="block text-xl md:text-2xl text-blue-600 mt-2 font-medium">
                    California Consumer Privacy Act
                  </span>
                </h1>

                <p className=" hero-subtitle text-left text-xl text-gray-600 max-w-2xl leading-relaxed mb-4">
                  The California Consumer Privacy Act (CCPA) enhances privacy rights and consumer protection for individuals who reside in California. DemandTeqmedia is committed to full CCPA compliance.
                </p>

                <div className="hero-badges flex flex-wrap justify-left gap-3">
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <span className="text-md ">California Civil Code §1798.83</span>
                  </div>
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <span className="text-md">Consumer Rights Protected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Your CCPA Rights Sidebar - Right Side */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-4 sticky">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Your CCPA Rights</h3>
                <div className="space-y-2">
                  {[
                    { icon: Eye, text: "Right to Know", desc: "Request what personal information we collect" },
                    { icon: Database, text: "Right to Delete", desc: "Request deletion of your personal information" },
                    { icon: DollarSign, text: "Right to Opt-Out", desc: "Direct us not to sell your personal information" },
                    { icon: Shield, text: "Right to Non-Discrimination", desc: "We cannot discriminate for exercising rights" }
                  ].map((right, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <right.icon className="w-5 h-5 text-[var(--accent)]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{right.text}</h4>
                          <p className="text-sm text-gray-600">{right.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-4">

            {/* Privacy Policy Reference */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Privacy Policy Reference</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Please refer to our Privacy Policy for general information about what kind of personal data we collect, and how we collect, use and store your personal data. Please see below for additional information relevant to the CCPA.
                  </p>
                </div>
              </div>
            </div>

            {/* Categories of Personal Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">What categories of personal information do you collect about me?</h2>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[var(--accent)]" />
                    Personal Identifiers
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We may collect personal identifiers, such as your name, personal and/or business contact details, including your phone number(s), email address, mailing address, job title and any other information required to validate your identity; credit card or bank account information necessary for billing purposes; commercial information, such as records of products or services purchased or other purchasing or use histories or tendencies; activity information relating to internet or other electronic networks such as browsing or searching history, or interaction with a website, ad or app; information related to employment or other professional standings; information related to education.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[var(--accent)]" />
                    Age Restrictions
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We do not knowingly collect any information about anyone under the age of 16.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[var(--accent)]" />
                    Third-Party Sources
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Occasionally we may obtain personal information about you from third-party sources (including third-party websites, data brokers or credit reference agencies), but only where we have confirmed that these third parties either have your consent or are otherwise legally permitted or required to disclose your personal information to us.
                  </p>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Do you share, disclose or sell my personal information?</h2>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We may share your personal information, relating to the categories listed above, with our other group companies and service providers for internal reasons if it is necessary for business and operational purposes.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Where required we share your personal information, relating to the categories listed above, with service providers or third parties to comply with a legal obligation; when we believe in good faith that an applicable law requires it; at the request of governmental authorities conducting an investigation; to verify or enforce our terms of use or other applicable policies; to detect and protect against fraud, or any technical or security vulnerabilities; to respond to an emergency; or otherwise to protect the rights, property, safety, or security of third parties, visitors to our website, our business or the public.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    As we continue to develop our business, we may sell or purchase assets. If another entity acquires us or merges with us your personal information, relating to the categories above, may be disclosed or sold to such entity. Also, if any bankruptcy or reorganisation proceeding is brought by or against us, all such information will be considered an asset of ours and as such it is possible they will be sold or transferred to third parties.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We may sell your personal information, relating to the categories listed above, to our customers, after you have expressed an interest in their goods or services. This interest may be expressed in numerous ways, including submitting your information to us in order to download a digital asset (such as a white-paper or ebook), by engaging with any of our email marketing or clicking on a digital advert hosted by us. Please ensure that you read and agree to our customers&apos; privacy policies before expressing any interest in their product as outlined above.
                  </p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-none">
          <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Your CCPA Rights</h2>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
                <p className="text-xl text-gray-700 font-medium mb-3">
                  If you are a resident of California, the CCPA grants you the following rights:
                </p>

                <div className="space-y-7">
                  {[
                    "The right to request disclosure of our data collection and sales practices in connection with your personal information, including the categories of personal information we have collected, the source of the information, our use of the information and, if the information was disclosed or sold to third parties, the categories of personal information disclosed or sold to third parties and the categories of third parties to whom such information was disclosed or sold;",
                    "The right to request a copy of the specific personal information collected about you during the 12 months before your request (together with right #1, a \"personal information request\");",
                    "The right to have such information deleted (excepting where such information is required to: i.provide you with goods or services you requested; ii. detect or resolve issues security or functionality-related issues; iii. comply with the law; iv. conduct research in the public interest; v. safeguard the right to free speech; and vi. carry out any actions for internal purposes that you might reasonably expect).",
                    "The right to request that your personal information not be sold to third parties, if applicable.",
                    "The right not to be discriminated against because you exercised any of the new rights."
                  ].map((right, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[var(--accent)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed">{right}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-[var(--accent)]" />
                    <h3 className="text-xl  text-gray-900 text-sm">Request Limits</h3>
                  </div>
                  <p className="text-lg text-gray-600">
                    You are entitled to make two information requests within a 12-month period.
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-[var(--accent)]" />
                    <h3 className="text-lg font-semibold text-gray-900">Response Time</h3>
                  </div>
                  <p className="text-lg text-gray-600">
                    You will receive a response to your request within 45 days.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Submit Request */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">How can I submit a personal information request?</h2>
              </div>

              <p className="text-md text-gray-600 leading-relaxed mb-3">
                There are several ways for you to submit a personal information request. You may:
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-md text-gray-900 mb-5">Email us directly with your request</p>
                <div className="inline-flex gap-3 px-4 py-2 bg-white rounded-lg shadow-sm mb-2">
                  <Mail className="w-7 h-7 text-[var(--accent)]" />
                  <span className="text-lg  text-gray-900">contact@demandteq.com</span>
                </div>
                
              </div>
            </div>

            {/* Data Storage */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">For how long do you store my information?</h2>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 w-full">
                <p className="text-lg text-gray-600 leading-relaxed">
                  We may share your personal information, relating to the categories listed above, with our other group companies and service providers for internal reasons if it is necessary for business and operational purposes.
                </p>
              </div>
            </div>

            {/* Contact Information with Need Help */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-xl text-gray-900 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--accent)]" />
                    Mail Address
                  </h3>
                  <p className="text-md text-gray-600 leading-relaxed">
                    Liberty House, (DIFC) UAE,<br />
                    office 806, 8th floor,<br />
                    Dubai,<br />
                    United Arab Emirates
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-xl text-gray-900 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[var(--accent)]" />
                    Email Address
                  </h3>
                  <p className="text-md text-gray-600">
                    legal@demandteq.com
                  </p>
                </div>
              </div>

              {/* Need Help Section */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Phone className=" text-xl w-4 h-4 text-[var(--accent)]" />
                  Need Help?
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-md text-gray-600">ccpa@newsdemandtech.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
                  </div>
                </div>
                <div className="mt-2 p-2 bg-white border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-700">
                    <strong>Response Time:</strong> Within 45 days
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-sm">Verification Required</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Only you, or a person registered with the California Secretary of State that you authorize to act on your behalf, may make a verifiable request related to your personal information. For all requests, you must provide your full legal name, your home address, your cell phone number, your email address, which consumer right you are calling about, and what your request is. You may be asked for additional proof of identity, as well.
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
