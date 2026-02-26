"use client";

import React from "react";
import { EyeIcon, CheckCircleIcon, BoltIcon } from "@/icons";
import StatisticsBanner from "./StatisticsBanner";

function CoreFeatureCard(props: any) {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-light-50 dark:bg-blue-light-950 mb-4">
        <div className="text-brand-600 dark:text-brand-400">
          {props.icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {props.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {props.description}
      </p>
    </div>
  );
}

export default function AboutOverviewSection() {
  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-20">
          {/* Statistics Section */}
          <StatisticsBanner
            stats={[
              { value: "10k+", label: "VEHICLES DELIVERED" },
              { value: "99%", label: "CUSTOMER SATISFACTION" },
              { value: "2", label: "COUNTRIES SERVED" },
              { value: "24/7", label: "SUPPORT AVAILABLE" },
            ]}
            asSection={false}
          />

          {/* About BFZ Track Section */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              About BFZ Track Limited
            </h2>
            <div className="space-y-4 text-left">
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">BFZ Track Limited</strong> is a leading vehicle import and logistics company specializing in the delivery of vehicles from Japan to Zambia and Zimbabwe. As the <strong className="text-brand-600 dark:text-brand-400">official partner of Beforward</strong>, one of the world&apos;s largest Japanese used car exporters, we provide end-to-end solutions for vehicle importation, port clearance, and delivery services.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Our partnership with Beforward enables us to offer customers a seamless experience when importing quality Japanese vehicles. We understand the complexities of cross-border vehicle importation and have developed expertise in navigating customs procedures, documentation requirements, and logistics challenges specific to the Zambian and Zimbabwean markets.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Whether you&apos;re importing a vehicle for personal use or commercial purposes, BFZ Track Limited ensures your vehicle journey from Japan to your destination is transparent, efficient, and stress-free. Our digital tracking platform allows you to monitor your vehicle&apos;s progress in real-time, from port arrival to final delivery.
              </p>
            </div>
          </div>

          {/* Our Core Mission Section */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Our Core Mission
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              At BFZ Track Limited, our mission is to make vehicle importation from Japan to Zambia and Zimbabwe as simple and transparent as possible. We believe that every customer deserves complete visibility into their vehicle&apos;s journey, from the moment it leaves Japan until it arrives at their doorstep. Through our partnership with Beforward and our advanced tracking technology,               we eliminate the uncertainty and complexity traditionally associated with international vehicle imports.
            </p>
          </div>

          {/* Core Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <CoreFeatureCard
              icon={<EyeIcon className="w-8 h-8" />}
              title="Real-Time Tracking"
              description="Track your vehicle's journey from Japan to Zambia or Zimbabwe with complete transparency. Monitor every step of the import process, from port arrival to final delivery, through our advanced digital platform."
            />
            <CoreFeatureCard
              icon={<CheckCircleIcon className="w-8 h-8" />}
              title="Official Beforward Partner"
              description="As an official partner of Beforward, we have direct access to quality Japanese vehicles and streamlined import processes. This partnership ensures competitive pricing and reliable vehicle sourcing."
            />
            <CoreFeatureCard
              icon={<BoltIcon className="w-8 h-8" />}
              title="Expert Port Clearance"
              description="Our experienced team handles all customs documentation, duty payments, and port clearance procedures for both Zambian imports and Zimbabwe transit routes. We navigate Nakonde and Chirundu border crossings with expertise."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

