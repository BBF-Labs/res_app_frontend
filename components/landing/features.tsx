"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, FileText, Download, BarChart3, Palette, Zap, Shield, Users, Clock } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Writing",
    description:
      "Get intelligent suggestions to improve your resume content with action verbs and quantified achievements.",
  },
  {
    icon: BarChart3,
    title: "Resume Scoring",
    description: "Receive personalized scores and feedback to optimize your resume for specific job descriptions.",
  },
  {
    icon: Palette,
    title: "Professional Templates",
    description: "Choose from dozens of ATS-friendly templates designed by career experts.",
  },
  {
    icon: Download,
    title: "Multiple Export Formats",
    description: "Download your resume as PDF, HTML, or DOCX with perfect formatting every time.",
  },
  {
    icon: FileText,
    title: "MDX Content Management",
    description: "Edit your resume with powerful MDX support for rich formatting and dynamic content.",
  },
  {
    icon: Zap,
    title: "Real-time Preview",
    description: "See changes instantly with our live preview editor and auto-save functionality.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and secure. We never share your information with third parties.",
  },
  {
    icon: Users,
    title: "Multi-Resume Management",
    description: "Create and manage multiple resume versions for different job applications.",
  },
  {
    icon: Clock,
    title: "Quick Setup",
    description: "Get started in minutes with our guided onboarding and smart content suggestions.",
  },
]

export function Features() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-black mb-4">Everything You Need to Build the Perfect Resume</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform combines AI technology with professional design to help you create resumes that
            stand out from the competition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border shadow-sm hover:shadow-md transition-shadow bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-16 left-16 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-200/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-200/25 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
