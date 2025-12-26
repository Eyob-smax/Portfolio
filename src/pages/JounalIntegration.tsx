import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ITag {
  id: number;
  tag: string;
}

interface IPostTag {
  postId: number;
  tagId: number;
  Tag: ITag;
}

interface IPost {
  createdAt: string | Date;
  post: string;
  date_string: string;
  date: Date;
  post_link: string;
  PostTag: IPostTag[];
}

export const BASE_URL = "https://portfolio-backend-two-mocha.vercel.app";
const MAX_POSTS = 9;

const DevJournal = () => {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/posts?max=${MAX_POSTS}`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        if (data.length === 0) throw new Error("No posts available");
        if (!Array.isArray(data))
          throw new Error("Invalid data format received");
        setPosts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const allTags = [
    "All",
    ...Array.from(
      new Set(
        posts?.flatMap((p) => p.PostTag?.map((t) => t.Tag.tag.trim()) ?? [])
      )
    ),
  ];

  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts?.filter((post) =>
          post.PostTag?.some(
            (t) => t.Tag.tag.toLowerCase() === selectedTag.toLowerCase()
          )
        );

  return (
    <section
      id="journal"
      className="relative overflow-hidden bg-linear-to-br from-[#f0f7f6] via-[#e8f1f0] to-[#e0ebe9] dark:from-[#0f0f0f] dark:via-[#171717] dark:to-[#1a1a1a] text-[#222] dark:text-[#e0e0e0] py-10 px-6 md:px-12 lg:px-24 font-[Inter,sans-serif]"
    >
      <div className="text-center mb-7">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 text-black dark:text-white">
          Dev Journal
        </h1>
        <p className="text-sm md:text-xl text-[#333]/80 dark:text-[#e0e0e0]/80 max-w-3xl mx-auto">
          A peek into my coding journey — real thoughts, lessons, and insights I
          share with my Telegram community.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-5">
        {allTags?.map((tag) => (
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

      {loading && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Loading posts...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid max-h-[75vh] py-5 overflow-y-scroll grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts?.length > 0 ? (
            filteredPosts?.map((post, index) => {
              const truncatedPost =
                post.post.length > 200
                  ? post.post.slice(0, 200) + "..."
                  : post.post;

              return (
                <div
                  key={post.post_link || index}
                  className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-up"
                  style={{
                    animationDelay: `${index * 120}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <p className="text-sm text-[#5c8a84] mb-2 font-medium">
                    {post?.PostTag?.map((t) => t.Tag.tag).join(", ")}
                  </p>
                  <p className="text-lg font-bold mb-3">
                    {new Date(post.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="text-balance text-[#333]/80 dark:text-[#e0e0e0]/80 mb-4 leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {truncatedPost}
                    </ReactMarkdown>
                  </div>
                  <a
                    href={post.post_link || "https://t.me/devwitheyob"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5c8a84] hover:underline font-semibold"
                  >
                    Read More →
                  </a>
                </div>
              );
            })
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No posts found for “{selectedTag}”.
            </p>
          )}
        </div>
      )}

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
