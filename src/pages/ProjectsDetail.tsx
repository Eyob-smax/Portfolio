import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import homeShipmentTracker from "@/assets/projects/DevElevate/homePage.jpg";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default function ProjectsDetail() {
  const images = [
    homeShipmentTracker,
    homeShipmentTracker,
    homeShipmentTracker,
    homeShipmentTracker,
    homeShipmentTracker,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current!);
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
  };

  const handleNext = () => {
    clearInterval(intervalRef.current!);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    startAutoSlide();
  };

  const handlePrev = () => {
    clearInterval(intervalRef.current!);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    startAutoSlide();
  };

  return (
    <section className="relative inset-0 max-h-screen bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] bg-[#F6F7F8] flex flex-col w-full">
      <Header title="Eyob Simachew | Shipment Tracker" tabLinks={[]} />

      <Link
        to={"/#projects"}
        className="flex items-center text-sm text-gray-500 mb-2 px-30 hover:underline justify-start"
      >
        <ArrowLeft /> Back to projects
      </Link>

      <div className="flex items-start justify-center flex-1 px-4 sm:px-6 lg:px-8 pb-4 w-[85%] mx-auto gap-10">
        {/* Left Section */}
        <div className="flex-1/2 gap-x-10 mr-10">
          <h1 className="text-2xl font-bold">Shipment Tracker</h1>
          <p className="text-[15px] mt-5 text-gray-500 max-h-[120px] overflow-y-scroll pr-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure,
            minus quod laborum recusandae accusamus, totam quisquam porro
            officia, soluta cum placeat mollitia eligendi itaque ducimus libero.
            Et eveniet magnam nostrum repellat nihil? Excepturi impedit nisi
            dicta omnis. Nobis, impedit commodi?
          </p>

          {/* Image Carousel */}
          <div
            className="relative flex justify-center items-center mt-5 overflow-hidden w-[100%] max-h-[270px] rounded-lg border border-gray-300 shadow-lg"
            onMouseEnter={() => clearInterval(intervalRef.current!)}
            onMouseLeave={startAutoSlide}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Slide ${i}`}
                  className="object-cover hover:scale-110 duration-300 w-full h-[280px] flex-shrink-0 object-top"
                />
              ))}
            </div>{" "}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="flex-1/2">
          <h2 className="text-1.5xl mt-4 font-bold">Technical Details</h2>
          <p className="text-[15px] mt-3 max-h-[225px] overflow-y-scroll text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
            commodi voluptate, modi eos totam consequuntur aut ratione est,
            omnis odit exercitationem quod deleniti! Enim, eveniet optio id odio
            numquam repellendus velit dolores tenetur adipisci, ducimus
            aspernatur. Excepturi amet, sint quo reprehenderit cupiditate
            ratione quam, nostrum error maiores quis voluptas, exercitationem
            suscipit et. Vitae, reiciendis libero magnam animi magni ipsam quis
            illo nam consequuntur inventore aliquid corporis, maxime tenetur
            necessitatibus doloremque itaque obcaecati ab ducimus, deserunt id
            tempore quae possimus illum.
          </p>

          <div className="mt-3">
            <h2 className="text-1.5xl font-bold my-3">Technologies Used</h2>
            <div className="flex flex-wrap">
              {["React", "Supabase", "TailwindCSS"].map((tech, idx) => (
                <Badge
                  key={idx}
                  className="mr-2 mb-2 font-semibold bg-[#DFEEF6] text-[#57BCEF]"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <Button className="bg-[#13A4EC] hover:bg-blue-500 cursor-pointer shadow-lg shadow-blue-200 text-white font-semibold flex items-center gap-2">
              <Eye /> Live demo
            </Button>
            <Button className="bg-[#E8EBEE] hover:bg-[#E8EBEE] cursor-pointer shadow-lg shadow-slate-900/15 text-black font-semibold flex items-center gap-2">
              <Code /> Source Code
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
