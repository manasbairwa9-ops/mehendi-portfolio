import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export const metadata = {
  title: "Contact Us | Mehndi Artistry",
  description: "Get in touch with our mehndi artist for bookings, inquiries, and custom design requests.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-mehndi-dark mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or want to discuss a custom design? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
