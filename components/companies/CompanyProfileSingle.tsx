"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ExternalLink, Globe, Building2, Star, ArrowRight, Award, CheckCircle, Briefcase, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/utils";
import { CompanyIndividual } from "@/types/types";

export default function CompanyProfileClient({ company }: { company: CompanyIndividual }) {
  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Company Not Found</p>
      </div>
    );
  }

  return ( <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 transition-colors">
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
                  href="/companies"
                  className="text-neutral-900 dark:text-neutral-100"
                >
                  Companies
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="font-medium text-neutral-900 dark:text-neutral-100">
                {company.name}
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
                <div className="flex items-start gap-6 flex-1">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden border border-neutral-200 dark:border-neutral-700">
                      {company.logo ? (
                        <Image
                          src={company.logo}
                          alt={`${company.name} logo - ${company.companyType}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-contain p-2"
                          loading="lazy"
                        />
                      ) : (
                        <Building2 className="h-10 w-10 md:h-12 md:w-12 text-primary" aria-label="Company logo placeholder" />
                      )}
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-4">
                      <h1 className="text-2xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight mb-2">
                        {company.name}
                      </h1>
                      <p className="text-lg text-neutral-700 dark:text-neutral-300">
                        {company.companyType}
                      </p>
                    </div>

                    <p className="text-base md:text-lg text-neutral-800 dark:text-neutral-200 mb-6 leading-relaxed">
                      {company.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6">
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                      >
                        <Building2 className="h-4 w-4 mr-1" />
                        {company.companyType}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                      >
                        <Briefcase className="h-4 w-4 mr-1" />
                        {company.jobs.length} Open Position
                        {company.jobs.length !== 1 ? "s" : ""}
                      </Badge>
                      {company.benefits.length > 0 && (
                        <Badge
                          variant="secondary"
                          className="px-3 py-1 text-sm flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                        >
                          <Star className="h-4 w-4 mr-1" />
                          {company.benefits.length} Benefit
                          {company.benefits.length !== 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      {company.website && (
                        <Button
                          asChild
                          className="shadow-md hover:shadow-lg transition-shadow"
                        >
                          <Link
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <Globe className="h-4 w-4 mr-2" />
                            Visit Website
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      )}
                      <Button variant="outline" asChild>
                        <Link
                          href="#open-positions"
                          scroll={true}
                          className="flex items-center"
                        >
                          View Open Positions
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
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
            {/* About the Company - removed to avoid content duplicacy */}

            {/* Company Benefits */}
            {company.benefits.length > 0 && (
              <Card className="shadow-lg border-0 bg-white dark:bg-neutral-900">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <Award className="h-6 w-6 text-green-600" />
                    Why Work With Us
                  </CardTitle>
                  <CardDescription className="text-neutral-600 dark:text-neutral-400">
                    Benefits and perks we offer to our team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {company.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
              {/* Company Stats */}
          {/* <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="shadow-lg border-0 bg-white dark:bg-neutral-900">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Company Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-700 dark:text-neutral-300">
                        Company Type:
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {company.companyType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-700 dark:text-neutral-300">
                        Open Positions:
                      </span>
                      <span className="font-semibold text-primary">
                        {company.jobs.length}
                      </span>
                    </div>
                    {company.benefits.length > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-700 dark:text-neutral-300">
                          Benefits Offered:
                        </span>
                        <span className="font-semibold text-green-600">
                          {company.benefits.length}
                        </span>
                      </div>
                    )}
                    <Separator />
                    {company.website && (
                      <Button asChild className="w-full">
                        <Link
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Visit Website
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div> */}
        </div>

        {/* Open Positions Section */}
        <section
          id="open-positions"
          className="mt-12"
          aria-labelledby="positions-heading"
        >
          <div className="mb-8 text-center">
            <h2
              id="positions-heading"
              className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
            >
              Open Positions at {company.name}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
              Join our team and help us build the future. We're always looking for
              talented individuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.jobs.map((job) => (
              <article key={job.slug} className="group">
                <Card
                  className="relative h-full shadow-md border border-blue-100 dark:border-blue-900 bg-white dark:bg-blue-950 rounded-2xl flex flex-col group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  style={{
                    boxShadow:
                      "0 4px 24px 0 rgba(30, 64, 175, 0.06), 0 1.5px 6px 0 rgba(239,68,68,0.04)",
                  }}
                >
                  {/* Animated accent bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-red-500 to-blue-400 animate-accent-move" />
                  <CardHeader className="relative z-10 pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant="outline"
                        className="text-xs border-primary/20 text-primary bg-primary/10"
                      >
                        {job.jobType}
                      </Badge>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatDateTime(job?.postedAt ? job.postedAt : new Date(0))}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-semibold text-blue-900 dark:text-blue-100 group-hover:text-primary transition-colors line-clamp-2">
                      {job.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between relative z-10">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{company.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{job.jobType}</span>
                      </div>
                      <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>
                          {formatDateTime(job?.postedAt ? job.postedAt : new Date(0))}
                        </span>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
                    >
                      <Link href={`/jobs/${job.slug}`}>
                        View Job Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                  {/* Animations and accent bar */}
                  <style jsx>{`
                    .animate-accent-move {
                      background-size: 200% 200%;
                      animation: accent-move 4s linear infinite alternate;
                    }
                    @keyframes accent-move {
                      0% { background-position: 0% 50%; }
                      100% { background-position: 100% 50%; }
                    }
                  `}</style>
                </Card>
              </article>
            ))}
          </div>

          {company.jobs.length === 0 && (
            <Card className="shadow-lg border-0 bg-white dark:bg-neutral-900">
              <CardContent className="text-center py-16">
                <Briefcase className="h-16 w-16 text-neutral-400 dark:text-neutral-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  No Open Positions
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-md mx-auto">
                  We don't have any open positions at the moment, but we're always
                  looking for great talent. Check back soon!
                </p>
                {company.website && (
                  <Button asChild className="mt-6">
                    <Link
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Our Website
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
