import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated blue-red background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-blue-400/30 via-red-400/20 to-blue-500/30 blur-2xl opacity-80 animate-cta-bg" />
        <div className="absolute right-0 bottom-0 w-[300px] h-[200px] rounded-full bg-gradient-to-tr from-red-400/30 via-blue-400/10 to-blue-500/20 blur-2xl opacity-60 animate-cta-bg-rev" />
      </div>
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-2xl mx-auto border-4 border-transparent rounded-3xl p-8 bg-white/80 dark:bg-neutral-900/80 shadow-xl backdrop-blur-md animate-cta-border">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-red-500 to-blue-400 bg-clip-text text-transparent animate-gradient-move">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-xl text-blue-900/90 dark:text-blue-100/80 mb-8">
            Join JobBoard today and discover thousands of job opportunities from top companies worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 via-red-400 to-blue-600 text-white font-bold shadow-lg hover:from-blue-600 hover:to-red-500 transition-all duration-300 border-2 border-transparent hover:border-blue-400 animate-cta-btn"
                style={{
                  boxShadow: "0 4px 24px 0 rgba(59,130,246,0.16), 0 1.5px 6px 0 rgba(239,68,68,0.10)",
                }}
              >
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/90 dark:bg-neutral-900/80 border-2 border-blue-400 dark:border-blue-700 text-blue-700 dark:text-blue-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
              >
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 5s ease-in-out infinite alternate;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-cta-bg {
          animation: cta-bg-move 12s ease-in-out infinite alternate;
        }
        .animate-cta-bg-rev {
          animation: cta-bg-move-rev 14s ease-in-out infinite alternate;
        }
        @keyframes cta-bg-move {
          0%,100% { transform: translateY(0) scale(1);}
          50% { transform: translateY(20px) scale(1.08);}
        }
        @keyframes cta-bg-move-rev {
          0%,100% { transform: translateY(0) scale(1);}
          50% { transform: translateY(-20px) scale(1.05);}
        }
        .animate-cta-border {
          box-shadow: 0 0 0 0 rgba(59,130,246,0.15), 0 1.5px 6px 0 rgba(239,68,68,0.10);
          animation: cta-border-glow 4s ease-in-out infinite alternate;
        }
        @keyframes cta-border-glow {
          0% { border-color: rgba(59,130,246,0.25); }
          50% { border-color: rgba(239,68,68,0.25); }
          100% { border-color: rgba(59,130,246,0.25); }
        }
        .animate-cta-btn {
          animation: cta-btn-glow 2.5s cubic-bezier(0.4,0,0.6,1) infinite alternate;
        }
        @keyframes cta-btn-glow {
          0% { box-shadow: 0 4px 24px 0 rgba(59,130,246,0.16), 0 1.5px 6px 0 rgba(239,68,68,0.10);}
          100% { box-shadow: 0 8px 32px 0 rgba(239,68,68,0.18), 0 2px 8px 0 rgba(59,130,246,0.12);}
        }
      `}</style>
    </section>
  );
};

export default CTA;