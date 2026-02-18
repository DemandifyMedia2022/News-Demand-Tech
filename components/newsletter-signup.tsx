"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Mail, Users, X, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function NewsletterSignup() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "loading" }
    | { type: "success" }
    | { type: "error"; message: string }
  >({ type: "idle" });

  const canSubscribe = useMemo(() => email.trim().length > 0 && !emailError, [email, emailError]);

  const validateEmail = (value: string) => {
    const v = value.trim();
    if (!v) return "Email is required";
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    return ok ? "" : "Please enter a valid email";
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true
          }
        });
      }

      // Animate button
      if (buttonRef.current) {
        gsap.from(buttonRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true
          }
        });

        // Button hover effect
        const onEnter = () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
          });
        };

        const onLeave = () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        };

        buttonRef.current.addEventListener("mouseenter", onEnter);
        buttonRef.current.addEventListener("mouseleave", onLeave);

        return () => {
          buttonRef.current?.removeEventListener("mouseenter", onEnter);
          buttonRef.current?.removeEventListener("mouseleave", onLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (!overlayRef.current || !modalRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.18, ease: "power2.out" }
    ).fromTo(
      modalRef.current,
      { opacity: 0, y: 18, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.24, ease: "power3.out" },
      "<"
    );

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
    setStatus({ type: "idle" });
    setEmailError("");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleEmailChange = (v: string) => {
    setEmail(v);
    if (emailError) {
      setEmailError(validateEmail(v));
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const err = validateEmail(email);
    setEmailError(err);
    if (err) return;

    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus({ type: "success" });

      setTimeout(() => {
        setIsOpen(false);
        setEmail("");
        setEmailError("");
        setStatus({ type: "idle" });
      }, 1000);
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.message || "Please try again.",
      });
    }
  };


  return (
    <section ref={sectionRef} className="relative py-4 sm:py-6 bg-[var(--background)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="relative max-w-4xl mx-auto">
          {/* Newsletter Card */}
          <div className="relative bg-[var(--primary)] rounded-2xl shadow-lg overflow-hidden">
            {/* Inner content */}
            <div className="relative p-3 sm:p-4 md:p-6">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-full blur-xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/3 rounded-full blur-lg" />

              <div ref={contentRef} className="relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2 mb-4">
                  <Mail className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">Stay Updated</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Get Weekly Insights
                </h2>

                {/* Divider */}
                <div className="w-24 h-1 bg-white mx-auto rounded-full mb-6"></div>

                {/* Description */}
                <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-6">
                  Join 10,000+ B2B leaders getting the latest insights on demand generation, customer experience, and technology trends.
                </p>

                {/* Button */}
                <button
                  ref={buttonRef}
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[var(--primary)] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group"
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  Subscribe Now
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </button>

                {/* Social Proof */}
                <p className="text-xs text-white/60 mt-4">
                  Join 10,000+ professionals • Trusted by Fortune 500 companies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mounted &&
        isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={closeModal}
            />

            {/* Modal */}
            <div
              ref={modalRef}
              className="relative w-full max-w-md"
            >
              <div className="rounded-2xl bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.35)] border border-gray-200">

                {/* Close */}
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-8">

                  {/* Small Label */}
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    Newsletter
                  </p>

                  {/* Heading */}
                  <h3 className="text-2xl font-semibold text-gray-900 mt-3 leading-tight">
                    Stay Ahead Weekly
                  </h3>

                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    Curated B2B insights on demand, CX, HR & fintech.
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gray-200 my-6" />

                  {/* Form */}
                  <form onSubmit={handleSubscribe} className="space-y-5">

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Work email
                      </label>

                      <input
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onBlur={() => setEmailError(validateEmail(email))}
                        type="email"
                        placeholder="you@company.com"
                        className={`w-full h-12 rounded-lg border px-4 text-sm
            bg-white text-gray-900
            outline-none transition
            focus:ring-2 focus:ring-blue-600 focus:border-blue-600
            ${emailError
                            ? "border-red-400 focus:ring-red-500"
                            : "border-gray-300"
                          }`}
                      />

                      {emailError && (
                        <p className="text-xs text-red-500 mt-2">
                          {emailError}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!canSubscribe || status.type === "loading"}
                      className="w-full h-12 rounded-lg bg-blue-600 text-white font-medium
               transition hover:bg-blue-700
               disabled:opacity-60"
                    >
                      {status.type === "loading"
                        ? "Subscribing..."
                        : status.type === "success"
                          ? "Subscribed ✓"
                          : "Subscribe"}
                    </button>


                    <p className="text-xs text-gray-500 text-center">
                      No spam. Unsubscribe anytime.
                    </p>

                  </form>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

    </section>
  );
}
