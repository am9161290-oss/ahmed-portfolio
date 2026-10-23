import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "./SocialIcons";
import { STATS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import Magnetic from "./Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;
const FULL_NAME = "Ahmed Albashbishi";

/* ── Handwritten cursive signature that writes itself character by character ── */
function HandwrittenSignature({ active }: { active: boolean }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);

  const startWriting = () => {
    setDisplayedText("");
    setIsDone(false);
    setShowUnderline(false);

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(FULL_NAME.slice(0, index));
      if (index >= FULL_NAME.length) {
        clearInterval(interval);
        setIsDone(true);
        setTimeout(() => setShowUnderline(true), 140);
      }
    }, 70);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (!active) {
      setDisplayedText("");
      setIsDone(false);
      setShowUnderline(false);
      return;
    }

    // Delay start until hero entrance finishes opening up
    const timer = setTimeout(() => {
      startWriting();
    }, 500);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div
      onClick={startWriting}
      title="Click to replay signature"
      className="group relative inline-block cursor-pointer select-none -rotate-6"
    >
      {/* Invisible placeholder for exact layout dimensions */}
      <span className="invisible pointer-events-none font-script text-5xl whitespace-nowrap sm:text-6xl lg:text-7xl">
        {FULL_NAME}
      </span>

      {/* Visible handwritten text */}
      <div className="absolute inset-0 flex items-center">
        <span className="font-script text-5xl whitespace-nowrap text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] sm:text-6xl lg:text-7xl">
          {displayedText}
          {!isDone && displayedText.length > 0 && (
            <span className="ml-1 inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-white align-baseline shadow-[0_0_12px_#ffffff]" />
          )}
        </span>
      </div>

      {/* Underline swoosh stroke drawn dynamically when writing finishes */}
      <svg
        viewBox="0 0 340 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute -bottom-3 left-0 w-[105%] overflow-visible"
      >
        <motion.path
          d="M 6 20 C 65 10, 150 10, 245 14 C 285 16, 315 18, 335 12"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={showUnderline ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const duration = 1600;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (ref.current) ref.current.textContent = `${Math.round(eased * value)}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Hero({ active }: { active: boolean }) {
  const { t, isAr } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const titleX = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const stars = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        left: `${(i * 37.7 + 11) % 100}%`,
        top: `${(i * 23.3 + 7) % 100}%`,
        size: (i % 3) + 1,
        delay: (i % 7) * 0.5,
      })),
    []
  );

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: active ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.9, ease: EASE },
  });

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pt-24 md:pt-28">
      {/* ambience */}
      <div className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-violet/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 top-64 h-[380px] w-[380px] rounded-full bg-fuchsia-500/10 blur-[130px]" />
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rounded-full bg-white"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={{ opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: s.delay }}
        />
      ))}

      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        {/* stage */}
        <div className="relative mx-auto h-[480px] max-w-6xl sm:h-[540px] lg:h-[600px]">
          {/* center image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={active ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15, duration: 1.1, ease: EASE }}
            className="absolute left-1/2 top-1/2 h-[86%] w-[88%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg sm:w-[74%] lg:w-[68%]"
          >
            <motion.img
              src="/images/hero-room.jpg"
              alt="Ahmed Albashbishi developer workspace"
              style={{ y: imgY, scale: 1.18 }}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
            <div className="absolute inset-0 bg-violet/10 mix-blend-overlay" />
          </motion.div>

          {/* handwritten cursive signature — types itself on page load */}
          <motion.div
            {...anim(0.7)}
            className="absolute left-0 top-[30%] z-20 sm:left-[2%] lg:left-[3%] lg:top-[34%]"
          >
            <HandwrittenSignature active={active} />
          </motion.div>

          {/* socials — 3 icons (GitHub, LinkedIn, Facebook) like reference with magnetic tracking */}
          <motion.div
            {...anim(1)}
            className="absolute bottom-[15%] left-[2%] z-20 flex items-center gap-1 rounded-full border border-white/15 bg-white/10 p-1.5 backdrop-blur-md lg:left-[5%]"
          >
            {[
              { Icon: GithubIcon, label: "GitHub" },
              { Icon: LinkedinIcon, label: "LinkedIn" },
              { Icon: FacebookIcon, label: "Facebook" },
            ].map(({ Icon, label }) => (
              <Magnetic key={label} strength={0.45}>
                <a
                  href="#contact"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-all duration-300 hover:bg-violet hover:text-white"
                >
                  <Icon size={17} />
                </a>
              </Magnetic>
            ))}
          </motion.div>

          {/* big name — clean, thin, elegant light font matching reference image */}
          <motion.div
            style={{ x: titleX }}
            className="pointer-events-none absolute right-0 top-[8%] z-10 select-none text-right lg:top-[10%]"
          >
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "105%" }}
                animate={active ? { y: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
                className="font-body font-light uppercase leading-[0.92] tracking-wider text-white"
                style={{ fontSize: "clamp(2.6rem, 8vw, 6.6rem)" }}
              >
                {isAr ? "أحمد" : "Ahmed"}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "105%" }}
                animate={active ? { y: 0 } : {}}
                transition={{ delay: 0.48, duration: 0.9, ease: EASE }}
                className="font-body font-light uppercase leading-[0.95] tracking-wider text-white"
                style={{ fontSize: "clamp(1.8rem, 5.2vw, 4.3rem)" }}
              >
                {isAr ? "البشبيشي" : "Albashbishi"}
              </motion.h1>
            </div>
          </motion.div>

          {/* role + CV button — positioned on right below name */}
          <motion.div {...anim(0.95)} className="absolute bottom-[13%] right-[2%] z-20 text-right sm:right-[3%] lg:right-[4%]">
            <p className="font-display text-base font-bold leading-snug text-white sm:text-lg lg:text-xl">
              {t.hero.role}
              <span className="block font-body text-sm font-medium text-white/70 sm:text-base">
                {t.hero.location}
              </span>
            </p>
            <div className="mt-4 inline-block">
              <Magnetic strength={0.35}>
                <a
                  href="/cv.html"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center rounded-full border-2 border-violet/90 bg-violet/10 px-6 py-2.5 font-grotesk text-[11px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-violet hover:shadow-[0_0_30px_rgba(139,124,246,0.6)]"
                >
                  {t.hero.downloadCv}
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* scroll hint with magnetic pull */}
        <div className="mx-auto -mt-2 flex w-fit flex-col items-center pb-8">
          <Magnetic strength={0.25}>
            <motion.a
              href="#services"
              {...anim(1.2)}
              className="group flex flex-col items-center gap-1"
            >
              <span className="font-grotesk text-[11px] font-medium uppercase tracking-[0.45em] text-white/60 transition-colors group-hover:text-white">
                {t.hero.scrollHint}
              </span>
              <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/25 p-1.5">
                <span className="h-2 w-1 animate-scroll-dot rounded-full bg-violet-bright" />
              </span>
              <ChevronDown size={14} className="animate-bounce text-white/50" />
            </motion.a>
          </Magnetic>
        </div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="grid grid-cols-2 gap-6 border-t border-white/8 py-10 md:grid-cols-4"
        >
          {STATS.map((stat, i) => {
            const statLabels = [
              t.hero.stats.projects,
              t.hero.stats.clients,
              t.hero.stats.experience,
              t.hero.stats.satisfaction,
            ];
            return (
              <div key={stat.label} className="text-center md:text-left">
                <p className="font-display text-4xl font-black text-white md:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 font-grotesk text-[11px] uppercase tracking-[0.25em] text-white/50">
                  {statLabels[i] || stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
