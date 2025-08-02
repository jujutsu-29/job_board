"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ExternalLink,
  MapPin,
  Briefcase,
  Users,
  Calendar,
  Globe,
  Building2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import axios from "axios";
import { useParams } from "next/navigation";
import { formatDateTime } from "@/lib/utils";

interface Company {
  name: string;
  website: string;
  description: string;
  companyType: string;
  tags: string[];
  slug: string;
  jobs: {
    title: string;
    description: string;
    jobType: string;
    postedAt: string;
    slug: string;
  }[];
}

export default function CompanyProfilePage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  if (!slug) return;
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`/api/company/${slug}`);
        setCompany(res.data.company);
      } catch (error) {
        console.error("Failed to fetch company:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading company data...</p>
      </div>
    );
  }
  console.log("Company data:", company);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-destructive">Company not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <div className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/companies">Companies</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="font-medium">
                {company.name}
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Company Header */}
        <header className="mb-12">
          <Card className="shadow-lg border-0 bg-card">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-muted rounded-2xl shadow-md flex items-center justify-center">
                    <Building2 className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {company.name}
                  </h1>
                  {/* <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="secondary" className="px-3 py-1">
                      <Users className="h-4 w-4 mr-1" />
                      {companyData.size}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {companyData.industry}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Founded {companyData.founded}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {companyData.headquarters}
                    </Badge>
                  </div> */}
                  <div className="flex flex-col sm:flex-row gap-4">
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
            </CardContent>
          </Card>
        </header>

        {/* About the Company */}
        <section className="mb-12" aria-labelledby="about-heading">
          <Card className="shadow-sm border bg-card">
            <CardHeader>
              <CardTitle
                id="about-heading"
                className="text-2xl font-bold text-foreground"
              >
                About the Company
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {company.description}
                </p>
                {/* <p className="text-muted-foreground leading-relaxed">{companyData.culture}</p> */}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Company Benefits */}
        {/* <section className="mb-12" aria-labelledby="benefits-heading">
          <Card className="shadow-sm border bg-card">
            <CardHeader>
              <CardTitle id="benefits-heading" className="text-2xl font-bold text-foreground">
                Why Work With Us
              </CardTitle>
              <CardDescription>Benefits and perks we offer to our team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companyData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section> */}

        {/* Open Positions */}
        <section id="open-positions" aria-labelledby="positions-heading">
          <div className="mb-8">
            <h2
              id="positions-heading"
              className="text-3xl font-bold text-foreground mb-4"
            >
              Open Positions at {company.name}
            </h2>
            <p className="text-muted-foreground text-lg">
              Join our team and help us build the future. We're always looking
              for talented individuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.jobs.map((job) => (
              <article key={job.slug} className="group">
                <Card className="h-full shadow-sm border bg-card hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
                        {company.companyType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDateTime(job.postedAt)}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-3 mb-6">
                      {/* <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div> */}
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{job.jobType}</span>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="w-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Link target="_blank" href={`/jobs/${job.slug}`}>
                        View Job
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>

          {company.jobs.length === 0 && (
            <Card className="shadow-sm border bg-card">
              <CardContent className="text-center py-12">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Open Positions
                </h3>
                <p className="text-muted-foreground">
                  We don't have any open positions at the moment, but we're
                  always looking for great talent. Check back soon!
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}
