"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ResumeEditor } from "@/components/resume/resume-editor"
import { ResumePreview } from "@/components/resume/resume-preview"
import { ResumeToolbar } from "@/components/resume/resume-toolbar"
import { AIChatPanel } from "@/components/ai/ai-chat-panel"
import { useResume } from "@/hooks/use-resume"
import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeftOpen, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { TemplatePicker } from "@/components/resume/template-picker"

export default function EditorPage() {
  const params = useParams()
  const resumeId = params.id as string
  const { resume, isLoading, updateResume } = useResume(resumeId)
  const [content, setContent] = useState("")
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)
  const [template, setTemplate] = useState("modern")

  useEffect(() => {
    if (resume) {
      setContent(resume.content || "")
      setTemplate(resume.template || "modern")
    }
  }, [resume])

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    // Auto-save after 2 seconds of inactivity
    const timeoutId = setTimeout(() => {
      updateResume({ content: newContent })
    }, 2000)

    return () => clearTimeout(timeoutId)
  }

  const handleTemplateChange = (newTemplate: string) => {
    setTemplate(newTemplate)
    setShowTemplatePicker(false)
    updateResume({ template: newTemplate })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-950 dark:to-blue-950/10">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading resume...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-950 dark:to-blue-950/10">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Resume not found</h1>
            <p className="text-muted-foreground">The resume you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-950 dark:to-blue-950/10 flex flex-col"
    >
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
