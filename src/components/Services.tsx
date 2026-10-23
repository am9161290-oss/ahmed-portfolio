import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Circle, Shapes, Sparkle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;
const SHAPES = [Sparkle, Shapes, Circle];

export default function Services() {
  const { t, isAr } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState(0);
  const isScrollingToTop = useRef(false);

  // Freeze during scroll-to-top to avoid layout shifts or interruptions
  useEffect(() => {
    const onScrollToTop = () => {
      isScrollingToTop.current = true;
      setActiveService(0);
      setTimeout(() => {
        isScrollingToTop.current = false;
      }, 1400);
    };

    window.addEventListener("scrolling-to-top", onScrollToTop);
    return () => window.removeEventListener("scrolling-to-top", onScrollToTop);
  }, []);

  // Scroll-progress driven activation: as you scroll down, each service item opens sequentially like the video
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 35%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (isScrollingToTop.current) return;

    if (progress < 0.34) {
      setActiveService(0);
    } else if (progress < 0.67) {
      setActiveService(1);
    } else {
      setActiveService(2);
    }
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative scroll-mt-20 overflow-hidden bg-panel-2 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-violet/10 blur-[110px]" />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* heading */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "60%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display font-black uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 9.5vw, 7.5rem)" }}
          >
            {t.services.title} <span className="text-violet">{t.services.titleHighlight}</span> <span className="text-white/90">/</span>
          </motion.h2>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-[1fr_auto_1.2fr] md:items-start">
          <span className="hidden md:block" />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-grotesk text-xs uppercase tracking-[0.35em] text-white/45"
          >
            {t.services.servicesLabel}
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
            className="max-w-xl font-display text-xl font-semibold leading-snug text-white/85 md:justify-self-end md:text-[26px]"
          >
            {t.services.intro}
          </motion.p>
        </div>

        {/* accordion matching the reference video */}
        <div className="mt-16 md:mt-24">
          {t.services.items.map((service, i) => {
            const Shape = SHAPES[i] || Sparkle;
            const isOpen = activeService === i;

            return (
              <div
                key={service.id}
                className={`border-t transition-colors duration-500 last:border-b ${
                  isOpen ? "border-violet/40 bg-white/[0.015]" : "border-white/10"
                }`}
              >
                <div
                  onClick={() => setActiveService(i)}
                  className="grid cursor-pointer grid-cols-[auto_1fr_auto] items-start gap-4 py-7 text-left rtl:text-right md:gap-10 md:py-9"
                >
                  {/* Number ( 01 ) */}
                  <span
                    className={`font-grotesk text-2xl font-medium transition-colors duration-300 md:text-4xl ${
                      isOpen ? "text-violet-bright" : "text-white/80"
                    }`}
                  >
                    ( {service.id} )
                  </span>

                  {/* Title + Description + Nested items */}
                  <div>
                    <h3
                      className={`font-display text-[26px] font-extrabold leading-none tracking-tight transition-all duration-300 md:text-5xl ${
                        isOpen ? "text-white" : "text-white/90"
                      }`}
                    >
                      {service.title}
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={`content-${service.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 max-w-xl pb-4 md:mt-8">
                            <p className="text-[15px] leading-relaxed text-white/60 md:text-base">
                              {service.description}
                            </p>

                            <ul className="mt-7 space-y-1">
                              {service.deliverables.map((item, j) => (
                                <motion.li
                                  key={item}
                                  initial={{ opacity: 0, x: isAr ? 16 : -16 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.08 + j * 0.06, duration: 0.35, ease: EASE }}
                                  className="flex items-center gap-4 border-b border-white/10 py-3.5 last:border-none"
                                >
                                  <span className="font-grotesk text-xs font-semibold text-violet">
                                    0{j + 1}
                                  </span>
                                  <span className="font-display text-lg font-bold text-white md:text-xl">
                                    {item}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Icon */}
                  <Shape
                    className={`mt-1 h-6 w-6 transition-all duration-500 md:h-8 md:w-8 ${
                      isOpen ? "rotate-90 text-violet" : "text-white/35"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
