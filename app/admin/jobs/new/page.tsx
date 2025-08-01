"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

interface JobFormData {
  title: string;
  companyName: string;
  description: string;
  applyUrl: string;
  status: "draft" | "published" | "archived" | "closed";
  isFeatured: boolean;
  source: string;
  postedAt: string;
  expiresAt: string;
  createdById: string;
  jobType: string;
  salary: string;
  experience: string;
  requirements: string;
  basicQualifications: string;
  keyResponsibilities: string;
  technicalSkills: string;
  locationsAvailable: string;
  tags: string;
}

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    companyName: "",
    description: "",
    applyUrl: "",
    status: "draft",
    isFeatured: false,
    source: "",
    postedAt: "",
    expiresAt: "",
    createdById: "",
    jobType: "",
    salary: "",
    experience: "",
    requirements: "",
    basicQualifications: "",
    keyResponsibilities: "",
    technicalSkills: "",
    locationsAvailable: "",
    tags: "",
  });

  const handleInputChange = (
    field: keyof JobFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/admin/jobs", {
        ...formData,
        // Convert comma-separated strings to arrays for array fields
        requirements: formData.requirements
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        basicQualifications: formData.basicQualifications
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        keyResponsibilities: formData.keyResponsibilities
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        technicalSkills: formData.technicalSkills
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        locationsAvailable: formData.locationsAvailable
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        tags: formData.tags.split("\n").map((s) => s.trim()).filter(Boolean),
      });

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Job created successfully",
        });
        router.push("/admin/jobs");
      } else {
        toast({
          title: "Error",
          description: "Failed to create job",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <CardDescription>
            Fill in the information for the new job posting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
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
                <Label htmlFor="companyName">Company *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="e.g. Acme Corp"
                  required
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g. Remote or San Francisco, CA"
                  required
                />
              </div> */}
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
              {/* <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="e.g. senior-frontend-developer"
                  required
                />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="isFeatured">Featured</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      handleInputChange("isFeatured", checked as boolean)
                    }
                  />
                  <span>Mark as featured</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  value={formData.source}
                  onChange={(e) => handleInputChange("source", e.target.value)}
                  placeholder='e.g. "manual", "greenhouse"'
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postedAt">Posted At</Label>
                <Input
                  id="postedAt"
                  type="datetime-local"
                  value={formData.postedAt}
                  onChange={(e) => handleInputChange("postedAt", e.target.value)}
                />
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
              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Input
                  id="jobType"
                  value={formData.jobType}
                  onChange={(e) => handleInputChange("jobType", e.target.value)}
                  placeholder="e.g. Full-time, Part-time"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="e.g. $100k - $150k"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expeience">Experience</Label>
                <Input
                  id="expeience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  placeholder="e.g. 3+ years"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  placeholder="Comma separated, e.g. React, TypeScript, REST APIs"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="basicQualifications">Basic Qualifications</Label>
                <Textarea
                  id="basicQualifications"
                  value={formData.basicQualifications}
                  onChange={(e) => handleInputChange("basicQualifications", e.target.value)}
                  placeholder="Comma separated, e.g. Bachelor's degree, 2+ years experience"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="keyResponsibilities">Key Responsibilities</Label>
                <Textarea
                  id="keyResponsibilities"
                  value={formData.keyResponsibilities}
                  onChange={(e) => handleInputChange("keyResponsibilities", e.target.value)}
                  placeholder="Comma separated, e.g. Lead team, Write code"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="technicalSkills">Technical Skills</Label>
                <Textarea
                  id="technicalSkills"
                  value={formData.technicalSkills}
                  onChange={(e) => handleInputChange("technicalSkills", e.target.value)}
                  placeholder="Comma separated, e.g. JavaScript, Node.js, SQL"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="locationsAvailable">Locations Available</Label>
                <Textarea
                  id="locationsAvailable"
                  value={formData.locationsAvailable}
                  onChange={(e) => handleInputChange("locationsAvailable", e.target.value)}
                  placeholder="Comma separated, e.g. Remote, New York, London"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="tags">Tags</Label>
                <Textarea
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="Comma separated, e.g. remote, full-time, urgent"
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
              <p className="text-sm text-muted-foreground">
                You can use Markdown formatting for rich text
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
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
  );
}
