"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Upload, Zap, Star, BarChart3, PenTool, FileText, TrendingUp, Sparkles, Crown } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 md:space-y-10"
          >
            <div className="space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-3"
              >
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900 dark:to-emerald-900 dark:text-green-100 px-3 py-1 text-sm font-medium"
                >
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Excellent
                </Badge>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-green-500 text-green-500" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">12,192 reviews on</span>
                <span className="text-sm font-semibold text-green-600">Trustpilot</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight"
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  AI Resume Builder
                </span>
                <br />
                <span className="text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  (Fast, Easy & Free to Use)
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                Land your next job with one of the best AI resume builders online. Work from your computer or phone with
                dozens of recruiter-approved templates and add ready-to-use skills and phrases in one click.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/uploads" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg px-8 h-14 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Upload className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Import your resume
                </Button>
              </Link>
              <Link href="/builder/resume" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Sparkles className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Create my resume
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4"
            >
              <Link href="/scoring">
                <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white/80 backdrop-blur-sm border-0 shadow-md">
                  <CardContent className="p-0 flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl group-hover:scale-110 transition-transform">
                      <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Score Resume</div>
                      <div className="text-xs text-muted-foreground">Get AI feedback</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/builder/cover-letter">
                <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white/80 backdrop-blur-sm border-0 shadow-md">
                  <CardContent className="p-0 flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl group-hover:scale-110 transition-transform">
                      <PenTool className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Cover Letter</div>
                      <div className="text-xs text-muted-foreground">AI-powered</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/templates">
                <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white/80 backdrop-blur-sm border-0 shadow-md">
                  <CardContent className="p-0 flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-xl group-hover:scale-110 transition-transform">
                      <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Templates</div>
                      <div className="text-xs text-muted-foreground">Professional</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Resume Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative">
              {/* Main Resume Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20"
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">CS</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Christina Simmons</h3>
                      <p className="text-muted-foreground text-lg">Senior Software Engineer</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full w-full"></div>
                    <div className="h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full w-3/4"></div>
                    <div className="h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full w-1/2"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full w-full"></div>
                    <div className="h-3 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full w-2/3"></div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-6 -right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span className="text-sm font-semibold">Get the job 2x faster</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Crown className="h-5 w-5" />
                  <span className="text-sm font-semibold">Smart AI Writing Help</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute top-1/2 -right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg"
              >
                <TrendingUp className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
    </section>
  )
}
