import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { TConversation } from "./Home";
import { v4 as uuidv4 } from "uuid";

// Custom CSS for Markdown rendering
const markdownStyles = `
  .markdown-content {
    line-height: 1.5;
    font-size: 0.9rem;
  }
  .markdown-content p {
    margin-bottom: 0.75rem;
  }
  .markdown-content strong {
    font-weight: 700;
  }
  .markdown-content em {
    font-style: italic;
  }
  .markdown-content ul, .markdown-content ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  .markdown-content li {
    margin-bottom: 0.25rem;
  }
`;

const STREAM_ENDPOINT = "http://localhost:9000/ai/stream";
const MAX_INPUT_LENGTH = 500;

export default function AISection({
  setShowAiSection,
  convs,
  setConvs,
}: {
  setShowAiSection: React.Dispatch<React.SetStateAction<boolean>>;
  convs: TConversation[] | null;
  setConvs: React.Dispatch<React.SetStateAction<TConversation[] | null>>;
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

  useEffect(() => {
    scrollToBottom();
  }, [convs, scrollToBottom]);

  useEffect(() => {
    // Inject custom styles for Markdown
    const styleSheet = document.createElement("style");
    styleSheet.textContent = markdownStyles;
    document.head.appendChild(styleSheet);

    return () => {
      eventSourceRef.current?.close();
      document.head.removeChild(styleSheet);
    };
  }, []);

  function startStream(topic: string, aiMessageId: string) {
    eventSourceRef.current?.close();
    hasReceivedData.current = false;

    const eventSource = new EventSource(
      `${STREAM_ENDPOINT}?topic=${encodeURIComponent(topic)}`
    );
    eventSourceRef.current = eventSource;

    // Timeout to prevent hanging
    const timeout = setTimeout(() => {
      console.error("SSE stream timed out");
      setConvs((prev) => {
        if (!prev) return [];
        return prev.map((msg) =>
          msg.id === aiMessageId
            ? { ...msg, message: "⚠️ Stream timed out." }
            : msg
        );
      });
      eventSource.close();
      setIsLoading(false);
    }, 30000); // 30 seconds timeout

    eventSource.onmessage = (event: MessageEvent) => {
      try {
        // Parse JSON-stringified chunk from backend
        const chunk = JSON.parse(event.data);
        console.log("Received chunk:", chunk); // Debug log
        hasReceivedData.current = true;
        setConvs((prev) => {
          if (!prev) return [];
          return prev.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  message: msg.message.replace("Thinking...", "") + chunk,
                }
              : msg
          );
        });
        scrollToBottom();
      } catch (err) {
        console.error(
          "Failed to parse SSE data:",
          err,
          "Raw data:",
          event.data
        );
      }
    };

    eventSource.onerror = () => {
      clearTimeout(timeout);
      console.log("SSE onerror triggered"); // Debug log
      if (!hasReceivedData.current) {
        setConvs((prev) => {
          if (!prev) return [];
          return prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, message: "⚠️ Stream ended unexpectedly or failed." }
              : msg
          );
        });
      }
      setIsLoading(false);
      eventSource.close();
    };

    eventSource.addEventListener("error", (event: MessageEvent) => {
      clearTimeout(timeout);
      try {
        const errorData = JSON.parse(event.data);
        console.error("SSE error event:", errorData);
        setConvs((prev) => {
          if (!prev) return [];
          return prev.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  message: `⚠️ Error: ${
                    errorData.error || "Unknown error occurred"
                  }`,
                }
              : msg
          );
        });
      } catch (err) {
        console.error(
          "Failed to parse SSE error event:",
          err,
          "Raw data:",
          event.data
        );
      }
      setIsLoading(false);
      eventSource.close();
    });

    eventSource.addEventListener("end", () => {
      clearTimeout(timeout);
      console.log("SSE end event received"); // Debug log
      setIsLoading(false);
      eventSource.close();
    });
  }

  async function addConversation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const userMessage = inputValue.trim();
    if (!userMessage || isLoading || userMessage.length > MAX_INPUT_LENGTH)
      return;

    const userMessageId = uuidv4();
    const aiMessageId = uuidv4();

    setConvs((prev) => [
      ...(prev || []),
      { id: userMessageId, message: userMessage, type: "user" },
      { id: aiMessageId, message: "Thinking...", type: "ai" },
    ]);

    setInputValue("");
    setIsLoading(true);
    startStream(userMessage, aiMessageId);
  }

  return (
    <div className="z-40 fixed bottom-4 right-4 h-[70%] w-full max-h-[600px] sm:w-[400px]">
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

        {/* Messages */}
        <div
          className="flex-grow w-full overflow-y-auto p-4 space-y-3 bg-[#ecedee]"
          ref={messagesEndRef}
          role="log"
          aria-live="polite"
        >
          {!convs || convs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <h1 className="font-extrabold text-2xl text-purple-600 mb-2">
                💬✨ Ask Me Anything!
              </h1>
              <p className="text-gray-600 text-base">
                I'm here to help with information about{" "}
                <span className="text-indigo-700 font-semibold">Eyob</span>.
              </p>
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
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                  }`}
                >
                  {type === "ai" ? (
                    <div className="markdown-content">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
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

        {/* Input */}
        <div className="p-3 border-t bg-white">
          <form
            onSubmit={addConversation}
            className="flex gap-x-3 items-center"
          >
            <Input
              placeholder={
                isLoading ? "Waiting for AI..." : "Ask me about Eyob..."
              }
              className="flex-grow border-gray-300 focus:border-[#4b7f7a]"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
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
