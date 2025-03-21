"use client";

import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import {
  generateStoryline,
  generateStoryName,
} from "@/utils/gemini/generate-response";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, Eye, X } from "lucide-react";
import { gsap, random } from "gsap";
import { cn } from "@/lib/utils";
import {
  createMessage,
  createStory,
  updateName,
} from "@/api/stories/mutations";
import { Message, Story, User } from "@/types/types";
import Particles from "../ui/particles";
import { motion } from "framer-motion";
import { getStoryMessages } from "@/api/queries";

export default function StoryChatPage({
  storyID,
  userObject,
  setStories,
}: {
  storyID: string;
  userObject: User;
  setStories: Dispatch<SetStateAction<Story[]>>;
}) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [showChoicesPopup, setShowChoicesPopup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const alreadyAnimated = useRef<Set<number>>(new Set());
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const exampleChoices = [
    "A detective discovers a hidden room in an old mansion, where time seems to stand still.",
    "A group of astronauts stranded on a distant planet uncover a long-lost alien civilization.",
    "A young artist’s paintings begin to come to life, changing the course of history.",
    "A man wakes up with the ability to hear others' thoughts but can’t turn it off.",
    "In a world where dreams are traded as currency, a young dreamer finds themselves caught in a dangerous scheme.",
    "A forgotten toy soldier comes to life to protect a family from an impending threat.",
    "An ordinary librarian discovers that their books are portals to alternate realities.",
    "A famous illusionist discovers that their tricks are no longer under their control.",
    "A time traveler accidentally changes a small detail in history, causing an alternate future to unfold.",
    "A scientist accidentally creates a machine that lets people swap bodies for a day, leading to unintended chaos.",
  ];
  const [randomSubArray, setRandomSubArray] = useState<string[]>([]);

  useEffect(() => {
    const storedState = localStorage.getItem(`buttonsHidden-${storyID}`);
    setButtonsVisible(storedState !== "true");
  }, [storyID]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = (await getStoryMessages(storyID)) as Message[];
      if (fetchedMessages) {
        const sortedMessages = fetchedMessages.sort((a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        });

        setMessages(
          sortedMessages.map((msg: { role: any; content: any }) => ({
            role: msg.role,
            content: msg.content,
          }))
        );

        if (sortedMessages.length > 0) {
          if (sortedMessages[sortedMessages.length - 1].role === "assistant") {
            handleGeminiOptions(sortedMessages);
          }
          if (sortedMessages[sortedMessages.length - 1].role === "user") {
            handleGeminiResponse(sortedMessages);
          }
        }
      }
    };

    fetchMessages();
  }, [storyID]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = async (option: string) => {
    const newMessages = [...messages, { role: "user", content: option }];
    setMessages(newMessages);
    setShowChoicesPopup(false);
    try {
      await createMessage({ storyID, role: "user", content: option });
    } catch (error) {
      console.error("Error saving user message:", error);
    }

    await handleGeminiResponse(newMessages);
  };

  const handleGeminiResponse = async (
    currentMessages: { role: string; content: string }[]
  ) => {
    setLoading(true);

    try {
      const geminiResponse = await generateStoryline(currentMessages);

      if (geminiResponse) {
        const assistantMessage = geminiResponse.response;
        const assistantChoices = [
          geminiResponse.choice1,
          geminiResponse.choice2,
          geminiResponse.choice3,
        ];

        await createMessage({
          storyID,
          role: "assistant",
          content: assistantMessage,
        });

        setMessages([
          ...currentMessages,
          { role: "assistant", content: assistantMessage },
        ]);
        setChoices(assistantChoices);
      }
    } catch (error) {
      console.error("Error during Gemini response:", error);
    }

    setLoading(false);
  };

  const handleGeminiOptions = async (
    currentMessages: { role: string; content: string }[]
  ) => {
    setLoading(true);

    try {
      const geminiResponse = await generateStoryline(currentMessages);

      if (geminiResponse) {
        const assistantChoices = [
          geminiResponse.choice1,
          geminiResponse.choice2,
          geminiResponse.choice3,
        ];

        setChoices(assistantChoices);
      }
    } catch (error) {
      console.error("Error during Gemini response:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    const textElements = document.querySelectorAll(".assistant-message");

    let lastAnimation = null;

    textElements.forEach((element, index) => {
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
            if (index === textElements.length - 1) {
              setShowChoicesPopup(true);
            }
          },
        }
      );

      alreadyAnimated.current.add(index);
    });
  }, [messages]);

  const handleSendMessage = async (user: User, inputOption?: string) => {
    setButtonsVisible(false);
    localStorage.setItem(`buttonsHidden-${storyID}`, "true");
    const messageContent = inputOption || input;
    if (!messageContent.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: messageContent },
    ];

    setMessages(newMessages);
    setLoading(true);

    if (messages.length === 0) {
      if (user) {
        try {
          await createMessage({
            storyID: storyID,
            role: "user",
            content: messageContent,
          });
        } catch (error) {
          console.error("Error saving initial message:", error);
        }

        const geminiResponse = await generateStoryline(newMessages);

        if (geminiResponse) {
          const assistantMessage = geminiResponse.response;
          const assistantChoices = [
            geminiResponse.choice1,
            geminiResponse.choice2,
            geminiResponse.choice3,
          ];

          try {
            await createMessage({
              storyID: storyID,
              role: "assistant",
              content: assistantMessage,
            });
            console.log("Assistant message created");

            const storyName = await generateStoryName(assistantMessage);
            console.log(storyName);
            try {
              const response = await updateStoryName(storyID, storyName);
              console.log(response);
              setStories((prevStories) =>
                prevStories.map((story) =>
                  story.id === storyID ? { ...story, name: storyName } : story
                )
              );
            } catch (error) {
              console.error("Error updating story name:", error);
            }
          } catch (error) {
            console.error("Error creating assistant message:", error);
          }

          setMessages([
            ...newMessages,
            { role: "assistant", content: assistantMessage },
          ]);
          setChoices(assistantChoices);
        }
      }
    } else if (storyID) {
      try {
        await createMessage({
          storyID,
          role: "user",
          content: messageContent,
        });
        console.log("User message saved");
      } catch (error) {
        console.error("Error saving user message:", error);
      }

      const geminiResponse = await generateStoryline(newMessages);

      if (geminiResponse) {
        const assistantMessage = geminiResponse.response;
        const assistantChoices = [
          geminiResponse.choice1,
          geminiResponse.choice2,
          geminiResponse.choice3,
        ];

        try {
          await createMessage({
            storyID,
            role: "assistant",
            content: assistantMessage,
          });
          console.log("Assistant message saved");
        } catch (error) {
          console.error("Error creating assistant message:", error);
        }

        setMessages([
          ...newMessages,
          { role: "assistant", content: assistantMessage },
        ]);
        setChoices(assistantChoices);
      }
    }

    setLoading(false);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(userObject);
    }
  };

  const updateStoryName = async (storyID: string, newName: string) => {
    try {
      const response = await updateName({ storyID: storyID, name: newName });
      console.log(response);
    } catch (error) {
      console.error("Error updating story name:", error);
    }
  };

  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const randomSubArray = [
      exampleChoices[getRandomInt(0, exampleChoices.length - 1)],
      exampleChoices[getRandomInt(0, exampleChoices.length - 1)],
      exampleChoices[getRandomInt(0, exampleChoices.length - 1)],
    ];
    setRandomSubArray(randomSubArray);
  }, []);

  return (
    <div className="h-screen flex flex-col p-4 overflow-hidden max-h-screen bg-gradient-to-tl from-black via-zinc-800/30 to-black">
      {buttonsVisible && (
        <>
          <div className="w-full max-w-4xl mx-auto flex flex-col mt-20 items-center text-center h-full">
            <div className="text-center mt-12 mb-16">
              <h1 className="md:text-3xl sm:text-xl  lg:text-5xl font-bold text-white">
                Some options to help get you started.
              </h1>
              <div className="border-t border-b border-[#2a2a2a] w-full mt-3" />
            </div>

            <motion.div
              className="flex md:flex-row flex-col justify-around w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Button
                variant="secondary"
                className="size-40 text-wrap"
                onClick={() => handleSendMessage(userObject, randomSubArray[0])}
              >
                {randomSubArray[0]}
              </Button>
              <Button
                variant="secondary"
                className="size-40 text-wrap"
                onClick={() => handleSendMessage(userObject, randomSubArray[1])}
              >
                {randomSubArray[1]}
              </Button>
              <Button
                variant="secondary"
                className="size-40 text-wrap"
                onClick={() => handleSendMessage(userObject, randomSubArray[2])}
              >
                {randomSubArray[2]}
              </Button>
            </motion.div>
          </div>
        </>
      )}

      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={300}
      />
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
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Or, start an Odyssey on your own..."
            className="flex-1 bg-transparent border-none outline-none px-3 text-white placeholder-gray-400"
          />

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white text-black"
            onClick={() => handleSendMessage(userObject)}
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
