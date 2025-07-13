"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, Target, Heart, Award, Zap, Globe, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Former VP of Engineering at TechCorp with 15+ years in the industry.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Ex-Google engineer passionate about building scalable platforms.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Emily Davis",
    role: "Head of Product",
    bio: "Product leader with expertise in user experience and growth.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "David Wilson",
    role: "Head of Marketing",
    bio: "Marketing strategist focused on connecting talent with opportunities.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to connecting talented individuals with their dream careers.",
  },
  {
    icon: Heart,
    title: "People-First",
    description: "Every decision we make prioritizes the success and well-being of our users.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously evolve our platform with cutting-edge technology.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Building bridges between talent and opportunities worldwide.",
  },
]

const stats = [
  { number: "2019", label: "Founded" },
  { number: "50,000+", label: "Job Seekers" },
  { number: "5,000+", label: "Companies" },
  { number: "95%", label: "Success Rate" },
]

export default function AboutPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">JobBoard</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">
                Jobs
              </Link>
              <Link href="/about" className="text-foreground font-medium">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Connecting Talent with Opportunity</h1>
              <p className="text-xl text-muted-foreground mb-8">
                We believe everyone deserves to find meaningful work that aligns with their skills, values, and
                aspirations. That's why we built JobBoard - to make job searching simple, efficient, and successful.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Story</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Founded on Experience</h3>
                  <p className="text-muted-foreground mb-6">
                    JobBoard was born from the frustration of navigating outdated job search platforms. Our founders,
                    having experienced the challenges of both job seeking and hiring, set out to create a better
                    solution.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    We launched in 2019 with a simple mission: make job searching as efficient and effective as
                    possible. Today, we're proud to have helped thousands of professionals find their dream jobs while
                    helping companies discover amazing talent.
                  </p>
                  <Badge variant="secondary" className="text-sm">
                    <Award className="h-4 w-4 mr-1" />
                    Best Job Platform 2023
                  </Badge>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-lg p-8 text-center">
                  <Users className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">50,000+ Success Stories</h4>
                  <p className="text-muted-foreground">
                    Every month, thousands of professionals find their next opportunity through JobBoard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do and shape the experience we create for our users.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're a diverse group of professionals passionate about transforming the job search experience.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full flex items-center justify-center">
                        <Users className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of professionals who have found their dream jobs through JobBoard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Get Started Today
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">JobBoard</span>
              </div>
              <p className="text-muted-foreground">
                Connecting talented professionals with amazing opportunities worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/jobs" className="hover:text-foreground transition-colors">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-foreground transition-colors">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Career Advice
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Post Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Find Candidates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 JobBoard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
