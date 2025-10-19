import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X } from "lucide-react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { useState, useRef, useEffect } from "react";
import type { TConversation } from "./Home";

const API_ENDPOINT = "http://localhost:9200/query";

export default function AISection({
  setShowAiSection,
  convs,
  setConvs,
}: {
  setShowAiSection: Dispatch<SetStateAction<boolean>>;
  convs: TConversation[] | null;
  setConvs: Dispatch<SetStateAction<TConversation[] | null>>;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Reference for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scroll({
      top: messagesEndRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // Scroll to bottom whenever conversations update
  useEffect(() => {
    scrollToBottom();
  }, [convs]);

  async function addConversation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const userMessage = inputValue.trim();

    if (!userMessage || isLoading) {
      return;
    }

    // Add user message to conversations
    setConvs((prev) => [
      ...(prev || []),
      { message: userMessage, type: "user" },
    ]);

    setInputValue("");
    setIsLoading(true);

    try {
      // Add loading message
      const loadingMessage: TConversation = {
        message: "Thinking...",
        type: "ai",
      };
      setConvs((prev) => [...(prev || []), loadingMessage]);

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();

      const finalAiMessageText =
        data.data?.content || "No response received from AI.";

      // Replace loading message with AI response
      setConvs((prev) => {
        if (!prev) return null;
        const updatedConvs = [...prev];
        updatedConvs[updatedConvs.length - 1] = {
          message: finalAiMessageText,
          type: "ai",
        };
        return updatedConvs;
      });
    } catch (error) {
      console.error("Error querying AI API:", error);

      // Handle error by updating the loading message
      setConvs((prev) => {
        if (!prev) return null;
        const updatedConvs = [...prev];
        updatedConvs[updatedConvs.length - 1] = {
          message:
            "Sorry, I couldn't reach the server. Check the console for errors.",
          type: "ai",
        };
        return updatedConvs;
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="z-40 fixed bottom-4 right-4 h-[70%] w-full max-h-[600px] sm:w-[400px]">
      <div className="relative h-full w-full bg-white shadow-2xl rounded-xl flex flex-col">
        {/* Header Section */}
        <div className="border-b flex items-center justify-center w-full py-3 px-4 bg-[#4b7f7a] rounded-t-xl">
          <h1 className="text-white text-center text-lg font-medium">
            AI Assistance
          </h1>
          <X
            onClick={() => setShowAiSection(false)}
            className="absolute right-4 text-white cursor-pointer w-5 h-5"
          />
        </div>

        {/* Messages Display */}
        <div
          className="flex-grow w-full overflow-y-auto p-4 space-y-3 bg-[#ecedee]"
          ref={messagesEndRef}
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
            convs.map(({ message, type }, index) => (
              <div
                key={index}
                className={`flex w-full ${
                  type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Badge
                  className={`py-2 px-3 whitespace-pre-wrap max-w-[80%] text-left shadow-md ${
                    type === "user"
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                  }`}
                >
                  {message}
                </Badge>
              </div>
            ))
          )}
        </div>

        {/* Input Form */}
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
              onChange={(e) => setInputValue(e.target.value)}
              autoComplete="off"
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="bg-[#4b7f7a] hover:bg-[#5c8a84] p-2 h-10 w-10 transition-colors duration-150"
              disabled={!inputValue.trim() || isLoading}
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
