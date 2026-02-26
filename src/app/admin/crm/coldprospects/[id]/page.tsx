"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"; // Captures the [id] from params
import { fetchProspectLeads } from "@/components/cold-prospects/hooks/useProspectLeads";
import VehicleTableSkeleton from "@/components/vehicle-tracking/VehicleTableSkeleton";
import LeadTable from "@/components/cold-prospects/Leads/LeadTable";
import LeadCard from "@/components/cold-prospects/Leads/leadsCard";

import { GridIcon, ListIcon } from "@/icons";


export default function ProspectDetailPage() {
        const searchParams = useSearchParams();
    
  const params = useParams();
  const listId = params.id as string; // Get id from URL
    const router = useRouter();
    const pathname = usePathname();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
      const [filters, setFilters] = useState({
          search: searchParams.get("search") || undefined,
      });

  const viewFromUrl = searchParams.get("view") as "list" | "grid" | null;

      const [viewMode, setViewMode] = useState<"list" | "grid">(
          viewFromUrl === "grid" || viewFromUrl === "list" ? viewFromUrl : "list"
      );
  
  const loadData = useCallback(async () => {
    if (!listId) return;
    try {
      const result = await fetchProspectLeads(listId);
      setData(result);
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setLoading(false);
    }
  }, [listId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  console.log(data,"Asdfasd")
  function handleViewModeChange(mode: "list" | "grid") {
    setViewMode(mode);
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", mode);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
}

  if (loading) return <div className="p-10 text-center text-xs font-bold animate-pulse">Loading Leads...</div>;
  return (
    <div className="p-4 sm:p-6 space-y-4 bg-gray-50 dark:bg-black min-h-screen">

      
      <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
                        {data?.title || "Lead Lists"}
                    </h2>
                    <div className="flex items-center gap-2">
                        {!loading && (
                            <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-brand-500/10 text-brand-600 px-2 py-0.5 rounded-full font-bold">
                                ID: {listId}
                            </span>
                            <p className="text-xs text-gray-500">
                                {data?.leads?.length || 0} Leads found
                            </p>
                        </div>
                        )}
                        <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 p-0.5">
                            <button
                                onClick={() => handleViewModeChange("list")}
                                className={`flex items-center justify-center w-9 h-9 rounded-md transition-colors ${
                                    viewMode === "list" ? "bg-white dark:bg-white/10 shadow-sm text-brand-600" : "text-gray-500"
                                }`}
                            >
                                <ListIcon className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => handleViewModeChange("grid")}
                                className={`flex items-center justify-center w-9 h-9 rounded-md transition-colors ${
                                    viewMode === "grid" ? "bg-white dark:bg-white/10 shadow-sm text-brand-600" : "text-gray-500"
                                }`}
                            >
                                <GridIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>


      {loading ? (
                    <VehicleTableSkeleton count={9} />
                ) : data.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">No prospecting lists found.</p>
                    </div>
                ) : (
                    <>
                        {viewMode === "list" ? (
                            <LeadTable leads={data?.leads} />
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
                                {data?.leads.map((item: any) => (
                                    <LeadCard key={item.id} prospect={item} />
                                ))}
                            </div>
                        )}
                        
                        {/* <Pagination
                            currentPage={currentPageState}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            totalItems={totalItems}
                            itemsPerPage={10}
                        /> */}
                    </>
                )}

    </div>
  );
}