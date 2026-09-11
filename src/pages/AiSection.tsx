import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X } from "lucide-react";
import type { FormEvent, RefObject } from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { TConversation } from "./Home";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { STREAM_ENDPOINT } from "@/lib/config";

const MAX_INPUT_LENGTH = 200;
/**
 * Idle timeout, not a total budget.
 *
 * It is reset on every chunk, so a long answer that keeps arriving is never
 * cut off — only a stream that has genuinely gone quiet is.
 */
const IDLE_TIMEOUT = 30_000;
const THINKING = "Thinking...";

const markdownStyles = `
  .markdown-content {
    font-size: 0.8rem;
  }
  .markdown-content p {
    margin-bottom: -0.3rem;
  }
  .markdown-content strong { font-weight: 700; }
  .markdown-content em   { font-style: italic; }

  .markdown-content ul,
  .markdown-content ol {
    padding-left: 1.5rem;
  }
  .markdown-content li { margin-bottom: 0.20rem; }

  /* Links – blue, underlined on hover, open in new tab */
  .markdown-content a {
    color: #4b7f7a;
    text-decoration: underline;
  }
  .markdown-content a:hover {
    text-decoration: underline;
    opacity: 0.85;
  }

`;

export default function AISection({
  setShowAiSection,
  convs,
  setConvs,
  ref,
}: {
  setShowAiSection: React.Dispatch<React.SetStateAction<boolean>>;
  convs: TConversation[] | null;
  setConvs: React.Dispatch<React.SetStateAction<TConversation[] | null>>;
  ref: RefObject<HTMLDivElement | null>;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const hasReceivedData = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scroll({
      top: messagesEndRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => scrollToBottom(), [convs, scrollToBottom]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = markdownStyles;
    document.head.appendChild(style);
    return () => {
      eventSourceRef.current?.close();
      document.head.removeChild(style);
    };
  }, []);

  /** Replaces one message's body in place, leaving the rest of the log alone. */
  const setMessage = useCallback(
    (id: string, next: string | ((current: string) => string)) => {
      setConvs((prev) =>
        (prev ?? []).map((m) =>
          m.id === id
            ? {
                ...m,
                message: typeof next === "function" ? next(m.message) : next,
              }
            : m
        )
      );
    },
    [setConvs]
  );

  const startStream = useCallback(
    (topic: string, aiMessageId: string) => {
      eventSourceRef.current?.close();
      hasReceivedData.current = false;

      const es = new EventSource(
        `${STREAM_ENDPOINT}?topic=${encodeURIComponent(topic)}`
      );
      eventSourceRef.current = es;

      let timeout: ReturnType<typeof setTimeout>;

      const finish = () => {
        clearTimeout(timeout);
        setIsLoading(false);
        // Without an explicit close the browser reconnects on its own a few
        // seconds after the server hangs up, replaying the whole answer into
        // the log a second time.
        es.close();
      };

      const armTimeout = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setMessage(aiMessageId, (current) =>
            current === THINKING
              ? "The assistant took too long to respond. Please try again."
              : current
          );
          finish();
        }, IDLE_TIMEOUT);
      };

      armTimeout();

      /*
       * Named events, and the payload is JSON.
       *
       * The server sends one `data:` line per chunk with the text JSON-encoded,
       * because answers are Markdown and a raw chunk containing a newline
       * splits into two SSE fields — everything after the newline was being
       * read as a field name and dropped, which is what made lists and code
       * blocks arrive mangled.
       */
      es.addEventListener("chunk", (e: MessageEvent) => {
        let text: string;
        try {
          text = JSON.parse(e.data) as string;
        } catch (err) {
          console.error("SSE parse error:", err, "raw:", e.data);
          return;
        }
        hasReceivedData.current = true;
        armTimeout();
        setMessage(aiMessageId, (current) =>
          (current === THINKING ? "" : current) + text
        );
      });

      /*
       * Named `failed`, not `error`: EventSource already dispatches "error"
       * for transport failures, so a server-sent event of that name lands in
       * the same handler as a dropped connection and the two become
       * indistinguishable.
       */
      es.addEventListener("failed", (e: MessageEvent) => {
        let message = "The assistant hit an error. Please try again.";
        try {
          message = JSON.parse(e.data) as string;
        } catch {
          // Keep the generic message.
        }
        hasReceivedData.current = true;
        setMessage(aiMessageId, (current) =>
          current === THINKING ? message : `${current}

_${message}_`
        );
        finish();
      });

      es.addEventListener("end", finish);

      es.onerror = () => {
        if (!hasReceivedData.current) {
          setMessage(
            aiMessageId,
            "Could not reach the assistant. Please check your connection and try again."
          );
        }
        finish();
      };
    },
    [setMessage]
  );

  async function addConversation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (!userMessage) return;
    if (isLoading) return;
    if (userMessage.length > MAX_INPUT_LENGTH) {
      Swal.fire({
        icon: "warning",
        title: "Input Error",
        text: `Message exceeds ${MAX_INPUT_LENGTH} characters.`,
      });
      return;
    }

    if (userMessage.toLowerCase() === "clear") {
      setConvs([]);
      setInputValue("");
      return;
    }

    const userId = uuidv4();
    const aiId = uuidv4();

    setConvs((prev) => [
      ...(prev || []),
      { id: userId, message: userMessage, type: "user" },
      { id: aiId, message: THINKING, type: "ai" },
    ]);

    setInputValue("");
    setIsLoading(true);
    startStream(userMessage, aiId);
  }

  return (
    <div
      ref={ref}
      className="z-40 fixed bottom-4 mx-auto left-[4%] sm:left-auto right-4 h-[70%] max-h-125 sm:w-100"
    >
      <div className="relative h-full w-full bg-white shadow-2xl rounded-xl flex flex-col">
        {/* Header */}
        <div className="border-b flex items-center justify-center w-full py-3 px-4 bg-[#4b7f7a] rounded-t-xl">
          <h1 className="text-white text-center text-lg font-medium">
            AI Assistance
          </h1>
          <button
            onClick={() => setShowAiSection(false)}
            aria-label="Close AI chat"
            className="absolute right-4 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          className="grow w-full overflow-y-auto p-4 space-y-3 bg-[#ecedee]"
          ref={messagesEndRef}
          role="log"
          aria-live="polite"
        >
          {!convs || convs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <h1 className="font-extrabold text-xl mb-2">
                Ask Me Anything about Eyob!
              </h1>
            </div>
          ) : (
            convs.map(({ id, message, type }) => (
              <div
                key={id}
                className={`flex w-full ${
                  type === "user" ? "justify-end" : "justify-start"
                }`}
                role="article"
              >
                <Badge
                  className={`py-2 px-3 whitespace-pre-wrap max-w-[80%] text-left shadow-md ${
                    type === "user"
                      ? "bg-[#4b7f7a] text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                  }`}
                >
                  {type === "ai" ? (
                    <div className="markdown-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // `node` is the mdast node, not a label — it was
                          // being interpolated into the title attribute and
                          // rendering as "link-[object Object]" on every link.
                          a: ({ node: _node, ...props }) => (
                            <a
                              {...props}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#4b7f7a] hover:underline"
                            />
                          ),
                        }}
                      >
                        {message}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    message
                  )}
                </Badge>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t bg-white">
          <form
            onSubmit={addConversation}
            className="flex gap-x-3 items-center"
          >
            <Input
              placeholder={
                isLoading
                  ? "Waiting for AI..."
                  : convs && convs.length > 0
                  ? "type `clear` to start fresh or ask another question!"
                  : "Ask me about Eyob..."
              }
              className="grow border-gray-300 focus:border-[#4b7f7a]"
              name="message"
              value={inputValue}
              onChange={(e) =>
                setInputValue(e.target.value.slice(0, MAX_INPUT_LENGTH))
              }
              autoComplete="off"
              disabled={isLoading}
              aria-label="Enter your message"
            />
            <Button
              type="submit"
              className="bg-[#4b7f7a] hover:bg-[#5c8a84] p-2 h-10 w-10 transition-colors duration-150"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
