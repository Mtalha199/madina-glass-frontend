"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

import Badge from "../ui/badge/Badge";
import { customersApi } from "@/lib/api/customer";
import { Loader } from "lucide-react";
import { invoicesApi } from "@/lib/api/invoice";
import ViewInvoiceModal from "../invoices/ViewInvoiceModal";
import ConfirmModal from "../common/ConfirmModal";

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
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [editingLedgerRow, setEditingLedgerRow] = useState<any | null>(null);
  const [savingLedgerEdit, setSavingLedgerEdit] = useState(false);
  const [ledgerEditError, setLedgerEditError] = useState<string | null>(null);
  const [deletingLedgerRow, setDeletingLedgerRow] = useState<any | null>(null);
  const [deletingLedgerPayment, setDeletingLedgerPayment] = useState(false);
  const [closingLedger, setClosingLedger] = useState(false);
  const [closeLedgerConfirmOpen, setCloseLedgerConfirmOpen] = useState(false);
  const [ledgerCloseMode, setLedgerCloseMode] = useState<"HIDE" | "DELETE" | null>(null);
  const [showArchivedLedger, setShowArchivedLedger] = useState(false);
  const [editPaymentForm, setEditPaymentForm] = useState({
    amount: "",
    method: "CASH",
    invoiceId: "__OVERALL__",
    reference: "",
    notes: "",
  });

  const ledgerTotals = useMemo(() => {
    const totals = ledgerRows.reduce(
      (acc, row) => {
        acc.debit += Number(row.debit || 0);
        acc.credit += Number(row.credit || 0);
        return acc;
      },
      { debit: 0, credit: 0 }
    );
    const running = totals.debit - totals.credit;
    return { debit: totals.debit, credit: totals.credit, running };
  }, [ledgerRows]);

  const loadCustomerHistory = async (includeArchived = showArchivedLedger) => {
    if (!customerId) return;
    setLoading(true);
    try {
      const [customerRes, ledgerRes] = await Promise.all([
        customersApi.getCustomerById(customerId, includeArchived),
        invoicesApi.getCustomerLedger(customerId, includeArchived),
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
      setShowDownloadOptions(false);
      setEditingLedgerRow(null);
      setLedgerEditError(null);
      setDeletingLedgerRow(null);
      setCloseLedgerConfirmOpen(false);
      setLedgerCloseMode(null);
      setShowArchivedLedger(false);
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

  const openEditLedgerPayment = (row: any) => {
    if (!row?.paymentId) return;
    setLedgerEditError(null);
    setEditingLedgerRow(row);
    setEditPaymentForm({
      amount: String(Number(row.credit || 0) || ""),
      method: String(row.method || "CASH").toUpperCase(),
      invoiceId: row.invoiceId ? String(row.invoiceId) : "__OVERALL__",
      reference: row.ref && String(row.ref).startsWith("PAY-") ? "" : String(row.ref || ""),
      notes: String(row.notes || ""),
    });
  };

  const handleUpdateLedgerPayment = async () => {
    if (!customerId || !editingLedgerRow?.paymentId) return;
    const amount = Number(editPaymentForm.amount || 0);
    if (amount <= 0) {
      setLedgerEditError("Amount must be greater than zero.");
      return;
    }

    try {
      setSavingLedgerEdit(true);
      setLedgerEditError(null);
      await invoicesApi.updateCustomerPayment(customerId, Number(editingLedgerRow.paymentId), {
        amount,
        method: editPaymentForm.method as "CASH" | "CHEQUE" | "BANK" | "OTHER",
        invoiceId: editPaymentForm.invoiceId === "__OVERALL__" ? null : Number(editPaymentForm.invoiceId || 0) || null,
        reference: editPaymentForm.reference || "",
        notes: editPaymentForm.notes || "",
      });
      setEditingLedgerRow(null);
      await loadCustomerHistory();
      onPaymentSaved?.();
    } catch (err: any) {
      const message = err?.response?.data?.message;
      setLedgerEditError(Array.isArray(message) ? message.join(", ") : message || "Failed to update payment.");
    } finally {
      setSavingLedgerEdit(false);
    }
  };

  const handleDeleteLedgerPayment = async () => {
    if (!customerId || !deletingLedgerRow?.paymentId) return;
    try {
      setDeletingLedgerPayment(true);
      await invoicesApi.deleteCustomerPayment(customerId, Number(deletingLedgerRow.paymentId));
      setDeletingLedgerRow(null);
      await loadCustomerHistory();
      onPaymentSaved?.();
    } finally {
      setDeletingLedgerPayment(false);
    }
  };

  const handleCloseLedger = async () => {
    if (!customerId || !ledgerCloseMode) return;
    try {
      setClosingLedger(true);
      await customersApi.closeLedger(customerId, ledgerCloseMode);
      setCloseLedgerConfirmOpen(false);
      setShowArchivedLedger(false);
      await loadCustomerHistory(false);
      onPaymentSaved?.();
    } finally {
      setClosingLedger(false);
    }
  };

  const openCloseLedgerConfirm = (mode: "HIDE" | "DELETE") => {
    setLedgerCloseMode(mode);
    setCloseLedgerConfirmOpen(true);
  };

  const toggleArchivedLedger = async () => {
    const next = !showArchivedLedger;
    setShowArchivedLedger(next);
    await loadCustomerHistory(next);
  };

  const waitForRender = () =>
    new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

  const getPrintableCaptureCss = () => `
    #customer-history-printable { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #111827; }
    #customer-history-printable, #customer-history-printable * { color: #000000 !important; }
    #customer-history-printable .print-sheet { border: 1px solid #e5e7eb; border-radius: 12px; padding: 10px; background: #ffffff; }
    #customer-history-printable .print-header { display: flex; justify-content: space-between; gap: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px; }
    #customer-history-printable .print-brand { display: flex; align-items: center; gap: 10px; }
    #customer-history-printable .print-title { font-size: 18px; font-weight: 800; letter-spacing: .02em; text-transform: uppercase; color: #0f172a; }
    #customer-history-printable .print-subtitle { font-size: 11px; color: #6b7280; margin-top: 2px; }
    #customer-history-printable .print-customer { text-align: right; }
    #customer-history-printable .print-customer-name { font-size: 14px; font-weight: 700; }
    #customer-history-printable .print-customer-meta { font-size: 10px; color: #6b7280; margin-top: 2px; }
    #customer-history-printable table { width: 100%; border-collapse: collapse; font-size: 11px; }
    #customer-history-printable th, #customer-history-printable td { border: 1.25px solid #111827; padding: 4px; }
    #customer-history-printable th { background: #f9fafb; text-transform: uppercase; font-size: 10px; letter-spacing: .03em; color: #000000; }
    #customer-history-printable .overflow-auto,
    #customer-history-printable .overflow-hidden,
    #customer-history-printable [class*="overflow-"] { overflow: visible !important; }
    #customer-history-printable .max-h-72,
    #customer-history-printable [class*="max-h-"] { max-height: none !important; height: auto !important; }
    #customer-history-printable thead.sticky,
    #customer-history-printable [class*="sticky"] { position: static !important; top: auto !important; }
    #customer-history-printable .print-hide { display: none !important; }
    #customer-history-printable .print-only { display: block !important; }
    #customer-history-printable .print-summary {
      border: 1px solid #111827 !important;
      background: #ffffff !important;
      padding: 0 !important;
      margin-top: 8px;
      border-radius: 8px;
      overflow: hidden;
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    }
    #customer-history-printable .print-summary > div,
    #customer-history-printable .print-summary .box {
      padding: 8px 10px;
      border-right: 1px solid #111827 !important;
      min-height: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    #customer-history-printable .print-summary > div:last-child,
    #customer-history-printable .print-summary .box:last-child { border-right: none !important; }
    #customer-history-printable .print-summary .label { color: #000; font-size: 10px; text-transform: uppercase; letter-spacing: .03em; }
    #customer-history-printable .print-summary .value { color: #000; font-weight: 700; font-size: 11px; }
    #customer-history-printable .invoice-print-page { margin: 0; background: #ffffff; }
    #customer-history-printable .invoice-print-shell { border: 1px solid #e5e7eb; border-radius: 12px; padding: 10px; background: #ffffff; min-height: calc(297mm - 10mm); box-sizing: border-box; }
    #customer-history-printable .invoice-print-top { border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: flex-start; }
    #customer-history-printable .invoice-print-title { font-size: 20px; font-weight: 800; line-height: 1.15; text-transform: uppercase; letter-spacing: .02em; color: #0f172a; }
    #customer-history-printable .invoice-print-subtitle { font-size: 10px; color: #6b7280; margin-top: 1px; }
    #customer-history-printable .invoice-print-head-right { text-align: right; }
    #customer-history-printable .invoice-print-number { font-size: 15px; font-weight: 700; }
    #customer-history-printable .invoice-print-meta { font-size: 10px; color: #6b7280; margin-top: 2px; }
    #customer-history-printable .invoice-print-status { display: inline-block; margin-top: 4px; padding: 3px 8px; border-radius: 999px; font-size: 9px; font-weight: 700; background: #fef2f2; color: #b91c1c; }
    #customer-history-printable .invoice-print-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 8px 0; }
    #customer-history-printable .invoice-print-billto { font-size: 10px; }
    #customer-history-printable .invoice-print-staff { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background: #f9fafb; border-radius: 10px; padding: 8px; }
    #customer-history-printable .invoice-print-staff > div { display: flex; flex-direction: column; gap: 2px; }
    #customer-history-printable .invoice-print-label { font-size: 9px; color: #6b7280; text-transform: uppercase; font-weight: 600; }
    #customer-history-printable .invoice-print-value-strong { font-size: 12px; font-weight: 700; color: #111827; }
    #customer-history-printable .invoice-print-value { font-size: 10px; color: #374151; }
    #customer-history-printable .invoice-print-summary-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin: 8px 0; }
    #customer-history-printable .invoice-print-summary-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 7px; background: #ffffff; }
    #customer-history-printable .invoice-print-summary-card.debit { background: #fef2f2; border-color: #fee2e2; }
    #customer-history-printable .invoice-print-summary-card.credit { background: #f0fdf4; border-color: #dcfce7; }
    #customer-history-printable .invoice-print-summary-card.status { background: #eff6ff; border-color: #dbeafe; }
    #customer-history-printable .invoice-print-summary-card .summary-label { font-size: 9px; color: #6b7280; }
    #customer-history-printable .invoice-print-summary-card .summary-value { font-size: 10px; font-weight: 700; margin-top: 1px; }
    #customer-history-printable .invoice-print-table { width: 100%; border-collapse: collapse; font-size: 10px; margin-top: 6px; }
    #customer-history-printable .invoice-print-table th,
    #customer-history-printable .invoice-print-table td { border: 1px solid #111827; padding: 5px 6px; line-height: 1.25; }
    #customer-history-printable .invoice-print-table th { background: #f9fafb; text-transform: uppercase; font-size: 9px; letter-spacing: .03em; }
    #customer-history-printable .invoice-print-totals-wrap { display: grid; grid-template-columns: 1fr 240px; gap: 10px; margin-top: 8px; align-items: start; }
    #customer-history-printable .invoice-print-summary { border: 1px solid #e5e7eb; border-radius: 10px; padding: 8px; background: #f9fafb; display: flex; flex-direction: column; gap: 4px; }
    #customer-history-printable .invoice-print-summary .summary-row { display: flex; justify-content: space-between; font-size: 10px; color: #374151; }
    #customer-history-printable .invoice-print-summary .summary-row.total { font-size: 12px; font-weight: 700; color: #111827; border-top: 1px solid #d1d5db; padding-top: 6px; }
    #customer-history-printable .invoice-print-summary .summary-row.paid { color: #15803d; font-weight: 600; }
    #customer-history-printable .invoice-print-summary .summary-row.balance { font-weight: 700; color: #b91c1c; }
  `;

  const buildPrintRoot = (mode: "LEDGER" | "INVOICES" | "ALL", includeCaptureStyles = false) => {
    const ledgerNode = document.getElementById("customer-history-ledger");
    const invoicesNode = document.getElementById("customer-history-invoices");
    if (!ledgerNode || !invoicesNode) return null;

    const existingNode = document.getElementById("customer-history-print-root");
    if (existingNode) existingNode.remove();

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

    const printRoot = document.createElement("div");
    printRoot.id = "customer-history-print-root";
    printRoot.style.display = includeCaptureStyles ? "block" : "none";
    if (includeCaptureStyles) {
      printRoot.style.position = "fixed";
      printRoot.style.left = "-10000px";
      printRoot.style.top = "0";
      printRoot.style.width = "794px";
      printRoot.style.maxWidth = "794px";
      printRoot.style.padding = "18px";
      printRoot.style.background = "#ffffff";
      printRoot.style.overflow = "visible";
    }
    printRoot.innerHTML = `
      <div id="customer-history-printable" data-print-mode="${mode}">
        <div class="print-sheet">
          ${mode === "INVOICES" ? "" : headerHtml}
        </div>
      </div>
    `;

    const printSheet = printRoot.querySelector(".print-sheet");
    if (printSheet && (mode === "LEDGER" || mode === "ALL")) {
      const ledgerSection = document.createElement("div");
      ledgerSection.className = "ledger-print-section";
      ledgerSection.style.marginTop = "16px";
      ledgerSection.innerHTML = `<h3 style="margin:0 0 8px;font-size:14px;font-weight:700;">Transaction Ledger</h3>`;

      const ledgerClone = ledgerNode.cloneNode(true) as HTMLElement;
      ledgerClone.style.overflow = "visible";
      ledgerClone.style.maxHeight = "none";
      ledgerClone.querySelectorAll(".print-hide").forEach((el) => el.remove());
      ledgerClone.querySelectorAll("*").forEach((el) => {
        const node = el as HTMLElement;
        const className = node.className || "";
        if (typeof className === "string" && (className.includes("overflow") || className.includes("max-h-"))) {
          node.style.overflow = "visible";
          node.style.maxHeight = "none";
          node.style.height = "auto";
        }
        if (node.tagName === "THEAD" && className.includes("sticky")) {
          node.style.position = "static";
          node.style.top = "auto";
        }
      });

      ledgerSection.appendChild(ledgerClone);
      printSheet.appendChild(ledgerSection);
    }

    if (printSheet && (mode === "INVOICES" || mode === "ALL")) {
      const invoicesSection = document.createElement("div");
      invoicesSection.className = "invoices-print-section";
      invoicesSection.style.marginTop = "16px";
      const invoices = Array.isArray(data?.invoices) ? data.invoices : [];
      const invoiceBlocks = invoices
        .map((inv: any) => {
          const items = Array.isArray(inv?.items) ? inv.items : [];
          const subTotal = items.reduce((acc: number, item: any) => acc + Number(item?.value || 0), 0);
          const discount = Number(inv?.discount || 0);
          const carriage = Number(inv?.carriage || 0);
          const paid = Number(inv?.paidAmount || 0);
          const total = Number(inv?.billValue || 0);
          const balance = Math.abs(Number(inv?.balance || 0));
          const discountPercent = inv?.discountPercent !== undefined && inv?.discountPercent !== null
            ? Number(inv.discountPercent || 0)
            : subTotal
            ? Number((((discount / subTotal) * 100) || 0).toFixed(2))
            : 0;
          const itemRows = items
            .map(
              (item: any) => `
                <tr>
                  <td>${item?.SerialNum || "—"}</td>
                  <td>${item?.itemName || "—"}</td>
                  <td>${item?.width || 0}" × ${item?.height || 0}"</td>
                  <td>${item?.standardSize || (item?.SWidth && item?.SHeight ? `${item.SWidth} x ${item.SHeight}` : "—")}</td>
                  <td>${item?.qtyPcs || 0}</td>
                  <td>${Number(item?.totalSqft || 0).toLocaleString()}</td>
                  <td>Rs. ${Number(item?.rate || 0).toLocaleString()}</td>
                  <td>Rs. ${Number(item?.value || 0).toLocaleString()}</td>
                </tr>
              `
            )
            .join("");

          return `
            <div class="invoice-print-page">
              <div class="invoice-print-block">
                <div class="invoice-print-shell">
                  <div class="print-header invoice-print-top">
                    <div class="invoice-print-brand">
                      <div>
                        <div class="print-title invoice-print-title">Madina Glass</div>
                        <div class="print-subtitle invoice-print-subtitle">Aluminium & Glass Works Specialist</div>
                      </div>
                    </div>
                    <div class="invoice-print-head-right">
                      <div class="invoice-print-number">${inv?.invoiceNumber || `INV-${inv?.id || ""}`}</div>
                      <div class="invoice-print-meta">${new Date(inv?.createdAt || Date.now()).toLocaleDateString()}</div>
                      <div class="invoice-print-status">${balance > 0 ? "DUE" : balance < 0 ? "CUSTOMER IN PLUS" : "SETTLED"}</div>
                    </div>
                  </div>

                  <div class="print-meta invoice-print-meta-grid">
                    <div class="invoice-print-billto">
                      <div class="invoice-print-label">Bill To:</div>
                      <div class="invoice-print-value-strong">${data?.name || "Customer"}</div>
                      <div class="invoice-print-value">${data?.phone || ""}</div>
                      <div class="invoice-print-value">Customer ID: ${data?.id || inv?.customerId || "—"}</div>
                      <div class="invoice-print-value">${data?.address || "No delivery address"}</div>
                    </div>
                    <div class="invoice-print-staff">
                      <div><span class="invoice-print-label">Cutter</span><span class="invoice-print-value">${inv?.cutterName || "—"}</span></div>
                      <div><span class="invoice-print-label">Driver</span><span class="invoice-print-value">${inv?.driverName || "—"}</span></div>
                      <div><span class="invoice-print-label">Fitter</span><span class="invoice-print-value">${inv?.fitterName || "—"}</span></div>
                      <div><span class="invoice-print-label">Generated By</span><span class="invoice-print-value">${inv?.admin?.name || "Admin"}</span></div>
                    </div>
                  </div>

                  <div class="print-summary-cards invoice-print-summary-cards">
                    <div class="invoice-print-summary-card debit">
                      <div class="summary-label">Debit (Bill)</div>
                      <div class="summary-value">Rs. ${total.toLocaleString()}</div>
                    </div>
                    <div class="invoice-print-summary-card credit">
                      <div class="summary-label">Credit (Paid)</div>
                      <div class="summary-value">Rs. ${paid.toLocaleString()}</div>
                    </div>
                    <div class="invoice-print-summary-card status">
                      <div class="summary-label">Net Status</div>
                      <div class="summary-value">${balance > 0 ? `Customer Owes: Rs. ${balance.toLocaleString()}` : balance < 0 ? `Customer In Plus: Rs. ${balance.toLocaleString()}` : "Settled"}</div>
                    </div>
                  </div>

                  <table class="print-compact invoice-print-table">
                <thead>
                  <tr>
                    <th>Serial #</th>
                    <th>Item Description</th>
                    <th>Size (WxH)</th>
                    <th>Std Size</th>
                    <th>Qty</th>
                    <th>Sqft</th>
                    <th>Rate</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows || `<tr><td colspan="8">No items</td></tr>`}
                </tbody>
              </table>

                  <div class="totals-remarks invoice-print-totals-wrap">
                    <div></div>
                    <div class="invoice-print-summary">
                      <div class="summary-row"><span>Sub-Total</span><span>Rs. ${subTotal.toLocaleString()}</span></div>
                      <div class="summary-row"><span>Discount (${discountPercent.toFixed(2)}%)</span><span>- Rs. ${discount.toLocaleString()}</span></div>
                      <div class="summary-row"><span>Carriage</span><span>Rs. ${carriage.toLocaleString()}</span></div>
                      <div class="summary-row total"><span>Total</span><span>Rs. ${total.toLocaleString()}</span></div>
                      <div class="summary-row paid"><span>Paid</span><span>Rs. ${paid.toLocaleString()}</span></div>
                      <div class="summary-row balance"><span>Balance Due</span><span>Rs. ${balance.toLocaleString()}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join("");
      invoicesSection.innerHTML = `
        ${mode === "ALL" ? `<h3 style="margin:0 0 8px;font-size:14px;font-weight:700;">Invoices</h3>` : ""}
        ${invoiceBlocks || `<p style="font-size:12px;color:#374151;">No invoices found.</p>`}
      `;
      printSheet.appendChild(invoicesSection);
    }

    if (includeCaptureStyles) {
      const style = document.createElement("style");
      style.textContent = getPrintableCaptureCss();
      printRoot.prepend(style);
    }

    return printRoot;
  };

  const handlePrint = (mode: "LEDGER" | "INVOICES" | "ALL") => {
    const printRoot = buildPrintRoot(mode, false);
    if (!printRoot) return;
    const cleanupPrintDom = () => {
      document.body.classList.remove("printing-customer-history");
      const node = document.getElementById("customer-history-print-root");
      if (node) node.remove();
    };

    document.body.appendChild(printRoot);
    document.body.classList.add("printing-customer-history");
    window.addEventListener("afterprint", cleanupPrintDom, { once: true });
    window.print();
    setTimeout(cleanupPrintDom, 1200);
  };

  const handleDownloadPdf = async (mode: "LEDGER" | "INVOICES" | "ALL") => {
    if (downloadingPdf) return;
    setDownloadingPdf(true);
    try {
      const printRoot = buildPrintRoot(mode, true);
      if (!printRoot) return;

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      document.body.appendChild(printRoot);
      await waitForRender();

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let pageIndex = 0;
      const renderScale = 1.45;
      const jpegQuality = 0.88;

      const addMultipageFromElement = async (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const captureWidth = Math.ceil(element.scrollWidth || rect.width);
        const captureHeight = Math.ceil(element.scrollHeight || rect.height);
        const canvas = await html2canvas(element, {
          scale: renderScale,
          useCORS: true,
          backgroundColor: "#ffffff",
          width: captureWidth,
          height: captureHeight,
          windowWidth: captureWidth,
          windowHeight: captureHeight,
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
        });
        const pxPerMm = canvas.width / pageWidth;
        const pageHeightPx = Math.floor(pageHeight * pxPerMm);
        const overlap = 20;
        let y = 0;
        while (y < canvas.height) {
          const sliceHeight = Math.min(pageHeightPx, canvas.height - y);
          if (sliceHeight <= 0) break;
          if (pageIndex > 0) pdf.addPage();
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = sliceHeight;
          const ctx = pageCanvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            ctx.drawImage(canvas, 0, -y);
          }
          const imgData = pageCanvas.toDataURL("image/jpeg", jpegQuality);
          pdf.setFillColor(255, 255, 255);
          pdf.rect(0, 0, pageWidth, pageHeight, "F");
          pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, sliceHeight / pxPerMm, undefined, "MEDIUM");
          pageIndex += 1;
          const nextY = y + sliceHeight;
          if (nextY >= canvas.height) break;
          y = Math.max(0, nextY - overlap);
        }
      };

      const addSinglePageFromElement = async (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const captureWidth = Math.ceil(element.scrollWidth || rect.width);
        const captureHeight = Math.ceil(element.scrollHeight || rect.height);
        const canvas = await html2canvas(element, {
          scale: renderScale,
          useCORS: true,
          backgroundColor: "#ffffff",
          width: captureWidth,
          height: captureHeight,
          windowWidth: captureWidth,
          windowHeight: captureHeight,
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
        });
        if (pageIndex > 0) pdf.addPage();
        const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
        const renderWidth = canvas.width * ratio;
        const renderHeight = canvas.height * ratio;
        const x = (pageWidth - renderWidth) / 2;
        const y = 0;
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pageWidth, pageHeight, "F");
        pdf.addImage(canvas.toDataURL("image/jpeg", jpegQuality), "JPEG", x, y, renderWidth, renderHeight, undefined, "MEDIUM");
        pageIndex += 1;
      };

      const printableRoot = printRoot.querySelector("#customer-history-printable") as HTMLElement | null;
      if (!printableRoot) return;

      if (mode === "LEDGER") {
        const printSheet = printableRoot.querySelector(".print-sheet") as HTMLElement | null;
        if (printSheet) await addMultipageFromElement(printSheet);
      } else if (mode === "INVOICES") {
        const invoicePages = Array.from(printableRoot.querySelectorAll(".invoice-print-page")) as HTMLElement[];
        for (const invoicePage of invoicePages) {
          await addSinglePageFromElement(invoicePage);
        }
      } else {
        const printSheet = printableRoot.querySelector(".print-sheet") as HTMLElement | null;
        const invoicesSection = printableRoot.querySelector(".invoices-print-section");
        if (printSheet) {
          const previousDisplay = (invoicesSection as HTMLElement | null)?.style.display ?? "";
          if (invoicesSection instanceof HTMLElement) invoicesSection.style.display = "none";
          await waitForRender();
          await addMultipageFromElement(printSheet);
          if (invoicesSection instanceof HTMLElement) invoicesSection.style.display = previousDisplay;
        }
        const invoicePages = Array.from((invoicesSection || printableRoot).querySelectorAll(".invoice-print-page")) as HTMLElement[];
        for (const invoicePage of invoicePages) {
          await addSinglePageFromElement(invoicePage);
        }
      }

      printRoot.remove();

      const fileSuffix = mode === "LEDGER" ? "LEDGER" : mode === "INVOICES" ? "INVOICES" : "ALL";
      const safeName = data?.name ? String(data.name).replace(/\s+/g, "_") : "Customer";
      pdf.save(`${safeName}-${fileSuffix}.pdf`);
    } catch (error) {
      console.error("Failed to download customer history PDF", error);
    } finally {
      const node = document.getElementById("customer-history-print-root");
      if (node) node.remove();
      setDownloadingPdf(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[900px]">
      <style>{`
        @media print {
          @page { size: auto; margin: 5mm; }
          html, body { overflow: visible !important; background: #fff !important; }
          body.printing-customer-history > * { display: none !important; }
          body.printing-customer-history #customer-history-print-root { display: block !important; }
          #customer-history-printable { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #111827; }
          #customer-history-printable, #customer-history-printable * { color: #000000 !important; }
          #customer-history-printable .print-sheet { border: 1px solid #e5e7eb; border-radius: 12px; padding: 10px; }
          #customer-history-printable .print-header { display: flex; justify-content: space-between; gap: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px; }
          #customer-history-printable .print-brand { display: flex; align-items: center; gap: 10px; }
          #customer-history-printable .print-title { font-size: 18px; font-weight: 800; letter-spacing: .02em; text-transform: uppercase; color: #0f172a; }
          #customer-history-printable .print-subtitle { font-size: 11px; color: #6b7280; margin-top: 2px; }
          #customer-history-printable .print-customer { text-align: right; }
          #customer-history-printable .print-customer-name { font-size: 14px; font-weight: 700; }
          #customer-history-printable .print-customer-meta { font-size: 10px; color: #6b7280; margin-top: 2px; }
          #customer-history-printable table { width: 100%; border-collapse: collapse; font-size: 11px; }
          #customer-history-printable th, #customer-history-printable td { border: 1.25px solid #111827; padding: 4px; }
          #customer-history-printable th { background: #f9fafb; text-transform: uppercase; font-size: 10px; letter-spacing: .03em; color: #000000; }
          #customer-history-printable .overflow-auto,
          #customer-history-printable .overflow-hidden,
          #customer-history-printable [class*="overflow-"] {
            overflow: visible !important;
          }
          #customer-history-printable .max-h-72,
          #customer-history-printable [class*="max-h-"] {
            max-height: none !important;
            height: auto !important;
          }
          #customer-history-printable thead.sticky,
          #customer-history-printable [class*="sticky"] {
            position: static !important;
            top: auto !important;
          }
          .print-summary {
            border: 1px solid #111827 !important;
            background: #ffffff !important;
            padding: 0 !important;
            overflow: hidden;
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .print-summary > div,
          .print-summary .box {
            border-right: 1px solid #111827 !important;
            padding: 8px 10px;
            min-height: 48px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .print-summary > div:last-child,
          .print-summary .box:last-child { border-right: none !important; }
          .print-hide { display: none !important; }
          .print-only { display: block !important; }
          .print-summary { margin-top: 8px; border-radius: 8px; }
          .print-summary .label { color: #000; font-size: 10px; text-transform: uppercase; letter-spacing: .03em; }
          .print-summary .value { color: #000; font-weight: 700; font-size: 11px; }
          #customer-history-printable .invoice-print-page { margin: 0; }
          #customer-history-printable .invoice-print-block { page-break-inside: avoid; background: #fff; }
          #customer-history-printable .invoice-print-shell { border: 1px solid #e5e7eb; border-radius: 12px; padding: 10px; background: #ffffff; }
          #customer-history-printable .invoice-print-top { border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: flex-start; }
          #customer-history-printable .invoice-print-title { font-size: 20px; font-weight: 800; line-height: 1.15; text-transform: uppercase; letter-spacing: .02em; color: #0f172a; }
          #customer-history-printable .invoice-print-subtitle { font-size: 10px; color: #6b7280; margin-top: 1px; }
          #customer-history-printable .invoice-print-head-right { text-align: right; }
          #customer-history-printable .invoice-print-number { font-size: 15px; font-weight: 700; }
          #customer-history-printable .invoice-print-meta { font-size: 10px; color: #6b7280; margin-top: 2px; }
          #customer-history-printable .invoice-print-status { display: inline-block; margin-top: 4px; padding: 3px 8px; border-radius: 999px; font-size: 9px; font-weight: 700; background: #fef2f2; color: #b91c1c; }
          #customer-history-printable .invoice-print-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 8px 0; }
          #customer-history-printable .invoice-print-billto { font-size: 10px; }
          #customer-history-printable .invoice-print-staff { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background: #f9fafb; border-radius: 10px; padding: 8px; }
          #customer-history-printable .invoice-print-staff > div { display: flex; flex-direction: column; gap: 2px; }
          #customer-history-printable .invoice-print-label { font-size: 9px; color: #6b7280; text-transform: uppercase; font-weight: 600; }
          #customer-history-printable .invoice-print-value-strong { font-size: 12px; font-weight: 700; color: #111827; }
          #customer-history-printable .invoice-print-value { font-size: 10px; color: #374151; }
          #customer-history-printable .invoice-print-summary-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin: 8px 0; }
          #customer-history-printable .invoice-print-summary-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 7px; background: #ffffff; }
          #customer-history-printable .invoice-print-summary-card.debit { background: #fef2f2; border-color: #fee2e2; }
          #customer-history-printable .invoice-print-summary-card.credit { background: #f0fdf4; border-color: #dcfce7; }
          #customer-history-printable .invoice-print-summary-card.status { background: #eff6ff; border-color: #dbeafe; }
          #customer-history-printable .invoice-print-summary-card .summary-label { font-size: 9px; color: #6b7280; }
          #customer-history-printable .invoice-print-summary-card .summary-value { font-size: 10px; font-weight: 700; margin-top: 1px; }
          #customer-history-printable .invoice-print-table { width: 100%; border-collapse: collapse; font-size: 10px; margin-top: 6px; }
          #customer-history-printable .invoice-print-table th,
          #customer-history-printable .invoice-print-table td { border: 1px solid #111827; padding: 5px 6px; line-height: 1.25; }
          #customer-history-printable .invoice-print-table th { background: #f9fafb; text-transform: uppercase; font-size: 9px; letter-spacing: .03em; }
          #customer-history-printable .invoice-print-totals-wrap { display: grid; grid-template-columns: 1fr 240px; gap: 10px; margin-top: 8px; align-items: start; }
          #customer-history-printable .invoice-print-summary { border: 1px solid #e5e7eb; border-radius: 10px; padding: 8px; background: #f9fafb; display: flex; flex-direction: column; gap: 4px; }
          #customer-history-printable .invoice-print-summary .summary-row { display: flex; justify-content: space-between; font-size: 10px; color: #374151; }
          #customer-history-printable .invoice-print-summary .summary-row.total { font-size: 12px; font-weight: 700; color: #111827; border-top: 1px solid #d1d5db; padding-top: 6px; }
          #customer-history-printable .invoice-print-summary .summary-row.paid { color: #15803d; font-weight: 600; }
          #customer-history-printable .invoice-print-summary .summary-row.balance { font-weight: 700; color: #b91c1c; }
          #customer-history-printable[data-print-mode="INVOICES"] .invoice-print-page,
          #customer-history-printable[data-print-mode="ALL"] .invoice-print-page {
            page-break-after: always;
            break-after: page;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          #customer-history-printable[data-print-mode="INVOICES"] .invoice-print-page:last-child,
          #customer-history-printable[data-print-mode="ALL"] .invoice-print-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }
          #customer-history-printable[data-print-mode="INVOICES"] .invoice-print-shell {
            min-height: calc(297mm - 10mm);
          }
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
              <div className="flex items-center gap-2 print-hide">
                <div className="relative">
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
                <div className="relative">
                  <Button variant="outline" onClick={() => setShowDownloadOptions((v) => !v)} disabled={downloadingPdf}>
                    {downloadingPdf ? "Preparing..." : "Download"}
                  </Button>
                  {showDownloadOptions && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-2 z-20">
                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-white/5"
                        onClick={() => {
                          setShowDownloadOptions(false);
                          handleDownloadPdf("LEDGER");
                        }}
                      >
                        Download Ledger Only
                      </button>
                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-white/5"
                        onClick={() => {
                          setShowDownloadOptions(false);
                          handleDownloadPdf("INVOICES");
                        }}
                      >
                        Download Invoices Only
                      </button>
                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-white/5"
                        onClick={() => {
                          setShowDownloadOptions(false);
                          handleDownloadPdf("ALL");
                        }}
                      >
                        Download Ledger + Invoices
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div id="customer-history-invoices">
              <h4 className="text-lg font-semibold mb-4 text-brand-500">Order Ledger</h4>
              <div className="space-y-4">
                {data.invoices.map((inv: any) => (
                  <div key={inv.id} className="rounded-2xl border border-slate-200 dark:border-gray-800 p-5 bg-white/90 dark:bg-gray-900/80 shadow-sm">
                    <div className="print-avoid-break print-header flex justify-between items-start border-b pb-4 border-gray-100 dark:border-gray-800">
                      <div>
                        <h5 className="text-2xl font-black tracking-tight text-brand-500 uppercase">Madina Glass</h5>
                        <p className="text-xs text-gray-500">Aluminium & Glass Works Specialist</p>
                      </div>
                      <div className="text-right">
                        <h6 className="text-base font-bold text-gray-800 dark:text-white">{inv.invoiceNumber}</h6>
                        <p className="text-xs text-gray-500">{new Date(inv.createdAt).toLocaleDateString()}</p>
                        <Badge color={inv.balance <= 0 ? "success" : "error"}>
                          {inv.balance <= 0 ? "SETTLED" : "DUE"}
                        </Badge>
                      </div>
                    </div>

                    <div className="print-avoid-break grid grid-cols-2 gap-6 my-4 text-sm">
                      <div>
                        <h4 className="text-gray-400 uppercase font-semibold text-xs mb-1">Bill To:</h4>
                        <p className="font-bold text-base">{data.name}</p>
                        <p className="text-gray-600">{data.phone}</p>
                        <p className="text-gray-600 italic">{data.address || "No delivery address"}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 bg-gray-50 dark:bg-white/5 p-3 rounded-xl">
                        <div>
                          <p className="text-gray-400 text-xs">Cutter</p>
                          <p className="font-medium">{inv.cutterName || "—"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Driver</p>
                          <p className="font-medium">{inv.driverName || "—"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Fitter</p>
                          <p className="font-medium">{inv.fitterName || "—"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Generated By</p>
                          <p className="font-medium text-brand-500">{inv.admin?.name || "Admin"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-800">
                      <table className="w-full text-xs min-w-[760px]">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 uppercase">
                          <tr>
                            <th className="px-2 py-2 text-left">Serial #</th>
                            <th className="px-2 py-2 text-left">Item Description</th>
                            <th className="px-2 py-2 text-left">Size (WxH)</th>
                            <th className="px-2 py-2 text-left">Std Size</th>
                            <th className="px-2 py-2 text-left">Qty</th>
                            <th className="px-2 py-2 text-left">Sqft</th>
                            <th className="px-2 py-2 text-left">Rate</th>
                            <th className="px-2 py-2 text-right">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inv.items.map((item: any, idx: number) => (
                            <tr key={idx} className="border-t border-gray-100 dark:border-gray-800">
                              <td className="px-2 py-2 font-mono">{item.SerialNum || "—"}</td>
                              <td className="px-2 py-2 font-medium">{item.itemName}</td>
                              <td className="px-2 py-2">{item.width}" × {item.height}"</td>
                              <td className="px-2 py-2">{item.standardSize || (item.SWidth && item.SHeight ? `${item.SWidth} x ${item.SHeight}` : "—")}</td>
                              <td className="px-2 py-2">{item.qtyPcs}</td>
                              <td className="px-2 py-2">{Number(item.totalSqft || 0).toLocaleString()}</td>
                              <td className="px-2 py-2">Rs. {Number(item.rate || 0).toLocaleString()}</td>
                              <td className="px-2 py-2 text-right font-semibold">Rs. {Number(item.value || 0).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {(() => {
                      const items = Array.isArray(inv.items) ? inv.items : [];
                      const subTotal = items.reduce((acc: number, item: any) => acc + Number(item.value || 0), 0);
                      const discount = Number(inv.discount || 0);
                      const carriage = Number(inv.carriage || 0);
                      const total = Number(inv.billValue || 0);
                      const paid = Number(inv.paidAmount || 0);
                      const balance = Math.abs(Number(inv.balance || 0));
                      const discountPercent =
                        inv.discountPercent !== undefined && inv.discountPercent !== null
                          ? Number(inv.discountPercent || 0)
                          : subTotal
                          ? Number((((discount / subTotal) * 100) || 0).toFixed(2))
                          : 0;
                      return (
                        <div className="mt-3 flex justify-between items-start gap-3">
                          <button
                            type="button"
                            onClick={() => handleOpenInvoice(inv.id)}
                            className="text-brand-500 hover:underline font-medium text-sm print-hide"
                          >
                            Open Invoice
                          </button>
                          <div className="w-80 space-y-2 rounded-xl bg-gray-50 dark:bg-white/5 p-3 border border-gray-100 dark:border-gray-800 text-sm">
                            <div className="flex justify-between text-gray-600"><span>Sub-Total</span><span>Rs. {subTotal.toLocaleString()}</span></div>
                            <div className="flex justify-between text-gray-600"><span>Discount ({discountPercent.toFixed(2)}%)</span><span>- Rs. {discount.toLocaleString()}</span></div>
                            <div className="flex justify-between text-gray-600"><span>Carriage</span><span>Rs. {carriage.toLocaleString()}</span></div>
                            <div className="flex justify-between font-bold border-t border-gray-200 dark:border-gray-700 pt-2"><span>Total</span><span>Rs. {total.toLocaleString()}</span></div>
                            <div className="flex justify-between text-green-600 font-medium"><span>Paid</span><span>Rs. {paid.toLocaleString()}</span></div>
                            <div className="flex justify-between font-bold"><span>Balance</span><span>Rs. {balance.toLocaleString()}</span></div>
                          </div>
                        </div>
                      );
                    })()}
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
            {data?.ledgerClosedAt ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                Ledger {data.ledgerClosedMode === "DELETE" ? "deleted" : "closed"} on {new Date(data.ledgerClosedAt).toLocaleString()}.
                {data.ledgerClosedByAdmin?.name ? ` Closed by ${data.ledgerClosedByAdmin.name}.` : ""}
              </div>
            ) : null}
            {data?.ledgerClosedMode === "HIDE" ? (
              <div className="mt-3 flex justify-end mb-3">
                <Button variant="outline" onClick={toggleArchivedLedger}>
                  {showArchivedLedger ? "Show Current Ledger" : "View Archived Ledger"}
                </Button>
              </div>
            ) : null}
            <div id="customer-history-ledger" className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="max-h-72 overflow-auto">
                <table className="w-full text-sm text-gray-900 dark:text-white">
                  <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
                    <tr className="text-xs uppercase text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700">
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
                          <div className="flex justify-end gap-2">
                            {row.invoiceId ? (
                              <button
                                type="button"
                                onClick={() => handleOpenInvoice(row.invoiceId)}
                                className="text-brand-500 hover:underline text-xs font-medium"
                              >
                                Invoice
                              </button>
                            ) : (
                              <span className="text-xs text-gray-400">—</span>
                            )}
                            {row.paymentId ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => openEditLedgerPayment(row)}
                                  className="text-blue-600 hover:underline text-xs font-medium"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeletingLedgerRow(row)}
                                  className="text-red-600 hover:underline text-xs font-medium"
                                >
                                  Delete
                                </button>
                              </>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="print-only hidden">
                <div className="print-summary flex justify-end gap-8 text-sm">
                  <div>
                    <div className="label">Total Debit</div>
                    <div className="value">Rs. {ledgerTotals.debit.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="label">Total Credit</div>
                    <div className="value">Rs. {ledgerTotals.credit.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="label">Running Balance</div>
                    <div className="value">Rs. {Math.abs(ledgerTotals.running).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="mt-8 flex justify-end gap-3">
          {!data?.ledgerClosedAt ? (
            <>
              <Button
                onClick={() => openCloseLedgerConfirm("HIDE")}
                variant="outline"
                disabled={closingLedger}
              >
                {closingLedger && ledgerCloseMode === "HIDE" ? "Hiding..." : "Hide Ledger"}
              </Button>
              <Button
                onClick={() => openCloseLedgerConfirm("DELETE")}
                variant="outline"
                disabled={closingLedger}
              >
                {closingLedger && ledgerCloseMode === "DELETE" ? "Deleting..." : "Delete Ledger"}
              </Button>
            </>
          ) : null}
          <Button onClick={onClose} variant="outline">Close Ledger</Button>
        </div>
      </div>
      <ViewInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        invoiceId={selectedInvoiceId}
      />
      <Modal
        isOpen={!!editingLedgerRow}
        onClose={() => {
          if (!savingLedgerEdit) setEditingLedgerRow(null);
        }}
        className="max-w-[560px] m-4"
      >
        <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl">
          <h4 className="text-lg font-semibold mb-4">Edit Ledger Payment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-800 px-3 py-2">
              <p className="text-xs text-gray-500">Debit</p>
              <p className="font-semibold text-red-600">Rs. 0</p>
            </div>
            <div className="rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-800 px-3 py-2">
              <p className="text-xs text-gray-500">Credit</p>
              <p className="font-semibold text-green-600">Rs. {Number(editPaymentForm.amount || 0).toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="number"
              placeholder="Amount"
              className="w-full border rounded px-3 py-2 text-sm"
              value={editPaymentForm.amount}
              onChange={(e) => setEditPaymentForm((p) => ({ ...p, amount: e.target.value }))}
            />
            <select
              className="w-full border rounded px-3 py-2 text-sm bg-transparent"
              value={editPaymentForm.method}
              onChange={(e) => setEditPaymentForm((p) => ({ ...p, method: e.target.value }))}
            >
              <option value="CASH">Cash</option>
              <option value="CHEQUE">Cheque</option>
              <option value="BANK">Bank</option>
              <option value="OTHER">Other</option>
            </select>
            <select
              className="w-full border rounded px-3 py-2 text-sm bg-transparent"
              value={editPaymentForm.invoiceId}
              onChange={(e) => setEditPaymentForm((p) => ({ ...p, invoiceId: e.target.value }))}
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
              className="w-full border rounded px-3 py-2 text-sm"
              value={editPaymentForm.reference}
              onChange={(e) => setEditPaymentForm((p) => ({ ...p, reference: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Notes (optional)"
              className="w-full border rounded px-3 py-2 text-sm"
              value={editPaymentForm.notes}
              onChange={(e) => setEditPaymentForm((p) => ({ ...p, notes: e.target.value }))}
            />
            {ledgerEditError && <p className="text-sm text-red-600">{ledgerEditError}</p>}
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setEditingLedgerRow(null)} disabled={savingLedgerEdit}>
              Cancel
            </Button>
            <Button onClick={handleUpdateLedgerPayment} disabled={savingLedgerEdit}>
              {savingLedgerEdit ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Modal>
      <ConfirmModal
        isOpen={!!deletingLedgerRow}
        onClose={() => {
          if (!deletingLedgerPayment) setDeletingLedgerRow(null);
        }}
        onConfirm={handleDeleteLedgerPayment}
        title="Delete Ledger Payment"
        message={`Delete payment "${deletingLedgerRow?.ref || "PAYMENT"}" of Rs. ${Number(deletingLedgerRow?.credit || 0).toLocaleString()}? This cannot be undone.`}
        confirmLabel="Delete Payment"
        cancelLabel="Cancel"
        variant="danger"
        isLoading={deletingLedgerPayment}
      />
      <ConfirmModal
        isOpen={closeLedgerConfirmOpen}
        onClose={() => {
          if (!closingLedger) setCloseLedgerConfirmOpen(false);
        }}
        onConfirm={handleCloseLedger}
        title={ledgerCloseMode === "DELETE" ? "Delete customer ledger?" : "Hide customer ledger?"}
        message={
          ledgerCloseMode === "DELETE"
            ? "This will permanently delete all invoices, invoice items, and ledger payments for this customer, but the customer record will stay saved."
            : "This will hide older invoices and payments from the default ledger view, but the records will stay saved in the database and can be viewed again."
        }
        confirmLabel={ledgerCloseMode === "DELETE" ? (closingLedger ? "Deleting..." : "Delete Ledger") : (closingLedger ? "Hiding..." : "Hide Ledger")}
        cancelLabel="Cancel"
        variant="default"
        isLoading={closingLedger}
      />
    </Modal>
  );
}
