"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Save, Download, Share, Settings, Palette, PenTool } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

interface CoverLetterToolbarProps {
  template: string
  onTemplateChange: (template: string) => void
}

export function CoverLetterToolbar({ template, onTemplateChange }: CoverLetterToolbarProps) {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Cover letter saved",
      description: "Your changes have been saved successfully.",
    })
  }

  const handleExport = (format: string) => {
    toast({
      title: "Export started",
      description: `Exporting cover letter as ${format.toUpperCase()}...`,
    })
  }

  const templates = [
    { id: "professional", name: "Professional" },
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
    { id: "creative", name: "Creative" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <PenTool className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Cover Letter Builder</h1>
            <Badge variant="outline" className="text-xs">
              Draft
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Palette className="h-4 w-4 mr-2" />
                Template
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {templates.map((tmpl) => (
                <DropdownMenuItem
                  key={tmpl.id}
                  onClick={() => onTemplateChange(tmpl.id)}
                  className={template === tmpl.id ? "bg-muted" : ""}
                >
                  {tmpl.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
