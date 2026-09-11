import { useEffect, useMemo, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import SkillCategory from "@/components/SkillCategory";
import { projects } from "@/lib/data";
import type { TCategories } from "@/lib/types";
import { Pause, Play } from "lucide-react";
import { useIsMobile } from "@/use-mobile";

/** Pixels per second the carousel drifts when it is not paused. */
const SCROLL_SPEED = 40;

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
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  /*
   * Derived, not stored.
   *
   * The filtered list used to live in its own state, written by a `useEffect`
   * that watched `activeTab` — so every tab click rendered once with the old
   * list before the effect corrected it, and the helper doing the writing also
   * called `setActiveTab`, setting the state that had just triggered it.
   */
  const filteredProjects = useMemo(
    () =>
      activeTab === "all"
        ? projects
        : projects.filter((project) => project.class.includes(activeTab)),
    [activeTab]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (isPaused || !el) return;

    let frame: number;
    let last = performance.now();

    const step = (now: number) => {
      /*
       * Driven by rAF and scaled by elapsed time, not a `setInterval` of 2ms.
       * That timer asked for 500 ticks a second, got whatever the browser's
       * clamp allowed, and moved a fixed 2px per tick — so the speed varied
       * with load and the work was thrown away between paints.
       */
      const dt = Math.min(now - last, 50);
      last = now;
      el.scrollLeft += (dt * SCROLL_SPEED) / 1000;

      /*
       * Wrap at the true end of the track.
       *
       * The old check reset at `scrollWidth / 2`, which is where a marquee
       * that renders its list twice would loop — this one renders it once, so
       * the carousel snapped back at the halfway point and the second half of
       * the projects could never be reached by autoscroll.
       */
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
        el.scrollLeft = 0;
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
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
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="flex w-full sm:w-75 md:w-87.5 lg:w-100"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          className="absolute top-2 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 cursor-pointer"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      </div>
    </section>
  );
}
