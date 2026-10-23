import {
  siBootstrap,
  siExpress,
  siFigma,
  siFramer,
  siGit,
  siGithub,
  siGsap,
  siJavascript,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siPrisma,
  siReact,
  siRedux,
  siSass,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

export type Technology = {
  name: string;
  icon: SimpleIcon;
  color?: string;
};

export const TECH_STACK: { category: string; technologies: Technology[] }[] = [
  {
    category: "Frontend",
    technologies: [
      { name: "JavaScript", icon: siJavascript },
      { name: "TypeScript", icon: siTypescript },
      { name: "React", icon: siReact },
      { name: "Next.js", icon: siNextdotjs, color: "#F5F5F5" },
      { name: "Redux", icon: siRedux, color: "#A78BFA" },
      { name: "Tailwind CSS", icon: siTailwindcss },
      { name: "GSAP", icon: siGsap },
      { name: "Framer Motion", icon: siFramer, color: "#BB85F8" },
      { name: "Sass", icon: siSass },
      { name: "Bootstrap", icon: siBootstrap, color: "#A855F7" },
    ],
  },
  {
    category: "Backend",
    technologies: [
      { name: "Node.js", icon: siNodedotjs, color: "#80C750" },
      { name: "NestJS", icon: siNestjs },
      { name: "Express.js", icon: siExpress, color: "#F5F5F5" },
    ],
  },
  {
    category: "Database",
    technologies: [
      { name: "MySQL", icon: siMysql, color: "#59A5C6" },
      { name: "PostgreSQL", icon: siPostgresql, color: "#709AC6" },
      { name: "MongoDB", icon: siMongodb, color: "#4CAB60" },
      { name: "Prisma", icon: siPrisma, color: "#E1E6F0" },
    ],
  },
  {
    category: "Tools & Workflow",
    technologies: [
      { name: "Git", icon: siGit },
      { name: "GitHub", icon: siGithub, color: "#F5F5F5" },
      { name: "Figma", icon: siFigma, color: "#F28A70" },
      { name: "Vite", icon: siVite, color: "#B492FF" },
      { name: "Postman", icon: siPostman },
      { name: "Vercel", icon: siVercel, color: "#F5F5F5" },
    ],
  },
];