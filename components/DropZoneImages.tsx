"use client";

import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, UploadCloud } from "lucide-react";

// ------------------------------------------------------------
// <UploadDropzone />
// Drag & drop upload area with live image previews
// Works with Next.js App Router. Style matches shadcn/ui.
// ------------------------------------------------------------

export type UploadDropzoneProps = {
  /** Callback when files are accepted */
  onFilesAccepted?: (files: File[]) => void;
  /** Max files allowed */
  maxFiles?: number;
  /** Max size in MB */
  maxSizeMB?: number;
  /** Accept string as in input accept attribute (default: images) */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Initial files (optional) */
  initialFiles?: File[];
};

export default function UploadDropzone({
  onFilesAccepted,
  maxFiles = 1,
  maxSizeMB = 5,
  accept = "image/*",
//   multiple = true,
  initialFiles = [],
}: UploadDropzoneProps) {
  type Preview = { id: string; file: File; src: string };
  const [previews, setPreviews] = useState<Preview[]>([]);

  // Helpers
  const toMB = (bytes: number) => bytes / (1024 * 1024);

  // Initialize with any provided files
  useEffect(() => {
    if (initialFiles.length) {
      const mapped = initialFiles.map((f) => ({
        id: crypto.randomUUID(),
        file: f,
        src: URL.createObjectURL(f),
      }));
      setPreviews((p) => [...p, ...mapped]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.src));
    };
  }, [previews]);

  const onDrop = useCallback(
    (accepted: File[], rejected: any[]) => {
      // Simple size & count guard (react-dropzone already filters, this just messages)
      const allowedCount = Math.max(0, maxFiles - previews.length);
      const toUse = accepted.slice(0, allowedCount);

      const valid = toUse.filter((f) => toMB(f.size) <= maxSizeMB);

      const mapped: Preview[] = valid.map((file) => ({
        id: crypto.randomUUID(),
        file,
        src: URL.createObjectURL(file),
      }));

      if (!mapped.length) return;

      setPreviews((prev) => [...prev, ...mapped]);
      onFilesAccepted?.(mapped.map((m) => m.file));
    },
    [maxFiles, maxSizeMB, onFilesAccepted, previews.length]
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // Accept only images by default
    // multiple,
    maxFiles,
    maxSize: maxSizeMB * 1024 * 1024,
  });

  const stateStyles = useMemo(() => {
    if (isDragReject)
      return "border-destructive/60 bg-destructive/5";
    if (isDragAccept)
      return "border-emerald-500/60 bg-emerald-500/5";
    if (isDragActive)
      return "border-primary/60 bg-primary/5";
    return "border-muted-foreground/30";
  }, [isDragActive, isDragAccept, isDragReject]);

  const remove = (id: string) => {
    setPreviews((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.src);
      return prev.filter((p) => p.id !== id);
    });
  };

  const clearAll = () => {
    setPreviews((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.src));
      return [];
    });
  };

  return (
    <div className="w-full space-y-4">
      <Card
        {...getRootProps({
          className:
            `group cursor-pointer border-2 border-dashed ${stateStyles} rounded-2xl p-6 transition-colors ` +
            `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary`,
        })}
      >
        <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
          <input {...getInputProps()} aria-label="Upload images" />
          <UploadCloud className="h-8 w-8 opacity-70" />
          <div className="space-y-1">
            <p className="text-base font-medium">Drag files here to upload</p>
            <p className="text-sm text-muted-foreground">
              or click to browse — up to {maxFiles} files, {maxSizeMB}MB each
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            Accepted: {accept.replace("/*", "s")}
          </div>
        </CardContent>
      </Card>

      {previews.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {previews.length} file{previews.length > 1 ? "s" : ""} selected
            </p>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear all
            </Button>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {previews.map((p) => (
              <li key={p.id} className="relative">
                <div className="aspect-square overflow-hidden rounded-xl border bg-muted">
                  {/* Next/Image for better perf; falls back to regular img if needed */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={p.file.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-1 truncate text-xs" title={p.file.name}>
                  {p.file.name}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-7 w-7 rounded-full bg-background/70 backdrop-blur"
                  onClick={() => remove(p.id)}
                  aria-label={`Remove ${p.file.name}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------
// Usage Example (drop this inside any component/page)
// ------------------------------------------------------------
//
// import UploadDropzone from "./UploadDropzone";
//
// export default function Demo() {
//   const [files, setFiles] = useState<File[]>([]);
//   return (
//     <div className="mx-auto max-w-2xl p-6">
//       <UploadDropzone onFilesAccepted={(f) => setFiles((p) => [...p, ...f])} />
//       <pre className="mt-6 rounded-lg bg-muted p-3 text-xs">
//         {files.map((f) => `${f.name} (${Math.round(f.size/1024)} KB)`).join("\n")}
//       </pre>
//     </div>
//   );
// }
//
// ------------------------------------------------------------
// Install:
//   npm i react-dropzone lucide-react
//   (shadcn/ui + tailwind already in your project)
// ------------------------------------------------------------
