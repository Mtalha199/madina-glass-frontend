"use client";
import React from "react";
import Link from "next/link";
import { ListIcon } from "@/icons";
import { formatDate } from "../shipments";

const ProspectTable = ({ prospects }: { prospects: any[] }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">List Details</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">To Qualify</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Active Leads</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Completion</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Created At</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Updated At</th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {prospects.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <ListIcon className="w-6 h-6 text-brand-500" />
                    <p className="text-sm font-bold text-gray-800 dark:text-white/90">{item.title}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.toQualify}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.activeLeads}</td>
                <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-brand-600 dark:text-brand-400">{item.completion}</span>
                        <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-500" style={{ width: item.completion }}></div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{formatDate(item.createdAt)}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{formatDate(item.updatedAt)}</td>

                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/crm/coldprospects/${item.id}`} className="text-sm font-medium text-brand-500 hover:underline">View Leads</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProspectTable;