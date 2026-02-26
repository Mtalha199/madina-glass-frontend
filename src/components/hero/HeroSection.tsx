"use client";

import React from "react";
import Image from "next/image";
import HeroContent from "./HeroContent";
import StatusCard from "./StatusCard";

export default function HeroSection(props: any) {
  // Default background image
  let backgroundImage = "/images/banners/hero.png";
  if (props.backgroundImage) {
    backgroundImage = props.backgroundImage;
  }
  
  let showDefaultContent = false;
  if (props.showDefaultContent) {
    showDefaultContent = props.showDefaultContent;
  }

  return (
    <section className="relative w-full overflow-hidden pt-4 pb-12 sm:pt-6 sm:pb-6 md:pt-8 md:pb-8 lg:pt-5 lg:pb-5">
      {/* Background Banner Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="w-full h-full">
          <Image
            src={backgroundImage}
            alt="Hero banner"
            className="w-full h-full object-cover object-bottom"
            width={1920}
            height={300}
            draggable={false}
            priority
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-24">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-4 items-center">
          {/* Left Section - Content */}
          <div className="order-2 lg:order-1">
            {showDefaultContent ? (
              <HeroContent />
            ) : (
              <HeroContent
                title={props.title}
                titleHighlight={props.titleHighlight}
                description={props.description}
                badge={props.badge}
                primaryButton={props.primaryButton}
                secondaryButton={props.secondaryButton}
              />
            )}
          </div>

          {/* Right Section - Placeholder for spacing */}
          <div className="order-1 lg:order-2 relative min-h-[80px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[90px] xl:min-h-[100px]">
          </div>
        </div>
      </div>

      {/* Status Overlays */}
      {props.statusCards && props.statusCards.length > 0 ? (
        props.statusCards.map((card: any, index: number) => {
          return (
            <StatusCard
              key={index}
              label={card.label}
              status={card.status}
              position={card.position}
              icon={card.icon}
            />
          );
        })
      ) : showDefaultContent ? (
        <>
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
            position="bottom-center"
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
        </>
      ) : null}
    </section>
  );
}

