import { HeroSection } from "@/components/hero";
import AboutOverviewSection from "@/components/features/AboutOverviewSection";
import AppDownloadSection from "@/components/features/AppDownloadSection";
import CTASection from "@/components/features/CTASection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | BFZ Track",
  description: "BFZ Track Limited - Official partner of Beforward for vehicle imports from Japan to Zambia and Zimbabwe. Expert port clearance and vehicle delivery services.",
};

export default function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection
        title="Your Trusted Partner for"
        titleHighlight="Vehicle Import from Japan"
        description="BFZ Track Limited is the official partner of Beforward, specializing in seamless vehicle delivery from Japan to Zambia and Zimbabwe. We handle every step of your import journey with expertise and transparency."
        badge="OFFICIAL BEFORWARD PARTNER"
        backgroundImage="/images/banners/hero.png"
        primaryButton={{
          text: "View Our Services",
          href: "/services",
        }}
        secondaryButton={{
          text: "Contact Sales",
          href: "/contact",
        }}
        showDefaultContent={false}
      />
      <AboutOverviewSection />
      <AppDownloadSection />
      <CTASection />
    </div>
  );
}

