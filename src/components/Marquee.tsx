export function FourPointStar({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0c.9 6.8 5.2 11.1 12 12-6.8.9-11.1 5.2-12 12-.9-6.8-5.2-11.1-12-12C6.8 11.1 11.1 6.8 12 0z" />
    </svg>
  );
}

export default function Marquee({ items, outline = false }: { items: readonly string[] | string[]; outline?: boolean }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-ink-2 py-5 md:py-7" dir="ltr">
      <div className="flex w-max animate-marquee items-center gap-8 pr-8 hover:[animation-play-state:paused]">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-8">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-8">
                <span
                  className={`whitespace-nowrap font-display text-4xl font-black tracking-tight md:text-6xl ${
                    outline && i % 2 === 1 ? "text-outline" : "text-white"
                  }`}
                >
                  {item}
                </span>
                <FourPointStar className="h-7 w-7 shrink-0 text-violet md:h-10 md:w-10" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
