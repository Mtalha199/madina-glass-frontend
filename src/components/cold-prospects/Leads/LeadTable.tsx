"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
    AddLeadIcon,
    HorizontaLDots,
} from "@/icons";
import {
    User,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    MinusCircle
} from 'lucide-react';
import ProspectModal from "../modals/leadModal";
import { DuplicateAlertModal } from "../modals/duplicateAlertModal";
import apiClient from "@/lib/api/config";

interface LeadTableProps {
    leads: any[];
    prospectListId: string;
    onRefresh: () => void;
}

const LeadTable = ({ leads, prospectListId, onRefresh }: LeadTableProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState<any>(null);


    const handleOpenEdit = (lead: any) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };

    const renderStatusIcon = (status: string) => {
        switch (status?.toUpperCase()) {
            case "WON":
                return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
            case "LOST":
                return <XCircle className="w-4 h-4 text-red-500" />;
            case "CANCELLED":
                return <MinusCircle className="w-4 h-4 text-orange-500" />;
            case "TODO":
                return <Clock className="w-4 h-4 text-yellow-600" />;
            case "STANDBY":
                return <AlertCircle className="w-4 h-4 text-cyan-600" />;
            case "NONE":
            default:
                return <AddLeadIcon className="w-3.5 h-3.5 text-brand-500" />;
        }
    };

    const getRowStyle = (status: string) => {
        if (status === "NONE" || !status) return "hover:bg-blue-50/30 dark:hover:bg-white/5";
        return "bg-gray-50/40 dark:bg-white/2 opacity-90 hover:opacity-100 transition-opacity";
    };
    const handleInstantConvert = async (id: string) => {
        try {
            // Call your API to change leadStatus from NONE to TODO
            await apiClient.patch(`/prospects/lead/${id}`, {
                leadStatus: "TODO"
            });

            // Show a success toast
            //   setToast({ visible: true, message: "Successfully converted to Lead!", type: "success" });

            // Refresh the table data
            onRefresh();
        } catch (error) {
            //   setToast({ visible: true, message: "Conversion failed", type: "error" });
        }
    };


    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed min-w-[1200px]">
                    <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-gray-800">
                        <tr className="text-left text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <th className="px-4 py-4 w-[60px] text-center"></th>
                            <th className="px-4 py-4 w-[200px]">Lead's Name</th>
                            <th className="px-4 py-4 w-[120px]">Assigned To</th>
                            <th className="px-4 py-4 w-[180px]">About Vehicle</th>
                            <th className="px-4 py-4 w-[200px]">Customer Info</th>
                            <th className="px-4 py-4 w-[180px]">Delivery Detail</th>
                            <th className="px-4 py-4 w-[120px]">Incoterms</th>
                            <th className="px-4 py-4 w-[100px]">Total</th>
                            <th className="px-4 py-4 w-[150px]">Last Emailed By</th>
                            <th className="px-4 py-4 w-[150px]">Notes</th>
                            <th className="px-4 py-4 w-[140px] text-center">Sent Quotation</th>
                            <th className="px-4 py-4 w-[120px]">Next Appt.</th>
                            <th className="px-4 py-4 w-[80px] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {leads?.map((item) => (
                            <tr
                                key={item.id}
                                className={`transition-colors group ${getRowStyle(item.leadStatus)}`}
                            >
                                <td className="px-4 py-4 text-center">
                                    <button
                                        onClick={() => {
                                            // If it's a prospect (NONE), check for duplicates first
                                            if (item.leadStatus === "NONE") {
                                                if (item.duplicateCount > 0) {
                                                    // If duplicates exist, open the small Duplicate Modal
                                                    setSelectedLead(item);
                                                    setIsDuplicateModalOpen(true);
                                                } else {
                                                    // If NO duplicates, convert immediately without opening any modal
                                                    handleInstantConvert(item.id);
                                                }
                                            } else {
                                                // If it's already a Lead (not NONE), open the main Edit Modal as usual
                                                handleOpenEdit(item);
                                            }
                                        }}
                                        className={`p-1.5 rounded-full  flex items-center justify-center mx-auto transition-transform hover:scale-110`}
                                    >
                                        {renderStatusIcon(item.leadStatus)}
                                    </button>
                                </td>

                                <td className="px-4 py-4">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer group/name"
                                        onClick={() => handleOpenEdit(item)}
                                    >
                                        <User className={`w-4 h-4 ${item.leadStatus === "WON" ? "text-blue-500" : item.leadStatus == "NONE" ? "text-brand-300 " : "text-gray-400"}`} />
                                        <p className="text-sm font-bold text-gray-800 underline dark:text-white/90 truncate group-hover/name:text-brand-500" title={item.leadsName}>
                                            {item.leadsName}
                                        </p>
                                    </div>
                                </td>

                                <td className="px-4 py-4 text-xs text-gray-600 dark:text-gray-400 truncate">{item.assignedTo}</td>
                                <td className="px-4 py-4 text-xs text-gray-600 dark:text-gray-400 truncate">{item.aboutVehicle}</td>
                                <td className="px-4 py-4 text-xs text-gray-600 dark:text-gray-400 truncate font-mono text-[10px]">{item.customerInfo}</td>
                                <td className="px-4 py-4 text-xs text-gray-600 dark:text-gray-400 truncate">{item.deliveryDetails}</td>
                                <td className="px-4 py-4 text-xs text-gray-600 dark:text-gray-400">{item.incoterms}</td>
                                <td className="px-4 py-4 text-xs font-bold text-gray-800 dark:text-white/80">{item.total}</td>
                                <td className="px-4 py-4 text-xs text-gray-600 dark:text-gray-400 truncate">{item.lastEmailedBy}</td>

                                <td className="px-4 py-4 text-xs text-gray-600 dark:text-gray-400">
                                    <p className="truncate w-full font-mono text-[10px]" title={item.notes}>
                                        {item.notes}
                                    </p>
                                </td>

                                <td className="px-4 py-4 text-xs text-gray-600 dark:text-gray-400 text-center">
                                    <p className="truncate w-full font-mono text-[10px]" title={item.sentQuotation}>
                                        {item.sentQuotation}
                                    </p>
                                </td>

                                <td className="px-4 py-4 text-[10px] text-gray-500 dark:text-gray-400 italic">
                                    {item.nextContactDate ? new Date(item.nextContactDate).toLocaleDateString() : "No appointment"}
                                </td>

                                <td className="px-4 py-4 text-right">
                                    <Link
                                        href={`/admin/crm/coldprospects/${item.id}`}
                                        className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-brand-50 text-brand-500"
                                    >
                                        <HorizontaLDots className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <ProspectModal
                    isOpen={isModalOpen}              
                    onClose={() => setIsModalOpen(false)}
                    prospect={selectedLead}          
                    onRefresh={onRefresh}        
                />
            )}
            <DuplicateAlertModal
                isOpen={isDuplicateModalOpen}
                onClose={() => setIsDuplicateModalOpen(false)}
                prospect={selectedLead}
            // onConfirm={(id) => handleInstantConvert(id)} // Confirming converts the lead
            />
        </div>
    );
};

export default LeadTable;