import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-12">
          Have questions or need support? We'd love to hear from you.
        </p>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
