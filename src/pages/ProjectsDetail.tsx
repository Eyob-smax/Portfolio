import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Code,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  EyeClosed,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { projects } from "@/lib/data";

interface ProjectImage {
  url: string;
  imagePos?: string;
}

interface CurrentProject {
  title: string;
  description: string;
  image: ProjectImage[];
  tags: string[];
  source: string;
  visit: string;
  detailedDescription: string;
}

export default function ProjectsDetail() {
  const { id } = useParams();

  const currentProject = projects.find((item) => item.title === id) as
    | CurrentProject
    | undefined;

  const images = currentProject?.image || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const headerTitle = currentProject
    ? `Eyob Simachew | ${
        currentProject.title.length > 20
          ? `${currentProject.title.slice(0, 20)}...`
          : currentProject.title
      }`
    : "Eyob Simachew | Project Not Found";

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const startAutoSlide = useCallback(() => {
    if (images.length <= 1) return;
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);
  }, [images.length, stopAutoSlide]);

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [startAutoSlide, stopAutoSlide]);

  // A shorter project reached through a link from a longer one could leave the
  // index pointing past the end of the new gallery, showing a blank frame.
  useEffect(() => setCurrentIndex(0), [id]);

  if (!currentProject) {
    return (
      <section className="relative inset-0 min-h-screen bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] bg-[#F6F7F8] flex flex-col w-full px-4 sm:px-6 lg:px-12">
        <Header title={headerTitle} tabLinks={[]} />
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Project Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find a project with the ID: <strong>{id}</strong>.
          </p>
          <Button asChild>
            <Link to={"/#projects"}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go back to projects
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  const handleNext = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    startAutoSlide();
  };

  const handlePrev = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    startAutoSlide();
  };

  return (
    <section className="relative inset-0 min-h-screen bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] bg-[#F6F7F8] flex flex-col w-full px-4 sm:px-2 lg:px-12">
      <Header type={"project"} title={headerTitle} tabLinks={[]} />

      <Link
        to={"/#projects"}
        className="flex items-center text-sm text-gray-500 mb-4 hover:underline"
      >
        <ArrowLeft className="mr-1" /> Back to projects
      </Link>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-10 w-full max-w-[1200px] mx-auto">
        <div className="flex-1 flex flex-col gap-4 w-full lg:w-1/2">
          <h1 className="text-2xl font-bold">{currentProject.title}</h1>
          <p className="text-sm mt-2 text-gray-500 max-h-[150px] overflow-y-auto pr-2">
            {currentProject.description}
          </p>

          <div
            className="relative flex justify-center items-center mt-4 overflow-hidden w-full max-h-[280px] rounded-lg border border-gray-300 shadow-lg"
            // Only add mouse handlers if there is more than one image
            {...(images.length > 1
              ? {
                  onMouseEnter: stopAutoSlide,
                  onMouseLeave: startAutoSlide,
                }
              : {})}
          >
            {images.length > 0 ? (
              <>
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt={`${currentProject.title} screenshot ${i + 1}`}
                      loading={i === 0 ? "eager" : "lazy"}
                      className={`object-cover hover:scale-105 duration-300 w-full h-70 shrink-0 ${
                        img.imagePos === "top" ? "object-top" : "object-center"
                      }`}
                    />
                  ))}
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      aria-label="Previous screenshot"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md cursor-pointer"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next screenshot"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md cursor-pointer"
                    >
                      <ChevronRight />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-70 flex items-center justify-center bg-gray-100 text-gray-500">
                No images available for this project.
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 w-full lg:w-1/2">
          <h2 className="text-xl font-bold mt-2">Technical Details</h2>
          <p className="text-sm mt-2 max-h-56.25 overflow-y-auto text-gray-500">
            {currentProject.detailedDescription}
          </p>

          <div className="mt-3">
            <h2 className="text-xl font-bold mb-2">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {currentProject.tags.map((tech, idx) => (
                <Badge
                  key={idx}
                  className="font-semibold bg-[#DFEEF6] text-[#57BCEF]"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            {currentProject.visit &&
              (currentProject.visit.startsWith("NDA") ? (
                <Button
                  className="bg-gray-400 cursor-not-allowed shadow-lg shadow-gray-200 text-white font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
                  disabled
                >
                  <EyeClosed /> NDA - Private Deployment
                </Button>
              ) : (
                <Button
                  asChild
                  className="bg-[#13A4EC] hover:bg-blue-500 cursor-pointer shadow-lg shadow-blue-200 text-white font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <a
                    href={currentProject.visit}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Eye /> Live demo
                  </a>
                </Button>
              ))}
            {currentProject.source &&
              (currentProject.source.startsWith("NDA") ? (
                <Button
                  className="bg-gray-400 cursor-not-allowed shadow-lg shadow-gray-200 text-black font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
                  disabled
                >
                  <EyeClosed /> NDA - Private Repository
                </Button>
              ) : (
                <Button
                  asChild
                  className="bg-[#E8EBEE] hover:bg-[#E8EBEE] cursor-pointer shadow-lg shadow-slate-900/15 text-black font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <a
                    href={currentProject.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code /> Source Code
                  </a>
                </Button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
