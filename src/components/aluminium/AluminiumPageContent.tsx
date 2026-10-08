"use client";

import React, { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import {
  aluminiumApi,
  AluminiumBranch,
  AluminiumCompany,
  AluminiumCompanyItem,
  AluminiumInvoice,
  AluminiumPriceItem,
  AluminiumStockEntry,
} from "@/lib/api/aluminium";
import { PlusIcon, DownloadIcon, HorizontaLDots, TrashBinIcon } from "@/icons";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import Pagination from "@/components/tables/Pagination";
import { usePagination } from "@/hooks/usePagination";

type InvoiceMode = "CUSTOMER" | "LABOUR";
type TabKey = "stock" | "price-list" | "invoices";

const emptyStockForm = () => ({
  companyId: "",
  companyItemId: "",
  profileQuery: "",
  type: "",
  length: "",
  unit: "PCS",
  quantity: 0,
  reference: "",
  notes: "",
});

const emptyPriceForm = () => ({
  type: "",
  length: "",
  unit: "ft",
  purchaseRate: 0,
  saleRate: 0,
  isActive: true,
});

const createInvoiceLine = () => ({
  priceItemId: "",
  type: "",
  length: "",
  quantity: 1,
  rate: 0,
});

function toMoney(value: number) {
  return `Rs. ${Number(value || 0).toLocaleString()}`;
}

function normalizeBranch(row: any): AluminiumBranch | null {
  if (row?.branch && row.branch.id) return row.branch;
  if (row?.branchName || row?.branchCode) {
    return {
      id: Number(row.branchId || 0),
      name: row.branchName || "Unassigned",
      address: row.branchAddress || row.address || null,
      code: row.branchCode || "",
    };
  }
  return null;
}

function normalizePriceItem(row: any): AluminiumPriceItem | null {
  if (row?.priceItem && row.priceItem.id) return row.priceItem;
  if (row?.priceType || row?.priceLength) {
    return {
      id: Number(row.priceItemId || 0),
      branchId: row.branchId ? Number(row.branchId) : null,
      type: row.priceType || row.type || "",
      length: row.priceLength || row.length || "",
      unit: row.priceUnit || row.unit || "ft",
      purchaseRate: Number(row.pricePurchaseRate || row.purchaseRate || 0),
      saleRate: Number(row.priceSaleRate || row.saleRate || 0),
      isActive: Boolean(row.priceIsActive ?? row.isActive ?? true),
      branch: normalizeBranch(row) || undefined,
    };
  }
  if (row?.type && row?.length) {
    return {
      id: Number(row.id || row.priceItemId || 0),
      branchId: row.branchId ? Number(row.branchId) : null,
      type: row.type || "",
      length: row.length || "",
      unit: row.unit || "ft",
      purchaseRate: Number(row.purchaseRate || 0),
      saleRate: Number(row.saleRate || 0),
      isActive: Boolean(row.isActive ?? true),
      branch: normalizeBranch(row) || undefined,
    };
  }
  return null;
}

function normalizeStockEntry(row: any): AluminiumStockEntry {
  return {
    ...row,
    branch: normalizeBranch(row) || undefined,
    priceItem: normalizePriceItem(row) || undefined,
  };
}

function normalizeInvoiceLine(row: any) {
  return {
    ...row,
    priceItem: normalizePriceItem(row) || undefined,
  };
}

function normalizeInvoice(row: any): AluminiumInvoice {
  return {
    ...row,
    branch: normalizeBranch(row) || undefined,
    items: Array.isArray(row?.items) ? row.items.map(normalizeInvoiceLine) : [],
  };
}

const PDF_RATE_COLUMNS = [
  "Natural",
  "H23/Pc Rail",
  "Brown/Pc Sahara",
  "Black/Multi/SS Dull",
  "Designer",
  "C.Shine",
];

type ParsedPdfRow = {
  id: string;
  type: string;
  thickness: string;
  rates: Array<number | null>;
  rawLine: string;
};

function parsePdfPriceRows(text: string): ParsedPdfRow[] {
  const thicknessPattern = /^(STD|NOR|STd|Nor|[0-9]+(?:\.[0-9]+)?MM)$/i;
  const rows: ParsedPdfRow[] = [];

  String(text || "")
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .forEach((line) => {
      const tokens = line.split(" ").filter(Boolean);
      const thicknessIndex = tokens.findIndex((token, idx) => idx > 0 && thicknessPattern.test(token));
      if (thicknessIndex <= 0) return;

      const type = tokens.slice(0, thicknessIndex).join(" ").trim();
      const thickness = tokens[thicknessIndex].toUpperCase();
      const rateTokens = tokens.slice(thicknessIndex + 1);
      const rates = rateTokens
        .map((token) => Number(String(token).replace(/,/g, "")))
        .filter((n) => !Number.isNaN(n));

      if (!type || rates.length === 0) return;

      rows.push({
        id: `${rows.length + 1}`,
        type,
        thickness,
        rates: [...rates.slice(0, 6), ...Array(Math.max(0, 6 - rates.length)).fill(null)],
        rawLine: line,
      });
    });

  return rows;
}

function PdfImportModal({
  isOpen,
  onClose,
  onImport,
}: {
  isOpen: boolean;
  onClose: () => void;
  onImport: (items: Array<{ type: string; length: string; unit: string; purchaseRate: number; saleRate: number; isActive: boolean }>) => Promise<void>;
}) {
  const [selectedColumn, setSelectedColumn] = useState(0);
  const [parsedRows, setParsedRows] = useState<ParsedPdfRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setSelectedColumn(0);
    setParsedRows([]);
    setSelectedIds({});
    setError(null);
    setFileName("");
  }, [isOpen]);

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setFileName(file.name);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      const data = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjs.getDocument({ data }).promise;
      let fullText = "";
      for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex += 1) {
        const page = await pdf.getPage(pageIndex);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: any) => ("str" in item ? item.str : ""))
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
        if (pageText) fullText += `${pageText}\n`;
      }
      const rows = parsePdfPriceRows(fullText);
      setParsedRows(rows);
      setSelectedIds(Object.fromEntries(rows.map((row) => [row.id, true])));
      if (!rows.length) {
        setError("No table rows were extracted. If this PDF is image-only, it may need OCR before importing.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to read the PDF file.");
      setParsedRows([]);
      setSelectedIds({});
    } finally {
      setLoading(false);
    }
  };

  const selectedRows = parsedRows.filter((row) => selectedIds[row.id]);

  const handleImport = async () => {
    if (selectedRows.length === 0) return;
    await onImport(
      selectedRows.map((row) => ({
        type: row.type,
        length: row.thickness,
        unit: "MM",
        purchaseRate: Number(row.rates[selectedColumn] || row.rates.find((rate) => Number(rate || 0) > 0) || 0),
        saleRate: Number(row.rates[selectedColumn] || row.rates.find((rate) => Number(rate || 0) > 0) || 0),
        isActive: true,
      }))
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1200px] m-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-h-[95vh] overflow-y-auto">
        <h4 className="text-2xl font-semibold mb-4">Import Aluminium Price List PDF</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Rate Column</Label>
            <select className="w-full border rounded-xl p-2 bg-transparent" value={selectedColumn} onChange={(e) => setSelectedColumn(Number(e.target.value))}>
              {PDF_RATE_COLUMNS.map((label, index) => (
                <option key={label} value={index}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>PDF File</Label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full border rounded-xl p-2 bg-transparent"
              onChange={(e) => void handleFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        {fileName && <p className="text-sm text-gray-500 mb-2">Loaded: {fileName}</p>}
        {loading && <p className="text-sm text-gray-500 mb-2">Reading PDF...</p>}
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

        <div className="max-h-[55vh] overflow-auto border rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
              <tr>
                <th className="p-3"></th>
                <th className="p-3">Profile Name</th>
                <th className="p-3">Thick</th>
                {PDF_RATE_COLUMNS.map((label) => (
                  <th className="p-3" key={label}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedRows.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={Boolean(selectedIds[row.id])}
                      onChange={(e) => setSelectedIds((prev) => ({ ...prev, [row.id]: e.target.checked }))}
                    />
                  </td>
                  <td className="p-3 font-medium">{row.type}</td>
                  <td className="p-3">{row.thickness}</td>
                  {row.rates.map((rate, idx) => (
                    <td className="p-3" key={`${row.id}-${idx}`}>
                      {rate ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={() => void handleImport()} disabled={!selectedRows.length}>
            Import Selected
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function AluminiumStockModal({
  isOpen,
  companies,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  companies: AluminiumCompany[];
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}) {
  const [form, setForm] = useState(emptyStockForm());
  const [companyItems, setCompanyItems] = useState<AluminiumCompanyItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [saving, setSaving] = useState(false);

  const selectedCompany = useMemo(
    () => companies.find((company) => String(company.id) === String(form.companyId)) || null,
    [companies, form.companyId]
  );

  useEffect(() => {
    if (!isOpen) return;
    setCompanyItems([]);
    setForm({
      companyId: String(companies[0]?.id || ""),
      companyItemId: "",
      profileQuery: "",
      type: "",
      length: "",
      unit: "PCS",
      quantity: 0,
      reference: "",
      notes: "",
    });
  }, [isOpen, companies]);

  useEffect(() => {
    if (!isOpen || !form.companyId) return;

    const loadCompanyItems = async () => {
      setLoadingItems(true);
      try {
        const res = await aluminiumApi.getCompanyItems(Number(form.companyId));
        setCompanyItems(res.data || res || []);
      } catch (error) {
        console.error("Failed to load company items", error);
        setCompanyItems([]);
      } finally {
        setLoadingItems(false);
      }
    };

    void loadCompanyItems();
  }, [isOpen, form.companyId]);

  const filteredItems = useMemo(() => {
    const query = String(form.profileQuery || "").trim().toLowerCase();
    if (!query) return companyItems;
    return companyItems.filter((item) => {
      const haystack = `${item.profileName} ${item.thickness} ${item.type} ${item.amount}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [companyItems, form.profileQuery]);

  const handleCompanyChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      companyId: value,
      companyItemId: "",
      profileQuery: "",
      type: "",
      length: "",
      quantity: 0,
    }));
    setCompanyItems([]);
  };

  useEffect(() => {
    if (!selectedCompany && companies.length > 0 && !form.companyId) {
      setForm((prev) => ({ ...prev, companyId: String(companies[0]?.id || "") }));
    }
  }, [companies, form.companyId, selectedCompany]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyId || !form.companyItemId || !form.type.trim() || !form.length.trim() || Number(form.quantity || 0) <= 0) return;

    setSaving(true);
    try {
      await onSubmit({
        companyId: Number(form.companyId),
        companyItemId: Number(form.companyItemId),
        type: form.type.trim(),
        length: form.length.trim(),
        unit: form.unit.trim() || "PCS",
        quantity: Number(form.quantity || 0),
        reference: form.reference.trim() || undefined,
        notes: form.notes.trim() || undefined,
      });
      setForm(emptyStockForm());
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[860px] m-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6">
        <h4 className="text-2xl font-semibold mb-4">Add Aluminium Stock</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Company</Label>
              <select className="w-full border rounded-xl p-2 bg-transparent" value={form.companyId} onChange={(e) => handleCompanyChange(e.target.value)}>
                <option value="">Select company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Select Profile</Label>
              <Input
                list="company-item-options"
                value={form.profileQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  const match = filteredItems.find(
                    (item) =>
                      `${item.profileName} | ${item.thickness} | ${item.type} | Rs. ${Number(item.amount || 0).toLocaleString()}` === value
                  );
                  setForm((prev) => ({
                    ...prev,
                    profileQuery: value,
                    companyItemId: match ? String(match.id) : "",
                    type: match?.profileName || "",
                  }));
                }}
                placeholder="Type to search profile name"
              />
              <datalist id="company-item-options">
                {filteredItems.map((item) => (
                  <option
                    key={item.id}
                    value={`${item.profileName} | ${item.thickness} | ${item.type} | Rs. ${Number(item.amount || 0).toLocaleString()}`}
                  />
                ))}
              </datalist>
            </div>
            <div>
              <Label>Length of One Piece</Label>
              <Input value={form.length} onChange={(e) => setForm({ ...form, length: e.target.value })} />
            </div>
            <div>
              <Label>Pieces Quantity</Label>
              <Input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
            </div>
            <div>
              <Label>Reference</Label>
              <Input value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} />
            </div>
          </div>

          {loadingItems && <div className="text-sm text-gray-500">Loading company items...</div>}

          <div>
            <Label>Notes</Label>
            <textarea
              className="w-full border rounded-xl p-3 h-24 bg-transparent"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Stock"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

function DeleteStockModal({
  isOpen,
  stockEntry,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  stockEntry: AluminiumStockEntry | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setConfirmText("");
    setDeleting(false);
  }, [isOpen, stockEntry]);

  const isAllowed = confirmText.trim().toUpperCase() === "DELETE";

  const handleConfirm = async () => {
    if (!stockEntry || !isAllowed) return;
    setDeleting(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[680px] m-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6">
        <div className="flex items-start gap-4 mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
            <TrashBinIcon className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-2xl font-semibold">Delete Stock Record</h4>
            <p className="text-sm text-gray-500 mt-1">
              This will permanently remove the selected stock entry from the list.
            </p>
          </div>
        </div>

        {stockEntry && (
          <div className="mb-5 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Profile</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {stockEntry.priceItem?.type || "-"} {stockEntry.priceItem?.length ? `(${stockEntry.priceItem.length})` : ""}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Quantity</p>
                <p className="font-medium text-gray-900 dark:text-white">{stockEntry.quantity}</p>
              </div>
              <div>
                <p className="text-gray-500">Remaining</p>
                <p className="font-medium text-gray-900 dark:text-white">{stockEntry.remainingQuantity}</p>
              </div>
              <div>
                <p className="text-gray-500">Reference</p>
                <p className="font-medium text-gray-900 dark:text-white">{stockEntry.reference || "-"}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Label>Type DELETE to confirm</Label>
          <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="DELETE" />
          <p className="text-xs text-gray-500">
            Deletion is only enabled after typing <span className="font-semibold">DELETE</span>.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={deleting}>
            Cancel
          </Button>
          <button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={!isAllowed || deleting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete Stock"}
          </button>
        </div>
      </div>
    </Modal>
  );
}


function CreateInvoiceModal({
  isOpen,
  priceItems,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  priceItems: AluminiumPriceItem[];
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}) {
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    invoiceType: "CUSTOMER" as InvoiceMode,
    remarks: "",
    discount: 0,
    carriage: 0,
    paidAmount: 0,
  });
  const [items, setItems] = useState([createInvoiceLine()]);
  const [saving, setSaving] = useState(false);

  const branchPriceItems = useMemo(
    () => priceItems.filter((item) => item.isActive),
    [priceItems]
  );

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + Number(item.quantity || 0) * Number(item.rate || 0), 0),
    [items]
  );
  const grandTotal = Number((subtotal - Number(form.discount || 0) + Number(form.carriage || 0)).toFixed(2));
  const balance = Number((grandTotal - Number(form.paidAmount || 0)).toFixed(2));

  const updateLine = (index: number, field: string, value: any) => {
    const next = [...items];
    const updated = { ...next[index], [field]: value };
    if (field === "priceItemId") {
      const selected = branchPriceItems.find((item) => String(item.id) === String(value));
      if (selected) {
        updated.type = selected.type;
        updated.length = selected.length;
        updated.rate = Number(selected.saleRate || 0);
      }
    }
    next[index] = updated;
    setItems(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName.trim() || !form.customerPhone.trim() || items.length === 0) return;
    setSaving(true);
    try {
      await onSubmit({
        customerName: form.customerName.trim(),
        customerPhone: form.customerPhone.trim(),
        customerAddress: form.customerAddress.trim() || undefined,
        invoiceType: form.invoiceType,
        remarks: form.remarks.trim() || undefined,
        discount: Number(form.discount || 0),
        carriage: Number(form.carriage || 0),
        paidAmount: Number(form.paidAmount || 0),
        items: items.map((item) => ({
          priceItemId: item.priceItemId ? Number(item.priceItemId) : undefined,
          type: item.type.trim(),
          length: item.length.trim(),
          quantity: Number(item.quantity || 0),
          rate: Number(item.rate || 0),
        })),
      });
      setItems([createInvoiceLine()]);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1280px] m-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-h-[95vh] overflow-y-auto">
        <h4 className="text-2xl font-semibold mb-4">New Aluminium Invoice</h4>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Customer Name</Label>
              <Input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} />
            </div>
            <div>
              <Label>Address</Label>
              <Input value={form.customerAddress} onChange={(e) => setForm({ ...form, customerAddress: e.target.value })} />
            </div>
            <div>
              <Label>Invoice Type</Label>
              <select
                className="w-full border rounded-xl p-2 bg-transparent"
                value={form.invoiceType}
                onChange={(e) => setForm({ ...form, invoiceType: e.target.value as InvoiceMode })}
              >
                <option value="CUSTOMER">Customer</option>
                <option value="LABOUR">Labour</option>
              </select>
            </div>
          </div>

          <div className="border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600">
                  <tr>
                    <th className="p-3">Item</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Length</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Rate</th>
                    <th className="p-3">Total</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">
                        <select
                          className="w-full border rounded-xl p-2 bg-transparent"
                          value={item.priceItemId}
                          onChange={(e) => updateLine(idx, "priceItemId", e.target.value)}
                        >
                          <option value="">Manual</option>
                          {branchPriceItems.map((priceItem) => (
                            <option key={priceItem.id} value={priceItem.id}>
                              {priceItem.type} - {priceItem.length}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2">
                        <Input value={item.type} onChange={(e) => updateLine(idx, "type", e.target.value)} />
                      </td>
                      <td className="p-2">
                        <Input value={item.length} onChange={(e) => updateLine(idx, "length", e.target.value)} />
                      </td>
                      <td className="p-2">
                        <Input type="number" value={item.quantity} onChange={(e) => updateLine(idx, "quantity", Number(e.target.value))} />
                      </td>
                      <td className="p-2">
                        <Input type="number" value={item.rate} onChange={(e) => updateLine(idx, "rate", Number(e.target.value))} />
                      </td>
                      <td className="p-2 font-semibold">{toMoney(Number(item.quantity || 0) * Number(item.rate || 0))}</td>
                      <td className="p-2">
                        <button
                          type="button"
                          onClick={() => setItems((prev) => prev.filter((_, rowIndex) => rowIndex !== idx))}
                          className="text-red-500 hover:bg-red-50 p-1 rounded-lg"
                        >
                          <TrashBinIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Button type="button" variant="outline" size="sm" onClick={() => setItems((prev) => [...prev, createInvoiceLine()])}>
            + Add Line
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Remarks</Label>
              <textarea
                className="w-full border rounded-xl p-3 h-28 bg-transparent"
                value={form.remarks}
                onChange={(e) => setForm({ ...form, remarks: e.target.value })}
              />
            </div>
            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span className="font-semibold">{toMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <Input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })} className="w-28 text-right" />
              </div>
              <div className="flex justify-between">
                <span>Carriage</span>
                <Input type="number" value={form.carriage} onChange={(e) => setForm({ ...form, carriage: Number(e.target.value) })} className="w-28 text-right" />
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total</span>
                <span>{toMoney(grandTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Paid Amount</span>
                <Input type="number" value={form.paidAmount} onChange={(e) => setForm({ ...form, paidAmount: Number(e.target.value) })} className="w-28 text-right" />
              </div>
              <div className="flex justify-between font-semibold text-brand-500">
                <span>Balance</span>
                <span>{toMoney(balance)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Create Invoice"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

function ViewInvoiceModal({
  isOpen,
  invoiceId,
  onClose,
  downloadRequest,
  onDownloadHandled,
}: {
  isOpen: boolean;
  invoiceId: number | null;
  onClose: () => void;
  downloadRequest: { key: number; mode: InvoiceMode } | null;
  onDownloadHandled?: () => void;
}) {
  const [invoice, setInvoice] = useState<AluminiumInvoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [activeMode, setActiveMode] = useState<InvoiceMode>("CUSTOMER");
  const [handledDownloadKey, setHandledDownloadKey] = useState<number | null>(null);

  const loadInvoice = async () => {
    if (!invoiceId) return;
    setLoading(true);
    try {
      const res = await aluminiumApi.getInvoiceById(invoiceId);
      setInvoice(normalizeInvoice(res.data || res));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && invoiceId) loadInvoice();
  }, [isOpen, invoiceId]);

  useEffect(() => {
    if (!isOpen || !downloadRequest?.key || !invoice) return;
    if (handledDownloadKey === downloadRequest.key) return;
    setActiveMode(downloadRequest.mode);
    void (async () => {
      await handleDownload(downloadRequest.mode);
      setHandledDownloadKey(downloadRequest.key);
      onDownloadHandled?.();
    })();
  }, [isOpen, downloadRequest?.key, invoice]);

  const subTotal = useMemo(
    () => (invoice?.items || []).reduce((sum, item) => sum + Number(item.value || Number(item.quantity || 0) * Number(item.rate || 0)), 0),
    [invoice]
  );
  const isLabour = activeMode === "LABOUR" || invoice?.invoiceType === "LABOUR";

  const handleDownload = async (mode: InvoiceMode) => {
    if (!invoice) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const node = document.getElementById("aluminium-printable-invoice");
      if (!node) return;

      const clone = node.cloneNode(true) as HTMLElement;
      const cloneId = "aluminium-pdf-clone";
      clone.id = cloneId;
      clone.style.position = "fixed";
      clone.style.left = "-10000px";
      clone.style.top = "0";
      clone.style.width = "794px";
      clone.style.background = "#fff";
      clone.style.padding = "24px";
      if (mode === "LABOUR") clone.classList.add("aluminium-labour-mode");
      const existing = document.getElementById(cloneId);
      if (existing) existing.remove();
      document.body.appendChild(clone);
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      const canvas = await html2canvas(clone, { scale: 1.2, backgroundColor: "#ffffff", useCORS: true });
      clone.remove();
      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });
      const ratio = Math.min(pdf.internal.pageSize.getWidth() / canvas.width, pdf.internal.pageSize.getHeight() / canvas.height);
      const width = canvas.width * ratio;
      const height = canvas.height * ratio;
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.72), "JPEG", (pdf.internal.pageSize.getWidth() - width) / 2, 0, width, height);
      pdf.save(`${invoice.invoiceNumber}-${mode}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className="max-w-[900px]">
        <div className="p-10">
          <Skeleton variant="rectangular" height={400} />
        </div>
      </Modal>
    );
  }

  if (!invoice) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[980px] m-4 max-h-[95vh] overflow-y-auto">
      <style>{`
        .aluminium-labour-mode .labour-hidden { display: none !important; }
        .aluminium-labour-mode .labour-dense { font-size: 10px !important; }
      `}</style>
      <div id="aluminium-printable-invoice" className="bg-white dark:bg-gray-900 rounded-3xl p-6">
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <h2 className="text-3xl font-black text-brand-500 uppercase">Madina Glass</h2>
            <p className="text-sm text-gray-500">Aluminium Invoice</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{invoice.invoiceNumber}</p>
            <p className="text-sm text-gray-500">{new Date(invoice.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 labour-hidden">
          <div className="rounded-2xl bg-gray-50 dark:bg-white/5 p-4">
            <p className="text-xs text-gray-500">Customer</p>
            <p className="font-semibold">{invoice.customerName}</p>
            <p className="text-sm text-gray-500">{invoice.customerPhone}</p>
          </div>
          <div className="rounded-2xl bg-gray-50 dark:bg-white/5 p-4">
            <p className="text-xs text-gray-500">Invoice Type</p>
            <p className="font-semibold">{invoice.invoiceType}</p>
            <p className="text-sm text-gray-500">Status: {invoice.status}</p>
          </div>
          <div className="rounded-2xl bg-gray-50 dark:bg-white/5 p-4">
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm text-gray-500">{invoice.customerAddress || "No address"}</p>
          </div>
        </div>

        <div className="overflow-x-auto border rounded-2xl">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="p-3">Item</th>
                <th className="p-3">Length</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Rate</th>
                <th className="p-3 labour-hidden">Value</th>
              </tr>
            </thead>
            <tbody>
              {(invoice.items || []).map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    <div className="font-medium">{item.type}</div>
                    <div className="text-xs text-gray-500">{item.priceItem?.type ? `${item.priceItem.type} catalogue item` : "Manual item"}</div>
                  </td>
                  <td className="p-3">{item.length}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{toMoney(Number(item.rate || 0))}</td>
                  <td className="p-3 labour-hidden">{toMoney(Number(item.value || Number(item.quantity || 0) * Number(item.rate || 0)))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-2xl border p-4 labour-hidden">
            <p className="text-sm font-semibold mb-2">Remarks</p>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoice.remarks || "No remarks"}</p>
          </div>
          <div className="rounded-2xl bg-gray-50 dark:bg-white/5 p-4 space-y-2">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>{toMoney(subTotal)}</span>
            </div>
            <div className="flex justify-between labour-hidden">
              <span>Discount</span>
              <span>{toMoney(invoice.discount)}</span>
            </div>
            <div className="flex justify-between labour-hidden">
              <span>Carriage</span>
              <span>{toMoney(invoice.carriage)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Grand Total</span>
              <span>{toMoney(invoice.billValue)}</span>
            </div>
            <div className="flex justify-between labour-hidden">
              <span>Paid</span>
              <span>{toMoney(invoice.paidAmount)}</span>
            </div>
            <div className="flex justify-between font-semibold text-brand-500">
              <span>Balance</span>
              <span>{toMoney(invoice.balance)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 labour-hidden">
          <Button variant="outline" onClick={() => handleDownload("CUSTOMER")} disabled={downloading}>
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download Customer
          </Button>
          <Button variant="outline" onClick={() => handleDownload("LABOUR")} disabled={downloading}>
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download Labour
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default function AluminiumPageContent() {
  const [activeTab, setActiveTab] = useState<TabKey>("stock");
  const [companies, setCompanies] = useState<AluminiumCompany[]>([]);
  const [priceItems, setPriceItems] = useState<AluminiumPriceItem[]>([]);
  const [stockEntries, setStockEntries] = useState<AluminiumStockEntry[]>([]);
  const [invoices, setInvoices] = useState<AluminiumInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [pdfImportOpen, setPdfImportOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [viewInvoiceId, setViewInvoiceId] = useState<number | null>(null);
  const [downloadRequest, setDownloadRequest] = useState<{ key: number; mode: InvoiceMode } | null>(null);
  const [actionMenu, setActionMenu] = useState<{ id: number; top: number; left: number } | null>(null);
  const [deleteStockEntry, setDeleteStockEntry] = useState<AluminiumStockEntry | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [companyRes, priceRes, stockRes, invoiceRes] = await Promise.all([
        aluminiumApi.getCompanies(),
        aluminiumApi.getPriceList(),
        aluminiumApi.getStock(),
        aluminiumApi.getInvoices(),
      ]);
      setCompanies(companyRes.data || companyRes || []);
      setPriceItems((priceRes.data || priceRes || []).map((row: any) => normalizePriceItem(row) || row));
      setStockEntries((stockRes.data || stockRes || []).map(normalizeStockEntry));
      setInvoices((invoiceRes.data || invoiceRes || []).map(normalizeInvoice));
    } catch (error) {
      console.error("Failed to load aluminium data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const { currentPage, totalPages, paginatedItems, goToPage, totalItems } = usePagination(invoices, {
    itemsPerPage: 10,
  });

  const stockValue = useMemo(
    () => stockEntries.reduce((sum, entry) => sum + Number(entry.quantity || 0) * Number(entry.priceItem?.saleRate || 0), 0),
    [stockEntries]
  );

  const handleRefresh = async () => {
    await loadData();
  };

  const handleCreateStock = async (data: any) => {
    await aluminiumApi.addStock(data);
    await handleRefresh();
  };

  const handleCreatePriceItem = async (data: any) => {
    await aluminiumApi.createPriceItem(data);
    await handleRefresh();
  };

  const handleImportPdfRows = async (items: Array<{ type: string; length: string; unit: string; purchaseRate: number; saleRate: number; isActive: boolean }>) => {
    await aluminiumApi.seedPriceList(items);
    await handleRefresh();
  };

  const handleCreateInvoice = async (data: any) => {
    await aluminiumApi.createInvoice(data);
    await handleRefresh();
  };

  const handleDeleteStock = async () => {
    if (!deleteStockEntry) return;
    await aluminiumApi.deleteStock(deleteStockEntry.id);
    setDeleteStockEntry(null);
    await handleRefresh();
  };

  const handleOpenInvoice = (id: number) => {
    setViewInvoiceId(id);
  };

  const handleDownloadInvoice = (id: number, mode: InvoiceMode) => {
    setViewInvoiceId(id);
    setDownloadRequest({ key: Date.now(), mode });
  };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".aluminium-action-toggle")) setActionMenu(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleToggleActionMenu = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setActionMenu((prev) =>
      prev?.id === id
        ? null
        : {
            id,
            top: Math.min(window.innerHeight - 220, rect.bottom + 6),
            left: Math.max(8, Math.min(rect.left - 160, window.innerWidth - 240)),
          }
    );
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Aluminium" subtitle="Stock, price list and invoices" />
        <Skeleton variant="rectangular" height={420} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Aluminium"
        subtitle="Manage aluminium stock, price list items and invoices."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Aluminium" },
        ]}
        action={
          <div className="flex gap-2 flex-wrap">
            <Button variant={activeTab === "stock" ? "primary" : "outline"} onClick={() => setActiveTab("stock")}>
              Stock
            </Button>
            <Button variant={activeTab === "invoices" ? "primary" : "outline"} onClick={() => setActiveTab("invoices")}>
              Invoices
            </Button>
            <Button variant="outline" onClick={() => setStockModalOpen(true)}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Stock
            </Button>
            <Button onClick={() => setInvoiceModalOpen(true)}>
              <PlusIcon className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl border bg-white dark:bg-white/5 p-4">
          <p className="text-xs text-gray-500">Stock Lines</p>
          <p className="text-2xl font-bold">{stockEntries.length}</p>
        </div>
        <div className="rounded-2xl border bg-white dark:bg-white/5 p-4">
          <p className="text-xs text-gray-500">Estimated Stock Value</p>
          <p className="text-2xl font-bold">{toMoney(stockValue)}</p>
        </div>
      </div>

      {activeTab === "stock" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900">
                  <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Length</th>
                    <th className="px-6 py-4">Qty</th>
                    <th className="px-6 py-4">Remaining</th>
                    <th className="px-6 py-4">Selling Rate</th>
                    <th className="px-6 py-4">Reference</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {stockEntries.map((entry) => (
                    <tr key={entry.id} className="text-sm">
                      <td className="px-6 py-4">{entry.priceItem?.type || "-"}</td>
                      <td className="px-6 py-4">{entry.priceItem?.length || "-"}</td>
                      <td className="px-6 py-4">{entry.quantity}</td>
                      <td className="px-6 py-4">{entry.remainingQuantity}</td>
                      <td className="px-6 py-4">{toMoney(Number(entry.priceItem?.saleRate || 0))}</td>
                      <td className="px-6 py-4 text-gray-500">{entry.reference || "-"}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setDeleteStockEntry(entry)}
                          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 ring-1 ring-inset ring-red-200 transition hover:bg-red-50 dark:text-red-400 dark:ring-red-900/40 dark:hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "price-list" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900">
                  <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Length</th>
                    <th className="px-6 py-4">Unit</th>
                    <th className="px-6 py-4">Purchase Rate</th>
                    <th className="px-6 py-4">Sale Rate</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {priceItems.map((item) => (
                    <tr key={item.id} className="text-sm">
                      <td className="px-6 py-4 font-medium">{item.type}</td>
                      <td className="px-6 py-4">{item.length}</td>
                      <td className="px-6 py-4">{item.unit}</td>
                      <td className="px-6 py-4">{toMoney(Number(item.purchaseRate || 0))}</td>
                      <td className="px-6 py-4">{toMoney(Number(item.saleRate || 0))}</td>
                      <td className="px-6 py-4">{item.isActive ? "Active" : "Inactive"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "invoices" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900">
                  <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-4">Invoice</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Balance</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {paginatedItems.map((invoice) => (
                    <tr key={invoice.id} className="text-sm hover:bg-gray-50 dark:hover:bg-white/5">
                      <td className="px-6 py-4 font-medium">{invoice.invoiceNumber}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{invoice.customerName}</div>
                        <div className="text-xs text-gray-500">{invoice.customerPhone}</div>
                      </td>
                      <td className="px-6 py-4">{invoice.invoiceType}</td>
                      <td className="px-6 py-4 font-semibold">{toMoney(invoice.billValue)}</td>
                      <td className="px-6 py-4">{toMoney(invoice.balance)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button className="text-brand-500 hover:underline" onClick={() => handleOpenInvoice(invoice.id)}>
                            View
                          </button>
                          <button className="text-brand-500 hover:underline" onClick={() => handleDownloadInvoice(invoice.id, "CUSTOMER")}>
                            Download Customer
                          </button>
                          <button className="text-brand-500 hover:underline" onClick={() => handleDownloadInvoice(invoice.id, "LABOUR")}>
                            Download Labour
                          </button>
                          <button className="aluminium-action-toggle" onClick={(e) => handleToggleActionMenu(e, invoice.id)}>
                            <HorizontaLDots className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {actionMenu && (
            <div
              className="fixed z-[120] w-[220px] rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark py-1"
              style={{ top: actionMenu.top, left: actionMenu.left }}
            >
              <button
                type="button"
                onClick={() => {
                  handleOpenInvoice(actionMenu.id);
                  setActionMenu(null);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/[0.05]"
              >
                View Invoice
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadInvoice(actionMenu.id, "CUSTOMER");
                  setActionMenu(null);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10"
              >
                Download Customer PDF
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadInvoice(actionMenu.id, "LABOUR");
                  setActionMenu(null);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10"
              >
                Download Labour PDF
              </button>
            </div>
          )}

        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            totalItems={totalItems}
            itemsPerPage={10}
          />
        </div>
      )}

      <PdfImportModal
        isOpen={pdfImportOpen}
        onClose={() => setPdfImportOpen(false)}
        onImport={handleImportPdfRows}
      />

      <AluminiumStockModal
        isOpen={stockModalOpen}
        companies={companies}
        onClose={() => setStockModalOpen(false)}
        onSubmit={handleCreateStock}
      />


      <CreateInvoiceModal
        isOpen={invoiceModalOpen}
        priceItems={priceItems}
        onClose={() => setInvoiceModalOpen(false)}
        onSubmit={handleCreateInvoice}
      />

      <ViewInvoiceModal
        isOpen={Boolean(viewInvoiceId)}
        invoiceId={viewInvoiceId}
        onClose={() => setViewInvoiceId(null)}
        downloadRequest={downloadRequest}
        onDownloadHandled={() => setDownloadRequest(null)}
      />

      <DeleteStockModal
        isOpen={Boolean(deleteStockEntry)}
        stockEntry={deleteStockEntry}
        onClose={() => setDeleteStockEntry(null)}
        onConfirm={handleDeleteStock}
      />
    </div>
  );
}
