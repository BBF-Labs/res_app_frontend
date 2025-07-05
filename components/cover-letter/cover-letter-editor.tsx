"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, PenTool, Users, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

interface CoverLetterEditorProps {
  content: string
  onChange: (content: string) => void
  template: string
}

const smartSuggestions = [
  {
    icon: PenTool,
    title: "Personalize Opening",
    description: "Address the hiring manager by name",
    action: "personalize",
  },
  {
    icon: Target,
    title: "Highlight Achievements",
    description: "Add specific accomplishments with metrics",
    action: "achievements",
  },
  {
    icon: Users,
    title: "Show Company Knowledge",
    description: "Demonstrate research about the company",
    action: "company-research",
  },
  {
    icon: Briefcase,
    title: "Match Job Requirements",
    description: "Align your skills with job posting",
    action: "job-match",
  },
]

export function CoverLetterEditor({ content, onChange, template }: CoverLetterEditorProps) {
  const [localContent, setLocalContent] = useState(content)

  useEffect(() => {
    setLocalContent(content)
  }, [content])

  const handleChange = (value: string) => {
    setLocalContent(value)
    onChange(value)
  }

  const applySuggestion = (action: string) => {
    let suggestion = ""

    switch (action) {
      case "personalize":
        suggestion =
          "\n\n**Personalization Tips:**\n- Research the hiring manager's name on LinkedIn\n- Mention specific company projects or values\n- Reference recent company news or achievements"
        break
      case "achievements":
        suggestion =
          "\n\n**Achievement Examples:**\n- Increased sales by 25% in Q4 2023\n- Led a team of 8 developers on a $2M project\n- Reduced customer churn by 15% through improved onboarding"
        break
      case "company-research":
        suggestion =
          "\n\n**Company Research Points:**\n- Recent product launches or expansions\n- Company mission and values alignment\n- Industry leadership and innovation\n- Company culture and work environment"
        break
      case "job-match":
        suggestion =
          "\n\n**Job Matching Strategy:**\n- Mirror keywords from job description\n- Address required qualifications directly\n- Provide examples for preferred skills\n- Show enthusiasm for specific responsibilities"
        break
    }

    handleChange(localContent + suggestion)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Cover Letter Editor</h2>
          <Badge variant="outline">{template} template</Badge>
        </div>

        {/* Smart Suggestions */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-2">
          {smartSuggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <suggestion.icon className="h-4 w-4 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{suggestion.title}</p>
                      <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => applySuggestion(suggestion.action)}>
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex-1 p-4">
        <Textarea
          value={localContent}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Start writing your cover letter using MDX format..."
          className="h-full resize-none font-mono text-sm"
        />
      </div>
    </div>
  )
}
