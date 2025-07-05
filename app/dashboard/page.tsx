"use client"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { useResumes } from "@/hooks/use-resumes"
import { Plus, FileText, Edit, Download, BarChart3, Calendar, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { user } = useAuth()
  const { resumes, isLoading, createResume } = useResumes()

  const handleCreateResume = async () => {
    try {
      const newResume = await createResume({
        title: "Untitled Resume",
        template: "modern",
      })
      // Redirect to editor
      window.location.href = `/editor/${newResume.id}`
    } catch (error) {
      console.error("Failed to create resume:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-950 dark:to-blue-950/10">
      <Header />
      <main className="container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted-foreground">Manage your resumes and track your job application progress.</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resumes?.length || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2d ago</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resumes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Resumes</h2>
            <Button
              onClick={handleCreateResume}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Resume
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : resumes && resumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{resume.title}</CardTitle>
                        <Badge
                          variant={resume.status === "published" ? "default" : "secondary"}
                          className="bg-white/80 backdrop-blur-sm"
                        >
                          {resume.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        Template: {resume.template} • Updated {new Date(resume.updatedAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-muted-foreground">
                          Score: <span className="font-semibold text-primary">{resume.score || "Not scored"}%</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/editor/${resume.id}`} className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full bg-white/80 backdrop-blur-sm hover:bg-white"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 bg-white/80 backdrop-blur-sm border shadow-md">
              <CardContent>
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="mb-2">No resumes yet</CardTitle>
                <CardDescription className="mb-4">
                  Create your first resume to get started with Res.U.Me.
                </CardDescription>
                <Button
                  onClick={handleCreateResume}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Resume
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
