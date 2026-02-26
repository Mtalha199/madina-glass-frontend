(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/madina-glass-frontend/src/components/ui/table/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Table",
    ()=>Table,
    "TableBody",
    ()=>TableBody,
    "TableCell",
    ()=>TableCell,
    "TableHeader",
    ()=>TableHeader,
    "TableRow",
    ()=>TableRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
// Table Component
const Table = ({ children, className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
        className: `min-w-full  ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/table/index.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Table;
// TableHeader Component
const TableHeader = ({ children, className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/table/index.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = TableHeader;
// TableBody Component
const TableBody = ({ children, className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/table/index.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = TableBody;
// TableRow Component
const TableRow = ({ children, className, onClick })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: className,
        onClick: onClick,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/table/index.tsx",
        lineNumber: 52,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c3 = TableRow;
// TableCell Component
const TableCell = ({ children, isHeader = false, className })=>{
    const CellTag = isHeader ? "th" : "td";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CellTag, {
        className: ` ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/table/index.tsx",
        lineNumber: 62,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c4 = TableCell;
;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Table");
__turbopack_context__.k.register(_c1, "TableHeader");
__turbopack_context__.k.register(_c2, "TableBody");
__turbopack_context__.k.register(_c3, "TableRow");
__turbopack_context__.k.register(_c4, "TableCell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/ui/badge/Badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Badge = ({ variant = "light", color = "primary", size = "md", startIcon, endIcon, children })=>{
    const baseStyles = "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";
    // Define size styles
    const sizeStyles = {
        sm: "text-theme-xs",
        md: "text-sm"
    };
    // Define color styles for variants
    const variants = {
        light: {
            primary: "bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400",
            success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
            error: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500",
            warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
            info: "bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500",
            light: "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80",
            dark: "bg-gray-500 text-white dark:bg-white/5 dark:text-white"
        },
        solid: {
            primary: "bg-brand-500 text-white dark:text-white",
            success: "bg-success-500 text-white dark:text-white",
            error: "bg-error-500 text-white dark:text-white",
            warning: "bg-warning-500 text-white dark:text-white",
            info: "bg-blue-light-500 text-white dark:text-white",
            light: "bg-gray-400 dark:bg-white/5 text-white dark:text-white/80",
            dark: "bg-gray-700 text-white dark:text-white"
        }
    };
    // Get styles based on size and color variant
    const sizeClass = sizeStyles[size];
    const colorStyles = variants[variant][color];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `${baseStyles} ${sizeClass} ${colorStyles}`,
        children: [
            startIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mr-1",
                children: startIcon
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/badge/Badge.tsx",
                lineNumber: 72,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0)),
            children,
            endIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-1",
                children: endIcon
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/badge/Badge.tsx",
                lineNumber: 74,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/badge/Badge.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Badge;
const __TURBOPACK__default__export__ = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/icons/horizontal-dots.svg.js [app-client] (ecmascript) <export default as HorizontaLDots>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HorizontaLDots",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$horizontal$2d$dots$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$horizontal$2d$dots$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/horizontal-dots.svg.js [app-client] (ecmascript)");
}),
"[project]/Downloads/madina-glass-frontend/src/components/tables/Pagination.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems })=>{
    // Calculate page numbers to display
    const getPageNumbers = ()=>{
        const pages = [];
        const maxPagesToShow = 5;
        if (totalPages <= maxPagesToShow) {
            // Show all pages if total pages is less than max
            for(let i = 1; i <= totalPages; i++){
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            if (currentPage > 3) {
                pages.push("...");
            }
            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for(let i = start; i <= end; i++){
                if (i !== 1 && i !== totalPages) {
                    pages.push(i);
                }
            }
            if (currentPage < totalPages - 2) {
                pages.push("...");
            }
            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }
        return pages;
    };
    const pageNumbers = getPageNumbers();
    // Calculate display range
    const startItem = totalItems ? (currentPage - 1) * (itemsPerPage || 10) + 1 : undefined;
    const endItem = totalItems ? Math.min(currentPage * (itemsPerPage || 10), totalItems) : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col sm:flex-row items-center justify-between gap-4 mt-6",
        children: [
            totalItems !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-gray-500 dark:text-gray-400",
                children: [
                    "Showing ",
                    startItem,
                    " to ",
                    endItem,
                    " of ",
                    totalItems,
                    " results"
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/tables/Pagination.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onPageChange(currentPage - 1),
                        disabled: currentPage === 1,
                        className: "flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm font-medium transition-colors",
                        "aria-label": "Previous page",
                        children: "Previous"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/tables/Pagination.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: pageNumbers.map((page, index)=>{
                            if (page === "...") {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-2 text-gray-500 dark:text-gray-400",
                                    children: "..."
                                }, `ellipsis-${index}`, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/tables/Pagination.tsx",
                                    lineNumber: 92,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0));
                            }
                            const pageNum = page;
                            const isActive = currentPage === pageNum;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onPageChange(pageNum),
                                className: `flex w-10 h-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-brand-500 text-white shadow-sm" : "text-gray-700 hover:bg-blue-500/[0.08] hover:text-brand-500 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-brand-500"}`,
                                "aria-label": `Go to page ${pageNum}`,
                                "aria-current": isActive ? "page" : undefined,
                                children: pageNum
                            }, pageNum, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/tables/Pagination.tsx",
                                lineNumber: 105,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/tables/Pagination.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onPageChange(currentPage + 1),
                        disabled: currentPage === totalPages,
                        className: "flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm font-medium transition-colors",
                        "aria-label": "Next page",
                        children: "Next"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/tables/Pagination.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/tables/Pagination.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/tables/Pagination.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Pagination;
const __TURBOPACK__default__export__ = Pagination;
var _c;
__turbopack_context__.k.register(_c, "Pagination");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/lib/api/users.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usersApi",
    ()=>usersApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/api/config/index.ts [app-client] (ecmascript)");
;
const usersApi = {
    createUser: async (userData)=>{
        const requestBody = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            roleId: parseInt(userData.roleId, 10)
        };
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/admin", requestBody);
        return response.data.data;
    },
    getUsers: async (params = {})=>{
        const queryParams = {};
        // Convert page to offset if page is provided
        if (params.page !== undefined && params.limit !== undefined) {
            queryParams.offset = String((params.page - 1) * params.limit);
            queryParams.limit = String(params.limit);
        } else {
            queryParams.offset = String(params.offset || 0);
            queryParams.limit = String(params.limit || 100);
        }
        // Add search parameter if provided
        if (params.search && params.search.trim()) {
            queryParams.search = params.search.trim();
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/users", {
            params: queryParams
        });
        return response.data;
    },
    updatePassword: async (userId, password)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`/admin/${userId}/password`, {
            password
        });
        return response.data;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/icons/chevron-left.svg.js [app-client] (ecmascript) <export default as ChevronLeftIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronLeftIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$chevron$2d$left$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$chevron$2d$left$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/chevron-left.svg.js [app-client] (ecmascript)");
}),
"[project]/Downloads/madina-glass-frontend/src/components/common/ResourceNotFound.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/index.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$chevron$2d$left$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeftIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/chevron-left.svg.js [app-client] (ecmascript) <export default as ChevronLeftIcon>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const ResourceNotFound = ({ showGoBack = true, title, message, icon, variant = "default" })=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleGoBack = ()=>{
        router.back();
    };
    // Default content based on variant
    const getDefaultContent = ()=>{
        switch(variant){
            case "empty":
                return {
                    title: title || "No Data Available",
                    message: message || "There are no items to display at the moment. Please check back later or try refreshing the page.",
                    iconColor: "text-gray-400 dark:text-gray-500",
                    bgColor: "bg-gray-50 dark:bg-gray-800/50"
                };
            case "error":
                return {
                    title: title || "Something Went Wrong",
                    message: message || "We encountered an error while loading this content. Please try again.",
                    iconColor: "text-red-500 dark:text-red-400",
                    bgColor: "bg-red-50 dark:bg-red-900/10"
                };
            default:
                return {
                    title: title || "Content Not Found",
                    message: message || "The requested content could not be found. It may have been moved or deleted.",
                    iconColor: "text-gray-400 dark:text-gray-500",
                    bgColor: "bg-gray-50 dark:bg-gray-800/50"
                };
        }
    };
    const content = getDefaultContent();
    // Default icon
    const defaultIcon = icon || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: `w-16 h-16 ${content.iconColor}`,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 1.5,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ResourceNotFound.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ResourceNotFound.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center py-20 px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-center justify-center w-32 h-32 rounded-2xl ${content.bgColor} mb-6 transition-colors`,
                children: defaultIcon
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ResourceNotFound.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold text-gray-800 dark:text-white/90 mb-3 text-center max-w-md",
                children: content.title
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ResourceNotFound.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-500 dark:text-gray-400 mb-8 text-center max-w-lg leading-relaxed",
                children: content.message
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ResourceNotFound.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            showGoBack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleGoBack,
                    className: "inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-offset-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$chevron$2d$left$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeftIcon$3e$__["ChevronLeftIcon"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ResourceNotFound.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        "Go Back"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ResourceNotFound.tsx",
                    lineNumber: 94,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ResourceNotFound.tsx",
                lineNumber: 93,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ResourceNotFound.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ResourceNotFound, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ResourceNotFound;
const __TURBOPACK__default__export__ = ResourceNotFound;
var _c;
__turbopack_context__.k.register(_c, "ResourceNotFound");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UsersContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/table/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$badge$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/badge/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$Dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/Dropdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$DropdownItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/DropdownItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/index.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$horizontal$2d$dots$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HorizontaLDots$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/horizontal-dots.svg.js [app-client] (ecmascript) <export default as HorizontaLDots>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$tables$2f$Pagination$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/tables/Pagination.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/api/users.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$common$2f$ResourceNotFound$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/common/ResourceNotFound.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/skeleton/Skeleton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
// Helper function to get the base URL without /api/v1 for static assets
const getBaseUrl = ()=>{
    const apiUrl = ("TURBOPACK compile-time value", "http://localhost:3010/api/v1/") || "http://localhost:3001";
    // Remove /api/v1 if present, static files are served at root level
    return apiUrl.replace(/\/api\/v1$/, '');
};
// Helper function to construct profile picture URL
const getProfilePicUrl = (profilePic)=>{
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
const getInitials = (name)=>{
    if (!name) return "U";
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase();
    }
    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
};
function UsersContent() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isInitialMount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    // Get current page from URL, with state fallback for immediate updates
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    const [currentPageState, setCurrentPageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(pageFromUrl);
    // Sync state with URL when URL changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UsersContent.useEffect": ()=>{
            setCurrentPageState(pageFromUrl);
        }
    }["UsersContent.useEffect"], [
        pageFromUrl
    ]);
    const currentPage = currentPageState;
    const itemsPerPage = 10;
    // Search state - initialized from URL
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(searchParams.get("search") || "");
    const [debouncedSearch, setDebouncedSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(searchParams.get("search") || "");
    const [openDropdownId, setOpenDropdownId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [metadata, setMetadata] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [failedImages, setFailedImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const handleImageError = (userId)=>{
        setFailedImages((prev)=>new Set(prev).add(userId));
    };
    // Debounce search input (500ms delay)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UsersContent.useEffect": ()=>{
            const timeoutId = setTimeout({
                "UsersContent.useEffect.timeoutId": ()=>{
                    setDebouncedSearch(searchQuery);
                }
            }["UsersContent.useEffect.timeoutId"], 500);
            return ({
                "UsersContent.useEffect": ()=>clearTimeout(timeoutId)
            })["UsersContent.useEffect"];
        }
    }["UsersContent.useEffect"], [
        searchQuery
    ]);
    // Reset page to 1 when search changes (but not on initial mount)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UsersContent.useEffect": ()=>{
            if (isInitialMount.current) {
                return;
            }
            // Reset to page 1 when search changes
            setCurrentPageState(1);
        }
    }["UsersContent.useEffect"], [
        debouncedSearch
    ]);
    // Update URL when debounced search changes (but not on initial mount)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UsersContent.useEffect": ()=>{
            if (isInitialMount.current) {
                isInitialMount.current = false;
                return;
            }
            // Create new params from current search params to preserve other filters
            const params = new URLSearchParams();
            // Preserve existing params except search and page
            searchParams.forEach({
                "UsersContent.useEffect": (value, key)=>{
                    if (key !== "search" && key !== "page") {
                        params.set(key, value);
                    }
                }
            }["UsersContent.useEffect"]);
            // Add or remove search parameter
            if (debouncedSearch.trim()) {
                params.set("search", debouncedSearch.trim());
            }
            // Reset to page 1 when search changes
            params.set("page", "1");
            const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
            router.replace(newUrl, {
                scroll: false
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["UsersContent.useEffect"], [
        debouncedSearch,
        pathname,
        router
    ]);
    // Prepare API params with pagination and search
    const apiParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UsersContent.useMemo[apiParams]": ()=>{
            const params = {
                page: currentPage,
                limit: itemsPerPage
            };
            // Include search if it has a value
            if (debouncedSearch !== undefined && debouncedSearch !== null) {
                const trimmedSearch = debouncedSearch.trim();
                if (trimmedSearch) {
                    params.search = trimmedSearch;
                }
            }
            return params;
        }
    }["UsersContent.useMemo[apiParams]"], [
        currentPage,
        debouncedSearch
    ]);
    const fetchUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UsersContent.useCallback[fetchUsers]": async (params)=>{
            try {
                setIsLoading(true);
                setError(null);
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usersApi"].getUsers(params);
                if (response?.success && response.data?.users) {
                    const mappedUsers = response.data.users.map({
                        "UsersContent.useCallback[fetchUsers].mappedUsers": (user)=>({
                                id: user.id,
                                name: user.name || "Unknown",
                                email: user.email || "",
                                phone: user.phone,
                                isActive: user.isActive ?? true,
                                profilePic: user.profilePic,
                                createdAt: user.createdAt
                            })
                    }["UsersContent.useCallback[fetchUsers].mappedUsers"]);
                    setUsers(mappedUsers);
                    setMetadata(response.data.meta || null);
                } else {
                    setUsers([]);
                    setMetadata(null);
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message || "An error occurred while fetching users");
                setUsers([]);
                setMetadata(null);
            } finally{
                setIsLoading(false);
            }
        }
    }["UsersContent.useCallback[fetchUsers]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UsersContent.useEffect": ()=>{
            fetchUsers(apiParams);
        }
    }["UsersContent.useEffect"], [
        apiParams,
        fetchUsers
    ]);
    // Handle page change for server-side pagination
    function handlePageChange(page) {
        // Update state immediately for instant UI feedback
        setCurrentPageState(page);
        // Preserve all existing query parameters and update only the page
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
    }
    // Use meta data for pagination
    const totalPages = metadata ? Math.ceil(metadata.total / itemsPerPage) : 1;
    const totalItems = metadata?.total || 0;
    const handleToggleDropdown = (userId)=>{
        setOpenDropdownId(openDropdownId === userId ? null : userId);
    };
    const handleCloseDropdown = ()=>{
        setOpenDropdownId(null);
    };
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative max-w-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "h-5 w-5 text-gray-400 dark:text-gray-500",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                        lineNumber: 243,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: searchQuery,
                                    onChange: (e)=>setSearchQuery(e.target.value),
                                    placeholder: "Search by name, email, or phone...",
                                    className: "w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-colors"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, this),
                                searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSearchQuery(""),
                                    className: "absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
                                    "aria-label": "Clear search",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "h-5 w-5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                            lineNumber: 276,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                        lineNumber: 270,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                    lineNumber: 265,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-b border-gray-100 dark:border-white/5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-6 gap-4 px-4 py-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "text",
                                                height: 20,
                                                width: "40%"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                lineNumber: 295,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "text",
                                                height: 20,
                                                width: "50%"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                lineNumber: 296,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "text",
                                                height: 20,
                                                width: "45%"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                lineNumber: 297,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "text",
                                                height: 20,
                                                width: "35%"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                lineNumber: 298,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "text",
                                                height: 20,
                                                width: "40%"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                lineNumber: 299,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "text",
                                                height: 20,
                                                width: "30%"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                lineNumber: 300,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                        lineNumber: 294,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                    lineNumber: 293,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "divide-y divide-gray-100 dark:divide-white/5",
                                    children: [
                                        1,
                                        2,
                                        3,
                                        4,
                                        5,
                                        6,
                                        7,
                                        8,
                                        9,
                                        10
                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-6 gap-4 px-4 py-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            variant: "circular",
                                                            width: 40,
                                                            height: 40
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                            lineNumber: 310,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            variant: "text",
                                                            height: 18,
                                                            width: 120
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                            lineNumber: 311,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "text",
                                                        height: 16,
                                                        width: 180
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "text",
                                                        height: 16,
                                                        width: 120
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                        lineNumber: 319,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "rectangular",
                                                        height: 24,
                                                        width: 70,
                                                        className: "rounded-full"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "text",
                                                        height: 16,
                                                        width: 100
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-end",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "rectangular",
                                                        height: 32,
                                                        width: 32,
                                                        className: "rounded-lg"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                            lineNumber: 307,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                    lineNumber: 305,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                            lineNumber: 291,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                        lineNumber: 290,
                        columnNumber: 11
                    }, this) : error ? /* Error State */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$common$2f$ResourceNotFound$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "error",
                            title: "Failed to Load Users",
                            message: "We couldn't load the users list. Please try again or contact support if the problem persists."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                            lineNumber: 341,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                        lineNumber: 340,
                        columnNumber: 11
                    }, this) : users.length === 0 ? /* Empty State */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$common$2f$ResourceNotFound$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            variant: "empty",
                            title: "No Users Found",
                            message: "There are no users in the system yet. Users will appear here once they are added."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                            lineNumber: 350,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                        lineNumber: 349,
                        columnNumber: 11
                    }, this) : /* Table Content */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                        className: "border-b border-gray-100 dark:border-white/5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    isHeader: true,
                                                    className: "px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400",
                                                    children: "Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    isHeader: true,
                                                    className: "px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400",
                                                    children: "Email"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    isHeader: true,
                                                    className: "px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400",
                                                    children: "Phone"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                    lineNumber: 376,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    isHeader: true,
                                                    className: "px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400",
                                                    children: "Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    isHeader: true,
                                                    className: "px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400",
                                                    children: "Created At"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                    lineNumber: 388,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    isHeader: true,
                                                    className: "px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-12",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "sr-only",
                                                        children: "Actions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                            lineNumber: 363,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                        lineNumber: 362,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                        className: "divide-y divide-gray-100 dark:divide-white/5",
                                        children: users.map((user)=>{
                                            const hasImageFailed = failedImages.has(user.id);
                                            const profilePicUrl = user.profilePic ? getProfilePicUrl(user.profilePic) : null;
                                            const shouldShowImage = profilePicUrl && !hasImageFailed;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                className: "hover:bg-gray-50 dark:hover:bg-white/2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "px-4 py-4 text-start",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative shrink-0 w-10 h-10 rounded-full overflow-hidden bg-brand-500 flex items-center justify-center",
                                                                    children: shouldShowImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        src: profilePicUrl,
                                                                        alt: user.name,
                                                                        width: 40,
                                                                        height: 40,
                                                                        className: "w-full h-full object-cover",
                                                                        unoptimized: true,
                                                                        onError: ()=>handleImageError(user.id)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                                        lineNumber: 418,
                                                                        columnNumber: 27
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white text-sm font-medium select-none",
                                                                        children: getInitials(user.name)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                                        lineNumber: 428,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                                    lineNumber: 416,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium text-gray-800 text-theme-sm dark:text-white/90 truncate",
                                                                    children: user.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                                    lineNumber: 433,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                            lineNumber: 415,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                        lineNumber: 414,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "truncate block max-w-[200px]",
                                                            children: user.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                            lineNumber: 439,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "truncate block max-w-[150px]",
                                                            children: user.phone || "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                            lineNumber: 442,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                        lineNumber: 441,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "px-4 py-4 text-start",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$badge$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            size: "sm",
                                                            color: user.isActive ? "success" : "error",
                                                            variant: "light",
                                                            children: user.isActive ? "Active" : "Inactive"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                            lineNumber: 445,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "truncate block",
                                                            children: formatDate(user.createdAt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                            lineNumber: 454,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                        lineNumber: 453,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$table$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "px-4 py-4 text-start w-12",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleToggleDropdown(user.id),
                                                                    className: "flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors",
                                                                    "aria-label": "Actions",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$horizontal$2d$dots$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HorizontaLDots$3e$__["HorizontaLDots"], {
                                                                        className: "w-5 h-5 text-gray-500 dark:text-gray-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                                        lineNumber: 463,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                                    lineNumber: 458,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$Dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dropdown"], {
                                                                    isOpen: openDropdownId === user.id,
                                                                    onClose: handleCloseDropdown,
                                                                    className: "min-w-40 py-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$DropdownItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownItem"], {
                                                                            onClick: ()=>{
                                                                                console.log("Edit user:", user.id);
                                                                                handleCloseDropdown();
                                                                            },
                                                                            baseClassName: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-gray-200",
                                                                            children: "Edit"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                                            lineNumber: 470,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$DropdownItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownItem"], {
                                                                            onClick: ()=>{
                                                                                console.log("View user:", user.id);
                                                                                handleCloseDropdown();
                                                                            },
                                                                            baseClassName: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-gray-200",
                                                                            children: "View Details"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                                            lineNumber: 479,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$DropdownItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownItem"], {
                                                                            onClick: ()=>{
                                                                                console.log("Delete user:", user.id);
                                                                                handleCloseDropdown();
                                                                            },
                                                                            baseClassName: "block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10",
                                                                            children: "Delete"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                                            lineNumber: 488,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                                    lineNumber: 465,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                            lineNumber: 457,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                        lineNumber: 456,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, user.id, true, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                                lineNumber: 410,
                                                columnNumber: 24
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                        lineNumber: 404,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                            lineNumber: 359,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                        lineNumber: 358,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this),
            metadata && metadata.total > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$tables$2f$Pagination$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    currentPage: currentPage,
                    totalPages: totalPages,
                    onPageChange: handlePageChange,
                    totalItems: totalItems,
                    itemsPerPage: itemsPerPage
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                    lineNumber: 511,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/users/UsersContent.tsx",
                lineNumber: 510,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(UsersContent, "GitsFEFwRtsJMZJi2zM1qwmOvVg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = UsersContent;
var _c;
__turbopack_context__.k.register(_c, "UsersContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_madina-glass-frontend_src_39ac4e6c._.js.map