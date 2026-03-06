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

  return {
    ...item,
    glassThickness,
    glassType,
    glassShade,
    itemName: buildItemName(glassThickness, glassType, glassShade),
    SWidth: stdWidth || undefined,
    SHeight: stdHeight || undefined,
    isStdManual,
    totalSqft,
    value,
    standardSize: stdWidth && stdHeight ? `${stdWidth}" x ${stdHeight}"` : (width && height ? "Oversize" : "—"),
  };
};

export default function EditInvoiceModal({ isOpen, onClose, invoiceId, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!isOpen || !invoiceId) return;
    setLoading(true);
    invoicesApi
      .getInvoiceById(invoiceId)
      .then((res) => {
        const inv = res?.data || res;
        setFormData({
          customerType: inv.customerType || "WALKIN",
          customerId: inv.customerId,
          name: inv.customer?.name || "",
          phone: inv.customer?.phone || "",
          address: inv.address || inv.customer?.address || "",
          driverName: inv.driverName || "",
          cutterName: inv.cutterName || "",
          fitterName: inv.fitterName || "",
          carriage: Number(inv.carriage || 0),
          discountPercent: Number(inv.discountPercent || 0),
          paidAmount: Number(inv.paidAmount || 0),
          remarks: inv.remarks || "",
        });

        const mappedItems = (inv.items || []).map((item: any) =>
          recalcItem({
            SerialNum: item.SerialNum || "",
            itemName: item.itemName || "",
            glassThickness: item.glassThickness || "5",
            glassType: item.glassType || "CLEAR",
            glassShade: item.glassShade || "CLEAR",
            width: Number(item.width || 0),
            height: Number(item.height || 0),
            SWidth: item.SWidth ? Number(item.SWidth) : undefined,
            SHeight: item.SHeight ? Number(item.SHeight) : undefined,
            isStdManual: Boolean(item.SWidth || item.SHeight),
            qtyPcs: Number(item.qtyPcs || 1),
            rate: Number(item.rate || 0),
            totalSqft: Number(item.totalSqft || 0),
            value: Number(item.value || 0),
          })
        );
        setItems(mappedItems);
      })
      .finally(() => setLoading(false));
  }, [isOpen, invoiceId]);

  const summary = useMemo(() => {
    const subTotal = items.reduce((acc, item) => acc + (Number(item.value) || 0), 0);
    const discountPercent = Math.max(0, Math.min(100, Number(formData?.discountPercent) || 0));
    const discountAmount = Number(((subTotal * discountPercent) / 100).toFixed(2));
    const carriage = Number(formData?.carriage) || 0;
    const grandTotal = Number((subTotal - discountAmount + carriage).toFixed(2));
    const paidAmount = Number(formData?.paidAmount) || 0;
    const balance = Number((grandTotal - paidAmount).toFixed(2));
    return { subTotal, discountPercent, discountAmount, carriage, grandTotal, paidAmount, balance };
  }, [items, formData]);

  const updateItem = (index: number, field: string, val: any) => {
    const updated = [...items];
    const row = { ...updated[index], [field]: val };
    if (field === "glassType") {
      const allowedThickness = getThicknessOptionsForType(String(val));
      if (!allowedThickness.includes(String(row.glassThickness))) {
        row.glassThickness = allowedThickness[0];
      }
      row.glassShade = getDefaultShadeForType(String(val));
    }
    if (field === "glassThickness") {
      const allowedThickness = getThicknessOptionsForType(String(row.glassType));
      if (!allowedThickness.includes(String(row.glassThickness))) {
        row.glassThickness = allowedThickness[0];
      }
    }
    if (field === "SWidth" || field === "SHeight") row.isStdManual = true;
    if (field === "glassThickness" || field === "glassType") row.isStdManual = false;
    updated[index] = recalcItem(row);
    setItems(updated);
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      recalcItem({
        SerialNum: String(prev.length + 1),
        glassThickness: "5",
        glassType: "CLEAR",
        glassShade: "CLEAR",
        width: 0,
        height: 0,
        qtyPcs: 1,
        rate: 0,
      }),
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((_: any, i: number) => i !== index));
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    if (!formData) return;
    if (!String(formData.name || "").trim() || !String(formData.phone || "").trim()) {
      alert("Customer name and phone number are required.");
      return;
    }

    setSaving(true);
    try {
      const payload: any = {
        ...formData,
        customerId: formData.customerId ? Number(formData.customerId) : undefined,
        discountPercent: summary.discountPercent,
        discount: summary.discountAmount,
        carriage: Number(formData.carriage) || 0,
        paidAmount: summary.paidAmount,
        billValue: summary.grandTotal,
        items: items.map((item: any) => {
          const { isStdManual, ...safe } = recalcItem(item);
          return {
            ...safe,
            SerialNum: String(safe.SerialNum || "").trim(),
          };
        }),
      };

      await invoicesApi.updateInvoice(invoiceId, payload);
      onSuccess?.();
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1300px] m-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl overflow-y-auto max-h-[95vh]">
        <h4 className="text-2xl font-semibold mb-6">Edit Sales Bill</h4>

        {loading || !formData ? (
          <div className="py-8 text-sm text-gray-500">Loading invoice...</div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Customer Type</Label>
                <Select
                  options={[
                    { value: "CUSTOMER", label: "PERMANANT CUSTOMER" },
                    { value: "WALKIN", label: "WALK-IN CUSTOMER" },
                  ]}
                  value={formData.customerType}
                  onChange={(value) => setFormData({ ...formData, customerType: value })}
                />
              </div>
              <div>
                <Label>Customer ID</Label>
                <Input
                  type="number"
                  value={formData.customerId ?? ""}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                />
              </div>
              <div>
                <Label>Customer Name</Label>
                <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
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
            </div>

            <div className="space-y-2">
              <Label>Remarks</Label>
              <textarea className="w-full border rounded-xl p-3 h-24" value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} />
            </div>

            <div className="border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[1100px]">
                  <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600">
                    <tr>
                      <th className="p-3">Serial #</th>
                      <th className="p-3">Glass</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Color</th>
                      <th className="p-3">W</th>
                      <th className="p-3">H</th>
                      <th className="p-3">Std W</th>
                      <th className="p-3">Std H</th>
                      <th className="p-3">Pcs</th>
                      <th className="p-3">Sqft</th>
                      <th className="p-3">Rate</th>
                      <th className="p-3">Total</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: any, idx: number) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2"><input className="w-24 border rounded p-1" value={item.SerialNum || ""} onChange={(e) => updateItem(idx, "SerialNum", e.target.value)} /></td>
                        <td className="p-2">
                          <select className="w-full border rounded p-1 bg-transparent" value={item.glassThickness} onChange={(e) => updateItem(idx, "glassThickness", e.target.value)}>
                            {getThicknessOptionsForType(String(item.glassType)).map((v) => <option key={v} value={v}>{v} mm</option>)}
                          </select>
                        </td>
                        <td className="p-2">
                          <select className="w-full border rounded p-1 bg-transparent" value={item.glassType} onChange={(e) => updateItem(idx, "glassType", e.target.value)}>
                            {GLASS_TYPE_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                          </select>
                        </td>
                        <td className="p-2">
                          <select
                            className="w-full border rounded p-1 bg-transparent"
                            value={item.glassShade}
                            onChange={(e) => updateItem(idx, "glassShade", e.target.value)}
                            disabled={item.glassType === "CLEAR" || item.glassType === "MIRROR"}
                          >
                            {getShadeOptionsForType(String(item.glassType)).map((v) => <option key={v} value={v}>{v}</option>)}
                          </select>
                        </td>
                        <td className="p-2"><input type="number" className="w-16 border rounded p-1" value={item.width} onChange={(e) => updateItem(idx, "width", e.target.value)} /></td>
                        <td className="p-2"><input type="number" className="w-16 border rounded p-1" value={item.height} onChange={(e) => updateItem(idx, "height", e.target.value)} /></td>
                        <td className="p-2"><input type="number" className="w-16 border rounded p-1" value={item.SWidth ?? ""} onChange={(e) => updateItem(idx, "SWidth", e.target.value)} /></td>
                        <td className="p-2"><input type="number" className="w-16 border rounded p-1" value={item.SHeight ?? ""} onChange={(e) => updateItem(idx, "SHeight", e.target.value)} /></td>
                        <td className="p-2"><input type="number" className="w-12 border rounded p-1" value={item.qtyPcs} onChange={(e) => updateItem(idx, "qtyPcs", e.target.value)} /></td>
                        <td className="p-2 text-center font-mono">{item.totalSqft}</td>
                        <td className="p-2"><input type="number" className="w-20 border rounded p-1" value={item.rate} onChange={(e) => updateItem(idx, "rate", e.target.value)} /></td>
                        <td className="p-2 font-bold">Rs. {Number(item.value || 0).toLocaleString()}</td>
                        <td className="p-2">
                          <button type="button" onClick={() => removeItem(idx)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Button type="button" variant="outline" size="sm" onClick={addItem}>+ Add Line</Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
              <div />
              <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl space-y-3">
                <div className="flex justify-between"><span>Sub-Total:</span><span className="font-bold">Rs. {summary.subTotal.toFixed(2)}</span></div>
                <div className="flex justify-between items-center"><span>Discount (%):</span><input type="number" min={0} max={100} className="w-24 border rounded p-1 text-right" value={formData.discountPercent} onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })} /></div>
                <div className="flex justify-between text-sm text-red-500"><span>Discount Amount:</span><span>- Rs. {summary.discountAmount.toFixed(2)}</span></div>
                <div className="flex justify-between items-center"><span>Carriage:</span><input type="number" className="w-24 border rounded p-1 text-right" value={formData.carriage} onChange={(e) => setFormData({ ...formData, carriage: e.target.value })} /></div>
                <div className="flex justify-between text-xl border-t pt-2 font-bold text-brand-500"><span>Grand Total:</span><span>Rs. {summary.grandTotal.toFixed(2)}</span></div>
                <div className="flex justify-between items-center"><span>Amount Paid:</span><input type="number" className="w-32 border-2 border-green-500 rounded p-1 text-right font-bold" value={formData.paidAmount} onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })} /></div>
                <div className="flex justify-between font-medium italic"><span>Balance Due:</span><span>Rs. {summary.balance.toFixed(2)}</span></div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
