"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  FileText,
  Menu,
  X,
  ChevronDown,
  Search,
  MessageCircle,
  BarChart3,
  PenTool,
  BookOpen,
  HelpCircle,
  Briefcase,
  Star,
  Zap,
  FileCheck,
  Target,
  Users,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"

const navigationItems = [
  {
    title: "Builder",
    items: [
      { title: "Resume Builder", description: "Create professional resumes", icon: FileText, href: "/builder/resume" },
      {
        title: "Cover Letter Builder",
        description: "Write compelling cover letters",
        icon: PenTool,
        href: "/builder/cover-letter",
      },
      { title: "AI Writing Assistant", description: "Get AI-powered suggestions", icon: Zap, href: "/ai-assistant" },
      { title: "Templates", description: "Browse professional templates", icon: Star, href: "/templates" },
    ],
  },
  {
    title: "Resume",
    items: [
      { title: "Resume Examples", description: "Get inspired by examples", icon: FileCheck, href: "/examples/resume" },
      { title: "Resume Checker", description: "Analyze your resume", icon: BarChart3, href: "/scoring" },
      {
        title: "ATS Optimization",
        description: "Beat applicant tracking systems",
        icon: Target,
        href: "/ats-optimization",
      },
      { title: "Resume Formats", description: "Choose the right format", icon: FileText, href: "/formats" },
    ],
  },
  {
    title: "CV",
    items: [
      { title: "CV Builder", description: "Create academic CVs", icon: FileText, href: "/builder/cv" },
      { title: "CV Examples", description: "Academic CV samples", icon: BookOpen, href: "/examples/cv" },
      { title: "CV vs Resume", description: "Learn the differences", icon: HelpCircle, href: "/cv-vs-resume" },
    ],
  },
  {
    title: "Cover Letter",
    items: [
      {
        title: "AI Cover Letter Generator",
        description: "Create a cover letter in minutes",
        icon: Zap,
        href: "/builder/cover-letter",
      },
      {
        title: "Cover Letter Templates",
        description: "Find templates for any job",
        icon: Star,
        href: "/templates/cover-letter",
      },
      {
        title: "Cover Letter Examples",
        description: "Get inspired by examples",
        icon: FileCheck,
        href: "/examples/cover-letter",
      },
      {
        title: "How to Write a Cover Letter",
        description: "Expert tips and advice",
        icon: HelpCircle,
        href: "/guides/cover-letter",
      },
      {
        title: "Cover Letter Formats",
        description: "Choose the right format",
        icon: FileText,
        href: "/formats/cover-letter",
      },
    ],
  },
  {
    title: "Advice",
    items: [
      { title: "Career Advice", description: "Expert career guidance", icon: TrendingUp, href: "/advice/career" },
      { title: "Interview Tips", description: "Ace your interviews", icon: Users, href: "/advice/interview" },
      { title: "Job Search", description: "Find your dream job", icon: Briefcase, href: "/advice/job-search" },
      { title: "Salary Negotiation", description: "Get paid what you're worth", icon: Target, href: "/advice/salary" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Blog", description: "Career tips and insights", icon: BookOpen, href: "/blog" },
      { title: "Help Center", description: "Get support", icon: HelpCircle, href: "/help" },
      { title: "Contact Us", description: "Reach out to our team", icon: MessageCircle, href: "/contact" },
    ],
  },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex items-baseline">
            <span className="text-lg font-bold">Res</span>
            <span className="text-lg font-bold text-primary">.</span>
            <span className="text-lg font-bold">U</span>
            <span className="text-lg font-bold text-primary">.</span>
            <span className="text-lg font-bold">Me</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Popover key={item.title}>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium h-9 px-3">
                  {item.title}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="start">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4">
                  <div className="grid gap-3">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <subItem.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{subItem.title}</div>
                          <div className="text-xs text-muted-foreground">{subItem.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </PopoverContent>
            </Popover>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          {/* Search */}
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Search className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search templates, examples..." className="border-0 focus-visible:ring-0" />
                </div>
              </motion.div>
            </PopoverContent>
          </Popover>

          {/* Chat */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <MessageCircle className="h-4 w-4" />
          </Button>

          <ModeToggle />

          {user ? (
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/dashboard">
                <Button variant="ghost" className="h-9">
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" onClick={logout} className="h-9">
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" className="h-9">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="h-9 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-background overflow-hidden"
          >
            <nav className="container px-4 py-4 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  <div className="font-medium text-sm text-muted-foreground">{item.title}</div>
                  <div className="grid gap-2 pl-4">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="flex items-center space-x-2 text-sm hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Mobile auth buttons */}
              <div className="pt-4 border-t">
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <Link href="/dashboard" className="w-full">
                      <Button variant="ghost" className="w-full justify-start">
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={logout} className="w-full">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link href="/auth/login" className="w-full">
                      <Button variant="ghost" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register" className="w-full">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
