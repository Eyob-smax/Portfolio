import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useState } from "react";
import profile from "../assets/Profile.jpg";
import { SiTypescript } from "react-icons/si";

export default function Home() {
  const [micHover, setMicHover] = useState(false);

  return (
    <div className="flex flex-col w-[85%] mx-auto min-h-screen">
      <div className="flex flex-col-reverse lg:flex-row w-full max-w-6xl mx-auto items-center lg:justify-between px-4 py-12 gap-10">
        <div className="lg:w-2/3 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-snug">
            HI, I'M EYOB SIMACHEW —{" "}
            <span className="text-[#5c8a84]">FULL-STACK</span>{" "}
            <SiTypescript className="inline mx-2 text-[#5c8a84] text-4xl md:text-5xl" />
            DEVELOPER
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl">
            I build stuff for the Web.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button className="bg-[#5c8a84] hover:bg-[#4b7f7a] shadow-lg shadow-[#4b7f7a] text-white font-semibold">
              Download Resume
            </Button>
            <Button className="bg-[#E2E8F0] text-black hover:bg-[#CBD5E1] font-semibold">
              Contact me
            </Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="rounded-full overflow-hidden border-4 border-[#5c8a84] w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
            <img
              className="w-full h-full object-cover"
              src={profile}
              alt="Profile"
            />
          </div>
        </div>
      </div>
      <div
        onMouseOver={() => setMicHover(true)}
        onMouseLeave={() => setMicHover(false)}
        className={`bg-[#5c8a84] flex items-center rounded-full p-3 text-white fixed bottom-5 right-5 cursor-pointer shadow-lg shadow-[#4b7f7a] transition-all duration-300 ${
          !micHover ? "animate-bounce" : "w-auto"
        }`}
      >
        {micHover && (
          <div className="px-3 text-sm sm:text-base">Ask AI about me</div>
        )}
        <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
    </div>
  );
}
