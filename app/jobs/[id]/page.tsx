import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  CheckCircle,
  MapPin,
  Briefcase,
  Code,
  Building,
  Calendar,
  DollarSign,
  Share2,
  Users,
  Award,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Header from "@/components/Header";
import Link from "next/link";
import { ApplyNowButton, HandleShareJobButton, HandleSocialShareButton } from "@/lib/actions/client-actions";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { jobsBySlug } from "@/lib/server/jobs";



interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
    description?: string;
    companyType?: string;
  };
  type: string;
  location: string;
  salary: string;
  posted: string;
  description: string;
  slug: string;
  applyUrl: string;
  requirements: string[];
  basicQualifications: string[];
  keyResponsibilities: string[];
  technicalSkills: string[];
  locationsAvailable: string[];
  postedAt?: string;
  jobType: string;
  experience: string;
  companyDescription: string;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const job = await jobsBySlug(params.id)
  if (!job) return {}
  return {
    title: `${job.title} | Rolespot`,
    description: job.description,
    openGraph: {
      title: job.title,
      description: job.description + " " + job.company.description,
      url: `https://rolespot.com/jobs/${job.slug}`,
      images:  [{ url: "/rolespot_noBG.png" }],
    },
  }
}


generateMetadata as any;

export default async function JobPostPage({ params }: { params: { id: string } }) {
  const slug = (await params).id;
  const job = await jobsBySlug(slug);
  if (!job) return notFound();

  // Map DB fields to expected structure
  const jobData = {
    ...job,
    company: {
      ...job.company,
      name: job.company.name,
      logo: job.company.logo,
      description: job.company.description,
      companyType: job.company.companyType,
    },
    requirements: job.requirements || [],
    basicQualifications: job.basicQualifications || [],
    keyResponsibilities: job.keyResponsibilities || [],
    technicalSkills: job.technicalSkills || [],
    locationsAvailable: job.locationsAvailable || [],
    postedAt: job.postedAt ? job.postedAt.toISOString() : "",
    jobType: job.jobType,
    experience: job.experience,
    companyDescription: job.company.description,
    applyUrl: job.applyUrl,
    salary: job.salary,
    title: job.title,
    description: job.description,
    slug: job.slug,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 transition-colors">
      <Header />
      {/* Breadcrumb Navigation */}
      <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-neutral-900 dark:text-neutral-100"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/jobs"
                  className="text-neutral-900 dark:text-neutral-100"
                >
                  Jobs
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="font-medium text-neutral-900 dark:text-neutral-100">
                {jobData.company.name}{" "}
                {jobData.title.split(" ").slice(0, 3).join(" ")}...
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
                      <h1 className="text-2xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                        {jobData.title}
                      </h1>
                      <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mt-2">
                        {jobData.company.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-neutral-800 dark:text-neutral-200 mb-6 leading-relaxed">
                    {jobData.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    >
                      <DollarSign className="h-4 w-4 mr-1" />
                      {jobData.salary}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      {jobData.locationsAvailable.length > 0
                        ? jobData.locationsAvailable.join(", ")
                        : "No locations available"}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    >
                      <Briefcase className="h-4 w-4 mr-1" />
                      {jobData.jobType}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      {jobData.experience}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDateTime(jobData.postedAt ?? "")}
                    </Badge>
                  </div>
                  <ApplyNowButton
                    applyUrl={jobData.applyUrl}
                  />
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
            {jobData.requirements.length > 0 && (
              <CollapsibleSection
                title="Requirements"
                icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              >
                <ul className="space-y-3">
                  {jobData.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-800 dark:text-neutral-200">
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}
            {/* Basic Qualifications */}
            {jobData.basicQualifications.length > 0 && (
              <CollapsibleSection
                title="Basic Qualifications"
                icon={<Award className="h-5 w-5 text-blue-600" />}
              >
                <ul className="space-y-3">
                  {jobData.basicQualifications.map((qual: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-800 dark:text-neutral-200">
                        {qual}
                      </span>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}
            {/* Key Responsibilities */}
            {jobData.keyResponsibilities.length > 0 && (
              <CollapsibleSection
                title="Key Responsibilities"
                icon={<Briefcase className="h-5 w-5 text-purple-600" />}
              >
                <ul className="space-y-3">
                  {jobData.keyResponsibilities.map((resp: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Briefcase className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-800 dark:text-neutral-200">
                        {resp}
                      </span>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}
            {/* Technical Skills Required */}
            {jobData.technicalSkills.length > 0 && (
              <CollapsibleSection
                title="Technical Skills Required"
                icon={<Code className="h-5 w-5 text-indigo-600" />}
              >
                <div className="flex flex-wrap gap-2">
                  {jobData.technicalSkills.map((skill: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-3 py-1 text-sm border-indigo-200 text-indigo-700 dark:text-indigo-200 dark:border-indigo-700"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CollapsibleSection>
            )}
            {/* Locations Available */}
            {jobData.locationsAvailable.length > 0 && (
              <CollapsibleSection
                title="Locations Available"
                icon={<MapPin className="h-5 w-5 text-red-600" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {jobData.locationsAvailable.map((location: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg"
                    >
                      <MapPin className="h-5 w-5 text-red-500" />
                      <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                        {location}
                      </span>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            )}
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply Box */}
              <Card className="shadow-lg border-0 bg-white dark:bg-neutral-900">
                <CardHeader className="bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-900 text-white rounded-t-lg">
                  <CardTitle className="text-xl font-bold">
                    Ready to Apply?
                  </CardTitle>
                  <CardDescription className="text-blue-100 dark:text-blue-200">
                    Don't miss this opportunity!
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-700 dark:text-neutral-200">
                        Salary:
                      </span>
                      <span className="font-semibold text-green-600">
                        {jobData.salary}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-700 dark:text-neutral-200">
                        Experience:
                      </span>
                      <span className="font-semibold">
                        {jobData.experience}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-700 dark:text-neutral-200">
                        Job Type:
                      </span>
                      <span className="font-semibold">{jobData.jobType}</span>
                    </div>
                    <Separator />
                    <ApplyNowButton
                      applyUrl={jobData.applyUrl}
                    />
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
                    <HandleShareJobButton slug={jobData.slug} />
                    <HandleSocialShareButton
                      slug={jobData.slug}
                      title={jobData.title}
                      name={jobData.company.name}
                    />
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
                      <span className="text-neutral-700 dark:text-neutral-200">
                        Posted:
                      </span>
                      <span className="font-medium">
                        {formatDateTime(jobData.postedAt ?? "")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-700 dark:text-neutral-200">
                        Company:
                      </span>
                      <span className="font-medium">
                        {jobData.company.name}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <section className="py-8 px-2 md:py-12 md:px-4">
        <CollapsibleSection
          title="About the Company"
          icon={<Building className="h-5 w-5 text-orange-600" />}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {jobData.company.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {jobData.company.companyType}
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {jobData.company.description ||
                "No description available for this company."}
            </p>
            <div className="pt-2">
              <Button variant="outline" asChild className="bg-transparent">
                <Link
                  href={`/companies/${jobData.company.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  View Company Profile
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </CollapsibleSection>
      </section>
      {/* Sticky Apply Button for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t shadow-lg z-50 p-4">
        <ApplyNowButton applyUrl={jobData.applyUrl} />
      </div>
      <div className="lg:hidden h-20"></div>
    </div>
  );
}
