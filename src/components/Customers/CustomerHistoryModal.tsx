"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

import Badge from "../ui/badge/Badge";
import { customersApi } from "@/lib/api/customer";
import { Loader } from "lucide-react";
import { invoicesApi } from "@/lib/api/invoice";
import ViewInvoiceModal from "../invoices/ViewInvoiceModal";

interface CustomerHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: number | null;
}

export default function CustomerHistoryModal({ isOpen, onClose, customerId }: CustomerHistoryModalProps) {
  const [data, setData] = useState<any>(null);
  const [ledgerRows, setLedgerRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen && customerId) {
      setLoading(true);
      Promise.all([
        customersApi.getCustomerById(customerId),
        invoicesApi.getCustomerLedger(customerId),
      ]).then(([customerRes, ledgerRes]) => {
        setData(customerRes.data || customerRes);
        const ledgerPayload = ledgerRes?.data || ledgerRes;
        setLedgerRows(ledgerPayload?.rows || []);
        setLoading(false);
      });
    }
  }, [isOpen, customerId]);

  useEffect(() => {
    if (!isOpen) {
      setIsInvoiceModalOpen(false);
      setSelectedInvoiceId(null);
    }
  }, [isOpen]);

  const handleOpenInvoice = (invoiceId: number | null | undefined) => {
    const id = Number(invoiceId || 0);
    if (!id) return;
    setSelectedInvoiceId(id);
    setIsInvoiceModalOpen(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[900px]">
      <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl overflow-y-auto max-h-[85vh]">
        {loading ? (
          <div className="flex justify-center py-10"><Loader /></div>
        ) : (
          <>
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{data.name}</h2>
              <p className="text-gray-500">{data.phone} • {data.address || "No Address"}</p>
            </div>

            <h4 className="text-lg font-semibold mb-4 text-brand-500">Order Ledger</h4>
            <div className="space-y-4">
              {data.invoices.map((inv: any) => (
                <div key={inv.id} className="border dark:border-gray-800 rounded-2xl p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-mono text-gray-400">#{inv.invoiceNumber}</span>
                      <p className="text-sm font-medium">{new Date(inv.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Badge color={inv.balance <= 0 ? "success" : "error"}>
                      {inv.balance <= 0 ? "Fully Paid" : `Pending: Rs. ${inv.balance}`}
                    </Badge>
                  </div>

                  {/* Item Mini-List */}
                  <div className="bg-gray-100/50 dark:bg-gray-800/50 rounded-lg p-3 text-xs">
                    {inv.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700 last:border-0">
                        <span>{item.itemName} ({item.width}"x{item.height}")</span>
                        <span className="font-medium">Rs. {item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-4 text-sm">
                    <span className="text-gray-500">Billed by: <b className="text-gray-700 dark:text-gray-300">{inv.admin?.name}</b></span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">Total: Rs. {inv.billValue}</span>
                      <button
                        type="button"
                        onClick={() => handleOpenInvoice(inv.id)}
                        className="text-brand-500 hover:underline font-medium"
                      >
                        Open Invoice
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-semibold mt-8 mb-4 text-brand-500">Payment & Transaction Ledger</h4>
            <div className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="max-h-72 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
                    <tr className="text-xs uppercase text-gray-500 border-b border-gray-100 dark:border-gray-700">
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-left">Type</th>
                      <th className="px-3 py-2 text-left">Ref</th>
                      <th className="px-3 py-2 text-left">Method</th>
                      <th className="px-3 py-2 text-right">Debit</th>
                      <th className="px-3 py-2 text-right">Credit</th>
                      <th className="px-3 py-2 text-right">Running</th>
                      <th className="px-3 py-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledgerRows.map((row: any, idx: number) => (
                      <tr key={`${row.type || "ROW"}-${row.invoiceId || row.paymentId || row.ref || idx}-${idx}`} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="px-3 py-2">{new Date(row.date || row.createdAt).toLocaleDateString()}</td>
                        <td className="px-3 py-2 text-xs">{row.type?.replace("_", " ") || "—"}</td>
                        <td className="px-3 py-2">{row.ref || "—"}</td>
                        <td className="px-3 py-2 text-xs">{row.method || "—"}</td>
                        <td className="px-3 py-2 text-right text-red-600">Rs. {Number(row.debit || 0).toLocaleString()}</td>
                        <td className="px-3 py-2 text-right text-green-600">Rs. {Number(row.credit || 0).toLocaleString()}</td>
                        <td className="px-3 py-2 text-right font-semibold">Rs. {Math.abs(Number(row.runningBalance || 0)).toLocaleString()}</td>
                        <td className="px-3 py-2 text-right">
                          {row.invoiceId ? (
                            <button
                              type="button"
                              onClick={() => handleOpenInvoice(row.invoiceId)}
                              className="text-brand-500 hover:underline text-xs font-medium"
                            >
                              Open Invoice
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        <div className="mt-8 flex justify-end">
          <Button onClick={onClose} variant="outline">Close Ledger</Button>
        </div>
      </div>
      <ViewInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        invoiceId={selectedInvoiceId}
      />
    </Modal>
  );
}
