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
      <div id="customer-history-printable" data-print-mode="${mode}">
        <div class="print-sheet">
          ${mode === "INVOICES" ? "" : headerHtml}
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
        #${cloneId} {
          color: #000000 !important;
        }
        #${cloneId} h1,
        #${cloneId} h2,
        #${cloneId} h3,
        #${cloneId} h4,
        #${cloneId} p,
        #${cloneId} span,
        #${cloneId} td,
        #${cloneId} th {
          padding-top: 3px !important;
          padding-bottom: 4px !important;
        }
        #${cloneId} .ledger-pdf-section table { width: 100%; border-collapse: collapse; font-size: 12px; }
        #${cloneId} .ledger-pdf-section th,
        #${cloneId} .ledger-pdf-section td { border: 1.5px solid #111827; padding: 9px 7px; }
        #${cloneId} .ledger-pdf-section th { background: #f3f4f6; text-transform: uppercase; font-size: 11px; letter-spacing: .03em; }
        #${cloneId} .print-summary { margin-top: 14px; border: 1px solid #111827; border-radius: 10px; padding: 0; background: #ffffff; }
        #${cloneId} .print-summary .divider { width: 1px; background: #111827; align-self: stretch; }
        #${cloneId} .print-summary .box { padding: 10px 14px; border-right: 1px solid #111827; border-left: 1px solid #111827; }
        #${cloneId} .print-summary .box:last-child { border-right: none; }
        #${cloneId} .print-summary .label { color: #000; font-size: 11px; text-transform: uppercase; letter-spacing: .03em; }
        #${cloneId} .print-summary .value { color: #000; font-weight: 700; }
        #${cloneId} .print-summary { page-break-inside: avoid; }
        #${cloneId} .print-summary * { line-height: 1.2 !important; }
        #${cloneId} .ledger-pdf-section th:nth-child(5),
        #${cloneId} .ledger-pdf-section th:nth-child(6),
        #${cloneId} .ledger-pdf-section th:nth-child(7),
        #${cloneId} .ledger-pdf-section td:nth-child(5),
        #${cloneId} .ledger-pdf-section td:nth-child(6),
        #${cloneId} .ledger-pdf-section td:nth-child(7) {
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
        const ledgerSection = document.createElement("div");
        ledgerSection.className = "ledger-pdf-section";
        const ledgerClone = ledgerNode.cloneNode(true) as HTMLElement;
        ledgerClone.style.overflow = "visible";
        ledgerClone.style.maxHeight = "none";
        ledgerClone.querySelectorAll(".print-hide").forEach((el) => el.remove());
        ledgerSection.appendChild(ledgerClone);
        wrapper.appendChild(ledgerSection);

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
        const invoicesSection = document.createElement("div");
        invoicesSection.className = "invoices-pdf-section";
        const invoicesClone = invoicesNode.cloneNode(true) as HTMLElement;
        invoicesClone.style.overflow = "visible";
        invoicesClone.style.maxHeight = "none";
        invoicesClone.querySelectorAll(".print-hide").forEach((el) => el.remove());
        if (mode === "ALL") {
          const spacer = document.createElement("div");
          spacer.style.height = "12px";
          wrapper.appendChild(spacer);
        }
        invoicesSection.appendChild(invoicesClone);
        wrapper.appendChild(invoicesSection);
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
          .print-summary { border: 1px solid #111827 !important; background: #ffffff !important; padding: 0 !important; }
          .print-summary .box { border-right: 1px solid #111827 !important; border-left: 1px solid #111827 !important; padding: 8px 10px; }
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
          #customer-history-printable .invoice-print-table td { border: 1px solid #111827; padding: 4px; line-height: 1.15; }
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
