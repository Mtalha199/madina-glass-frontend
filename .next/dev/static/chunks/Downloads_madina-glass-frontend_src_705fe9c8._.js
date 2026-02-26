(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
;
const PageHeader = ({ title, subtitle, breadcrumbs, action })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-gray-800 dark:text-white/90",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: action
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
                        lineNumber: 29,
                        columnNumber: 20
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-500 dark:text-gray-400 mb-4",
                children: subtitle
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            breadcrumbs && breadcrumbs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                    className: "flex items-center gap-1.5",
                    children: breadcrumbs.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: item.href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    className: "inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400",
                                    href: item.href,
                                    children: [
                                        item.label,
                                        index < breadcrumbs.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "stroke-current",
                                            width: "17",
                                            height: "16",
                                            viewBox: "0 0 17 16",
                                            fill: "none",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M6.0765 12.667L10.2432 8.50033L6.0765 4.33366",
                                                stroke: "",
                                                strokeWidth: "1.2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
                                                lineNumber: 61,
                                                columnNumber: 27
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
                                            lineNumber: 53,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
                                    lineNumber: 47,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-800 dark:text-white/90",
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
                                    lineNumber: 72,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
                                lineNumber: 45,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, index, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
                            lineNumber: 44,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PageHeader;
const __TURBOPACK__default__export__ = PageHeader;
var _c;
__turbopack_context__.k.register(_c, "PageHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/icons/plus.svg.js [app-client] (ecmascript) <export default as PlusIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlusIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$plus$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$plus$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/plus.svg.js [app-client] (ecmascript)");
}),
"[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$Dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/Dropdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$DropdownItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/DropdownItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/button/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/index.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$plus$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/plus.svg.js [app-client] (ecmascript) <export default as PlusIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$permissions$2f$PermissionWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/permissions/PermissionWrapper.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const CreateNewDropdown = ({ onCreateRole, onCreateUser })=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    function toggleDropdown() {
        setIsOpen((prev)=>!prev);
    }
    function closeDropdown() {
        setIsOpen(false);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateNewDropdown.useEffect": ()=>{
            const handleClickOutside = {
                "CreateNewDropdown.useEffect.handleClickOutside": (event)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest('.dropdown-toggle')) {
                        closeDropdown();
                    }
                }
            }["CreateNewDropdown.useEffect.handleClickOutside"];
            if (isOpen) {
                document.addEventListener("mousedown", handleClickOutside);
            }
            return ({
                "CreateNewDropdown.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["CreateNewDropdown.useEffect"];
        }
    }["CreateNewDropdown.useEffect"], [
        isOpen
    ]);
    function handleCreateRole() {
        onCreateRole();
        closeDropdown();
    }
    function handleCreateUser() {
        onCreateUser();
        closeDropdown();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: dropdownRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "primary",
                size: "sm",
                startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$plus$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusIcon$3e$__["PlusIcon"], {}, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx",
                    lineNumber: 65,
                    columnNumber: 20
                }, void 0),
                onClick: toggleDropdown,
                className: "dropdown-toggle",
                children: "Create"
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$Dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dropdown"], {
                isOpen: isOpen,
                onClose: closeDropdown,
                className: "right-0 mt-2 w-[220px] p-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$permissions$2f$PermissionWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        permissions: "role.create",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$DropdownItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownItem"], {
                            onClick: handleCreateRole,
                            className: "flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 text-gray-500 dark:text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Create Role"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$permissions$2f$PermissionWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        permissions: "adminUser.create",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$DropdownItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownItem"], {
                            onClick: handleCreateUser,
                            className: "flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 text-gray-500 dark:text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Create User"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CreateNewDropdown, "uhOyve9TWk+bvhPJTPlaMsUEQAY=");
_c = CreateNewDropdown;
const __TURBOPACK__default__export__ = CreateNewDropdown;
var _c;
__turbopack_context__.k.register(_c, "CreateNewDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/roles/RolesPageHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$common$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/common/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$CreateNewDropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/roles/CreateNewDropdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$permissions$2f$PermissionWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/permissions/PermissionWrapper.tsx [app-client] (ecmascript)");
;
;
;
;
const RolesPageHeader = ({ onCreateRole, onCreateUser })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$common$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        title: "Roles & Permissions",
        subtitle: "Define and manage access control roles.",
        breadcrumbs: [
            {
                label: "Dashboard",
                href: "/admin/dashboard"
            },
            {
                label: "Roles"
            }
        ],
        action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$permissions$2f$PermissionWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            permissions: [
                'role.create'
            ],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$CreateNewDropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onCreateRole: onCreateRole || (()=>{}),
                onCreateUser: onCreateUser || (()=>{})
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RolesPageHeader.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RolesPageHeader.tsx",
            lineNumber: 24,
            columnNumber: 9
        }, void 0)
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RolesPageHeader.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = RolesPageHeader;
const __TURBOPACK__default__export__ = RolesPageHeader;
var _c;
__turbopack_context__.k.register(_c, "RolesPageHeader");
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
"[project]/Downloads/madina-glass-frontend/src/components/roles/GearIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const GearIcon = ({ className = "" })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        width: "20",
        height: "20",
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/GearIcon.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16.6667 10.8333L15.8333 13.3333L14.1667 15.4167L11.6667 16.25C11.3333 16.3333 11 16.4 10.6667 16.45L8.33333 16.75L5.83333 16.25L3.75 14.5833L2.91667 12.0833C2.83333 11.75 2.76667 11.4167 2.71667 11.0833L2.41667 8.75L2.91667 6.25L4.58333 4.16667L7.08333 3.33333C7.41667 3.25 7.75 3.18333 8.08333 3.13333L10.4167 2.83333L12.9167 3.33333L15 4.99999L15.8333 7.49999C15.9167 7.83333 15.9833 8.16666 16.0333 8.49999L16.3333 10.8333H16.6667Z",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/GearIcon.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/GearIcon.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = GearIcon;
const __TURBOPACK__default__export__ = GearIcon;
var _c;
__turbopack_context__.k.register(_c, "GearIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/lib/utils/formatPermission.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Converts a permission identifier to a human-readable format
 * 
 * Examples:
 * - "role.view" -> "Role View"
 * - "adminUser.create" -> "Admin User Create"
 * - "upgradeRequest.approve" -> "Upgrade Request Approve"
 * - "dashboard.totalShipment" -> "Dashboard Total Shipment"
 * 
 * @param permission - The permission identifier (e.g., "role.view", "adminUser.create")
 * @returns A formatted, human-readable permission name
 */ __turbopack_context__.s([
    "formatPermission",
    ()=>formatPermission
]);
function formatPermission(permission) {
    if (!permission) return "";
    return permission// Split by dots first
    .split(".").map((part)=>{
        // Handle camelCase: insert space before uppercase letters
        // e.g., "adminUser" -> "admin User"
        const camelCaseSplit = part.replace(/([a-z])([A-Z])/g, "$1 $2");
        // Split by underscores and hyphens
        const words = camelCaseSplit.split(/[_\-\s]+/);
        // Capitalize first letter of each word
        return words.map((word)=>{
            if (!word) return "";
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(" ");
    }).join(" ");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/lib/utils/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$utils$2f$formatPermission$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/utils/formatPermission.ts [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$badge$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/badge/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/button/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/index.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$group$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GroupIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/group.svg.js [app-client] (ecmascript) <export default as GroupIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$GearIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/roles/GearIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$permissions$2f$PermissionWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/permissions/PermissionWrapper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$utils$2f$formatPermission$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/utils/formatPermission.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const RoleCard = ({ role, onEditPermissions, onDeleteRole, isDeleting })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$badge$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "solid",
                                color: "warning",
                                size: "md",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$utils$2f$formatPermission$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPermission"])(role.identifier)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-gray-800 dark:text-white/90",
                                children: role.name
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            role.identifier !== __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPER_ADMIN_ROLE_ID && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$permissions$2f$PermissionWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                permissions: [
                                    'role.delete'
                                ],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "primary",
                                    size: "sm",
                                    className: "bg-red-600 hover:bg-red-700 border-red-200 hover:border-red-300 dark:text-red-400 dark:border-red-800 dark:hover:border-red-700",
                                    onClick: ()=>onDeleteRole?.(role.id),
                                    disabled: isDeleting,
                                    children: isDeleting ? "Deleting…" : "Delete"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                                    lineNumber: 38,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                                lineNumber: 37,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$permissions$2f$PermissionWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                permissions: [
                                    'permission.update'
                                ],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "outline",
                                    size: "sm",
                                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$GearIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                                        lineNumber: 53,
                                        columnNumber: 26
                                    }, void 0),
                                    onClick: ()=>onEditPermissions?.(role.id),
                                    children: "Edit Permissions"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-600 dark:text-gray-400 mb-4",
                children: role.description
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$group$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GroupIcon$3e$__["GroupIcon"], {
                        className: "w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/admin/dashboard/roles/${role.id}/users`,
                        className: "text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2",
                        children: [
                            role.assignedUsersCount,
                            " users assigned"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-semibold text-gray-800 dark:text-white/90 mb-2",
                        children: "Permissions"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    role.permissionNames && role.permissionNames.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: role.permissionNames.map((permissionName, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$badge$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "light",
                                color: "primary",
                                size: "sm",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$utils$2f$formatPermission$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPermission"])(permissionName)
                            }, `${role.id}-permission-${index}`, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400 dark:text-gray-500 italic",
                        children: "No permissions found"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = RoleCard;
const __TURBOPACK__default__export__ = RoleCard;
var _c;
__turbopack_context__.k.register(_c, "RoleCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/skeleton/Skeleton.tsx [app-client] (ecmascript)");
;
;
const RoleCardSkeleton = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "rectangular",
                                width: 80,
                                height: 24
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                                lineNumber: 10,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "text",
                                height: 28,
                                width: 150
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                                lineNumber: 11,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                        lineNumber: 9,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "rectangular",
                        width: 140,
                        height: 36
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "text",
                        height: 16,
                        width: "100%"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "text",
                        height: 16,
                        width: "80%"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "rectangular",
                        width: 20,
                        height: 20
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "text",
                        height: 16,
                        width: 120
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "text",
                        height: 20,
                        width: 100,
                        className: "mb-2"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        variant: "rectangular",
                        width: 150,
                        height: 24
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = RoleCardSkeleton;
const __TURBOPACK__default__export__ = RoleCardSkeleton;
var _c;
__turbopack_context__.k.register(_c, "RoleCardSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Toast({ message, type, isVisible, onClose, duration = 3000 }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shouldRender, setShouldRender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAnimating, setIsAnimating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Handle mounting for portal
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            setMounted(true);
            return ({
                "Toast.useEffect": ()=>setMounted(false)
            })["Toast.useEffect"];
        }
    }["Toast.useEffect"], []);
    // Handle visibility and animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            if (isVisible) {
                setShouldRender(true);
                // Trigger animation after a small delay to ensure DOM is ready
                setTimeout({
                    "Toast.useEffect": ()=>setIsAnimating(true)
                }["Toast.useEffect"], 10);
                // Auto-close timer
                const timer = setTimeout({
                    "Toast.useEffect.timer": ()=>{
                        setIsAnimating(false);
                        setTimeout({
                            "Toast.useEffect.timer": ()=>{
                                setShouldRender(false);
                                onClose();
                            }
                        }["Toast.useEffect.timer"], 300); // Wait for exit animation
                    }
                }["Toast.useEffect.timer"], duration);
                return ({
                    "Toast.useEffect": ()=>clearTimeout(timer)
                })["Toast.useEffect"];
            } else {
                setIsAnimating(false);
                const timer = setTimeout({
                    "Toast.useEffect.timer": ()=>{
                        setShouldRender(false);
                    }
                }["Toast.useEffect.timer"], 300); // Wait for exit animation
                return ({
                    "Toast.useEffect": ()=>clearTimeout(timer)
                })["Toast.useEffect"];
            }
        }
    }["Toast.useEffect"], [
        isVisible,
        duration,
        onClose
    ]);
    if (!mounted || !shouldRender || !message) return null;
    const typeClasses = {
        success: "bg-success-50 border-success-500 text-success-700 dark:bg-success-500/15 dark:border-success-500/30 dark:text-success-400",
        error: "bg-error-50 border-error-500 text-error-700 dark:bg-error-500/15 dark:border-error-500/30 dark:text-error-400",
        info: "bg-blue-light-50 border-blue-light-500 text-blue-light-700 dark:bg-blue-light-500/15 dark:border-blue-light-500/30 dark:text-blue-light-400",
        warning: "bg-warning-50 border-warning-500 text-warning-700 dark:bg-warning-500/15 dark:border-warning-500/30 dark:text-warning-400"
    };
    const icons = {
        success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this),
        error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this),
        info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this),
        warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, this)
    };
    const toastContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed top-4 right-4 z-[999999] flex items-center gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 ease-out ${isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"} ${typeClasses[type]}`,
        role: "alert",
        "aria-live": "assertive",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0",
                children: icons[type]
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-medium flex-1",
                children: message
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>{
                    setIsAnimating(false);
                    setTimeout(()=>{
                        setShouldRender(false);
                        onClose();
                    }, 300);
                },
                className: "ml-2 flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity",
                "aria-label": "Close notification",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M6 18L18 6M6 6l12 12"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
    // Render using portal to body to avoid z-index and overflow issues
    // Check if document.body exists (for SSR safety)
    if (typeof document !== "undefined" && document.body) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(toastContent, document.body);
    }
    return null;
}
_s(Toast, "wfQaOh2L2Rr6d1hqLcK0lpf1n/8=");
_c = Toast;
var _c;
__turbopack_context__.k.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConfirmModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$modal$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/modal/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/button/Button.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function ConfirmModal({ isOpen, onClose, onConfirm, title, message, blockedMessage, confirmLabel = "Confirm", cancelLabel = "Cancel", variant = "default", isLoading = false }) {
    const isDanger = variant === "danger";
    const isBlocked = !!blockedMessage;
    const handleConfirm = async ()=>{
        if (onConfirm) await onConfirm();
    };
    const iconContent = isBlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-6 h-6 text-warning-600 dark:text-warning-400",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this) : isDanger ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-6 h-6 text-error-600 dark:text-error-400",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-6 h-6 text-gray-600 dark:text-gray-400",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
            lineNumber: 76,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
    const displayMessage = isBlocked ? blockedMessage : message;
    const iconWrapperClass = isBlocked ? "bg-warning-100 dark:bg-warning-900/20" : isDanger ? "bg-error-100 dark:bg-error-900/20" : "bg-gray-100 dark:bg-gray-800";
    const modalContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$modal$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        isOpen: isOpen,
        onClose: onClose,
        className: "max-w-[400px] m-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${iconWrapperClass}`,
                            children: iconContent
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-gray-900 dark:text-white",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500 dark:text-gray-400 mt-1",
                                    children: displayMessage
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 justify-end",
                    children: isBlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        type: "button",
                        size: "sm",
                        onClick: onClose,
                        children: "OK"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
                        lineNumber: 112,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                type: "button",
                                size: "sm",
                                variant: "outline",
                                onClick: onClose,
                                disabled: isLoading,
                                children: cancelLabel
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                type: "button",
                                size: "sm",
                                onClick: handleConfirm,
                                disabled: isLoading,
                                className: isDanger ? "bg-error-500 hover:bg-error-600 text-white disabled:opacity-50" : "",
                                children: isLoading ? "Please wait…" : confirmLabel
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
            lineNumber: 94,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(modalContent, document.body) : null;
}
_c = ConfirmModal;
var _c;
__turbopack_context__.k.register(_c, "ConfirmModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/hooks/useModal.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useModal",
    ()=>useModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const useModal = (initialState = false)=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function toggleModal() {
        setIsOpen((prev)=>!prev);
    }
    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal
    };
};
_s(useModal, "IgcISDhuBD6UNPA7AHOQTPrpOhA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/lib/api/roles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rolesApi",
    ()=>rolesApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/api/config/index.ts [app-client] (ecmascript)");
;
const rolesApi = {
    getPermissions: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/roles/permissions");
        return response.data.data;
    },
    getRoles: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/roles");
        return response.data.data;
    },
    createRole: async (roleData)=>{
        const requestBody = {
            name: roleData.name,
            description: roleData.description,
            permissionIds: roleData.permissionIds || []
        };
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/roles", requestBody);
        return response.data.data;
    },
    updateRolePermissions: async (roleId, permissionIds)=>{
        const requestBody = {
            permissionIds: permissionIds.map((id)=>parseInt(id, 10))
        };
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`/roles/${roleId}/permissions`, requestBody);
        return response.data.data;
    },
    getRoleUsers: async (roleId, params)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/roles/${roleId}/users`, {
            params: {
                page: params.page,
                limit: params.limit
            }
        });
        return response.data.data;
    },
    deleteRole: async (roleId)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/roles/${roleId}`);
    }
};
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
"[project]/Downloads/madina-glass-frontend/src/lib/api/mappers/roles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractUniquePermissionsFromRoles",
    ()=>extractUniquePermissionsFromRoles,
    "mapRoleResponseToRole",
    ()=>mapRoleResponseToRole,
    "mapRolesResponseToRoles",
    ()=>mapRolesResponseToRoles
]);
/**
 * Converts role name to identifier (slug format)
 * "SuperAdmin" -> "super_admin"
 */ const nameToIdentifier = (name)=>name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase().replace(/\s+/g, "_");
/**
 * Maps permission response to Permission type
 */ const mapPermissionResponseToPermission = (perm)=>({
        id: String(perm.id),
        name: perm.name,
        description: perm.description
    });
const mapRoleResponseToRole = (role)=>({
        id: String(role.id),
        identifier: nameToIdentifier(role.name),
        name: role.name,
        description: role.description,
        assignedUsersCount: role.assignedUsersCount ?? 0,
        permissionIds: role.permissions.map((p)=>String(p.permission.id)),
        permissionNames: role.permissions.map((p)=>p.permission.name)
    });
const mapRolesResponseToRoles = (roles)=>roles.map(mapRoleResponseToRole);
const extractUniquePermissionsFromRoles = (roles)=>{
    const permissionsMap = new Map();
    for (const role of roles){
        for (const { permission } of role.permissions || []){
            const id = String(permission.id);
            if (!permissionsMap.has(id)) {
                permissionsMap.set(id, mapPermissionResponseToPermission(permission));
            }
        }
    }
    return Array.from(permissionsMap.values());
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RolesContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$RolesPageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/roles/RolesPageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$RoleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$RoleCardSkeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/roles/RoleCardSkeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$toast$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/toast/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$common$2f$ConfirmModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/common/ConfirmModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$hooks$2f$useModal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/hooks/useModal.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$roles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/api/roles.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/api/users.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$mappers$2f$roles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/api/mappers/roles.ts [app-client] (ecmascript)");
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
function getApiErrorMessage(error) {
    if (error && typeof error === "object" && "response" in error) {
        const err = error;
        return err.response?.data?.message || "Something went wrong";
    }
    return error instanceof Error ? error.message : "Something went wrong";
}
// Lazy load modals to reduce initial bundle size
const EditPermissionsModal = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/Downloads/madina-glass-frontend/src/components/roles/modals/EditPermissionsModal.tsx [app-client] (ecmascript, async loader)"));
_c = EditPermissionsModal;
const CreateRoleModal = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/Downloads/madina-glass-frontend/src/components/roles/modals/CreateRoleModal.tsx [app-client] (ecmascript, async loader)"));
_c1 = CreateRoleModal;
const CreateUserModal = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/Downloads/madina-glass-frontend/src/components/roles/modals/CreateUserModal.tsx [app-client] (ecmascript, async loader)"));
_c2 = CreateUserModal;
function RolesContent() {
    _s();
    const { isOpen, openModal, closeModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$hooks$2f$useModal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"])();
    const { isOpen: isCreateRoleOpen, openModal: openCreateRoleModal, closeModal: closeCreateRoleModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$hooks$2f$useModal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"])();
    const { isOpen: isCreateUserOpen, openModal: openCreateUserModal, closeModal: closeCreateUserModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$hooks$2f$useModal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"])();
    const [selectedRole, setSelectedRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [roles, setRoles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [permissions, setPermissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingRoles, setIsLoadingRoles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSavingPermissions, setIsSavingPermissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCreatingUser, setIsCreatingUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCreatingRole, setIsCreatingRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deletingRoleId, setDeletingRoleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        message: "",
        type: "success",
        isVisible: false
    });
    // Fetch roles and extract permissions from roles response
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RolesContent.useEffect": ()=>{
            const fetchData = {
                "RolesContent.useEffect.fetchData": async ()=>{
                    setIsLoadingRoles(true);
                    try {
                        const rolesResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$roles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rolesApi"].getRoles();
                        setRoles((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$mappers$2f$roles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRolesResponseToRoles"])(rolesResponse));
                        setPermissions((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$mappers$2f$roles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractUniquePermissionsFromRoles"])(rolesResponse));
                    } catch (error) {
                        console.error("Failed to fetch data:", error);
                        setToast({
                            message: getApiErrorMessage(error),
                            type: "error",
                            isVisible: true
                        });
                    } finally{
                        setIsLoadingRoles(false);
                    }
                }
            }["RolesContent.useEffect.fetchData"];
            fetchData();
        }
    }["RolesContent.useEffect"], []);
    const handleCreateRole = ()=>openCreateRoleModal();
    const handleCreateUser = ()=>openCreateUserModal();
    // Refetch roles and permissions after update
    const refetchRoles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RolesContent.useCallback[refetchRoles]": async ()=>{
            setIsLoadingRoles(true);
            try {
                const rolesResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$roles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rolesApi"].getRoles();
                const updatedRoles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$mappers$2f$roles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRolesResponseToRoles"])(rolesResponse);
                setRoles(updatedRoles);
                setPermissions((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$mappers$2f$roles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractUniquePermissionsFromRoles"])(rolesResponse));
                // Update selected role if it still exists
                setSelectedRole({
                    "RolesContent.useCallback[refetchRoles]": (prev)=>{
                        if (!prev) return prev;
                        const updatedRole = updatedRoles.find({
                            "RolesContent.useCallback[refetchRoles].updatedRole": (r)=>r.id === prev.id
                        }["RolesContent.useCallback[refetchRoles].updatedRole"]);
                        return updatedRole || prev;
                    }
                }["RolesContent.useCallback[refetchRoles]"]);
            } catch (error) {
                console.error("Failed to refetch roles:", error);
                setToast({
                    message: getApiErrorMessage(error),
                    type: "error",
                    isVisible: true
                });
            } finally{
                setIsLoadingRoles(false);
            }
        }
    }["RolesContent.useCallback[refetchRoles]"], []);
    const handleSaveRole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RolesContent.useCallback[handleSaveRole]": async (roleData)=>{
            setIsCreatingRole(true);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$roles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rolesApi"].createRole({
                    name: roleData.name,
                    description: roleData.description
                });
                await refetchRoles();
                setToast({
                    message: "Role created successfully",
                    type: "success",
                    isVisible: true
                });
            } catch (error) {
                console.error("Failed to create role:", error);
                setToast({
                    message: getApiErrorMessage(error),
                    type: "error",
                    isVisible: true
                });
                throw error;
            } finally{
                setIsCreatingRole(false);
            }
        }
    }["RolesContent.useCallback[handleSaveRole]"], [
        refetchRoles
    ]);
    const handleSaveUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RolesContent.useCallback[handleSaveUser]": async (userData)=>{
            setIsCreatingUser(true);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usersApi"].createUser(userData);
                setToast({
                    message: "User created successfully",
                    type: "success",
                    isVisible: true
                });
            } catch (error) {
                console.error("Failed to create user:", error);
                setToast({
                    message: getApiErrorMessage(error),
                    type: "error",
                    isVisible: true
                });
                throw error;
            } finally{
                setIsCreatingUser(false);
            }
        }
    }["RolesContent.useCallback[handleSaveUser]"], []);
    const handleEditPermissions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RolesContent.useCallback[handleEditPermissions]": (roleId)=>{
            const role = roles.find({
                "RolesContent.useCallback[handleEditPermissions].role": (r)=>r.id === roleId
            }["RolesContent.useCallback[handleEditPermissions].role"]);
            if (role) {
                setSelectedRole(role);
                openModal();
            }
        }
    }["RolesContent.useCallback[handleEditPermissions]"], [
        roles,
        openModal
    ]);
    const handleSavePermissions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RolesContent.useCallback[handleSavePermissions]": async (roleId, permissionIds)=>{
            setIsSavingPermissions(true);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$roles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rolesApi"].updateRolePermissions(roleId, permissionIds);
                await refetchRoles();
                setToast({
                    message: "Permissions updated successfully",
                    type: "success",
                    isVisible: true
                });
            } catch (error) {
                console.error("Failed to update role permissions:", error);
                setToast({
                    message: getApiErrorMessage(error),
                    type: "error",
                    isVisible: true
                });
                throw error;
            } finally{
                setIsSavingPermissions(false);
            }
        }
    }["RolesContent.useCallback[handleSavePermissions]"], [
        refetchRoles
    ]);
    const [roleToDelete, setRoleToDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleDeleteRoleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RolesContent.useCallback[handleDeleteRoleClick]": (roleId)=>{
            const role = roles.find({
                "RolesContent.useCallback[handleDeleteRoleClick].role": (r)=>r.id === roleId
            }["RolesContent.useCallback[handleDeleteRoleClick].role"]);
            if (role) setRoleToDelete(role);
        }
    }["RolesContent.useCallback[handleDeleteRoleClick]"], [
        roles
    ]);
    const handleConfirmDeleteRole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RolesContent.useCallback[handleConfirmDeleteRole]": async ()=>{
            if (!roleToDelete) return;
            const roleId = roleToDelete.id;
            setDeletingRoleId(roleId);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$roles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rolesApi"].deleteRole(roleId);
                if (selectedRole?.id === roleId) {
                    closeModal();
                    setSelectedRole(null);
                }
                setRoleToDelete(null);
                await refetchRoles();
                setToast({
                    message: "Role deleted successfully",
                    type: "success",
                    isVisible: true
                });
            } catch (error) {
                console.error("Failed to delete role:", error);
                setToast({
                    message: getApiErrorMessage(error),
                    type: "error",
                    isVisible: true
                });
            } finally{
                setDeletingRoleId(null);
            }
        }
    }["RolesContent.useCallback[handleConfirmDeleteRole]"], [
        roleToDelete,
        selectedRole,
        closeModal,
        refetchRoles
    ]);
    const roleCards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RolesContent.useMemo[roleCards]": ()=>{
            if (isLoadingRoles) {
                return Array.from({
                    length: 3
                }, {
                    "RolesContent.useMemo[roleCards]": (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$RoleCardSkeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, i, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                            lineNumber: 214,
                            columnNumber: 50
                        }, this)
                }["RolesContent.useMemo[roleCards]"]);
            }
            if (roles.length === 0) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-8 text-center transition-colors",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 dark:text-gray-400",
                        children: "No roles found. Create your first role to get started."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this);
            }
            return roles.map({
                "RolesContent.useMemo[roleCards]": (role)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$RoleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        role: role,
                        onEditPermissions: handleEditPermissions,
                        onDeleteRole: handleDeleteRoleClick,
                        isDeleting: deletingRoleId === role.id
                    }, role.id, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                        lineNumber: 226,
                        columnNumber: 7
                    }, this)
            }["RolesContent.useMemo[roleCards]"]);
        }
    }["RolesContent.useMemo[roleCards]"], [
        isLoadingRoles,
        roles,
        handleEditPermissions,
        handleDeleteRoleClick,
        deletingRoleId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$RolesPageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onCreateRole: handleCreateRole,
                onCreateUser: handleCreateUser
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: roleCards
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, this),
            selectedRole && isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditPermissionsModal, {
                    isOpen: isOpen,
                    onClose: closeModal,
                    role: selectedRole,
                    permissions: permissions,
                    isLoading: isLoadingRoles,
                    isSaving: isSavingPermissions,
                    onSave: handleSavePermissions
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                    lineNumber: 249,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                lineNumber: 248,
                columnNumber: 9
            }, this),
            isCreateRoleOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CreateRoleModal, {
                    isOpen: isCreateRoleOpen,
                    onClose: closeCreateRoleModal,
                    onSave: handleSaveRole,
                    isSaving: isCreatingRole
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                    lineNumber: 263,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                lineNumber: 262,
                columnNumber: 9
            }, this),
            isCreateUserOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CreateUserModal, {
                    isOpen: isCreateUserOpen,
                    onClose: closeCreateUserModal,
                    onSave: handleSaveUser,
                    roles: roles,
                    isLoading: isLoadingRoles,
                    isSaving: isCreatingUser
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                    lineNumber: 274,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                lineNumber: 273,
                columnNumber: 9
            }, this),
            roleToDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$common$2f$ConfirmModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: !!roleToDelete,
                onClose: ()=>setRoleToDelete(null),
                onConfirm: (roleToDelete.assignedUsersCount ?? 0) > 0 ? undefined : handleConfirmDeleteRole,
                title: (roleToDelete.assignedUsersCount ?? 0) > 0 ? "Cannot delete role" : "Delete role",
                message: `Are you sure you want to delete the role "${roleToDelete.name}"? This cannot be undone.`,
                blockedMessage: (roleToDelete.assignedUsersCount ?? 0) > 0 ? `This role has ${roleToDelete.assignedUsersCount} user(s) assigned. Remove all users from this role before deleting.` : undefined,
                confirmLabel: "Delete",
                cancelLabel: "Cancel",
                variant: "danger",
                isLoading: deletingRoleId === roleToDelete.id
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                lineNumber: 286,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$toast$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: toast.message,
                type: toast.type,
                isVisible: toast.isVisible,
                onClose: ()=>setToast((t)=>({
                            ...t,
                            isVisible: false
                        }))
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/dashboard/roles/RolesContent.tsx",
        lineNumber: 237,
        columnNumber: 5
    }, this);
}
_s(RolesContent, "M/Gxdugx0Dpnc+7VZkMnDfQy/iI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$hooks$2f$useModal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$hooks$2f$useModal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$hooks$2f$useModal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"]
    ];
});
_c3 = RolesContent;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "EditPermissionsModal");
__turbopack_context__.k.register(_c1, "CreateRoleModal");
__turbopack_context__.k.register(_c2, "CreateUserModal");
__turbopack_context__.k.register(_c3, "RolesContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_madina-glass-frontend_src_705fe9c8._.js.map