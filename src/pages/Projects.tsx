import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import SkillCategory from "@/components/SkillCategory";
import { projects } from "@/lib/data";
import type { TCategories } from "@/lib/types";
import { Pause, Play } from "lucide-react";
import { useIsMobile } from "@/use-mobile";

export default function Projects() {
  const category: TCategories[] = [
    "all",
    "frontend",
    "backend",
    "full-stack",
    "telegram-bot",
    "library/tools",
  ];

  const [activeTab, setActiveTab] = useState<TCategories>("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
      id="projects"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
      className="flex flex-col w-full  bg-transparent"
    >
      <div className="text-center mt-4 px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
          My Projects
        </h1>
        <p className="mt-2 text-sm sm:text-base md:text-lg font-semibold">
          A collection of my work, from web apps to full-stack platforms.
        </p>
      </div>

      <SkillCategory
        category={category}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="mt-8 pt-5 w-full max-w-full sm:max-w-[90%] lg:max-w-[80%] mx-auto relative">
        <div
          ref={scrollRef}
          onMouseEnter={() => !isMobile && setIsPaused(true)}
          onTouchStart={() => isMobile && setIsPaused(true)}
          onTouchEnd={() => isMobile && setIsPaused(false)}
          onMouseLeave={() => !isMobile && setIsPaused(false)}
          className="flex gap-5 overflow-x-auto sm:overflow-x-scroll no-scrollbar scroll-smooth px-4 sm:px-0"
          style={{ scrollBehavior: "smooth" }}
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="flex w-full sm:w-[300px] md:w-[350px] lg:w-[400px]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute top-2 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      </div>
    </section>
  );
}
