"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { Loader } from "lucide-react";
import { estimatesApi } from "@/lib/api/estimate";

export default function ViewEstimateModal({ isOpen, onClose, estimateId, printRequest, onPrintRequestHandled }: any) {
  const [estimate, setEstimate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [handledPrintRequestKey, setHandledPrintRequestKey] = useState<number | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const MARKET_SIZE_STEPS = [6, 9, 12, 15, 18, 21, 24, 28, 30, 33, 36, 42, 45, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120, 126, 132, 138, 144];

  const getSizeLimits = (thickness: string) => {
    if (String(thickness) === "3") return { maxWidth: 78, maxHeight: 96 };
    return { maxWidth: 144, maxHeight: 144 };
  };

  const getRoundedMarketSize = (actual: number, maxAllowed: number) => {
    const value = Number(actual);
    if (!value) return null;
    if (value > maxAllowed) return null;
    return MARKET_SIZE_STEPS.find((size) => value <= size && size <= maxAllowed) ?? null;
  };

  const getStandardSizeForActual = (actualWidth: number, actualHeight: number, thickness: string, glassType: string) => {
    const limits = getSizeLimits(thickness);
    const stdWidth = getRoundedMarketSize(actualWidth, limits.maxWidth);
    const stdHeight = getRoundedMarketSize(actualHeight, limits.maxHeight);

    if (!actualWidth || !actualHeight) return "—";
    if (!stdWidth || !stdHeight) return "Oversize";

    return `${stdWidth}\" x ${stdHeight}\"`;
  };

  const getStdSizeLabel = (item: any) => {
    if (item?.standardSize) return item.standardSize;
    if (item?.SWidth && item?.SHeight) return `${item.SWidth} x ${item.SHeight}`;
    return getStandardSizeForActual(Number(item?.width || 0), Number(item?.height || 0), String(item?.glassThickness || "5"), String(item?.glassType || "CLEAR"));
  };

  const getItemGroupKey = (item: any) => {
    const thicknessRaw = String(item?.glassThickness || "").trim();
    const thickness = thicknessRaw ? `${thicknessRaw}mm` : "";
    const shade = String(item?.glassShade || item?.glassType || "").trim();
    const name = String(item?.itemName || "").trim();
    if (thickness && shade) return `${thickness} ${shade}`;
    if (thickness) return thickness;
    if (shade) return shade;
    return name || "UNSPECIFIED";
  };

  const loadEstimate = async () => {
    if (!estimateId) return;
    const res = await estimatesApi.getEstimateById(estimateId);
    setEstimate(res.data || res);
  };

  useEffect(() => {
    if (isOpen && estimateId) {
      setLoading(true);
      loadEstimate().finally(() => setLoading(false));
    }
  }, [isOpen, estimateId]);

  const totals = useMemo(() => {
    const items = estimate?.items || [];
    return {
      qty: items.reduce((acc: number, item: any) => acc + Number(item.qtyPcs || 0), 0),
      sqft: Number(items.reduce((acc: number, item: any) => acc + Number(item.totalSqft || 0), 0).toFixed(2)),
    };
  }, [estimate?.items]);

  const groupedRows = useMemo(() => {
    const groups = new Map<
      string,
      { items: Array<{ item: any; index: number }>; qty: number; sqft: number }
    >();

    (estimate?.items || []).forEach((item: any, index: number) => {
      const key = getItemGroupKey(item);
      if (!groups.has(key)) {
        groups.set(key, { items: [], qty: 0, sqft: 0 });
      }
      const current = groups.get(key)!;
      current.items.push({ item, index });
      current.qty += Number(item?.qtyPcs || 0);
      current.sqft += Number(item?.totalSqft || 0);
    });

    const rows: Array<{
      type: "group" | "item" | "summary";
      key: string;
      item?: any;
      index?: number;
      qty?: number;
      sqft?: number;
    }> = [];

    groups.forEach((value, key) => {
      rows.push({ type: "group", key });
      value.items.forEach(({ item, index }) => rows.push({ type: "item", key, item, index }));
      rows.push({
        type: "summary",
        key,
        qty: value.qty,
        sqft: Number(value.sqft.toFixed(2)),
      });
    });

    return rows;
  }, [estimate?.items]);

  const subTotal = useMemo(() => {
    if (!estimate?.items) return 0;
    return estimate.items.reduce((acc: number, item: any) => acc + Number(item.value || 0), 0);
  }, [estimate]);

  const discountPercent = useMemo(() => {
    if (estimate?.discountPercent !== undefined && estimate?.discountPercent !== null) return Number(estimate.discountPercent) || 0;
    if (!subTotal) return 0;
    return Number((((Number(estimate?.discount || 0) / subTotal) * 100) || 0).toFixed(2));
  }, [estimate, subTotal]);

  const billValue = Number(estimate?.billValue || 0);
  const tableColSpan = 8;
  const groupSummaryLabelColSpan = 4;

  const handlePrint = () => {
    const cleanupPrintDom = () => {
      document.body.classList.remove("printing-estimate");
      const node = document.getElementById("estimate-print-root");
      if (node) node.remove();
    };

    setTimeout(() => {
      const estimateNode = document.getElementById("printable-estimate");
      if (!estimateNode) return;

      const existingNode = document.getElementById("estimate-print-root");
      if (existingNode) existingNode.remove();

      const printRoot = document.createElement("div");
      printRoot.id = "estimate-print-root";
      printRoot.style.display = "none";
      printRoot.innerHTML = estimateNode.outerHTML;
      document.body.appendChild(printRoot);

      document.body.classList.add("printing-estimate");
      window.addEventListener("afterprint", cleanupPrintDom, { once: true });
      window.print();
      setTimeout(cleanupPrintDom, 1200);
    }, 120);
  };

  const handleDownloadPdf = async () => {
    const estimateNode = document.getElementById("printable-estimate");
    if (!estimateNode || downloadingPdf) return;
    setDownloadingPdf(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const cloneId = "pdf-capture-estimate";
      const existing = document.getElementById(cloneId);
      if (existing) existing.remove();
      const clone = estimateNode.cloneNode(true) as HTMLElement;
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
          white-space: pre-wrap !important;
          overflow: visible !important;
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
      clone.querySelectorAll(".print\\:hidden").forEach((el) => el.remove());
      document.body.appendChild(clone);
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

      const rect = clone.getBoundingClientRect();
      const captureWidth = Math.ceil(clone.scrollWidth || rect.width);
      const captureHeight = Math.ceil(clone.scrollHeight || rect.height);
      const renderScale = 1.45;
      const jpegQuality = 0.86;
      const canvas = await html2canvas(clone, {
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
        const imgData = pageCanvas.toDataURL("image/jpeg", jpegQuality);
        if (pageIndex > 0) pdf.addPage();
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pageWidth, pageHeight, "F");
        const imgHeightMm = sliceHeight / scale;
        pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, imgHeightMm, undefined, "MEDIUM");
        y += sliceHeight - overlap;
        pageIndex += 1;
      }

      const safeNumber = estimate?.estimateNumber || `EST-${estimate?.id || ""}`;
      pdf.save(`${safeNumber}.pdf`);
    } finally {
      setDownloadingPdf(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !estimate || !printRequest?.key) return;
    if (handledPrintRequestKey === printRequest.key) return;
    setHandledPrintRequestKey(printRequest.key);
    handlePrint();
    onPrintRequestHandled?.();
  }, [isOpen, estimate, printRequest, handledPrintRequestKey, onPrintRequestHandled]);

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className="max-w-[960px]">
        <div className="p-8 flex items-center justify-center min-h-[220px]"><Loader className="animate-spin" /></div>
      </Modal>
    );
  }

  if (!estimate) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[980px] m-4 max-h-[95vh] overflow-y-auto">
      <style>{`
        @media print {
          @page { size: auto; margin: 5mm; }
          html, body { overflow: visible !important; background: #fff !important; }
          body.printing-estimate > * { display: none !important; }
          body.printing-estimate #estimate-print-root { display: block !important; }
          body.printing-estimate #estimate-print-root #printable-estimate { box-shadow: none !important; }
          body.printing-estimate #estimate-print-root #printable-estimate,
          body.printing-estimate #estimate-print-root #printable-estimate * { color: #000000 !important; }
          #printable-estimate { font-size: 11px !important; line-height: 1.2 !important; }
          .print-title { font-size: 21px !important; line-height: 1.15 !important; }
          .print-header { padding-bottom: 8px !important; }
          .print-meta { margin-top: 8px !important; margin-bottom: 8px !important; gap: 10px !important; }
          .print-avoid-break { break-inside: avoid; page-break-inside: avoid; }
          .print-no-wrap { white-space: nowrap !important; }
          .print\\:hidden { display: none !important; }
          .totals-remarks { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 10px !important; align-items: start !important; }
          .print-compact th, .print-compact td { padding: 4px 6px !important; font-size: 9.75px !important; line-height: 1.12 !important; }
          .print-remarks p { font-size: 9px !important; line-height: 1.18 !important; white-space: pre-wrap !important; max-height: none !important; overflow: visible !important; }
        }
      `}</style>
      <div
        className="print-sheet p-8 bg-gradient-to-br from-white via-slate-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 rounded-3xl"
        id="printable-estimate"
      >
        <div className="rounded-2xl border border-slate-200 dark:border-gray-800 p-6 bg-white/90 dark:bg-gray-900/80 shadow-sm">
          <div className="print-avoid-break print-header flex justify-between items-start border-b pb-6 border-gray-100 dark:border-gray-800">
            <div className="flex items-start gap-3">
              <div>
                <h1 className="print-title text-3xl font-black tracking-tight text-brand-500 uppercase">Madina Glass</h1>
                <p className="text-sm text-gray-500">Aluminium & Glass Works Specialist</p>
              </div>
              <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300 print:hidden">
                ESTIMATE
              </span>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">{estimate.estimateNumber}</h2>
              <p className="text-sm text-gray-500">{new Date(estimate.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="print-avoid-break print-meta grid grid-cols-2 gap-8 my-8 text-sm">
            <div>
              <h4 className="text-gray-400 uppercase font-semibold text-xs mb-2">Estimate For:</h4>
              <p className="font-bold text-lg">{estimate.name}</p>
              <p className="text-gray-600">{estimate.phone}</p>
              <p className="text-gray-600 italic">{estimate.address || "No delivery address"}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl">
              <div>
                <p className="text-gray-400 text-xs">Cutter</p>
                <p className="font-medium">{estimate.cutterName || "—"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Driver</p>
                <p className="font-medium">{estimate.driverName || "—"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Fitter</p>
                <p className="font-medium">{estimate.fitterName || "—"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Prepared By</p>
                <p className="font-medium text-brand-500">{estimate.admin?.name || "Admin"}</p>
              </div>
            </div>
          </div>

          <table className="print-compact w-full text-left mb-6 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 uppercase">
                <th className="py-3 px-3">Serial #</th>
                <th className="py-3 px-3">Item Description</th>
                <th className="py-3 px-3">Size (WxH)</th>
                <th className="py-3 px-3">Std Size</th>
                <th className="py-3 px-3">Qty</th>
                <th className="py-3 px-3">Sqft</th>
                <th className="py-3 px-3">Rate</th>
                <th className="py-3 px-3 text-right">Value</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {groupedRows.map((row, idx) => {
                if (row.type === "group") {
                  return (
                    <tr key={`group-${row.key}-${idx}`} className="bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200 dark:border-gray-700">
                      <td colSpan={tableColSpan} className="py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                        {row.key}
                      </td>
                    </tr>
                  );
                }

                if (row.type === "summary") {
                  return (
                    <tr key={`summary-${row.key}-${idx}`} className="bg-gray-50/70 dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-700">
                      <td colSpan={groupSummaryLabelColSpan} className="py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                        Group Total
                      </td>
                      <td className="py-2 px-3 font-semibold">{Number(row.qty || 0).toLocaleString()}</td>
                      <td className="py-2 px-3 font-semibold">{Number(row.sqft || 0).toLocaleString()}</td>
                      <td className="py-2 px-3 text-gray-400">—</td>
                      <td className="py-2 px-3 text-right text-gray-400">—</td>
                    </tr>
                  );
                }

                const item = row.item;
                return (
                  <tr key={`item-${row.index}`} className="border-t border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-3 font-mono">{item.SerialNum || "—"}</td>
                    <td className="py-3 px-3 font-medium">{item.itemName}</td>
                    <td className="py-3 px-3 text-gray-500 print-no-wrap">{item.width}" × {item.height}"</td>
                    <td className="py-3 px-3 text-gray-500 print-no-wrap">{getStdSizeLabel(item)}</td>
                    <td className="py-3 px-3">{item.qtyPcs}</td>
                    <td className="py-3 px-3 font-mono">{item.totalSqft}</td>
                    <td className="py-3 px-3">Rs. {Number(item.rate || 0).toLocaleString()}</td>
                    <td className="py-3 px-3 text-right font-bold">Rs. {Number(item.value || 0).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex flex-wrap items-center justify-end gap-3 mb-6 text-sm">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 bg-gray-50 dark:bg-white/5">
              <span className="text-gray-500">Total Qty</span>
              <span className="ml-2 font-semibold text-gray-800 dark:text-gray-100">{totals.qty.toLocaleString()}</span>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 bg-gray-50 dark:bg-white/5">
              <span className="text-gray-500">Total Sqft</span>
              <span className="ml-2 font-semibold text-gray-800 dark:text-gray-100">{totals.sqft.toLocaleString()}</span>
            </div>
          </div>

          <div className="totals-remarks print-avoid-break mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {estimate.remarks ? (
              <div className="print-remarks rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-white/5 p-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Description / Remarks</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">{estimate.remarks}</p>
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
                  <span>- Rs. {Number(estimate.discount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Carriage</span>
                  <span>Rs. {Number(estimate.carriage || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span className="text-brand-500">Rs. {billValue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t print:hidden relative">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button onClick={handlePrint} className="bg-brand-500 text-white">
              Print Estimate
            </Button>
            <Button variant="outline" onClick={handleDownloadPdf} disabled={downloadingPdf}>
              {downloadingPdf ? "Preparing..." : "Download PDF"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
