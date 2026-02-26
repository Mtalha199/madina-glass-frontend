"use client";

import React from "react";
import Image from "next/image";
import AboutHeroContent from "./AboutHeroContent";
import StatusCard from "./StatusCard";

export function AboutHeroSection() {
  return (
    <section className="relative w-full overflow-hidden pt-4 pb-24 sm:pt-6 sm:pb-6 md:pt-8 md:pb-8 lg:pt-5 lg:pb-5">
      {/* Background Banner Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="w-full h-full">
          <Image
            src="/images/banners/hero.png"
            alt="Hero banner"
            className="w-full h-full object-cover object-bottom"
            width={1920}
            height={300}
            draggable={false}
            priority
            sizes="100vw"
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-24">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-4 items-center">
          {/* Left Section - Content */}
          <div className="order-2 lg:order-1">
            <AboutHeroContent />
          </div>

          {/* Right Section - Placeholder for spacing (image is now background) */}
          <div 
            className="order-1 lg:order-2 relative min-h-[80px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[90px] xl:min-h-[100px]"
          >
          </div>
        </div>
      </div>

      {/* Status Overlays - Positioned relative to hero section */}
      <StatusCard
        label="LIVE STATUS"
        status="Vessel In-Transit"
        position="top-right"
        icon={
          <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
        }
      />

      <StatusCard
        label="CUSTOMS CLEARANCE"
        status="Verified & Cleared"
        position="bottom-center"
        icon={
          <svg
            className="w-4 h-4 text-blue-light-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        }
      />
    </section>
  );
}

