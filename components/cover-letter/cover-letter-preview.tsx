"use client"

import { Badge } from "@/components/ui/badge"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CoverLetterPreviewProps {
  content: string
  template: string
}

const mdxComponents = {
  h1: ({ children }: any) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
  h2: ({ children }: any) => <h2 className="text-lg font-semibold mb-3 mt-6">{children}</h2>,
  h3: ({ children }: any) => <h3 className="text-base font-medium mb-2 mt-4">{children}</h3>,
  p: ({ children }: any) => <p className="mb-3 leading-relaxed">{children}</p>,
  ul: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
  li: ({ children }: any) => <li className="text-sm">{children}</li>,
  strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }: any) => <em className="italic">{children}</em>,
}

export function CoverLetterPreview({ content, template }: CoverLetterPreviewProps) {
  const [mdxSource, setMdxSource] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const compileMDX = async () => {
      if (!content.trim()) {
        setMdxSource(null)
        return
      }

      setIsLoading(true)
      try {
        const mdxSource = await serialize(content)
        setMdxSource(mdxSource)
      } catch (error) {
        console.error("MDX compilation error:", error)
        setMdxSource(null)
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(compileMDX, 500)
    return () => clearTimeout(timeoutId)
  }, [content])

  const getTemplateStyles = () => {
    switch (template) {
      case "modern":
        return "bg-white text-gray-900 max-w-2xl mx-auto p-8 shadow-lg border-l-4 border-blue-500"
      case "classic":
        return "bg-white text-gray-800 max-w-2xl mx-auto p-8 border"
      case "creative":
        return "bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900 max-w-2xl mx-auto p-8 rounded-lg"
      case "professional":
        return "bg-white text-gray-900 max-w-2xl mx-auto p-8 border-2 border-gray-200"
      default:
        return "bg-white text-gray-900 max-w-2xl mx-auto p-8"
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <Badge variant="outline">{template} template</Badge>
        </div>
      </div>

      <div className="flex-1 p-4 bg-muted/30 overflow-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={getTemplateStyles()}
        >
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Compiling preview...</p>
            </div>
          ) : mdxSource ? (
            <MDXRemote {...mdxSource} components={mdxComponents} />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Start typing to see your cover letter preview...</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
