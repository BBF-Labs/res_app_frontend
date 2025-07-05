"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ResumeEditor } from "@/components/resume/resume-editor"
import { ResumePreview } from "@/components/resume/resume-preview"
import { ResumeToolbar } from "@/components/resume/resume-toolbar"
import { AIChatPanel } from "@/components/ai/ai-chat-panel"
import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { motion } from "framer-motion"
import { TemplatePicker } from "@/components/resume/template-picker"

export default function ResumeBuilderPage() {
  const [content, setContent] = useState("")
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [template, setTemplate] = useState("modern")
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)

  useEffect(() => {
    // Initialize with template content
    const templateContent = `# John Doe
## Software Engineer

**Email:** john@example.com  
**Phone:** (555) 123-4567  
**Location:** San Francisco, CA  
**LinkedIn:** linkedin.com/in/johndoe

## Professional Summary

Experienced software engineer with 5+ years of experience building scalable web applications and leading development teams. Passionate about clean code, performance optimization, and mentoring junior developers.

## Experience

### Senior Software Engineer | Tech Corp
*January 2022 - Present*

- Led development of microservices architecture serving 1M+ users
- Improved application performance by 40% through optimization
- Mentored 3 junior developers and conducted code reviews
- Implemented CI/CD pipelines reducing deployment time by 60%

### Software Engineer | StartupXYZ
*June 2019 - December 2021*

- Built responsive web applications using React and Node.js
- Implemented CI/CD pipelines reducing deployment time by 60%
- Collaborated with cross-functional teams on product features
- Reduced API response time by 30% through query optimization

## Skills

**Programming Languages:** JavaScript, TypeScript, Python, Java  
**Frameworks:** React, Node.js, Express, Django  
**Tools:** Git, Docker, AWS, MongoDB, PostgreSQL  
**Soft Skills:** Leadership, Communication, Problem-solving

## Education

### Bachelor of Science in Computer Science
*University of California, Berkeley | 2015-2019*

- GPA: 3.8/4.0
- Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Development
- Senior Project: Developed a real-time collaborative code editor`

    setContent(templateContent)
  }, [])

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    // Auto-save functionality would go here
  }

  const handleTemplateChange = (newTemplate: string) => {
    setTemplate(newTemplate)
    setShowTemplatePicker(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background flex flex-col">
      <Header />
      <ResumeToolbar template={template} onTemplateChange={() => setShowTemplatePicker(true)} />

      <div className="flex flex-1 h-[calc(100vh-8rem)] relative">
        {/* Editor Panel */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 border-r"
        >
          <ResumeEditor content={content} onChange={handleContentChange} template={template} />
        </motion.div>

        {/* Preview Panel */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 border-r"
        >
          <ResumePreview content={content} template={template} />
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
        <div className="absolute right-4 top-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowAIPanel(!showAIPanel)}
            className="shadow-lg rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            {showAIPanel ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Template Picker Modal */}
      {showTemplatePicker && (
        <TemplatePicker
          currentTemplate={template}
          onSelect={handleTemplateChange}
          onClose={() => setShowTemplatePicker(false)}
        />
      )}

      <Footer />
    </motion.div>
  )
}
