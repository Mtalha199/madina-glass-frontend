"use client";
import React, { useEffect, useMemo, useState } from "react";
import Skeleton from "../ui/skeleton/Skeleton";
import ResourceNotFound from "../common/ResourceNotFound";
import { customersApi } from "@/lib/api/customer";
import CustomerHistoryModal from "./CustomerHistoryModal";
import ConfirmModal from "../common/ConfirmModal";

export default function CustomersContent({ filterType = "ALL" }: { filterType?: "ALL" | "PERMANENT" | "WALKIN" }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  
  const handleViewHistory = (id: number) => {
    setSelectedCustomerId(id);
    setIsHistoryOpen(true);
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await customersApi.getCustomers();
      const data = (res.data || res).map((c: any) => ({
        ...c,
        totalInvoices: c._count.invoices,
        totalBalance:
          c.totalBalance !== undefined && c.totalBalance !== null
            ? Number(c.totalBalance)
            : c.invoices.reduce((acc: number, inv: any) => acc + Number(inv.balance || 0), 0),
        permanentInvoices: c.invoices.filter((inv: any) => inv.customerType === "CUSTOMER").length,
        walkinInvoices: c.invoices.filter((inv: any) => inv.customerType === "WALKIN").length,
      }));
      setCustomers(data);
    } catch {
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = (customer: any) => {
    setCustomerToDelete(customer);
  };

  const handleDeleteConfirm = async () => {
    if (!customerToDelete || Number(customerToDelete.totalInvoices || 0) > 0) return;
    try {
      setIsDeleting(true);
      await customersApi.deleteCustomer(customerToDelete.id);
      await fetchCustomers();
      setCustomerToDelete(null);
    } catch (err: any) {
      setDeleteError(err?.response?.data?.message || "Failed to delete customer. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    if (filterType === "PERMANENT") {
      return customers.filter((c: any) => Number(c.permanentInvoices || 0) > 0);
    }
    if (filterType === "WALKIN") {
      return customers.filter((c: any) => Number(c.permanentInvoices || 0) === 0);
    }
    return customers;
  }, [customers, filterType]);

  if (loading) return <Skeleton variant="rectangular" height={400} />;
  if (error) return <ResourceNotFound variant="error" title="Error" message={error} />;
  if (filteredCustomers.length === 0) {
    const message =
      filterType === "PERMANENT"
        ? "No permanent customers found."
        : filterType === "WALKIN"
          ? "No walk-in customers found."
          : "No customers found.";
    return <ResourceNotFound variant="empty" title="No Customers" message={message} />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <tr className="text-xs font-semibold uppercase text-gray-500">
            <th className="px-6 py-4">Customer Name</th>
            <th className="px-6 py-4">Phone</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Total Orders</th>
            <th className="px-6 py-4">Total Balance</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {filteredCustomers.map((customer: any) => (
            <tr key={customer.id} className="text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition">
              <td className="px-6 py-4 font-medium">{customer.name}</td>
              <td className="px-6 py-4 text-gray-500">{customer.phone}</td>
              <td className="px-6 py-4">
                {customer.permanentInvoices > 0 ? (
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">
                    Permanent
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-700">
                    Walk-In
                  </span>
                )}
              </td>
              <td className="px-6 py-4">{customer.totalInvoices} Bills</td>
              <td className="px-6 py-4">
                <span className={customer.totalBalance > 0 ? "text-red-600 font-bold" : "text-green-600"}>
                  Rs. {customer.totalBalance.toLocaleString()}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3">
                  <button className="text-red-600 hover:underline font-medium" onClick={() => handleDeleteRequest(customer)}>
                    Delete
                  </button>
                  <button className="text-brand-500 hover:underline font-medium" onClick={() => handleViewHistory(customer.id)}>
                    View History
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomerHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        customerId={selectedCustomerId}
      />
      <ConfirmModal
        isOpen={!!customerToDelete}
        onClose={() => {
          if (!isDeleting) setCustomerToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title={Number(customerToDelete?.totalInvoices || 0) > 0 ? "Cannot Delete Customer" : "Delete Customer"}
        message={`Are you sure you want to delete customer ${customerToDelete?.name || ""}? This action cannot be undone.`}
        blockedMessage={
          Number(customerToDelete?.totalInvoices || 0) > 0
            ? `This customer has ${customerToDelete?.totalInvoices} invoice(s). Remove related invoices first, then delete the customer.`
            : undefined
        }
        confirmLabel="Delete Customer"
        cancelLabel="Keep Customer"
        variant="danger"
        isLoading={isDeleting}
      />
      <ConfirmModal
        isOpen={!!deleteError}
        onClose={() => setDeleteError(null)}
        title="Delete Failed"
        message={deleteError || ""}
        blockedMessage={deleteError || ""}
      />
    </div>
  );
}
