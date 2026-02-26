"use client";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React, { useEffect, useState } from "react";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import ShipmentStatusPieChart from "@/components/ecommerce/ShipmentStatusPieChart";
import CarrierDistributionPieChart from "@/components/ecommerce/CarrierDistributionPieChart";
import WeeklyShipmentBarChart from "@/components/ecommerce/WeeklyShipmentBarChart";
import { dashboardApi, type DashboardData } from "@/lib/api/dashboard";
import { MetricsSkeleton, ChartSkeleton, TableSkeleton } from "@/components/ecommerce/DashboardSkeleton";
import PermissionWrapper from "@/components/permissions/PermissionWrapper";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const dashboardData = await dashboardApi.getCompleteDashboard();
        setData(dashboardData);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <MetricsSkeleton />
        </div>
        <div className="col-span-12">
          <ChartSkeleton />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <ChartSkeleton />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <ChartSkeleton />
        </div>
        <div className="col-span-12">
          <ChartSkeleton />
        </div>
        <div className="col-span-12">
          <TableSkeleton />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/3">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {error || "Unable to load dashboard data. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <EcommerceMetrics stats={data.stats} />
      </div>

      <div className="col-span-12">
        <PermissionWrapper permissions={['dashboard.shipmentStatisticsGraph']}>
          <StatisticsChart shipmentsOverTime={data.charts.shipmentsOverTime} />
        </PermissionWrapper>
      </div>

      <div className="col-span-12 xl:col-span-6">
        <PermissionWrapper permissions={['dashboard.statusDistributionGraph']}>
          <ShipmentStatusPieChart statusDistribution={data.charts.statusDistribution} />
        </PermissionWrapper>
      </div>

      <div className="col-span-12 xl:col-span-6">
        <PermissionWrapper permissions={['dashboard.typeDistributionGraph']}>
          <CarrierDistributionPieChart 
          customerTypeDistribution={data.charts.customerTypeDistribution}
            routeDistribution={data.charts.routeDistribution}
          />
        </PermissionWrapper>
      </div>

      <div className="col-span-12">
        <PermissionWrapper permissions={['dashboard.performanceOverTimeGraph']}>
          <WeeklyShipmentBarChart shipmentsOverTime={data.charts.shipmentsOverTime} />
        </PermissionWrapper>
      </div>

      <div className="col-span-12">
        <PermissionWrapper permissions={['dashboard.recentActivity']}>
          <RecentOrders recentActivity={data.recentActivity} />
        </PermissionWrapper>
      </div>
    </div>
  );
}
