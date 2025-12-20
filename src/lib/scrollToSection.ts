export const scrollToSection = (sectionId: string) => {
  const section = document.querySelector(sectionId);
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth", block: "start" });
};
