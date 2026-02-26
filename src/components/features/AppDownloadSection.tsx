"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AppDownloadSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 sm:space-y-10">
          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Download Our Mobile App
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Track your vehicle shipments on the go. Get real-time updates, notifications, and complete visibility into your import journey right from your mobile device.
            </p>
          </div>

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/custom/play-store.svg"
                alt="Get it on Google Play"
                width={200}
                height={100}
              />
            </Link>
            <Link
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/custom/app-store.svg"
                alt="Download on the App Store"
                width={200}
                height={100}
              />
            </Link>
          </div>

          {/* Additional Info */}
          <div className="pt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>Available for iOS and Android devices</p>
          </div>
        </div>
      </div>
    </section>
  );
}

