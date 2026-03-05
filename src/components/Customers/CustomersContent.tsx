"use client";
import React, { useEffect, useMemo, useState } from "react";
import Skeleton from "../ui/skeleton/Skeleton";
import ResourceNotFound from "../common/ResourceNotFound";

import Badge from "../ui/badge/Badge";
import { customersApi } from "@/lib/api/customer";
import CustomerHistoryModal from "./CustomerHistoryModal";

export default function CustomersContent({ filterType = "ALL" }: { filterType?: "ALL" | "PERMANENT" | "WALKIN" }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  
  const handleViewHistory = (id: number) => {
    setSelectedCustomerId(id);
    setIsHistoryOpen(true);
  };
  useEffect(() => {
    customersApi.getCustomers().then((res) => {
      // Logic to sum up balances per customer
      const data = (res.data || res).map((c: any) => ({
        ...c,
        totalInvoices: c._count.invoices,
        totalBalance: c.invoices.reduce((acc: number, inv: any) => acc + inv.balance, 0),
        permanentInvoices: c.invoices.filter((inv: any) => inv.customerType === "CUSTOMER").length,
        walkinInvoices: c.invoices.filter((inv: any) => inv.customerType === "WALKIN").length,
      }));
      setCustomers(data);
      setLoading(false);
    });
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
                <button className="text-brand-500 hover:underline font-medium" onClick={() => handleViewHistory(customer.id)}>View History</button>
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
    </div>
  );
}
