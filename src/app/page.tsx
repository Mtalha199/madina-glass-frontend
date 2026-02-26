import { HeroSection } from "@/components/hero";
import dynamic from "next/dynamic";
import ZambiaDeliveryMap from "@/components/features/ZambiaDeliveryMap";
import { FeaturesSection, HowItWorksSection } from "@/components/features";
import { FeaturesCTASection } from "@/components/features-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BFZ Track",
  description: "Advanced vehicle tracking and port clearance solutions for global trade",
};

// Lazy load Features component as it's below the fold
const Features = dynamic(() => import("@/components/features").then(mod => ({ default: mod.Features })), {
  ssr: true, // Keep SSR for SEO
  loading: () => <div className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900" />,
});

export default function RootPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection showDefaultContent={true} />
      <HowItWorksSection />
      <Features />
      <FeaturesSection />
      <ZambiaDeliveryMap />
      <FeaturesCTASection />
    </div>
  );
}

