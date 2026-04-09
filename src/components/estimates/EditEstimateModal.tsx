"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import { estimatesApi } from "@/lib/api/estimate";
import { customersApi } from "@/lib/api/customer";
import { invoicesApi } from "@/lib/api/invoice";
import { TrashIcon } from "lucide-react";

const THICKNESS_OPTIONS = ["3", "4", "5", "6", "8", "12"];
const MIRROR_THICKNESS_OPTIONS = ["3", "4", "5", "6"];
const GLASS_TYPE_OPTIONS = ["CLEAR", "COLORED", "MIRROR"];
const COLORED_SHADE_OPTIONS = [
  "GREEN REFLECTIVE",
  "BROWN REFLECTIVE",
  "BLUE REFLECTIVE",
  "GREY REFLECTIVE",
  "GREY SIMPLE",
  "BROWN SIMPLE",
  "BLUE SIMPLE",
  "GREEN SIMPLE",
];
const MIRROR_SHADE_OPTIONS = ["MIRROR"];

const DEFAULT_TERMS = `Terms & Conditions:
1. Goods once sold will not be returned.
2. Please check size and quality at delivery time.
3. Payment must be cleared as per commitment.
4. Breakage after delivery is customer responsibility.`;

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
  if (glassType === "CLEAR") return `${thickness}mm CLEAR`;
  if (glassType === "MIRROR") return `${thickness}mm MIRROR`;
  return `${thickness}mm ${shade}`;
};

const getThicknessOptionsForType = (glassType: string) => {
  return glassType === "MIRROR" ? MIRROR_THICKNESS_OPTIONS : THICKNESS_OPTIONS;
};

const getShadeOptionsForType = (glassType: string) => {
  if (glassType === "CLEAR") return ["CLEAR"];
  if (glassType === "MIRROR") return MIRROR_SHADE_OPTIONS;
  return COLORED_SHADE_OPTIONS;
};

const getDefaultShadeForType = (glassType: string) => {
  return getShadeOptionsForType(glassType)[0];
};

const recalcItem = (item: any) => {
  const glassType = String(item.glassType || "CLEAR");
  const allowedThickness = getThicknessOptionsForType(glassType);
  const glassThickness = allowedThickness.includes(String(item.glassThickness))
    ? String(item.glassThickness)
    : allowedThickness[0];
  const shadeOptions = getShadeOptionsForType(glassType);
  const glassShade = shadeOptions.includes(String(item.glassShade))
    ? String(item.glassShade)
    : shadeOptions[0];

  const width = Number(item.width || 0);
  const height = Number(item.height || 0);
  const qtyPcs = Number(item.qtyPcs || 0);
  const rate = Number(item.rate || 0);
  const limits = getSizeLimits(glassThickness);
  const autoSWidth = getRoundedMarketSize(width, limits.maxWidth);
  const autoSHeight = getRoundedMarketSize(height, limits.maxHeight);
  const isStdManual = Boolean(item.isStdManual);
  const stdWidth = isStdManual ? Number(item.SWidth || 0) : Number(autoSWidth || 0);
  const stdHeight = isStdManual ? Number(item.SHeight || 0) : Number(autoSHeight || 0);
  const calcWidth = stdWidth || width;
  const calcHeight = stdHeight || height;
  const totalSqft = Number((((calcWidth * calcHeight) / 144) * qtyPcs).toFixed(2));
  const value = Number((totalSqft * rate).toFixed(2));
  const itemName = buildItemName(glassThickness, glassType, glassShade);
  const standardSize =
    stdWidth && stdHeight
      ? `${stdWidth}" x ${stdHeight}"`
      : getStandardSizeForActual(width, height, glassThickness, glassType);

  return {
    ...item,
    glassThickness,
    glassType,
    glassShade,
    SWidth: stdWidth || undefined,
    SHeight: stdHeight || undefined,
    isStdManual,
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
  SWidth: undefined,
  SHeight: undefined,
  isStdManual: false,
  qtyPcs: 1,
  rate: 0,
  totalSqft: 0,
  value: 0,
  standardSize: "—",
});

const createDefaultFormData = () => ({
  customerType: "WALKIN",
  customerId: undefined,
  name: "",
  phone: "",
  address: "",
  driverName: "",
  cutterName: "",
  fitterName: "",
  carriage: 0,
  discountPercent: 0,
  remarks: DEFAULT_TERMS,
});

export default function EditEstimateModal({ isOpen, onClose, onSuccess, estimateId }: any) {
  const [loading, setLoading] = useState(false);
  const [estimateLoading, setEstimateLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [customerLedger, setCustomerLedger] = useState<any[]>([]);
  const [customerLookup, setCustomerLookup] = useState("");

  const [items, setItems] = useState<any[]>([createDefaultItem()]);

  const [formData, setFormData] = useState<any>(createDefaultFormData());

  useEffect(() => {
    if (!isOpen || !estimateId) return;
    setEstimateLoading(true);
    estimatesApi
      .getEstimateById(Number(estimateId))
      .then((res) => {
        const estimate = res?.data || res;
        const mappedItems = (estimate?.items || []).map((item: any) =>
          recalcItem({
            SerialNum: item.SerialNum || "",
            itemName: item.itemName || buildItemName("5", "CLEAR", "CLEAR"),
            width: Number(item.width || 0),
            height: Number(item.height || 0),
            qtyPcs: Number(item.qtyPcs || 1),
            rate: Number(item.rate || 0),
            glassType: item.glassType || "CLEAR",
            glassThickness: item.glassThickness || "5",
            glassShade:
              item.glassShade ||
              getDefaultShadeForType(String(item.glassType || "CLEAR")),
            // Keep edit behavior aligned with create flow:
            // width/height changes should auto-recompute standard size.
            SWidth: undefined,
            SHeight: undefined,
            isStdManual: false,
          })
        );

        setFormData({
          customerType: estimate?.customerType || "WALKIN",
          customerId: estimate?.customerId || undefined,
          name: estimate?.name || "",
          phone: estimate?.phone || "",
          address: estimate?.address || "",
          driverName: estimate?.driverName || "",
          cutterName: estimate?.cutterName || "",
          fitterName: estimate?.fitterName || "",
          carriage: Number(estimate?.carriage || 0),
          discountPercent: Number(estimate?.discountPercent || 0),
          remarks: estimate?.remarks || DEFAULT_TERMS,
        });
        setItems(mappedItems.length ? mappedItems : [createDefaultItem()]);
        if (estimate?.customerId) {
          setCustomerLookup(`${estimate.customerId} - ${estimate.name || ""} (${estimate.phone || ""})`);
        } else {
          setCustomerLookup("");
        }
      })
      .finally(() => setEstimateLoading(false));
  }, [isOpen, estimateId]);

  useEffect(() => {
    if (isOpen) return;
    setFormData(createDefaultFormData());
    setItems([createDefaultItem()]);
    setCustomerLookup("");
    setCustomerLedger([]);
    setHistoryError(null);
    setEstimateLoading(false);
    setSaveError(null);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || formData.customerType !== "CUSTOMER") return;
    setCustomersLoading(true);
    customersApi
      .getCustomers()
      .then((res) => {
        setCustomers(res?.data || res || []);
      })
      .catch(() => setCustomers([]))
      .finally(() => setCustomersLoading(false));
  }, [isOpen, formData.customerType]);

  const applyCustomerSelection = (rawCustomerId: string | number) => {
    const customerId = Number(rawCustomerId || 0);
    if (!customerId) {
      setFormData((prev: any) => ({ ...prev, customerId: undefined }));
      return;
    }

    const selected = customers.find((c: any) => Number(c.id) === customerId);
    if (selected) {
      setCustomerLookup(`${selected.id} - ${selected.name} (${selected.phone})`);
    }
    setFormData((prev: any) => ({
      ...prev,
      customerId,
      name: selected?.name || prev.name,
      phone: selected?.phone || prev.phone,
      address: selected?.address || prev.address,
    }));
  };

  const handleCustomerLookupChange = (value: string) => {
    setCustomerLookup(value);
    const idMatch = value.trim().match(/^(\d+)/);
    const customerId = Number(idMatch?.[1] || 0);
    if (!customerId) {
      setFormData((prev: any) => ({ ...prev, customerId: undefined }));
      return;
    }
    applyCustomerSelection(customerId);
  };

  useEffect(() => {
    if (!isOpen || formData.customerType !== "CUSTOMER") {
      setCustomerLedger([]);
      setHistoryError(null);
      setHistoryLoading(false);
      return;
    }

    const hasCustomerId = Number(formData.customerId) > 0;
    const phone = String(formData.phone || "").trim();
    if (!hasCustomerId && !phone) {
      setCustomerLedger([]);
      setHistoryError("Select customer ID or enter phone to load statement.");
      return;
    }

    setHistoryLoading(true);
    setHistoryError(null);

    const timeoutId = setTimeout(async () => {
      try {
        const res = hasCustomerId
          ? await invoicesApi.getCustomerHistoryById(Number(formData.customerId))
          : await invoicesApi.getCustomerHistory(phone);
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
  }, [formData.customerType, formData.customerId, formData.phone, isOpen]);

  const summary = useMemo(() => {
    const subTotal = items.reduce((acc, item) => acc + (Number(item.value) || 0), 0);
    const discountPercent = Math.max(0, Math.min(100, Number(formData.discountPercent) || 0));
    const discountAmount = Number(((subTotal * discountPercent) / 100).toFixed(2));
    const carriage = Number(formData.carriage) || 0;
    const grandTotal = Number((subTotal - discountAmount + carriage).toFixed(2));

    return { subTotal, discountPercent, discountAmount, carriage, grandTotal };
  }, [items, formData.discountPercent, formData.carriage]);

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
      const allowedThickness = getThicknessOptionsForType(String(val));
      if (!allowedThickness.includes(String(updated.glassThickness))) {
        updated.glassThickness = allowedThickness[0];
      }
      updated.glassShade = getDefaultShadeForType(String(val));
    }
    if (field === "glassThickness") {
      const allowedThickness = getThicknessOptionsForType(String(updated.glassType));
      if (!allowedThickness.includes(String(updated.glassThickness))) {
        updated.glassThickness = allowedThickness[0];
      }
    }
    if (field === "SWidth" || field === "SHeight") {
      updated.isStdManual = true;
    }
    if (field === "glassThickness" || field === "glassType") {
      updated.isStdManual = false;
    }

    newItems[index] = recalcItem(updated);
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const addItem = () => {
    const upperRow = items[items.length - 1] || createDefaultItem();
    const nextItem = recalcItem({
      ...createDefaultItem(),
      SerialNum: nextSerial(String(upperRow.SerialNum || "")),
      glassThickness: upperRow.glassThickness,
      glassType: upperRow.glassType,
      glassShade: upperRow.glassType === "CLEAR" ? "CLEAR" : upperRow.glassShade,
      rate: Number(upperRow.rate || 0),
      qtyPcs: 1,
    });

    setItems([...items, nextItem]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!estimateId) {
      setSaveError("Estimate not selected. Please reopen edit modal.");
      return;
    }
    if (!String(formData.name || "").trim() || !String(formData.phone || "").trim()) {
      alert("Customer name and phone number are required.");
      return;
    }
    setLoading(true);
    setSaveError(null);

    try {
      const normalizedItems = items.map((item) => {
        const normalized = recalcItem(item);
        const { isStdManual } = normalized;
        return {
          SerialNum: String(normalized.SerialNum || "").trim(),
          itemName: String(normalized.itemName || "").trim(),
          glassThickness: normalized.glassThickness || undefined,
          glassType: normalized.glassType || undefined,
          glassShade: normalized.glassShade || undefined,
          standardSize: normalized.standardSize || undefined,
          width: Number(normalized.width || 0),
          height: Number(normalized.height || 0),
          SWidth: normalized.SWidth ? Number(normalized.SWidth) : undefined,
          SHeight: normalized.SHeight ? Number(normalized.SHeight) : undefined,
          qtyPcs: Number(normalized.qtyPcs || 0),
          totalSqft: Number(normalized.totalSqft || 0),
          rate: Number(normalized.rate || 0),
          value: Number(normalized.value || 0),
        };
      });

      const payload = {
        customerType: formData.customerType,
        customerId: formData.customerId ? Number(formData.customerId) : undefined,
        name: String(formData.name || "").trim(),
        phone: String(formData.phone || "").trim(),
        address: formData.address ? String(formData.address) : undefined,
        driverName: formData.driverName ? String(formData.driverName) : undefined,
        cutterName: formData.cutterName ? String(formData.cutterName) : undefined,
        fitterName: formData.fitterName ? String(formData.fitterName) : undefined,
        remarks: formData.remarks ? String(formData.remarks) : undefined,
        discountPercent: summary.discountPercent,
        discount: summary.discountAmount,
        carriage: Number(formData.carriage) || 0,
        billValue: Number(
          (
            summary.subTotal -
            summary.discountAmount +
            (Number(formData.carriage) || 0)
          ).toFixed(2)
        ),
        items: normalizedItems,
      };

      await estimatesApi.updateEstimate(Number(estimateId), payload);
      onSuccess?.();
      onClose?.();
    } catch (err: any) {
      const backendMessage = err?.response?.data?.message;
      const message = Array.isArray(backendMessage)
        ? backendMessage.join(", ")
        : backendMessage || "Failed to update estimate. Please verify all required fields.";
      setSaveError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1300px] m-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl overflow-y-auto max-h-[95vh]">
        <h4 className="text-2xl font-semibold mb-6">Edit Estimate</h4>

        {estimateLoading ? (
          <div className="py-8 text-sm text-gray-500">Loading estimate...</div>
        ) : (
          <>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Customer Type</Label>
              <Select
                options={[
                  { value: "CUSTOMER", label: "PERMANANT CUSTOMER" },
                  { value: "WALKIN", label: "WALK-IN CUSTOMER" },
                ]}
                value={formData.customerType}
                onChange={(value) => {
                  if (value === "WALKIN") setCustomerLookup("");
                  setFormData({
                    ...formData,
                    customerType: value,
                    customerId: value === "CUSTOMER" ? formData.customerId : undefined,
                  });
                }}
                placeholder="Select customer type"
              />
            </div>

            {formData.customerType === "CUSTOMER" && (
              <div>
                <Label>Customer (Existing / New)</Label>
                <Input
                  placeholder={customersLoading ? "Loading customers..." : "Type ID or choose customer"}
                  value={customerLookup}
                  onChange={(e) => handleCustomerLookupChange(e.target.value)}
                  list="edit-estimate-customer-existing-options"
                />
                <datalist id="edit-estimate-customer-existing-options">
                  {customers.map((c: any) => (
                    <option key={c.id} value={`${c.id} - ${c.name} (${c.phone})`} />
                  ))}
                </datalist>
              </div>
            )}

            <div>
              <Label>Customer Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>

            <div>
              <Label>Phone</Label>
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
            </div>

            <div>
              <Label>Address</Label>
              <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
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

            <div className="md:col-span-4">
              <Label>Description</Label>
              <textarea
                rows={4}
                placeholder="Write estimate description, notes, or terms..."
                className="w-full rounded-lg border px-4 py-2.5 text-sm bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              />
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
                    <p className="text-xs text-gray-500">No previous records found for this customer.</p>
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

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-sm font-semibold text-brand-500">Estimate Items</h5>
              <Button variant="outline" onClick={addItem}>Add Item</Button>
            </div>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-14 gap-3 items-end border-b pb-4 last:border-0 last:pb-0">
                    <div className="lg:col-span-1">
                      <Label>Serial</Label>
                      <Input value={item.SerialNum} onChange={(e) => updateItem(index, "SerialNum", e.target.value)} />
                    </div>
                    <div className="lg:col-span-2">
                      <Label>Glass Type</Label>
                      <Select
                        options={GLASS_TYPE_OPTIONS.map((t) => ({ value: t, label: t }))}
                        value={item.glassType}
                        onChange={(value) => updateItem(index, "glassType", value)}
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <Label>Thickness</Label>
                      <Select
                        options={getThicknessOptionsForType(item.glassType).map((t) => ({ value: t, label: `${t}mm` }))}
                        value={item.glassThickness}
                        onChange={(value) => updateItem(index, "glassThickness", value)}
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <Label>Shade</Label>
                      <Select
                        options={getShadeOptionsForType(item.glassType).map((t) => ({ value: t, label: t }))}
                        value={item.glassShade}
                        onChange={(value) => updateItem(index, "glassShade", value)}
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <Label>Width</Label>
                      <Input type="number" value={item.width} onChange={(e) => updateItem(index, "width", e.target.value)} />
                    </div>
                    <div className="lg:col-span-1">
                      <Label>Height</Label>
                      <Input type="number" value={item.height} onChange={(e) => updateItem(index, "height", e.target.value)} />
                    </div>
                    <div className="lg:col-span-1">
                      <Label>Qty</Label>
                      <Input
                        type="number"
                        value={item.qtyPcs}
                        onChange={(e) => updateItem(index, "qtyPcs", e.target.value)}
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <Label>Rate</Label>
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItem(index, "rate", e.target.value)}
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <Label>Std W</Label>
                      <Input
                        type="number"
                        placeholder="Auto"
                        value={item.SWidth ?? ""}
                        onChange={(e) => updateItem(index, "SWidth", e.target.value)}
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <Label>Std H</Label>
                      <Input
                        type="number"
                        placeholder="Auto"
                        value={item.SHeight ?? ""}
                        onChange={(e) => updateItem(index, "SHeight", e.target.value)}
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <Label>Std Size</Label>
                      <div className="h-10 flex items-center text-xs font-medium text-gray-600 dark:text-gray-300">
                        {item.standardSize || "—"}
                      </div>
                    </div>
                    <div className="lg:col-span-1 flex justify-end">
                      <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                </div>
              ))}
            </div>
          </div>

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
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Update Estimate"}
            </Button>
          </div>
          {saveError && (
            <p className="text-sm text-red-600">{saveError}</p>
          )}
        </form>
          </>
        )}
      </div>
    </Modal>
  );
}
