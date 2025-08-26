"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import { handleImageUpload, jobTypes, locationOptions } from "@/lib/utils";
import { createJob, updateJob } from "@/lib/server/jobs";
import UploadDropzone from "../DropZoneImages";

interface JobFormData {
  title: string;
  companyName: string;
  description: string;
  image: string;
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
  locationsAvailable: string[];
  tags: string;
  batches: string;
}

interface JobFormProps {
  mode: "create" | "edit";
  initialData?: Partial<JobFormData>;
  slug?: string;
  onSuccess?: () => void;
}

const defaultFormData: JobFormData = {
  title: "",
  companyName: "",
  description: "",
  image: "",
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
  locationsAvailable: [],
  tags: "",
  batches: "",
};

export default function JobForm({
  mode,
  initialData,
  slug,
  onSuccess,
}: JobFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<JobFormData>(defaultFormData);
  const [file, setFile] = useState<File | null>(null);

  // Initialize form data
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        // Convert arrays back to newline-separated strings for textarea display
        requirements: Array.isArray(initialData.requirements)
          ? initialData.requirements.join("\n")
          : initialData.requirements || "",
        basicQualifications: Array.isArray(initialData.basicQualifications)
          ? initialData.basicQualifications.join("\n")
          : initialData.basicQualifications || "",
        keyResponsibilities: Array.isArray(initialData.keyResponsibilities)
          ? initialData.keyResponsibilities.join("\n")
          : initialData.keyResponsibilities || "",
        technicalSkills: Array.isArray(initialData.technicalSkills)
          ? initialData.technicalSkills.join("\n")
          : initialData.technicalSkills || "",
        tags: Array.isArray(initialData.tags)
          ? initialData.tags.join("\n")
          : initialData.tags || "",
        locationsAvailable: initialData.locationsAvailable || [],
        // Format dates for datetime-local input
        postedAt: initialData.postedAt
          ? new Date(initialData.postedAt).toISOString().slice(0, 16)
          : "",
        expiresAt: initialData.expiresAt
          ? new Date(initialData.expiresAt).toISOString().slice(0, 16)
          : "",
      }));
    }
  }, [initialData]);

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
      if (file) {
        // console.log("got file here, inside call, ", file);
        const response = await handleImageUpload(file);
        // console.log("Image uploaded successfully ", response);
        formData.image = response; // Update formData with the uploaded image URL
      }

      const submitData = {
        ...formData,
        // Convert newline-separated strings to arrays for backend
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
        tags: formData.tags
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      let result;
      if (mode === "create") {
        result = await createJob(submitData);
      } else {
        result = await updateJob(slug ?? "", submitData);
      }

      if (result.success) {
        toast({
          title: "Success",
          description: `Job ${
            mode === "create" ? "created" : "updated"
          } successfully`,
        });

        if (onSuccess) onSuccess();
        else router.push("/admin/jobs");
      } else {
        toast({
          title: "Error",
          description: result.error || `Failed to ${mode} job`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const pageTitle = mode === "create" ? "Create New Job" : "Edit Job";
  const pageDescription =
    mode === "create"
      ? "Add a new job posting"
      : "Update the job posting details";
  const submitButtonText =
    mode === "create"
      ? loading
        ? "Creating..."
        : "Create Job"
      : loading
      ? "Updating..."
      : "Update Job";

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{pageTitle}</h1>
          <p className="text-muted-foreground">{pageDescription}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Fill in the information for the job posting
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
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  placeholder="e.g. Acme Corp"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applyUrl">Apply URL *</Label>
                <Input
                  id="applyUrl"
                  type="url"
                  value={formData.applyUrl}
                  onChange={(e) =>
                    handleInputChange("applyUrl", e.target.value)
                  }
                  placeholder="https://company.com/apply"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status*</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type*</Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) => handleInputChange("jobType", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <Input
                  id="jobType"
                  value={formData.jobType}
                  onChange={(e) => handleInputChange("jobType", e.target.value)}
                  placeholder="e.g. Full-time, Part-time"
                /> */}
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary*</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="e.g. $100k - $150k"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Batches</Label>
                <Input
                  id="batches"
                  value={formData.batches}
                  onChange={(e) => handleInputChange("batches", e.target.value)}
                  placeholder="e.g. 2023-2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  placeholder="e.g. 3+ years"
                />
              </div>
              <div className="space-y-2">
                {/* <Label htmlFor="isFeatured">Featured</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      handleInputChange("isFeatured", checked as boolean)
                    }
                  />
                  <span>Mark as featured</span>
                </div> */}
                <Label htmlFor="logo">Upload Logo</Label>
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="logo">Logo</Label>
                  {/* <Input
                                    id="logo"
                                    type="file"
                                    onChange={(e) => {
                                      // console.log("File selected:", e.target.files?.[0]);
                                      setFile(e.target.files?.[0] ?? null);
                                      // handleInputChange("logo", file as any);
                                    }}
                                  /> */}
                  <UploadDropzone
                    onFilesAccepted={(files) => {
                      setFile(files[0]);
                      // handleInputChange("logo", files[0]);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Description and Rich Text Fields */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe the job role, requirements, and benefits..."
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) =>
                      handleInputChange("requirements", e.target.value)
                    }
                    placeholder="One requirement per line"
                    className="min-h-[120px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="basicQualifications">
                    Basic Qualifications
                  </Label>
                  <Textarea
                    id="basicQualifications"
                    value={formData.basicQualifications}
                    onChange={(e) =>
                      handleInputChange("basicQualifications", e.target.value)
                    }
                    placeholder="One qualification per line"
                    className="min-h-[120px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keyResponsibilities">
                    Key Responsibilities
                  </Label>
                  <Textarea
                    id="keyResponsibilities"
                    value={formData.keyResponsibilities}
                    onChange={(e) =>
                      handleInputChange("keyResponsibilities", e.target.value)
                    }
                    placeholder="One responsibility per line"
                    className="min-h-[120px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technicalSkills">Technical Skills</Label>
                  <Textarea
                    id="technicalSkills"
                    value={formData.technicalSkills}
                    onChange={(e) =>
                      handleInputChange("technicalSkills", e.target.value)
                    }
                    placeholder="One skill per line"
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </div>

            {/* Locations and Other Fields */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="locationsAvailable">Locations Available</Label>
                <div className="flex flex-wrap gap-4">
                  {locationOptions.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={formData.locationsAvailable.includes(location)}
                        onCheckedChange={(checked) => {
                          setFormData((prev) => {
                            const locations = prev.locationsAvailable;
                            if (checked) {
                              return {
                                ...prev,
                                locationsAvailable: [...locations, location],
                              };
                            } else {
                              return {
                                ...prev,
                                locationsAvailable: locations.filter(
                                  (l) => l !== location
                                ),
                              };
                            }
                          });
                        }}
                      />
                      <Label htmlFor={`location-${location}`}>{location}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Textarea
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="One tag per line"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Input
                    id="source"
                    value={formData.source}
                    onChange={(e) =>
                      handleInputChange("source", e.target.value)
                    }
                    placeholder='e.g. "manual", "greenhouse"'
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postedAt">Posted At</Label>
                  <Input
                    id="postedAt"
                    type="datetime-local"
                    value={formData.postedAt}
                    onChange={(e) =>
                      handleInputChange("postedAt", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiresAt">Expires At</Label>
                  <Input
                    id="expiresAt"
                    type="datetime-local"
                    value={formData.expiresAt}
                    onChange={(e) =>
                      handleInputChange("expiresAt", e.target.value)
                    }
                  />
                </div>
              </div>
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
                {submitButtonText}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
