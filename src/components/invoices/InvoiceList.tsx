"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "../ui/skeleton/Skeleton";
import ResourceNotFound from "../common/ResourceNotFound";
import Pagination from "../tables/Pagination";
import { usePagination } from "@/hooks/usePagination";

import Badge from "../ui/badge/Badge"; // Assuming you have a Badge component
import { invoicesApi } from "@/lib/api/invoice";
import ViewInvoiceModal from "./ViewInvoiceModal";

export default function InvoicesList({
  refreshTrigger,
  filterType = "ALL",
}: {
  refreshTrigger: number;
  filterType?: "ALL" | "CUSTOMER" | "WALKIN";
}) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
const [isViewModalOpen, setIsViewModalOpen] = useState(false);

const handleView = (id: number) => {
  setSelectedInvoiceId(id);
  setIsViewModalOpen(true);
};

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await invoicesApi.getInvoices();
      // Handle the global response interceptor format: { success: true, data: [...] }
      setInvoices(data.data || data); 
    } catch (err: any) {
      setError("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  const visibleInvoices = React.useMemo(() => {
    if (filterType === "ALL") return invoices;
    return invoices.filter((inv: any) => inv.customerType === filterType);
  }, [invoices, filterType]);

  const { currentPage, totalPages, paginatedItems, goToPage, totalItems } = 
    usePagination(visibleInvoices, { itemsPerPage: 10 });

  useEffect(() => {
    fetchInvoices();
  }, [refreshTrigger]);

  if (loading) return <Skeleton variant="rectangular" height={400} />;
  if (error) return <ResourceNotFound variant="error" title="Error" message={error} />;
  if (visibleInvoices.length === 0) {
    const message =
      filterType === "CUSTOMER"
        ? "No permanent customer invoices found."
        : filterType === "WALKIN"
        ? "No walk-in invoices found."
        : "Start by creating a new bill.";
    return <ResourceNotFound variant="empty" title="No Invoices" message={message} />;
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900">
              <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4">Inv No</th>
                <th className="px-6 py-4">Customer ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Cutter / Driver</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginatedItems.map((inv: any) => (
                <tr key={inv.id} className="text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{inv.invoiceNumber}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-600">#{inv.customerId || inv.customer?.id || "—"}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{inv.customer?.name}</div>
                    <div className="text-xs text-gray-500">{inv.customer?.phone}</div>
                    <div className="text-xs text-gray-400">{inv.address || inv.customer?.address || "No address"}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(inv.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs">C: {inv.cutterName || "N/A"}</div>
                    <div className="text-xs text-gray-400">D: {inv.driverName || "N/A"}</div>
                  </td>
                  <td className="px-6 py-4 font-bold">Rs. {inv.billValue.toLocaleString()}</td>
                  <td className="px-6 py-4">
                     <Badge color={inv.balance <= 0 ? "success" : "warning"}>
                        {inv.balance <= 0 ? "Paid" : `Pending: Rs. ${inv.balance}`}
                     </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-brand-400 hover:underline" onClick={() => handleView(inv.id)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <ViewInvoiceModal 
  isOpen={isViewModalOpen} 
  onClose={() => setIsViewModalOpen(false)} 
  invoiceId={selectedInvoiceId} 
/>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        totalItems={totalItems}
        itemsPerPage={10}
      />
    </div>
  );
}
