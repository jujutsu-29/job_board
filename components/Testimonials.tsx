import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content:
        "Found my dream job in just 2 weeks! The platform made it so easy to discover opportunities.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "StartupXYZ",
      content:
        "The notification system is amazing. I got alerts for jobs that perfectly matched my skills.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "UX Designer",
      company: "DesignStudio",
      content:
        "Clean interface, great job descriptions, and easy application process. Highly recommended!",
      rating: 5,
    },
  ];
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-muted/50">
      {/* Animated blue-red glassy background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-blue-400/30 via-red-400/20 to-blue-500/30 blur-2xl opacity-80 animate-testimonials-bg" />
        <div className="absolute right-0 bottom-0 w-[300px] h-[200px] rounded-full bg-gradient-to-tr from-red-400/30 via-blue-400/10 to-blue-500/20 blur-2xl opacity-60 animate-testimonials-bg-rev" />
      </div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-red-500 to-blue-400 bg-clip-text text-transparent animate-gradient-move">
            What Our Users Say
          </h2>
          <p className="text-xl text-blue-900/80 dark:text-blue-100/80">
            Join thousands of professionals who found their perfect job through Rolespot.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl hover:border-blue-400/70 dark:hover:border-blue-500/70 transition-all duration-300 border-0 bg-white/80 dark:bg-blue-950/80 backdrop-blur-md rounded-2xl flex flex-col group overflow-hidden animate-fade-in-up"
              style={{
                animationDelay: `${0.1 * index}s`,
                animationFillMode: "both",
              }}
            >
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription className="text-base italic text-blue-900/90 dark:text-blue-100/80">
                  "{testimonial.content}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold text-blue-700 dark:text-blue-200">{testimonial.name}</div>
                <div className="text-sm text-blue-500 dark:text-blue-300">
                  {testimonial.role} at {testimonial.company}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 6s ease-in-out infinite alternate;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-testimonials-bg {
          animation: testimonials-bg-move 12s ease-in-out infinite alternate;
        }
        .animate-testimonials-bg-rev {
          animation: testimonials-bg-move-rev 14s ease-in-out infinite alternate;
        }
        @keyframes testimonials-bg-move {
          0%,100% { transform: translateY(0) scale(1);}
          50% { transform: translateY(20px) scale(1.08);}
        }
        @keyframes testimonials-bg-move-rev {
          0%,100% { transform: translateY(0) scale(1);}
          50% { transform: translateY(-20px) scale(1.05);}
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
