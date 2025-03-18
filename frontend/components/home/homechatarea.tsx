"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { generateStoryline } from "@/utils/gemini/generate-response"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUpCircle } from "lucide-react"
import HomeHero from "@/components/home/homehero"
import { gsap } from "gsap"

export default function HomeChatArea({ username }: { username: string }) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [choices, setChoices] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const alreadyAnimated = useRef<Set<number>>(new Set()) // temporary storage to keep track of messages that were already animated

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setLoading(true)

    const geminiResponse = await generateStoryline(newMessages)

    if (geminiResponse) {
      const assistantMessage = geminiResponse.response
      const assistantChoices = [geminiResponse.choice1, geminiResponse.choice2, geminiResponse.choice3]

      setMessages([...newMessages, { role: "assistant", content: assistantMessage }])
      setChoices(assistantChoices)
    }
    setLoading(false)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleOptionClick = (option: string) => {
    setInput(option)
    handleSendMessage()
  }

  useEffect(() => {
    const textElements = document.querySelectorAll(".assistant-message")

    textElements.forEach((element, index) => {
      if (alreadyAnimated.current.has(index)) return

      const text = element.textContent || ""

      element.innerHTML = text
        .split("")
        .map((char) => `<span class="char">${char}</span>`)
        .join("")

      const chars = element.querySelectorAll(".char")

      gsap.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: 0.01 })

      alreadyAnimated.current.add(index)
    })
  }, [messages])

  return (
    <div className="h-screen flex flex-col p-4 overflow-hidden max-h-screen">
      {messages.length === 0 && <HomeHero username={username} />}

      <div className="flex-1 overflow-y-auto mb-4 pr-4">
        <div className="flex flex-col space-y-4 w-full pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end mr-2" : "justify-start"}`}>
              <div
                className={`max-w-xs p-3 rounded-xl ${
                  message.role === "user" ? "bg-[#4A90E2] text-white" : "bg-[#333] text-white"
                } ${message.role === "assistant" ? "assistant-message" : ""}`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-center py-2">
              <div className="flex items-center justify-center gap-[5px] px-4 py-2 bg-[#333] rounded-[18px]">
                <span className="w-2 h-2 bg-white rounded-full opacity-40 animate-pulse delay-0"></span>
                <span className="w-2 h-2 bg-white rounded-full opacity-40 animate-pulse delay-300"></span>
                <span className="w-2 h-2 bg-white rounded-full opacity-40 animate-pulse delay-600"></span>
              </div>
            </div>
          )}

            {!loading && choices.length > 0 && (
            <div className="flex flex-col space-y-2 w-full">
                {choices.map((choice, index) => (
                <div key={index} className="flex justify-start w-full max-w-xs">
                    <Button
                    onClick={() => handleOptionClick(choice)}
                    className="w-full text-left p-3 rounded-xl bg-[#333] text-white whitespace-normal break-words h-auto min-h-[40px]"
                    variant="ghost"
                    >
                    {choice}
                    </Button>
                </div>
                ))}
            </div>
            )}


          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex items-center rounded-full border border-[#444] bg-[#1e1e1e] px-4 py-3">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Plus className="h-5 w-5" />
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
          onClick={handleSendMessage}
        >
          <ArrowUpCircle className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

