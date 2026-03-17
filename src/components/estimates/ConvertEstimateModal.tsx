"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Select from "../form/Select";
import Input from "../form/input/InputField";
import { customersApi } from "@/lib/api/customer";
import { estimatesApi } from "@/lib/api/estimate";

export default function ConvertEstimateModal({ isOpen, onClose, estimateId, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [customerLookup, setCustomerLookup] = useState("");
  const [formData, setFormData] = useState<any>({
    customerType: "WALKIN",
    customerId: undefined,
  });

  useEffect(() => {
    if (!isOpen) return;
    setFormData({ customerType: "WALKIN", customerId: undefined });
    setCustomerLookup("");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || formData.customerType !== "CUSTOMER") return;
    setCustomersLoading(true);
    customersApi
      .getCustomers()
      .then((res) => setCustomers(res?.data || res || []))
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
    setFormData((prev: any) => ({ ...prev, customerId }));
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

  const handleConvert = async () => {
    if (!estimateId) return;
    try {
      setLoading(true);
      await estimatesApi.convertEstimate(estimateId, {
        customerType: formData.customerType,
        customerId: formData.customerType === "CUSTOMER" ? Number(formData.customerId || 0) || undefined : undefined,
      });
      onSuccess?.();
      onClose?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[520px] m-4">
      <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl">
        <h4 className="text-lg font-semibold mb-4">Convert Estimate to Invoice</h4>
        <div className="space-y-4">
          <div>
            <Label>Customer Type</Label>
            <Select
              options={[
                { value: "WALKIN", label: "Walk-In Customer" },
                { value: "CUSTOMER", label: "Permanent Customer" },
              ]}
              value={formData.customerType}
              onChange={(value) => {
                if (value === "WALKIN") setCustomerLookup("");
                setFormData((prev: any) => ({ ...prev, customerType: value, customerId: undefined }));
              }}
            />
          </div>

          {formData.customerType === "CUSTOMER" && (
            <div>
              <Label>Select Customer</Label>
              <Input
                placeholder={customersLoading ? "Loading customers..." : "Type ID or choose customer"}
                value={customerLookup}
                onChange={(e) => handleCustomerLookupChange(e.target.value)}
                list="convert-customer-options"
              />
              <datalist id="convert-customer-options">
                {customers.map((c: any) => (
                  <option key={c.id} value={`${c.id} - ${c.name} (${c.phone})`} />
                ))}
              </datalist>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConvert} disabled={loading}>
            {loading ? "Converting..." : "Convert"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
