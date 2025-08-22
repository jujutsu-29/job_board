"use client";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { copyJobLink, socials } from "../utils";

export function ApplyNowButton({
  applyUrl,
  className,
}: {
  applyUrl: string;
  className?: string;
}) {
  return (
    <Button
      className={`w-full text-lg py-4 rounded-full shadow-md ${className}`}
      onClick={() => window.open(applyUrl, "_blank")}
    >
      Apply Now
      <ExternalLink className="ml-2 h-5 w-5" />
    </Button>
  );
}

export function HandleShareJobButton({ slug }: { slug: string }) {
  return (
    <Button
      variant="outline"
      className="w-full justify-start bg-transparent"
      onClick={() => {
        const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${slug}`;
        navigator.clipboard
          .writeText(shareUrl)
          .then(() => copyJobLink(slug))
          .catch((err) => {
            console.error("Failed to copy job link: ", err);
          });
      }}
    >
      <Copy className="h-4 w-4 mr-2" />
      Copy Link
    </Button>
  );
}

export function HandleSocialShareButton({
  slug,
  title,
  name,
}: {
  slug: string;
  title: string;
  name: string;
}) {
  const handleSocialShare = (platform: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${slug}`;
    const text = `Check out this job opportunity: ${title} at ${name}`;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    };

    window.open(
      shareUrls[platform as keyof typeof shareUrls],
      "_blank",
      "width=600,height=400"
    );
  };

  return (
    <div className="flex space-x-2">
      {socials.map((platform) => (
        <Button
          key={platform}
          variant="outline"
          size="sm"
          className="flex-1 bg-transparent"
          onClick={() => handleSocialShare(platform)}
        >
          {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </Button>
      ))}
    </div>
  );
}
