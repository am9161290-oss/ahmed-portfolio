import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROFILE } from "../data";
import Dialog from "./Dialog";
import { useLanguage } from "../context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const { t, isAr } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [showPhoto, setShowPhoto] = useState(false);

  return (
    <section id="about" aria-labelledby="about-heading" className="reference-section relative scroll-mt-24 bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20">
        <motion.figure
          initial={{ opacity: 0, y: reducedMotion ? 0 : 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: reducedMotion ? 0 : 0.85, ease: EASE }}
          className="mx-auto w-full max-w-[430px] lg:mx-0"
        >
          <div
            onClick={() => setShowPhoto(true)}
            className="group/portrait relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg bg-[#11121c] shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,124,246,0.25)]"
          >
            <img
              src={PROFILE.portrait}
              alt={`Portrait of ${PROFILE.fullName}`}
              loading="lazy"
              className="h-full w-full object-cover object-[50%_18%] filter grayscale brightness-[0.68] contrast-[1.1] transition-[filter,transform] duration-700 ease-out group-hover/portrait:scale-[1.03] group-hover/portrait:grayscale-0 group-hover/portrait:brightness-100 group-hover/portrait:contrast-100"
            />
            <div className="pointer-events-none absolute inset-0 bg-ink/25 transition-opacity duration-700 group-hover/portrait:opacity-0" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover/portrait:opacity-20" />

          </div>

          <figcaption className="mt-4">
            <span className="font-script text-3xl text-white/85">
              {isAr ? "أحمد البشبيشي" : "Ahmed Albashbishi"}
            </span>
          </figcaption>
        </motion.figure>

        <div className="lg:pt-5 text-left rtl:text-right">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-grotesk text-[11px] uppercase tracking-[0.3em] text-white/40">
            {t.about.tag}
          </motion.p>
          <div className="mt-6 overflow-hidden">
            <motion.h2
              id="about-heading"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reducedMotion ? 0 : 0.9, delay: 0.1, ease: EASE }}
              className="font-display text-[clamp(2rem,4.1vw,4rem)] font-black uppercase leading-[1.04] tracking-tight"
            >
              {isAr ? (
                <>
                  مبرمج،<br />مطور واجهات،<br />
                  <span className="text-violet">ومحرك ويب</span><span className="mr-2 text-white/85">/</span>
                </>
              ) : (
                <>
                  Programmer,<br />Developer,<br />
                  <span className="text-violet">Web-Animator</span><span className="ml-2 text-white/85">/</span>
                </>
              )}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.75, delay: 0.2, ease: EASE }}
            className="mt-6 max-w-xl font-display text-xl font-semibold leading-[1.5] text-white/85 md:text-[23px]"
          >
            {t.about.lead}
          </motion.p>
          <div className="mt-9 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-[90px_1fr] sm:gap-7">
            <span className="font-grotesk text-[10px] uppercase tracking-[0.25em] text-white/35">{t.about.focusTag}</span>
            <div className="max-w-md space-y-5 text-[14px] leading-[1.85] text-white/50">
              <p>{t.about.focusP1}</p>
              <p>{t.about.focusP2}</p>
              <a href="#contact" className="group inline-flex items-center gap-2 border-b border-violet/50 pb-2 font-display text-sm font-bold text-white transition-colors hover:text-violet-bright">
                {t.about.cta} <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPhoto && (
          <Dialog label={`Photo of ${PROFILE.fullName}`} onClose={() => setShowPhoto(false)} className="max-w-2xl">
            <img src={PROFILE.portrait} alt={PROFILE.fullName} className="max-h-[80dvh] w-full object-contain" />
            <p className="px-6 py-4 font-display text-sm font-semibold text-white/70">{PROFILE.fullName}</p>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}