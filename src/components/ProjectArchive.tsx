import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { PROJECT_ARCHIVE } from "../projectArchive";
import type { ArchiveProject } from "../projectArchive";
import { FourPointStar } from "./Marquee";
import ProjectPreview from "./ProjectPreview";
import Dialog from "./Dialog";
import { useLanguage } from "../context/LanguageContext";

export default function ProjectArchive() {
  const { t } = useLanguage();
  const [active, setActive] = useState(1);
  const [selected, setSelected] = useState<ArchiveProject | null>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const preview = PROJECT_ARCHIVE[active];

  return (
    <section id="project-list" aria-labelledby="archive-heading" className="reference-section relative scroll-mt-24 bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <motion.div initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.6 }} className="flex items-center gap-3">
          <FourPointStar className="h-5 w-5 text-white/80" />
          <h2 id="archive-heading" className="font-display text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
            <span className="text-violet">{t.archive.titleHighlight}</span> {t.archive.titleRest}
          </h2>
        </motion.div>
        <p id="archive-note" className="mt-4 max-w-lg text-xs leading-relaxed text-white/40">
          {t.archive.note}
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.3fr)] lg:gap-14">
          <ol aria-describedby="archive-note">
            {PROJECT_ARCHIVE.map((project, index) => (
              <motion.li key={project.id} initial={{ opacity: 0, y: reducedMotion ? 0 : 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: reducedMotion ? 0 : 0.45 }} className="border-b border-white/[0.065] last:border-b-0">
                <button
                  ref={(element) => { rowRefs.current[index] = element; }}
                  type="button"
                  aria-label={`Preview ${project.title}`}
                  aria-haspopup="dialog"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => { setActive(index); setSelected(project); }}
                  onKeyDown={(event) => {
                    let next: number | undefined;
                    if (event.key === "ArrowDown") next = (index + 1) % PROJECT_ARCHIVE.length;
                    if (event.key === "ArrowUp") next = (index - 1 + PROJECT_ARCHIVE.length) % PROJECT_ARCHIVE.length;
                    if (event.key === "Home") next = 0;
                    if (event.key === "End") next = PROJECT_ARCHIVE.length - 1;
                    if (next !== undefined) { event.preventDefault(); rowRefs.current[next]?.focus(); }
                  }}
                  className="group grid w-full grid-cols-[2rem_1fr_1.2rem] items-baseline gap-3 py-7 text-left rtl:text-right sm:grid-cols-[2.7rem_1fr_1.5rem] sm:gap-5 md:py-9"
                >
                  <span className={`font-grotesk text-lg font-medium transition-colors sm:text-2xl ${active === index ? "text-violet-bright" : "text-white/35"}`}>{project.id}.</span>
                  <span>
                    <span className={`block font-display text-[clamp(1.25rem,2.4vw,2.1rem)] font-bold leading-[1.25] tracking-tight transition-[color,transform] duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${active === index ? "text-white" : "text-white/70"}`}>{project.title}</span>
                    <span className="mt-3 block font-grotesk text-[10px] tracking-wide text-white/35 sm:text-[11px]">{project.technologies.join(" / ")}</span>
                  </span>
                  <ArrowUpRight size={19} className={`self-center transition-[color,transform] duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100 ${active === index ? "text-violet-bright" : "text-white/25"}`} />
                </button>
              </motion.li>
            ))}
          </ol>

          <aside className="relative hidden lg:block" aria-label="Selected concept preview">
            <div className="sticky top-28 pt-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={preview.id} initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: reducedMotion ? 0 : 0.22 }}>
                  <button type="button" onClick={() => setSelected(preview)} aria-label={`Open ${preview.title} preview`} aria-haspopup="dialog" className="block w-full text-left rtl:text-right">
                    <ProjectPreview project={preview} />
                  </button>
                  <p className="mt-5 font-grotesk text-[10px] uppercase tracking-[0.2em] text-white/35">{preview.category}</p>
                  <p className="mt-2 font-display text-sm font-semibold text-white/70">{preview.brand}</p>
                </motion.div>
              </AnimatePresence>
              <p className="mt-8 font-grotesk text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/25 whitespace-pre-line">
                {t.archive.hint}
              </p>
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <Dialog label={`${selected.title} concept details`} onClose={() => setSelected(null)}>
            <ProjectPreview project={selected} wide />
            <div className="p-6 md:p-9 text-left rtl:text-right">
              <span className="font-grotesk text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-bright">
                {t.archive.conceptBadge}
              </span>
              <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">{selected.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/55">{selected.description}</p>
              <ul className="mt-6 space-y-3">
                {selected.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-white/70"><Check size={16} className="mt-0.5 shrink-0 text-violet" />{feature}</li>)}
              </ul>
              <p className="mt-7 border-t border-white/10 pt-5 font-grotesk text-xs text-white/40">
                {t.archive.techDirection} {selected.technologies.join(" / ")}
              </p>
              <a href="#contact" onClick={() => setSelected(null)} className="mt-6 inline-flex items-center gap-2 border-b border-violet/50 pb-2 font-display text-sm font-bold text-violet-bright">
                {t.archive.buildCta} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
              </a>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}