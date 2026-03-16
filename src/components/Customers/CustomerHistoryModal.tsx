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
  onPaymentSaved?: () => void;
}

export default function CustomerHistoryModal({ isOpen, onClose, customerId, onPaymentSaved }: CustomerHistoryModalProps) {
  const [data, setData] = useState<any>(null);
  const [ledgerRows, setLedgerRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPayment, setSavingPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    method: "CASH",
    invoiceId: "__OVERALL__",
    reference: "",
    notes: "",
  });
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [showPrintOptions, setShowPrintOptions] = useState(false);

  const loadCustomerHistory = async () => {
    if (!customerId) return;
    setLoading(true);
    try {
      const [customerRes, ledgerRes] = await Promise.all([
        customersApi.getCustomerById(customerId),
        invoicesApi.getCustomerLedger(customerId),
      ]);
      setData(customerRes.data || customerRes);
      const ledgerPayload = ledgerRes?.data || ledgerRes;
      setLedgerRows(ledgerPayload?.rows || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && customerId) {
      loadCustomerHistory();
    }
  }, [isOpen, customerId]);

  useEffect(() => {
    if (!isOpen) {
      setIsInvoiceModalOpen(false);
      setSelectedInvoiceId(null);
      setShowPrintOptions(false);
    }
  }, [isOpen]);

  const handleOpenInvoice = (invoiceId: number | null | undefined) => {
    const id = Number(invoiceId || 0);
    if (!id) return;
    setSelectedInvoiceId(id);
    setIsInvoiceModalOpen(true);
  };

  const handleAddCustomerPayment = async () => {
    if (!customerId) return;
    const amount = Number(paymentForm.amount || 0);
    if (amount <= 0) return;

    const selectedInvoiceId =
      paymentForm.invoiceId === "__OVERALL__"
        ? undefined
        : Number(paymentForm.invoiceId) || undefined;

    try {
      setSavingPayment(true);
      await invoicesApi.addCustomerPayment(customerId, {
        amount,
        method: paymentForm.method as "CASH" | "CHEQUE" | "BANK" | "OTHER",
        invoiceId: selectedInvoiceId,
        reference: paymentForm.reference || undefined,
        notes: paymentForm.notes || undefined,
      });

      setPaymentForm({
        amount: "",
        method: "CASH",
        invoiceId: "__OVERALL__",
        reference: "",
        notes: "",
      });

      await loadCustomerHistory();
      onPaymentSaved?.();
    } finally {
      setSavingPayment(false);
    }
  };

  const handlePrint = (mode: "LEDGER" | "INVOICES" | "ALL") => {
    const ledgerNode = document.getElementById("customer-history-ledger");
    const invoicesNode = document.getElementById("customer-history-invoices");
    if (!ledgerNode || !invoicesNode) return;

    const cleanupPrintDom = () => {
      document.body.classList.remove("printing-customer-history");
      const node = document.getElementById("customer-history-print-root");
      if (node) node.remove();
    };

    const headerHtml = `
      <div class="print-header">
        <div class="print-brand">
          <div>
            <div class="print-title">Madina Glass</div>
            <div class="print-subtitle">Aluminium & Glass Works Specialist</div>
          </div>
        </div>
        <div class="print-customer">
          <div class="print-customer-name">${data?.name || "Customer"}</div>
          <div class="print-customer-meta">
            ${data?.phone || ""}${data?.address ? ` • ${data.address}` : ""}
          </div>
        </div>
      </div>
    `;

    const sections: string[] = [];
    if (mode === "LEDGER" || mode === "ALL") {
      sections.push(`
        <div style="margin-top:16px;">
          <h3 style="margin:0 0 8px;font-size:14px;font-weight:700;">Transaction Ledger</h3>
          ${ledgerNode.outerHTML}
        </div>
      `);
    }
    if (mode === "INVOICES" || mode === "ALL") {
      sections.push(`
        <div style="margin-top:16px;">
          ${invoicesNode.outerHTML}
        </div>
      `);
    }

    const printRoot = document.createElement("div");
    printRoot.id = "customer-history-print-root";
    printRoot.style.display = "none";
    printRoot.innerHTML = `
      <div id="customer-history-printable">
        <div class="print-sheet">
          ${headerHtml}
          ${sections.join("")}
        </div>
      </div>
    `;

    const existingNode = document.getElementById("customer-history-print-root");
    if (existingNode) existingNode.remove();
    document.body.appendChild(printRoot);
    document.body.classList.add("printing-customer-history");
    window.addEventListener("afterprint", cleanupPrintDom, { once: true });
    window.print();
    setTimeout(cleanupPrintDom, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[900px]">
      <style>{`
        @media print {
          @page { size: auto; margin: 8mm; }
          html, body { overflow: visible !important; background: #fff !important; }
          body.printing-customer-history > * { display: none !important; }
          body.printing-customer-history #customer-history-print-root { display: block !important; }
          #customer-history-printable { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #111827; }
          #customer-history-printable .print-sheet { border: 1px solid #e5e7eb; border-radius: 16px; padding: 18px; }
          #customer-history-printable .print-header { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px; margin-bottom: 12px; }
          #customer-history-printable .print-brand { display: flex; align-items: center; gap: 10px; }
          #customer-history-printable .print-title { font-size: 20px; font-weight: 800; letter-spacing: .02em; text-transform: uppercase; color: #0f172a; }
          #customer-history-printable .print-subtitle { font-size: 11px; color: #6b7280; margin-top: 2px; }
          #customer-history-printable .print-customer { text-align: right; }
          #customer-history-printable .print-customer-name { font-size: 16px; font-weight: 700; }
          #customer-history-printable .print-customer-meta { font-size: 11px; color: #6b7280; margin-top: 2px; }
          #customer-history-printable table { width: 100%; border-collapse: collapse; font-size: 12px; }
          #customer-history-printable th, #customer-history-printable td { border: 1px solid #e5e7eb; padding: 6px; }
          #customer-history-printable th { background: #f9fafb; text-transform: uppercase; font-size: 11px; letter-spacing: .03em; color: #6b7280; }
          .print-hide { display: none !important; }
        }
      `}</style>
      <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl overflow-y-auto max-h-[85vh]">
        {loading ? (
          <div className="flex justify-center py-10"><Loader /></div>
        ) : (
          <>
            <div className="mb-6 border-b pb-4 flex items-start justify-between gap-3 pr-12 sm:pr-16">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{data.name}</h2>
                <p className="text-gray-500">{data.phone} • {data.address || "No Address"}</p>
              </div>
              <div className="relative print-hide">
                <Button variant="outline" onClick={() => setShowPrintOptions((v) => !v)}>Print</Button>
                {showPrintOptions && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-2 z-20">
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-white/5"
                      onClick={() => {
                        setShowPrintOptions(false);
                        handlePrint("LEDGER");
                      }}
                    >
                      Print Ledger Only
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-white/5"
                      onClick={() => {
                        setShowPrintOptions(false);
                        handlePrint("INVOICES");
                      }}
                    >
                      Print Invoices Only
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-white/5"
                      onClick={() => {
                        setShowPrintOptions(false);
                        handlePrint("ALL");
                      }}
                    >
                      Print Ledger + Invoices
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div id="customer-history-invoices">
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
                          className="text-brand-500 hover:underline font-medium print-hide"
                        >
                          Open Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h4 className="text-lg font-semibold mt-8 mb-4 text-brand-500">Payment & Transaction Ledger</h4>
            <div className="space-y-3 p-3 mb-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                <input
                  type="number"
                  placeholder="Amount"
                  className="border rounded px-2 py-2 text-sm"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm((p) => ({ ...p, amount: e.target.value }))}
                />
                <select
                  className="border rounded px-2 py-2 text-sm bg-transparent"
                  value={paymentForm.method}
                  onChange={(e) => setPaymentForm((p) => ({ ...p, method: e.target.value }))}
                >
                  <option value="CASH">Cash</option>
                  <option value="CHEQUE">Cheque</option>
                  <option value="BANK">Bank</option>
                  <option value="OTHER">Other</option>
                </select>
                <select
                  className="border rounded px-2 py-2 text-sm bg-transparent"
                  value={paymentForm.invoiceId}
                  onChange={(e) => setPaymentForm((p) => ({ ...p, invoiceId: e.target.value }))}
                >
                  <option value="__OVERALL__">Overall Customer Payment</option>
                  {data?.invoices?.map((inv: any) => (
                    <option key={inv.id} value={String(inv.id)}>
                      Against: {inv.invoiceNumber}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Reference"
                  className="border rounded px-2 py-2 text-sm"
                  value={paymentForm.reference}
                  onChange={(e) => setPaymentForm((p) => ({ ...p, reference: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={handleAddCustomerPayment}
                  disabled={savingPayment}
                  className="rounded bg-brand-500 text-white px-3 py-2 text-sm font-medium disabled:opacity-60"
                >
                  {savingPayment ? "Saving..." : "Add Payment"}
                </button>
              </div>
              <input
                type="text"
                placeholder="Notes (optional)"
                className="w-full border rounded px-2 py-2 text-sm"
                value={paymentForm.notes}
                onChange={(e) => setPaymentForm((p) => ({ ...p, notes: e.target.value }))}
              />
            </div>
            <div id="customer-history-ledger" className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
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
                      <th className="px-3 py-2 text-right print-hide">Action</th>
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
                        <td className="px-3 py-2 text-right print-hide">
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
