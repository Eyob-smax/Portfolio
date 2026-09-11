/*
 * The union used to end in `| ReactNode`, which absorbed every other member —
 * ReactNode includes `string`, so the type checked nothing and the
 * "library/tools" tab (missing from the list entirely) went unnoticed.
 */
export type TCategories =
  | "all"
  | "frontend"
  | "backend"
  | "full-stack"
  | "telegram-bot"
  | "library/tools";

export type TTechnologies = {
  name: string;
  icon: string;
};

export interface IProjects {
  title: string;
  description: string;
  image: { url: string; imagePos?: string }[];
  tags: string[];
  source: string;
  visit: string;
  /**
   * Free-form descriptors, a superset of `TCategories`.
   *
   * Only the entries that match a tab are filterable; the rest ("saas",
   * "healthtech", "node") are there to describe the project. A project with no
   * `TCategories` member in this list shows up under "all" and nowhere else,
   * which is how ArifQueue came to be invisible on every other tab.
   */
  class: string[];
  detailedDescription?: string;
}
