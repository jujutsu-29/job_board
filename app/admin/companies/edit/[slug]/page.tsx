"use client";

import type React from "react";
import { use, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { JobFormData } from "@/types/types";
import { editCompany } from "@/lib/server/company";
import UploadDropzone from "@/components/DropZoneImages";
import { handleImageUpload } from "@/lib/utils";

export default function NewJobPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  //   console.log("slug coming is this ", slug);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<JobFormData>({
    name: "",
    website: "",
    description: "",
    companyType: "draft",
    tags: "",
    logo: null,
  });

  const handleInputChange = (
    field: keyof JobFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackClick = () => {
    // console.log("Back button clicked");
    router.push("/admin/companies");
  };



  function fetchingExistingData() {
    // if (!slug) return;

    axios
      .get(`/api/admin/company/${slug}`)
      .then((response) => {
        const company = response.data.company;
        setFormData({
          name: company.name || "",
          website: company.website || "",
          description: company.description || "",
          companyType: company.companyType || "",
          tags: (company.tags || []).join("\n"),
          logo: company.logo || null,
        });
        // });
      })
      .catch((error) => {
        console.error("Error fetching existing data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch existing company data",
          variant: "destructive",
        });
      });
  }
  useEffect(() => {
    if (slug) {
      fetchingExistingData();
    }
  }, [slug]);
  //   const existingData = await axios.get(`/api/admin/company/${slug}`);
  const handleSubmit = async (e: React.FormEvent) => {
    // if(!formData) return;
    e.preventDefault();
    setLoading(true);
    // console.log("Form data at submit time:", formData);
    if (file) {
      // console.log("got file here, inside call, ", file);
      const response = await handleImageUpload(file);
      // console.log("Image uploaded successfully ", response);
      formData.logo = response; // Update formData with the uploaded image URL
    }
    try {
      // console.log("formdata ", formData)
      const response = await editCompany({ slug: slug ?? "", formData });
    
      if (response.success) {
        toast({
          title: "Success",
          description: "Company data updated successfully",
        });
        router.push("/admin/companies");
      } else {
        toast({
          title: "Error",
          description: "Failed to update company data",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update company data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={handleBackClick}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Company</h1>
          <p className="text-muted-foreground">Update the company data</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
          <CardDescription>
            Fill in the information for the company data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Company name*</Label>
                <Input
                  id="name"
                  value={formData?.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g. Amazon, Google"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applyUrl">Company URL *</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData?.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://amazon.com/"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyType">Company Type*</Label>
                <Select
                  value={formData.companyType}
                  onValueChange={(value) =>
                    handleInputChange("companyType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Automotive">Automotive</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="space-y-2 md:col-span-2">
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

            {/* <div className="space-y-2">
              <Label htmlFor="description">Company Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe the company..."
                className="min-h-[200px]"
                required
              />
              <p className="text-sm text-muted-foreground">
                You can use Markdown formatting for rich text
              </p>
            </div> */}

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Editing..." : "Edit Entry"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
