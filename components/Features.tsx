import { Search, Bell, Users, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Features = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Job Search",
      description:
        "Find your perfect job with our advanced search and filtering system",
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description:
        "Get instant alerts when new jobs matching your criteria are posted",
    },
    {
      icon: Users,
      title: "Top Companies",
      description:
        "Connect with leading companies and startups across all industries",
    },
    {
      icon: Briefcase,
      title: "All Job Types",
      description:
        "From full-time to freelance, find opportunities that fit your lifestyle",
    },
  ];
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Rolespot?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We make job searching simple, efficient, and successful with our
            cutting-edge platform.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
