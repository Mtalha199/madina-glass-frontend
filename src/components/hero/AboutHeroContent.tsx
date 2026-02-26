"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import { fadeInUp, staggerContainer } from "@/components/common/animations";

export default function AboutHeroContent() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 sm:gap-5 md:gap-6"
    >
      {/* Badge */}
      <motion.div
        variants={fadeInUp}
        className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-blue-light-50 rounded-full w-fit dark:bg-blue-light-950"
      >
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-light-500" />
        <span className="text-[10px] sm:text-xs font-medium text-blue-light-700 dark:text-blue-light-300">
          INTEGRITY IN MOTION
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={fadeInUp}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight sm:leading-tight"
      >
        Advanced Car Tracking & {" "}
        <span className="text-brand-600 dark:text-brand-400">
          Port Clearance
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={fadeInUp}
        className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl leading-relaxed"
      >
        Bridging global trade with integrity through automated port clearance
        and military-grade vehicle tracking solutions. We eliminate the friction
        of international logistics.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col gap-3 sm:flex-row sm:gap-3"
      >
        <Link href="/about" className="w-full sm:w-auto">
          <Button size="md" variant="primary" className="w-full sm:w-auto">
            View Our Services
          </Button>
        </Link>
        <Link href="/contact" className="w-full sm:w-auto">
          <Button size="md" variant="outline" className="w-full sm:w-auto">
            Contact Sales
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

