import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import SkillCategory from "@/components/SkillCategory";
import { projects } from "@/lib/data";
import type { TCategories } from "@/lib/types";
import { Pause, Play } from "lucide-react";

export default function Projects() {
  const category: TCategories[] = [
    "all",
    "frontend",
    "backend",
    "full-stack",
    "telegram-bot",
  ];

  const [activeTab, setActiveTab] = useState<TCategories>("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isPaused, setIsPaused] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const filterProjects = (tab: TCategories) => {
    setActiveTab(tab);
    if (tab === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.class.includes(tab))
      );
    }
  };

  useEffect(() => {
    filterProjects(activeTab);
  }, [activeTab]);

  useEffect(() => {
    let scrollInterval: ReturnType<typeof setInterval>;

    if (!isPaused && scrollRef.current) {
      scrollInterval = setInterval(() => {
        const el = scrollRef.current;
        if (el) {
          el.scrollLeft += 2;
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft = 0;
          }
        }
      }, 2);
    }

    return () => clearInterval(scrollInterval);
  }, [isPaused, filteredProjects]);

  return (
    <section
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
      className="h-screen bg-[transparent] flex flex-col w-full"
    >
      <div className="text-center mt-2">
        <h1 className="text-[38px] font-semibold">My Projects</h1>
        <p className="mt-3 text-sm font-semibold">
          A collection of my work, from web apps to full-stack platforms.
        </p>
      </div>

      <SkillCategory
        category={category}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className=" mt-8 pt-5 max-w-[80%] mx-auto">
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex items-stretch gap-5 overflow-x-scroll no-scrollbar scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {filteredProjects.map((project, idx) => (
            <div key={idx} className=" flex items-stretch">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className=" top-2 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      </div>
    </section>
  );
}
