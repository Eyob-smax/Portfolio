import type { ReactNode } from "react";
import { FcApproval } from "react-icons/fc";
import { Moon } from "lucide-react";
import { scrollToSection } from "@/lib/scrollToSection";
import { useIsMobile } from "@/use-mobile";

type THeader = {
  title: string;
  tabLinks: {
    path: string;
    label: string;
  }[];
  options?: string | ReactNode;
  type?: "default" | "project";
};

export default function Header({ title, tabLinks, type }: THeader) {
  const isMobile = useIsMobile();

  return (
    <header className="w-full text-sm sm:text-lg py-2 bg-[#F6F7F7] flex sm:flex-row items-center px-4 sm:px-8 gap-2 sm:gap-0">
      <div
        onClick={() => scrollToSection("#home")}
        className="flex cursor-pointer items-center gap-2 sm:gap-3"
      >
        <i className="text-2xl">
          <FcApproval />
        </i>
        <h1 className={`sm:text-xl font-semibold`}>{title}</h1>
      </div>
      {!isMobile && (
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
      )}
      {type !== "project" && (
        <div className="flex flex-1 sm:flex-none justify-end gap-2 sm:gap-3 items-center text-sm sm:text-base font-semibold mt-2 sm:mt-0">
          <div className="rounded-full p-2 bg-[#EBEFF3]">
            <Moon />
          </div>
        </div>
      )}
    </header>
  );
}
