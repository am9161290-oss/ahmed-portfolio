import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isAr, toggleLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() =>
      menuRef.current?.querySelector<HTMLElement>("button")?.focus()
    );
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key !== "Tab") return;
      const elements = menuRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (!elements?.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [open]);

  const getNavLabel = (href: string) => {
    switch (href) {
      case "#services":
        return t.nav.services;
      case "#experience":
        return t.nav.experience;
      case "#projects":
        return t.nav.projects;
      case "#testimonials":
        return t.nav.testimonials;
      case "#contact":
        return t.nav.contact;
      default:
        return "";
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
          scrolled ? "bg-ink/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 md:px-10 md:py-5">
          <Magnetic strength={0.3}>
            <a
              href="#top"
              className="font-display text-base font-black uppercase leading-none tracking-tight transition-colors hover:text-violet-bright md:text-lg"
            >
              {isAr ? "أحمد البشبيشي" : (
                <>
                  Ahmed
                  <br className="sm:hidden" /> Albashbishi
                </>
              )}
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <div className="hidden cursor-default items-center gap-2.5 lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <p className="whitespace-pre-line font-grotesk text-[11px] font-semibold uppercase leading-tight tracking-[0.18em] text-white/85">
                {t.nav.available}
              </p>
            </div>
          </Magnetic>

          <nav aria-label="Main navigation" className="hidden items-center gap-4 lg:flex">
            {NAV_LINKS.map((link, idx) => {
              const label = getNavLabel(link.href);
              const isLast = idx === NAV_LINKS.length - 1;
              const suffix = isLast ? "" : (isAr ? "،" : ",");
              return (
                <Magnetic key={link.href} strength={0.35}>
                  <div className="h-[1.25em] overflow-hidden select-none leading-[1.25em]">
                    <a
                      href={link.href}
                      className="group block cursor-pointer font-display text-[15px] font-bold text-white/90 transition-colors leading-[1.25em]"
                    >
                      <p className="transition-transform duration-300 ease-in-out will-change-transform group-hover:-translate-y-full">
                        {label}{suffix}
                      </p>
                      <p
                        aria-hidden="true"
                        className="transition-transform duration-300 ease-in-out will-change-transform text-violet-bright font-bold group-hover:-translate-y-full"
                      >
                        {label}{suffix}
                      </p>
                    </a>
                  </div>
                </Magnetic>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher Button (Arabic / English) */}
            <Magnetic strength={0.35}>
              <button
                type="button"
                onClick={toggleLang}
                aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
                className="group flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 text-xs font-grotesk font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-violet/60 hover:bg-violet/20 hover:shadow-[0_0_25px_rgba(139,124,246,0.35)] md:h-13 md:px-4"
              >
                <Globe
                  size={15}
                  className="text-violet transition-transform duration-300 group-hover:rotate-45"
                />
                <span className="flex items-center gap-1 font-display text-[12px] md:text-[13px]">
                  <span
                    className={!isAr ? "font-black text-violet-bright" : "text-white/45"}
                  >
                    EN
                  </span>
                  <span className="text-white/25">/</span>
                  <span
                    className={isAr ? "font-black text-violet-bright" : "text-white/45"}
                  >
                    عربي
                  </span>
                </span>
              </button>
            </Magnetic>

            {/* Menu Button with Magnetic pull */}
            <Magnetic strength={0.45}>
              <button
                onClick={() => setOpen(true)}
                aria-label={t.nav.openMenu}
                aria-expanded={open}
                aria-haspopup="dialog"
                aria-controls="portfolio-menu"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dcdcdc] text-black shadow-lg transition-transform duration-300 hover:scale-105 md:h-14 md:w-14"
              >
                <Menu size={20} strokeWidth={2.2} />
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="portfolio-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio navigation"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[110] flex flex-col justify-between bg-[#07070e]"
          >
            <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-violet/20 blur-[140px]" />
            <div className="pointer-events-none absolute -left-32 bottom-1/4 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[140px]" />

            {/* Top bar with close button & language toggle */}
            <div className="flex shrink-0 items-center justify-between px-6 py-6 md:px-12 md:py-8">
              <Magnetic strength={0.25}>
                <span className="font-display text-base font-black uppercase tracking-tight md:text-lg">
                  {isAr ? "أحمد البشبيشي" : "Ahmed Albashbishi"}
                </span>
              </Magnetic>

              <div className="flex items-center gap-3">
                <Magnetic strength={0.35}>
                  <button
                    type="button"
                    onClick={toggleLang}
                    className="flex h-11 items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 text-xs font-grotesk font-bold uppercase tracking-wider text-white transition-all hover:border-violet/60 hover:bg-violet/20 md:h-13 md:px-4"
                  >
                    <Globe size={14} className="text-violet" />
                    <span>{!isAr ? "عربي" : "English"}</span>
                  </button>
                </Magnetic>

                <Magnetic strength={0.45}>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label={t.nav.closeMenu}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dcdcdc] text-black transition-transform duration-300 hover:rotate-90 md:h-14 md:w-14"
                  >
                    <X size={20} strokeWidth={2.2} />
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* Centered navigation items matching reference image */}
            <nav
              aria-label="All portfolio sections"
              className="my-auto flex flex-col items-center justify-center gap-6 px-6 py-8 text-center sm:gap-7 md:gap-9"
            >
              {NAV_LINKS.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "115%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.15 + i * 0.07,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Magnetic strength={0.3}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block font-display text-[clamp(2.1rem,5.8vh,4.25rem)] font-black uppercase tracking-tight text-white transition-all duration-300 hover:scale-[1.04] hover:text-violet-bright"
                      >
                        {getNavLabel(link.href)}
                      </a>
                    </Magnetic>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Bottom spacer to keep items in dead center */}
            <div className="h-16 shrink-0 md:h-20" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
