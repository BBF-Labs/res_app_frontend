"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Star } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const resumeExamples = [
  {
    id: 1,
    title: "Teacher Resume",
    category: "Education",
    image: "/placeholder.svg?height=400&width=300",
    description: "Professional teacher resume template with clean design",
    rating: 4.9,
    downloads: "12.5k",
  },
  {
    id: 2,
    title: "College Resume",
    category: "Student",
    image: "/placeholder.svg?height=400&width=300",
    description: "Perfect for recent graduates and college students",
    rating: 4.8,
    downloads: "8.2k",
  },
  {
    id: 3,
    title: "Registered Nurse Resume",
    category: "Healthcare",
    image: "/placeholder.svg?height=400&width=300",
    description: "Healthcare professional resume with medical focus",
    rating: 4.9,
    downloads: "15.3k",
  },
  {
    id: 4,
    title: "Administrative Assistant",
    category: "Business",
    image: "/placeholder.svg?height=400&width=300",
    description: "Professional administrative role resume template",
    rating: 4.7,
    downloads: "9.8k",
  },
]

export function ResumeExamples() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:from-gray-950 dark:via-slate-950 dark:to-zinc-950">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-black mb-4">Find Inspiration in Real-World Examples</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Browse{" "}
            <Link href="/examples" className="text-blue-600 hover:underline font-medium">
              100+ popular resume examples
            </Link>{" "}
            covering all types of jobs, industries and levels of experience. Every example has been reviewed and
            approved by a Certified Professional Resume Writer (CPRW).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {resumeExamples.map((example, index) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm">
                <div className="relative">
                  <img
                    src={example.image || "/placeholder.svg"}
                    alt={example.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Download className="h-4 w-4 mr-1" />
                        Use
                      </Button>
                    </div>
                  </div>

                  {/* Blue circle with magnifying glass */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {example.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{example.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-center text-blue-600">{example.title}</h3>

                    <div className="text-center text-xs text-muted-foreground">{example.downloads} downloads</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 border"
        >
          <p className="text-muted-foreground mb-4">
            These professional templates have been tested in the real world and proven to bypass HR screening software.
            Rest easy knowing that your resume will land in human hands.
          </p>
          <p className="text-muted-foreground mb-6">
            Want to try our{" "}
            <Link href="/builder/resume" className="text-blue-600 hover:underline font-medium">
              AI Resume Builder for free
            </Link>
            ? Create a resume in our builder and download it as a plain TXT file. When you're ready to try a premium
            template you can upgrade your free resume.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/examples">
              <Button size="lg" variant="outline">
                View All Examples
              </Button>
            </Link>
            <Link href="/builder/resume">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Building Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gray-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-zinc-200/25 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
