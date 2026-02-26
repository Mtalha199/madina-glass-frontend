import {
  SearchHeader,
  LiveTrackingCard,
  ShipmentDetails,
  RecentActivity,
} from "@/components/search-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Vehicle & Shipment | BFZ Track",
  description: "Real-time GPS tracking and port clearance status for your vehicles and shipments. Monitor from origin to destination across Zambia and beyond.",
};

export default function SearchPage() {
  return (
    <div className="w-full overflow-x-hidden bg-gray-50 dark:bg-gray-900 min-h-screen">
      <SearchHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <LiveTrackingCard />
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            <ShipmentDetails />
          </div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

