"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/button/Button";

export default function CTASection() {
  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Ready to streamline your vehicle logistics?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of global dealerships and logistics firms who trust
            BFZ Track for their automated clearance and tracking needs.
          </p>
          <div className="pt-2">
            <Link href="/admin/auth/signup">
              <Button
                size="md"
                variant="primary"
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

