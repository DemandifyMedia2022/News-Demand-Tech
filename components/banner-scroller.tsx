export function Banner({ size = "md" }: { size?: "xl" | "md" | "sm" }) {
  const sizes = {
    xl: "h-[420px]",
    md: "h-[260px]",
    sm: "h-[160px]",
  };

  return (
    <div
      className={`${sizes[size]} relative overflow-hidden rounded-[28px] 
      bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.85),rgba(255,255,255,0.55))] border border-[color:var(--border)]`}
    >
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[rgba(168,85,247,0.18)] blur-3xl" />
      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[rgba(109,40,217,0.14)] blur-3xl" />
      <div className="absolute inset-0 backdrop-blur-[10px]" />
    </div>
  );
}

export default function BannerScroller() {
  return (
    <div className="w-full border-t border-[color:var(--border)] bg-[rgba(255,255,255,0.72)] text-[color:var(--foreground)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-3 py-2 text-xs md:px-6">
        <span className="whitespace-nowrap font-semibold">New: Advanced analytics dashboard now available</span>
        <span className="h-1 w-1 flex-none rounded-full bg-[rgba(168,85,247,0.65)]" />
        <span className="whitespace-nowrap">Join 10,000+ tech professionals reading our insights</span>
        <span className="h-1 w-1 flex-none rounded-full bg-[rgba(168,85,247,0.65)]" />
        <span className="whitespace-nowrap">Latest: AI trends shaping the future of business</span>
        <span className="h-1 w-1 flex-none rounded-full bg-[rgba(168,85,247,0.65)]" />
        <span className="whitespace-nowrap">Premium placements available</span>
      </div>
    </div>
  );
}
