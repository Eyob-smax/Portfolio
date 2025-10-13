import type { ReactNode } from "react";
import { FcApproval } from "react-icons/fc";
import { Moon } from "lucide-react";

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
    <header className="w-full py-[8px] bg-[#F6F7F7] flex items-center px-[29px]">
      <div className="flex items-center gap-3">
        <i className="text-2xl">
          <FcApproval />
        </i>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="font-semibold text-sm gap-x-10 flex-1 flex items-center justify-center">
        {tabLinks.map(({ label, path }) => (
          <a
            key={label}
            className="hover:border-b-2 duration-75 animate-pulse border-black"
            href={path}
          >
            {label}
          </a>
        ))}
      </div>
      <div className="flex gap-x-3 items-center text-sm font-semibold">
        <div className="rounded-full p-2 bg-[#EBEFF3]">
          <Moon />
        </div>
        <h2>profile</h2>
      </div>
    </header>
  );
}
