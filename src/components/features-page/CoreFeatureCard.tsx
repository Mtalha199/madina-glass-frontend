"use client";

import React, { memo } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { fadeInUp } from "@/components/common/animations";

interface CoreFeatureCardProps {
  icon: React.ReactNode;
  illustration: React.ReactNode;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  delay?: number;
}

const CoreFeatureCard = memo(function CoreFeatureCard({
  icon,
  illustration,
  title,
  description,
  ctaText,
  ctaHref,
  delay = 0,
}: CoreFeatureCardProps) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const hoverVariants: Variants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -4,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      animate="rest"
      className="flex flex-col bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-shadow duration-300 will-change-transform"
    >
      <motion.div variants={hoverVariants}>
        {/* Icon */}
        <div className="mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-light-50 dark:bg-blue-light-950 flex items-center justify-center">
            {icon}
          </div>
        </div>

        {/* Illustration */}
        <motion.div
          className="mb-6 w-full aspect-4/3 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700/50"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {illustration}
        </motion.div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 dark:text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base text-gray-600 mb-6 grow dark:text-gray-400">
          {description}
        </p>

        {/* CTA Link */}
        <motion.div
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors w-fit"
          >
            {ctaText}
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </motion.svg>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

CoreFeatureCard.displayName = "CoreFeatureCard";

export default CoreFeatureCard;

