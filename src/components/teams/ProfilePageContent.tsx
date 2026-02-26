"use client";

import { useEffect, useState, useCallback } from "react";
import UserAddressCard from "../user-profile/UserAddressCard";
import UserInfoCard from "../user-profile/UserInfoCard";
import UserMetaCard from "../user-profile/UserMetaCard";
import { AdminProfile, ProfileApi } from "@/lib/api/profile";
import Skeleton from "../ui/skeleton/Skeleton";

export default function ProfilePageContent() {
    const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchProfile = useCallback(async (showLoading = true) => {
        try {
            if (showLoading) {
                setLoading(true);
            } else {
                setIsRefreshing(true);
            }
            setError(null);
            const profile = await ProfileApi.getProfile();
            setAdminProfile(profile);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to load profile";
            setError(errorMessage);
            console.error("Error fetching profile:", err);
        } finally {
            if (showLoading) {
                setLoading(false);
            } else {
                setIsRefreshing(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchProfile(true);
    }, [fetchProfile]);

    const refreshProfile = useCallback(async () => {
        await fetchProfile(false);
    }, [fetchProfile]);

    // Loading state
    if (loading) {
        return (
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12">
                    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                        <Skeleton variant="rectangular" height={80} width="100%" />
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-6">
                    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                        <Skeleton variant="rectangular" height={400} width="100%" />
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-6">
                    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                        <Skeleton variant="rectangular" height={400} width="100%" />
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error && !adminProfile) {
        return (
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12">
                    <div className="p-5 border border-error-200 rounded-2xl dark:border-error-800 lg:p-6 bg-error-50 dark:bg-error-900/20">
                        <div className="flex flex-col items-center justify-center gap-4 py-8">
                            <svg
                                className="w-12 h-12 text-error-500 dark:text-error-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-error-800 dark:text-error-300 mb-2">
                                    Failed to Load Profile
                                </h3>
                                <p className="text-sm text-error-600 dark:text-error-400 mb-4">{error}</p>
                                <button
                                    onClick={() => fetchProfile(true)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-error-500 rounded-lg hover:bg-error-600 dark:bg-error-600 dark:hover:bg-error-700 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            {error && adminProfile && (
                <div className="col-span-12">
                    <div className="p-3 mb-4 text-sm text-error-600 bg-error-50 rounded-lg dark:bg-error-900/20 dark:text-error-400 border border-error-200 dark:border-error-800">
                        <div className="flex items-center justify-between">
                            <span>{error}</span>
                            <button
                                onClick={() => setError(null)}
                                className="text-error-500 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="col-span-12">
                <UserMetaCard adminProfile={adminProfile} onUpdate={refreshProfile} />
            </div>

            <div className="col-span-12 xl:col-span-6">
                <UserInfoCard adminProfile={adminProfile} onUpdate={refreshProfile} />
            </div>

            <div className="col-span-12 xl:col-span-6">
                <UserAddressCard adminProfile={adminProfile} onUpdate={refreshProfile} />
            </div>
        </div>
    );
}