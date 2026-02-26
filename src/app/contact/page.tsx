import {
  ContactHeader,
  ContactForm,
  ContactInfoSection,
  ContactMapSection,
} from "@/components/contact-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | BFZ Track",
  description: "Contact BFZ Track Limited - Official partner of Beforward for vehicle imports from Japan to Zambia and Zimbabwe. Get expert assistance with port clearance and vehicle delivery services.",
};

export default function ContactPage() {
  return (
    <div className="w-full overflow-x-hidden bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ContactHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left Column - Contact Form */}
          <div className="h-full">
            <ContactForm />
          </div>

          {/* Right Column - Contact Info & Map */}
          <div className="space-y-6 h-full">
            <ContactInfoSection />
            <ContactMapSection />
          </div>
        </div>
      </div>
    </div>
  );
}

