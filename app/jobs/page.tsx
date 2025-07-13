"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, BellRing, Briefcase, Clock, DollarSign, MapPin, Moon, Search, Sun, Users } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    posted: "2 days ago",
    description:
      "We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using React, Next.js, and modern JavaScript frameworks.",
    requirements: [
      "5+ years of React experience",
      "Experience with Next.js",
      "Strong TypeScript skills",
      "Knowledge of modern CSS frameworks",
    ],
    benefits: ["Health insurance", "401k matching", "Flexible work hours", "Remote work options"],
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100,000 - $140,000",
    posted: "1 day ago",
    description:
      "Join our product team to drive the development of innovative solutions. You'll work closely with engineering, design, and business teams to deliver exceptional user experiences.",
    requirements: [
      "3+ years of product management experience",
      "Strong analytical skills",
      "Experience with Agile methodologies",
      "Excellent communication skills",
    ],
    benefits: ["Equity package", "Health insurance", "Unlimited PTO", "Learning budget"],
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Contract",
    salary: "$80,000 - $100,000",
    posted: "3 days ago",
    description:
      "We're seeking a talented UX/UI Designer to create intuitive and beautiful user interfaces. You'll be involved in the entire design process from research to final implementation.",
    requirements: [
      "Portfolio showcasing UX/UI work",
      "Proficiency in Figma/Sketch",
      "Understanding of design systems",
      "User research experience",
    ],
    benefits: ["Flexible schedule", "Professional development", "Latest design tools", "Collaborative environment"],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    posted: "1 week ago",
    description:
      "Looking for a DevOps Engineer to help scale our infrastructure and improve our deployment processes. You'll work with cutting-edge cloud technologies and automation tools.",
    requirements: [
      "Experience with AWS/Azure/GCP",
      "Docker and Kubernetes knowledge",
      "CI/CD pipeline experience",
      "Infrastructure as Code (Terraform)",
    ],
    benefits: ["Stock options", "Health insurance", "Conference attendance", "Home office setup"],
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "DataDriven Corp",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    posted: "4 days ago",
    description:
      "Join our data science team to extract insights from large datasets and build predictive models. You'll work on exciting projects that directly impact business decisions.",
    requirements: [
      "PhD/Masters in Data Science or related field",
      "Python/R programming",
      "Machine learning expertise",
      "SQL and database knowledge",
    ],
    benefits: ["Research time", "Conference budget", "Health insurance", "Flexible work arrangements"],
  },
  {
    id: 6,
    title: "Backend Developer",
    company: "APIFirst Inc.",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$95,000 - $125,000",
    posted: "5 days ago",
    description:
      "We need a Backend Developer to build and maintain our API infrastructure. You'll work with Node.js, databases, and cloud services to create scalable solutions.",
    requirements: [
      "Node.js and Express.js experience",
      "Database design skills",
      "RESTful API development",
      "Cloud platform knowledge",
    ],
    benefits: ["Health insurance", "Retirement plan", "Professional development", "Team events"],
  },
]

export default function JobsPage() {
  const [jobs, setJobs] = useState(mockJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [notifications, setNotifications] = useState(3)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation =
      locationFilter === "all" || job.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesType = typeFilter === "all" || job.type === typeFilter

    return matchesSearch && matchesLocation && matchesType
  })

  const handleApply = (jobId: number) => {
    alert(`Applied to job ${jobId}! You will be redirected to the application form.`)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">JobBoard</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/jobs" className="text-foreground font-medium">
                Jobs
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                {notifications > 0 ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">{notifications}</Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="san francisco">San Francisco</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="austin">Austin</SelectItem>
                <SelectItem value="seattle">Seattle</SelectItem>
                <SelectItem value="chicago">Chicago</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground">{filteredJobs.length} jobs found</div>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-foreground">{job.company}</CardDescription>
                  </div>
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.posted}
                    </div>
                  </div>

                  <p className="text-muted-foreground line-clamp-2">{job.description}</p>

                  <div className="flex justify-between items-center pt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View Details</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
                          <DialogDescription className="text-lg">
                            {job.company} • {job.location} • {job.type}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="secondary">{job.type}</Badge>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.posted}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2">Job Description</h3>
                            <p className="text-muted-foreground">{job.description}</p>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2">Requirements</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {job.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2">Benefits</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {job.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))}
                            </ul>
                          </div>

                          <Button className="w-full" onClick={() => handleApply(job.id)}>
                            Apply Now
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button onClick={() => handleApply(job.id)}>Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </main>
    </div>
  )
}
