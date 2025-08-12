import { Briefcase } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

const lastUpdated = "2024-01-01"
const companyName = "JobBoard"
const contactEmail = "contact@jobboard.com"
const companyAddress = "123 JobStreet, JobCity, JobCountry"
const contactPhone = "+1234567890"

export const metadata = {
  title: "Terms & Conditions - JobBoard",
  description: "Read our terms and conditions for using JobBoard services.",
}

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      <Header/>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Terms & Conditions</span>
          </nav>

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  By accessing and using {companyName} ("we," "our," or "us"), you accept and agree to be bound by the
                  terms and provision of this agreement. If you do not agree to abide by the above, please do not use
                  this service.
                </p>
                <p>These terms apply to all visitors, users, and others who access or use the service.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>As a user of our platform, you agree to:</p>
                <ul>
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Use the service only for lawful purposes and in accordance with these terms</li>
                  <li>Respect the intellectual property rights of others</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Content Ownership and Usage</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  You retain ownership of any content you submit, post, or display on or through the service. By
                  submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy,
                  reproduce, process, adapt, modify, publish, transmit, display, and distribute such content.
                </p>
                <p>
                  We reserve the right to remove any content that violates these terms or is otherwise objectionable.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Job Listing Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>While we strive to ensure the accuracy of job listings on our platform:</p>
                <ul>
                  <li>Job information is provided by third-party employers and partners</li>
                  <li>We do not guarantee the accuracy, completeness, or timeliness of job listings</li>
                  <li>Users should verify job details directly with employers before applying</li>
                  <li>We are not responsible for the hiring decisions of employers</li>
                  <li>Job availability may change without notice</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Prohibited Activities</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>You may not use our service to:</p>
                <ul>
                  <li>Post false, misleading, or fraudulent job listings or applications</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Spam or send unsolicited communications</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Attempt to reverse engineer or hack our systems</li>
                  <li>Use automated tools to scrape or collect data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  To the fullest extent permitted by applicable law, {companyName} shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
                  incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
                <p>
                  Our total liability to you for all claims arising from or relating to the service shall not exceed the
                  amount you paid us in the twelve months preceding the claim.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Service Availability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We strive to maintain service availability but do not guarantee uninterrupted access. We may modify,
                  suspend, or discontinue the service at any time without notice. We are not liable for any
                  modification, suspension, or discontinuation of the service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of significant changes by
                  posting the new terms on this page and updating the "Last updated" date. Your continued use of the
                  service after changes constitutes acceptance of the new terms.
                </p>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>If you have questions about these Terms & Conditions, please contact us at:</p>
                <p>
                  Email: {contactEmail}
                  <br />
                  Address: {companyAddress}
                  <br />
                  Phone: {contactPhone}
                </p>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </main>      
      <Footer/>
    </div>
  )
}
