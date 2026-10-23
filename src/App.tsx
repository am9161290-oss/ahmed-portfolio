import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Marquee from "./components/Marquee";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import ProjectArchive from "./components/ProjectArchive";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Floating from "./components/Floating";
import { useLanguage } from "./context/LanguageContext";

export default function App() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <div id="page-top" className="noise relative min-h-screen bg-ink font-body text-white antialiased">
        <AnimatePresence>{loading && <Preloader />}</AnimatePresence>

        <Cursor />
        <Navbar />

        <main>
          <Hero active={!loading} />
          <Services />
          <Marquee items={t.marquee} outline />
          <Experience />
          <Projects />
          <About />
          <Skills />
          <ProjectArchive />
          <Testimonials />
          <Contact />
        </main>

        <Floating />
      </div>
    </MotionConfig>
  );
}
