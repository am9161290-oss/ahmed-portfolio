import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { PROJECTS } from "../data";
import Dialog from "./Dialog";
import { useLanguage } from "../context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;
type Project = (typeof PROJECTS)[number];

export default function Projects() {
  const { isAr } = useLanguage();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="relative scroll-mt-20 overflow-clip bg-panel py-24 md:py-32">
      <div className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-violet/10 blur-[130px]" />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "60%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-display font-black uppercase leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 8vw, 6.5rem)" }}
            >
              {isAr ? (
                <>
                  أبرز <span className="text-violet">الأعمال</span> <span>/</span>
                </>
              ) : (
                <>
                  Selected <span className="text-violet">Works</span> <span>/</span>
                </>
              )}
            </motion.h2>
          </div>
          <span className="font-grotesk text-xs uppercase tracking-[0.35em] text-white/45">
            {isAr ? "( المشاريع المختارة )" : "( Projects )"}
          </span>
        </div>
        <p className="mt-6 text-xs text-white/35">
          {isAr
            ? "نماذج توضيحية للمشاريع المنفذة مع أفضل الممارسات البرمجية."
            : "Illustrative project showcases. Replace these examples with your own work and live links."}
        </p>

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          {/* sticky giant number */}
          <div className="relative hidden lg:block">
            <div className="sticky top-36">
              <div className="relative h-[300px]">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={active}
                    initial={{ y: 90, opacity: 0, rotate: 4 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -90, opacity: 0, rotate: -4 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="block font-display font-black leading-none text-white"
                    style={{ fontSize: "clamp(10rem, 20vw, 19rem)" }}
                  >
                    {PROJECTS[active].id}
                    <span className="text-violet">.</span>
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-4 max-w-[240px] font-grotesk text-xs uppercase leading-relaxed tracking-[0.3em] text-white/40">
                {isAr ? "مرر للاستكشاف" : "Scroll to explore"} — {PROJECTS[active].year} / {PROJECTS[active].tags.slice(0, 2).join(" · ")}
              </p>
              <div className="mt-8 flex gap-2">
                {PROJECTS.map((p, i) => (
                  <span
                    key={p.id}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === active ? "w-12 bg-violet" : "w-5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* cards */}
          <div className="flex flex-col gap-24 md:gap-36">
            {PROJECTS.map((project, i) => (
              <motion.article
                key={project.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-index={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, ease: EASE }}
              >
                <button
                  onClick={() => setSelected(project)}
                  className="group relative block w-full overflow-hidden rounded-md text-left rtl:text-right"
                  aria-label={isAr ? `عرض ${project.titleAr}` : `View ${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={isAr ? project.titleAr : project.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
                  <span className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 font-display text-5xl font-black text-white/25 lg:hidden">
                    {project.id}.
                  </span>
                  <span className="absolute right-4 rtl:right-auto rtl:left-4 top-4 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-violet text-white opacity-0 shadow-[0_0_25px_rgba(139,124,246,0.6)] transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={20} className="rtl:-scale-x-100" />
                  </span>
                </button>

                <p className="mt-5 font-grotesk text-[13px] leading-relaxed text-white/45">{project.stack}</p>
                <button onClick={() => setSelected(project)} className="mt-2 text-left rtl:text-right">
                  <h3 className="font-display text-[26px] font-extrabold uppercase leading-[1.12] tracking-tight text-white transition-colors duration-300 hover:text-violet-bright md:text-4xl">
                    {isAr ? project.titleAr : project.title}
                  </h3>
                </button>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 px-4 py-1.5 font-grotesk text-xs font-medium text-white/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
        <a href="#project-list" className="group mt-14 inline-flex items-center gap-3 border-b border-violet/50 pb-2 font-display text-sm font-bold text-violet-bright transition-colors hover:text-white">
          {isAr ? "استكشف أرشيف كل المشاريع" : "Explore the projects list"} <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100" />
        </a>
      </div>

      {/* project detail modal */}
      <AnimatePresence>
        {selected && (
          <Dialog
            label={isAr ? `تفاصيل مشروع ${selected.titleAr}` : `${selected.title} showcase details`}
            onClose={() => setSelected(null)}
          >
              <img
                src={selected.image}
                alt={isAr ? selected.titleAr : selected.title}
                className="aspect-[16/8] w-full object-cover"
              />
              <div className="p-6 text-left rtl:text-right md:p-9" dir={isAr ? "rtl" : "ltr"}>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-violet/15 px-3.5 py-1 font-grotesk text-xs font-semibold text-violet-bright">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 font-display text-2xl font-extrabold uppercase leading-tight md:text-[34px]">
                  {isAr ? selected.titleAr : selected.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                  {isAr ? selected.descriptionAr : selected.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {(isAr ? selected.featuresAr : selected.features).map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet/20">
                        <Check size={12} className="text-violet-bright" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/10 pt-4 font-grotesk text-xs leading-relaxed text-white/40">
                  {selected.stack}
                </p>
              </div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
