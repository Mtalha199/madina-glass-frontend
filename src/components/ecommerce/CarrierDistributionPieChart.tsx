"use client";
import React, { useMemo } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { COLORS } from "@/shared/constants/colors";
import type { DistributionItem } from "@/lib/api/dashboard";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface CarrierDistributionPieChartProps {
  customerTypeDistribution: DistributionItem[];
  routeDistribution: DistributionItem[];
}

const CarrierDistributionPieChart = React.memo(({ 
  customerTypeDistribution,
  routeDistribution 
}: CarrierDistributionPieChartProps) => {
  const options: ApexOptions = useMemo(() => ({
    colors: [COLORS.PRIMARY, COLORS.BRAND[300], COLORS.BRAND[200], "#8B5CF6", "#06B6D4"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "pie",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    labels: customerTypeDistribution.map((item) => item.type || ""),
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "Outfit",
      fontSize: "14px",
      fontWeight: 500,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        fontWeight: 600,
        colors: ["#fff"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `${val} shipments`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "0%",
        },
        expandOnClick: true,
      },
    },
  }), []);

  const series = useMemo(() => customerTypeDistribution.map((item) => item.count), [customerTypeDistribution]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/3 sm:px-6 sm:pt-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Customer Type Distribution
        </h3>
        <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
          Shipments by customer type
        </p>
      </div>

      <div className="max-w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          height={350}
        />
      </div>
    </div>
  );
});

CarrierDistributionPieChart.displayName = "CarrierDistributionPieChart";

export default CarrierDistributionPieChart;

