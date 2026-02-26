"use client";

import React from "react";
import Image from "next/image";

// Simple feature block component
function FeatureBlock(props: any) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg">
      {/* Image */}
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-50 dark:bg-brand-500/10 shrink-0 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={props.image}
            alt={props.title}
            width={56}
            height={56}
            className="object-contain p-2"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
          {props.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          {props.description}
        </p>
      </div>
    </div>
  );
}

// Simple status metric component
function StatusMetric(props: any) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <span className="text-sm text-gray-600 dark:text-gray-400">{props.label}</span>
      <span className={`text-base font-semibold ${
        props.isHighlighted
          ? "text-brand-500 dark:text-brand-400"
          : "text-gray-900 dark:text-white"
      }`}>
        {props.value}
      </span>
    </div>
  );
}

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Why Choose Section */}
          <div className="space-y-8 h-full">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Why Choose BFZ Track?
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              At BFZ Track Limited, our mission is to make vehicle importation from Japan to Zambia and Zimbabwe as simple and transparent as possible. We believe that every customer deserves complete visibility into their vehicle&apos;s journey, from the moment it leaves Japan until it arrives at their doorstep.
            </p>

            {/* Feature Blocks */}
            <div className="space-y-6">
              <FeatureBlock
                image="/images/icons/custom/247-monitoring.png"
                title="Real-Time Tracking"
                description="Track your vehicle's journey from Japan to Zambia or Zimbabwe with complete transparency. Monitor every step of the import process, from port arrival to final delivery."
              />
              <FeatureBlock
                image="/images/icons/custom/enterprise-security.png"
                title="Official Beforward Partner"
                description="As an official partner of Beforward, we have direct access to quality Japanese vehicles and streamlined import processes, ensuring competitive pricing and reliable sourcing."
              />
              <FeatureBlock
                image="/images/icons/custom/global-network.png"
                title="Expert Port Clearance"
                description="Our experienced team handles all customs documentation, duty payments, and port clearance procedures for both Zambian imports and Zimbabwe transit routes."
              />
            </div>
          </div>

          {/* Right Column - LIVE STATUS Card */}
          <div className="flex">
            <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700 shadow-sm w-full h-full flex flex-col">
              {/* LIVE STATUS Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                <span className="text-sm font-semibold text-success-600 dark:text-success-400">
                  LIVE STATUS
                </span>
              </div>

              {/* Metrics */}
              <div className="space-y-0 flex-1">
                <StatusMetric label="Active Vehicles" value="1,247" />
                <StatusMetric label="Pending Clearances" value="89" />
                <StatusMetric label="Shipments In-Transit" value="432" />
                <StatusMetric
                  label="Avg Response Time"
                  value="2.3 min"
                  isHighlighted={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

