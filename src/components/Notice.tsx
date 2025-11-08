import { useState, useEffect } from "react";
import { MdClose, MdInfo } from "react-icons/md";

export default function Notice({
  title,
  message,
  type = "info",
  duration = 5000,
}: {
  title: string;
  message: string;
  type?: "info" | "success" | "error";
  duration?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 left-3 sm:left-auto max-w-sm w-full z-50 transform transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
      `}
    >
      <div
        className={`flex items-start p-4 gap-3 rounded-xl border shadow-lg overflow-hidden
          ${
            type === "info"
              ? "bg-white dark:bg-[#192233] border-slate-300 dark:border-slate-700"
              : type === "success"
              ? "bg-green-100 dark:bg-green-800 border-green-300 dark:border-green-700"
              : type === "error"
              ? "bg-red-100 dark:bg-red-800 border-red-300 dark:border-red-700"
              : "bg-white dark:bg-[#192233]"
          }
        `}
      >
        <MdInfo className="text-primary text-2xl mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h2 className="font-bold text-slate-900 dark:text-white text-lg">
            {title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-[#92a4c9] mt-1">
            {message}
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="flex h-7 w-7 items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <MdClose className="text-base" />
        </button>
      </div>
    </div>
  );
}
