import { Briefcase } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const companyName = "JobBoard"
const contactEmail = "support@jobboard.com"
const companyAddress = "123 JobStreet, JobCity, JobCountry"
const contactPhone = "+1234567890"

export const metadata = {
  title: "Disclaimer - JobBoard",
  description: "Important disclaimers about using JobBoard services and job listings.",
}

export default function Disclaimer() {
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
            <span>Disclaimer</span>
          </nav>

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
            <p className="text-xl text-muted-foreground">Important information about using JobBoard services</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Independent Job Listing Platform</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  {companyName} ("JobBoard") is an independent job listing platform that aggregates and displays job
                  opportunities from various sources. We are not an employer, recruitment agency, or staffing firm. We
                  do not directly hire candidates or make employment decisions.
                </p>
                <p>
                  Our role is limited to providing a platform where job seekers can discover opportunities and employers
                  can post job listings. Any employment relationship is solely between the job seeker and the hiring
                  company.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Job Listing Sources and Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>Job listings on our platform are sourced from multiple providers, including:</p>
                <ul>
                  <li>Direct employer submissions</li>
                  <li>Third-party job boards and aggregators</li>
                  <li>Company career pages</li>
                  <li>Recruitment agencies and staffing firms</li>
                  <li>Public job posting APIs</li>
                </ul>
                <p>
                  While we strive to maintain accurate and up-to-date information, we cannot guarantee the accuracy,
                  completeness, or timeliness of job listings. Job details, requirements, and availability may change
                  without notice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">User Responsibility for Verification</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>Before applying for any position, users are strongly advised to:</p>
                <ul>
                  <li>Verify job details directly with the hiring company</li>
                  <li>Research the company's legitimacy and reputation</li>
                  <li>Confirm salary ranges, benefits, and job requirements</li>
                  <li>Ensure the job posting is current and the position is still available</li>
                  <li>Be cautious of potential scams or fraudulent job postings</li>
                  <li>
                    Never provide sensitive personal information unless you're certain of the employer's legitimacy
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">No Employment Guarantees</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>JobBoard does not guarantee:</p>
                <ul>
                  <li>Job placement or employment opportunities</li>
                  <li>Interview invitations or responses from employers</li>
                  <li>The accuracy of job descriptions or requirements</li>
                  <li>The legitimacy of all job postings or employers</li>
                  <li>Specific salary ranges or compensation packages</li>
                  <li>The availability of posted positions</li>
                </ul>
                <p>
                  Success in job searching depends on many factors including qualifications, experience, market
                  conditions, and employer preferences, which are beyond our control.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Third-Party Links and Content</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Our platform may contain links to third-party websites, including employer websites, application
                  portals, and other job-related services. We are not responsible for:
                </p>
                <ul>
                  <li>The content, accuracy, or availability of third-party websites</li>
                  <li>The privacy practices of external sites</li>
                  <li>Any transactions or interactions with third parties</li>
                  <li>The security of information shared with external sites</li>
                </ul>
                <p>
                  Users access third-party links at their own risk and should review the terms and privacy policies of
                  external websites.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>To the fullest extent permitted by law, JobBoard disclaims all liability for:</p>
                <ul>
                  <li>Decisions made by employers regarding hiring or rejection</li>
                  <li>Inaccurate, misleading, or fraudulent job postings</li>
                  <li>Employment disputes between users and employers</li>
                  <li>Loss of time, opportunity, or income related to job searching</li>
                  <li>Any damages arising from the use of our platform</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Reporting Issues</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  If you encounter suspicious job postings, fraudulent activity, or other issues, please report them to
                  us immediately at {contactEmail}. While we investigate reports and take appropriate action, we cannot
                  guarantee the prevention of all fraudulent or misleading content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Changes to This Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We may update this disclaimer from time to time. Changes will be posted on this page with an updated
                  revision date. Your continued use of our platform after changes constitutes acceptance of the updated
                  disclaimer.
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
