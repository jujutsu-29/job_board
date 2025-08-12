import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

const lastUpdated = "June 2025"
const companyName = "JobBoard Inc."
const contactEmail = "privacy@jobboard.com"
const companyAddress = "Baner, Pune, Maharashtra"
const contactPhone = "+1-555-123-4567"

export const metadata = {
  title: "Privacy Policy - JobBoard",
  description: "Learn how JobBoard collects, uses, and protects your personal information.",
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Privacy Policy</span>
          </nav>

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  At {companyName}, we collect information you provide directly to us, such as when you create an
                  account, apply for jobs, or contact us. This may include:
                </p>
                <ul>
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Professional information (resume, work experience, skills)</li>
                  <li>Account credentials and preferences</li>
                  <li>Communications with us</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We use cookies and similar tracking technologies to provide and improve our services. This includes:
                </p>
                <ul>
                  <li>Essential cookies for site functionality</li>
                  <li>Analytics cookies to understand site usage</li>
                  <li>Google AdSense cookies for personalized advertising</li>
                  <li>Third-party cookies from integrated services</li>
                </ul>
                <p>
                  You can control cookie preferences through your browser settings. Note that disabling certain cookies
                  may affect site functionality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide, maintain, and improve our job board services</li>
                  <li>Process job applications and facilitate connections with employers</li>
                  <li>Send you relevant job alerts and notifications</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Information Sharing and Third Parties</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>We may share your information with third parties in the following circumstances:</p>
                <ul>
                  <li>With employers when you apply for jobs (with your consent)</li>
                  <li>With service providers who assist in operating our platform</li>
                  <li>With advertising partners, including Google AdSense</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
                <p>We do not sell your personal information to third parties for their marketing purposes.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>You have the following rights regarding your personal information:</p>
                <ul>
                  <li>Access and review your personal information</li>
                  <li>Update or correct inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request data portability</li>
                  <li>Object to certain processing activities</li>
                </ul>
                <p>
                  To exercise these rights, please contact us through our
                  <Link href="/contact" className="text-primary hover:underline">
                    {" "}
                    contact form
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Data Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission
                  is completely secure, and we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>          
      <Footer />
    </div>
  )
}
