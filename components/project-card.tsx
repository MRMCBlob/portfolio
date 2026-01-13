"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: { username: string; repo: string };
  liveUrl?: string;
  image?: string;
};

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 30 }}
      className="project-card relative rounded-xl cursor-pointer h-[280px]"
    >
      {/* Card content */}
      <div className="card-content rounded-xl p-6 overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-auto relative z-10">
            {project.github && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(`https://github.com/${project.github!.username}/${project.github!.repo}`, "_blank", "noopener,noreferrer");
                }}
                className="project-card-btn btn-outline h-8 px-3 rounded-md cursor-pointer text-foreground"
              >
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </span>
              </button>
            )}
            {project.liveUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                }}
                className="project-card-btn btn-primary h-8 px-3 rounded-md cursor-pointer"
              >
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <ExternalLink size={14} />
                  Live
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Update CSS custom properties on ALL cards
      const cards = container.querySelectorAll(".project-card");
      cards.forEach((card) => {
        const cardRect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="project-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}

export type { Project };
