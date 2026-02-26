"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { 
  X, User, Phone, Mail, ChevronLeft, ChevronRight, 
  Plus, Save, AlertCircle, LayoutGrid, ClipboardList,
  CheckCircle2, Flame, RotateCcw, ShieldCheck
} from "lucide-react";

// Status Options
const LEAD_STATUS_OPTIONS = ["TODO", "WON", "LOST", "STANDBY", "CANCELLED"];
const INTERNAL_STATUS_OPTIONS = ["New Inquiry", "Price Sent", "Negotiation", "Follow Up", "Deposit Paid", "Shipment Arranged"];

export default function ProspectModal({ isOpen, onClose, prospect, onRefresh }: any) {
  const [formData, setFormData] = useState<any>({});
  const [duplicateCount, setDuplicateCount] = useState<number>(0); // Mocking 2 for demo, set to 0 to see "No Duplicates"

  const isConvertedLead = formData.leadStatus && formData.leadStatus !== "NONE";

  useEffect(() => {
    if (isOpen && prospect) {
      setFormData({ ...prospect });
      // Here you would typically trigger an API call to check duplicates:
      // checkDuplicates(prospect.customerInfo).then(count => setDuplicateCount(count));
      setDuplicateCount(prospect.duplicateCount || 0); 
    }
  }, [isOpen, prospect]);

  const handleUpdateField = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const rowClass = "flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100 dark:border-gray-800/50 last:border-0";
  const labelClass = "sm:w-44 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 sm:mb-0";
  const inputClass = "flex-1 bg-transparent text-sm font-medium text-gray-700 dark:text-gray-200 outline-none focus:text-orange-600 transition-colors";
  const selectClass = "flex-1 bg-transparent text-sm font-bold text-orange-600 outline-none cursor-pointer appearance-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1250px] p-0 border-0 overflow-hidden shadow-2xl rounded-3xl">
      {/* Header */}
      <div className="bg-white dark:bg-[#0f172a] px-8 py-5 border-b dark:border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg ${isConvertedLead ? 'bg-green-500 shadow-green-500/20' : 'bg-orange-500 shadow-orange-500/20'}`}>
            {isConvertedLead ? <CheckCircle2 className="text-white" size={24} /> : <User className="text-white" size={24} />}
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-800 dark:text-white leading-tight">
              {formData.leadsName || "New Prospect"}
            </h2>
            <div className="flex items-center gap-3 mt-1">
               <span className={`px-2 py-0.5 text-[9px] font-black rounded uppercase ${isConvertedLead ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                 {formData.leadStatus || "NONE"}
               </span>
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter italic">
                 {isConvertedLead ? "Lead Management" : "Prospect Review"}
               </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex bg-gray-50 dark:bg-gray-800/50 rounded-xl p-1 border dark:border-gray-700">
             <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all"><ChevronLeft size={18}/></button>
             <div className="px-4 flex items-center text-[11px] font-black text-gray-500">Record 6 / 151</div>
             <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all"><ChevronRight size={18}/></button>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-red-50 hover:text-red-500 transition-all">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex h-[78vh] bg-[#fdfdfe] dark:bg-[#0b1222]">
        {/* Left Side: Form Content */}
        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            
            {/* Column 1: Core Details & Status Management */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b-2 border-orange-500 w-fit">
                    <LayoutGrid size={16} className="text-orange-500" />
                    <h3 className="text-xs font-black text-gray-800 dark:text-white uppercase tracking-widest">Primary Identity</h3>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border dark:border-gray-800 shadow-sm">
                    <div className={rowClass}><label className={labelClass}>Lead Name</label><input className={inputClass} value={formData.leadsName} onChange={(e)=>handleUpdateField('leadsName', e.target.value)} /></div>
                    <div className={rowClass}><label className={labelClass}>Customer Info</label><input className={inputClass} value={formData.customerInfo} onChange={(e)=>handleUpdateField('customerInfo', e.target.value)} /></div>
                    <div className={rowClass}><label className={labelClass}>Assigned To</label><input className={inputClass} value={formData.assignedTo} onChange={(e)=>handleUpdateField('assignedTo', e.target.value)} /></div>
                </div>
              </div>

              {/* Status Section: Only editable if LeadStatus != NONE */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b-2 border-blue-500 w-fit">
                    <Flame size={16} className="text-blue-500" />
                    <h3 className="text-xs font-black text-gray-800 dark:text-white uppercase tracking-widest">Pipeline Management</h3>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border dark:border-gray-800 shadow-sm">
                    {isConvertedLead ? (
                        <>
                            <div className={rowClass}>
                                <label className={labelClass}>Lead Journey</label>
                                <select 
                                    className={selectClass} 
                                    value={formData.leadStatus} 
                                    onChange={(e) => handleUpdateField('leadStatus', e.target.value)}
                                >
                                    {LEAD_STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                            <div className={rowClass}>
                                <label className={labelClass}>Internal Status</label>
                                <select 
                                    className={selectClass} 
                                    value={formData.internalStatus} 
                                    onChange={(e) => handleUpdateField('internalStatus', e.target.value)}
                                >
                                    {INTERNAL_STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                        </>
                    ) : (
                        <div className="py-4 px-2 flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-400"><AlertCircle size={16}/></div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                              Status controls will unlock <br/> once converted to lead.
                            </p>
                        </div>
                    )}
                </div>
              </div>
            </div>

            {/* Column 2: Specs */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-orange-500 w-fit">
                <ClipboardList size={16} className="text-orange-500" />
                <h3 className="text-xs font-black text-gray-800 dark:text-white uppercase tracking-widest">Specifications</h3>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border dark:border-gray-800 shadow-sm">
                <div className={rowClass}><label className={labelClass}>Vehicle</label><input className={inputClass} value={formData.aboutVehicle} onChange={(e)=>handleUpdateField('aboutVehicle', e.target.value)} /></div>
                <div className={rowClass}><label className={labelClass}>Delivery</label><input className={inputClass} value={formData.deliveryDetails} onChange={(e)=>handleUpdateField('deliveryDetails', e.target.value)} /></div>
                <div className={rowClass}><label className={labelClass}>Incoterms</label><input className={inputClass} value={formData.incoterms} onChange={(e)=>handleUpdateField('incoterms', e.target.value)} /></div>
                <div className={rowClass}><label className={labelClass}>Total Value</label><input className={`${inputClass} font-mono text-orange-600 font-bold`} value={formData.total} onChange={(e)=>handleUpdateField('total', e.target.value)} /></div>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-4">
             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Activity Log / Private Notes</h3>
             <textarea 
               className="w-full h-40 bg-white dark:bg-gray-900 rounded-3xl border dark:border-gray-800 p-6 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
               placeholder="Add internal notes here..."
               value={formData.notes}
               onChange={(e)=>handleUpdateField('notes', e.target.value)}
             />
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="w-[420px] border-l dark:border-gray-800 p-10 flex flex-col bg-gray-50/30">
          
          {/* Permanent Duplicate Found Section */}
          <div className={`mb-8 p-5 rounded-2xl border flex items-center gap-4 transition-all ${
            duplicateCount > 0 
              ? 'bg-orange-50 border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/30' 
              : 'bg-green-50 border-green-100 dark:bg-green-950/10 dark:border-green-900/20'
          }`}>
            <div className={`h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm ${
              duplicateCount > 0 ? 'text-orange-500' : 'text-green-500'
            }`}>
              {duplicateCount > 0 ? <AlertCircle size={20}/> : <ShieldCheck size={20}/>}
            </div>
            <div>
              <p className={`text-[11px] font-black uppercase tracking-tight ${
                duplicateCount > 0 ? 'text-orange-700' : 'text-green-700'
              }`}>
                {duplicateCount > 0 ? `${duplicateCount} Duplicates Found` : 'No Duplicates Found'}
              </p>
              <button className="text-[9px] font-bold text-gray-400 uppercase underline hover:text-orange-500 transition-colors">
                View Records
              </button>
            </div>
          </div>

          <div className="space-y-4 flex-1">
             {!isConvertedLead ? (
                <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/30 transition-all flex items-center justify-center gap-3 active:scale-95">
                  <Plus size={20} strokeWidth={3} /> Convert to Lead
                </button>
             ) : (
                <div className="p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl flex flex-col items-center text-center shadow-sm">
                    <CheckCircle2 size={32} className="text-green-500 mb-2" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Pipeline</span>
                </div>
             )}
             
             <div className="grid grid-cols-2 gap-3 pt-4">
               <button className="py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl text-gray-400 hover:text-orange-500 transition-all flex flex-col items-center gap-1">
                 <Phone size={20}/> <span className="text-[8px] font-black uppercase">Call</span>
               </button>
               <button className="py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl text-gray-400 hover:text-orange-500 transition-all flex flex-col items-center gap-1">
                 <Mail size={20}/> <span className="text-[8px] font-black uppercase">Email</span>
               </button>
             </div>
          </div>

          <div className="mt-auto space-y-3">
            {isConvertedLead && (
                <button 
                  onClick={() => handleUpdateField('leadStatus', 'NONE')}
                  className="w-full py-3 border border-gray-200 text-gray-400 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <RotateCcw size={12} className="inline mr-2"/> Revert to Prospect
                </button>
            )}
            <button className="w-full py-4 bg-gray-900 dark:bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                <Save size={16}/> Save Changes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}