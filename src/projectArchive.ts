export type ArchiveProject = {
  id: string;
  title: string;
  brand: string;
  technologies: string[];
  headline: string;
  category: string;
  description: string;
  features: string[];
  theme: "fashion" | "soda" | "architecture" | "restaurant" | "medical" | "portfolio" | "compute" | "skate" | "personal" | "store";
  image?: string;
};

// These are reference-inspired concepts, not claims of completed client work.
export const PROJECT_ARCHIVE: ArchiveProject[] = [
  {
    id: "01",
    title: "VEON - Fashion E-Commerce Platform",
    brand: "VEON.",
    technologies: ["React 19", "TypeScript", "Vite"],
    headline: "Wear your own story.",
    category: "Fashion / E-commerce",
    theme: "fashion",
    image: "https://images.pexels.com/photos/38150743/pexels-photo-38150743.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description: "An editorial fashion storefront concept with a confident visual direction, an easy-to-browse collection, and a mobile-first shopping experience.",
    features: ["Editorial collection and product layouts", "Responsive shopping navigation", "Product filtering and cart UI concept"],
  },
  {
    id: "02",
    title: "Fizzi - A 3D Interactive Soda Landing Page",
    brand: "fizzi",
    technologies: ["Next.js 14", "Three.js", "React Three Fiber"],
    headline: "LIVE GUTSY",
    category: "Product / Motion",
    theme: "soda",
    description: "A bright soda-brand landing page concept, combining oversized typography, a playful product presentation, and a colorful flavor system.",
    features: ["Flavor-based color palettes", "Interactive product presentation concept", "Bold responsive brand typography"],
  },
  {
    id: "03",
    title: "Elementis Website Concept",
    brand: "ELEMENTIS",
    technologies: ["Next.js 15", "React 19", "TypeScript"],
    headline: "Spaces that stay with you.",
    category: "Architecture / Editorial",
    theme: "architecture",
    image: "https://images.pexels.com/photos/16271998/pexels-photo-16271998.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description: "A quiet, image-led architecture concept with an emphasis on generous spacing, materiality, and a carefully composed project index.",
    features: ["Full-width architecture photography", "Minimal project index", "Typography-led studio introduction"],
  },
  {
    id: "04",
    title: "Horai - Restaurant Website",
    brand: "HORAI",
    technologies: ["React 19", "TypeScript", "Vite"],
    headline: "A taste of something real.",
    category: "Hospitality / Restaurant",
    theme: "restaurant",
    image: "https://images.pexels.com/photos/31393431/pexels-photo-31393431.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description: "A restaurant website concept that uses rich photography and warm typography to introduce the food, the atmosphere, and a simple reservation journey.",
    features: ["Seasonal menu presentation", "Reservation form layout", "Mobile-friendly restaurant information"],
  },
  {
    id: "05",
    title: "Medical Website with Admin Dashboard",
    brand: "wellcare",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    headline: "Care, made personal.",
    category: "Healthcare / Platform",
    theme: "medical",
    image: "/images/project-physio.jpg",
    description: "A healthcare platform concept focused on clear service information, approachable appointment booking, and an organized administration interface.",
    features: ["Accessible treatment information", "Appointment booking UI concept", "Patient and schedule dashboard layout"],
  },
  {
    id: "06",
    title: "3D Portfolio",
    brand: "AHMED.",
    technologies: ["Next.js", "TypeScript", "Three.js"],
    headline: "Ideas in another dimension.",
    category: "Creative / Portfolio",
    theme: "portfolio",
    description: "An exploratory portfolio concept where expressive geometry and restrained typography make a memorable introduction to a developer's work.",
    features: ["Interactive geometry direction", "Project-focused navigation", "Responsive fallback for smaller devices"],
  },
  {
    id: "07",
    title: "COMPUTE - AI Agents for Distributed Computing",
    brand: "COMPUTE",
    technologies: ["Next.js 16", "React 19", "TypeScript"],
    headline: "Intelligence, connected.",
    category: "Technology / AI",
    theme: "compute",
    description: "A technology landing page concept for an AI agent platform, presenting a complex product with a simple narrative and connected system visuals.",
    features: ["Clear product storytelling", "Connected agent system visualization", "Accessible dark interface"],
  },
  {
    id: "08",
    title: "Suburbia 3D Skateboard",
    brand: "SUBURBIA",
    technologies: ["Next.js 15", "Three.js", "React Three Fiber"],
    headline: "Built for the streets.",
    category: "Lifestyle / Product",
    theme: "skate",
    image: "https://images.pexels.com/photos/7946287/pexels-photo-7946287.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description: "A skateboard product concept with street-culture photography, loud typography, and a customizable deck presentation direction.",
    features: ["Custom deck color concept", "Street-inspired product presentation", "Mobile-first collection layout"],
  },
  {
    id: "09",
    title: "Personal Portfolio Concept",
    brand: "ALBASHBISH",
    technologies: ["React", "Vite", "Three.js"],
    headline: "Design meets development.",
    category: "Personal / Portfolio",
    theme: "personal",
    image: "/images/hero-room.jpg",
    description: "An alternative direction for Ahmed's portfolio, pairing atmospheric imagery with large typography and a concise, work-led presentation.",
    features: ["Bold personal identity", "Selected-project presentation", "Direct contact and WhatsApp actions"],
  },
  {
    id: "10",
    title: "Premium E-commerce Platform with WhatsApp Integration",
    brand: "THE EVERYDAY EDIT",
    technologies: ["Next.js", "TypeScript", "WhatsApp"],
    headline: "Less, but better.",
    category: "Lifestyle / E-commerce",
    theme: "store",
    image: "https://images.pexels.com/photos/16652437/pexels-photo-16652437.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description: "A premium lifestyle store concept with a considered shopping experience and a direct WhatsApp inquiry journey for customers.",
    features: ["Clean collection and product pages", "Mobile-friendly shopping experience", "WhatsApp product inquiry direction"],
  },
];