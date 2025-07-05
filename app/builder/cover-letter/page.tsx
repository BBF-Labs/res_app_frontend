"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { CoverLetterEditor } from "@/components/cover-letter/cover-letter-editor"
import { CoverLetterPreview } from "@/components/cover-letter/cover-letter-preview"
import { CoverLetterToolbar } from "@/components/cover-letter/cover-letter-toolbar"
import { AIChatPanel } from "@/components/ai/ai-chat-panel"
import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { motion } from "framer-motion"

export default function CoverLetterBuilderPage() {
  const [content, setContent] = useState("")
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [template, setTemplate] = useState("professional")

  useEffect(() => {
    // Initialize with template content
    const templateContent = `# Cover Letter

**[Your Name]**  
[Your Address]  
[City, State ZIP Code]  
[Your Email]  
[Your Phone Number]  

**[Date]**

**[Hiring Manager's Name]**  
[Company Name]  
[Company Address]  
[City, State ZIP Code]

Dear Hiring Manager,

I am writing to express my strong interest in the [Position Title] role at [Company Name]. With my background in [relevant field/experience], I am confident that I would be a valuable addition to your team.

## Why I'm a Great Fit

In my previous role as [Previous Position] at [Previous Company], I successfully:

- [Achievement 1 with specific metrics]
- [Achievement 2 with quantifiable results]
- [Achievement 3 demonstrating relevant skills]

## What Excites Me About This Role

I am particularly drawn to [Company Name] because of [specific reason related to company/role]. Your commitment to [company value/mission] aligns perfectly with my professional values and career goals.

## Next Steps

I would welcome the opportunity to discuss how my experience and passion can contribute to [Company Name]'s continued success. Thank you for considering my application.

Sincerely,  
[Your Name]`

    setContent(templateContent)
  }, [])

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    // Auto-save functionality would go here
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <CoverLetterToolbar template={template} onTemplateChange={setTemplate} />

      <div className="flex h-[calc(100vh-8rem)]">
        {/* Editor Panel */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 border-r"
        >
          <CoverLetterEditor content={content} onChange={handleContentChange} template={template} />
        </motion.div>

        {/* Preview Panel */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 border-r"
        >
          <CoverLetterPreview content={content} template={template} />
        </motion.div>

        {/* AI Chat Panel */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`transition-all duration-300 ${showAIPanel ? "w-80" : "w-0"} overflow-hidden`}
        >
          <AIChatPanel
            resumeContent={content}
            onSuggestion={(suggestion) => {
              setContent((prev) => prev + "\n\n" + suggestion)
            }}
          />
        </motion.div>

        {/* AI Panel Toggle */}
        <div className="absolute right-4 top-20">
          <Button variant="outline" size="icon" onClick={() => setShowAIPanel(!showAIPanel)} className="shadow-lg">
            {showAIPanel ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
