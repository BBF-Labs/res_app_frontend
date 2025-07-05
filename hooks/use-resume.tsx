"use client"

import { useState, useEffect } from "react"

interface Resume {
  id: string
  title: string
  template: string
  content: string
  status: "draft" | "published"
  score?: number
  createdAt: Date
  updatedAt: Date
}

export function useResume(resumeId: string) {
  const [resume, setResume] = useState<Resume | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResume = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockResume: Resume = {
          id: resumeId,
          title: "Software Engineer Resume",
          template: "modern",
          content: `# John Doe
## Software Engineer

**Email:** john@example.com  
**Phone:** (555) 123-4567  
**Location:** San Francisco, CA

## Professional Summary

Experienced software engineer with 5+ years of experience building scalable web applications and leading development teams.

## Experience

### Senior Software Engineer | Tech Corp
*January 2022 - Present*

- Led development of microservices architecture serving 1M+ users
- Improved application performance by 40% through optimization
- Mentored 3 junior developers and conducted code reviews

### Software Engineer | StartupXYZ
*June 2019 - December 2021*

- Built responsive web applications using React and Node.js
- Implemented CI/CD pipelines reducing deployment time by 60%
- Collaborated with cross-functional teams on product features

## Skills

**Programming Languages:** JavaScript, Python, Java, TypeScript  
**Frameworks:** React, Node.js, Express, Django  
**Tools:** Git, Docker, AWS, MongoDB, PostgreSQL

## Education

### Bachelor of Science in Computer Science
*University of California, Berkeley | 2015-2019*`,
          status: "draft",
          score: 87,
          createdAt: new Date("2024-01-10"),
          updatedAt: new Date("2024-01-15"),
        }

        setResume(mockResume)
      } catch (error) {
        console.error("Failed to fetch resume:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (resumeId) {
      fetchResume()
    }
  }, [resumeId])

  const updateResume = async (updates: Partial<Resume>) => {
    if (!resume) return

    const updatedResume = {
      ...resume,
      ...updates,
      updatedAt: new Date(),
    }

    setResume(updatedResume)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log("Resume updated:", updates)
    } catch (error) {
      console.error("Failed to update resume:", error)
    }
  }

  return {
    resume,
    isLoading,
    updateResume,
  }
}
