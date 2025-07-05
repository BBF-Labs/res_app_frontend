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

export function useResumes() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockResumes: Resume[] = [
          {
            id: "1",
            title: "Software Engineer Resume",
            template: "modern",
            content: "# John Doe\n\n## Software Engineer\n\nExperienced software engineer...",
            status: "published",
            score: 87,
            createdAt: new Date("2024-01-10"),
            updatedAt: new Date("2024-01-15"),
          },
          {
            id: "2",
            title: "Product Manager Resume",
            template: "classic",
            content: "# John Doe\n\n## Product Manager\n\nResults-driven product manager...",
            status: "draft",
            createdAt: new Date("2024-01-12"),
            updatedAt: new Date("2024-01-12"),
          },
        ]

        setResumes(mockResumes)
      } catch (error) {
        console.error("Failed to fetch resumes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResumes()
  }, [])

  const createResume = async (data: { title: string; template: string }) => {
    const newResume: Resume = {
      id: Date.now().toString(),
      title: data.title,
      template: data.template,
      content: "",
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setResumes((prev) => [newResume, ...prev])
    return newResume
  }

  return {
    resumes,
    isLoading,
    createResume,
  }
}
