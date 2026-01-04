import { useState, useEffect } from "react";
import { FcApproval } from "react-icons/fc";
import { scrollToSection } from "@/lib/scrollToSection";
import { useIsMobile } from "@/use-mobile";
import { DiGithubBadge } from "react-icons/di";

type THeader = {
  title: string;
  tabLinks: {
    path: string;
    label: string;
  }[];
  type?: "default" | "project";
  githubUsername?: string;
};

type GitHubStats = {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl?: string;
  profileUrl: string;
};

export default function Header({
  title,
  tabLinks,
  type,
  githubUsername = "Eyob-smax",
}: THeader) {
  const isMobile = useIsMobile();
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGithubStats() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${githubUsername}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        setGithubStats({
          username: data.login,
          publicRepos: data.public_repos,
          followers: data.followers,
          following: data.following,
          avatarUrl: data.avatar_url,
          profileUrl: data.html_url,
        });
      } catch (err) {
        console.error("GitHub fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (githubUsername) {
      fetchGithubStats();
    }
  }, [githubUsername]);

  return (
    <header className="w-full text-sm sm:text-lg py-2 bg-[#F6F7F7] flex sm:flex-row items-center px-4 sm:px-8 gap-2 sm:gap-0">
      <div
        onClick={() => scrollToSection("#home")}
        className="flex cursor-pointer items-center gap-2 sm:gap-3"
      >
        <i className="text-2xl">
          <FcApproval />
        </i>
        <h1 className="sm:text-xl font-semibold">{title}</h1>
      </div>

      {!isMobile && (
        <nav className="flex flex-wrap justify-center sm:flex-1 sm:justify-center gap-2 sm:gap-x-8 text-sm sm:text-base font-semibold mt-2 sm:mt-0">
          {tabLinks.map(({ label, path }) => (
            <a
              key={label}
              className="hover:border-b-2 cursor-pointer duration-75 border-black pb-1"
              onClick={() => scrollToSection(path)}
            >
              {label}
            </a>
          ))}
        </nav>
      )}

      {type !== "project" && (
        <div className="flex flex-1 sm:flex-none justify-end items-center mt-2 sm:mt-0">
          <div className="flex items-center gap-3 bg-[#EBEFF3] rounded-full px-4 py-2">
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiGithubBadge className="text-2xl text-gray-800" />
            </a>

            {loading && (
              <span className="text-xs text-gray-600">Loading...</span>
            )}

            {error && <span className="text-xs text-red-600">GitHub</span>}

            {githubStats && (
              <div className="flex items-center gap-4 text-xs sm:text-sm font-medium text-gray-700 hover:border hover:border-gray-400 px-2 py-1 rounded-md">
                <span className="hover:text-[#5c8a84] cursor-pointer ">
                  @{githubStats.username}
                </span>
                <div className="hidden sm:flex items-center gap-3">
                  <span>{githubStats.publicRepos} repos</span>
                  <span>•</span>
                  <span>{githubStats.followers} followers</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
