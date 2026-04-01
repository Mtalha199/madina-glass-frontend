"use client";
import React, { useEffect, useMemo, useState } from "react";
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
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

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
      setShowDownloadOptions(false);
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

    const printRoot = document.createElement("div");
    printRoot.id = "customer-history-print-root";
    printRoot.style.display = "none";
    printRoot.innerHTML = `
      <div id="customer-history-printable">
        <div class="print-sheet">
          ${headerHtml}
        </div>
      </div>
    `;

    const printSheet = printRoot.querySelector(".print-sheet");
    if (printSheet && (mode === "LEDGER" || mode === "ALL")) {
      const ledgerSection = document.createElement("div");
      ledgerSection.style.marginTop = "16px";
      ledgerSection.innerHTML = `<h3 style="margin:0 0 8px;font-size:14px;font-weight:700;">Transaction Ledger</h3>`;

      const ledgerClone = ledgerNode.cloneNode(true) as HTMLElement;
      ledgerClone.style.overflow = "visible";
      ledgerClone.style.maxHeight = "none";
      ledgerClone.querySelectorAll(".print-hide").forEach((el) => el.remove());

      const scrollWrap = ledgerClone.querySelector(".max-h-72.overflow-auto") as HTMLElement | null;
      if (scrollWrap) {
        scrollWrap.style.maxHeight = "none";
        scrollWrap.style.overflow = "visible";
      }

      const stickyHead = ledgerClone.querySelector("thead.sticky") as HTMLElement | null;
      if (stickyHead) {
        stickyHead.style.position = "static";
      }

      ledgerSection.appendChild(ledgerClone);
      printSheet.appendChild(ledgerSection);
    }

    if (printSheet && (mode === "INVOICES" || mode === "ALL")) {
      const invoicesSection = document.createElement("div");
      invoicesSection.style.marginTop = "16px";
      const invoicesClone = invoicesNode.cloneNode(true) as HTMLElement;
      invoicesClone.style.overflow = "visible";
      invoicesClone.style.maxHeight = "none";
      invoicesClone.querySelectorAll(".print-hide").forEach((el) => el.remove());
      printSheet.appendChild(invoicesSection);
      invoicesSection.appendChild(invoicesClone);
    }

    const existingNode = document.getElementById("customer-history-print-root");
    if (existingNode) existingNode.remove();
    document.body.appendChild(printRoot);
    document.body.classList.add("printing-customer-history");
    window.addEventListener("afterprint", cleanupPrintDom, { once: true });
    window.print();
    setTimeout(cleanupPrintDom, 1200);
  };

  const handleDownloadPdf = async (mode: "LEDGER" | "INVOICES" | "ALL") => {
    if (downloadingPdf) return;
    const ledgerNode = document.getElementById("customer-history-ledger");
    const invoicesNode = document.getElementById("customer-history-invoices");
    if (!ledgerNode || !invoicesNode) return;
    setDownloadingPdf(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const cloneId = "pdf-capture-ledger";
      const existing = document.getElementById(cloneId);
      if (existing) existing.remove();
      const wrapper = document.createElement("div");
      wrapper.id = cloneId;
      wrapper.style.position = "fixed";
      wrapper.style.left = "-10000px";
      wrapper.style.top = "0";
      wrapper.style.width = "794px";
      wrapper.style.maxWidth = "794px";
      wrapper.style.padding = "32px";
      wrapper.style.background = "#ffffff";
      wrapper.style.borderRadius = "0";
      wrapper.style.boxShadow = "none";
      wrapper.style.overflow = "visible";
      const style = document.createElement("style");
      style.textContent = `
        #${cloneId}, #${cloneId} * {
          color: #000000 !important;
          background-color: #ffffff !important;
          background-image: none !important;
          border-color: #e5e7eb !important;
          box-shadow: none !important;
          text-shadow: none !important;
          filter: none !important;
          line-height: 1.6 !important;
        }
        #${cloneId} h1,
        #${cloneId} h2,
        #${cloneId} h3,
        #${cloneId} h4,
        #${cloneId} p {
          padding-top: 3px !important;
          padding-bottom: 4px !important;
        }
        #${cloneId} table { width: 100%; border-collapse: collapse; font-size: 12px; }
        #${cloneId} th, #${cloneId} td { border: 1.5px solid #111827; padding: 9px 7px; }
        #${cloneId} th { background: #f3f4f6; text-transform: uppercase; font-size: 11px; letter-spacing: .03em; }
        #${cloneId} .print-summary { margin-top: 14px; border: 1px solid #111827; border-radius: 10px; padding: 0; background: #ffffff; }
        #${cloneId} .print-summary .divider { width: 1px; background: #111827; align-self: stretch; }
        #${cloneId} .print-summary .box { padding: 10px 14px; border-right: 1px solid #111827; border-left: 1px solid #111827; }
        #${cloneId} .print-summary .box:last-child { border-right: none; }
        #${cloneId} .print-summary .label { color: #000; font-size: 11px; text-transform: uppercase; letter-spacing: .03em; }
        #${cloneId} .print-summary .value { color: #000; font-weight: 700; }
        #${cloneId} .print-summary { page-break-inside: avoid; }
        #${cloneId} .print-summary * { line-height: 1.2 !important; }
        #${cloneId} th:nth-child(5),
        #${cloneId} th:nth-child(6),
        #${cloneId} th:nth-child(7),
        #${cloneId} td:nth-child(5),
        #${cloneId} td:nth-child(6),
        #${cloneId} td:nth-child(7) {
          background: #f3f4f6 !important;
        }
        #${cloneId} .print-summary { border: 2px solid #111827 !important; }
        #${cloneId} .print-summary .box { border-right: 2px solid #111827 !important; }
      `;
      wrapper.appendChild(style);

      const header = document.createElement("div");
      header.style.marginBottom = "18px";
      header.style.borderBottom = "1px solid #e5e7eb";
      header.style.paddingBottom = "10px";
      header.innerHTML = `
        <div style="font-size:22px;font-weight:800;line-height:1.25;">Madina Glass</div>
        <div style="font-size:12px;color:#000;line-height:1.4;margin-top:4px;">Aluminium & Glass Works Specialist</div>
        <div style="margin-top:10px;font-size:14px;font-weight:700;line-height:1.4;">${data?.name || "Customer"}</div>
        <div style="font-size:12px;color:#000;line-height:1.4;">${data?.phone || ""}${data?.address ? ` • ${data.address}` : ""}</div>
      `;
      wrapper.appendChild(header);

      if (mode === "LEDGER" || mode === "ALL") {
        const ledgerClone = ledgerNode.cloneNode(true) as HTMLElement;
        ledgerClone.style.overflow = "visible";
        ledgerClone.style.maxHeight = "none";
        ledgerClone.querySelectorAll(".print-hide").forEach((el) => el.remove());
        wrapper.appendChild(ledgerClone);

        const summary = document.createElement("div");
        summary.className = "print-summary";
        summary.innerHTML = `
          <div style="display:flex;justify-content:flex-end;align-items:stretch;">
            <div class="box"><div class="label">Total Debit</div><div class="value">Rs. ${ledgerTotals.debit.toLocaleString()}</div></div>
            <div class="box"><div class="label">Total Credit</div><div class="value">Rs. ${ledgerTotals.credit.toLocaleString()}</div></div>
            <div class="box"><div class="label">Running Balance</div><div class="value">Rs. ${Math.abs(ledgerTotals.running).toLocaleString()}</div></div>
          </div>
        `;
        wrapper.appendChild(summary);
      }

      if (mode === "INVOICES" || mode === "ALL") {
        const invoicesClone = invoicesNode.cloneNode(true) as HTMLElement;
        invoicesClone.style.overflow = "visible";
        invoicesClone.style.maxHeight = "none";
        invoicesClone.querySelectorAll(".print-hide").forEach((el) => el.remove());
        if (mode === "ALL") {
          const spacer = document.createElement("div");
          spacer.style.height = "12px";
          wrapper.appendChild(spacer);
        }
        wrapper.appendChild(invoicesClone);
      }

      document.body.appendChild(wrapper);

      const rect = wrapper.getBoundingClientRect();
      const captureWidth = Math.ceil(wrapper.scrollWidth || rect.width);
      const captureHeight = Math.ceil(wrapper.scrollHeight || rect.height);
      const canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: captureWidth,
        height: captureHeight,
        windowWidth: captureWidth,
        windowHeight: captureHeight,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
      });

      wrapper.remove();

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const scale = canvas.width / pageWidth;
      const pageHeightPx = Math.floor(pageHeight * scale);
      const overlap = 20;
      let y = 0;
      let pageIndex = 0;
      while (y < canvas.height) {
        const sliceHeight = Math.min(pageHeightPx, canvas.height - y);
        if (sliceHeight <= overlap) break;
        if (pageIndex > 0 && sliceHeight < pageHeightPx * 0.15) break;
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(canvas, 0, -y);
        }
        const imgData = pageCanvas.toDataURL("image/png");
        if (pageIndex > 0) pdf.addPage();
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pageWidth, pageHeight, "F");
        const imgHeightMm = sliceHeight / scale;
        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeightMm);
        y += sliceHeight - overlap;
        pageIndex += 1;
      }

      const fileSuffix = mode === "LEDGER" ? "LEDGER" : mode === "INVOICES" ? "INVOICES" : "ALL";
      const safeName = data?.name ? String(data.name).replace(/\s+/g, "_") : "Customer";
      pdf.save(`${safeName}-${fileSuffix}.pdf`);
    } finally {
      setDownloadingPdf(false);
    }
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
          #customer-history-printable, #customer-history-printable * { color: #000000 !important; }
          #customer-history-printable .print-sheet { border: 1px solid #e5e7eb; border-radius: 16px; padding: 18px; }
          #customer-history-printable .print-header { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px; margin-bottom: 12px; }
          #customer-history-printable .print-brand { display: flex; align-items: center; gap: 10px; }
          #customer-history-printable .print-title { font-size: 20px; font-weight: 800; letter-spacing: .02em; text-transform: uppercase; color: #0f172a; }
          #customer-history-printable .print-subtitle { font-size: 11px; color: #6b7280; margin-top: 2px; }
          #customer-history-printable .print-customer { text-align: right; }
          #customer-history-printable .print-customer-name { font-size: 16px; font-weight: 700; }
          #customer-history-printable .print-customer-meta { font-size: 11px; color: #6b7280; margin-top: 2px; }
          #customer-history-printable table { width: 100%; border-collapse: collapse; font-size: 12px; }
          #customer-history-printable th, #customer-history-printable td { border: 1.5px solid #111827; padding: 6px; }
          #customer-history-printable th { background: #f9fafb; text-transform: uppercase; font-size: 11px; letter-spacing: .03em; color: #000000; }
          .print-summary { border: 1px solid #111827 !important; background: #ffffff !important; padding: 0 !important; }
          .print-summary .box { border-right: 1px solid #111827 !important; border-left: 1px solid #111827 !important; padding: 10px 14px; }
          .print-summary .box:last-child { border-right: none !important; }
          .print-hide { display: none !important; }
          .print-only { display: block !important; }
          .print-summary { margin-top: 10px; border-radius: 10px; }
          .print-summary .label { color: #000; font-size: 11px; text-transform: uppercase; letter-spacing: .03em; }
          .print-summary .value { color: #000; font-weight: 700; }
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
