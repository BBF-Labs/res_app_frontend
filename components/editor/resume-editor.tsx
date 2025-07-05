"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Zap, Target } from "lucide-react"

interface ResumeEditorProps {
  content: string
  onChange: (content: string) => void
  template: string
}

const smartSuggestions = [
  {
    icon: Zap,
    title: "Add Action Verbs",
    description: "Use powerful action verbs to start your bullet points",
    action: "action-verbs",
  },
  {
    icon: Target,
    title: "Quantify Impact",
    description: "Add numbers and metrics to show your achievements",
    action: "quantify",
  },
  {
    icon: Lightbulb,
    title: "Improve Skills",
    description: "Enhance your skills section with relevant keywords",
    action: "skills",
  },
]

export function ResumeEditor({ content, onChange, template }: ResumeEditorProps) {
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
      case "action-verbs":
        suggestion =
          "\n\n**Strong Action Verbs to Consider:**\n- Achieved, Implemented, Optimized, Led, Developed, Streamlined"
        break
      case "quantify":
        suggestion =
          "\n\n**Add Metrics:**\n- Increased sales by X%\n- Reduced costs by $X\n- Managed team of X people\n- Completed X projects"
        break
      case "skills":
        suggestion =
          "\n\n**Technical Skills:**\n- Programming Languages: JavaScript, Python, Java\n- Frameworks: React, Node.js, Express\n- Tools: Git, Docker, AWS"
        break
    }

    handleChange(localContent + suggestion)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Resume Editor</h2>
          <Badge variant="outline">{template} template</Badge>
        </div>

        {/* Smart Suggestions */}
        <div className="grid grid-cols-1 gap-2">
          {smartSuggestions.map((suggestion, index) => (
            <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
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
          ))}
        </div>
      </div>

      <div className="flex-1 p-4">
        <Textarea
          value={localContent}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Start writing your resume content using MDX format..."
          className="h-full resize-none font-mono text-sm"
        />
      </div>
    </div>
  )
}
