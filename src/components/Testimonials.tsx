import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS_ROW_1, TESTIMONIALS_ROW_2, type TestimonialItem } from "../data";
import Dialog from "./Dialog";
import { useLanguage } from "../context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CountryFlag({
  code,
  className = "h-3 w-4.5 rounded-[2px]",
}: {
  code: string;
  className?: string;
}) {
  switch (code.toUpperCase()) {
    case "EG":
      return (
        <svg
          viewBox="0 0 600 400"
          className={`${className} inline-block shrink-0 overflow-hidden shadow-xs`}
          aria-label="علم مصر"
        >
          <rect width="600" height="133.3" fill="#c8102e" />
          <rect y="133.3" width="600" height="133.3" fill="#ffffff" />
          <rect y="266.6" width="600" height="133.4" fill="#000000" />
          <circle cx="300" cy="200" r="22" fill="#c09300" />
          <path d="M290 185h20l4 25h-28z M294 210h12l-6 16z" fill="#a07800" />
        </svg>
      );
    case "SA":
      return (
        <svg
          viewBox="0 0 600 400"
          className={`${className} inline-block shrink-0 overflow-hidden shadow-xs`}
          aria-label="علم السعودية"
        >
          <rect width="600" height="400" fill="#006c35" />
          <path
            d="M180 275h240v10H180z M420 270l15 10-15 10v-5H180v-10h240z M210 265v30h-10v-30z"
            fill="#ffffff"
          />
          <text
            x="300"
            y="215"
            fill="#ffffff"
            fontSize="48"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            لا إله إلا الله
          </text>
        </svg>
      );
    case "QA":
      return (
        <svg
          viewBox="0 0 600 400"
          className={`${className} inline-block shrink-0 overflow-hidden shadow-xs`}
          aria-label="علم قطر"
        >
          <rect width="600" height="400" fill="#ffffff" />
          <path
            d="M200 0h400v400H200l-50-22.2 50-22.2-50-22.2 50-22.2-50-22.3 50-22.2-50-22.2 50-22.2-50-22.3 50-22.2-50-22.2 50-22.2-50-22.3 50-22.2-50-22.2 50-22.2-50-22.3 50-22.2-50-22.2z"
            fill="#8d1b3d"
          />
        </svg>
      );
    case "JO":
      return (
        <svg
          viewBox="0 0 600 400"
          className={`${className} inline-block shrink-0 overflow-hidden shadow-xs`}
          aria-label="علم الأردن"
        >
          <rect width="600" height="133.3" fill="#000000" />
          <rect y="133.3" width="600" height="133.3" fill="#ffffff" />
          <rect y="266.6" width="600" height="133.4" fill="#007a3d" />
          <polygon points="0,0 280,200 0,400" fill="#ce1126" />
          <polygon
            points="100,180 104,194 118,190 108,200 118,210 104,206 100,220 96,206 82,210 92,200 82,190 96,194"
            fill="#ffffff"
          />
        </svg>
      );
    case "AE":
      return (
        <svg
          viewBox="0 0 600 400"
          className={`${className} inline-block shrink-0 overflow-hidden shadow-xs`}
          aria-label="علم الإمارات"
        >
          <rect width="600" height="133.3" fill="#00732f" />
          <rect y="133.3" width="600" height="133.3" fill="#ffffff" />
          <rect y="266.6" width="600" height="133.4" fill="#000000" />
          <rect width="150" height="400" fill="#ce1126" />
        </svg>
      );
    case "KW":
      return (
        <svg
          viewBox="0 0 600 400"
          className={`${className} inline-block shrink-0 overflow-hidden shadow-xs`}
          aria-label="علم الكويت"
        >
          <rect width="600" height="133.3" fill="#007a3d" />
          <rect y="133.3" width="600" height="133.3" fill="#ffffff" />
          <rect y="266.6" width="600" height="133.4" fill="#ce1126" />
          <polygon points="0,0 150,133.3 150,266.6 0,400" fill="#000000" />
        </svg>
      );
    case "GB":
      return (
        <svg
          viewBox="0 0 600 400"
          className={`${className} inline-block shrink-0 overflow-hidden shadow-xs`}
          aria-label="علم بريطانيا"
        >
          <rect width="600" height="400" fill="#012169" />
          <path d="M0 0l600 400M600 0L0 400" stroke="#ffffff" strokeWidth="60" />
          <path d="M0 0l600 400M600 0L0 400" stroke="#c8102e" strokeWidth="40" />
          <path d="M300 0v400M0 200h600" stroke="#ffffff" strokeWidth="100" />
          <path d="M300 0v400M0 200h600" stroke="#c8102e" strokeWidth="60" />
        </svg>
      );
    case "US":
      return (
        <svg
          viewBox="0 0 600 400"
          className={`${className} inline-block shrink-0 overflow-hidden shadow-xs`}
          aria-label="علم أمريكا"
        >
          {Array.from({ length: 13 }).map((_, i) => (
            <rect
              key={i}
              y={(i * 400) / 13}
              width="600"
              height={400 / 13}
              fill={i % 2 === 0 ? "#b22234" : "#ffffff"}
            />
          ))}
          <rect width="240" height={(7 * 400) / 13} fill="#3c3b6e" />
          <circle cx="120" cy="107" r="28" fill="#ffffff" opacity="0.8" />
        </svg>
      );
    default:
      return null;
  }
}

function TestimonialCard({
  item,
  onSelect,
  isAr,
}: {
  item: TestimonialItem;
  onSelect: (item: TestimonialItem) => void;
  isAr: boolean;
}) {
  const displayName = isAr ? item.nameAr : item.name;
  const displayRole = isAr ? item.roleAr : item.role;
  const displayQuote = isAr ? item.quoteAr : item.quote;

  return (
    <article
      tabIndex={0}
      role="button"
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item);
        }
      }}
      aria-label={
        isAr
          ? `عرض رأي ${displayName} (${item.country})`
          : `View testimonial from ${displayName}`
      }
      dir={isAr ? "rtl" : "ltr"}
      className="group/card relative flex h-[290px] w-[350px] shrink-0 cursor-pointer flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0e0f18] p-6 text-left rtl:text-right shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet/50 hover:bg-[#121322] hover:shadow-[0_0_35px_rgba(139,124,246,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet md:w-[390px] md:p-7"
    >
      <div>
        {/* Top bar with 5 stars */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1 text-violet">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={13} fill="currentColor" />
            ))}
          </div>
        </div>

        {/* Quote text */}
        <blockquote className="mt-4 line-clamp-4 font-body text-[13.5px] leading-[1.7] text-white/75 md:text-[14px]">
          &quot;{displayQuote}&quot;
        </blockquote>
      </div>

      {/* Bottom author row */}
      <div className="mt-auto flex items-center gap-3 border-t border-white/[0.06] pt-4.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet/35 bg-gradient-to-br from-violet/30 to-violet-deep/20 font-display text-xs font-bold text-violet-bright shadow-inner">
          {item.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate font-display text-[14px] font-bold text-white transition-colors group-hover/card:text-violet-bright">
              {displayName}
            </h4>
            <span title={item.country} className="inline-flex items-center">
              <CountryFlag code={item.countryCode} className="h-3 w-4.5 rounded-[2px]" />
            </span>
          </div>
          <p className="truncate font-grotesk text-[11px] text-white/45">
            {displayRole}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const { t, isAr } = useLanguage();
  const [selected, setSelected] = useState<TestimonialItem | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="reference-section relative scroll-mt-24 overflow-hidden bg-[#0c0d15] py-24 md:py-32"
    >
      {/* Background subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(139,124,246,0.12),transparent_70%)]" />

      {/* Edge gradient masks for seamless fade out */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#0c0d15] via-[#0c0d15]/80 to-transparent sm:w-28 md:w-56" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#0c0d15] via-[#0c0d15]/80 to-transparent sm:w-28 md:w-56" />

      {/* Header section */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: EASE }}
        >
          {/* Heading */}
          <h2
            id="testimonials-heading"
            className="font-display text-[clamp(2.1rem,4.8vw,3.75rem)] font-extrabold uppercase leading-[1.08] tracking-tight text-white"
          >
            {t.testimonials.titlePrefix} <span className="text-violet">{t.testimonials.titleHighlight}</span>
          </h2>

          {/* Happy clients badge */}
          <div className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/10 bg-[#121320]/80 px-4 py-2 backdrop-blur-md">
            <div className="flex -space-x-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#121320] bg-gradient-to-tr from-violet to-violet-bright text-[10px] font-bold text-white shadow">
                MR
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#121320] bg-gradient-to-tr from-fuchsia-500 to-pink-500 text-[10px] font-bold text-white shadow">
                BH
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#121320] bg-gradient-to-tr from-cyan-500 to-blue-500 text-[10px] font-bold text-white shadow">
                HA
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#121320] bg-gradient-to-tr from-amber-500 to-orange-500 text-[10px] font-bold text-white shadow">
                FH
              </span>
            </div>
            <span className="font-display text-xs font-bold text-white">
              <span className="text-violet">( 50+ )</span> {t.testimonials.happyClients}
            </span>
            <div className="flex items-center gap-1 border-l border-white/15 pl-3 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-3">
              <div className="flex gap-0.5 text-violet">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={11} fill="currentColor" />
                ))}
              </div>
              <span className="font-grotesk text-[11px] font-semibold text-white/70">
                5.0
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Infinite scrolling Marquee Rows */}
      <div className="relative mt-12 space-y-6 md:mt-16" dir="ltr">
        {/* Row 1: Moves to the left */}
        <div className="pause-on-hover flex w-max animate-marquee-left gap-6">
          <div className="flex shrink-0 items-center gap-6">
            {TESTIMONIALS_ROW_1.map((item, idx) => (
              <TestimonialCard
                key={`r1-a-${idx}`}
                item={item}
                onSelect={setSelected}
                isAr={isAr}
              />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-6" aria-hidden="true">
            {TESTIMONIALS_ROW_1.map((item, idx) => (
              <TestimonialCard
                key={`r1-b-${idx}`}
                item={item}
                onSelect={setSelected}
                isAr={isAr}
              />
            ))}
          </div>
        </div>

        {/* Row 2: Moves to the right */}
        <div className="pause-on-hover flex w-max animate-marquee-right gap-6">
          <div className="flex shrink-0 items-center gap-6">
            {TESTIMONIALS_ROW_2.map((item, idx) => (
              <TestimonialCard
                key={`r2-a-${idx}`}
                item={item}
                onSelect={setSelected}
                isAr={isAr}
              />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-6" aria-hidden="true">
            {TESTIMONIALS_ROW_2.map((item, idx) => (
              <TestimonialCard
                key={`r2-b-${idx}`}
                item={item}
                onSelect={setSelected}
                isAr={isAr}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full Testimonial Dialog - pops up right in front of user when any card is clicked */}
      <AnimatePresence>
        {selected && (
          <Dialog
            label={isAr ? `رأي ${selected.nameAr}` : `Testimonial from ${selected.name}`}
            onClose={() => setSelected(null)}
            className="max-w-xl"
          >
            <figure className="p-7 pt-14 md:p-10 md:pt-14" dir={isAr ? "rtl" : "ltr"}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-1.5 text-violet">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>

              <Quote
                size={36}
                aria-hidden="true"
                className="mt-6 text-violet/40"
                fill="currentColor"
              />

              <blockquote className="mt-4 font-display text-xl font-semibold leading-relaxed text-white/95 md:text-2xl">
                &quot;{isAr ? selected.quoteAr : selected.quote}&quot;
              </blockquote>

              <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-violet/40 bg-gradient-to-br from-violet/30 to-violet-deep/20 font-display text-sm font-bold text-violet-bright shadow-inner">
                    {selected.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="block font-display text-base font-bold text-white">
                        {isAr ? selected.nameAr : selected.name}
                      </span>
                      <CountryFlag
                        code={selected.countryCode}
                        className="h-3.5 w-5 rounded-[2px]"
                      />
                    </div>
                    <span className="mt-0.5 block font-grotesk text-xs text-white/50">
                      {isAr ? selected.roleAr : selected.role}
                    </span>
                  </div>
                </div>
              </figcaption>
            </figure>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
