"use client";
import React from "react";
import { Modal } from "@/components/ui/modal";
import { AlertTriangle, X, ArrowRight, UserCheck } from "lucide-react";

export function DuplicateAlertModal({ isOpen, onClose, prospect, onConfirm }: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[450px] p-0 border-0 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-8 text-center">
        {/* Warning Icon */}
        <div className="mx-auto w-20 h-20 bg-orange-100 dark:bg-orange-950/30 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="text-orange-500" size={40} />
        </div>

        <h3 className="text-xl font-black text-gray-800 dark:text-white uppercase tracking-tight mb-2">
          Duplicates Detected
        </h3>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          We found <span className="text-orange-600 font-bold">{prospect?.duplicateCount} records</span> with matching contact information. Are you sure you want to convert this into a new lead?
        </p>

        <div className="space-y-3">
          <button 
            onClick={() => { onConfirm(prospect.id); onClose(); }}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          >
            Yes, Convert Anyway <ArrowRight size={16}/>
          </button>
          
          <button 
            onClick={onClose}
            className="w-full py-4 bg-gray-50 dark:bg-gray-800 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
          >
            Cancel & Review
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-900 px-8 py-3 flex items-center justify-center gap-2 border-t dark:border-gray-800">
        <UserCheck size={12} className="text-gray-400"/>
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
          Verification Powered by Gemini CRM
        </span>
      </div>
    </Modal>
  );
}