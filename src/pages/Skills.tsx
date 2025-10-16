import React from "react";
import { Palette, Server, Hammer } from "lucide-react";
import { tech_stack } from "@/lib/data";
import { motion } from "motion/react";

interface SkillCardProps {
  icon: React.ElementType;
  title: string;
  level: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon: Icon, title, level }) => (
  <motion.div
    className="flex flex-1 flex-col gap-3 rounded-2xl border border-[#d4e2e1] bg-[#f9fbfb] p-3 text-sm shadow-sm min-w-[180px]"
    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-[#e6f1f0] text-[#101817]">
        <Icon size={17} />
      </div>
      <div>
        <h2 className="text-[#101817] text-sm font-semibold">{title}</h2>
        <p className="text-[#5c8a84] text-sm">{level}</p>
      </div>
    </div>
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 10 },
  },
};

const TechPortfolio: React.FC = () => {
  return (
    <div
      className="flex h-auto min-h-screen w-[85%] mx-auto flex-col overflow-x-hidden px-4 sm:px-8"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      <main className="py-5 mt-8 gap-8 mx-auto w-full max-w-[1200px] flex flex-col">
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
              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, rotate: 2 }}
                    whileTap={{ scale: 0.95, rotate: 0 }}
                  >
                    <SkillCard
                      icon={skill.icon}
                      title={skill.name}
                      level={skill.proficiency}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TechPortfolio;
