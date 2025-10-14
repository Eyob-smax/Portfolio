import type { ReactNode } from "react";

export type TCategories =
  | "all"
  | "frontend"
  | "backend"
  | "full-stack"
  | "telegram-bot"
  | ReactNode;

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
  class: TCategories[];
  detailedDescription?: string;
}
