"use client";

import React from "react";
import Image from "next/image";

export default function ServicePromotionSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-20">
          {/* Top Section */}
          <div className="space-y-6">
            {/* Title and Subtitle */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                BFZ Track
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400">
                Driving Reliability in Port Clearance & Vehicle Delivery.
              </p>
            </div>

            {/* Top Section Content - Text Left, Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              {/* Left Text Block */}
              <div className="relative p-6 sm:p-8">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  We provide <span className="text-brand-500 dark:text-brand-400 font-medium">end-to-end car tracking, port clearance, and secure vehicle delivery services</span> designed for transparency and efficiency. From port arrival, our real-time tracking system keeps you informed at every stage, ensuring complete visibility and control over your vehicle&apos;s journey.
                  <br /><br />
                  Our experienced team manages <span className="text-brand-500 dark:text-brand-400 font-medium">customs clearance, documentation, and regulatory compliance, followed by safe and timely delivery to your location.</span>
                  <br /><br />
                  With expert handling, reliable logistics, and customer-focused service, we ensure your vehicle moves smoothly from port to doorstep with complete peace of mind.
                </p>
              </div>

              {/* Right Image */}
              <div className="relative rounded-xl overflow-hidden border-2 border-brand-500/40" style={{ boxShadow: "0 0 25px rgba(233, 114, 36, 0.2), 0 0 50px rgba(233, 114, 36, 0.15), 0 0 75px rgba(233, 114, 36, 0.1)" }}>
                <div className="aspect-4/5 relative w-full max-h-[400px]">
                  <Image
                    src="/images/services/person1.png"
                    alt="Professional team member in car showroom"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Left Image */}
            <div className="relative rounded-xl overflow-hidden border-2 border-brand-500/40" style={{ boxShadow: "0 0 25px rgba(233, 114, 36, 0.2), 0 0 50px rgba(233, 114, 36, 0.15), 0 0 75px rgba(233, 114, 36, 0.1)" }}>
              <div className="aspect-4/5 relative w-full max-h-[400px]">
                <Image
                  src="/images/services/person2.png"
                  alt="Car key handover at dealership"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Text Block */}
            <div className="relative p-6 sm:p-8">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Your vehicle deserves <span className="text-brand-500 dark:text-brand-400 font-medium">professional care from port arrival to final delivery.</span> We specialize in secure car transportation, real-time vehicle tracking, and seamless port clearance services to ensure a smooth and transparent process, keeping you informed at every stage.
                <br /><br />
                Our skilled logistics team oversees all customs procedures, regulatory requirements, and secure doorstep delivery with precision. <span className="text-brand-500 dark:text-brand-400 font-medium">From port handling to final drop-off, we ensure your vehicle arrives safely, on schedule, and without unnecessary hassle.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

