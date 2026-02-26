"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import StatusCard from "./StatusCard";
import { scaleIn } from "@/components/common/animations";

export default function HeroImage() {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.3, duration: 0.6 }}
      className="relative w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] xl:min-h-[450px]"
    >
      {/* Hero Image */}
      <div className="w-full h-full rounded-lg overflow-hidden">
        <Image
          src="/images/banners/hero.png"
          alt="Hero banner"
          className="w-full h-full object-cover"
          width={1200}
          height={600}
          draggable={false}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
        />
      </div>

      {/* Status Overlays */}
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
        position="bottom-left"
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
    </motion.div>
  );
}

