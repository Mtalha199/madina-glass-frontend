"use client";

import React from "react";
import Link from "next/link";

export default function FeaturesCTASection() {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 pt-8 pb-12 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Brand CTA Card */}
          <div className="bg-brand-500 dark:bg-brand-600 rounded-xl sm:rounded-2xl p-8 sm:p-12 md:p-16 shadow-lg relative overflow-hidden">
            <div className="relative flex flex-col items-center text-center space-y-6 sm:space-y-8">
              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Ready to streamline your shipment tracking?
              </h2>

              {/* Descriptive Text */}
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                Join over 5,000 logistics managers using BFZ Track to optimize
                their port operations and vehicle management.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2">
                {/* Get Started Now Button */}
                <Link
                  href="/admin/auth/signin"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-brand-600 dark:text-brand-700 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  Get Started Now
                </Link>

                {/* Contact Sales Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white/10 transition-colors w-full sm:w-auto"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

