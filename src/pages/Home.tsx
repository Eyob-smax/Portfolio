// Home.jsx

import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useState } from "react";
import profile from "../assets/Profile.jpg";
import { SiTypescript } from "react-icons/si";

export default function Home() {
  const [micHover, setMicHover] = useState(false);
  return (
    <div className="max-h-screen flex flex-col w-full ">
      <div className="flex flex-2/3 w-[84%] mx-auto h-80v justify-between items-center ">
        <div className="w-[60%] pl-12 mt-20">
          <h1 className="text-[55px] font-bold leading-[1.2]">
            HI, I'M EYOB SIMACHEW —{" "}
            <span className="text-[#5c8a84] ">FULL-STACK</span>{" "}
            <SiTypescript className="inline mx-4 text-[#5c8a84] my-auto" />
            DEVELOPER
          </h1>
          <p className=" mt-5">I build stuff for the Web.</p>
          <div className="mt-5 flex gap-5">
            <Button className="bg-[#5c8a84] hover:bg-[#4b7f7a] cursor-pointer shadow-lg shadow-[#4b7f7a] text-white font-semibold">
              Download Resume
            </Button>
            <Button className="bg-[#E2E8F0]  text-black cursor-pointer text-sm font-semibold hover:bg-[#CBD5E1]">
              Contact me
            </Button>
          </div>
        </div>
        <div className=" px-10 flex items-center">
          <div className="rounded-full overflow-hidden border-[#5c8a84] border-4 ">
            <img
              className="zoom-in-50"
              width={250}
              height={250}
              src={profile}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex-1/3">
        <div
          onMouseOver={() => setMicHover(true)}
          onMouseLeave={() => setMicHover(false)}
          className={`bg-[#5c8a84] flex items-center rounded-full p-4 text-white w-fit  fixed bottom-10 right-10 cursor-pointer  shadow-lg shadow-[#4b7f7a] ${
            !micHover && "animate-bounce"
          }`}
        >
          {micHover && <div className="px-3">Ask AI about me</div>}
          <Bot className="size-5" />
        </div>
      </div>
    </div>
  );
}
