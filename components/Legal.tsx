import Link from "next/link";

export default function Legal() {
  return (
    <div className="w-full bg-background border-t border-muted">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between gap-8 sm:gap-16 px-4 py-6">
        
        {/* Legal Section */}
        <div className="flex-1">
          <h3 className="font-semibold mb-4 text-lg text-foreground">Legal</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/disclaimer"
                className="hover:text-primary transition-colors duration-200"
              >
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="flex-1">
          <h3 className="font-semibold mb-4 text-lg text-foreground">Support</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-primary transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom note */}
      <div className="border-t border-muted text-center py-4 text-sm text-muted-foreground">
        © 2025 Rolespot. All rights reserved.
      </div>
    </div>
  );
}
