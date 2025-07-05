"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Search, Star, Download, Eye, Zap, Crown, FileText, PenTool } from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  name: string
  category: "resume" | "cover-letter"
  style: "modern" | "classic" | "creative" | "minimal" | "professional"
  preview: string
  isPremium: boolean
  rating: number
  downloads: number
  description: string
}

const templates: Template[] = [
  {
    id: "1",
    name: "Modern Professional",
    category: "resume",
    style: "modern",
    preview: "/placeholder.svg?height=400&width=300",
    isPremium: false,
    rating: 4.9,
    downloads: 15420,
    description: "Clean, modern design perfect for tech professionals",
  },
  {
    id: "2",
    name: "Classic Executive",
    category: "resume",
    style: "classic",
    preview: "/placeholder.svg?height=400&width=300",
    isPremium: true,
    rating: 4.8,
    downloads: 12350,
    description: "Traditional format ideal for executive positions",
  },
  {
    id: "3",
    name: "Creative Designer",
    category: "resume",
    style: "creative",
    preview: "/placeholder.svg?height=400&width=300",
    isPremium: true,
    rating: 4.7,
    downloads: 8920,
    description: "Eye-catching design for creative professionals",
  },
  {
    id: "4",
    name: "Minimal Clean",
    category: "resume",
    style: "minimal",
    preview: "/placeholder.svg?height=400&width=300",
    isPremium: false,
    rating: 4.9,
    downloads: 18750,
    description: "Simple, clean layout that focuses on content",
  },
  {
    id: "5",
    name: "Professional Cover Letter",
    category: "cover-letter",
    style: "professional",
    preview: "/placeholder.svg?height=400&width=300",
    isPremium: false,
    rating: 4.8,
    downloads: 9840,
    description: "Professional cover letter template",
  },
  {
    id: "6",
    name: "Modern Cover Letter",
    category: "cover-letter",
    style: "modern",
    preview: "/placeholder.svg?height=400&width=300",
    isPremium: true,
    rating: 4.9,
    downloads: 7650,
    description: "Modern cover letter with visual elements",
  },
]

const categories = [
  { id: "all", label: "All Templates", icon: FileText },
  { id: "resume", label: "Resume Templates", icon: FileText },
  { id: "cover-letter", label: "Cover Letter Templates", icon: PenTool },
]

const styles = [
  { id: "all", label: "All Styles" },
  { id: "modern", label: "Modern" },
  { id: "classic", label: "Classic" },
  { id: "creative", label: "Creative" },
  { id: "minimal", label: "Minimal" },
  { id: "professional", label: "Professional" },
]

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStyle, setSelectedStyle] = useState("all")
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesStyle = selectedStyle === "all" || template.style === selectedStyle
    const matchesPremium = !showPremiumOnly || template.isPremium

    return matchesSearch && matchesCategory && matchesStyle && matchesPremium
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">New, professional designs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from a wide range of styles for every job level and type. From fun and creative to simple and modern,
            there's a perfect design for everyone.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-3 lg:w-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                    <category.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-wrap gap-2">
            {styles.map((style) => (
              <Button
                key={style.id}
                variant={selectedStyle === style.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStyle(style.id)}
              >
                {style.label}
              </Button>
            ))}
            <Button
              variant={showPremiumOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowPremiumOnly(!showPremiumOnly)}
            >
              <Crown className="h-4 w-4 mr-1" />
              Premium Only
            </Button>
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={template.preview || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {template.isPremium && (
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Link href={`/builder/${template.category}?template=${template.id}`}>
                      <Button size="sm">
                        <Zap className="h-4 w-4 mr-1" />
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{template.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{template.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{template.description}</p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Download className="h-3 w-3" />
                        <span>{template.downloads.toLocaleString()} downloads</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {template.style}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredTemplates.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to create your perfect resume?</h2>
          <p className="text-muted-foreground mb-6">
            Choose a template and start building your professional resume in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder/resume">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600">
                <Zap className="mr-2 h-5 w-5" />
                Start Building Resume
              </Button>
            </Link>
            <Link href="/builder/cover-letter">
              <Button size="lg" variant="outline">
                <PenTool className="mr-2 h-5 w-5" />
                Create Cover Letter
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
