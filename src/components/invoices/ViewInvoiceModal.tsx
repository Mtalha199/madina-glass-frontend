"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { Loader } from "lucide-react";
import { invoicesApi } from "@/lib/api/invoice";

export default function ViewInvoiceModal({
  isOpen,
  onClose,
  invoiceId,
  printRequest,
  onPrintRequestHandled,
  downloadRequest,
  onDownloadRequestHandled,
}: any) {
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ledgerLoading, setLedgerLoading] = useState(false);
  const [ledgerError, setLedgerError] = useState<string | null>(null);
  const [ledgerRows, setLedgerRows] = useState<any[]>([]);
  const [ledgerCustomer, setLedgerCustomer] = useState<any>(null);
  const [savingPayment, setSavingPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    method: "CASH",
    invoiceId: "__CURRENT__",
    reference: "",
    notes: "",
  });
  const [printMode, setPrintMode] = useState<"CUSTOMER" | "LABOUR">("CUSTOMER");
  const [showPrintOptions, setShowPrintOptions] = useState(false);
  const [handledPrintRequestKey, setHandledPrintRequestKey] = useState<number | null>(null);
  const [handledDownloadRequestKey, setHandledDownloadRequestKey] = useState<number | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const loadInvoice = async () => {
    if (!invoiceId) return;
    const res = await invoicesApi.getInvoiceById(invoiceId);
    setInvoice(res.data || res);
  };

  useEffect(() => {
    if (isOpen && invoiceId) {
      setLoading(true);
      loadInvoice().finally(() => setLoading(false));
    }
  }, [isOpen, invoiceId]);

  useEffect(() => {
    if (isOpen) {
      setPrintMode("CUSTOMER");
      setShowPrintOptions(false);
    }
  }, [isOpen, invoiceId]);

  useEffect(() => {
    if (!isOpen) return;

    const customerId = Number(invoice?.customerId || invoice?.customer?.id || 0);
    if (!customerId) {
      setLedgerRows([]);
      setLedgerCustomer(null);
      setLedgerError(null);
      return;
    }

    setLedgerLoading(true);
    setLedgerError(null);

    invoicesApi
      .getCustomerLedger(customerId)
      .then((res) => {
        const payload = res?.data || res;
        setLedgerCustomer(payload?.customer || null);
        setLedgerRows(payload?.rows || []);
      })
      .catch(() => {
        setLedgerRows([]);
        setLedgerCustomer(null);
        setLedgerError("Unable to load customer ledger history.");
      })
      .finally(() => setLedgerLoading(false));
  }, [isOpen, invoice?.customerId, invoice?.customer?.id]);

  const isLabourView = printMode === "LABOUR";
  const defaultPaymentTarget = invoice?.customerType === "CUSTOMER" ? "__OVERALL__" : "__CURRENT__";

  useEffect(() => {
    if (!isOpen) return;
    setPaymentForm((p) => ({ ...p, invoiceId: defaultPaymentTarget }));
  }, [isOpen, defaultPaymentTarget]);
  const labourColSpan = 4;

  const getLabourGroupKey = (item: any) => {
    const name = String(item?.itemName || "").trim();
    if (name) return name;
    const thickness = item?.glassThickness ? `${item.glassThickness}mm` : "";
    const shade = item?.glassShade || item?.glassType || "";
    const fallback = [thickness, shade].filter(Boolean).join(" ");
    return fallback || "UNSPECIFIED";
  };

  const labourRows = useMemo(() => {
    if (!isLabourView) return [];
    const rows: Array<{ type: "group" | "item"; key: string; item?: any; index?: number }> = [];
    let lastKey = "";
    (invoice?.items || []).forEach((item: any, index: number) => {
      const key = getLabourGroupKey(item);
      if (key !== lastKey) {
        rows.push({ type: "group", key });
        lastKey = key;
      }
      rows.push({ type: "item", key, item, index });
    });
    return rows;
  }, [invoice?.items, isLabourView]);

  const totals = useMemo(() => {
    const items = invoice?.items || [];
    return {
      qty: items.reduce((acc: number, item: any) => acc + Number(item.qtyPcs || 0), 0),
      sqft: Number(items.reduce((acc: number, item: any) => acc + Number(item.totalSqft || 0), 0).toFixed(2)),
    };
  }, [invoice?.items]);

  const subTotal = useMemo(() => {
    if (!invoice?.items) return 0;
    return invoice.items.reduce((acc: number, item: any) => acc + Number(item.value || 0), 0);
  }, [invoice]);

  const discountPercent = useMemo(() => {
    if (isLabourView) return 0;
    if (invoice?.discountPercent !== undefined && invoice?.discountPercent !== null) return Number(invoice.discountPercent) || 0;
    if (!subTotal) return 0;
    return Number((((Number(invoice?.discount || 0) / subTotal) * 100) || 0).toFixed(2));
  }, [invoice, subTotal, isLabourView]);

  const billValue = Number(invoice?.billValue || 0);
  const paidAmount = Number(invoice?.paidAmount || 0);
  const net = Number((billValue - paidAmount).toFixed(2)); // +ve means customer owes, -ve means customer in plus
  const shouldTightenPrint = (invoice?.items?.length || 0) > 10 || String(invoice?.remarks || "").length > 180;

  const handlePrint = (mode: "CUSTOMER" | "LABOUR") => {
    setPrintMode(mode);
    setShowPrintOptions(false);
    const cleanupPrintDom = () => {
      document.body.classList.remove("printing-invoice");
      const node = document.getElementById("invoice-print-root");
      if (node) node.remove();
    };

    setTimeout(() => {
      const invoiceNode = document.getElementById("printable-invoice");
      if (!invoiceNode) return;

      const existingNode = document.getElementById("invoice-print-root");
      if (existingNode) existingNode.remove();

      const printRoot = document.createElement("div");
      printRoot.id = "invoice-print-root";
      printRoot.style.display = "none";
      printRoot.innerHTML = invoiceNode.outerHTML;
      document.body.appendChild(printRoot);

      document.body.classList.add("printing-invoice");
      window.addEventListener("afterprint", cleanupPrintDom, { once: true });
      window.print();
      // Safety cleanup for browsers that skip afterprint.
      setTimeout(cleanupPrintDom, 1200);
    }, 120);
  };

  const handleDownloadPdf = async (mode: "CUSTOMER" | "LABOUR") => {
    const invoiceNode = document.getElementById("printable-invoice");
    if (!invoiceNode || downloadingPdf) return;
    setDownloadingPdf(true);
    try {
      setPrintMode(mode);
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const cloneId = "pdf-capture-invoice";
      const existing = document.getElementById(cloneId);
      if (existing) existing.remove();
      const clone = invoiceNode.cloneNode(true) as HTMLElement;
      clone.id = cloneId;
      clone.style.position = "fixed";
      clone.style.left = "-10000px";
      clone.style.top = "0";
      clone.style.width = "794px";
      clone.style.maxWidth = "794px";
      clone.style.padding = "24px";
      clone.style.background = "#ffffff";
      clone.style.borderRadius = "0";
      clone.style.boxShadow = "none";
      clone.style.overflow = "visible";
      const style = document.createElement("style");
      style.textContent = `
        #${cloneId}, #${cloneId} * {
          color: #111827 !important;
          background-color: #ffffff !important;
          background-image: none !important;
          border-color: #e5e7eb !important;
          box-shadow: none !important;
          text-shadow: none !important;
          filter: none !important;
          line-height: 1.5 !important;
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
        #${cloneId} .print-title {
          line-height: 1.25 !important;
          padding-top: 6px !important;
          padding-bottom: 6px !important;
          display: block !important;
        }
        #${cloneId} .print-subtitle {
          display: block !important;
          margin-top: 4px !important;
        }
        #${cloneId} .print-meta p,
        #${cloneId} .print-meta h4,
        #${cloneId} .print-remarks p {
          display: block !important;
        }
        #${cloneId} .print-compact {
          overflow: visible !important;
          border-radius: 0 !important;
        }
        #${cloneId} .print-compact th,
        #${cloneId} .print-compact td {
          padding-top: 6px !important;
          padding-bottom: 6px !important;
          line-height: 1.45 !important;
        }
      `;
      clone.prepend(style);
      clone.querySelectorAll(".print\\:hidden, .invoice-actions").forEach((el) => el.remove());
      document.body.appendChild(clone);

      const rect = clone.getBoundingClientRect();
      const captureWidth = Math.ceil(clone.scrollWidth || rect.width);
      const captureHeight = Math.ceil(clone.scrollHeight || rect.height);
      const canvas = await html2canvas(clone, {
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
      clone.remove();
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

      const safeNumber = invoice?.invoiceNumber || `INV-${invoice?.id || ""}`;
      const suffix = mode === "LABOUR" ? "-LABOUR" : "-CUSTOMER";
      pdf.save(`${safeNumber}${suffix}.pdf`);
    } finally {
      setDownloadingPdf(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !invoice || !printRequest?.key) return;
    if (handledPrintRequestKey === printRequest.key) return;

    setHandledPrintRequestKey(printRequest.key);
    handlePrint(printRequest.mode || "CUSTOMER");
    onPrintRequestHandled?.();
  }, [isOpen, invoice, printRequest, handledPrintRequestKey, onPrintRequestHandled]);

  useEffect(() => {
    if (!isOpen || !invoice || !downloadRequest?.key) return;
    if (handledDownloadRequestKey === downloadRequest.key) return;
    setHandledDownloadRequestKey(downloadRequest.key);
    handleDownloadPdf(downloadRequest.mode || "CUSTOMER");
    onDownloadRequestHandled?.();
  }, [isOpen, invoice, downloadRequest, handledDownloadRequestKey, onDownloadRequestHandled]);

  const handleAddPayment = async () => {
    const customerId = Number(invoice?.customerId || invoice?.customer?.id || 0);
    const amount = Number(paymentForm.amount || 0);
    if (!customerId || amount <= 0) return;
    const currentInvoiceId = Number(invoice?.id || invoiceId || 0);
    let selectedInvoiceId: number | undefined;
    if (paymentForm.invoiceId === "__OVERALL__") {
      selectedInvoiceId = undefined;
    } else if (paymentForm.invoiceId === "__CURRENT__" || paymentForm.invoiceId === "") {
      selectedInvoiceId = currentInvoiceId || undefined;
    } else {
      selectedInvoiceId = Number(paymentForm.invoiceId) || undefined;
    }

    try {
      setSavingPayment(true);
      await invoicesApi.addCustomerPayment(customerId, {
        amount,
        method: paymentForm.method as "CASH" | "CHEQUE" | "BANK" | "OTHER",
        invoiceId: selectedInvoiceId || undefined,
        reference: paymentForm.reference || undefined,
        notes: paymentForm.notes || undefined,
      });

      setPaymentForm({
        amount: "",
        method: "CASH",
        invoiceId: defaultPaymentTarget,
        reference: "",
        notes: "",
      });

      const res = await invoicesApi.getCustomerLedger(customerId);
      const payload = res?.data || res;
      setLedgerCustomer(payload?.customer || null);
      setLedgerRows(payload?.rows || []);
      await loadInvoice();
    } finally {
      setSavingPayment(false);
    }
  };

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className="max-w-[960px]">
        <div className="p-8 flex items-center justify-center min-h-[220px]"><Loader className="animate-spin" /></div>
      </Modal>
    );
  }

  if (!invoice) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[980px] m-4 max-h-[95vh] overflow-y-auto">
      <style>{`
        @media print {
          @page { size: auto; margin: 6mm; }
          html, body {
            overflow: visible !important;
            background: #fff !important;
          }
          #printable-invoice,
          #printable-invoice * {
            color: #111827 !important;
          }
          /* Hide all app content first to avoid printing list/sidebar pages */
          body.printing-invoice > * {
            display: none !important;
          }
          body.printing-invoice #invoice-print-root {
            display: block !important;
          }
          body.printing-invoice #invoice-print-root #printable-invoice {
            position: static !important;
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
            border-radius: 0 !important;
          }
          body.printing-invoice #invoice-print-root #printable-invoice,
          body.printing-invoice #invoice-print-root #printable-invoice * {
            visibility: visible !important;
          }
          /* Force high-contrast print text */
          body.printing-invoice #invoice-print-root #printable-invoice,
          body.printing-invoice #invoice-print-root #printable-invoice * {
            color: #000 !important;
            text-shadow: none !important;
            -webkit-text-fill-color: #000 !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
          .print-sheet { padding: 0 !important; background: #fff !important; border-radius: 0 !important; }
          #printable-invoice { font-size: 12px !important; line-height: 1.25 !important; }
          .print-compact { width: 100%; border-collapse: collapse; table-layout: auto; }
          .print-compact th, .print-compact td { padding: 5px 7px !important; font-size: 10.5px !important; line-height: 1.2 !important; }
          .print-compact tbody tr { break-inside: avoid; page-break-inside: avoid; }
          .print-title { font-size: 24px !important; line-height: 1.2 !important; }
          .print-header { padding-bottom: 10px !important; }
          .print-meta { margin-top: 10px !important; margin-bottom: 10px !important; gap: 12px !important; }
          .print-summary-cards { margin-bottom: 10px !important; gap: 8px !important; }
          .print-remarks p { font-size: 10px !important; line-height: 1.2 !important; max-height: 60px; overflow: hidden; }
          .print-avoid-break { break-inside: avoid; page-break-inside: avoid; }
          .print-no-wrap { white-space: nowrap !important; }
          .print\\:hidden { display: none !important; }
          .totals-remarks { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 16px !important; align-items: start !important; }

          /* Dense print mode for long invoices: reduce visual chrome to keep first page packed */
          #printable-invoice.print-fit-tight .print-title { font-size: 20px !important; }
          #printable-invoice.print-fit-tight .print-header { padding-bottom: 8px !important; }
          #printable-invoice.print-fit-tight .print-meta { margin-top: 8px !important; margin-bottom: 8px !important; gap: 10px !important; }
          #printable-invoice.print-fit-tight .print-summary-cards { display: none !important; }
          #printable-invoice.print-fit-tight .print-compact th,
          #printable-invoice.print-fit-tight .print-compact td { padding: 4px 6px !important; font-size: 10px !important; line-height: 1.15 !important; }
          #printable-invoice.print-fit-tight .totals-remarks { gap: 10px !important; }
          #printable-invoice.print-fit-tight .print-remarks p { max-height: 44px; }

          /* Labour print mode: larger, clearer data text */
          #printable-invoice.print-labour-large { font-size: 15px !important; line-height: 1.38 !important; }
          #printable-invoice.print-labour-large .print-title { font-size: 30px !important; }
          #printable-invoice.print-labour-large h2 { font-size: 28px !important; }
          #printable-invoice.print-labour-large .print-compact th,
          #printable-invoice.print-labour-large .print-compact td { font-size: 14px !important; line-height: 1.45 !important; padding: 7px 9px !important; }
          #printable-invoice.print-labour-large .print-meta p,
          #printable-invoice.print-labour-large .print-meta h4 { font-size: 15px !important; }
          #printable-invoice.print-labour-large .print-meta .font-bold,
          #printable-invoice.print-labour-large .print-meta .font-medium { font-size: 16px !important; }
        }
      `}</style>
      <div
        className={`print-sheet p-8 bg-gradient-to-br from-white via-slate-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 rounded-3xl ${shouldTightenPrint ? "print-fit-tight" : ""} ${isLabourView ? "print-labour-large" : ""}`}
        id="printable-invoice"
      >
        <div className="rounded-2xl border border-slate-200 dark:border-gray-800 p-6 bg-white/90 dark:bg-gray-900/80 shadow-sm">
          <div className="print-avoid-break print-header flex justify-between items-start border-b pb-6 border-gray-100 dark:border-gray-800">
            <div className="flex items-start gap-3">
              <div>
                <h1 className="print-title text-3xl font-black tracking-tight text-brand-500 uppercase">Madina Glass</h1>
                <p className="text-sm text-gray-500">Aluminium & Glass Works Specialist</p>
              </div>
              <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300 print:hidden">
                {printMode} INVOICE VIEW
              </span>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">{invoice.invoiceNumber}</h2>
              <p className="text-sm text-gray-500">{new Date(invoice.createdAt).toLocaleDateString()}</p>
              {!isLabourView && (
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                    net > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  {net > 0 ? "DUE" : net < 0 ? "CUSTOMER IN PLUS" : "SETTLED"}
                </span>
              )}
            </div>
          </div>

          <div className="print-avoid-break print-meta grid grid-cols-2 gap-8 my-8 text-sm">
            <div>
              <h4 className="text-gray-400 uppercase font-semibold text-xs mb-2">Bill To:</h4>
              <p className="font-bold text-lg">{invoice.customer?.name}</p>
              <p className="text-gray-600">{invoice.customer?.phone}</p>
              <p className="text-gray-600">Customer ID: {invoice.customerId || invoice.customer?.id || "—"}</p>
              <p className="text-gray-600 italic">{invoice.address || "No delivery address"}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl">
              <div>
                <p className="text-gray-400 text-xs">Cutter</p>
                <p className="font-medium">{invoice.cutterName || "—"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Driver</p>
                <p className="font-medium">{invoice.driverName || "—"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Fitter</p>
                <p className="font-medium">{invoice.fitterName || "—"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Generated By</p>
                <p className="font-medium text-brand-500">{invoice.admin?.name || "Admin"}</p>
              </div>
            </div>
          </div>

          {!isLabourView && (
            <div className="print-summary-cards mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-lg bg-red-50 dark:bg-red-500/10 p-3 text-sm border border-red-100 dark:border-red-500/20">
                <p className="text-xs text-gray-500">Debit (Bill)</p>
                <p className="font-semibold text-red-600">Rs. {billValue.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-500/10 p-3 text-sm border border-green-100 dark:border-green-500/20">
                <p className="text-xs text-gray-500">Credit (Paid)</p>
                <p className="font-semibold text-green-600">Rs. {paidAmount.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-brand-50 dark:bg-brand-500/10 p-3 text-sm border border-brand-100 dark:border-brand-500/20">
                <p className="text-xs text-gray-500">Net Status</p>
                <p className="font-semibold text-brand-500">
                  {net > 0 ? `Customer Owes: Rs. ${net.toLocaleString()}` : net < 0 ? `Customer In Plus: Rs. ${Math.abs(net).toLocaleString()}` : "Settled"}
                </p>
              </div>
            </div>
          )}

          {!isLabourView && (
            <div className="mb-8 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden print:hidden">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Customer Ledger (Debit/Credit)</h4>
                {ledgerLoading && <span className="text-xs text-gray-500">Loading...</span>}
              </div>

              {ledgerError && <p className="p-4 text-sm text-red-600">{ledgerError}</p>}

              {!ledgerError && !ledgerLoading && ledgerRows.length === 0 && (
                <p className="p-4 text-sm text-gray-500">No customer history found.</p>
              )}

              {!ledgerError && !ledgerLoading && ledgerRows.length > 0 && (
                <div className="space-y-3 p-3 border-b border-gray-100 dark:border-gray-800">
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
                      <option value="__CURRENT__">Against This Invoice ({invoice?.invoiceNumber || `INV-${invoice?.id || ""}`})</option>
                      <option value="__OVERALL__">Overall Customer Payment (No Invoice Link)</option>
                      {ledgerRows
                        .filter((r: any) => r.type === "INVOICE")
                        .map((r: any) => (
                          <option key={r.invoiceId} value={String(r.invoiceId)}>
                            Against: {r.ref}
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
                      onClick={handleAddPayment}
                      disabled={savingPayment}
                      className="rounded bg-brand-500 text-white px-3 py-2 text-sm font-medium disabled:opacity-60"
                    >
                      {savingPayment ? "Saving..." : "Add Payment"}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {net > 0 ? `Remaining: Rs. ${net.toLocaleString()}` : net < 0 ? `Customer Plus: Rs. ${Math.abs(net).toLocaleString()}` : "Invoice Settled"}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setPaymentForm((p) => ({
                          ...p,
                          amount: net > 0 ? String(net) : "",
                          invoiceId: "__CURRENT__",
                        }))
                      }
                      disabled={net <= 0}
                      className="rounded border border-brand-200 text-brand-600 px-3 py-1.5 font-medium hover:bg-brand-50 disabled:opacity-50"
                    >
                      Quick Pay Remaining
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Notes (optional)"
                    className="w-full border rounded px-2 py-2 text-sm"
                    value={paymentForm.notes}
                    onChange={(e) => setPaymentForm((p) => ({ ...p, notes: e.target.value }))}
                  />
                  {ledgerCustomer && (
                    <p className="text-xs text-gray-500">
                      Ledger for: {ledgerCustomer.name} ({ledgerCustomer.phone})
                    </p>
                  )}
                </div>
              )}

              {!ledgerError && !ledgerLoading && ledgerRows.length > 0 && (
                <div className="max-h-60 overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white dark:bg-gray-900 z-10">
                      <tr className="text-xs uppercase text-gray-500 border-b border-gray-100 dark:border-gray-800">
                        <th className="px-3 py-2 text-left">Date</th>
                        <th className="px-3 py-2 text-left">Type</th>
                        <th className="px-3 py-2 text-left">Ref</th>
                        <th className="px-3 py-2 text-left">Method</th>
                        <th className="px-3 py-2 text-left">Received By</th>
                        <th className="px-3 py-2 text-right">Debit</th>
                        <th className="px-3 py-2 text-right">Credit</th>
                        <th className="px-3 py-2 text-right">Running Balance</th>
                        <th className="px-3 py-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ledgerRows.map((row: any, idx: number) => (
                        <tr key={`${row.type || "ROW"}-${row.invoiceId || row.paymentId || row.ref || idx}-${idx}`} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="px-3 py-2">{new Date(row.date || row.createdAt).toLocaleDateString()}</td>
                          <td className="px-3 py-2 text-xs">{row.type?.replace("_", " ") || "—"}</td>
                          <td className="px-3 py-2 font-medium">{row.ref || "—"}</td>
                          <td className="px-3 py-2 text-xs">{row.method || "—"}</td>
                          <td className="px-3 py-2 text-xs">{row.receivedByName || "—"}</td>
                          <td className="px-3 py-2 text-right text-red-600">Rs. {Number(row.debit || 0).toLocaleString()}</td>
                          <td className="px-3 py-2 text-right text-green-600">Rs. {Number(row.credit || 0).toLocaleString()}</td>
                          <td className="px-3 py-2 text-right font-semibold">Rs. {Math.abs(Number(row.runningBalance || 0)).toLocaleString()}</td>
                          <td className={`px-3 py-2 text-right text-xs font-semibold ${Number(row.runningBalance || 0) > 0 ? "text-red-600" : Number(row.runningBalance || 0) < 0 ? "text-green-600" : "text-gray-500"}`}>
                            {Number(row.runningBalance || 0) > 0 ? "Due" : Number(row.runningBalance || 0) < 0 ? "Plus" : "Settled"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          <table className="print-compact w-full text-left mb-8 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 uppercase">
                <th className="py-3 px-3">Serial #</th>
                <th className="py-3 px-3">Item Description</th>
                <th className="py-3 px-3">Size (WxH)</th>
                {!isLabourView && <th className="py-3 px-3">Std Size</th>}
                <th className="py-3 px-3">Qty</th>
                {!isLabourView && <th className="py-3 px-3">Sqft</th>}
                {!isLabourView && <th className="py-3 px-3">Rate</th>}
                {!isLabourView && <th className="py-3 px-3 text-right">Value</th>}
              </tr>
            </thead>
            <tbody className="text-sm">
              {isLabourView
                ? labourRows.map((row, idx) => {
                    if (row.type === "group") {
                      return (
                        <tr
                          key={`group-${row.key}-${idx}`}
                          className="bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200 dark:border-gray-700"
                        >
                          <td colSpan={labourColSpan} className="py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                            {row.key}
                          </td>
                        </tr>
                      );
                    }
                    const item = row.item;
                    return (
                      <tr key={`item-${row.index}`} className="border-t border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-3 font-mono">{item.SerialNum || "—"}</td>
                        <td className="py-3 px-3 font-medium">{item.itemName}</td>
                        <td className="py-3 px-3 text-gray-500 print-no-wrap">{item.width}" × {item.height}"</td>
                        <td className="py-3 px-3">{item.qtyPcs}</td>
                      </tr>
                    );
                  })
                : invoice.items?.map((item: any, i: number) => (
                    <tr key={i} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-3 font-mono">{item.SerialNum || "—"}</td>
                      <td className="py-3 px-3 font-medium">{item.itemName}</td>
                      <td className="py-3 px-3 text-gray-500 print-no-wrap">{item.width}" × {item.height}"</td>
                      {!isLabourView && <td className="py-3 px-3 text-gray-500 print-no-wrap">{item.standardSize || (item.SWidth && item.SHeight ? `${item.SWidth} x ${item.SHeight}` : "—")}</td>}
                      <td className="py-3 px-3">{item.qtyPcs}</td>
                      {!isLabourView && <td className="py-3 px-3 font-mono">{item.totalSqft}</td>}
                      {!isLabourView && <td className="py-3 px-3">Rs. {Number(item.rate || 0).toLocaleString()}</td>}
                      {!isLabourView && <td className="py-3 px-3 text-right font-bold">Rs. {Number(item.value || 0).toLocaleString()}</td>}
                    </tr>
                  ))}
            </tbody>
          </table>

          <div className="flex flex-wrap items-center justify-end gap-3 mb-8 text-sm">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 bg-gray-50 dark:bg-white/5">
              <span className="text-gray-500">Total Qty</span>
              <span className="ml-2 font-semibold text-gray-800 dark:text-gray-100">{totals.qty.toLocaleString()}</span>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 bg-gray-50 dark:bg-white/5">
              <span className="text-gray-500">Total Sqft</span>
              <span className="ml-2 font-semibold text-gray-800 dark:text-gray-100">{totals.sqft.toLocaleString()}</span>
            </div>
          </div>

          {!isLabourView && (
            <div className="totals-remarks print-avoid-break mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {invoice.remarks ? (
                <div className="print-remarks rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-white/5 p-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Remarks / Terms</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">{invoice.remarks}</p>
                </div>
              ) : (
                <div />
              )}
              <div className="flex justify-end">
                <div className="w-72 space-y-3 rounded-2xl bg-gray-50 dark:bg-white/5 p-4 border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between text-gray-500">
                    <span>Sub-Total</span>
                    <span>Rs. {subTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Discount ({discountPercent.toFixed(2)}%)</span>
                    <span>- Rs. {Number(invoice.discount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Carriage</span>
                    <span>Rs. {Number(invoice.carriage || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span>Total</span>
                    <span className="text-brand-500">Rs. {billValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>Paid</span>
                    <span>Rs. {paidAmount.toLocaleString()}</span>
                  </div>
                  <div
                    className={`flex justify-between p-3 rounded-xl font-bold ${
                      net > 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                    }`}
                  >
                    <span>{net > 0 ? "Balance Due" : net < 0 ? "Customer Plus" : "Balance"}</span>
                    <span>Rs. {Math.abs(net).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="invoice-actions flex justify-end gap-3 mt-8 pt-6 border-t print:hidden relative">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button onClick={() => setShowPrintOptions((prev) => !prev)} className="bg-brand-500 text-white">
              Print Invoice
            </Button>
            {showPrintOptions && (
              <div className="absolute right-0 top-12 z-20 w-56 rounded-xl border border-gray-200 bg-white shadow-lg p-2 dark:bg-gray-900 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => handlePrint("CUSTOMER")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                >
                  Print Customer Invoice
                </button>
                <button
                  type="button"
                  onClick={() => handlePrint("LABOUR")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                >
                  Print Labour Invoice
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
