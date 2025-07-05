"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Target, Award, Briefcase, GraduationCap, Code, User } from "lucide-react"
import { motion } from "framer-motion"

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
    icon: Award,
    title: "Highlight Achievements",
    description: "Focus on accomplishments rather than duties",
    action: "achievements",
  },
  {
    icon: Code,
    title: "Technical Skills",
    description: "Add relevant technical skills for your role",
    action: "skills",
  },
]

const sectionTemplates = [
  {
    icon: User,
    title: "Professional Summary",
    description: "Add a compelling overview of your experience",
    action: "summary",
  },
  {
    icon: Briefcase,
    title: "Work Experience",
    description: "Add a new job position with bullet points",
    action: "experience",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Add educational background and achievements",
    action: "education",
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
          "\n\n**Strong Action Verbs:**\n- Achieved, Implemented, Optimized, Led, Developed, Streamlined, Launched, Coordinated, Negotiated, Increased, Decreased, Resolved"
        break
      case "quantify":
        suggestion =
          "\n\n**Quantified Achievements:**\n- Increased sales by 25% in Q4 2023\n- Reduced costs by $50K annually\n- Improved efficiency by 30%\n- Managed a team of 12 developers\n- Completed 15 projects ahead of schedule"
        break
      case "achievements":
        suggestion =
          "\n\n**Achievement Examples:**\n- Led the development of a new product feature that increased user engagement by 40%\n- Received Employee of the Month award for outstanding performance\n- Spearheaded process improvement initiative that saved the company $100K annually"
        break
      case "skills":
        suggestion =
          "\n\n**Technical Skills:**\n- Programming Languages: JavaScript, Python, Java, TypeScript\n- Frameworks: React, Node.js, Express, Django\n- Tools: Git, Docker, AWS, MongoDB, PostgreSQL\n- Methodologies: Agile, Scrum, DevOps, CI/CD"
        break
      case "summary":
        suggestion =
          "\n\n## Professional Summary\n\nResults-driven professional with X years of experience in [industry/field]. Proven track record of [key achievement] and [key skill]. Adept at [relevant skill] and [relevant skill], with a focus on [value proposition]. Seeking to leverage my expertise in [area of expertise] to drive success at [target company/role]."
        break
      case "experience":
        suggestion =
          "\n\n### [Job Title] | [Company Name]\n*[Start Date] - [End Date]*\n\n- Accomplished [result] by implementing [action]\n- Increased [metric] by [percentage] through [method]\n- Led a team of [number] people to achieve [goal]\n- Developed and implemented [project/process] that [result]"
        break
      case "education":
        suggestion =
          "\n\n### [Degree] in [Field of Study]\n*[University Name] | [Graduation Year]*\n\n- GPA: [GPA]/4.0\n- Relevant Coursework: [Course 1], [Course 2], [Course 3]\n- Honors/Awards: [Honor/Award]\n- Activities: [Activity/Club/Organization]"
        break
    }

    handleChange(localContent + suggestion)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Resume Editor</h2>
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            {template} template
          </Badge>
        </div>

        {/* Smart Suggestions */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            <h3 className="text-sm font-semibold col-span-full mb-1">Improve Your Content</h3>
            {smartSuggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors border shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <suggestion.icon className="h-4 w-4 text-primary" />
                      </div>
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2"
          >
            <h3 className="text-sm font-semibold col-span-full mb-1">Add Sections</h3>
            {sectionTemplates.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors border shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <section.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{section.title}</p>
                        <p className="text-xs text-muted-foreground">{section.description}</p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => applySuggestion(section.action)}>
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex-1 p-4 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-950 dark:to-blue-950/10">
        <Textarea
          value={localContent}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Start writing your resume content using MDX format..."
          className="h-full resize-none font-mono text-sm border shadow-sm bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
        />
      </div>
    </div>
  )
}
