"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, TrendingUp, Bell } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { getUpcomingEvents, getPastEvents, getFeaturedEvent } from "@/lib/events-data";

export default function EventPage() {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  
  const featuredEvent = getFeaturedEvent();
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1e3a8a] via-[#1e40af] to-[var(--background)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:px-8 lg:py-32">
          <div className="text-center">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-white/70 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-white" />
              <span>UPCOMING TECH EVENTS · CONFERENCES · WEBINARS</span>
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Connect. Learn. Grow.
            </h1>

            <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Join industry leaders, innovators, and tech enthusiasts at our curated events. From intimate workshops to global conferences, discover opportunities to expand your network and knowledge.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="inline-flex h-10 sm:h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 sm:px-8 text-sm sm:text-base font-semibold text-[#1e3a8a] shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                Browse all events
                <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => setShowSubmissionForm(true)}
                className="inline-flex h-10 sm:h-12 items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-6 sm:px-8 text-sm sm:text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Submit your event
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event Section */}
      {featuredEvent && (
        <section className="relative py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="mb-12 text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#1e3a8a]">
                DON'T MISS OUT
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                Featured Event
              </h2>
            </div>

            <EventCard event={featuredEvent} featured={true} />
          </div>
        </section>
      )}

      {/* Upcoming Events Section */}
      <section className="relative bg-[var(--surface-2)] py-20 lg:py-28">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full bg-[rgba(30,58,138,0.06)] blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[35rem] w-[35rem] rounded-full bg-[rgba(30,58,138,0.05)] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#1e3a8a]">
                <TrendingUp className="h-4 w-4" />
                WHAT'S COMING UP
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                Upcoming Events
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>

          {upcomingEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-[color:var(--muted-foreground)]">
                No upcoming events at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events Section */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
              HIGHLIGHTS & RECAPS
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Past Events
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>

          {pastEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-[color:var(--muted-foreground)]">
                No past events to display.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="relative bg-[var(--surface-2)] py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#1e3a8a]/20 bg-gradient-to-br from-[#1e3a8a]/10 to-[#1e40af]/10 p-12 shadow-2xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#1e3a8a]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#1e40af]/10 blur-3xl" />

            <div className="relative text-center">
              <Bell className="mx-auto mb-6 h-16 w-16 text-[#1e3a8a]" />
              <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl">
                Never Miss an Event
              </h2>
              <p className="mb-8 text-lg text-[color:var(--muted-foreground)]">
                Subscribe to our event newsletter and get notified about upcoming conferences, workshops, and networking opportunities.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-full border border-[color:var(--border)] bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                  />
                  <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1e3a8a] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1e40af]">
                    Subscribe to updates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
