'use client';

import { Sparkles, TrendingUp, Users, Zap } from "lucide-react";

export function Banner({ size = "md" }: { size?: "xl" | "md" | "sm" }) {
  const sizes = {
    xl: "h-[420px]",
    md: "h-[260px]",
    sm: "h-[160px]",
  };

  return (
    <div
      className={`${sizes[size]} relative overflow-hidden rounded-[28px] 
      bg-[radial-gradient(circle_at_top,rgba(30,58,138,0.12),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,255,255,0.7))] border border-[color:var(--border)]`}
    >
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[rgba(30,58,138,0.12)] blur-3xl" />
      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[rgba(30,58,138,0.08)] blur-3xl" />
      <div className="absolute inset-0 backdrop-blur-[10px]" />
    </div>
  );
}

export default function BannerScroller() {
  const scrollItems = [
    { text: "New: Advanced analytics dashboard now available", icon: Sparkles, highlight: true },
    { text: "Join 10,000+ tech professionals reading our insights", icon: Users, highlight: false },
    { text: "Latest: AI trends shaping the future of business", icon: TrendingUp, highlight: false },
    { text: "Premium placements available", icon: Zap, highlight: true },
    { text: "New: Advanced analytics dashboard now available", icon: Sparkles, highlight: true },
    { text: "Join 10,000+ tech professionals reading our insights", icon: Users, highlight: false },
    { text: "Latest: AI trends shaping the future of business", icon: TrendingUp, highlight: false },
    { text: "Premium placements available", icon: Zap, highlight: true },
  ];

  return (
    <div className="w-full relative overflow-hidden">
      {/* Gradient background with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#1e3a8a] bg-[length:200%_100%] animate-[gradientShift_8s_ease_infinite]" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Glow effects */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-full bg-gradient-to-r from-[#1e3a8a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-full bg-gradient-to-l from-[#1e3a8a] to-transparent z-10 pointer-events-none" />

      <style>{`
        @keyframes smoothScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .ticker-wrapper {
          display: flex;
          animation: smoothScroll 45s linear infinite;
        }

        .ticker-wrapper:hover {
          animation-play-state: paused;
        }

        .ticker-item {
          flex-shrink: 0;
          white-space: nowrap;
          letter-spacing: 0.06em;
        }

        .highlight-badge {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative z-[5] py-3 px-4 md:px-6">
        <div className="overflow-hidden">
          <div className="ticker-wrapper">
            {scrollItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="ticker-item flex items-center gap-8 md:gap-12 px-4">
                  <div className="flex items-center gap-3">
                    {item.highlight && (
                      <span className="highlight-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-[10px] uppercase font-bold tracking-wider text-white/95">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                      </span>
                    )}
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
                      <Icon className="w-3.5 h-3.5 text-white/80" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-white/95 tracking-wide">{item.text}</span>
                  </div>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                    <span className="h-0.5 w-8 rounded-full bg-gradient-to-r from-white/20 to-transparent" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
