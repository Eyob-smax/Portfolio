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
import HasabSdk from "@/assets/projects/hasab-sdk/main.png";
import HasabSdk_Code from "@/assets/projects/hasab-sdk/code.png";
import HasabSdk_Downloads from "@/assets/projects/hasab-sdk/downloads.png";
import CodStat from "@/assets/projects/cod-stat/main.png";
import CodStat_Code from "@/assets/projects/cod-stat/code.png";
import CodStat_Downloads from "@/assets/projects/cod-stat/condstat-downlods.png";
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
    tags: [
      "React",
      "Supabase",
      "TypeScript",
      "TailwindCSS",
      "Shadcn UI",
      "Redux",
    ],
    source: "https://github.com/Eyob-smax/United-parcel-service",
    visit: "https://united-parcel-service.vercel.app/",
    detailedDescription: `United Parcel Service
United Parcel Service is a modern, web-based parcel tracking and management system built to streamline logistics operations for businesses and clients. The platform enables users to create, monitor, and manage parcels in real time, featuring a clean and intuitive interface that enhances user experience and operational efficiency.

Designed with a focus on performance, reliability, and automation, the system supports end-to-end parcel workflows—from creation and status updates to real-time tracking and detailed shipment management. It also includes role-based authentication for senders, couriers, and admins, ensuring secure and organized control over every delivery process.

With a responsive design, dynamic API integration, and smooth dashboard interaction, this project demonstrates my expertise in React.js, Next.js, Tailwind CSS, Node.js, and MongoDB, blending both frontend and backend development to deliver a complete and production-ready solution.`,
  },
  {
    title: "HasabClient SDK",
    description:
      "A TypeScript SDK for the Hasab AI API, enabling easy integration of chat, transcription, translation, and text-to-speech features — especially powerful for local languages like Amharic. Built to simplify interaction with Hasab AI's high-quality voice and text models.",
    image: [
      { url: HasabSdk, imagePos: "top" },
      { url: HasabSdk_Code, imagePos: "top" },
      { url: HasabSdk_Downloads, imagePos: "top" },
    ],
    class: ["library/tools", "sdk", "typescript"],
    tags: [
      "TypeScript",
      "Node.js",
      "API Client",
      "Streaming",
      "Axios",
      "AI Integration",
      "Hasab AI",
    ],
    source: "https://www.npmjs.com/package/hasab-sdk",
    visit: "https://github.com/Eyob-smax/hasab_sdk",
    detailedDescription: `HasabClient SDK
HasabClient SDK is a modern, type-safe TypeScript library designed to make integration with the Hasab AI API simple and reliable. It provides a clean interface for four core AI capabilities: chat completions, audio transcription, text translation, and high-quality text-to-speech synthesis — with special strength in supporting local languages such as Amharic.

Motivated by the impressive voice and text quality of Hasab AI for under-resourced languages, I created this SDK to remove the friction of working directly with raw API calls. Developers can now quickly add AI-powered chat, voice input/output, and translation features to their Node.js applications.

Key features include:
• Synchronous and streaming chat responses
• Audio file transcription with history
• Text translation with language detection
• TTS synthesis (base64 & streaming) with speaker selection
• History, analytics, and record management for TTS
• Robust error handling with custom error classes
• Support for file uploads via Buffer, path, or Blob

The library is built with developer experience in mind: clear TypeScript types, consistent response shapes, and easy streaming integration using Node.js streams. It serves as a community tool to help more developers leverage Hasab AI’s capabilities in real-world applications.

This project demonstrates my skills in API client design, TypeScript, streaming data handling, file uploads, and creating developer-friendly libraries.`,
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
    tags: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Supabase",
      "Redux",
      "ShadcnUI",
    ],
    source: "https://github.com/Eyob-smax/Expense-Tracker",
    visit: "https://expense-tracker-one-taupe.vercel.app/",
    detailedDescription: `Expense Tracker — Simplify Your Finances

Expense Tracker is a lightweight, web-based finance management app that helps users track, categorize, and visualize their daily expenses effortlessly. Designed with simplicity and efficiency in mind, it enables users to log transactions, organize spending by category, and generate insightful reports through interactive charts and summaries.

Built using HTML, CSS, and JavaScript (ES6+), the app stores data securely in localStorage, ensuring data privacy and offline accessibility. The UI focuses on clarity and usability, featuring intuitive navigation, responsive layouts, and optional dark mode for a better visual experience.

From budget alerts to spending visualizations powered by Chart.js, this project demonstrates a solid understanding of DOM manipulation, local data persistence, and clean UI design principles. It’s optimized for performance and easy to extend with future enhancements like cloud sync or authentication.

This project showcases both technical craftsmanship and a strong emphasis on user-centered functionality, making personal finance management simple yet powerful.`,
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
      "NodeJS",
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
    detailedDescription: `፮ኪሎ ግቢ ጉባኤ — 6 Kilo Gibi Gubae

6 Kilo Gibi Gubae is a demo web application that showcases a modern, responsive dashboard designed for community, event, and parcel management workflows. It combines a clean, user-friendly interface with practical CRUD functionality — allowing users to create, update, delete, and track items such as parcels or events through a structured, interactive dashboard.

Built with React (or Next.js) and Tailwind CSS, the app demonstrates best practices in component-based architecture, state management (Redux Toolkit or Context API), and API-driven design. It includes intuitive features like search and filter, status tracking timelines, and confirmation dialogs, all optimized for accessibility and mobile responsiveness.

The project emphasizes clarity, usability, and performance, making it a perfect example of how design and development can merge to create a professional management UI. With seamless deployment on Vercel, API-ready components, and a visually consistent dashboard, 6 Kilo Gibi Gubae reflects a strong command of frontend development and UX principles.`,
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
    detailedDescription: `DevElevate — AI-Powered Developer Productivity Hub

DevElevate is an AI-driven productivity web app designed to help developers streamline their workflow, enhance learning, and stay organized. Built as a mobile-friendly Progressive Web App (PWA), it integrates essential tools—AI-generated coding questions, intelligent explanations, note-taking, task management, and a Pomodoro timer—into one cohesive platform.

The application leverages the Gemini API, fine-tuned through Google AI Studio, to deliver context-aware programming questions, explanations, and test cases without complex prompts. Its modular architecture mimics microservice principles, ensuring that each tool functions independently yet contributes to a unified developer experience.

On the technical side, DevElevate is developed using TypeScript, Vanilla JavaScript, HTML, and Tailwind CSS for a clean, responsive UI, while Node.js, Express, and MongoDB power the backend. The app also implements secure authentication with Passport.js and Cookie-Session, ensuring smooth login and data protection.

As a PWA, it supports offline functionality for core features and can be installed directly on mobile devices—allowing developers to stay productive anywhere. The project reflects strong skills in AI integration, full-stack JavaScript development, and UI/UX optimization, demonstrating how technology and usability can merge to create a seamless developer experience.`,
  },

  {
    title: "Cod Stat",
    description:
      "A powerful and configurable Node.js command-line tool for analyzing source code statistics. It provides insights into line counts, code density, function complexity, largest files, and more — supporting multiple languages and ideal for personal projects or CI/CD integration.",
    image: [
      // Replace with your actual screenshots (e.g., terminal outputs, tables, progress bar)
      { url: CodStat_Code, imagePos: "top" },
      { url: CodStat_Downloads, imagePos: "top" },
      { url: CodStat, imagePos: "top" },
    ],
    class: ["library/tools", "tool", "node"],
    tags: [
      "Node.js",
      "TypeScript",
      "CLI",
      "Commander.js",
      "Chalk",
      "Progress Bar",
      "Code Analysis",
      "Code Metrics",
    ],
    source: "https://www.npmjs.com/package/cod-stat",
    visit: "https://github.com/Eyob-smax/cod-stat", // Update if you add npm package or demo
    detailedDescription: `Cod Stat
Cod Stat is a fast, colorful, and highly configurable command-line tool built with Node.js to help developers gain deep insights into their codebase. It scans directories recursively, analyzes files across multiple programming languages, and delivers clear metrics on code quality, structure, and complexity.

Perfect for solo developers reviewing personal projects, teams enforcing code standards, or integrating into CI/CD pipelines to track codebase health over time.

Key features include:
• Detailed line counting (total, code, blanks, comments) with code density calculation
• Function/method counting and average length analysis
• Rough complexity estimation based on control-flow keywords
• Support for 15+ programming languages and common config/markup files
• Filters for code-only or config-only scans
• Top N largest files identification
• Interactive progress bar for large repositories
• Pretty colored table output or JSON export for automation
• Custom ignore directories and language filtering

The tool uses modern Node.js libraries like Commander for argument parsing, Chalk for vibrant terminal colors, and Cli-table for beautiful outputs — delivering a polished and intuitive user experience right in the terminal.

This project showcases my expertise in building developer tools, CLI design, file system traversal, language-aware parsing, and creating reusable, production-ready Node.js packages.`,
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
    detailedDescription: `SpaceCast — The Universe of Podcasts in Your Pocket

SpaceCast is an advanced Progressive Web App (PWA) podcast player that combines modern web technology with a passion for exploration and discovery. Originally inspired by a love for astronomy and space, SpaceCast has evolved into a versatile platform for discovering, streaming, and managing podcasts across every genre.

The app is built using Vanilla JavaScript, Node.js, and Express, showcasing efficient state management, API integration, and server-side proxying to handle over 4 million podcasts from the Podcast Index API. It uses lazy loading for performance optimization and service workers for offline functionality, ensuring users can enjoy seamless playback even without an internet connection.

With its responsive and user-friendly design, SpaceCast delivers a native app-like experience on any device. It also employs crypto libraries to enhance data security and speed, while its PWA capabilities make it installable on both desktop and mobile platforms.

From searching and streaming podcasts to downloading and listening offline, SpaceCast demonstrates a deep understanding of modern web development, UX design, and performance optimization, all wrapped in a clean, immersive interface.`,
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
    detailedDescription: `
🛒 Simple E-commerce Site — Shop with Ease

This Simple E-commerce Site is a web application designed to provide a seamless online shopping experience with a clean, intuitive interface. Users can browse product collections, view detailed product pages, add items to their cart, and subscribe to newsletters, all within a responsive and user-friendly layout.

Built with HTML, CSS, and JavaScript, the project emphasizes **interactive UI elements**, smooth navigation, and modern design practices. It demonstrates core frontend development skills, including **DOM manipulation, responsive design with Flexbox/Grid**, and basic **form handling** for subscriptions and purchases.

The project showcases an understanding of **user-centered design principles**, creating a shopping platform that is both visually appealing and highly functional. It’s optimized for performance and accessibility, making it an excellent example of a beginner-to-intermediate web development project.
`,
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
    visit: "https://t.me/voice_T_text_bot/",
    detailedDescription: `Voice Transcriber Bot — Turn Voice Messages into Instant Text

Voice Transcriber Bot is a Telegram-based automation tool that instantly converts voice messages into text, making communication effortless even when users can’t listen to audio. Designed for convenience and real-world practicality, it provides fast, reliable, and privacy-friendly transcription powered by modern AI.

Built with Node.js, Express, and Telegraf, and integrated with AssemblyAI’s speech-to-text API, the bot processes voice messages in real time and returns accurate transcriptions directly inside Telegram chats. Deployed on Vercel using webhooks, it ensures smooth, low-latency performance without requiring traditional server infrastructure.

The project highlights strong skills in API integration, asynchronous JavaScript, and serverless deployment, all wrapped in a lightweight architecture focused on speed and security. No audio data is stored permanently — everything runs in-memory to protect user privacy.

This bot demonstrates both technical depth and creative problem-solving, turning an everyday inconvenience into an intelligent automation solution. It represents a blend of AI integration, backend logic, and user-focused design — showing how technology can simplify real-life communication.`,
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
    visit: "https://t.me/yt_video_dowloader_bot/",
    detailedDescription: `Turbo Social Media Downloader Bot — Fast, Reliable, and Scalable

Turbo Social Media Downloader Bot is a high-performance Telegram bot designed to download and convert media from major social platforms like TikTok, YouTube, Instagram, Facebook, and Twitter. Built with Node.js and the Telegram Bot API, it enables users to download videos or extract audio—individually or in bulk—with lightning-fast performance.

The bot’s architecture focuses on speed, scalability, and reliability, featuring parallel downloads using child processes, and a robust queue system to manage large batches without overloading the system. It integrates yt-dlp for versatile platform support, ensuring users receive original-quality media with minimal processing time.

Technically, it’s powered by Node.js, leveraging asynchronous event-driven programming for efficient handling of multiple concurrent downloads. The design ensures smooth user interaction within Telegram, and flexible configuration via environment variables for easy setup and deployment.

Whether for content creators, archivists, or casual users, Turbo Downloader Bot simplifies bulk video and audio saving into a single, automated command system, combining performance with simplicity and modern backend engineering principles.`,
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
