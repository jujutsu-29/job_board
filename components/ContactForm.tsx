"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast({ title: "Message Sent!", description: "We’ll get back to you soon." });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      toast({ title: "Error", description: "Failed to send message", variant: "destructive" });
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input id="name" name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
      </div>
      <div>
        <Label htmlFor="subject">Subject *</Label>
        <Input id="subject" name="subject" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required />
      </div>
      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={6} required />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
