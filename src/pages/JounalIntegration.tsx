import { useState } from "react";
import { Send } from "lucide-react";

type TPosts = {
  id: number;
  date: string;
  text: string;
  tag: string;
};

const DevJournal = () => {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const posts: TPosts[] = [
    {
      id: 1,
      date: "October 22, 2025",
      text: "Wrapped up a new feature for my project management app — added real-time syncing and improved the UI transitions. It feels so smooth now! #SmallWins",
      tag: "#JavaScript",
    },
    {
      id: 2,
      date: "October 20, 2025",
      text: "Today I explored custom events in JavaScript and learned how ‘detail’, ‘bubbles’, and ‘cancelable’ work. Understanding native event behavior is super powerful for custom components.",
      tag: "#TodayILearned",
    },
    {
      id: 3,
      date: "October 18, 2025",
      text: "Experimented with integrating AI-generated backgrounds into my to-do app. It adds this subtle motivational vibe that actually makes me more productive!",
      tag: "#AIIntegration",
    },
    {
      id: 4,
      date: "October 17, 2025",
      text: "Started building a login and registration system using pure JavaScript. I’m planning to connect it to a backend soon with Node.js and MySQL. Excited for the next phase!",
      tag: "#FullStackJourney",
    },
    {
      id: 5,
      date: "October 15, 2025",
      text: "Spent the day debugging a contenteditable issue. Turns out, I had to handle the blur event properly to update text without double-clicking. Learned a lot!",
      tag: "#DebuggingDiaries",
    },
    {
      id: 5,
      date: "October 15, 2025",
      text: "Spent the day debugging a contenteditable issue. Turns out, I had to handle the blur event properly to update text without double-clicking. Learned a lot!",
      tag: "#DebuggingDiaries",
    },
    {
      id: 5,
      date: "October 15, 2025",
      text: "Spent the day debugging a contenteditable issue. Turns out, I had to handle the blur event properly to update text without double-clicking. Learned a lot!",
      tag: "#DebuggingDiaries",
    },
    {
      id: 5,
      date: "October 15, 2025",
      text: "Spent the day debugging a contenteditable issue. Turns out, I had to handle the blur event properly to update text without double-clicking. Learned a lot!",
      tag: "#DebuggingDiaries",
    },
    {
      id: 5,
      date: "October 15, 2025",
      text: "Spent the day debugging a contenteditable issue. Turns out, I had to handle the blur event properly to update text without double-clicking. Learned a lot!",
      tag: "#DebuggingDiaries",
    },
    {
      id: 5,
      date: "October 15, 2025",
      text: "Spent the day debugging a contenteditable issue. Turns out, I had to handle the blur event properly to update text without double-clicking. Learned a lot!",
      tag: "#DebuggingDiaries",
    },
    {
      id: 5,
      date: "October 15, 2025",
      text: "Spent the day debugging a contenteditable issue. Turns out, I had to handle the blur event properly to update text without double-clicking. Learned a lot!",
      tag: "#DebuggingDiaries",
    },
    {
      id: 5,
      date: "October 15, 2025",
      text: "Spent the day debugging a contenteditable issue. Turns out, I had to handle the blur event properly to update text without double-clicking. Learned a lot!",
      tag: "#DebuggingDiaries",
    },
    {
      id: 5,
      date: "October 15, 2025",
      text: "Spent the day debugging a contenteditable issue. Turns out, I had to handle the blur event properly to update text without double-clicking. Learned a lot!",
      tag: "#DebuggingDiaries",
    },
    {
      id: 5,
      date: "October 15, 2025",
      text: "Spent the day debugging a contenteditable issue. Turns out, I had to handle the blur event properly to update text without double-clicking. Learned a lot!",
      tag: "#DebuggingDiaries",
    },
    {
      id: 5,
      date: "October 15, 2025",
      text: "Spent the day debugging a contenteditable issue. Turns out, I had to handle the blur event properly to update text without double-clicking. Learned a lot!",
      tag: "#DebuggingDiaries",
    },
  ];

  const allTags = ["All", ...new Set(posts.map((p) => p.tag))];
  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts.filter((post) => post.tag === selectedTag);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f0f7f6] via-[#e8f1f0] to-[#e0ebe9] dark:from-[#0f0f0f] dark:via-[#171717] dark:to-[#1a1a1a] text-[#222] dark:text-[#e0e0e0] py-10 px-6 md:px-12 lg:px-24 font-[Inter,sans-serif]">
      <div className="text-center mb-7">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 text-black ">
          Dev Journal
        </h1>
        <p className="text-sm md:text-xl text-[#333]/80 dark:text-[#e0e0e0]/80 max-w-3xl mx-auto">
          A peek into my coding journey — real thoughts, lessons, and insights I
          share with my Telegram community.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-5">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full border transition-all text-sm font-semibold ${
              selectedTag === tag
                ? "bg-[#5c8a84] text-white border-[#496e69]"
                : "border-gray-400 dark:border-gray-700 hover:bg-[#e0ebe9] dark:hover:bg-[#2a2a2a]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid max-h-[75vh] py-5 overflow-y-scroll grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <div
            key={post.id}
            className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-up"
            style={{
              animationDelay: `${index * 120}ms`,
              animationFillMode: "forwards",
            }}
          >
            <p className="text-sm text-[#5c8a84] mb-2 font-medium">
              {post.tag}
            </p>
            <p className="text-lg font-bold mb-3">{post.date}</p>
            <p className="text-base text-[#333]/80 dark:text-[#e0e0e0]/80 mb-4 leading-relaxed">
              {post.text.length > 200
                ? post.text.slice(0, 200) + "..."
                : post.text}
            </p>
            <a
              href={`https://t.me/devwitheyob/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5c8a84] hover:underline font-semibold"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <a
          href="https://t.me/devwitheyob"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-[#5c8a84] hover:bg-[#496e69] text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all"
        >
          <Send className="w-5 h-5 mr-2" />
          Join My Telegram Channel
        </a>
      </div>

      <div className="text-center mt-10 opacity-80">
        <p className="text-sm italic">
          “Every commit and every challenge becomes a new page in my developer
          story.”
        </p>
      </div>
    </section>
  );
};

export default DevJournal;
