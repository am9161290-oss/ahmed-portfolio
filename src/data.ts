export const PROFILE = {
  firstName: "AHMED",
  lastName: "ALBASHBISHI",
  fullName: "Ahmed Albashbishi",
  role: "Front-End Developer",
  location: "based in Egypt",
  email: "ahmed.albashbishi.business@gmail.com",
  phoneDisplay: "0155 144 2474",
  phoneIntl: "+201551442474",
  whatsapp: "https://wa.me/201551442474",
  portrait: "/images/ahmed-portrait.jpg",
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  {
    id: "01",
    title: "Web Development",
    description:
      "I create custom-coded websites specifically for your brand. I focus on making sure they are scalable, fast, accessible, and have engaging animations to provide a memorable experience for users.",
    items: ["Modern Websites", "Motion & Animations", "Scalability"],
  },
  {
    id: "02",
    title: "Advanced Solutions",
    description:
      "I specialize in developing advanced web applications that redefine the possibilities of online platforms, crafting progressive web apps and integrating complex systems.",
    items: ["Progressive Web Apps", "Complex Integrations", "Innovative Tech Solutions"],
  },
  {
    id: "03",
    title: "Code Optimization",
    description:
      "Your website deserves to be seen, speed, and responsiveness. By optimizing load times, improving user experiences, I ensure your site runs smoothly and efficiently.",
    items: ["Modern Frameworks", "Responsive Design", "Speed Optimization"],
  },
];

export const EXPERIENCE = [
  {
    role: "Freelancer Frontend Developer",
    company: "Freelance",
    period: "May 2025 - Present",
    description:
      "Delivered 20+ end-to-end web projects, including AI platforms and e-commerce stores, using React, Next.js, and modern tooling. Focused on high-performance design and scalable solutions.",
  },
  {
    role: "Frontend Developer",
    company: "Codule",
    period: "Jan 2025 - Sep 2025",
    description:
      "Developed responsive web applications, booking systems, and internal dashboards. Created reusable component libraries and optimized performance through advanced state management.",
  },
  {
    role: "Internship Frontend Developer",
    company: "Web Master",
    period: "Aug 2024 - Oct 2024",
    description:
      "Transformed Figma designs into pixel-perfect web applications, achieving a 100% Lighthouse performance score across all projects.",
  },
];

export interface ProjectItem {
  id: string;
  title: string;
  titleAr: string;
  stack: string;
  tags: string[];
  year: string;
  image: string;
  description: string;
  descriptionAr: string;
  features: string[];
  featuresAr: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    title: "Education Platform + Admin & Instructor Dashboard",
    titleAr: "منصة تعليمية + لوحة تحكم للمسؤول والمعلم",
    stack: "Next.js & TypeScript & Tailwind CSS & shadcn/ui & Prisma & Neon PostgreSQL & Redux Toolkit & JWT & GSAP & Swiper & Emailjs",
    tags: ["Next.js", "TypeScript", "2025"],
    year: "2025",
    image: "/images/project-education.jpg",
    description:
      "A full-featured e-learning platform where students can browse, purchase and stream courses, while instructors and admins manage content, users and revenue from powerful dashboards.",
    descriptionAr:
      "منصة تعليم إلكتروني متكاملة تتيح للطلاب تصفح وشراء وبث الدورات التعليمية، مع لوحات تحكم متقدمة للمعلمين والمسؤولين لإدارة المحتوى والطلاب والإيرادات.",
    features: [
      "Role-based dashboards for students, instructors and admins",
      "Secure JWT authentication with protected routes",
      "Course builder with video lessons, quizzes and progress tracking",
      "Payments, coupons and revenue analytics charts",
      "Buttery-smooth GSAP page transitions and Swiper carousels",
    ],
    featuresAr: [
      "لوحات تحكم مخصصة بصلاحيات محددة للطلاب والمعلمين والمسؤولين",
      "نظام حماية وتسجيل دخول آمن بتقنية JWT مع مسارات محمية",
      "أداة بناء دورات مع دروس فيديو واختبارات ومتابعة تقدم الطالب",
      "بوابات دفع إلكتروني وكوبونات خصم ومخططات تحليل الإيرادات",
      "انتقالات صفحات فائقة السلاسة بمكتبة GSAP ومعارض شرائح Swiper",
    ],
  },
  {
    id: "02",
    title: "Garden Physio Clinic Multilingual Web Platform",
    titleAr: "منصة ويب متعددة اللغات لعيادة جاردن للعلاج الطبيعي",
    stack: "Next.js & React & Tailwind CSS & Framer Motion & Next-Intl & Google Apps Script",
    tags: ["Next.js", "React", "2024"],
    year: "2024",
    image: "/images/project-physio.jpg",
    description:
      "A multilingual (Arabic / English) website for a physiotherapy clinic with online appointment booking, service showcases and instant WhatsApp integration for patient inquiries.",
    descriptionAr:
      "موقع إلكتروني ثنائي اللغة (عربي / إنجليزي) لعيادة علاج طبيعي مع نظام حجز مواعيد أونلاين، واستعراض برامج العلاج وتكامل فوري مع واتساب لاستفسارات المرضى.",
    features: [
      "Full Arabic RTL + English LTR support with Next-Intl",
      "Appointment booking synced to Google Sheets via Apps Script",
      "One-tap WhatsApp and call actions for patients",
      "Framer Motion scroll animations and parallax sections",
      "SEO-optimized pages for every treatment service",
    ],
    featuresAr: [
      "دعم كامل للغتين العربية (RTL) والإنجليزية (LTR) بواسطة Next-Intl",
      "حجز مواعيد متزامن تلقائياً مع جداول Google Sheets عبر Apps Script",
      "أزرار تواصل مباشر عبر واتساب والمكالمات بنقرة واحدة",
      "تأثيرات حركة بارالاكس وانتقالات ناعمة مع Framer Motion",
      "صفحات مهيأة لمحركات البحث (SEO) لكل خدمة علاجية وتأهيلية",
    ],
  },
  {
    id: "03",
    title: "Spylt — Freaking Delicious Protein + Caffeine Experience",
    titleAr: "تجربة تفاعلية لمنتج Spylt — مشروب البروتين والكافيين الفاخر",
    stack: "React & Vite & Tailwind CSS & GSAP ScrollTrigger & Lenis Smooth Scroll",
    tags: ["React", "GSAP", "2025"],
    year: "2025",
    image: "/images/project-spylt.jpg",
    description:
      "An award-style product experience for a protein + caffeine drink brand — bold typography, scroll-driven can animations and playful flavor sections that make the product impossible to ignore.",
    descriptionAr:
      "موقع وتجربة استعراض منتج عالمية لمشروب البروتين والكافيين، بخطوط عريضة جريئة، وحركات ثلاثية الأبعاد تفاعلية للعلب مع أقسام نكهات مبتكرة.",
    features: [
      "Scroll-driven product animations with GSAP ScrollTrigger",
      "Lenis buttery smooth scrolling throughout the page",
      "Bold oversized typography and flavor-based color themes",
      "Interactive flavor selector with animated transitions",
      "Fully responsive with mobile-first motion design",
    ],
    featuresAr: [
      "حركات تفاعلية مرتبطة بالتمرير باستخدام GSAP ScrollTrigger",
      "تمرير فائق النعومة والانسيابية باستخدام مكتبة Lenis",
      "تايبوجرافي ضخم وجريء مع أنظمة ألوان مخصصة لكل نكهة",
      "محدد نكهات تفاعلي مع تأثيرات انتقال ثلاثية الأبعاد",
      "تصميم متجاوب بالكامل مع مراعاة الهواتف وتجربة الحركة المتنقلة",
    ],
  },
];

export const SKILLS = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Tailwind CSS", level: 96 },
  { name: "JavaScript (ES6+)", level: 94 },
  { name: "Framer Motion / GSAP", level: 88 },
  { name: "Redux Toolkit", level: 85 },
];

export const TECH_MARQUEE = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "Redux Toolkit",
  "Framer Motion", "GSAP", "shadcn/ui", "Prisma", "REST APIs", "Git & GitHub",
  "Figma", "Responsive Design",
];

export interface TestimonialItem {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  quote: string;
  quoteAr: string;
  initials: string;
  country: string;
  countryCode: "EG" | "SA" | "QA" | "JO" | "AE" | "KW" | "GB" | "US";
  flagEmoji: string;
}

export const TESTIMONIALS_ROW_1: TestimonialItem[] = [
  {
    name: "Mohamed Ragab",
    nameAr: "محمد رجب",
    role: "CEO, Creative Agency",
    roleAr: "مدير تنفيذي، وكالة إبداعية",
    initials: "MR",
    country: "مصر",
    countryCode: "EG",
    flagEmoji: "🇪🇬",
    quote:
      "He perfectly captured my vision, designed a clean and professional layout, and implemented smooth animations with an engaging lead-capture flow. The page reflects my experience and builds trust with clients.",
    quoteAr:
      "فهم رؤيتي بشكل مثالي، وصمم تخطيطًا نظيفًا واحترافيًا، ونفّذ حركات سلسة مع تدفق جذاب لجذب العملاء. الصفحة تعكس خبرتي وتبني ثقة مع العملاء.",
  },
  {
    name: "Omar El-Sayed",
    nameAr: "عمر السيد",
    role: "Founder, Creatiwiz World",
    roleAr: "مؤسس Creatiwiz World",
    initials: "OE",
    country: "السعودية",
    countryCode: "SA",
    flagEmoji: "🇸🇦",
    quote:
      "Ahmed completely transformed our online presence. The Creatiwiz World website is not only visually stunning with its smooth animations, but the shopping experience is incredibly fast and intuitive. 10/10!",
    quoteAr:
      "أحمد غيّر وجودنا على الإنترنت بالكامل. موقع Creatiwiz World ليس فقط مذهلاً بصريًا بحركاته السلسة، بل تجربة التسوق سريعة وسهلة بشكل لا يُصدق. 10/10!",
  },
  {
    name: "Bayan Hasnawi",
    nameAr: "بيان حسناوي",
    role: "Creative Director",
    roleAr: "مديرة إبداعية",
    initials: "BH",
    country: "السعودية",
    countryCode: "SA",
    flagEmoji: "🇸🇦",
    quote:
      "Ahmed organized my portfolio beautifully and made the site interactive and elegant. The sidebar navigation and animations are smooth and modern, and the design truly reflects the style and quality of my work.",
    quoteAr:
      "أحمد نظّم معرض أعمالي بشكل جميل وجعل الموقع تفاعليًا وأنيقًا. التنقل الجانبي والحركات سلسة وعصرية، والتصميم يعكس فعلاً أسلوب وجودة أعمالي.",
  },
  {
    name: "Hala Ajiuby",
    nameAr: "هالة عجيوبي",
    role: "Media Host & Producer",
    roleAr: "مقدمة إعلامية ومنتجة",
    initials: "HA",
    country: "الإمارات",
    countryCode: "AE",
    flagEmoji: "🇦🇪",
    quote:
      "The website perfectly matched my brand media identity and professional goals. The bilingual support, smooth animations, and elegant dark/light mode created a modern experience and engaging flow.",
    quoteAr:
      "الموقع طابق هويتي الإعلامية وأهدافي المهنية بشكل مثالي. الدعم ثنائي اللغة، والحركات السلسة، ووضع الإضاءة الأنيق خلقوا تجربة عصرية وجذابة.",
  },
  {
    name: "Sarah Mohamed",
    nameAr: "سارة محمد",
    role: "Product Manager, EduTech Startup",
    roleAr: "مديرة منتجات، شركة تعليم تقني",
    initials: "SM",
    country: "مصر",
    countryCode: "EG",
    flagEmoji: "🇪🇬",
    quote:
      "Ahmed turned our vague idea into a fast, beautiful platform that our students love. Communication was clear, delivery was early, and the attention to detail was on another level.",
    quoteAr:
      "أحمد حوّل فكرتنا الغامضة إلى منصة سريعة وجميلة يحبها طلابنا. التواصل كان واضحًا، التسليم كان مبكرًا، والاهتمام بالتفاصيل كان على مستوى آخر.",
  },
  {
    name: "Emily Carter",
    nameAr: "إيميلي كارتر",
    role: "Marketing Director, UK Brand",
    roleAr: "مديرة تسويق، علامة تجارية بريطانية",
    initials: "EC",
    country: "بريطانيا",
    countryCode: "GB",
    flagEmoji: "🇬🇧",
    quote:
      "He took our Figma files and delivered a pixel-perfect, 100/100 Lighthouse website. Our conversion rate jumped 43% after launch. Highly recommended.",
    quoteAr:
      "أخذ ملفات Figma الخاصة بنا وسلّم موقعًا مثاليًا بدقة البكسل، 100/100 في Lighthouse. معدل التحويل ارتفع 43% بعد الإطلاق. أنصح به بشدة.",
  },
];

export const TESTIMONIALS_ROW_2: TestimonialItem[] = [
  {
    name: "Fatima Hamed",
    nameAr: "فاطمة حامد",
    role: "E-Commerce Founder",
    roleAr: "مؤسسة متجر إلكتروني",
    initials: "FH",
    country: "قطر",
    countryCode: "QA",
    flagEmoji: "🇶🇦",
    quote:
      "Extremely satisfied, Mashallah. The website was completed in record time exactly the way I wanted it.",
    quoteAr:
      "راضية جدًا ما شاء الله. الموقع اكتمل في وقت قياسي بالضبط زي ما كنت عايزاه.",
  },
  {
    name: "Sawsan Barkhash",
    nameAr: "سوسن برخش",
    role: "Brand Consultant & Founder",
    roleAr: "مستشارة علامات تجارية ومؤسسة",
    initials: "SB",
    country: "الأردن",
    countryCode: "JO",
    flagEmoji: "🇯🇴",
    quote:
      "The landing page beautifully reflects Seeten's identity and the luxury feel of her handmade products. The client testimonials, and course presentation create strong trust and make the visitor feel valued.",
    quoteAr:
      "الصفحة تعكس هوية سيتين بشكل جميل وإحساس الفخامة لمنتجاتها اليدوية. شهادات العملاء وعرض الدورات يخلقان ثقة قوية ويجعلان الزائر يشعر بالتقدير.",
  },
  {
    name: "Mariam Hassan",
    nameAr: "مريم حسن",
    role: "Creative Business Owner",
    roleAr: "صاحبة مشروع إبداعي",
    initials: "MH",
    country: "الكويت",
    countryCode: "KW",
    flagEmoji: "🇰🇼",
    quote:
      "Ahmed developed my Safa e-commerce store with a clean layout and smooth animations. He answered my questions quickly and was very cooperative throughout the whole process. Highly recommended.",
    quoteAr:
      "أحمد طوّر متجر صفا الإلكتروني بتصميم نظيف وحركات سلسة. كان بيجاوب على أسئلتي بسرعة ومتعاون جدًا طول الوقت. أنصح به بشدة.",
  },
  {
    name: "Mostafa Emam",
    nameAr: "مصطفى إمام",
    role: "Technical Lead",
    roleAr: "قائد فني",
    initials: "ME",
    country: "مصر",
    countryCode: "EG",
    flagEmoji: "🇪🇬",
    quote:
      "Very professional and easy to work with. Delivered high-quality work on time with great attention to detail. Highly recommended!",
    quoteAr:
      "محترف جدًا وسهل التعامل معاه. سلّم شغل عالي الجودة في الوقت المحدد مع اهتمام كبير بالتفاصيل. أنصح به بشدة!",
  },
  {
    name: "Dr. Karim Adel",
    nameAr: "د. كريم عادل",
    role: "Founder, Garden Physio Clinic",
    roleAr: "مؤسس عيادة جاردن فيزيو",
    initials: "KA",
    country: "مصر",
    countryCode: "EG",
    flagEmoji: "🇪🇬",
    quote:
      "Working with Ahmed was effortless. He rebuilt our clinic website in two languages, bookings doubled within a month, and patients keep complimenting the design.",
    quoteAr:
      "العمل مع أحمد كان سهل جدًا. أعاد بناء موقع العيادة بلغتين، الحجوزات اتضاعفت خلال شهر، والمرضى بيمدحوا التصميم باستمرار.",
  },
  {
    name: "Youssef Ali",
    nameAr: "يوسف علي",
    role: "Brand Designer",
    roleAr: "مصمم علامات تجارية",
    initials: "YA",
    country: "السعودية",
    countryCode: "SA",
    flagEmoji: "🇸🇦",
    quote:
      "The animations bring the product to life without getting in the way. Everything feels smooth and easy to use, and the attention given to the small details really shows.",
    quoteAr:
      "الحركات بتخلي المنتج يعيش من غير ما تكون مزعجة. كل حاجة سلسة وسهلة الاستخدام، والاهتمام بالتفاصيل الصغيرة واضح فعلاً.",
  },
  {
    name: "Adam Wilson",
    nameAr: "آدم ويلسون",
    role: "Digital Product Designer",
    roleAr: "مصمم منتجات رقمية",
    initials: "AW",
    country: "أمريكا",
    countryCode: "US",
    flagEmoji: "🇺🇸",
    quote:
      "The responsive layouts and careful use of motion make the site feel polished on every device. The code is organized, the handover was clear, and communication was consistently helpful.",
    quoteAr:
      "التصميم المتجاوب والاستخدام الدقيق للحركة يخلوا الموقع يبان مصقول على كل جهاز. الكود منظم، التسليم كان واضح، والتواصل كان مفيد دايمًا.",
  },
];

export const TESTIMONIALS = [...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_2];

export const STATS = [
  { value: 20, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Happy Clients" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];
