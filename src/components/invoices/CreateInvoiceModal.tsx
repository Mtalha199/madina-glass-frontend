"use client";
import React, { useState, useMemo } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { invoicesApi } from "@/lib/api/invoice";
import { TrashIcon } from "lucide-react";


export default function CreateInvoiceModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    { itemName: "", width: 0, height: 0, qtyPcs: 1, rate: 0, totalSqft: 0, value: 0 }
  ]);
  const [formData, setFormData] = useState({
    name: "", phone: "", driverName: "", cutterName: "", fitterName: "", carriage: 0, discount: 0, paidAmount: 0
  });

  // Calculate live summary
  const summary = useMemo(() => {
    const subTotal = items.reduce((acc, item) => acc + (item.value || 0), 0);
    const grandTotal = subTotal + (Number(formData.carriage) || 0) - (Number(formData.discount) || 0);
    const balance = grandTotal - (Number(formData.paidAmount) || 0);
    return { subTotal, grandTotal, balance };
  }, [items, formData]);

  const updateItem = (index, field, val) => {
    const newItems = [...items];
    newItems[index][field] = val;
    
    // Glass Logic: (W * H / 144) * Qty * Rate
    const { width, height, qtyPcs, rate } = newItems[index];
    const sqft = (Number(width) * Number(height) / 144) * Number(qtyPcs);
    newItems[index].totalSqft = Number(sqft.toFixed(2));
    newItems[index].value = Number((sqft * Number(rate)).toFixed(2));
    
    setItems(newItems);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const addItem = () => setItems([...items, { itemName: "", width: 0, height: 0, qtyPcs: 1, rate: 0, totalSqft: 0, value: 0 }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await invoicesApi.createInvoice({ ...formData, items });
      onSuccess();
      onClose();
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1100px] m-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl overflow-y-auto max-h-[95vh]">
        <h4 className="text-2xl font-semibold mb-6">New Sales Bill</h4>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Label>Customer Name</Label>
            <Input  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <Label>Phone</Label>

            <Input  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
          <Label>Driver</Label>
           
            <Input  value={formData.driverName} onChange={e => setFormData({...formData, driverName: e.target.value})} />
          <Label>Cutter</Label>
           
            <Input  value={formData.cutterName} onChange={e => setFormData({...formData, cutterName: e.target.value})} />
          </div>

          <div className="border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600">
                <tr>
                  <th className="p-3">Item Description</th>
                  <th className="p-3">W (in)</th>
                  <th className="p-3">H (in)</th>
                  <th className="p-3">Pcs</th>
                  <th className="p-3">Sqft</th>
                  <th className="p-3">Rate</th>
                  <th className="p-3">Total</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2"><input className="w-full bg-transparent p-1" placeholder="e.g. 5mm Clear" value={item.itemName} onChange={e => updateItem(idx, 'itemName', e.target.value)} /></td>
                    <td className="p-2"><input type="number" className="w-16 border rounded p-1" value={item.width} onChange={e => updateItem(idx, 'width', e.target.value)} /></td>
                    <td className="p-2"><input type="number" className="w-16 border rounded p-1" value={item.height} onChange={e => updateItem(idx, 'height', e.target.value)} /></td>
                    <td className="p-2"><input type="number" className="w-12 border rounded p-1" value={item.qtyPcs} onChange={e => updateItem(idx, 'qtyPcs', e.target.value)} /></td>
                    <td className="p-2 text-center font-mono">{item.totalSqft}</td>
                    <td className="p-2"><input type="number" className="w-20 border rounded p-1" value={item.rate} onChange={e => updateItem(idx, 'rate', e.target.value)} /></td>
                    <td className="p-2 font-bold">Rs.{item.value}</td>
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

          <Button type="button" variant="outline" size="sm" onClick={addItem}>+ Add Line</Button>

          {/* TOTALS AREA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t">
            <div className="space-y-4">
              <Label>Remarks</Label>
              <textarea className="w-full border rounded-xl p-3 h-24" onChange={e => setFormData({...formData, remarks: e.target.value})} />
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl space-y-3">
              <div className="flex justify-between"><span>Sub-Total:</span><span className="font-bold">Rs. {summary.subTotal.toFixed(2)}</span></div>
              <div className="flex justify-between items-center">
                <span>Carriage (+):</span>
                <input type="number" className="w-24 border rounded p-1 text-right" value={formData.carriage} onChange={e => setFormData({...formData, carriage: e.target.value})} />
              </div>
              <div className="flex justify-between items-center">
                <span>Discount (-):</span>
                <input type="number" className="w-24 border rounded p-1 text-right text-red-500" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} />
              </div>
              <div className="flex justify-between text-xl border-t pt-2 font-bold text-brand-500">
                <span>Grand Total:</span><span>Rs. {summary.grandTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span>Amount Paid:</span>
                <input type="number" className="w-32 border-2 border-green-500 rounded p-1 text-right font-bold" value={formData.paidAmount} onChange={e => setFormData({...formData, paidAmount: e.target.value})} />
              </div>
              <div className="flex justify-between text-brand-500 font-medium italic">
                <span>Balance Due:</span><span>Rs. {summary.balance.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Create & Print"}</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}