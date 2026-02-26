"use client";

import React from "react";
import Image from "next/image";
import { CheckCircleIcon } from "@/icons";

// Simple service card component without memo or animations
function ServiceCard(props: any) {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {/* Image */}
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-50 dark:bg-brand-500/10 mb-4 shrink-0 overflow-hidden">
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

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {props.title}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        {props.description}
      </p>

      {/* Features List */}
      <ul className="space-y-2">
        {props.features.map((feature: any, index: number) => {
          return (
            <li key={index} className="flex items-center gap-2">
              <div>
                <CheckCircleIcon className="w-6 h-6 text-brand-500 dark:text-brand-400 shrink-0" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {feature}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Default services data
const defaultServices = [
  {
    image: "/images/icons/custom/real-time-vehicle-tracking.png",
    title: "Real-Time Vehicle Tracking",
    description:
      "Track your vehicle's journey from Japan to Zambia or Zimbabwe with complete transparency. Monitor every step of the import process, from port arrival to final delivery, through our advanced digital platform.",
    features: [
      "Live tracking from port arrival",
      "Real-time status updates",
      "Complete journey visibility",
      "Digital platform access",
    ],
  },
  {
    image: "/images/icons/custom/port-clearance-services.png",
    title: "Expert Port Clearance",
    description:
      "Our experienced team handles all customs documentation, duty payments, and port clearance procedures for both Zambian imports and Zimbabwe transit routes. We navigate Nakonde and Chirundu border crossings with expertise.",
    features: [
      "Customs documentation",
      "Duty payment processing",
      "Border crossing expertise",
      "Zambia & Zimbabwe routes",
    ],
  },
  {
    image: "/images/icons/custom/customs-documentation.png",
    title: "Official Beforward Partnership",
    description:
      "As an official partner of Beforward, we have direct access to quality Japanese vehicles and streamlined import processes. This partnership ensures competitive pricing and reliable vehicle sourcing.",
    features: [
      "Direct Beforward access",
      "Quality Japanese vehicles",
      "Competitive pricing",
      "Reliable sourcing",
    ],
  },
  {
    image: "/images/icons/custom/international-logistics.png",
    title: "Japan to Africa Logistics",
    description:
      "End-to-end logistics solutions for vehicle imports from Japan to Zambia and Zimbabwe. We handle every step from sourcing to delivery, ensuring a seamless cross-border experience.",
    features: [
      "Japan to Zambia route",
      "Japan to Zimbabwe route",
      "Complete import handling",
      "Seamless delivery",
    ],
  },
  {
    image: "/images/icons/custom/fleet-management.png",
    title: "Vehicle Delivery Services",
    description:
      "Secure and timely vehicle delivery from port to your doorstep. Our skilled logistics team ensures your vehicle arrives safely, on schedule, and without unnecessary hassle.",
    features: [
      "Secure transportation",
      "Timely delivery",
      "Doorstep service",
      "Professional handling",
    ],
  },
  {
    image: "/images/icons/custom/shipment-monitoring.png",
    title: "Import Support & Consulting",
    description:
      "Comprehensive support throughout your vehicle import journey. From initial consultation to final delivery, we provide expert guidance and 24/7 customer support.",
    features: [
      "Import consultation",
      "Expert guidance",
      "24/7 customer support",
      "Complete transparency",
    ],
  },
];

export default function WhatWeOfferSection(props: any) {
  // Use provided services or default
  const services = props.services || defaultServices;

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 sm:space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-brand-500 dark:text-brand-400 mb-2">
              BFZ Track
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              As the official partner of Beforward, we provide comprehensive vehicle import services from Japan to Zambia and Zimbabwe. Each service is built with transparency, security, and efficiency at its core.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service: any, index: number) => {
              return (
                <ServiceCard
                  key={index}
                  image={service.image}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

