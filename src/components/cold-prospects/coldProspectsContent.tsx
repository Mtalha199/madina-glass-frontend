"use client";

import React, { useState, lazy, Suspense, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import CommonPageHeader from "../common/CommonPageHeader";
import Pagination from "../tables/Pagination";
import Toast from "@/components/ui/toast/Toast";
import Button from "../ui/button/Button";
import { ListIcon, GridIcon, PlusIcon } from "@/icons";
import { useModal } from "@/hooks/useModal";
import BulkImportModal from "./modals/uploadPropectsModal";
import { useProspects } from "./hooks/useProspects";
import ProspectTable from "./prospectTable";
import ProspectCard from "./prospectCard";
import VehicleTableSkeleton from "../vehicle-tracking/VehicleTableSkeleton";


export default function ColdProspectsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const isInitialMount = useRef(true);

    const [filters, setFilters] = useState({
        search: searchParams.get("search") || undefined,
    });

    const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

    // View mode: list or grid
    const viewFromUrl = searchParams.get("view") as "list" | "grid" | null;
    const [viewMode, setViewMode] = useState<"list" | "grid">(
        viewFromUrl === "grid" || viewFromUrl === "list" ? viewFromUrl : "list"
    );

    // Pagination state
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    const [currentPageState, setCurrentPageState] = useState(pageFromUrl);

    useEffect(() => {
        setCurrentPageState(pageFromUrl);
    }, [pageFromUrl]);

    // Debounce search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(filters.search);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [filters.search]);

    // Update URL on Search/Filter change
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        const params = new URLSearchParams();
        if (debouncedSearch) params.set("search", debouncedSearch);
        params.set("page", "1");
        setCurrentPageState(1);

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [debouncedSearch, pathname, router]);

    // Fetch Prospects Data (Uses your new API: /prospects?page=1&limit=10)
    const { prospects, meta, isLoading, refetch } = useProspects({
        page: currentPageState,
        limit: 9,
        search: debouncedSearch
    });

    const { isOpen, openModal, closeModal } = useModal();
    const [toast, setToast] = useState({
        message: "",
        type: "success" as "success" | "error",
        isVisible: false,
    });

    function handlePageChange(page: number) {
        setCurrentPageState(page);
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    function handleViewModeChange(mode: "list" | "grid") {
        setViewMode(mode);
        const params = new URLSearchParams(searchParams.toString());
        params.set("view", mode);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    // Map your API response to the pagination component
    const totalPages = meta?.totalPages || 1;
    const totalItems = meta?.totalRecords || 0;

    return (
        <div>
            <CommonPageHeader
                title="Prospecting Lists"
                subtitle="Monitor and track all prospecting lists in real-time."
                breadcrumbs={[
                    { label: "Dashboard", href: "/admin/dashboard" },
                    { label: "Prospecting Lists" },
                ]}
                actions={[
                    {
                        label: "Add New Prospects",
                        icon: <PlusIcon />,
                        onClick: openModal,
                        variant: "primary",
                        size: "sm",
                    },
                ]}
            />

            <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
                        All Lists
                    </h2>
                    <div className="flex items-center gap-2">
                        {!isLoading && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {totalItems} lists found
                            </span>
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

                {isLoading ? (
                    <VehicleTableSkeleton count={9} />
                ) : prospects.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">No prospecting lists found.</p>
                    </div>
                ) : (
                    <>
                        {viewMode === "list" ? (
                            <ProspectTable prospects={prospects} />
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
                                {prospects.map((item: any) => (
                                    <ProspectCard key={item.id} prospect={item} />
                                ))}
                            </div>
                        )}
                        
                        <Pagination
                            currentPage={currentPageState}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            totalItems={totalItems}
                            itemsPerPage={10}
                        />
                    </>
                )}
            </div>

            {isOpen && (
                <Suspense fallback={null}>
                    <BulkImportModal
                        isOpen={isOpen}
                        onClose={closeModal}
                        onSave={async () => {
                            await refetch();
                            closeModal();
                            setToast({ message: "Import successful", type: "success", isVisible: true });
                        }}
                    />
                </Suspense>
            )}

            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />
        </div>
    );
}