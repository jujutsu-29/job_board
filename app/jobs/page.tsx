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
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Users,
  ArrowRight,
  Building,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import { Job } from "@/types/types";
import { locationOptions } from "@/lib/utils";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // filtering logic
  const filteredJobs = (jobs ?? []).filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "all" ||
      job.locationsAvailable.some((entry) =>
        entry.includes(locationFilter)
      );

    const matchesType = typeFilter === "all" || job.jobType === typeFilter;

    return matchesSearch && matchesLocation && matchesType;
  });

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0a1627] transition-colors">
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
              <BreadcrumbPage className="font-medium text-neutral-900 dark:text-neutral-100">
                Jobs
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <main className="container mx-auto px-2 md:px-4 py-8">
        {/* Search and Filters */}
        <section className="mb-10">
          <div className="rounded-2xl bg-gradient-to-r from-blue-200/60 via-white/80 to-blue-100/60 dark:from-blue-900/40 dark:via-neutral-900/80 dark:to-blue-900/40 shadow-md p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border border-blue-100 dark:border-blue-900/40">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-200 mb-2 tracking-tight">
                Find Your Next Job
              </h1>
              <p className="text-lg text-blue-800/80 dark:text-blue-100/80 mb-4">
                Browse the latest job opportunities from top companies.
              </p>
              <div className="relative max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 dark:text-blue-300 h-5 w-5" />
                <Input
                  placeholder="Search jobs or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 dark:bg-neutral-900/80 border border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div>
                <label className="block text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                  Location
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full md:w-48 rounded-lg border border-blue-200 dark:border-blue-800 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition"
                >
                  <option value="all">All Locations</option>
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                  Job Type
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full md:w-48 rounded-lg border border-blue-200 dark:border-blue-800 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition"
                >
                  <option value="all">All Jobs</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-200 mt-4 font-medium">
            {filteredJobs.length} jobs found
          </div>
        </section>

        {/* Job Listings */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-2xl hover:border-blue-400/70 dark:hover:border-blue-500/70 transition-shadow border-0 bg-white/80 dark:bg-blue-950/80 backdrop-blur-md rounded-2xl flex flex-col h-full group relative overflow-hidden"
                style={{
                  boxShadow:
                    "0 4px 24px 0 rgba(30, 64, 175, 0.08), 0 1.5px 6px 0 rgba(30, 64, 175, 0.04)",
                }}
              >
                {/* Glassy blue highlight on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-200/40 via-blue-100/30 to-blue-400/10 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/10 rounded-2xl z-0" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="w-12 h-12 bg-blue-100/80 dark:bg-blue-900/40 rounded-lg flex items-center justify-center shadow-sm">
                      <Building className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-blue-900 dark:text-blue-100">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-blue-700 dark:text-blue-200">
                        {job.company.name}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-sm flex items-center bg-blue-100/80 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100"
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.locationsAvailable.join(", ")}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-sm flex items-center bg-blue-100/80 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100"
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-sm flex items-center bg-blue-100/80 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100"
                      >
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.jobType}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-sm flex items-center bg-blue-100/80 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100"
                      >
                        <Users className="h-4 w-4 mr-1" />
                        {job.experience}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-sm flex items-center bg-blue-100/80 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        {job.posted}
                      </Badge>
                    </div>
                    <p className="text-blue-900/80 dark:text-blue-100/80 line-clamp-3 mb-4 font-medium">
                      {job.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <Button
                      asChild
                      variant="outline"
                      className="flex items-center gap-2 border-blue-300 dark:border-blue-700 bg-transparent hover:bg-blue-100/60 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-200 font-semibold transition"
                    >
                      <Link target="_blank" href={`/jobs/${job.slug}`}>
                        View Details
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 shadow-md transition"
                    >
                      <Link
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply Now
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card className="shadow-sm border bg-card mt-8">
              <CardContent className="text-center py-12">
                <Users className="h-12 w-12 text-blue-300 dark:text-blue-700 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  No jobs found
                </h3>
                <p className="text-blue-700 dark:text-blue-200">
                  Try adjusting your search criteria
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}
