import type { IProjects } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function ProjectCard({ project }: { project: IProjects }) {
  // Indexing [0] unguarded took the entire projects grid down with a
  // TypeError the first time a project was added without a screenshot.
  const cover = project.image[0];

  return (
    <div
      className="relative border text-wrap
 pb-2 rounded-lg shadow-md bg-[#F9FBFB] w-78 transition-transform duration-300 cursor-pointer"
    >
      <div className="overflow-hidden max-h-[35%] rounded-lg">
        {cover ? (
          <img
            className={`object-cover h-35 w-full hover:scale-105 transition-transform duration-300 ${
              cover.imagePos === "center" ? "object-center" : "object-top"
            }`}
            src={cover.url}
            alt={project.title}
            loading="lazy"
          />
        ) : (
          <div className="h-35 w-full bg-[#e6f1f0]" />
        )}
      </div>

      <div>
        <h1 className="text-lg px-4 py-2  font-bold">{project.title}</h1>
        <p className="text-sm px-4 text-gray-600 overflow-y-scroll max-h-[130px] no-scrollbar">
          {project.description}
        </p>
      </div>
      <div className="px-2 mb-8 mt-2 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            className=" font-semibold bg-[#e6f1f0] text-[#5c8a84]"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Button
        asChild
        className="text-white hover:bg-[#4a7b74] w-full left-1/2 -translate-x-1/2 absolute bottom-0 bg-[#5c8a84]"
      >
        <Link to={`/projects/${project.title}`}>View Details</Link>
      </Button>
    </div>
  );
}
