"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, ArrowLeft, Target, Building, Trophy } from "lucide-react"
import { motion } from "framer-motion"

interface OnboardingData {
  jobTargets: string[]
  companyPreferences: string[]
  careerGoals: string
  experience: string
  skills: string[]
}

const jobTargetOptions = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "Marketing Manager",
  "Sales Representative",
  "Business Analyst",
  "DevOps Engineer",
]

const companyOptions = [
  "Startups (1-50 employees)",
  "Mid-size companies (51-500 employees)",
  "Large corporations (500+ employees)",
  "Remote-first companies",
  "Tech companies",
  "Financial services",
  "Healthcare",
  "E-commerce",
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    jobTargets: [],
    companyPreferences: [],
    careerGoals: "",
    experience: "",
    skills: [],
  })
  const { toast } = useToast()
  const router = useRouter()

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    try {
      // Simulate API call to save onboarding data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Welcome to Res.U.Me!",
        description: "Your profile has been set up successfully.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Setup failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.jobTargets.length > 0
      case 2:
        return data.companyPreferences.length > 0
      case 3:
        return data.careerGoals.trim().length > 0
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-xl border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome to Res.U.Me!</CardTitle>
            <CardDescription>Let's personalize your experience by learning about your career goals.</CardDescription>
            <div className="mt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">What roles are you targeting?</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select the job titles you're interested in. This helps us tailor your resume content.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {jobTargetOptions.map((job) => (
                    <div key={job} className="flex items-center space-x-2">
                      <Checkbox
                        id={job}
                        checked={data.jobTargets.includes(job)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setData((prev) => ({
                              ...prev,
                              jobTargets: toggleArrayItem(prev.jobTargets, job),
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={job} className="text-sm">
                        {job}
                      </Label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">What type of companies interest you?</h3>
                </div>
                <p className="text-sm text-muted-foreground">Choose your preferred company types and industries.</p>

                <div className="grid grid-cols-1 gap-3">
                  {companyOptions.map((company) => (
                    <div key={company} className="flex items-center space-x-2">
                      <Checkbox
                        id={company}
                        checked={data.companyPreferences.includes(company)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setData((prev) => ({
                              ...prev,
                              companyPreferences: toggleArrayItem(prev.companyPreferences, company),
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={company} className="text-sm">
                        {company}
                      </Label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Trophy className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Tell us about your career goals</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share your career aspirations and what you hope to achieve.
                </p>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="careerGoals">Career Goals</Label>
                    <Textarea
                      id="careerGoals"
                      placeholder="Describe your career goals and aspirations..."
                      value={data.careerGoals}
                      onChange={(e) => setData((prev) => ({ ...prev, careerGoals: e.target.value }))}
                      className="min-h-[100px] bg-white/80"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      placeholder="e.g., 3-5 years"
                      value={data.experience}
                      onChange={(e) => setData((prev) => ({ ...prev, experience: e.target.value }))}
                      className="bg-white/80"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                {currentStep === totalSteps ? "Complete Setup" : "Next"}
                {currentStep < totalSteps && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
