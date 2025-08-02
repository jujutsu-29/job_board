import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-red-500 to-blue-400 bg-clip-text text-transparent animate-gradient-move">
            Find Your{" "}
            <span className="underline decoration-red-400/60 decoration-4">
              Dream Job
            </span>{" "}
            Today
          </h1>
          <p className="text-xl md:text-2xl text-blue-900/80 dark:text-blue-100/80 mb-8 max-w-2xl mx-auto font-medium">
            Connect with top companies, discover amazing opportunities, and take
            the next step in your career journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 via-red-400 to-blue-600 text-white font-bold shadow-lg hover:from-blue-600 hover:to-red-500 transition-all duration-300 border-2 border-transparent hover:border-blue-400"
                style={{
                  boxShadow:
                    "0 4px 24px 0 rgba(59,130,246,0.12), 0 1.5px 6px 0 rgba(239,68,68,0.08)",
                }}
              >
                Browse Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/80 dark:bg-neutral-900/80 border-2 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 6s ease-in-out infinite alternate;
        }
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
