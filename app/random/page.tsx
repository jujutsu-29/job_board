'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createJob } from "@/lib/server/jobs";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const url = (form.elements.namedItem("url") as HTMLInputElement).value;

  const res = await createJob(url, true);
  console.log("Job creation response:", res);
}

export default function RandomPage() {
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
          <Input name="url" type="url" placeholder="https://example.com" className="flex-grow" />
          <Button type="submit" className="w-full sm:w-auto">Submit</Button>
        </form>
      </div>
    </div>
  );
}
