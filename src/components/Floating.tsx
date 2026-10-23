import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { PROFILE } from "../data";
import { WhatsAppIcon } from "./SocialIcons";
import { useLanguage } from "../context/LanguageContext";

export default function Floating() {
  const { t } = useLanguage();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    // Notify other components to freeze layout mutations while scrolling to top
    window.dispatchEvent(new CustomEvent("scrolling-to-top"));

    // Clear any hash in URL
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }

    // Scroll to the absolute top of the page
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const topEl = document.getElementById("page-top") || document.getElementById("top");
    if (topEl) {
      topEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Fallback watcher: guarantees it never stops prematurely at Services or anywhere else
    const timer = setInterval(() => {
      if (window.scrollY > 15) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        clearInterval(timer);
        window.scrollTo(0, 0);
      }
    }, 120);

    setTimeout(() => {
      clearInterval(timer);
      window.scrollTo(0, 0);
    }, 1100);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[85] flex flex-col items-center gap-3 md:bottom-7 md:right-7">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            onClick={scrollToTop}
            aria-label={t.floating.backToTop}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-violet text-white shadow-[0_8px_25px_rgba(139,124,246,0.55)] transition-all duration-300 hover:scale-105 hover:bg-violet-bright hover:shadow-[0_0_30px_rgba(139,124,246,0.7)]"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.2, type: "spring", stiffness: 200, damping: 15 }}
        href={PROFILE.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label={t.floating.chatWithMe}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform duration-300 hover:scale-110"
      >
        <WhatsAppIcon size={27} />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 font-grotesk text-xs font-semibold text-black opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 md:block">
          {t.floating.chatWithMe}
        </span>
      </motion.a>
    </div>
  );
}
