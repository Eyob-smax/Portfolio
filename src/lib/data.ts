import DevElevate_HomePage from "@/assets/projects/DevElevate/homePage.jpg";
import DevElvate_AIsection from "@/assets/projects/DevElevate/AiSection.jpg";
import DevElvate_timer from "@/assets/projects/DevElevate/Timer.jpg";

import ExpenseTracker_analytics from "@/assets/projects/expenseTracker/analytics.png";
import ExpenseTracker_editexpense from "@/assets/projects/expenseTracker/EditExpense.png";
import ExpenseTracker_login from "@/assets/projects/expenseTracker/login.png";
import ExpenseTracker_settings from "@/assets/projects/expenseTracker/settings.png";

import GbiGubae_admin from "@/assets/projects/gbigubaeProject/adminPage.png";
import GbiGubae_map from "@/assets/projects/gbigubaeProject/map.png";
import GbiGubae_res from "@/assets/projects/gbigubaeProject/responsibility.png";

import Parcel_home from "@/assets/projects/parcelTracking/homePage.png";
import Parcel_loading from "@/assets/projects/parcelTracking/loading.png";
import Parcel_map from "@/assets/projects/parcelTracking/map.png";
import Parcel_tracker from "@/assets/projects/parcelTracking/tracker.png";

import Podcast_desktop from "@/assets/projects/podcastPlayer/desktopHomePage.png";
import Podcast_listen from "@/assets/projects/podcastPlayer/listenPage.png";
import Podcast_search from "@/assets/projects/podcastPlayer/searchResults.png";

import Eccomerce_collections from "@/assets/projects/SimpleEcommerce/collectionsPage.png";
import Eccomerce_main from "@/assets/projects/SimpleEcommerce/mainPage.png";
import Eccomerce_subscribe from "@/assets/projects/SimpleEcommerce/subscribe.png";

import VTT_logo from "@/assets/projects/VoiceToText/logo.png";
import VTT_start from "@/assets/projects/VoiceToText/startPage.png";
import VTT_trans1 from "@/assets/projects/VoiceToText/transcribed1.png";
import VTT_trans2 from "@/assets/projects/VoiceToText/transcribed2.png";

import YT_down1 from "@/assets/projects/youtubeVideoDowloader/downloader1.png";
import YT_down2 from "@/assets/projects/youtubeVideoDowloader/downloader2.png";
import YT_down3 from "@/assets/projects/youtubeVideoDowloader/downloader3.png";
import type { IProjects } from "@/lib/types";

export const projects: IProjects[] = [
  {
    title: "Parcel Tracking System",
    description:
      "United Parcel Service is a complete parcel management platform built for a client who needed a smart way to track and manage shipments. It allows users to create new parcels, monitor delivery progress, update shipment status, and view parcel details through a clean and responsive dashboard.",
    image: [
      { url: Parcel_home, imagePos: "top" },
      { url: Parcel_loading, imagePos: "top" },
      { url: Parcel_map, imagePos: "top" },
      { url: Parcel_tracker, imagePos: "top" },
    ],
    class: ["full-stack"],
    tags: ["React", "Supabase", "TypeScript", "TailwindCSS", "Shadcn UI"],
    source: "https://github.com/Eyob-smax/United-parcel-service",
    visit: "https://united-parcel-service.vercel.app/",
  },

  {
    title: "Expense Tracker",
    description:
      "A web application to track personal expenses and manage budgets effectively and with an analytics dashboard.",
    image: [
      { url: ExpenseTracker_analytics, imagePos: "top" },
      { url: ExpenseTracker_editexpense, imagePos: "top" },
      { url: ExpenseTracker_login, imagePos: "top" },
      { url: ExpenseTracker_settings, imagePos: "top" },
    ],
    class: ["frontend"],
    tags: ["React", "TypeScript", "CSS", "Tailwind", "Supabase", "Redux"],
    source: "https://github.com/Eyob-smax/Expense-Tracker",
    visit: "https://expense-tracker-one-taupe.vercel.app/",
  },
  {
    title: "Gbi Gubae Portal",
    description:
      "A web application for managing and tracking student registration within the Gbi Gubae community.",
    image: [
      { url: GbiGubae_admin, imagePos: "top" },
      { url: GbiGubae_map, imagePos: "top" },
      { url: GbiGubae_res, imagePos: "top" },
    ],
    class: ["full-stack", "backend"],
    tags: [
      "Node",
      "ExpressJS",
      "Postgres",
      "Supabase",
      "Prisma",
      "React",
      "TypeScript",
      "Tailwind",
    ],
    source: "https://github.com/Eyob-smax/gbi-gubae-portal",
    visit: "https://6kilogbigubae.vercel.app/",
  },
  {
    title: "DevElevate | Productivity App for Devs",
    description:
      "DevElevate is an advanced AI-powered productivity web application designed to optimize the developer workflow.",
    image: [
      { url: DevElvate_timer, imagePos: "center" },
      { url: DevElevate_HomePage, imagePos: "center" },
      { url: DevElvate_AIsection, imagePos: "center" },
    ],
    class: ["full-stack", "frontend", "backend"],
    tags: ["JS", "HTML", "CSS", "MongoDB", "TailwindCSS"],
    source: "https://github.com/Eyob-smax/DevElevate",
    visit: "https://dev-elevate-ruddy.vercel.app/",
  },

  {
    title: "Podcast Player",
    description:
      "SpaceCast is a Progressive Web App (PWA) podcast player built with Vanilla JavaScript, Node.js, and Express. Originally inspired by a childhood passion for astronomy and space, this app allows users to explore and listen to podcasts from a vast library of over 4,000,000 podcasts indexed via a powerful podcast API.",
    image: [
      { url: Podcast_desktop, imagePos: "top" },
      { url: Podcast_listen, imagePos: "top" },
      { url: Podcast_search, imagePos: "top" },
    ],
    class: ["frontend"],
    tags: ["NodeJS", "VanillaJS", "HTML", "CSS"],
    source: "https://github.com/Eyob-smax/SpaceCast-podcastApp",
    visit: "https://spacecast-podcastapp.onrender.com/",
  },
  {
    title: "Simple E-commerce Site",
    description:
      "A web application for buying and selling products with a user-friendly interface.",
    image: [
      { url: Eccomerce_collections, imagePos: "top" },
      { url: Eccomerce_main, imagePos: "top" },
      { url: Eccomerce_subscribe, imagePos: "top" },
    ],
    class: ["frontend"],
    tags: ["HTML", "JS", "CSS"],
    source:
      "https://github.com/Eyob-smax/United-parcel-service/tree/main/project",
    visit: "https://project-ards.vercel.app/",
  },
  {
    title: "Voice to Text Converter",
    description:
      "Voice Transcriber Bot is a Telegram bot that automatically converts voice messages into text | I created this bot after a funny real-life moment: while I was in class and couldn’t listen to a friend’s voice message, I decided to build a bot that could do it for me 😄",
    image: [
      { url: VTT_logo, imagePos: "top" },
      { url: VTT_start, imagePos: "top" },
      { url: VTT_trans1, imagePos: "top" },
      { url: VTT_trans2, imagePos: "top" },
    ],
    class: ["telegram-bot"],
    tags: [
      "NodeJS",
      "ExpressJS",
      "Telegraf",
      "SpeechRecognition",
      "AssemblyAI",
    ],
    source: "https://github.com/Eyob-smax/Voice_To_Text-Bot",
    visit: "https://voice-to-text-bot.vercel.app/",
  },
  {
    title: "YouTube Video Downloader",
    description:
      "A high-performance Telegram bot for downloading videos and extracting audio from TikTok, YouTube, Instagram, and more - in bulk or single files!",
    image: [
      { url: YT_down1, imagePos: "top" },
      { url: YT_down2, imagePos: "top" },
      { url: YT_down3, imagePos: "top" },
    ],
    class: ["telegram-bot"],
    tags: ["NodeJS", "ExpressJS", "Telegraf", "ytdl-core"],
    source: "https://github.com/Eyob-smax/Media-Downloader-bot",
    visit: "https://media-downloader-bot.vercel.app/",
  },
];

export const TimeLineData = [
  { year: 2019, text: "Started my journey as a developer." },
  { year: 2020, text: "Worked as a freelance developer." },
  { year: 2021, text: "Founded JavaScript Mastery." },
  { year: 2022, text: "Shared my projects with the world." },
  { year: 2023, text: "Started my own platform." },
];

import {
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiNestjs,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiDocker,
  SiGithubactions,
  SiGit,
  SiVercel,
  SiGithub,
  SiPostman,
  SiFigma,
  SiPrettier,
  SiSupabase,
} from "react-icons/si";

import { DiNodejsSmall, DiChrome, DiReact } from "react-icons/di";
import { Zap } from "lucide-react";

export const tech_stack = [
  {
    category: "Frontend",
    skills: [
      { name: "JavaScript", icon: SiJavascript, proficiency: "Proficient" },
      { name: "TypeScript", icon: SiTypescript, proficiency: "Proficient" },
      { name: "React", icon: DiReact, proficiency: "Intermediate" },
      { name: "Tailwind CSS", icon: SiTailwindcss, proficiency: "Proficient" },
      { name: "Redux", icon: SiRedux, proficiency: "Intermediate" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: DiNodejsSmall, proficiency: "Proficient" },
      { name: "Express.js", icon: SiExpress, proficiency: "Proficient" },
      { name: "NestJS", icon: SiNestjs, proficiency: "Intermediate" },
      { name: "Supabase", icon: SiSupabase, proficiency: "Proficient" },
      { name: "PostgreSQL", icon: SiPostgresql, proficiency: "Intermediate" },
      { name: "MongoDB", icon: SiMongodb, proficiency: "Intermediate" },
      { name: "Redis", icon: SiRedis, proficiency: "Proficient" },
      { name: "GraphQL", icon: SiGraphql, proficiency: "Intermediate" },
      {
        name: "Socket.IO",
        icon: Zap,
        proficiency: "Intermediate",
      },
    ],
  },
  {
    category: "DevOps / Deployment",
    skills: [
      { name: "Docker", icon: SiDocker, proficiency: "Intermediate" },
      { name: "Vercel", icon: SiVercel, proficiency: "Proficient" },
      {
        name: "GitHub Actions",
        icon: SiGithubactions,
        proficiency: "Learning",
      },
    ],
  },
  {
    category: "Version Control / Collaboration",
    skills: [
      { name: "Git", icon: SiGit, proficiency: "Proficient" },
      { name: "GitHub", icon: SiGithub, proficiency: "Proficient" },
    ],
  },
  {
    category: "Tools / Utilities",
    skills: [
      { name: "VS Code", icon: SiPrettier, proficiency: "Proficient" },
      { name: "Postman", icon: SiPostman, proficiency: "Proficient" },
      { name: "Figma", icon: SiFigma, proficiency: "Intermediate" },
      { name: "Chrome DevTools", icon: DiChrome, proficiency: "Proficient" },
    ],
  },
];
