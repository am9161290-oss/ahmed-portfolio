import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const { t, isAr } = useLanguage();

  useEffect(() => {
    let value = 0;
    const timer = setInterval(() => {
      value += Math.floor(Math.random() * 8) + 3;
      if (value >= 100) {
        value = 100;
        clearInterval(timer);
      }
      setCount(value);
    }, 90);
    return () => clearInterval(timer);
  }, []);

  const name = t.preloader.name;

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-olive"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="overflow-hidden px-4">
        <h1 className="flex flex-wrap justify-center gap-x-3 font-display text-[8.5vw] font-black tracking-tight text-white sm:text-6xl md:text-7xl">
          {isAr
            ? name.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", rotate: 6 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: 0.15 + i * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))
            : name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", rotate: 6 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: 0.15 + i * 0.045, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
        </h1>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-4 font-grotesk text-[11px] uppercase tracking-[0.5em] text-white/70"
      >
        {t.preloader.subtitle}
      </motion.p>

      <div className="absolute bottom-10 left-6 right-6 flex items-end justify-between md:left-12 md:right-12">
        <span className="font-grotesk text-xs uppercase tracking-[0.3em] text-white/60">
          {t.preloader.loading}
        </span>
        <span className="font-display text-5xl font-black text-white/90 md:text-6xl">
          {count}
          <span className="text-white/50">%</span>
        </span>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-violet"
        style={{ width: `${count}%` }}
      />
    </motion.div>
  );
}
