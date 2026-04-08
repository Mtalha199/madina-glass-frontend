"use client";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "../ui/skeleton/Skeleton";
import ResourceNotFound from "../common/ResourceNotFound";
import Pagination from "../tables/Pagination";
import { usePagination } from "@/hooks/usePagination";
import Badge from "../ui/badge/Badge";
import { estimatesApi } from "@/lib/api/estimate";
import ViewEstimateModal from "./ViewEstimateModal";
import ConfirmModal from "../common/ConfirmModal";
import ConvertEstimateModal from "./ConvertEstimateModal";
import EditEstimateModal from "./EditEstimateModal";

export default function EstimatesList({ refreshTrigger }: { refreshTrigger: number }) {
  const [estimates, setEstimates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedEstimateId, setSelectedEstimateId] = useState<number | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [estimateToDelete, setEstimateToDelete] = useState<{ id: number; estimateNumber: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [printRequest, setPrintRequest] = useState<{ key: number } | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  const fetchEstimates = async () => {
    try {
      setLoading(true);
      const data = await estimatesApi.getEstimates();
      setEstimates(data.data || data);
    } catch {
      setError("Failed to load estimates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstimates();
  }, [refreshTrigger]);

  const { currentPage, totalPages, paginatedItems, goToPage, totalItems } =
    usePagination(estimates, { itemsPerPage: 10 });

  const handleView = (id: number) => {
    setSelectedEstimateId(id);
    setIsViewModalOpen(true);
  };

  const handlePrint = (id: number) => {
    setSelectedEstimateId(id);
    setIsViewModalOpen(true);
    setPrintRequest({ key: Date.now() });
  };

  const handleConvert = (id: number) => {
    setSelectedEstimateId(id);
    setIsConvertOpen(true);
  };

  const handleEdit = (id: number) => {
    setSelectedEstimateId(id);
    setIsEditOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!estimateToDelete) return;
    try {
      setIsDeleting(true);
      await estimatesApi.deleteEstimate(estimateToDelete.id);
      await fetchEstimates();
      setEstimateToDelete(null);
    } catch {
      setDeleteError("Failed to delete estimate. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <Skeleton variant="rectangular" height={400} />;
  if (error) return <ResourceNotFound variant="error" title="Error" message={error} />;
  if (estimates.length === 0) {
    return <ResourceNotFound variant="empty" title="No Estimates" message="Start by creating a new estimate." />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900">
              <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4">Estimate No</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginatedItems.map((est: any) => (
                <tr key={est.id} className="text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{est.estimateNumber}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{est.name}</div>
                    <div className="text-xs text-gray-500">{est.phone}</div>
                    <div className="text-xs text-gray-400">{est.address || "No address"}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{new Date(est.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-bold">Rs. {Number(est.billValue || 0).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <Badge color={est.status === "CONVERTED" ? "success" : "warning"}>
                      {est.status === "CONVERTED" ? "Converted" : "Open"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <button className="text-brand-400 hover:underline" onClick={() => handleView(est.id)}>View</button>
                      <button className="text-brand-400 hover:underline" onClick={() => handlePrint(est.id)}>Print</button>
                      {est.status !== "CONVERTED" && (
                        <button className="text-blue-600 hover:underline" onClick={() => handleEdit(est.id)}>Edit</button>
                      )}
                      {est.status !== "CONVERTED" && (
                        <button className="text-green-600 hover:underline" onClick={() => handleConvert(est.id)}>Convert</button>
                      )}
                      <button className="text-red-600 hover:underline" onClick={() => setEstimateToDelete({ id: est.id, estimateNumber: est.estimateNumber })}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={goToPage}
      />

      <ViewEstimateModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        estimateId={selectedEstimateId}
        printRequest={printRequest}
        onPrintRequestHandled={() => setPrintRequest(null)}
      />

      <ConvertEstimateModal
        isOpen={isConvertOpen}
        onClose={() => setIsConvertOpen(false)}
        estimateId={selectedEstimateId}
        onSuccess={fetchEstimates}
      />

      <EditEstimateModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        estimateId={selectedEstimateId}
        onSuccess={fetchEstimates}
      />

      <ConfirmModal
        isOpen={!!estimateToDelete}
        onClose={() => {
          if (!isDeleting) setEstimateToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Estimate"
        message={`Are you sure you want to delete estimate ${estimateToDelete?.estimateNumber || ""}? This action cannot be undone.`}
        confirmLabel="Delete Estimate"
        cancelLabel="Keep Estimate"
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
