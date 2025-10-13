import React from "react";
import { Palette, Server, Hammer } from "lucide-react";
import { tech_stack } from "@/lib/data";

interface SkillCardProps {
  icon: React.ElementType;
  title: string;
  level: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon: Icon, title, level }) => (
  <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-[#d4e2e1] bg-[#f9fbfb] p-5 shadow-sm hover:shadow-md transition-shadow min-w-[200px]">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-[#e6f1f0] text-[#101817]">
        <Icon size={20} />
      </div>
      <div>
        <h2 className="text-[#101817] text-base font-semibold">{title}</h2>
        <p className="text-[#5c8a84] text-sm">{level}</p>
      </div>
    </div>
  </div>
);

const TechPortfolio: React.FC = () => {
  return (
    <div
      className="flex h-auto min-h-screen w-full flex-col overflow-x-hidden px-4 sm:px-8"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      <main className="py-12 mt-10 gap-8 mx-auto w-full max-w-[1200px] flex flex-col">
        <section>
          <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#101817] mb-6">
            Tech Stack & Tools
          </h1>

          {tech_stack.map((category) => (
            <div key={category.category} className="mb-10">
              <h2 className="text-xl font-semibold text-[#101817] mb-4 flex items-center gap-2">
                {category.category === "Frontend" && (
                  <Palette size={18} className="text-[#5c8a84]" />
                )}
                {category.category === "Backend" && (
                  <Server size={18} className="text-[#5c8a84]" />
                )}
                {category.category.includes("Tool") && (
                  <Hammer size={18} className="text-[#5c8a84]" />
                )}
                {category.category}
              </h2>
              <div className="flex flex-wrap gap-5">
                {category.skills.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    icon={skill.icon}
                    title={skill.name}
                    level={skill.proficiency}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TechPortfolio;
