"use client";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "../ui/skeleton/Skeleton";
import ResourceNotFound from "../common/ResourceNotFound";
import Pagination from "../tables/Pagination";
import { usePagination } from "@/hooks/usePagination";

import Badge from "../ui/badge/Badge"; // Assuming you have a Badge component
import { invoicesApi } from "@/lib/api/invoice";
import ViewInvoiceModal from "./ViewInvoiceModal";
import EditInvoiceModal from "./EditInvoiceModal";
import ConfirmModal from "../common/ConfirmModal";
import { HorizontaLDots } from "@/icons";

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
  const [selectedEditInvoiceId, setSelectedEditInvoiceId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<{ id: number; invoiceNumber: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingDeliveryId, setUpdatingDeliveryId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [actionMenu, setActionMenu] = useState<{ id: number; invoiceNumber: string; top: number; left: number } | null>(null);
  const [printRequest, setPrintRequest] = useState<{ key: number; mode: "CUSTOMER" | "LABOUR" } | null>(null);
  const [downloadRequest, setDownloadRequest] = useState<{ key: number; mode: "CUSTOMER" | "LABOUR" } | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  const handleView = (id: number) => {
    setSelectedInvoiceId(id);
    setIsViewModalOpen(true);
  };

  const handleEdit = (id: number) => {
    setSelectedEditInvoiceId(id);
    setIsEditModalOpen(true);
  };

  const handleDeleteRequest = (id: number, invoiceNumber: string) => {
    setInvoiceToDelete({ id, invoiceNumber });
  };

  const handleDownloadInvoice = (id: number, mode: "CUSTOMER" | "LABOUR") => {
    setSelectedInvoiceId(id);
    setIsViewModalOpen(true);
    setDownloadRequest({ key: Date.now(), mode });
  };

  const handleToggleActionMenu = (event: React.MouseEvent<HTMLButtonElement>, id: number, invoiceNumber: string) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const menuWidth = 220;
    const menuHeight = 220;

    const left = Math.max(8, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8));
    let top = rect.bottom + 6;
    if (top + menuHeight > window.innerHeight - 8) {
      top = Math.max(8, rect.top - menuHeight - 6);
    }

    setActionMenu((prev) => (prev?.id === id ? null : { id, invoiceNumber, top, left }));
  };

  const handleDeleteConfirm = async () => {
    if (!invoiceToDelete) return;
    try {
      setIsDeleting(true);
      await invoicesApi.deleteInvoice(invoiceToDelete.id);
      await fetchInvoices();
      setInvoiceToDelete(null);
    } catch {
      setDeleteError("Failed to delete invoice. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateDeliveryStatus = async (id: number, deliveryStatus: "NOT_DELIVERED" | "DELIVERED") => {
    try {
      setUpdatingDeliveryId(id);
      await invoicesApi.updateInvoice(id, { deliveryStatus });
      await fetchInvoices();
    } catch {
      setDeleteError("Failed to update delivery status. Please try again.");
    } finally {
      setUpdatingDeliveryId(null);
    }
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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest(".invoice-actions-toggle")) return;
      if (actionMenuRef.current && actionMenuRef.current.contains(target)) return;
      setActionMenu(null);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
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
                <th className="px-6 py-4">Delivery</th>
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
                  <td className="px-6 py-4">
                    <Badge color={String(inv.deliveryStatus || "NOT_DELIVERED").toUpperCase() === "DELIVERED" ? "success" : "light"}>
                      {String(inv.deliveryStatus || "NOT_DELIVERED").toUpperCase() === "DELIVERED" ? "Delivered" : "Not Delivered"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <button className="text-brand-400 hover:underline" onClick={() => handleView(inv.id)}>View</button>
                      <div className="relative">
                        <button
                          onClick={(e) => handleToggleActionMenu(e, inv.id, inv.invoiceNumber)}
                          className="invoice-actions-toggle flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                          aria-label="Invoice actions"
                        >
                          <HorizontaLDots className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
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
        printRequest={printRequest}
        onPrintRequestHandled={() => setPrintRequest(null)}
        downloadRequest={downloadRequest}
        onDownloadRequestHandled={() => setDownloadRequest(null)}
      />

      {actionMenu && (
        <div
          ref={actionMenuRef}
          className="fixed z-[120] w-[220px] rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark py-1"
          style={{ top: actionMenu.top, left: actionMenu.left }}
        >
          <button
            type="button"
            onClick={() => {
              handleEdit(actionMenu.id);
              setActionMenu(null);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-gray-200"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => {
              handleDownloadInvoice(actionMenu.id, "CUSTOMER");
              setActionMenu(null);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-brand-500 hover:bg-brand-50 hover:text-brand-600 dark:text-brand-300 dark:hover:bg-brand-500/10"
          >
            Download Customer Invoice
          </button>
          <button
            type="button"
            onClick={() => {
              handleDownloadInvoice(actionMenu.id, "LABOUR");
              setActionMenu(null);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-brand-500 hover:bg-brand-50 hover:text-brand-600 dark:text-brand-300 dark:hover:bg-brand-500/10"
          >
            Download Labour Invoice
          </button>
          <button
            type="button"
            onClick={() => {
              handleUpdateDeliveryStatus(
                actionMenu.id,
                String(
                  invoices.find((inv: any) => inv.id === actionMenu.id)?.deliveryStatus || "NOT_DELIVERED"
                ).toUpperCase() === "DELIVERED"
                  ? "NOT_DELIVERED"
                  : "DELIVERED"
              );
              setActionMenu(null);
            }}
            disabled={updatingDeliveryId === actionMenu.id}
            className="block w-full text-left px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-60 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
          >
            {updatingDeliveryId === actionMenu.id
              ? "Updating Delivery..."
              : String(invoices.find((inv: any) => inv.id === actionMenu.id)?.deliveryStatus || "NOT_DELIVERED").toUpperCase() === "DELIVERED"
                ? "Mark as Not Delivered"
                : "Mark as Delivered"}
          </button>
          <button
            type="button"
            onClick={() => {
              handleDeleteRequest(actionMenu.id, actionMenu.invoiceNumber || "");
              setActionMenu(null);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      )}

      <EditInvoiceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        invoiceId={selectedEditInvoiceId}
        onSuccess={fetchInvoices}
      />

      <ConfirmModal
        isOpen={!!invoiceToDelete}
        onClose={() => {
          if (!isDeleting) setInvoiceToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Invoice"
        message={`Are you sure you want to delete invoice ${invoiceToDelete?.invoiceNumber || ""}? This action cannot be undone.`}
        confirmLabel="Delete Invoice"
        cancelLabel="Keep Invoice"
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
