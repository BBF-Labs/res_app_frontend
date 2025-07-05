"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, Briefcase, Download, Trash2, Search, Filter, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface UploadedFile {
  id: string
  name: string
  type: "resume" | "job-description"
  size: number
  uploadDate: Date
  url: string
}

export default function UploadsPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "resume" | "job-description">("all")
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setFiles([
      {
        id: "1",
        name: "Software_Engineer_Resume_2024.pdf",
        type: "resume",
        size: 245760,
        uploadDate: new Date("2024-01-15"),
        url: "/placeholder.pdf",
      },
      {
        id: "2",
        name: "Google_SWE_Job_Description.txt",
        type: "job-description",
        size: 12800,
        uploadDate: new Date("2024-01-14"),
        url: "/placeholder.txt",
      },
      {
        id: "3",
        name: "Product_Manager_Resume.docx",
        type: "resume",
        size: 189440,
        uploadDate: new Date("2024-01-12"),
        url: "/placeholder.docx",
      },
    ])
  }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "resume" | "job-description") => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      // Simulate upload to Cloudinary
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        type,
        size: file.size,
        uploadDate: new Date(),
        url: URL.createObjectURL(file),
      }

      setFiles((prev) => [newFile, ...prev])

      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded successfully.`,
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
    toast({
      title: "File deleted",
      description: "The file has been removed from your uploads.",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    return type === "resume" ? FileText : Briefcase
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || file.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">File Uploads</h1>
            <p className="text-muted-foreground">
              Manage your uploaded resumes and job descriptions for scoring and analysis.
            </p>
          </div>

          {/* Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Upload Resume</span>
                </CardTitle>
                <CardDescription>Upload your resume files (PDF, DOC, DOCX)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, "resume")}
                    className="hidden"
                    id="resume-upload"
                    disabled={isUploading}
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {isUploading ? "Uploading..." : "Click to upload resume"}
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Upload Job Description</span>
                </CardTitle>
                <CardDescription>Upload job description files (TXT, PDF, DOC)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, "job-description")}
                    className="hidden"
                    id="job-upload"
                    disabled={isUploading}
                  />
                  <label htmlFor="job-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {isUploading ? "Uploading..." : "Click to upload job description"}
                    </p>
                    <p className="text-xs text-muted-foreground">TXT, PDF, DOC, DOCX up to 5MB</p>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  {filterType === "all" ? "All Files" : filterType === "resume" ? "Resumes" : "Job Descriptions"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterType("all")}>All Files</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("resume")}>Resumes Only</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("job-description")}>
                  Job Descriptions Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Files List */}
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files ({filteredFiles.length})</CardTitle>
              <CardDescription>Your uploaded resumes and job descriptions</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFiles.length > 0 ? (
                <div className="space-y-4">
                  {filteredFiles.map((file) => {
                    const FileIcon = getFileIcon(file.type)
                    return (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FileIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{file.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <Badge variant="outline">{file.type === "resume" ? "Resume" : "Job Description"}</Badge>
                              <span>{formatFileSize(file.size)}</span>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{file.uploadDate.toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(file.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No files found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || filterType !== "all"
                      ? "Try adjusting your search or filter criteria."
                      : "Upload your first resume or job description to get started."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
