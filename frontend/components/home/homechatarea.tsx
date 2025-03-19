"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { generateStoryline } from "@/utils/gemini/generate-response";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, X, Eye, EyeClosed } from "lucide-react";
import HomeHero from "@/components/home/homehero";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { createMessage } from "@/api/stories/mutations";

export default function HomeChatArea({ username }: { username: string }) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const alreadyAnimated = useRef<Set<number>>(new Set()); // temporary storage to keep track of messages that were already animated
  const [showChoicesPopup, setShowChoicesPopup] = useState(false);
  const storyID = "05bff06c-a8fd-4c48-b1cd-e4da818a7abf"; // placeholder

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (inputOption?: string) => {
    const messageContent = inputOption || input;
    if (!messageContent.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: messageContent },
    ];
    setMessages(newMessages);
    setLoading(true);

    const geminiResponse = await generateStoryline(newMessages);

    if (geminiResponse) {
      const assistantMessage = geminiResponse.response;
      const assistantChoices = [
        geminiResponse.choice1,
        geminiResponse.choice2,
        geminiResponse.choice3,
      ];

      try{
        const newMessage = await createMessage({ storyID: storyID, role: "assistant", content: assistantMessage });
        console.log(newMessage);
      }catch(error){
        console.error("Error creating message:", error);
      }
      setMessages([
        ...newMessages,
        { role: "assistant", content: assistantMessage },
      ]);
      setChoices(assistantChoices);
    }
    setLoading(false);
    setInput(""); // Clear the input after sending the message
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOptionClick = (option: string) => {
    setInput(option);

    setShowChoicesPopup(false);

    setTimeout(() => {
      handleSendMessage(option);
    }, 50);
  };

  useEffect(() => {
    const textElements = document.querySelectorAll(".assistant-message");

    let lastAnimation = null;

    textElements.forEach((element, index) => {
      // if the message has already been animated, go to the next

      if (alreadyAnimated.current.has(index)) return;

      const text = element.textContent || "";

      element.innerHTML = text
        .split("")
        .map((char) => `<span class="char">${char}</span>`)
        .join("");

      const chars = element.querySelectorAll(".char");

      lastAnimation = gsap.fromTo(
        chars,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.25,
          stagger: 0.01,
          onComplete: () => {
            // Show the popup only when animation is fully done
            if (index === textElements.length - 1) {
              setShowChoicesPopup(true);
            }
          },
        }
      );

      alreadyAnimated.current.add(index);
    });
  }, [messages]);

  return (
    <div className="h-screen flex flex-col p-4 overflow-hidden max-h-screen">
      {messages.length === 0 && <HomeHero username={username} />}

      <div className="flex-1 overflow-y-auto mb-4 pr-4">
        <div className="flex flex-col space-y-4 w-full pr-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end mr-2" : "justify-start"}`}
            >
              <div
                className={`max-w-lg p-3 rounded-xl ${
                  message.role === "user"
                    ? "bg-[#4A90E2] text-white"
                    : "bg-[#333] text-white"
                } ${message.role === "assistant" ? "assistant-message" : ""}`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-col w-full py-2">
              <div className="flex items-center justify-center gap-[5px] px-4 py-2 bg-[#333] rounded-[18px]">
                <span className="w-2 h-2 bg-white rounded-full opacity-40 animate-pulse delay-0"></span>
                <span className="w-2 h-2 bg-white rounded-full opacity-40 animate-pulse delay-300"></span>
                <span className="w-2 h-2 bg-white rounded-full opacity-40 animate-pulse delay-600"></span>
              </div>
            </div>
          )}

          {showChoicesPopup && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
              onClick={() => setShowChoicesPopup(false)}
            >
              <div
                className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-2xl p-6 max-w-md w-full mx-4 shadow-[0_0_25px_rgba(0,0,0,0.3)] border border-[#333] animate-slideUp"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-white text-xl font-medium">
                    Choose your path
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-[#333] transition-colors"
                    onClick={() => setShowChoicesPopup(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex flex-col space-y-4">
                  {choices.map((choice, index) => (
                    <Button
                      key={index}
                      onClick={() => handleOptionClick(choice)}
                      className={cn(
                        "w-full text-left p-5 rounded-xl text-white transition-all",
                        "whitespace-normal break-words h-auto min-h-[60px] justify-start",
                        "bg-gradient-to-r from-[#333] to-[#2a2a2a] hover:from-[#3a3a3a] hover:to-[#333]",
                        "border border-[#444] hover:border-[#555]",
                        "shadow-md hover:shadow-lg transform hover:-translate-y-1",
                        "flex items-center gap-3"
                      )}
                      variant="ghost"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A90E2] flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <span>{choice}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
      {messages.length === 0 ? (
        <div className="flex items-center rounded-full border border-[#444] bg-[#1e1e1e] px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setShowChoicesPopup(!showChoicesPopup)}
          >
            {showChoicesPopup ? (
              <EyeClosed className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Start an Odyssey"
            className="flex-1 bg-transparent border-none outline-none px-3 text-white placeholder-gray-400"
          />

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white text-black"
            onClick={() => handleSendMessage()}
          >
            <ArrowUpCircle className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <div className="flex justify-center rounded-full border border-[#444] bg-[#1e1e1e] px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white text-black"
            onClick={() => setShowChoicesPopup(true)}
          >
            <Eye className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
