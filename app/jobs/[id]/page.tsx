"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  CheckCircle,
  MapPin,
  Briefcase,
  Star,
  Code,
  Building,
  Calendar,
  DollarSign,
  Share2,
  Copy,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Users,
  Award,
  BookOpen,
  ArrowRight,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { useParams } from "next/navigation"
import { formatDateTime } from "@/lib/utils"
import Header from "@/components/Header"
import Link from "next/link"

interface CollapsibleSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

function CollapsibleSection({ title, icon, children, defaultOpen = true }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Card className="shadow-sm border-0 bg-white/50 dark:bg-neutral-900/60 backdrop-blur-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 dark:hover:bg-neutral-800/60 transition-colors rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">{icon}</div>
                <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{title}</CardTitle>
              </div>
              <div className="md:hidden">
                {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

interface Job {
  id: string
  title: string
  company: {
    name: string
    logo?: string
  }
  type: string
  location: string
  salary: string
  posted: string
  description: string
  slug: string
  applyUrl: string
  requirements: string[]
  basicQualifications: string[]
  keyResponsibilities: string[]
  technicalSkills: string[]
  locationsAvailable: string[]
  postedAt?: string
  jobType: string
  experience: string
  companyDescription: string
}

export default function JobPostPage() {
  const [isSticky, setIsSticky] = useState(false)
  const [jobData, setJobData] = useState<Job | null>(null)

  const params = useParams();
  const slugWithId = params?.id as string | undefined;
  const slug = slugWithId?.split("-").slice(0, -1).join("-") || "";
  const id = slugWithId?.split("-").at(-1)
  async function fetchingJob () {
    if (!id) return;
    const { data } = await axios(`/api/admin/jobs/${id}`);
    setJobData(data.job);
  }
  
  console.log("Job data", jobData);
  useEffect(() => {
    fetchingJob();
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  if (!jobData) {
    return <div className="text-center py-12 text-neutral-700 dark:text-neutral-200">Loading job details...</div>
  }
  const handleApplyNow = () => {
    window.open(jobData.applyUrl, "_blank")
  }

  const handleShareJob = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${slug}-${id}`
    navigator.clipboard.writeText(url)
    toast({
      title: "Link copied!",
      description: "Job link has been copied to your clipboard",
    })
  }

  const handleSocialShare = (platform: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${slug}-${id}`
    const text = `Check out this job opportunity: ${jobData.title} at ${jobData.company.name}`

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 transition-colors">
      <Header/>
      {/* Breadcrumb Navigation */}
      <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-neutral-900 dark:text-neutral-100">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/jobs" className="text-neutral-900 dark:text-neutral-100">Jobs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="font-medium text-neutral-900 dark:text-neutral-100">
                {jobData.company.name} {jobData.title.split(" ").slice(0, 3).join(" ")}...
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 px-2 md:py-12 md:px-4">
        <div className="container mx-auto">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-blue-50 to-purple-50 dark:from-primary/20 dark:via-neutral-900 dark:to-neutral-900 p-6 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div>
                      <h1 className="text-2xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">{jobData.title}</h1>
                      <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mt-2">{jobData.company.name}</p>
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-neutral-800 dark:text-neutral-200 mb-6 leading-relaxed">{jobData.description}</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="secondary" className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {jobData.salary}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                      <MapPin className="h-4 w-4 mr-1" />
                      {jobData.location}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {jobData.jobType}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                      <Users className="h-4 w-4 mr-1" />
                      {jobData.experience}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDateTime(jobData.postedAt ?? "")}
                    </Badge>
                  </div>
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={handleApplyNow}
                  >
                    Apply Now
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-2 md:px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Requirements */}
            <CollapsibleSection title="Requirements" icon={<CheckCircle className="h-5 w-5 text-green-600" />}>
              <ul className="space-y-3">
                {jobData.requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-800 dark:text-neutral-200">{req}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            {/* Basic Qualifications */}
            <CollapsibleSection title="Basic Qualifications" icon={<Award className="h-5 w-5 text-blue-600" />}>
              <ul className="space-y-3">
                {jobData.basicQualifications.map((qual, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-800 dark:text-neutral-200">{qual}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            {/* Key Responsibilities */}
            <CollapsibleSection title="Key Responsibilities" icon={<Briefcase className="h-5 w-5 text-purple-600" />}>
              <ul className="space-y-3">
                {jobData.keyResponsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Briefcase className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-800 dark:text-neutral-200">{resp}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            {/* Technical Skills Required */}
            <CollapsibleSection title="Technical Skills Required" icon={<Code className="h-5 w-5 text-indigo-600" />}>
              <div className="flex flex-wrap gap-2">
                {jobData.technicalSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1 text-sm border-indigo-200 text-indigo-700 dark:text-indigo-200 dark:border-indigo-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CollapsibleSection>

            {/* Locations Available */}
            <CollapsibleSection title="Locations Available" icon={<MapPin className="h-5 w-5 text-red-600" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {jobData.locationsAvailable.map((location, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <span className="text-neutral-800 dark:text-neutral-200 font-medium">{location}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>

          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply Box */}
              <Card className="shadow-lg border-0 bg-white dark:bg-neutral-900">
                <CardHeader className="bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-900 text-white rounded-t-lg">
                  <CardTitle className="text-xl font-bold">Ready to Apply?</CardTitle>
                  <CardDescription className="text-blue-100 dark:text-blue-200">Don't miss this opportunity!</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-700 dark:text-neutral-200">Salary:</span>
                      <span className="font-semibold text-green-600">{jobData.salary}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-700 dark:text-neutral-200">Experience:</span>
                      <span className="font-semibold">{jobData.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-700 dark:text-neutral-200">Job Type:</span>
                      <span className="font-semibold">{jobData.jobType}</span>
                    </div>
                    <Separator />
                    <Button
                      className="w-full text-lg py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={handleApplyNow}
                    >
                      Apply Now
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Share Job */}
              <Card className="shadow-lg border-0 bg-white dark:bg-neutral-900">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-neutral-900 dark:text-neutral-100">
                    <Share2 className="h-5 w-5" />
                    <span>Share this Job</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleShareJob}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleSocialShare("linkedin")}
                      >
                        LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleSocialShare("twitter")}
                      >
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleSocialShare("facebook")}
                      >
                        Facebook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Stats */}
              <Card className="shadow-lg border-0 bg-white dark:bg-neutral-900">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-neutral-900 dark:text-neutral-100">
                    <BookOpen className="h-5 w-5" />
                    <span>Job Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-700 dark:text-neutral-200">Posted:</span>
                      <span className="font-medium">{formatDateTime(jobData.postedAt ?? "")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-700 dark:text-neutral-200">Company:</span>
                      <span className="font-medium">{jobData.company.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <CollapsibleSection title="About the Company" icon={<Building className="h-5 w-5 text-orange-600" />}>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{jobData.company.name}</h3>
                    <p className="text-sm text-muted-foreground">Technology Company</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{jobData.companyDescription}</p>
                <div className="pt-2">
                  <Button variant="outline" asChild className="bg-transparent">
                    <Link href={`/companies/${jobData.company.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      View Company Profile
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CollapsibleSection>

      {/* Sticky Apply Button for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t shadow-lg z-50 p-4">
        <Button className="w-full text-lg py-4 rounded-xl shadow-md" onClick={handleApplyNow}>
          Apply Now
          <ExternalLink className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <div className="lg:hidden h-20"></div>
    </div>
  )
}
