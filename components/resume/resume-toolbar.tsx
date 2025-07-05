"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Save, Download, Share, Settings, Palette, FileText, Sparkles } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

interface ResumeToolbarProps {
  template: string
  onTemplateChange: () => void
}

export function ResumeToolbar({ template, onTemplateChange }: ResumeToolbarProps) {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Resume saved",
      description: "Your changes have been saved successfully.",
    })
  }

  const handleExport = (format: string) => {
    toast({
      title: "Export started",
      description: `Exporting resume as ${format.toUpperCase()}...`,
    })
  }

  const handleAIEnhance = () => {
    toast({
      title: "AI Enhancement",
      description: "Analyzing your resume for improvement opportunities...",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
    >
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold">Resume Builder</h1>
            <Badge variant="outline" className="text-xs bg-white/80 backdrop-blur-sm">
              Draft
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleAIEnhance}
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Enhance
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("html")}>Export as HTML</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("docx")}>Export as DOCX</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="sm"
            onClick={onTemplateChange}
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Palette className="h-4 w-4 mr-2" />
            Template
          </Button>

          <Button variant="ghost" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Button variant="ghost" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
