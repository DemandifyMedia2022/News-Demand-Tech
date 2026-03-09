"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, Clock, ArrowUpRight } from "lucide-react";
import type { Event } from "@/lib/events-data";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

// Category color mapping
const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  "AI & ML": { bg: "bg-emerald-100 dark:bg-emerald-950/50", text: "text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-600 dark:bg-emerald-400" },
  "CXTeq": { bg: "bg-blue-100 dark:bg-blue-950/50", text: "text-blue-700 dark:text-blue-300", dot: "bg-blue-600 dark:bg-blue-400" },
  "HRTeq": { bg: "bg-purple-100 dark:bg-purple-950/50", text: "text-purple-700 dark:text-purple-300", dot: "bg-purple-600 dark:bg-purple-400" },
  "FinTeq": { bg: "bg-orange-100 dark:bg-orange-950/50", text: "text-orange-700 dark:text-orange-300", dot: "bg-orange-600 dark:bg-orange-400" },
  "MarTeq": { bg: "bg-pink-100 dark:bg-pink-950/50", text: "text-pink-700 dark:text-pink-300", dot: "bg-pink-600 dark:bg-pink-400" },
  "Tech Summit": { bg: "bg-emerald-100 dark:bg-emerald-950/50", text: "text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-600 dark:bg-emerald-400" },
  "Networking": { bg: "bg-teal-100 dark:bg-teal-950/50", text: "text-teal-700 dark:text-teal-300", dot: "bg-teal-600 dark:bg-teal-400" }
};

// Event type badge colors
const eventTypeColors: Record<string, string> = {
  "In-Person": "bg-[#1e3a8a] text-white",
  "Virtual": "bg-purple-600 text-white",
  "Hybrid Event": "bg-[#1e3a8a] text-white",
  "Workshop": "bg-blue-600 text-white",
  "Networking": "bg-teal-600 text-white"
};

export function EventCard({ event, featured = false }: EventCardProps) {
  const categoryColor = categoryColors[event.category] || categoryColors["Tech Summit"];
  const eventTypeColor = eventTypeColors[event.eventType] || "bg-[#1e3a8a] text-white";
  const isPast = event.type === "past";

  if (featured) {
    return (
      <Link
        href={`/event/${event.slug}`}
        className="group relative block overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white shadow-2xl transition-all duration-500 hover:shadow-3xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/5 via-transparent to-[#1e40af]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className="relative grid gap-8 lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative h-80 overflow-hidden bg-gradient-to-br from-[#1e3a8a]/20 to-[#1e40af]/20 lg:h-auto">
            <div className="flex h-full items-center justify-center p-12">
              <div className="text-center">
                <Users className="mx-auto mb-6 h-32 w-32 text-[#1e3a8a]/40" />
                <div className="rounded-2xl bg-white/90 px-6 py-4 backdrop-blur-sm">
                  <p className="text-5xl font-bold text-[#1e3a8a]">
                    {event.date.includes("2025") ? "2025" : "2024"}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">{event.category}</p>
                </div>
              </div>
            </div>

            {/* Event Type Badge */}
            <div className="absolute left-6 top-6">
              <span className={`inline-flex items-center gap-2 rounded-full ${eventTypeColor} px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-lg`}>
                {event.eventType}
              </span>
            </div>

            {/* Past Event Badge */}
            {isPast && (
              <div className="absolute bottom-4 left-4">
                <span className="rounded-full bg-gray-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  Completed
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="mb-6">
              <h3 className="mb-4 text-3xl font-bold leading-tight text-black lg:text-4xl">
                {event.title}
              </h3>
              <p className="text-lg leading-relaxed text-[color:var(--muted-foreground)]">
                {event.description}
              </p>
            </div>

            {/* Event Details */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-100 p-2.5">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Date</p>
                  <p className="font-semibold text-black">{event.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-100 p-2.5">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Location</p>
                  <p className="font-semibold text-black">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-purple-100 p-2.5">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Attendees</p>
                  <p className="font-semibold text-black">{event.attendees}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-orange-100 p-2.5">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Duration</p>
                  <p className="font-semibold text-black">{event.duration}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#1e3a8a]">
              <span className="text-lg font-semibold">View Event Details</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Regular event card
  return (
    <Link
      href={`/event/${event.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/0 to-[#1e3a8a]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

      {/* Image/Icon Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#1e3a8a]/10 to-[#1e40af]/10">
        <div className="flex h-full items-center justify-center">
          <Users className="h-24 w-24 text-[#1e3a8a]/30" />
        </div>

        {/* Event Type Badge */}
        <div className="absolute right-4 top-4">
          <span className={`rounded-full ${eventTypeColor} px-3 py-1 text-xs font-bold shadow-lg`}>
            {event.eventType}
          </span>
        </div>

        {/* Past Event Badge */}
        {isPast && (
          <div className="absolute bottom-4 left-4">
            <span className="rounded-full bg-gray-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
              Completed
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col p-6">
        {/* Category Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center gap-1.5 rounded-full ${categoryColor.bg} px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${categoryColor.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${categoryColor.dot}`} />
            {event.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg font-bold leading-tight text-black transition-colors group-hover:text-[#1e3a8a] sm:text-xl">
          {event.title}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
          {event.description}
        </p>

        {/* Event Meta Info */}
        <div className="mb-4 space-y-2 border-t border-[color:var(--border)] pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Learn More Link */}
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e3a8a] transition-all group-hover:gap-3">
          <span>Learn more</span>
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      {/* Gradient Accent Bar */}
      <div className="h-1 w-0 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] transition-all duration-500 group-hover:w-full" />
    </Link>
  );
}
