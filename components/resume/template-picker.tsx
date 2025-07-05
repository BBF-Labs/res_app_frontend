"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Check } from "lucide-react"
import { motion } from "framer-motion"

interface TemplatePickerProps {
  currentTemplate: string
  onSelect: (template: string) => void
  onClose: () => void
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean, contemporary design with a touch of color",
    preview: "/placeholder.svg?height=300&width=200",
    isPremium: false,
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional format ideal for conservative industries",
    preview: "/placeholder.svg?height=300&width=200",
    isPremium: false,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Eye-catching design for creative professionals",
    preview: "/placeholder.svg?height=300&width=200",
    isPremium: true,
  },
  {
    id: "professional",
    name: "Professional",
    description: "Polished look for executive and senior positions",
    preview: "/placeholder.svg?height=300&width=200",
    isPremium: true,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple, clean layout that focuses on content",
    preview: "/placeholder.svg?height=300&width=200",
    isPremium: false,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for leadership roles",
    preview: "/placeholder.svg?height=300&width=200",
    isPremium: true,
  },
]

export function TemplatePicker({ currentTemplate, onSelect, onClose }: TemplatePickerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(currentTemplate)

  const handleSelect = () => {
    onSelect(selectedTemplate)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-blue-50 dark:from-gray-950 dark:to-blue-950/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Choose a Template</DialogTitle>
          <DialogDescription>
            Select a template that best showcases your professional experience and skills.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                  selectedTemplate === template.id ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
                } bg-white/90 backdrop-blur-sm`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="relative">
                  <img
                    src={template.preview || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-48 object-cover"
                  />

                  {template.isPremium && (
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}

                  {selectedTemplate === template.id && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="bg-primary text-white p-2 rounded-full">
                        <Check className="h-6 w-6" />
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="font-bold">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSelect}>Apply Template</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
