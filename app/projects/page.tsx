import { ProjectGrid, type Project } from "@/components/project-card";
import Nav from "@/components/nav";

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "My Portfolio",
    description: "This Portfolio page lmao",
    tags: ["Next.js", "React", "Tailwind CSS"],
    github: { username: "MRMCBlob", repo: "portfolio" },
    liveUrl: "https://mrmcblob.com",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background pt-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Projects
          </h1>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
            A collection of my recent work. Each project represents a unique challenge
            and showcases different aspects of my skills.
          </p>
          <ProjectGrid projects={PROJECTS} />
        </div>
      </main>
    </>
  );
}
