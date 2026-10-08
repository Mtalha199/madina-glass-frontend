"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import { aluminiumApi, AluminiumCompany, AluminiumCompanyItem } from "@/lib/api/aluminium";


type ParsedPdfRow = {
  id: string;
  profileName: string;
  thickness: string;
  rates: Array<number | null>;
};

export const PDF_RATE_COLUMNS = [
  "Natural",
  "H23/Pc Rall",
  "Brown/Pc",
  "Sahara",
  "Black/Multi/SS Dull",
  "Designer",
  "C.Shine",
];

const MAX_NAME_WORDS = 5;

// Keywords and header strings to skip completely during parsing
const IGNORE_PATTERNS = [
  /Economy Fix Glazing/i,
  /Shop Front Section/i,
  /Kick Plates Profiles/i,
  /Profiles/i,
  /Section/i,
  /Price List/i,
  /Effected From/i,
  /Profile Name/i,
  /Thick/i,
];

// Flexible regex to handle both 6 and 7 rate numbers with optional decimals
const NUMBER_RUN_RE = /\b(?:\d{2,4}(?:\.\d+)?\s+){5,6}\d{2,4}(?:\.\d+)?\b/;

function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

export function parsePdfPriceRows(text: string): ParsedPdfRow[] {
  const cleaned = cleanText(String(text || ""));
  const rows: ParsedPdfRow[] = [];
  const lines = cleaned.split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (IGNORE_PATTERNS.some((pattern) => pattern.test(trimmedLine))) {
      continue;
    }

    const tokens = trimmedLine.split(/\s+/);
    if (tokens.length < 3) continue;

    // Identify trailing numeric tokens as rates
    const rateValues: number[] = [];
    let splitIndex = tokens.length;

    for (let i = tokens.length - 1; i >= 0; i--) {
      const num = Number(tokens[i]);
      // Check if token is a valid number (and not a thickness label like "2MM")
      if (!isNaN(num) && !tokens[i].toUpperCase().endsWith("MM") && tokens[i] !== "Std" && tokens[i] !== "Nor") {
        rateValues.unshift(num);
        splitIndex = i;
      } else {
        break;
      }
    }

    if (rateValues.length === 0) continue;

    const remainingTokens = tokens.slice(0, splitIndex);
    if (remainingTokens.length === 0) continue;

    // Thickness is usually the last token before the rates
    let thickness = remainingTokens[remainingTokens.length - 1];
    let nameTokens = remainingTokens.slice(0, -1);

    if (nameTokens.length === 0) {
      nameTokens = [thickness];
      thickness = "Nor";
    }

    if (nameTokens.length > MAX_NAME_WORDS) {
      nameTokens = nameTokens.slice(-MAX_NAME_WORDS);
    }

    const profileName = nameTokens.join(" ");
    if (!profileName || !/[A-Za-z0-9]/.test(profileName)) continue;

    // Map extracted rates to columns
    const rates: Array<number | null> = PDF_RATE_COLUMNS.map((_, i) => (i < rateValues.length ? rateValues[i] : null));

    rows.push({
      id: `${profileName}__${thickness}__${rows.length}`,
      profileName,
      thickness,
      rates,
    });
  }

  return rows;
}


function ItemModal({
  isOpen,
  item,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  item?: AluminiumCompanyItem | null;
  onClose: () => void;
  onSubmit: (data: { profileName: string; thickness: string; type: string; amount: number }) => Promise<void>;
}) {
  const [form, setForm] = useState({ profileName: "", thickness: "", type: "", amount: 0 });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setForm({
      profileName: item?.profileName || "",
      thickness: item?.thickness || "",
      type: item?.type || "",
      amount: Number(item?.amount || 0),
    });
  }, [item, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.profileName.trim() || !form.thickness.trim() || !form.type.trim()) return;
    setSaving(true);
    try {
      await onSubmit({
        profileName: form.profileName.trim(),
        thickness: form.thickness.trim(),
        type: form.type.trim(),
        amount: Number(form.amount || 0),
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[720px] m-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6">
        <h4 className="text-2xl font-semibold mb-4">{item ? "Edit Item" : "Add Company Item"}</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Profile Name</Label>
              <Input value={form.profileName} onChange={(e) => setForm({ ...form, profileName: e.target.value })} />
            </div>
            <div>
              <Label>Thickness</Label>
              <Input value={form.thickness} onChange={(e) => setForm({ ...form, thickness: e.target.value })} />
            </div>
            <div>
              <Label>Type</Label>
              <Input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="Natural, C.Shine, ..." />
            </div>
            <div>
              <Label>Amount</Label>
              <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : item ? "Update Item" : "Save Item"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

function DeleteAllModal({
  isOpen,
  companyName,
  itemCount,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  companyName: string;
  itemCount: number;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  const [confirmText, setConfirmText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setConfirmText("");
    setSaving(false);
  }, [isOpen]);

  const canDelete = confirmText.trim() === companyName.trim() && itemCount > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[720px] m-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6">
        <div className="mb-4">
          <p className="text-sm font-semibold text-red-500">Delete all company items</p>
          <h4 className="text-2xl font-semibold mt-1">Remove every item from {companyName}</h4>
          <p className="mt-2 text-sm text-gray-500">
            This will permanently delete {itemCount} item{itemCount === 1 ? "" : "s"} from this company. This cannot be undone.
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50/70 p-4 dark:border-red-500/30 dark:bg-red-500/10">
          <Label>Type the company name to confirm</Label>
          <Input
            className="mt-2"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={companyName}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={!canDelete || saving}
            onClick={async () => {
              setSaving(true);
              try {
                await onConfirm();
                onClose();
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? "Deleting..." : "Delete All"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function PdfImportModal({
  isOpen,
  onClose,
  onImport,
}: {
  isOpen: boolean;
  onClose: () => void;
  onImport: (items: Array<{ profileName: string; thickness: string; type: string; amount: number }>) => Promise<void>;
}) {
  const [parsedRows, setParsedRows] = useState<ParsedPdfRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setParsedRows([]);
    setSelectedIds({});
    setError(null);
  }, [isOpen]);

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      const data = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjs.getDocument({ data }).promise;
      let fullText = "";

      for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex += 1) {
        const page = await pdf.getPage(pageIndex);
        const content = await page.getTextContent();

        const items = (content.items as any[]).filter((item) => "str" in item && item.str);
        if (items.length === 0) continue;

        // Determine X midpoint to separate the two side-by-side tables per page layout
        const xCoords = items.map((item) => item.transform[4]);
        const minX = Math.min(...xCoords);
        const maxX = Math.max(...xCoords);
        const midX = (minX + maxX) / 2;

        const leftItems = items.filter((item) => item.transform[4] < midX);
        const rightItems = items.filter((item) => item.transform[4] >= midX);

        // Helper to convert items list into structured text lines
        const processItemsToText = (columnItems: any[]) => {
          const LINE_Y_TOLERANCE = 3;
          const lines: { y: number; parts: { x: number; str: string }[] }[] = [];

          for (const item of columnItems) {
            const x = item.transform[4];
            const y = item.transform[5];
            let line = lines.find((l) => Math.abs(l.y - y) < LINE_Y_TOLERANCE);
            if (!line) {
              line = { y, parts: [] };
              lines.push(line);
            }
            line.parts.push({ x, str: item.str });
          }

          lines.sort((a, b) => b.y - a.y); // top to bottom
          return lines
            .map((line) =>
              line.parts
                .sort((a, b) => a.x - b.x)
                .map((p) => p.str)
                .join(" ")
            )
            .join("\n");
        };

        const leftText = processItemsToText(leftItems);
        const rightText = processItemsToText(rightItems);

        if (leftText) fullText += `${leftText}\n`;
        if (rightText) fullText += `${rightText}\n`;
      }

      const rows = parsePdfPriceRows(fullText);
      setParsedRows(rows);
      setSelectedIds(Object.fromEntries(rows.map((row) => [row.id, true])));
      if (!rows.length) setError("No rows were extracted from the PDF.");
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
  const allSelected = parsedRows.length > 0 && selectedRows.length === parsedRows.length;
  const toggleAll = (checked: boolean) => setSelectedIds(Object.fromEntries(parsedRows.map((row) => [row.id, checked])));

  const expandedCount = selectedRows.reduce((sum, row) => sum + row.rates.filter((r) => r != null).length, 0);

  const handleImport = async () => {
    if (!selectedRows.length) return;
    const items = selectedRows.flatMap((row) =>
      row.rates
        .map((amount, idx) => ({ amount, type: PDF_RATE_COLUMNS[idx] }))
        .filter((r): r is { amount: number; type: string } => r.amount != null)
        .map(({ amount, type }) => ({
          profileName: row.profileName,
          thickness: row.thickness,
          type,
          amount,
        }))
    );
    if (!items.length) return;

    setImporting(true);
    setError(null);
    try {
      await onImport(items);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Import failed. Please try again.");
    } finally {
      setImporting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1200px] m-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-h-[95vh] overflow-y-auto">
        <h4 className="text-2xl font-semibold mb-4">Import Company Items from PDF</h4>

        <div className="mb-4">
          <Label>PDF File</Label>
          <input type="file" accept="application/pdf" className="w-full border rounded-xl p-2 bg-transparent" onChange={(e) => void handleFile(e.target.files?.[0] || null)} />
        </div>

        {loading && <p className="text-sm text-gray-500 mb-2">Reading PDF...</p>}
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        {!loading && parsedRows.length > 0 && (
          <p className="text-sm text-gray-500 mb-2">
            Parsed {parsedRows.length} rows ({expandedCount} items across all colors/finishes). Uncheck anything that looks wrong before importing.
          </p>
        )}

        <div className="max-h-[55vh] overflow-auto border rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
              <tr>
                <th className="p-3">
                  <input type="checkbox" checked={allSelected} onChange={(e) => toggleAll(e.target.checked)} />
                </th>
                <th className="p-3">Profile Name</th>
                <th className="p-3">Thickness</th>
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
                  <td className="p-3 font-medium">{row.profileName}</td>
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
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="button" onClick={() => void handleImport()} disabled={!selectedRows.length || importing}>
            {importing ? "Importing..." : `Import All (${expandedCount})`}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default function CompanyItemsPageContent({ companyId }: { companyId: number }) {
  const [company, setCompany] = useState<AluminiumCompany | null>(null);
  const [items, setItems] = useState<AluminiumCompanyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AluminiumCompanyItem | null>(null);
  const [pdfImportOpen, setPdfImportOpen] = useState(false);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);

  const loadData = async () => {
    if (!Number.isFinite(companyId)) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [companyRes, itemsRes] = await Promise.all([aluminiumApi.getCompany(companyId), aluminiumApi.getCompanyItems(companyId)]);
      setCompany(companyRes.data || companyRes || null);
      setItems(itemsRes.data || itemsRes || []);
    } catch (error) {
      console.error("Failed to load company items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [companyId]);

  const handleCreate = async (data: { profileName: string; thickness: string; type: string; amount: number }) => {
    if (!Number.isFinite(companyId)) return;
    await aluminiumApi.createCompanyItem(companyId, data);
    await loadData();
  };

  const handleUpdate = async (id: number, data: { profileName?: string; thickness?: string; type?: string; amount?: number }) => {
    await aluminiumApi.updateCompanyItem(id, data);
    await loadData();
  };

  const handleDelete = async (item: AluminiumCompanyItem) => {
    if (!window.confirm(`Delete ${item.profileName}?`)) return;
    await aluminiumApi.deleteCompanyItem(item.id);
    await loadData();
  };

  const handleDeleteAll = async () => {
    if (!company) return;
    await aluminiumApi.deleteCompanyItems(companyId);
    await loadData();
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Company Items" subtitle="Manage company item list" />
        <Skeleton variant="rectangular" height={320} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={company?.name ? `${company.name} #${companyId}` : `Company Items #${companyId}`}
        subtitle="Add items manually or import them from a PDF."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Aluminium", href: "/admin/aluminium" },
          { label: "Companies", href: "/admin/aluminium/companies" },
          { label: company?.name || "Items" },
        ]}
        action={
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/admin/aluminium/companies"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
            >
              Back to Companies
            </Link>
            <Button variant="outline" onClick={() => setPdfImportOpen(true)}>
              Import PDF
            </Button>
            <Button
              onClick={() => {
                setEditingItem(null);
                setItemModalOpen(true);
              }}
            >
              Add Item
            </Button>
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
              onClick={() => setDeleteAllOpen(true)}
              disabled={items.length === 0}
            >
              Delete All Items
            </Button>
          </div>
        }
      />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Company Items</h3>
            <p className="text-xs text-gray-500">Profile name, thickness, type and amount.</p>
          </div>
          <span className="text-sm text-gray-500">{items.length} total</span>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 dark:bg-gray-900">
              <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4">Profile Name</th>
                <th className="px-6 py-4">Thickness</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {items.length === 0 ? (
                <tr>
                  <td className="px-6 py-6 text-sm text-gray-500" colSpan={5}>
                    No items yet. Add one manually or import from PDF.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="text-sm">
                    <td className="px-6 py-4 font-medium">{item.profileName}</td>
                    <td className="px-6 py-4 text-gray-500">{item.thickness}</td>
                    <td className="px-6 py-4 text-gray-500">{item.type}</td>
                    <td className="px-6 py-4 text-gray-500">{item.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          className="text-brand-500 hover:underline"
                          onClick={() => {
                            setEditingItem(item);
                            setItemModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-red-500 hover:underline"
                          onClick={() => void handleDelete(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ItemModal
        isOpen={itemModalOpen}
        item={editingItem}
        onClose={() => {
          setItemModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={async (data) => {
          if (editingItem) {
            await handleUpdate(editingItem.id, data);
          } else {
            await handleCreate(data);
          }
        }}
      />

      <PdfImportModal
        isOpen={pdfImportOpen}
        onClose={() => setPdfImportOpen(false)}
        onImport={async (rows) => {
          await aluminiumApi.seedCompanyItems(companyId, rows);
          await loadData();
        }}
      />

      <DeleteAllModal
        isOpen={deleteAllOpen}
        companyName={company?.name || "this company"}
        itemCount={items.length}
        onClose={() => setDeleteAllOpen(false)}
        onConfirm={handleDeleteAll}
      />
    </div>
  );
}
