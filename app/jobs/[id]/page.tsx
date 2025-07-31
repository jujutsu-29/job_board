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
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock job data - replace with actual data fetching
const jobData = {
  id: "amazon-sde-2024",
  title: "{{jobTitle}}",
  company: "{{company}}",
  companyLogo: "{{companyLogo}}",
  description: "{{description}}",
  salary: "{{salary}}",
  location: "{{location}}",
  jobType: "{{jobType}}",
  experience: "{{experience}}",
  postedDate: "{{postedDate}}",
  applyUrl: "{{applyUrl}}",
  requirements: ["{{requirement1}}", "{{requirement2}}", "{{requirement3}}", "{{requirement4}}"],
  basicQualifications: ["{{basicQualification1}}", "{{basicQualification2}}", "{{basicQualification3}}"],
  keyResponsibilities: ["{{responsibility1}}", "{{responsibility2}}", "{{responsibility3}}", "{{responsibility4}}"],
  preferredQualifications: [
    "{{preferredQualification1}}",
    "{{preferredQualification2}}",
    "{{preferredQualification3}}",
  ],
  technicalSkills: ["{{technicalSkill1}}", "{{technicalSkill2}}", "{{technicalSkill3}}", "{{technicalSkill4}}"],
  locationsAvailable: ["{{location1}}", "{{location2}}", "{{location3}}"],
  viewCount: 100, // Mock view count
  applicationCount: 50, // Mock application count
}

interface CollapsibleSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

function CollapsibleSection({ title, icon, children, defaultOpen = true }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
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

export default function JobPostPage() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleApplyNow = () => {
    // In a real app, this would redirect to the apply URL
    window.open(jobData.applyUrl, "_blank")
  }

  const handleShareJob = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast({
      title: "Link copied!",
      description: "Job link has been copied to your clipboard",
    })
  }

  const handleSocialShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out this job opportunity: ${jobData.title} at ${jobData.company}`

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/jobs">Jobs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="font-medium">
                {jobData.company} {jobData.title.split(" ").slice(0, 3).join(" ")}...
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-blue-50 to-purple-50 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    {jobData.companyLogo && (
                      <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center">
                        <Building className="h-8 w-8 text-primary" />
                      </div>
                    )}
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{jobData.title}</h1>
                      <p className="text-xl text-gray-600 mt-2">{jobData.company}</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">{jobData.description}</p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="secondary" className="px-3 py-1 text-sm">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {jobData.salary}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {jobData.location}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 text-sm">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {jobData.jobType}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      {jobData.experience}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {jobData.postedDate}
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
      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Requirements */}
            <CollapsibleSection title="Requirements" icon={<CheckCircle className="h-5 w-5 text-green-600" />}>
              <ul className="space-y-3">
                {jobData.requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
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
                    <span className="text-gray-700">{qual}</span>
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
                    <span className="text-gray-700">{resp}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            {/* Preferred Qualifications */}
            <CollapsibleSection title="Preferred Qualifications" icon={<Star className="h-5 w-5 text-yellow-600" />}>
              <ul className="space-y-3">
                {jobData.preferredQualifications.map((qual, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{qual}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            {/* Technical Skills Required */}
            <CollapsibleSection title="Technical Skills Required" icon={<Code className="h-5 w-5 text-indigo-600" />}>
              <div className="flex flex-wrap gap-2">
                {jobData.technicalSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1 text-sm border-indigo-200 text-indigo-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CollapsibleSection>

            {/* Locations Available */}
            <CollapsibleSection title="Locations Available" icon={<MapPin className="h-5 w-5 text-red-600" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {jobData.locationsAvailable.map((location, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <span className="text-gray-700 font-medium">{location}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply Box */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="text-xl font-bold">Ready to Apply?</CardTitle>
                  <CardDescription className="text-blue-100">Don't miss this opportunity!</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Salary:</span>
                      <span className="font-semibold text-green-600">{jobData.salary}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-semibold">{jobData.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Job Type:</span>
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
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
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
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Job Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Posted:</span>
                      <span className="font-medium">{jobData.postedDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Job ID:</span>
                      <span className="font-medium">{jobData.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Views:</span>
                      <span className="font-medium">{jobData.viewCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Applications:</span>
                      <span className="font-medium">{jobData.applicationCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Apply Button for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4">
        <Button className="w-full text-lg py-4 rounded-xl shadow-md" onClick={handleApplyNow}>
          Apply Now
          <ExternalLink className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Mobile spacing for sticky button */}
      <div className="lg:hidden h-20"></div>
    </div>
  )
}
