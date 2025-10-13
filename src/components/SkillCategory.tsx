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
    <div className="mt-4 flex items-center justify-center gap-3">
      {category.map((cat, index) => (
        <Badge
          key={index}
          className={`bg-[#E2E8F0] cursor-default text-black rounded-xl hover:bg-[#E2E8F0]  ${
            activeTab === cat
              ? "bg-[#5c8a84] hover:bg-[#5c8a84] text-[#FFFFFF]"
              : ""
          }`}
          onClick={() => setActiveTab(cat)}
        >
          {cat}
        </Badge>
      ))}
    </div>
  );
}
