"use client";

import React from "react";

// Simple stat card component
function StatCard(props: any) {
  return (
    <div className="text-center">
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-500 dark:text-brand-400 mb-2">
        {props.value}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
        {props.label}
      </p>
    </div>
  );
}

export default function StatisticsBanner(props: any) {
  const className = props.className || "";
  const asSection = props.asSection !== false; // default to true

  const content = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
        {props.stats.map((stat: any, index: number) => {
          return (
            <StatCard key={index} value={stat.value} label={stat.label} />
          );
        })}
      </div>
    </div>
  );

  if (asSection) {
    return (
      <section className={`w-full bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24 dark:bg-gray-900 ${className}`}>
        {content}
      </section>
    );
  }

  return <div className={className}>{content}</div>;
}

