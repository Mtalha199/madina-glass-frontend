"use client";
import React, { useState } from "react";
import { updateLeadStatus } from "../hooks/useProspectLeads";


const INTERNAL_STEPS = [
  "Incoming", "Contacted", "Quotation Sent", "Invoice Sent", 
  "Closed", "Not Interested", "No Contact Information",
  "Already Attended To by BFZ", "Invalid Contact"
];

export default function StatusUpdateModal({ lead, onClose, onRefresh }) {
  const [status, setStatus] = useState(lead.status || "TODO");
  const [internal, setInternal] = useState(lead.internalStatus || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateLeadStatus(lead.id, { status, internalStatus: internal });
      onRefresh(); // Refresh the table data
      onClose();   // Close modal
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-2xl border dark:border-gray-800 overflow-hidden">
        <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-white/5">
          <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Update Lead Status</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>

        <div className="p-4 space-y-6">
          {/* Main Status Selector (TODO, WON, etc.) */}
          <div className="flex border dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
            {["TODO", "STANDBY", "WON", "LOST"].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`flex-1 py-2 text-[10px] font-bold transition-all ${
                  status === s ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-blue-600 hover:bg-gray-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Internal Step Selection */}
          <div className="space-y-1 max-h-52 overflow-y-auto border dark:border-gray-700 rounded-lg p-1 bg-gray-50 dark:bg-white/5">
            {INTERNAL_STEPS.map((step) => (
              <button
                key={step}
                onClick={() => setInternal(step)}
                className={`w-full text-left px-3 py-2 rounded text-xs font-semibold ${
                  internal === step ? "bg-blue-800 text-white shadow-md" : "text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-white/10"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 flex gap-2 border-t dark:border-gray-800 bg-gray-50 dark:bg-white/5">
          <button onClick={onClose} className="flex-1 py-2 text-xs font-bold text-gray-500 border rounded-lg hover:bg-gray-100">Cancel</button>
          <button onClick={handleSave} disabled={loading} className="flex-1 py-2 text-xs font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}