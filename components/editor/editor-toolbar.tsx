"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Save, Download, Share, Settings, BarChart3, Palette, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface EditorToolbarProps {
  resume: any
}

export function EditorToolbar({ resume }: EditorToolbarProps) {
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

  const handleScore = () => {
    toast({
      title: "Scoring resume",
      description: "Analyzing your resume for optimization opportunities...",
    })
  }

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">{resume.title}</h1>
            <Badge variant="outline" className="text-xs">
              {resume.status}
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          <Button variant="ghost" size="sm" onClick={handleScore}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Score
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

          <Button variant="ghost" size="sm">
            <Palette className="h-4 w-4 mr-2" />
            Template
          </Button>

          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
