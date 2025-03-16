"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { generateStoryline } from "@/utils/gemini/generate-response"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUpCircle } from "lucide-react"
import HomeHero from "@/components/home/homehero" 

export default function HomeChatArea() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
      setMessages([...newMessages, { role: "assistant", content: geminiResponse }])
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

  return (
    <div className="h-screen flex flex-col p-4 overflow-hidden max-h-screen">
      {/* Conditionally render HomeHero if messages are empty */}
      {messages.length === 0 && <HomeHero />}

      <div className="flex-1 overflow-y-auto mb-4 pr-4">
        <div className="flex flex-col space-y-4 w-full pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end mr-2" : "justify-start"}`}>
              <div
                className={`max-w-xs p-3 rounded-xl ${
                  message.role === "user" ? "bg-[#4A90E2] text-white" : "bg-[#333] text-white"
                }`}
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

      <style jsx global>{`
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
  }
  
  .delay-0 {
    animation-delay: 0ms;
  }
  
  .delay-300 {
    animation-delay: 300ms;
  }
  
  .delay-600 {
    animation-delay: 600ms;
  }
`}</style>
    </div>
  )
}
