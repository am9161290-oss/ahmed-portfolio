import { useId } from "react";
import type { ArchiveProject } from "../projectArchive";

export default function ProjectPreview({ project, wide = false }: { project: ArchiveProject; wide?: boolean }) {
  const gradientId = `can-${useId().replace(/:/g, "")}`;

  return (
    <div role="img" aria-label={`Illustrative website preview for ${project.title}`} className={`project-preview preview-${project.theme} ${wide ? "is-wide" : ""}`}>
      <div aria-hidden="true">
        {project.image && <img src={project.image} alt="" loading="lazy" className="preview-image" />}
        <div className="preview-topbar">
          <span className="preview-brand">{project.brand}</span>
          <span className="preview-menu"><i /><i /></span>
        </div>
        <div className="preview-copy">
          <span className="preview-eyebrow">{project.category}</span>
          <div className="preview-headline">{project.headline}</div>
          <span className="preview-subline">{project.theme === "soda" ? "Soda perfected. No compromises." : "Thoughtfully made. Beautifully experienced."}</span>
          <span className="preview-cta">{project.theme === "medical" ? "Find your care" : project.theme === "restaurant" ? "Discover the menu" : project.theme === "soda" ? "Find your flavor" : "Explore more"} <span>&nearr;</span></span>
        </div>

        {project.theme === "soda" && (
          <svg className="soda-can" viewBox="0 0 160 300" fill="none">
            <defs>
              <linearGradient id={gradientId} x1="24" x2="132" y1="150" y2="150" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e96032" /><stop offset=".23" stopColor="#ffab52" /><stop offset=".65" stopColor="#fe8550" /><stop offset="1" stopColor="#c94029" />
              </linearGradient>
            </defs>
            <rect x="28" y="12" width="104" height="276" rx="29" fill={`url(#${gradientId})`} />
            <ellipse cx="80" cy="17" rx="49" ry="12" fill="#c1c5c0" />
            <ellipse cx="80" cy="17" rx="39" ry="8" fill="#deded4" />
            <path d="M73 11h14v10H73z" fill="#979e96" /><ellipse cx="80" cy="21" rx="8" ry="3" fill="#747c73" />
            <ellipse cx="80" cy="280" rx="46" ry="8" fill="#bc4c32" />
            <path d="M29 195c32-30 61-36 104-59M29 235c28-26 64-36 104-41" stroke="#ffe9ae" strokeWidth="24" opacity=".75" />
            <text x="80" y="105" textAnchor="middle" fill="#fff5dc" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="38" fontStyle="italic">fizzi</text>
            <text x="80" y="130" textAnchor="middle" fill="#5c3420" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="9" letterSpacing="2">ORANGE SODA</text>
            <text x="80" y="253" textAnchor="middle" fill="#fff5dc" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10" letterSpacing="1">LIVE GUTSY</text>
            <path d="M40 41v213" stroke="white" strokeWidth="4" opacity=".22" />
          </svg>
        )}

        {project.theme === "portfolio" && (
          <svg className="preview-orb" viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="1.3">
            <circle cx="120" cy="120" r="90" /><ellipse cx="120" cy="120" rx="90" ry="32" />
            <ellipse cx="120" cy="120" rx="90" ry="64" /><ellipse cx="120" cy="120" rx="32" ry="90" />
            <ellipse cx="120" cy="120" rx="64" ry="90" /><path d="M30 120h180M120 30v180M57 57l126 126M57 183 183 57" />
          </svg>
        )}

        {project.theme === "compute" && (
          <svg className="compute-network" viewBox="0 0 300 220" fill="none">
            <g stroke="#76e7b4" strokeWidth="1" opacity=".5"><path d="m150 40-90 70 30 75h120l30-75-90-70v145M60 110h180M90 185l60-145 60 145" /></g>
            {[[150, 40], [60, 110], [240, 110], [90, 185], [210, 185], [150, 110]].map(([cx, cy], i) => <g key={i}><circle cx={cx} cy={cy} r="14" fill="#0b2820" stroke="#6ecfa3" strokeWidth="1" /><circle cx={cx} cy={cy} r="4" fill="#95f8cc" /></g>)}
          </svg>
        )}
        <span className="preview-footnote">DESIGN CONCEPT / {project.id}</span>
      </div>
    </div>
  );
}