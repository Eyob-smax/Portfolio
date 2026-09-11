import type { TCategories } from "@/lib/types";
import { Badge } from "./ui/badge";

export default function SkillCategory({
  category,
  activeTab,
  setActiveTab,
}: {
  category: TCategories[];
  activeTab: TCategories;
  setActiveTab: (tab: TCategories) => void;
}) {
  return (
    // flex-wrap: six tabs in one unwrapping row ran off the side of a phone.
    <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
      {category.map((cat) => (
        /*
         * A real <button>, so the filters are reachable by keyboard — as a
         * <span> with an onClick they could only ever be used with a mouse.
         */
        <button key={cat} type="button" onClick={() => setActiveTab(cat)}>
          <Badge
            className={`cursor-pointer rounded-xl ${
              activeTab === cat
                ? "bg-[#5c8a84] hover:bg-[#5c8a84] text-[#FFFFFF]"
                : "bg-[#E2E8F0] hover:bg-[#E2E8F0] text-black"
            }`}
          >
            {cat}
          </Badge>
        </button>
      ))}
    </div>
  );
}
