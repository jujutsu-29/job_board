import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
const CTA = () => {
    return (
        <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Next Opportunity?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join JobBoard today and discover thousands of job opportunities from top companies worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-6">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
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
    )
}

export default CTA;