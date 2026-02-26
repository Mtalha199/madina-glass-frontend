"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/button/Button";

export default function HeroContent(props: any) {
  // Default values
  let defaultBadge = "BFZ Track";
  if (props.badge) {
    defaultBadge = props.badge;
  }
  
  let defaultDescription = "Streamlining your logistics from dock to driveway with advanced GPS technology and expert customs handling.";
  if (props.description) {
    defaultDescription = props.description;
  }
  
  let defaultPrimaryButton = { text: "Get Started", href: "/" };
  if (props.primaryButton) {
    defaultPrimaryButton = props.primaryButton;
  }
  
  let defaultSecondaryButton = { text: "Learn More", href: "/about" };
  if (props.secondaryButton) {
    defaultSecondaryButton = props.secondaryButton;
  }

  // Title rendering logic
  let titleContent = null;
  if (props.title) {
    titleContent = (
      <>
        {props.title}
        {props.titleHighlight ? (
          <>
            {" "}
            <span className="text-brand-500 dark:text-brand-400">
              {props.titleHighlight}
            </span>
          </>
        ) : null}
      </>
    );
  } else {
    titleContent = (
      <>
        Real-Time Car Tracking &{" "}
        <span className="text-brand-500 dark:text-brand-400">
          {props.titleHighlight || "Hassle-Free"}
        </span>{" "}
        Port Clearance
      </>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-0.5 bg-blue-light-50 rounded-full w-fit dark:bg-blue-light-950">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-light-500" />
        <span className="text-[10px] sm:text-xs font-medium text-blue-light-700 dark:text-blue-light-300">
          {defaultBadge}
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight sm:leading-tight">
        {titleContent}
      </h1>

      {/* Description */}
      <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl leading-relaxed">
        {defaultDescription}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
        <Link href={defaultPrimaryButton.href} className="w-full sm:w-auto">
          <Button size="md" variant="primary" className="w-full sm:w-auto">
            {defaultPrimaryButton.text}
          </Button>
        </Link>
        <Link href={defaultSecondaryButton.href} className="w-full sm:w-auto">
          <Button size="md" variant="outline" className="w-full sm:w-auto">
            {defaultSecondaryButton.text}
          </Button>
        </Link>
      </div>

      {/* Social Proof */}
      <div className="flex flex-col sm:flex-row items-start opacity-0 pointer-events-none sm:items-center gap-2 sm:gap-3 mt-20 sm:mt-6 md:mt-8 relative -top-16 md:top-0">
        <div className="flex -space-x-2 shrink-0">
          {[1, 2, 3].map((i) => {
            return (
              <div
                key={i}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 border-2 border-white dark:bg-gray-700 dark:border-gray-800"
              />
            );
          })}
        </div>
        <p className="text-xs sm:text-sm text-white/90 ">
          Joined by <span className="font-semibold text-white">10,000+</span> fleet managers
          worldwide
        </p>
      </div>
    </div>
  );
}

