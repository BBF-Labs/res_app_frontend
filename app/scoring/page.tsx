"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Target, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ScoreResult {
  overallScore: number
  categories: {
    name: string
    score: number
    feedback: string
    status: "good" | "warning" | "error"
  }[]
  suggestions: string[]
}

export default function ScoringPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [selectedResume, setSelectedResume] = useState<File | null>(null)
  const [isScoring, setIsScoring] = useState(false)
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null)
  const { toast } = useToast()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedResume(file)
      toast({
        title: "Resume uploaded",
        description: `${file.name} has been uploaded successfully.`,
      })
    }
  }

  const handleScore = async () => {
    if (!selectedResume || !jobDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload a resume and provide a job description.",
        variant: "destructive",
      })
      return
    }

    setIsScoring(true)

    // Simulate API call
    setTimeout(() => {
      const mockResult: ScoreResult = {
        overallScore: 87,
        categories: [
          {
            name: "Keyword Match",
            score: 92,
            feedback: "Excellent keyword alignment with job requirements",
            status: "good",
          },
          {
            name: "Experience Relevance",
            score: 85,
            feedback: "Strong relevant experience, could highlight leadership more",
            status: "good",
          },
          {
            name: "Skills Alignment",
            score: 78,
            feedback: "Missing some key technical skills mentioned in job posting",
            status: "warning",
          },
          {
            name: "Format & Structure",
            score: 95,
            feedback: "Professional formatting and clear structure",
            status: "good",
          },
          {
            name: "Quantified Achievements",
            score: 72,
            feedback: "Add more specific metrics and numbers to achievements",
            status: "warning",
          },
        ],
        suggestions: [
          "Add Python and Machine Learning to your skills section",
          "Quantify your project management achievements with specific numbers",
          "Include more leadership examples in your experience section",
          "Add relevant certifications mentioned in the job posting",
          "Use stronger action verbs in your bullet points",
        ],
      }

      setScoreResult(mockResult)
      setIsScoring(false)

      toast({
        title: "Scoring complete!",
        description: `Your resume scored ${mockResult.overallScore}% for this job.`,
      })
    }, 3000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Resume Scoring</h1>
            <p className="text-muted-foreground">
              Upload your resume and job description to get personalized feedback and optimization suggestions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Upload Resume</span>
                  </CardTitle>
                  <CardDescription>Upload your resume file (PDF, DOC, or DOCX)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                    </label>
                  </div>
                  {selectedResume && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{selectedResume.name}</span>
                        <Badge variant="outline" className="ml-auto">
                          {(selectedResume.size / 1024 / 1024).toFixed(1)} MB
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Job Description</span>
                  </CardTitle>
                  <CardDescription>Paste the job description you're applying for</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="job-description">Job Description</Label>
                    <Textarea
                      id="job-description"
                      placeholder="Paste the job description here..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="min-h-[200px]"
                    />
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleScore}
                disabled={isScoring || !selectedResume || !jobDescription.trim()}
                className="w-full"
                size="lg"
              >
                {isScoring ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Score My Resume
                  </>
                )}
              </Button>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {scoreResult ? (
                <>
                  {/* Overall Score */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Overall Score</CardTitle>
                      <CardDescription>How well your resume matches this job</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className={`text-4xl font-bold mb-2 ${getScoreColor(scoreResult.overallScore)}`}>
                          {scoreResult.overallScore}%
                        </div>
                        <Progress value={scoreResult.overallScore} className="mb-4" />
                        <p className="text-sm text-muted-foreground">
                          {scoreResult.overallScore >= 80
                            ? "Excellent match!"
                            : scoreResult.overallScore >= 60
                              ? "Good match with room for improvement"
                              : "Needs significant optimization"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Category Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Breakdown</CardTitle>
                      <CardDescription>Performance by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {scoreResult.categories.map((category, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(category.status)}
                                <span className="font-medium">{category.name}</span>
                              </div>
                              <span className={`font-bold ${getScoreColor(category.score)}`}>{category.score}%</span>
                            </div>
                            <Progress value={category.score} className="h-2" />
                            <p className="text-sm text-muted-foreground">{category.feedback}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Suggestions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Improvement Suggestions</CardTitle>
                      <CardDescription>Actionable tips to boost your score</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {scoreResult.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <CardTitle className="mb-2">Ready to Score</CardTitle>
                    <CardDescription>
                      Upload your resume and job description to get started with AI-powered scoring.
                    </CardDescription>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
