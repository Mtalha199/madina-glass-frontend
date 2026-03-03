"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import { invoicesApi } from "@/lib/api/invoice";
import { TrashIcon } from "lucide-react";

const THICKNESS_OPTIONS = ["3", "4", "5", "6", "8", "12"];
const GLASS_TYPE_OPTIONS = ["CLEAR", "COLORED"];
const COLORED_SHADE_OPTIONS = [
  "GRAY",
  "BROWN",
  "GREEN",
  "BLUE",
  "BRONZE",
  "TEA",
  "BLACK",
  "REFLECTIVE BLUE",
  "REFLECTIVE GREEN",
];

const MARKET_SIZE_CLASSES = {
  CLEAR_3MM: [6, 9, 12, 15, 18, 21, 24, 30, 36, 42, 48, 54, 60, 72, 84],
  CLEAR_OTHERS: [6, 9, 12, 15, 18, 21, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90],
  COLORED_ALL: [6, 9, 12, 15, 18, 21, 24, 28, 30, 33, 36, 42, 45, 48, 54, 60, 66, 72, 78, 84, 90, 96],
};

const getMarketSizeClass = (thickness: string, glassType: string) => {
  if (glassType === "COLORED") return MARKET_SIZE_CLASSES.COLORED_ALL;
  if (thickness === "3") return MARKET_SIZE_CLASSES.CLEAR_3MM;
  return MARKET_SIZE_CLASSES.CLEAR_OTHERS;
};

const getRoundedMarketSize = (actual: number, sizes: number[]) => {
  const value = Number(actual);
  if (!value) return null;
  return sizes.find((size) => value <= size) ?? null;
};

const getStandardSizeForActual = (actualWidth: number, actualHeight: number, thickness: string, glassType: string) => {
  const sizeClass = getMarketSizeClass(thickness, glassType);
  const stdWidth = getRoundedMarketSize(actualWidth, sizeClass);
  const stdHeight = getRoundedMarketSize(actualHeight, sizeClass);

  if (!actualWidth || !actualHeight) return "—";
  if (!stdWidth || !stdHeight) return "Custom / Oversize";

  return `${stdWidth}\" x ${stdHeight}\"`;
};

const nextSerial = (serial: string) => {
  const value = String(serial || "").trim();
  if (!value) return "1";

  const match = value.match(/^(.*?)(\d+)$/);
  if (!match) return "1";

  const prefix = match[1] || "";
  const num = Number(match[2]);
  if (Number.isNaN(num)) return "1";
  return `${prefix}${num + 1}`;
};

const buildItemName = (thickness: string, glassType: string, shade: string) => {
  return glassType === "CLEAR" ? `${thickness}mm CLEAR` : `${thickness}mm ${shade}`;
};

const recalcItem = (item: any, isLabour: boolean) => {
  const width = Number(item.width || 0);
  const height = Number(item.height || 0);
  const qtyPcs = Number(item.qtyPcs || 0);
  const rate = isLabour ? 0 : Number(item.rate || 0);
  const totalSqft = Number((((width * height) / 144) * qtyPcs).toFixed(2));
  const value = Number((totalSqft * rate).toFixed(2));
  const itemName = buildItemName(String(item.glassThickness), String(item.glassType), String(item.glassShade));
  const standardSize = getStandardSizeForActual(width, height, String(item.glassThickness), String(item.glassType));

  return {
    ...item,
    rate,
    totalSqft,
    value,
    itemName,
    standardSize,
  };
};

const createDefaultItem = () => ({
  SerialNum: "1",
  itemName: "5mm CLEAR",
  glassThickness: "5",
  glassType: "CLEAR",
  glassShade: "CLEAR",
  width: 0,
  height: 0,
  qtyPcs: 1,
  rate: 0,
  totalSqft: 0,
  value: 0,
  standardSize: "—",
});

export default function CreateInvoiceModal({ isOpen, onClose, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [customerLedger, setCustomerLedger] = useState<any[]>([]);

  const [items, setItems] = useState<any[]>([createDefaultItem()]);

  const [formData, setFormData] = useState<any>({
    customerType: "WALKIN",
    name: "",
    phone: "",
    driverName: "",
    cutterName: "",
    fitterName: "",
    carriage: 0,
    discountPercent: 0,
    paidAmount: 0,
    remarks: "",
  });

  const isLabourInvoice = false;

  useEffect(() => {
    if (!isOpen || formData.customerType !== "CUSTOMER") {
      setCustomerLedger([]);
      setHistoryError(null);
      setHistoryLoading(false);
      return;
    }

    const phone = formData.phone.trim();
    if (!phone) {
      setCustomerLedger([]);
      setHistoryError("Enter phone to load customer statement.");
      return;
    }

    setHistoryLoading(true);
    setHistoryError(null);

    const timeoutId = setTimeout(async () => {
      try {
        const res = await invoicesApi.getCustomerHistory(phone);
        const payload = res?.data || res;
        const invoices = Array.isArray(payload) ? payload : payload?.invoices || [];
        setCustomerLedger(invoices);
      } catch {
        setCustomerLedger([]);
        setHistoryError("Unable to load customer statement.");
      } finally {
        setHistoryLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [formData.customerType, formData.phone, isOpen]);

  const summary = useMemo(() => {
    const subTotal = items.reduce((acc, item) => acc + (Number(item.value) || 0), 0);
    const discountPercent = isLabourInvoice ? 0 : Math.max(0, Math.min(100, Number(formData.discountPercent) || 0));
    const discountAmount = Number(((subTotal * discountPercent) / 100).toFixed(2));
    const carriage = isLabourInvoice ? 0 : Number(formData.carriage) || 0;
    const grandTotal = Number((subTotal - discountAmount + carriage).toFixed(2));
    const paidAmount = isLabourInvoice ? 0 : Number(formData.paidAmount) || 0;
    const balance = Number((grandTotal - paidAmount).toFixed(2));

    return { subTotal, discountPercent, discountAmount, carriage, grandTotal, paidAmount, balance };
  }, [items, formData.discountPercent, formData.paidAmount, formData.carriage, isLabourInvoice]);

  const ledgerSummary = useMemo(() => {
    const totals = customerLedger.reduce(
      (acc, inv) => {
        acc.debit += Number(inv.billValue || 0);
        acc.credit += Number(inv.paidAmount || 0);
        return acc;
      },
      { debit: 0, credit: 0 }
    );

    return {
      debit: totals.debit,
      credit: totals.credit,
      balance: totals.debit - totals.credit,
    };
  }, [customerLedger]);

  const updateItem = (index: number, field: string, val: any) => {
    const newItems = [...items];
    const updated = { ...newItems[index], [field]: val };

    if (field === "glassType") {
      updated.glassShade = val === "CLEAR" ? "CLEAR" : COLORED_SHADE_OPTIONS[0];
    }

    newItems[index] = recalcItem(updated, isLabourInvoice);
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const addItem = () => {
    const upperRow = items[items.length - 1] || createDefaultItem();
    const nextItem = recalcItem(
      {
        ...createDefaultItem(),
        SerialNum: nextSerial(String(upperRow.SerialNum || "")),
        glassThickness: upperRow.glassThickness,
        glassType: upperRow.glassType,
        glassShade: upperRow.glassType === "CLEAR" ? "CLEAR" : upperRow.glassShade,
        rate: isLabourInvoice ? 0 : Number(upperRow.rate || 0),
        qtyPcs: 1,
      },
      isLabourInvoice
    );

    setItems([...items, nextItem]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const normalizedItems = items.map((item) => {
        const normalized = recalcItem(item, false);
        return {
          ...normalized,
          SerialNum: String(normalized.SerialNum || "").trim(),
        };
      });

      const payload = {
        ...formData,
        discountPercent: summary.discountPercent,
        discount: summary.discountAmount,
        carriage: Number(formData.carriage) || 0,
        paidAmount: summary.paidAmount,
        billValue: Number(
          (
            summary.subTotal -
            summary.discountAmount +
            (Number(formData.carriage) || 0)
          ).toFixed(2)
        ),
        items: normalizedItems,
      } as any;

      await invoicesApi.createInvoice(payload);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1300px] m-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl overflow-y-auto max-h-[95vh]">
        <h4 className="text-2xl font-semibold mb-6">New Sales Bill</h4>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Customer Type</Label>
              <Select
                options={[
                  { value: "CUSTOMER", label: "CUSTOMER" },
                  { value: "WALKIN", label: "WALKIN" },
                ]}
                value={formData.customerType}
                onChange={(value) => setFormData({ ...formData, customerType: value })}
                placeholder="Select customer type"
              />
            </div>

            <div>
              <Label>Customer Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>

            <div>
              <Label>Phone</Label>
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
            </div>

            <div>
              <Label>Driver</Label>
              <Input value={formData.driverName} onChange={(e) => setFormData({ ...formData, driverName: e.target.value })} />
            </div>

            <div>
              <Label>Cutter</Label>
              <Input value={formData.cutterName} onChange={(e) => setFormData({ ...formData, cutterName: e.target.value })} />
            </div>

            <div>
              <Label>Fitter</Label>
              <Input value={formData.fitterName} onChange={(e) => setFormData({ ...formData, fitterName: e.target.value })} />
            </div>
          </div>

          {formData.customerType === "CUSTOMER" && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-semibold text-brand-500">Customer Statement</h5>
                {historyLoading && <span className="text-xs text-gray-500">Loading...</span>}
              </div>

              {historyError && <p className="text-xs text-red-500">{historyError}</p>}

              {!historyError && !historyLoading && (
                <>
                  {customerLedger.length === 0 ? (
                    <p className="text-xs text-gray-500">No previous records found for this phone number.</p>
                  ) : (
                    <div className="max-h-56 overflow-auto border rounded-lg">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Invoice</th>
                            <th className="p-2 text-right">Debit</th>
                            <th className="p-2 text-right">Credit</th>
                            <th className="p-2 text-right">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerLedger.map((inv: any) => (
                            <tr key={inv.id} className="border-t">
                              <td className="p-2">{new Date(inv.createdAt).toLocaleDateString()}</td>
                              <td className="p-2 font-medium">{inv.invoiceNumber}</td>
                              <td className="p-2 text-right text-red-600">Rs. {Number(inv.billValue || 0).toLocaleString()}</td>
                              <td className="p-2 text-right text-green-600">Rs. {Number(inv.paidAmount || 0).toLocaleString()}</td>
                              <td className="p-2 text-right font-semibold">Rs. {Number(inv.balance || 0).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="rounded-lg bg-red-50 dark:bg-red-500/10 p-3 text-sm">
                      <p className="text-xs text-gray-500">Total Debit</p>
                      <p className="font-semibold text-red-600">Rs. {ledgerSummary.debit.toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg bg-green-50 dark:bg-green-500/10 p-3 text-sm">
                      <p className="text-xs text-gray-500">Total Credit</p>
                      <p className="font-semibold text-green-600">Rs. {ledgerSummary.credit.toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg bg-brand-50 dark:bg-brand-500/10 p-3 text-sm">
                      <p className="text-xs text-gray-500">Net Balance</p>
                      <p className="font-semibold text-brand-500">Rs. {ledgerSummary.balance.toLocaleString()}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="space-y-4">
            <Label>Remarks</Label>
            <textarea
              className="w-full border rounded-xl p-3 h-24"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            />
          </div>

          <div className="border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600">
                <tr>
                  <th className="p-3">Serial #</th>
                  <th className="p-3">Glass</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Color</th>
                  <th className="p-3">W (in)</th>
                  <th className="p-3">H (in)</th>
                  <th className="p-3">Std Size</th>
                  <th className="p-3">Pcs</th>
                  <th className="p-3">Sqft</th>
                  {!isLabourInvoice && <th className="p-3">Rate</th>}
                  {!isLabourInvoice && <th className="p-3">Total</th>}
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">
                      <input
                        className="w-24 border rounded p-1"
                        placeholder="Serial"
                        value={item.SerialNum || ""}
                        onChange={(e) => updateItem(idx, "SerialNum", e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <select
                        className="w-full border rounded p-1 bg-transparent"
                        value={item.glassThickness}
                        onChange={(e) => updateItem(idx, "glassThickness", e.target.value)}
                      >
                        {THICKNESS_OPTIONS.map((size) => (
                          <option key={size} value={size}>
                            {size} mm
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <select
                        className="w-full border rounded p-1 bg-transparent"
                        value={item.glassType}
                        onChange={(e) => updateItem(idx, "glassType", e.target.value)}
                      >
                        {GLASS_TYPE_OPTIONS.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <select
                        className="w-full border rounded p-1 bg-transparent"
                        value={item.glassShade}
                        onChange={(e) => updateItem(idx, "glassShade", e.target.value)}
                        disabled={item.glassType === "CLEAR"}
                      >
                        {(item.glassType === "CLEAR" ? ["CLEAR"] : COLORED_SHADE_OPTIONS).map((shade) => (
                          <option key={shade} value={shade}>
                            {shade}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="w-16 border rounded p-1"
                        value={item.width}
                        onChange={(e) => updateItem(idx, "width", e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="w-16 border rounded p-1"
                        value={item.height}
                        onChange={(e) => updateItem(idx, "height", e.target.value)}
                      />
                    </td>
                    <td className="p-2 text-center text-xs font-medium">{item.standardSize || "—"}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="w-12 border rounded p-1"
                        value={item.qtyPcs}
                        onChange={(e) => updateItem(idx, "qtyPcs", e.target.value)}
                      />
                    </td>
                    <td className="p-2 text-center font-mono">{item.totalSqft}</td>
                    {!isLabourInvoice && (
                      <td className="p-2">
                        <input
                          type="number"
                          className="w-20 border rounded p-1"
                          value={item.rate}
                          onChange={(e) => updateItem(idx, "rate", e.target.value)}
                        />
                      </td>
                    )}
                    {!isLabourInvoice && <td className="p-2 font-bold">Rs. {Number(item.value || 0).toLocaleString()}</td>}
                    <td className="p-2">
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="text-red-500 hover:bg-red-50 p-1 rounded"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            + Add Line
          </Button>

          {!isLabourInvoice && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t">
              <div className="hidden md:block" />
              <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl space-y-3">
                <div className="flex justify-between">
                  <span>Sub-Total:</span>
                  <span className="font-bold">Rs. {summary.subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Discount (%):</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className="w-24 border rounded p-1 text-right text-red-500"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                  />
                </div>
                <div className="flex justify-between text-sm text-red-500">
                  <span>Discount Amount:</span>
                  <span>- Rs. {summary.discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Carriage (+):</span>
                  <input
                    type="number"
                    className="w-24 border rounded p-1 text-right"
                    value={formData.carriage}
                    onChange={(e) => setFormData({ ...formData, carriage: e.target.value })}
                  />
                </div>
                <div className="flex justify-between text-xl border-t pt-2 font-bold text-brand-500">
                  <span>Grand Total:</span>
                  <span>Rs. {summary.grandTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span>Amount Paid:</span>
                  <input
                    type="number"
                    className="w-32 border-2 border-green-500 rounded p-1 text-right font-bold"
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                  />
                </div>
                <div className="flex justify-between text-brand-500 font-medium italic">
                  <span>Balance Due:</span>
                  <span>Rs. {summary.balance.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Create & Print"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
