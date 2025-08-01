"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Copy, Eye, EyeOff } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Job {
  id: string
  title: string
  company: {
    name: string
  }
  location: string
  status: "draft" | "published" | "archived" | "closed"
  isFeatured: boolean
  postedAt: string | null
  createdAt: string
  slug: string
}

export default function JobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/admin/jobs")
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
      toast({
        title: "Error",
        description: "Failed to fetch jobs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusToggle = async (jobId: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published"

    try {
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchJobs()
        toast({
          title: "Success",
          description: `Job ${newStatus === "published" ? "published" : "unpublished"} successfully`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update job status",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return

    try {
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchJobs()
        toast({
          title: "Success",
          description: "Job deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive",
      })
    }
  }

  const copyJobLink = (slug: string, id: string) => {
    // console.log("Copying job link for slug:", slug)
    // console.log("Extracted ID:", id)
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${slug}-${id}`
    navigator.clipboard.writeText(url)
    toast({
      title: "Success",
      description: "Job link copied to clipboard",
    })
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: "secondary",
      published: "default",
      archived: "outline",
      closed: "destructive",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Jobs</h1>
          <p className="text-muted-foreground">Manage your job postings</p>
        </div>
        <Button onClick={() => router.push("/admin/jobs/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Listings</CardTitle>
          <CardDescription>View and manage all job postings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <span>{job.title}</span>
                        {job.isFeatured && (
                          <Badge variant="outline" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{job.company.name}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell>{job.postedAt ? new Date(job.postedAt).toLocaleDateString() : "Not posted"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => copyJobLink(job.slug, job.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => router.push(`/admin/jobs/${job.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusToggle(job.id, job.status)}>
                            {job.status === "published" ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Publish
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDelete(job.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No jobs found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
