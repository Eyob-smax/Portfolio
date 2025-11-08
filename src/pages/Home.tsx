import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import profile from "../assets/Profile.jpg";
import { SiTypescript } from "react-icons/si";
import { motion } from "motion/react";
import AISection from "./AiSection";
import { scrollToSection } from "@/lib/scrollToSection";
import Notice from "@/components/Notice";
import { useIsMobile } from "@/use-mobile";

export type TConversation = {
  message: string;
  type: "user" | "ai";
  id: string;
};

const TIMEOUT_DURATION = 7000;
const COOKIE_EXPIRE_MINUTES = 30;

const setCookie = (name: string, value: string, minutes: number) => {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
};

export default function Home() {
  const [micHover, setMicHover] = useState(false);
  const [showAISection, setShowAISection] = useState(false);
  const [conversations, setConversations] = useState<TConversation[] | null>(
    null
  );
  const [showNotice, setShowNotice] = useState(false);
  const isMobile = useIsMobile();

  const aiSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        aiSectionRef.current &&
        !aiSectionRef.current.contains(event.target as Node)
      ) {
        setShowAISection(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const hasSeenNotice = getCookie("hasSeenNotice");

    if (!hasSeenNotice) {
      setShowNotice(true);
      setCookie("hasSeenNotice", "true", COOKIE_EXPIRE_MINUTES);

      const timer = setTimeout(() => {
        setShowNotice(false);
      }, TIMEOUT_DURATION);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <div
        id="home"
        className="flex relative flex-col w-[85%] mx-auto max-h-screen"
      >
        <div className="flex flex-col-reverse lg:flex-row w-full max-w-6xl mx-auto items-center lg:justify-between px-4 py-12 gap-10">
          <div className="lg:w-2/3 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-snug">
              HI, I'M EYOB SIMACHEW —{" "}
              <span className="text-[#5c8a84]">FULL-STACK</span>{" "}
              <SiTypescript className="inline mx-2 text-[#5c8a84] text-4xl md:text-5xl" />{" "}
              DEVELOPER
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl">
              I build stuff for the Web.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-[#5c8a84] hover:bg-[#4b7f7a] shadow-lg shadow-[#4b7f7a] text-white font-semibold">
                <a href="/Resume.pdf" download="Eyob_Simachew_Resume.pdf">
                  Download Resume
                </a>
              </Button>
              <Button
                onClick={() => scrollToSection("#contact")}
                className="bg-[#E2E8F0] text-black hover:bg-[#CBD5E1] font-semibold"
              >
                Contact me
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex justify-center lg:justify-end">
              <div className="rounded-full overflow-hidden border-4 border-[#5c8a84] w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                <img
                  className="w-full h-full object-cover"
                  src={profile}
                  alt="Eyob Simachew - Full Stack Developer"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {!showAISection && (
          <div
            onClick={() => setShowAISection(true)}
            onMouseOver={() => setMicHover(true)}
            onMouseLeave={() => setMicHover(false)}
            onTouchStart={() => isMobile && setMicHover(true)}
            onTouchEnd={() => isMobile && setMicHover(false)}
            className={`bg-[#5c8a84] flex items-center z-50 rounded-full p-3 text-white fixed bottom-5 right-5 cursor-pointer shadow-lg shadow-[#4b7f7a] transition-all duration-300 ${
              !micHover ? "animate-bounce" : "w-auto"
            }`}
          >
            <div className="px-3 text-sm sm:text-base">Ask AI about me</div>
            <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        )}
      </div>

      <div className="flex items-end w-full justify-end h-full">
        {showAISection && (
          <AISection
            setShowAiSection={setShowAISection}
            convs={conversations}
            setConvs={setConversations}
            ref={aiSectionRef}
          />
        )}
      </div>

      {showNotice && (
        <Notice
          title="Ask AI about me!"
          message="You can now ask AI questions in the chat section about my skills, projects, and experience and much more. Give it a try!"
          type="info"
          duration={TIMEOUT_DURATION}
        />
      )}
    </>
  );
}
