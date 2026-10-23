import { motion, useReducedMotion } from "framer-motion";
import { TECH_STACK } from "../techStack";
import { FourPointStar } from "./Marquee";
import { useLanguage } from "../context/LanguageContext";

export default function Skills() {
  const { isAr } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <section id="stack" aria-labelledby="stack-heading" className="reference-section relative scroll-mt-24 bg-[#1b1e26] py-24 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="flex items-center gap-3"
        >
          <FourPointStar className="h-5 w-5 text-white/80" />
          <h2 id="stack-heading" className="font-display text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
            {isAr ? (
              <>
                حزمتي <span className="text-violet">البرمجية</span>
              </>
            ) : (
              <>
                My <span className="text-violet">Stack</span>
              </>
            )}
          </h2>
        </motion.div>

        <div className="mt-14 md:mt-20">
          {TECH_STACK.map((group) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reducedMotion ? 0 : 0.6 }}
              className="grid gap-6 border-b border-white/[0.045] py-8 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[0.43fr_1fr] md:gap-12 md:py-10"
            >
              <h3 className="font-display text-base font-bold uppercase text-white/70 md:pt-1 md:text-lg">{group.category}</h3>
              <ul className="flex flex-wrap items-center gap-x-7 gap-y-6 md:gap-x-8">
                {group.technologies.map((technology, index) => (
                  <motion.li
                    key={technology.name}
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.035 }}
                    className="group flex items-center gap-2.5"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:-translate-y-1" fill={technology.color ?? `#${technology.icon.hex}`}>
                      <path d={technology.icon.path} />
                    </svg>
                    <span className="font-display text-[14px] font-semibold text-white/80 transition-colors group-hover:text-white md:text-[15px]">{technology.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
