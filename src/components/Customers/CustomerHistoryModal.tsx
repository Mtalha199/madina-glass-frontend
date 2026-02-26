"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

import Badge from "../ui/badge/Badge";
import { customersApi } from "@/lib/api/customer";
import { Loader } from "lucide-react";

export default function CustomerHistoryModal({ isOpen, onClose, customerId }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && customerId) {
      setLoading(true);
      customersApi.getCustomerById(customerId).then((res) => {
        setData(res.data || res);
        setLoading(false);
      });
    }
  }, [isOpen, customerId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[900px]">
      <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl overflow-y-auto max-h-[85vh]">
        {loading ? (
          <div className="flex justify-center py-10"><Loader /></div>
        ) : (
          <>
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{data.name}</h2>
              <p className="text-gray-500">{data.phone} • {data.address || "No Address"}</p>
            </div>

            <h4 className="text-lg font-semibold mb-4 text-brand-500">Order Ledger</h4>
            <div className="space-y-4">
              {data.invoices.map((inv: any) => (
                <div key={inv.id} className="border dark:border-gray-800 rounded-2xl p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-mono text-gray-400">#{inv.invoiceNumber}</span>
                      <p className="text-sm font-medium">{new Date(inv.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Badge color={inv.balance <= 0 ? "success" : "error"}>
                      {inv.balance <= 0 ? "Fully Paid" : `Pending: Rs. ${inv.balance}`}
                    </Badge>
                  </div>

                  {/* Item Mini-List */}
                  <div className="bg-gray-100/50 dark:bg-gray-800/50 rounded-lg p-3 text-xs">
                    {inv.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700 last:border-0">
                        <span>{item.itemName} ({item.width}"x{item.height}")</span>
                        <span className="font-medium">Rs. {item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-4 text-sm">
                    <span className="text-gray-500">Billed by: <b className="text-gray-700 dark:text-gray-300">{inv.admin?.name}</b></span>
                    <span className="font-bold">Total: Rs. {inv.billValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="mt-8 flex justify-end">
          <Button onClick={onClose} variant="outline">Close Ledger</Button>
        </div>
      </div>
    </Modal>
  );
}