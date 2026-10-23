import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Asterisk } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  const { t, isAr } = useLanguage();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative scroll-mt-20 overflow-hidden bg-ink py-24 md:py-32">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-violet/10 blur-[120px]" />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-2"
        >
          <Asterisk className="h-6 w-6 animate-spin-slow text-violet" />
          <h3 className="font-grotesk text-sm font-bold uppercase tracking-[0.2em]">
            {isAr ? (
              <>
                المسيرة المهنية &amp; <span className="text-violet">الخبرات</span>
              </>
            ) : (
              <>
                Career &amp; <span className="text-violet">Experience</span>
              </>
            )}
          </h3>
        </motion.div>

        <div ref={listRef} className="relative mt-14 md:mt-20">
          {/* progress line */}
          <div className="absolute bottom-0 left-[6px] top-0 w-px bg-white/10 md:left-1/2">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-violet-bright via-violet to-violet-deep shadow-[0_0_12px_rgba(139,124,246,0.8)]"
            />
            <motion.span
              style={{ top: dotTop }}
              className="absolute -left-[5px] hidden h-[11px] w-[11px] -translate-y-1/2 rounded-full bg-violet-bright shadow-[0_0_16px_4px_rgba(167,139,250,0.7)] md:block"
            />
          </div>

          {t.experience.jobs.map((job, i) => (
            <motion.article
              key={`${job.role}-${i}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
              className="relative grid gap-3 border-b border-white/5 py-10 pl-8 rtl:pl-0 rtl:pr-8 last:border-b-0 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-10 md:py-14 md:pl-0 rtl:md:pr-0"
            >
              <span className="absolute left-0 rtl:left-auto rtl:right-0 top-12 h-[13px] w-[13px] rounded-full border-2 border-violet bg-ink md:left-1/2 rtl:md:left-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2" />

              <div className={`${i % 2 === 1 ? "md:col-start-1" : ""}`}>
                <h4 className="max-w-xs font-display text-2xl font-extrabold leading-tight text-white md:text-[28px]">
                  {job.role}
                </h4>
                <p className="mt-1.5 font-grotesk text-sm text-white/45">{job.company}</p>
              </div>

              <p className="font-display text-xl font-extrabold leading-tight text-white/90 md:w-52 md:pt-1 md:text-2xl">
                {job.period}
              </p>

              <p className="max-w-md text-[15px] leading-relaxed text-white/55 md:justify-self-end">
                {job.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
