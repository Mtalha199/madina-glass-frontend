"use client";

import React from "react";
import { VehicleIcon, FileIcon, CheckCircleIcon, BoxIcon } from "@/icons";

const steps = [
  {
    id: 1,
    title: "Register Your Vehicle",
    description: "Enter your vehicle reference number and details to start tracking your shipment",
    icon: VehicleIcon,
  },
  {
    id: 2,
    title: "Upload Documents",
    description: "Submit required clearance documents through our secure platform",
    icon: FileIcon,
  },
  {
    id: 3,
    title: "Track Progress",
    description: "Monitor real-time updates as your vehicle moves through each clearance step",
    icon: BoxIcon,
  },
  {
    id: 4,
    title: "Get Delivered",
    description: "Receive notifications when your vehicle is ready for collection",
    icon: CheckCircleIcon,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-title-lg font-bold text-gray-900 mb-4 dark:text-white">
            How It Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
            Simple steps to track and manage your vehicle clearance process
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="relative">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-500 dark:bg-brand-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.id}
                </div>

                {/* Card */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 sm:p-8 h-full border border-gray-200 dark:border-gray-700">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-brand-500/10 dark:bg-brand-400/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-brand-500 dark:text-brand-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

