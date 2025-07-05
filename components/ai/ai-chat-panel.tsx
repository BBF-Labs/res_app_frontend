"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles, Crown } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIChatPanelProps {
  resumeContent: string
  onSuggestion: (suggestion: string) => void
}

export function AIChatPanel({ resumeContent, onSuggestion }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your AI resume assistant. I can help you improve your resume content, suggest better phrasing, and optimize it for specific job descriptions. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  const isPremium = user?.subscription === "premium"

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true)

    setTimeout(() => {
      let response = ""

      if (userMessage.toLowerCase().includes("improve") || userMessage.toLowerCase().includes("better")) {
        response =
          'I can help you improve your resume! Here are some suggestions:\n\n• Use stronger action verbs like "achieved," "implemented," or "optimized"\n• Quantify your accomplishments with specific numbers and percentages\n• Tailor your skills section to match the job requirements\n\nWould you like me to help with any specific section?'
      } else if (userMessage.toLowerCase().includes("action verbs")) {
        response =
          "Great choice! Here are powerful action verbs for different categories:\n\n**Leadership:** Led, Managed, Directed, Supervised\n**Achievement:** Achieved, Exceeded, Delivered, Accomplished\n**Technical:** Developed, Implemented, Designed, Optimized\n**Communication:** Presented, Collaborated, Negotiated, Facilitated"
      } else if (userMessage.toLowerCase().includes("quantify")) {
        response =
          "Quantifying your achievements makes them more impactful! Try adding:\n\n• Percentages (increased sales by 25%)\n• Dollar amounts (saved company $50K annually)\n• Time frames (completed project 2 weeks ahead of schedule)\n• Team sizes (managed team of 8 developers)\n• Scale (processed 1000+ customer requests daily)"
      } else {
        response =
          "I understand you want to improve your resume. I can help with:\n\n• Writing compelling bullet points\n• Optimizing for ATS systems\n• Tailoring content for specific jobs\n• Improving formatting and structure\n\nWhat specific area would you like to focus on?"
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSend = () => {
    if (!input.trim()) return

    if (!isPremium) {
      // Show upgrade prompt for free users
      const upgradeMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "AI chat is available for Premium users. Upgrade to get personalized resume assistance, unlimited AI suggestions, and advanced optimization features!",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, upgradeMessage])
      setInput("")
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    simulateAIResponse(input)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-full flex flex-col bg-background border-l">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-primary" />
          <span>AI Assistant</span>
          {!isPremium && (
            <Badge variant="outline" className="ml-auto">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      {!isPremium && (
        <div className="mx-4 mb-4">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Upgrade to Premium</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Get unlimited AI assistance, advanced resume scoring, and premium templates.
              </p>
              <Button size="sm" className="w-full">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex space-x-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isPremium ? "Ask me anything about your resume..." : "Upgrade to chat with AI..."}
            disabled={!isPremium}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!input.trim() || !isPremium} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
