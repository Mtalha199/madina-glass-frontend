import React from "react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    id: 1,
    title: "Mobile Tracking",
    imageSrc: "/images/features/live-gps-tracking.jpg",
    imageAlt: "Mobile Tracking",
  },
  {
    id: 2,
    title: "Digital Clearance",
    imageSrc: "/images/features/digital-clearence.png",
    imageAlt: "Digital Clearance",
  },
  {
    id: 3,
    title: "Smart Routing",
    imageSrc: "/images/features/smart-routing.png",
    imageAlt: "Smart Routing",
  },
  {
    id: 5,
    title: "Proactive Security",
    imageSrc: "/images/features/expence-report.png",
    imageAlt: "Proactive Security",
  },
  {
    id: 4,
    title: "Document Tracking",
    imageSrc: "/images/features/proactive-security.png",
    imageAlt: "Document Tracking",
  },
 
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-title-lg font-bold text-gray-900 mb-4 dark:text-white">
          Core Features Overview
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl dark:text-gray-400">
          Modern car tracking and port clearance solutions designed for professional logistics teams worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              imageSrc={feature.imageSrc}
              imageAlt={feature.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

