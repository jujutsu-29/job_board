"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { createJob } from "@/lib/server/jobs";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function RandomPage() {

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const url = (form.elements.namedItem("url") as HTMLInputElement).value;

    const res = await createJob(url, true);

    if (res.success) {
      toast({
        title: "Job Created",
        description: `Redirecting to admin page.`,
        variant: "default",        
      });
    } else {
      toast({
        title: "Error",
        description: res.error || "An unknown error occurred.",
        variant: "destructive",
      });

    }
    setLoading(false);
    if (res.success) {
      redirect(`/admin/jobs/`);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center bg-background px-4 py-12 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
          Enter a URL
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Paste a URL below to get started.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row w-full max-w-sm items-center space-y-2 sm:space-y-0 sm:space-x-2 mx-auto"
        >
          <Input
            name="url"
            type="url"
            placeholder="https://example.com"
            className="flex-grow"
          />
          <Button type="submit" className="w-full sm:w-auto">
            {loading ? "Creating Job..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
