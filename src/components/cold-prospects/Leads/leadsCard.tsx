"use client";
import React from "react";
import Link from "next/link";
import { ListIcon } from "@/icons";
import { formatDate } from "@/components/shipments";


const LeadCard = ({ prospect }: { prospect: any }) => {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl bg-white dark:border-gray-800 dark:bg-white/3 hover:border-gray-300 transition-colors">
      <div className="flex items-start gap-3 mb-4">
        <ListIcon className="w-6 h-6 text-brand-500 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-800 dark:text-white/90 truncate">{prospect.title}</p>
          <p className="text-xs text-gray-500 mt-1">To Qualify: {prospect.toQualify}</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Completion Progress</span>
            <span className="font-bold text-brand-600">{prospect.completion}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500" style={{ width: prospect.completion }}></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{formatDate(prospect.createdAt)}</span>
        <Link href={`/admin/prospects/${prospect.id}`} className="text-sm font-medium text-brand-500 hover:text-brand-600">View Details</Link>
      </div>
    </div>
  );
};

export default LeadCard;