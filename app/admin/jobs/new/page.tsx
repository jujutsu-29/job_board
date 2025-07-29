"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface JobFormData {
  title: string
  companyId: string
  location: string
  description: string
  applyUrl: string
  status: "draft" | "published"
  isFeatured: boolean
  expiresAt: string
}

export default function NewJobPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    companyId: "",
    location: "",
    description: "",
    applyUrl: "",
    status: "draft",
    isFeatured: false,
    expiresAt: "",
  })

  const handleInputChange = (field: keyof JobFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Job created successfully",
        })
        router.push("/admin/jobs")
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.message || "Failed to create job",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Job</h1>
          <p className="text-muted-foreground">Add a new job posting</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Fill in the information for the new job posting</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyId">Company *</Label>
                <Select value={formData.companyId} onValueChange={(value) => handleInputChange("companyId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company1">TechCorp Inc.</SelectItem>
                    <SelectItem value="company2">StartupXYZ</SelectItem>
                    <SelectItem value="company3">DesignStudio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g. San Francisco, CA or Remote"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="applyUrl">Apply URL *</Label>
                <Input
                  id="applyUrl"
                  type="url"
                  value={formData.applyUrl}
                  onChange={(e) => handleInputChange("applyUrl", e.target.value)}
                  placeholder="https://company.com/apply"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiresAt">Expires At</Label>
                <Input
                  id="expiresAt"
                  type="datetime-local"
                  value={formData.expiresAt}
                  onChange={(e) => handleInputChange("expiresAt", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the job role, requirements, and benefits..."
                className="min-h-[200px]"
                required
              />
              <p className="text-sm text-muted-foreground">You can use Markdown formatting for rich text</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => handleInputChange("isFeatured", checked as boolean)}
              />
              <Label htmlFor="isFeatured">Featured Job</Label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Job"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
