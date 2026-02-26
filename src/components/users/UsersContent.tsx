"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import Badge from "../ui/badge/Badge";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { HorizontaLDots } from "@/icons";
import Pagination from "../tables/Pagination";
import { usersApi, ApiUser } from "@/lib/api/users";
import ResourceNotFound from "../common/ResourceNotFound";
import Skeleton from "../ui/skeleton/Skeleton";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  isActive: boolean;
  profilePic: string | null;
  createdAt: string;
}

// Helper function to get the base URL without /api/v1 for static assets
const getBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  // Remove /api/v1 if present, static files are served at root level
  return apiUrl.replace(/\/api\/v1$/, '');
};

// Helper function to construct profile picture URL
const getProfilePicUrl = (profilePic: string | null): string => {
  if (!profilePic) return "";

  // If already a full URL, return as is
  if (profilePic.startsWith('http://') || profilePic.startsWith('https://')) {
    return profilePic;
  }

  // Construct URL: baseUrl + profilePic path
  // profilePic is stored as "/uploads/profile-pictures/filename.jpg"
  return `${getBaseUrl()}${profilePic}`;
};

// Helper function to get initials from name
const getInitials = (name: string | null | undefined): string => {
  if (!name) return "U";

  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }

  const firstInitial = nameParts[0].charAt(0).toUpperCase();
  const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

export default function UsersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  // Get current page from URL, with state fallback for immediate updates
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [currentPageState, setCurrentPageState] = useState(pageFromUrl);
  
  // Sync state with URL when URL changes
  useEffect(() => {
    setCurrentPageState(pageFromUrl);
  }, [pageFromUrl]);
  
  const currentPage = currentPageState;
  const itemsPerPage = 10;

  // Search state - initialized from URL
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(searchParams.get("search") || "");

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [metadata, setMetadata] = useState<{ total: number; offset: number; limit: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleImageError = (userId: number) => {
    setFailedImages(prev => new Set(prev).add(userId));
  };

  // Debounce search input (500ms delay)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Reset page to 1 when search changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }
    
    // Reset to page 1 when search changes
    setCurrentPageState(1);
  }, [debouncedSearch]);

  // Update URL when debounced search changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Create new params from current search params to preserve other filters
    const params = new URLSearchParams();
    
    // Preserve existing params except search and page
    searchParams.forEach((value, key) => {
      if (key !== "search" && key !== "page") {
        params.set(key, value);
      }
    });
    
    // Add or remove search parameter
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }
    
    // Reset to page 1 when search changes
    params.set("page", "1");

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, pathname, router]);

  // Prepare API params with pagination and search
  const apiParams = useMemo(() => {
    const params: { page: number; limit: number; search?: string } = {
      page: currentPage,
      limit: itemsPerPage,
    };
    
    // Include search if it has a value
    if (debouncedSearch !== undefined && debouncedSearch !== null) {
      const trimmedSearch = debouncedSearch.trim();
      if (trimmedSearch) {
        params.search = trimmedSearch;
      }
    }
    
    return params;
  }, [currentPage, debouncedSearch]);

  const fetchUsers = useCallback(async (params: { page: number; limit: number; search?: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await usersApi.getUsers(params);
      
      if (response?.success && response.data?.users) {
        const mappedUsers: User[] = response.data.users.map((user: ApiUser) => ({
          id: user.id,
          name: user.name || "Unknown",
          email: user.email || "",
          phone: user.phone,
          isActive: user.isActive ?? true,
          profilePic: user.profilePic,
          createdAt: user.createdAt,
        }));
        
        setUsers(mappedUsers);
        setMetadata(response.data.meta || null);
      } else {
        setUsers([]);
        setMetadata(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "An error occurred while fetching users");
      setUsers([]);
      setMetadata(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(apiParams);
  }, [apiParams, fetchUsers]);

  // Handle page change for server-side pagination
  function handlePageChange(page: number) {
    // Update state immediately for instant UI feedback
    setCurrentPageState(page);
    
    // Preserve all existing query parameters and update only the page
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // Use meta data for pagination
  const totalPages = metadata ? Math.ceil(metadata.total / itemsPerPage) : 1;
  const totalItems = metadata?.total || 0;

  const handleToggleDropdown = (userId: number) => {
    setOpenDropdownId(openDropdownId === userId ? null : userId);
  };

  const handleCloseDropdown = () => {
    setOpenDropdownId(null);
  };



  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="space-y-4">
        {/* Search Bar - Always visible */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear search"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Loading State - Table Skeleton */}
        {isLoading ? (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            <div className="w-full">
              {/* Table Header Skeleton */}
              <div className="border-b border-gray-100 dark:border-white/5">
                <div className="grid grid-cols-6 gap-4 px-4 py-3">
                  <Skeleton variant="text" height={20} width="40%" />
                  <Skeleton variant="text" height={20} width="50%" />
                  <Skeleton variant="text" height={20} width="45%" />
                  <Skeleton variant="text" height={20} width="35%" />
                  <Skeleton variant="text" height={20} width="40%" />
                  <Skeleton variant="text" height={20} width="30%" />
                </div>
              </div>
              
              {/* Table Rows Skeleton */}
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <div key={i} className="grid grid-cols-6 gap-4 px-4 py-4">
                    {/* Name with Avatar */}
                    <div className="flex items-center gap-3">
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="text" height={18} width={120} />
                    </div>
                    {/* Email */}
                    <div className="flex items-center">
                      <Skeleton variant="text" height={16} width={180} />
                    </div>
                    {/* Phone */}
                    <div className="flex items-center">
                      <Skeleton variant="text" height={16} width={120} />
                    </div>
                    {/* Status Badge */}
                    <div className="flex items-center">
                      <Skeleton variant="rectangular" height={24} width={70} className="rounded-full" />
                    </div>
                    {/* Created At */}
                    <div className="flex items-center">
                      <Skeleton variant="text" height={16} width={100} />
                    </div>
                    {/* Actions */}
                    <div className="flex items-center justify-end">
                      <Skeleton variant="rectangular" height={32} width={32} className="rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : error ? (
          /* Error State */
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            <ResourceNotFound 
              variant="error"
              title="Failed to Load Users"
              message="We couldn't load the users list. Please try again or contact support if the problem persists."
            />
          </div>
        ) : users.length === 0 ? (
          /* Empty State */
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            <ResourceNotFound 
              variant="empty"
              title="No Users Found"
              message="There are no users in the system yet. Users will appear here once they are added."
            />
          </div>
        ) : (
          /* Table Content */
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="w-full">
          <Table className="w-full">
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/5">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Phone
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Created At
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-12"
                >
                  <span className="sr-only">Actions</span>
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {users.map((user) => {
                const hasImageFailed = failedImages.has(user.id);
                const profilePicUrl = user.profilePic ? getProfilePicUrl(user.profilePic) : null;
                const shouldShowImage = profilePicUrl && !hasImageFailed;

                return <TableRow
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-white/2"
                >
                  <TableCell className="px-4 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden bg-brand-500 flex items-center justify-center">
                        {shouldShowImage ? (
                          <Image
                            src={profilePicUrl}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                            unoptimized
                            onError={() => handleImageError(user.id)}
                          />
                        ) : (
                          <span className="text-white text-sm font-medium select-none">
                            {getInitials(user.name)}
                          </span>
                        )}
                      </div>
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90 truncate">
                        {user.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="truncate block max-w-[200px]">{user.email}</span>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="truncate block max-w-[150px]">{user.phone || "-"}</span>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-start">
                    <Badge 
                      size="sm" 
                      color={user.isActive ? "success" : "error"} 
                      variant="light"
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="truncate block">{formatDate(user.createdAt)}</span>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-start w-12">
                    <div className="relative">
                      <button
                        onClick={() => handleToggleDropdown(user.id)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        aria-label="Actions"
                      >
                        <HorizontaLDots className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </button>
                      <Dropdown
                        isOpen={openDropdownId === user.id}
                        onClose={handleCloseDropdown}
                        className="min-w-40 py-1"
                      >
                        <DropdownItem
                          onClick={() => {
                            console.log("Edit user:", user.id);
                            handleCloseDropdown();
                          }}
                          baseClassName="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-gray-200"
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            console.log("View user:", user.id);
                            handleCloseDropdown();
                          }}
                          baseClassName="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-gray-200"
                        >
                          View Details
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            console.log("Delete user:", user.id);
                            handleCloseDropdown();
                          }}
                          baseClassName="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10"
                        >
                          Delete
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </div>
          </div>
        )}
      </div>

      {metadata && metadata.total > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </>
  );
}

