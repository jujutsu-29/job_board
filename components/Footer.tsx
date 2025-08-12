import Link from "next/link";
import { Briefcase } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {/* <Briefcase className="h-6 w-6 text-primary" /> */}
              <Image
                src="/rolespot_noBG.png"
                alt="Rolespot Logo"
                width={32}
                height={32}
                className="h-8 w-8 text-primary"
              />
              <span className="text-lg font-bold">Rolespot</span>
            </div>
            <p className="text-muted-foreground">
              Connecting talented professionals with amazing opportunities
              worldwide.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="hover:text-foreground transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Jobs</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-foreground transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="hover:text-foreground transition-colors"
                >
                  Companies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Rolespot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
