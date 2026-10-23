import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { PROFILE } from "../data";
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from "./SocialIcons";
import { useLanguage } from "../context/LanguageContext";
import { validateInput } from "../utils/sanitize";

const CONTACT_EMAIL = PROFILE.email;

// ============================================================================
// SECURITY PROTOCOL: SECRET MANAGEMENT & SENSITIVE API KEY WARNING
// ============================================================================
// Read public access key safely from Vite environment variables (VITE_*)
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

// NOTE / SECURITY WARNING:
// This Web3Forms access key is exposed in frontend network requests.
// Web3Forms keys are designed to be public client-side keys and should be locked
// to your production domain in the Web3Forms dashboard.
// WARNING: For any sensitive API keys or private credentials (e.g. Stripe, SendGrid,
// OpenAI, or private database keys), NEVER expose them in frontend requests!
// A backend/serverless proxy (e.g., Express server, Vite SSR route, or Cloudflare Worker)
// is strictly required before deploying to production.
// ============================================================================

// ============================================================================
// SECURITY PROTOCOL: CLIENT-SIDE RATE LIMITING (UX-LEVEL ONLY)
// ============================================================================
// NOTE: This cooldown and debounce is NOT real rate limiting (real rate limiting
// strictly requires backend IP/token enforcement) and is only a client-side UX
// safeguard to prevent accidental spam or rapid multi-clicks.
// ============================================================================
const COOLDOWN_DURATION = 5; // 5 seconds cooldown between submissions
const EASE = [0.22, 1, 0.36, 1] as const;

const inputCls =
  "w-full rounded-lg border border-white/12 bg-ink/60 px-4 py-3.5 text-sm text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-violet focus:shadow-[0_0_0_3px_rgba(139,124,246,0.18)]";

export default function Contact() {
  const { t, isAr } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Manage UX cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    // Check client-side UX rate limiting cooldown
    if (cooldown > 0) {
      setStatus("error");
      setErrorMessage(
        isAr
          ? `يرجى الانتظار ${cooldown} ثوانٍ قبل إرسال رسالة أخرى.`
          : `Please wait ${cooldown} seconds before sending another message.`
      );
      return;
    }

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setStatus("error");
      setErrorMessage(
        isAr
          ? "يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً."
          : "Please check your internet connection and try again."
      );
      return;
    }

    // ============================================================================
    // SECURITY PROTOCOL: INPUT VALIDATION & SANITIZATION (DOMPurify)
    // ============================================================================
    // 1. Validate & Sanitize Name
    const nameVal = validateInput(
      form.name,
      {
        required: true,
        minLength: 2,
        maxLength: 100,
        fieldName: isAr ? "الاسم" : "Name",
      },
      isAr
    );
    if (!nameVal.isValid) {
      setStatus("error");
      setErrorMessage(nameVal.error || "");
      return;
    }

    // 2. Validate & Sanitize Email
    const emailVal = validateInput(
      form.email,
      {
        required: true,
        maxLength: 100,
        isEmail: true,
        fieldName: isAr ? "البريد الإلكتروني" : "Email",
      },
      isAr
    );
    if (!emailVal.isValid) {
      setStatus("error");
      setErrorMessage(emailVal.error || "");
      return;
    }

    // 3. Validate & Sanitize Subject
    const subjectVal = validateInput(
      form.subject,
      {
        maxLength: 150,
        fieldName: isAr ? "الموضوع" : "Subject",
      },
      isAr
    );
    if (!subjectVal.isValid) {
      setStatus("error");
      setErrorMessage(subjectVal.error || "");
      return;
    }

    // 4. Validate & Sanitize Message
    const messageVal = validateInput(
      form.message,
      {
        required: true,
        minLength: 5,
        maxLength: 2000,
        fieldName: isAr ? "تفاصيل المشروع" : "Project details",
      },
      isAr
    );
    if (!messageVal.isValid) {
      setStatus("error");
      setErrorMessage(messageVal.error || "");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Safe, 100% sanitized data (all HTML tags/attributes stripped)
    const sanitizedName = nameVal.sanitizedValue;
    const sanitizedEmail = emailVal.sanitizedValue;
    const sanitizedSubject = subjectVal.sanitizedValue;
    const sanitizedMessage = messageVal.sanitizedValue;

    const payload = WEB3FORMS_ACCESS_KEY
      ? {
          access_key: WEB3FORMS_ACCESS_KEY,
          name: sanitizedName,
          email: sanitizedEmail,
          replyto: sanitizedEmail,
          subject: sanitizedSubject
            ? `📩 New Client: ${sanitizedName} - ${sanitizedSubject}`
            : `📩 New Client Message from ${sanitizedName}`,
          message: sanitizedMessage,
          from_name: sanitizedName,
        }
      : {
          name: sanitizedName,
          email: sanitizedEmail,
          _replyto: sanitizedEmail,
          _subject: sanitizedSubject
            ? `New Inquiry: ${sanitizedName} - ${sanitizedSubject}`
            : `New Client Message from ${sanitizedName}`,
          subject: sanitizedSubject || "New Client Inquiry",
          message: sanitizedMessage,
          _template: "table",
          _captcha: "false",
        };

    const endpoint = WEB3FORMS_ACCESS_KEY
      ? "https://api.web3forms.com/submit"
      : `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (data?.success === true || data?.status === 200 || !data)) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setCooldown(COOLDOWN_DURATION); // Start client-side UX rate limiting cooldown
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
        setErrorMessage(data?.message || t.contact.form.error);
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
      setErrorMessage(t.contact.form.error);
    }
  };

  const contactCards = [
    {
      Icon: Mail,
      label: t.contact.cards.email,
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
      target: undefined,
      rel: undefined,
    },
    {
      Icon: Phone,
      label: t.contact.cards.phone,
      value: PROFILE.phoneDisplay,
      href: PROFILE.whatsapp,
      target: "_blank",
      rel: "noreferrer",
    },
    {
      Icon: MapPin,
      label: t.contact.cards.location,
      value: t.contact.cards.locationVal,
      href: "#contact",
      target: undefined,
      rel: undefined,
    },
  ];

  return (
    <>
      <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-ink pt-24 md:pt-32">
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-violet/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
          <span className="font-grotesk text-xs uppercase tracking-[0.35em] text-white/45">
            {t.contact.tag}
          </span>
          <div className="mt-4 overflow-hidden">
            <motion.h2
              initial={{ y: "55%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-display font-black uppercase leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3rem, 10.5vw, 9rem)" }}
            >
              {t.contact.titlePart1}
              <span className="text-outline block">{t.contact.titlePart2}</span>
            </motion.h2>
          </div>

          <div className="mt-14 grid gap-12 pb-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            {/* info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-left rtl:text-right"
            >
              <p className="max-w-md text-base leading-relaxed text-white/60">
                {t.contact.intro}
              </p>
              <div className="mt-8 space-y-3">
                {contactCards.map(({ Icon, label, value, href, target, rel }) => (
                  <a
                    key={label}
                    href={href}
                    target={target}
                    rel={rel}
                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-panel px-5 py-4 transition-all duration-300 hover:border-violet/50 hover:bg-violet/5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet/15 text-violet-bright transition-all duration-300 group-hover:bg-violet group-hover:text-white">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-grotesk text-[10px] uppercase tracking-[0.3em] text-white/40">
                        {label}
                      </span>
                      <span className="block truncate font-display text-[15px] font-bold text-white">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight size={18} className="ml-auto rtl:ml-0 rtl:mr-auto shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100 group-hover:text-violet-bright" />
                  </a>
                ))}
              </div>

              <a
                href={PROFILE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex items-center justify-center gap-2.5 rounded-xl bg-whatsapp px-5 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_10px_35px_rgba(37,211,102,0.35)]"
              >
                <WhatsAppIcon size={20} /> {t.contact.whatsappCta}
              </a>

              <div className="mt-8 flex items-center gap-2">
                {[
                  { Icon: GithubIcon, label: "GitHub" },
                  { Icon: LinkedinIcon, label: "LinkedIn" },
                  { Icon: FacebookIcon, label: "Facebook" },
                  { Icon: InstagramIcon, label: "Instagram" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#contact"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/70 transition-all duration-300 hover:border-violet hover:bg-violet hover:text-white"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* form */}
            <motion.form
              action={`https://formsubmit.co/${CONTACT_EMAIL}`}
              method="POST"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
              className="rounded-2xl border border-white/10 bg-panel p-6 text-left rtl:text-right md:p-8"
            >
              {/* FormSubmit Honeypot & Configurations */}
              <input type="text" name="_honey" style={{ display: "none" }} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-grotesk text-[11px] uppercase tracking-[0.25em] text-white/50">
                    {t.contact.form.name}
                  </label>
                  <input
                    required
                    name="name"
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.contact.form.namePlaceholder}
                    className={inputCls}
                    disabled={status === "loading" || cooldown > 0}
                  />
                </div>
                <div>
                  <label className="mb-2 block font-grotesk text-[11px] uppercase tracking-[0.25em] text-white/50">
                    {t.contact.form.email}
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    maxLength={100}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t.contact.form.emailPlaceholder}
                    className={inputCls}
                    disabled={status === "loading" || cooldown > 0}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-2 block font-grotesk text-[11px] uppercase tracking-[0.25em] text-white/50">
                  {t.contact.form.subject}
                </label>
                <input
                  name="subject"
                  maxLength={150}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder={t.contact.form.subjectPlaceholder}
                  className={inputCls}
                  disabled={status === "loading" || cooldown > 0}
                />
              </div>
              <div className="mt-4">
                <label className="mb-2 block font-grotesk text-[11px] uppercase tracking-[0.25em] text-white/50">
                  {t.contact.form.details}
                </label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  maxLength={2000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.contact.form.detailsPlaceholder}
                  className={`${inputCls} resize-none`}
                  disabled={status === "loading" || cooldown > 0}
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || cooldown > 0}
                className={`mt-6 flex w-full items-center justify-center gap-2.5 rounded-full py-4 font-grotesk text-xs font-bold uppercase tracking-[0.3em] text-white transition-all duration-300 ${
                  status === "loading" || cooldown > 0
                    ? "cursor-not-allowed bg-violet/40 text-white/70"
                    : status === "success"
                    ? "bg-emerald-600 shadow-[0_10px_35px_rgba(16,185,129,0.35)]"
                    : "bg-gradient-to-r from-violet-deep to-violet hover:shadow-[0_10px_40px_rgba(139,124,246,0.45)]"
                }`}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> {t.contact.form.sending}
                  </>
                ) : cooldown > 0 ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {isAr ? `يرجى الانتظار (${cooldown} ثوانٍ)` : `Please wait (${cooldown}s)`}
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 size={16} /> {t.contact.form.success}
                  </>
                ) : (
                  <>
                    {t.contact.form.submit} <Send size={15} className="rtl:-scale-x-100" />
                  </>
                )}
              </button>

              {status === "error" && (
                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">
                  <AlertCircle size={16} className="shrink-0 text-red-400" />
                  <span>{errorMessage || t.contact.form.error}</span>
                </div>
              )}

              {status === "success" && (
                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-300">
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
                  <span>{t.contact.form.success}</span>
                </div>
              )}

              <p className="mt-3 text-center text-xs text-white/35">
                {t.contact.form.hint}
              </p>
            </motion.form>
          </div>
        </div>

        {/* footer — matching reference with moving background marquee */}
        <footer className="relative overflow-hidden border-t border-white/10 bg-ink pt-28 pb-14 md:pt-36 md:pb-16">
          {/* Animated moving name in the background */}
          <div
            aria-hidden="true"
            dir="ltr"
            className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none z-0"
          >
            <div className="flex w-max animate-marquee-slow whitespace-nowrap text-white/[0.045] will-change-transform">
              <span className="shrink-0 font-display font-black uppercase tracking-tighter text-[22vw] leading-none">
                {isAr
                  ? "أحمد البشبيشي • أحمد البشبيشي • أحمد البشبيشي • "
                  : "AHMED ALBASHBISHI • AHMED ALBASHBISHI • AHMED ALBASHBISHI • "}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 font-display font-black uppercase tracking-tighter text-[22vw] leading-none"
              >
                {isAr
                  ? "أحمد البشبيشي • أحمد البشبيشي • أحمد البشبيشي • "
                  : "AHMED ALBASHBISHI • AHMED ALBASHBISHI • AHMED ALBASHBISHI • "}
              </span>
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">
            <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
              {/* Left: Heading + Download CV */}
              <div className="text-left rtl:text-right">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="font-display font-black uppercase leading-[0.92] tracking-tight"
                >
                  <span className="block text-white text-[clamp(2.8rem,7vw,6.5rem)]">
                    {t.contact.footer.buildPrefix}
                  </span>
                  <span className="block text-violet text-[clamp(2.8rem,7vw,6.5rem)]">
                    {t.contact.footer.theWord}
                  </span>
                  <span className="block text-violet text-[clamp(2.8rem,7vw,6.5rem)]">
                    {t.contact.footer.futureWord}
                  </span>
                </motion.h2>

                <div className="mt-8">
                  <a
                    href="/cv.html"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-center rounded-full border-2 border-violet/90 bg-violet/10 px-8 py-3.5 font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-violet hover:shadow-[0_0_35px_rgba(139,124,246,0.55)]"
                  >
                    {t.contact.footer.downloadCv}
                  </a>
                </div>
              </div>

              {/* Right: Socials + Contact Email */}
              <div className="flex flex-col gap-8 lg:items-end lg:text-right rtl:lg:items-start rtl:lg:text-left">
                {/* Socials */}
                <div>
                  <p className="font-grotesk text-[10px] font-bold uppercase tracking-[0.35em] text-violet">
                    {t.contact.footer.socials}
                  </p>
                  <div className="mt-3 flex items-center gap-2 lg:justify-end rtl:lg:justify-start">
                    {[
                      { Icon: GithubIcon, href: "https://github.com", label: "GitHub" },
                      { Icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
                      { Icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
                    ].map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-violet hover:bg-violet hover:text-white hover:shadow-[0_0_20px_rgba(139,124,246,0.4)]"
                      >
                        <Icon size={17} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <p className="font-grotesk text-[10px] font-bold uppercase tracking-[0.35em] text-violet">
                    {t.contact.footer.contact}
                  </p>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="mt-2 block font-display text-base font-bold text-white/90 transition-colors hover:text-violet-bright sm:text-lg"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Copyright & Build • Ship • Scale */}
            <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-white/40 sm:flex-row">
              <p>© 2026 {isAr ? "أحمد البشبيشي" : PROFILE.fullName}. {t.contact.footer.rights}</p>
              <p className="font-grotesk text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
                {t.contact.footer.tagline}
              </p>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
