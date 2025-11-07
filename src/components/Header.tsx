import type { ReactNode } from "react";
import { FcApproval } from "react-icons/fc";
import { Moon } from "lucide-react";
import { scrollToSection } from "@/lib/scrollToSection";

type THeader = {
  title: string;
  tabLinks: {
    path: string;
    label: string;
  }[];
  options?: string | ReactNode;
};

export default function Header({ title, tabLinks }: THeader) {
  return (
    <header className="w-full py-2 bg-[#F6F7F7] flex flex-col sm:flex-row items-center px-4 sm:px-8 gap-2 sm:gap-0">
      <div
        onClick={() => scrollToSection("#home")}
        className="flex cursor-pointer items-center gap-2 sm:gap-3"
      >
        <i className="text-2xl">
          <FcApproval />
        </i>
        <h1 className="text-lg sm:text-xl font-semibold">{title}</h1>
      </div>
      <nav className="flex flex-wrap justify-center sm:flex-1 sm:justify-center gap-2 sm:gap-x-8 text-sm sm:text-base font-semibold mt-2 sm:mt-0">
        {tabLinks.map(({ label, path }) => (
          <a
            key={label}
            className="hover:border-b-2 cursor-pointer duration-75 border-black"
            onClick={() => scrollToSection(path)}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="flex gap-2 sm:gap-3 items-center text-sm sm:text-base font-semibold mt-2 sm:mt-0">
        <div className="rounded-full p-2 bg-[#EBEFF3]">
          <Moon />
        </div>
        <h2 className="truncate max-w-[80px] sm:max-w-[120px]">profile</h2>
      </div>
    </header>
  );
}
