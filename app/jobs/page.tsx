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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  BellRing,
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  Moon,
  Search,
  Sun,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Header from "@/components/Header";

export default function JobsPage() {
  interface Job {
    id: number;
    title: string;
    company: {
      name: string;
    };
    location: string;
    type: string;
    salary: string;
    posted: string;
    description: string;
    requirements: string[];
    benefits: string[];
  }
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [notifications, setNotifications] = useState(3);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/admin/jobs");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  // interface Job {
  //   id: number
  //   title: string
  //   company: {
  //   name: string
  // }
  //   location: string
  //   type: string
  //   salary: string
  //   posted: string
  //   description: string
  //   requirements: string[]
  //   benefits: string[]
  // }

  // const filteredJobs: Job[] = (jobs as Job[] | undefined)?.filter((job: Job) => {
  //   const matchesSearch =
  //     job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     job.company.toLowerCase().includes(searchTerm.toLowerCase())
  //   const matchesLocation =
  //     locationFilter === "all" || job.location.toLowerCase().includes(locationFilter.toLowerCase())
  //   const matchesType = typeFilter === "all" || job.type === typeFilter

  //   return matchesSearch && matchesLocation && matchesType
  // }) ?? []

  const handleApply = (jobId: number) => {
    alert(
      `Applied to job ${jobId}! You will be redirected to the application form.`
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
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
          {/* <div className="text-sm text-muted-foreground">{filteredJobs.length} jobs found</div> */}
        </div>

        {/* Job Listings */}
        <div className="grid gap-6">
          {jobs?.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-foreground">
                      {job.company.name}
                    </CardDescription>
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

                  <p className="text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex justify-between items-center pt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View Details</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">
                            {job.title}
                          </DialogTitle>
                          <DialogDescription className="text-lg">
                            {job.company.name} • {job.location} • {job.type}
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
                            <h3 className="font-semibold mb-2">
                              Job Description
                            </h3>
                            <p className="text-muted-foreground">
                              {job.description}
                            </p>
                          </div>

                          {/* <div>
                            <h3 className="font-semibold mb-2">Requirements</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {job.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div> */}

                          {/* <div>
                            <h3 className="font-semibold mb-2">Benefits</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {job.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))}
                            </ul>
                          </div> */}

                          <Button
                            className="w-full"
                            onClick={() => handleApply(job.id)}
                          >
                            Apply Now
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button onClick={() => handleApply(job.id)}>
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )} */}
      </main>
    </div>
  );
}
