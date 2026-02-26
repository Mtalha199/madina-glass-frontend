"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PublicFooter() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6 sm:py-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              draggable={false}
              src="/images/logo/logo.svg"
              alt="BFZ Track Logo"
              width={120}
              height={70}
              className="shrink-0"
              priority
              sizes="40px"
            />
          </div>

          {/* Links and Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center  gap-4 sm:gap-6">
              <Link
                href="/privacy-policy"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Terms and Conditions
              </Link>
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              © 2024 BFZ Track. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

