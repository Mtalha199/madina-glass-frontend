import { HeroSection } from "@/components/hero";
import { StatisticsBanner, WhatWeOfferSection, WhyChooseSection, ServicePromotionSection } from "@/components/features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | BFZ Track",
  description: "BFZ Track Limited - Official partner of Beforward for vehicle imports from Japan to Zambia and Zimbabwe. Expert port clearance and vehicle delivery services.",
};

export default function ServicesPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection
        title="Your Trusted Partner for"
        titleHighlight="Vehicle Import Services"
        description="BFZ Track Limited is the official partner of Beforward, specializing in seamless vehicle delivery from Japan to Zambia and Zimbabwe. We handle every step of your import journey with expertise and transparency."
        badge="OFFICIAL BEFORWARD PARTNER"
        backgroundImage="/images/banners/hero.png"
        primaryButton={{
          text: "Get Started",
          href: "/contact",
        }}
        secondaryButton={{
          text: "Contact Sales",
          href: "/contact",
        }}
        statusCards={[
          {
            label: "SERVICE STATUS",
            status: "Available 24/7",
            position: "top-right",
            icon: <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />,
          },
        ]}
      />
      <ServicePromotionSection />
      <StatisticsBanner
        stats={[
          { value: "99.9%", label: "UPTIME SLA" },
          { value: "2.4k+", label: "PORTS CLEARED" },
          { value: "15min", label: "AVG CLEARANCE" },
          { value: "50+", label: "COUNTRIES" },
        ]}
      />
      <WhatWeOfferSection />
      <WhyChooseSection />
      
    </div>
  );
}