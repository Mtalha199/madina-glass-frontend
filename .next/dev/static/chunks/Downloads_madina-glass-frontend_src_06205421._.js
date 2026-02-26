(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/Dropdown.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dropdown",
    ()=>Dropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const Dropdown = ({ isOpen, onClose, children, className = "" })=>{
    _s();
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dropdown.useEffect": ()=>{
            if (!isOpen) return;
            const handleClickOutside = {
                "Dropdown.useEffect.handleClickOutside": (event)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest('.dropdown-toggle') && !event.target.closest('.search-container')) {
                        onClose();
                    }
                }
            }["Dropdown.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "Dropdown.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["Dropdown.useEffect"];
        }
    }["Dropdown.useEffect"], [
        onClose,
        isOpen
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: dropdownRef,
        className: `absolute z-40  right-0 mt-2  rounded-xl border border-gray-200 bg-white  shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/Dropdown.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Dropdown, "lBksDI189chlgqHe47LAOFZSkUw=");
_c = Dropdown;
var _c;
__turbopack_context__.k.register(_c, "Dropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/DropdownItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropdownItem",
    ()=>DropdownItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
const DropdownItem = ({ tag = "button", href, onClick, onItemClick, baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900", className = "", children })=>{
    const combinedClasses = `${baseClassName} ${className}`.trim();
    const handleClick = (event)=>{
        if (tag === "button") {
            event.preventDefault();
            event.stopPropagation();
        }
        if (onClick) onClick();
        if (onItemClick) onItemClick(event);
    };
    const handleMouseDown = (event)=>{
        // Use mousedown to catch event before blur fires
        // This ensures navigation happens before the input blur handler closes dropdown
        if (tag === "button") {
            event.preventDefault();
            event.stopPropagation();
            if (onClick) onClick();
            if (onItemClick) onItemClick(event);
        }
    };
    if (tag === "a" && href) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: combinedClasses,
            onClick: handleClick,
            children: children
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/DropdownItem.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    // For buttons, use onMouseDown to catch event before blur
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onMouseDown: handleMouseDown,
        className: combinedClasses,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/DropdownItem.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = DropdownItem;
var _c;
__turbopack_context__.k.register(_c, "DropdownItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/ui/modal/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Modal",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const Modal = ({ isOpen, onClose, children, className, showCloseButton = true, isFullscreen = false })=>{
    _s();
    const modalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            const handleEscape = {
                "Modal.useEffect.handleEscape": (event)=>{
                    if (event.key === "Escape") {
                        onClose();
                    }
                }
            }["Modal.useEffect.handleEscape"];
            if (isOpen) {
                document.addEventListener("keydown", handleEscape);
            }
            return ({
                "Modal.useEffect": ()=>{
                    document.removeEventListener("keydown", handleEscape);
                }
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], [
        isOpen,
        onClose
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            if (isOpen) {
                // Prevent body scroll
                document.body.style.overflow = "hidden";
                // Also prevent scroll on html element for better compatibility
                document.documentElement.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "unset";
                document.documentElement.style.overflow = "unset";
            }
            return ({
                "Modal.useEffect": ()=>{
                    document.body.style.overflow = "unset";
                    document.documentElement.style.overflow = "unset";
                }
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], [
        isOpen
    ]);
    if (!isOpen) return null;
    const contentClasses = isFullscreen ? "w-full h-full" : "relative w-full rounded-3xl bg-white dark:bg-gray-900";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 flex items-center justify-center overflow-hidden modal z-99999",
        children: [
            !isFullscreen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/modal/index.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: modalRef,
                className: `${contentClasses} ${className}`,
                onClick: (e)=>e.stopPropagation(),
                children: [
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                fillRule: "evenodd",
                                clipRule: "evenodd",
                                d: "M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z",
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/modal/index.tsx",
                                lineNumber: 87,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/modal/index.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/modal/index.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/modal/index.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/modal/index.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/modal/index.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Modal, "Hfgks34jZ8gGGjujuH3DNi1cOoA=");
_c = Modal;
var _c;
__turbopack_context__.k.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/ui/button/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const Button = ({ children, size = "md", variant = "primary", startIcon, endIcon, onClick, className = "", disabled = false, type = "button" })=>{
    // Size Classes
    const sizeClasses = {
        sm: "px-4 py-3 text-sm",
        md: "px-5 py-3.5 text-sm"
    };
    // Variant Classes
    const variantClasses = {
        primary: "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
        outline: "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: type,
        className: `inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${className} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""}`,
        onClick: onClick,
        disabled: disabled,
        children: [
            startIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center",
                children: startIcon
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/button/Button.tsx",
                lineNumber: 53,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0)),
            children,
            endIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center",
                children: endIcon
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/button/Button.tsx",
                lineNumber: 55,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/button/Button.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Button;
const __TURBOPACK__default__export__ = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LogoutConfirmModal
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
function LogoutConfirmModal({ isOpen, onClose, onConfirm }) {
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
                            className: "shrink-0 w-12 h-12 rounded-full bg-error-100 dark:bg-error-900/20 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6 text-error-600 dark:text-error-400",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx",
                                    lineNumber: 29,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx",
                                lineNumber: 23,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-gray-900 dark:text-white",
                                    children: "Sign Out"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500 dark:text-gray-400 mt-1",
                                    children: "Are you sure you want to sign out?"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 justify-end",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            type: "button",
                            size: "sm",
                            variant: "outline",
                            onClick: onClose,
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            type: "button",
                            size: "sm",
                            onClick: onConfirm,
                            className: "bg-error-500 hover:bg-error-600 text-white",
                            children: "Sign Out"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
    // Use portal to render modal at document body level to avoid positioning issues
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(modalContent, document.body) : null;
}
_c = LogoutConfirmModal;
var _c;
__turbopack_context__.k.register(_c, "LogoutConfirmModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$PermissionsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/context/PermissionsContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$Dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/Dropdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$DropdownItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/DropdownItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$common$2f$LogoutConfirmModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx [app-client] (ecmascript)");
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
// Helper function to get the base URL without /api/v1 for static assets
const getBaseUrl = ()=>{
    const apiUrl = ("TURBOPACK compile-time value", "http://localhost:3010/api/v1/") || "http://localhost:3001";
    // Remove /api/v1 if present, static files are served at root level
    return apiUrl.replace(/\/api\/v1$/, '');
};
// Helper function to construct profile picture URL
const getProfilePicUrl = (profilePic)=>{
    if (!profilePic) return null;
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
function UserDropdown() {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [imageError, setImageError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showLogoutModal, setShowLogoutModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { profile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$PermissionsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const profilePic = profile?.profilePic;
    const displayName = user?.name || profile?.name || "User";
    const displayEmail = user?.email || profile?.email || "";
    const profilePicUrl = getProfilePicUrl(profilePic ?? null);
    const hasProfilePic = profilePicUrl && !imageError;
    function toggleDropdown(e) {
        e.stopPropagation();
        setIsOpen((prev)=>!prev);
    }
    function closeDropdown() {
        setIsOpen(false);
    }
    const handleLogoutClick = ()=>{
        setShowLogoutModal(true);
        closeDropdown();
    };
    const handleLogoutConfirm = ()=>{
        logout();
        setShowLogoutModal(false);
        router.push("/admin/auth/signin");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleDropdown,
                className: "flex items-center gap-2 text-gray-700 dark:text-gray-400 dropdown-toggle",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative shrink-0 w-8 h-8 rounded-full overflow-hidden bg-brand-500 flex items-center justify-center",
                        children: hasProfilePic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: profilePicUrl,
                            alt: displayName,
                            width: 32,
                            height: 32,
                            className: "w-full h-full object-cover",
                            onError: ()=>setImageError(true),
                            unoptimized: true
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white text-sm font-medium select-none",
                            children: getInitials(displayName)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: `stroke-gray-500 dark:stroke-gray-400 ${isOpen ? "rotate-180" : ""}`,
                        width: "18",
                        height: "20",
                        viewBox: "0 0 18 20",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M4.3125 8.65625L9 13.3437L13.6875 8.65625",
                            stroke: "currentColor",
                            strokeWidth: "1.5",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$Dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dropdown"], {
                isOpen: isOpen,
                onClose: closeDropdown,
                className: "absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative shrink-0 w-10 h-10 rounded-full overflow-hidden bg-brand-500 flex items-center justify-center",
                                children: hasProfilePic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: profilePicUrl,
                                    alt: displayName,
                                    width: 40,
                                    height: 40,
                                    className: "w-full h-full object-cover",
                                    onError: ()=>setImageError(true),
                                    unoptimized: true
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-sm font-medium select-none",
                                    children: getInitials(displayName)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block mr-1 font-medium text-theme-sm",
                                        children: displayName
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block mr-1 font-medium text-theme-sm",
                                        children: displayEmail
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$DropdownItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownItem"], {
                                    onItemClick: closeDropdown,
                                    tag: "a",
                                    href: "/admin/profile",
                                    className: "flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300",
                                            width: "24",
                                            height: "24",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                clipRule: "evenodd",
                                                d: "M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z",
                                                fill: ""
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                                lineNumber: 172,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this),
                                        "Edit profile"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$DropdownItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownItem"], {
                                    onItemClick: closeDropdown,
                                    tag: "a",
                                    href: "/admin/profile/settings",
                                    className: "flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300",
                                            width: "24",
                                            height: "24",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                clipRule: "evenodd",
                                                d: "M10.4858 3.5L13.5182 3.5C13.9233 3.5 14.2518 3.82851 14.2518 4.23377C14.2518 5.9529 16.1129 7.02795 17.602 6.1682C17.9528 5.96567 18.4014 6.08586 18.6039 6.43667L20.1203 9.0631C20.3229 9.41407 20.2027 9.86286 19.8517 10.0655C18.3625 10.9253 18.3625 13.0747 19.8517 13.9345C20.2026 14.1372 20.3229 14.5859 20.1203 14.9369L18.6039 17.5634C18.4013 17.9142 17.9528 18.0344 17.602 17.8318C16.1129 16.9721 14.2518 18.0471 14.2518 19.7663C14.2518 20.1715 13.9233 20.5 13.5182 20.5H10.4858C10.0804 20.5 9.75182 20.1714 9.75182 19.766C9.75182 18.0461 7.88983 16.9717 6.40067 17.8314C6.04945 18.0342 5.60037 17.9139 5.39767 17.5628L3.88167 14.937C3.67903 14.586 3.79928 14.1372 4.15026 13.9346C5.63949 13.0748 5.63946 10.9253 4.15025 10.0655C3.79926 9.86282 3.67901 9.41401 3.88165 9.06303L5.39764 6.43725C5.60034 6.08617 6.04943 5.96581 6.40065 6.16858C7.88982 7.02836 9.75182 5.9539 9.75182 4.23399C9.75182 3.82862 10.0804 3.5 10.4858 3.5ZM13.5182 2L10.4858 2C9.25201 2 8.25182 3.00019 8.25182 4.23399C8.25182 4.79884 7.64013 5.15215 7.15065 4.86955C6.08213 4.25263 4.71559 4.61859 4.0986 5.68725L2.58261 8.31303C1.96575 9.38146 2.33183 10.7477 3.40025 11.3645C3.88948 11.647 3.88947 12.3531 3.40026 12.6355C2.33184 13.2524 1.96578 14.6186 2.58263 15.687L4.09863 18.3128C4.71562 19.3814 6.08215 19.7474 7.15067 19.1305C7.64015 18.8479 8.25182 19.2012 8.25182 19.766C8.25182 20.9998 9.25201 22 10.4858 22H13.5182C14.7519 22 15.7518 20.9998 15.7518 19.7663C15.7518 19.2015 16.3632 18.8487 16.852 19.1309C17.9202 19.7476 19.2862 19.3816 19.9029 18.3134L21.4193 15.6869C22.0361 14.6185 21.6701 13.2523 20.6017 12.6355C20.1125 12.3531 20.1125 11.647 20.6017 11.3645C21.6701 10.7477 22.0362 9.38152 21.4193 8.3131L19.903 5.68667C19.2862 4.61842 17.9202 4.25241 16.852 4.86917C16.3632 5.15138 15.7518 4.79856 15.7518 4.23377C15.7518 3.00024 14.7519 2 13.5182 2ZM9.6659 11.9999C9.6659 10.7103 10.7113 9.66493 12.0009 9.66493C13.2905 9.66493 14.3359 10.7103 14.3359 11.9999C14.3359 13.2895 13.2905 14.3349 12.0009 14.3349C10.7113 14.3349 9.6659 13.2895 9.6659 11.9999ZM12.0009 8.16493C9.88289 8.16493 8.1659 9.88191 8.1659 11.9999C8.1659 14.1179 9.88289 15.8349 12.0009 15.8349C14.1189 15.8349 15.8359 14.1179 15.8359 11.9999C15.8359 9.88191 14.1189 8.16493 12.0009 8.16493Z",
                                                fill: ""
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                                lineNumber: 197,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                            lineNumber: 189,
                                            columnNumber: 15
                                        }, this),
                                        "Account settings"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleLogoutClick,
                        className: "flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 w-full text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300",
                                width: "24",
                                height: "24",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    fillRule: "evenodd",
                                    clipRule: "evenodd",
                                    d: "M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144 3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116 12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864 7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z",
                                    fill: ""
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this),
                            "Sign out"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$common$2f$LogoutConfirmModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showLogoutModal,
                onClose: ()=>setShowLogoutModal(false),
                onConfirm: handleLogoutConfirm
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(UserDropdown, "yNrb2hvanELGjKybZMgkaLJ948s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$PermissionsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = UserDropdown;
var _c;
__turbopack_context__.k.register(_c, "UserDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/lib/api/search.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "searchApi",
    ()=>searchApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/api/config/index.ts [app-client] (ecmascript)");
;
const searchApi = {
    /**
   * Search vehicles by Reference Number
   * GET /search/vehicles?query=ABC123
   *
   * @param query - Search text (searches in Reference Number field only, partial match, case-insensitive)
   * @returns Promise<ApiVehicle[]> - Array of matching vehicles
   */ searchVehicles: async (query)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$config$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/search/vehicles", {
            params: {
                query
            }
        });
        // Extract vehicles array from wrapped response following the alignment guide
        // The response structure is: { success: boolean, data: { vehicles: ApiVehicle[], meta: VehiclesMeta }, message: string }
        return response.data.data.vehicles;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/vehicle-tracking/types/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateProgress",
    ()=>calculateProgress,
    "getCustomerTypeDisplay",
    ()=>getCustomerTypeDisplay,
    "transformVehicle",
    ()=>transformVehicle,
    "transformVehicles",
    ()=>transformVehicles
]);
const getCustomerTypeDisplay = (customerType)=>{
    switch(customerType){
        case "ZAMBIAN_IMPORT":
            return "Zambian Import";
        case "ZIMBABWE_TRANSIT":
            return "Zimbabwe Transit";
        default:
            return customerType;
    }
};
const calculateProgress = (steps)=>{
    // Handle undefined or null steps
    if (!steps || !Array.isArray(steps)) {
        return {
            current: 0,
            total: 0
        };
    }
    const total = steps.length;
    const completed = steps.filter((step)=>step.status === "COMPLETED").length;
    const inProgress = steps.filter((step)=>step.status === "IN_PROGRESS").length;
    // Count completed + half of in-progress for a more accurate representation
    const current = completed + (inProgress > 0 ? 0.5 : 0);
    return {
        current: Math.floor(current),
        total
    };
};
const transformVehicle = (apiVehicle)=>{
    const timelineSteps = apiVehicle.timelineSteps || [];
    return {
        id: apiVehicle.id,
        referenceNumber: apiVehicle.referenceNumber || apiVehicle.vin,
        vin: apiVehicle.vin,
        customerType: getCustomerTypeDisplay(apiVehicle.customerType),
        status: getCustomerTypeDisplay(apiVehicle.customerType),
        vehicleStatus: apiVehicle.vehicleStatus,
        route: apiVehicle.route,
        destination: apiVehicle.finalDestination,
        city: apiVehicle.city,
        shipmentNumber: apiVehicle.shipmentNumber,
        dhlTrackingNumber: apiVehicle.dhlTrackingNumber,
        progress: calculateProgress(timelineSteps),
        timelineSteps: timelineSteps.map((step)=>({
                id: String(step.id),
                title: step.stepName,
                subtitle: step.notes || undefined,
                status: step.status
            }))
    };
};
const transformVehicles = (apiVehicles)=>{
    return apiVehicles.map(transformVehicle);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/ui/skeleton/Skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Skeleton = ({ className = "", variant = "rectangular", width, height, animation = "pulse" })=>{
    const baseClasses = "bg-gray-200 dark:bg-gray-700";
    const animationClasses = {
        pulse: "animate-pulse",
        wave: "animate-[wave_1.6s_ease-in-out_0.5s_infinite]",
        none: ""
    };
    const variantClasses = {
        text: "rounded",
        circular: "rounded-full",
        rectangular: "rounded-lg"
    };
    const style = {};
    if (width) style.width = typeof width === "number" ? `${width}px` : width;
    if (height) style.height = typeof height === "number" ? `${height}px` : height;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`,
        style: style
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/ui/skeleton/Skeleton.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Skeleton;
const __TURBOPACK__default__export__ = Skeleton;
var _c;
__turbopack_context__.k.register(_c, "Skeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$header$2f$UserDropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/header/UserDropdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/context/SidebarContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$Dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/Dropdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$DropdownItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/dropdown/DropdownItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$search$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/api/search.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$vehicle$2d$tracking$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/vehicle-tracking/types/index.ts [app-client] (ecmascript)");
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
const MIN_SEARCH_LENGTH = 2;
const DEBOUNCE_DELAY = 400;
const BLUR_DELAY = 150;
const AppHeader = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isApplicationMenuOpen, setApplicationMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSearchDropdownOpen, setIsSearchDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedIndex, setSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSearchLoading, setIsSearchLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchError, setSearchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const searchTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const abortControllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const blurTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropdownContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebar"])();
    const handleToggle = ()=>{
        if (window.innerWidth >= 1024) {
            toggleSidebar();
        } else {
            toggleMobileSidebar();
        }
    };
    const toggleApplicationMenu = ()=>{
        setApplicationMenuOpen(!isApplicationMenuOpen);
    };
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    /**
   * Transform API vehicle to search result item
   */ function transformVehicleToSearchResult(vehicle) {
        const parts = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$vehicle$2d$tracking$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCustomerTypeDisplay"])(vehicle.customerType)
        ];
        if (vehicle.finalDestination) {
            parts.push(vehicle.finalDestination);
        }
        if (vehicle.route) {
            parts.push(vehicle.route);
        }
        return {
            id: vehicle.id,
            title: vehicle.referenceNumber || vehicle.vin,
            description: parts.join(" • "),
            href: `/admin/vehicle/trackings/${vehicle.id}`,
            category: "Vehicle"
        };
    }
    /**
   * Trimmed query
   */ const trimmedQuery = searchQuery.trim();
    /**
   * Check if query is valid for search
   */ const isValidQuery = trimmedQuery.length >= MIN_SEARCH_LENGTH;
    /**
   * Highlight matched text in a string
   */ function highlightText(text, query) {
        if (!query || query.length < MIN_SEARCH_LENGTH) {
            return text;
        }
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: parts.map((part, index)=>{
                const isMatch = part.toLowerCase() === query.toLowerCase();
                return isMatch ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mark", {
                    className: "bg-yellow-200 dark:bg-yellow-800 font-semibold",
                    children: part
                }, index, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                    lineNumber: 106,
                    columnNumber: 13
                }, this) : part;
            })
        }, void 0, false);
    }
    /**
   * Perform search with request cancellation
   */ async function performSearch(query) {
        // Cancel previous request if exists
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        // Create new AbortController for this request
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        setIsSearchLoading(true);
        setSearchError(null);
        setSelectedIndex(-1); // Reset selection on new search
        try {
            const vehicles = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$api$2f$search$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchApi"].searchVehicles(query);
            // Check if request was cancelled
            if (abortController.signal.aborted) {
                return;
            }
            const results = vehicles.map(transformVehicleToSearchResult);
            setSearchResults(results);
        } catch (error) {
            // Ignore cancelled requests
            if (abortController.signal.aborted || error?.code === "ERR_CANCELED") {
                return;
            }
            const axiosError = error;
            const errorMessage = axiosError.response?.data?.message || axiosError.message || "Failed to search vehicles";
            setSearchError(errorMessage);
            setSearchResults([]);
        } finally{
            // Only update loading state if this is still the active request
            if (!abortController.signal.aborted) {
                setIsSearchLoading(false);
            }
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppHeader.useEffect": ()=>{
            const handleKeyDown = {
                "AppHeader.useEffect.handleKeyDown": (event)=>{
                    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                        event.preventDefault();
                        inputRef.current?.focus();
                        setIsSearchDropdownOpen(true);
                    }
                }
            }["AppHeader.useEffect.handleKeyDown"];
            document.addEventListener("keydown", handleKeyDown);
            return ({
                "AppHeader.useEffect": ()=>{
                    document.removeEventListener("keydown", handleKeyDown);
                }
            })["AppHeader.useEffect"];
        }
    }["AppHeader.useEffect"], []);
    // Cleanup timeouts and abort requests on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppHeader.useEffect": ()=>{
            return ({
                "AppHeader.useEffect": ()=>{
                    if (searchTimeoutRef.current) {
                        clearTimeout(searchTimeoutRef.current);
                    }
                    if (blurTimeoutRef.current) {
                        clearTimeout(blurTimeoutRef.current);
                    }
                    if (abortControllerRef.current) {
                        abortControllerRef.current.abort();
                    }
                }
            })["AppHeader.useEffect"];
        }
    }["AppHeader.useEffect"], []);
    // Scroll selected item into view
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppHeader.useEffect": ()=>{
            if (dropdownContainerRef.current && selectedIndex >= 0 && searchResults.length > 0) {
                const items = dropdownContainerRef.current.querySelectorAll('[data-search-item]');
                const selectedItem = items[selectedIndex];
                if (selectedItem) {
                    selectedItem.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });
                }
            }
        }
    }["AppHeader.useEffect"], [
        selectedIndex,
        searchResults.length
    ]);
    function handleSearchChange(e) {
        const newQuery = e.target.value;
        setSearchQuery(newQuery);
        setSelectedIndex(-1);
        setSearchError(null);
        // Clear existing timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        const trimmed = newQuery.trim();
        // Show dropdown if query exists
        if (trimmed.length > 0) {
            setIsSearchDropdownOpen(true);
        } else {
            setSearchResults([]);
            setIsSearchLoading(false);
            setIsSearchDropdownOpen(false);
            // Cancel any pending requests
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            return;
        }
        // Debounce search API call - only search if valid query
        if (trimmed.length >= MIN_SEARCH_LENGTH) {
            searchTimeoutRef.current = setTimeout(()=>{
                performSearch(trimmed);
            }, DEBOUNCE_DELAY);
        } else {
            setSearchResults([]);
            setIsSearchLoading(false);
        }
    }
    function handleSearchFocus() {
        // Only show dropdown if there's a query or results
        if (trimmedQuery.length > 0 || searchResults.length > 0) {
            setIsSearchDropdownOpen(true);
        }
    }
    function handleSearchBlur() {
        // Clear existing blur timeout
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
        }
        // Delay closing to allow click events on dropdown items
        blurTimeoutRef.current = setTimeout(()=>{
            setIsSearchDropdownOpen(false);
            setSelectedIndex(-1);
        }, BLUR_DELAY);
    }
    function closeSearchDropdown() {
        // Clear blur timeout to prevent it from reopening
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
        }
        setIsSearchDropdownOpen(false);
        setSelectedIndex(-1);
    }
    function handleItemClick(href, event) {
        // Prevent default and stop propagation if event is provided
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        // Clear blur timeout immediately to prevent dropdown from closing
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
        }
        closeSearchDropdown();
        router.push(href);
    }
    function handleKeyDown(e) {
        if (!isSearchDropdownOpen || searchResults.length === 0) {
            return;
        }
        switch(e.key){
            case "ArrowDown":
                e.preventDefault();
                if (searchResults.length > 0) {
                    setSelectedIndex((prev)=>Math.min(prev + 1, searchResults.length - 1));
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev)=>Math.max(prev - 1, -1));
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && searchResults[selectedIndex]) {
                    const selectedResult = searchResults[selectedIndex];
                    handleItemClick(selectedResult.href);
                } else if (searchResults.length > 0) {
                    // If no item is selected but results exist, navigate to first result
                    const firstResult = searchResults[0];
                    handleItemClick(firstResult.href);
                }
                break;
            case "Escape":
                e.preventDefault();
                closeSearchDropdown();
                inputRef.current?.blur();
                break;
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-between grow lg:flex-row lg:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border",
                            onClick: handleToggle,
                            "aria-label": "Toggle Sidebar",
                            children: isMobileOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "24",
                                height: "24",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    fillRule: "evenodd",
                                    clipRule: "evenodd",
                                    d: "M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z",
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                    lineNumber: 343,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                lineNumber: 336,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "16",
                                height: "12",
                                viewBox: "0 0 16 12",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    fillRule: "evenodd",
                                    clipRule: "evenodd",
                                    d: "M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z",
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                    lineNumber: 358,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                lineNumber: 351,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                            lineNumber: 330,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "lg:hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    width: 154,
                                    height: 32,
                                    className: "dark:hidden",
                                    src: "./images/logo/logo.svg",
                                    alt: "Logo",
                                    draggable: false
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                    lineNumber: 370,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    width: 154,
                                    height: 32,
                                    className: "hidden dark:block",
                                    src: "./images/logo/logo-dark.svg",
                                    alt: "Logo",
                                    draggable: false
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                    lineNumber: 378,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                            lineNumber: 369,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleApplicationMenu,
                            className: "flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "24",
                                height: "24",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    fillRule: "evenodd",
                                    clipRule: "evenodd",
                                    d: "M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z",
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                    lineNumber: 399,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                lineNumber: 392,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:block",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative search-container",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$Dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dropdown"], {
                                    isOpen: isSearchDropdownOpen && trimmedQuery.length > 0 && (isSearchLoading || searchResults.length > 0 || !!searchError || !isValidQuery),
                                    onClose: closeSearchDropdown,
                                    className: "left-0 top-full mt-2 w-full xl:w-[430px] max-h-[400px] overflow-y-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2",
                                        ref: dropdownContainerRef,
                                        children: !isValidQuery ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-3 py-4 text-sm text-gray-500 dark:text-gray-400",
                                            children: [
                                                "Type at least ",
                                                MIN_SEARCH_LENGTH,
                                                " characters to search"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                            lineNumber: 459,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)) : isSearchLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                1,
                                                2,
                                                3
                                            ].map((index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-2 px-3 py-2.5 rounded-lg mb-2 last:mb-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    variant: "text",
                                                                    height: 16,
                                                                    width: "40%"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                                                    lineNumber: 467,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    variant: "text",
                                                                    height: 12,
                                                                    width: "15%"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                                                    lineNumber: 468,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                                            lineNumber: 466,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            variant: "text",
                                                            height: 12,
                                                            width: "70%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                                            lineNumber: 470,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                                    lineNumber: 465,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false) : searchError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-3 py-4 text-sm text-red-600 dark:text-red-400",
                                            children: searchError
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                            lineNumber: 475,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)) : searchResults.length > 0 ? searchResults.map((result, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-search-item": true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$dropdown$2f$DropdownItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownItem"], {
                                                    tag: "button",
                                                    onItemClick: (e)=>handleItemClick(result.href, e),
                                                    className: `flex flex-col gap-1 px-3 py-2.5 rounded-lg w-full ${index === selectedIndex ? "bg-brand-500/10 text-brand-700 dark:bg-brand-800/20 dark:text-brand-400" : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium text-sm",
                                                                    children: highlightText(result.title, trimmedQuery)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                                                    lineNumber: 489,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                result.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-gray-500 dark:text-gray-400",
                                                                    children: result.category
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                                                    lineNumber: 491,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                                            lineNumber: 488,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        result.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-500 dark:text-gray-400",
                                                            children: result.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                                            lineNumber: 495,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, result.id, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                                lineNumber: 478,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-3 py-4 text-sm text-gray-500 dark:text-gray-400",
                                            children: "No vehicles found"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                            lineNumber: 501,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                        lineNumber: 457,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                    lineNumber: 448,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                                lineNumber: 409,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                    lineNumber: 329,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${isApplicationMenuOpen ? "flex" : "hidden"} items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 2xsm:gap-3"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                            lineNumber: 513,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$header$2f$UserDropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                            lineNumber: 517,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
                    lineNumber: 508,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
            lineNumber: 328,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx",
        lineNumber: 327,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AppHeader, "qJZytNGU9E/JYQLHSbciibr4Sag=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebar"]
    ];
});
_c = AppHeader;
const __TURBOPACK__default__export__ = AppHeader;
var _c;
__turbopack_context__.k.register(_c, "AppHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/icons/chevron-down.svg.js [app-client] (ecmascript) <export default as ChevronDownIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronDownIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$chevron$2d$down$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$chevron$2d$down$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/chevron-down.svg.js [app-client] (ecmascript)");
}),
"[project]/Downloads/madina-glass-frontend/src/icons/grid.svg.js [app-client] (ecmascript) <export default as GridIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GridIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$grid$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$grid$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/grid.svg.js [app-client] (ecmascript)");
}),
"[project]/Downloads/madina-glass-frontend/src/icons/group.svg.js [app-client] (ecmascript) <export default as GroupIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GroupIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$group$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$group$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/group.svg.js [app-client] (ecmascript)");
}),
"[project]/Downloads/madina-glass-frontend/src/icons/list.svg.js [app-client] (ecmascript) <export default as ListIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ListIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$list$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$list$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/list.svg.js [app-client] (ecmascript)");
}),
"[project]/Downloads/madina-glass-frontend/src/icons/docs.svg.js [app-client] (ecmascript) <export default as DocsIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DocsIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$docs$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$docs$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/docs.svg.js [app-client] (ecmascript)");
}),
"[project]/Downloads/madina-glass-frontend/src/icons/crm.svg.js [app-client] (ecmascript) <export default as CrmIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CrmIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$crm$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$crm$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/crm.svg.js [app-client] (ecmascript)");
}),
"[project]/Downloads/madina-glass-frontend/src/components/permissions/PermissionWrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PermissionWrapper",
    ()=>PermissionWrapper,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$PermissionsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/context/PermissionsContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const PermissionWrapper = ({ permissions, requireAny = false, children, fallback = null, showWhileLoading = false })=>{
    _s();
    const { hasAnyPermission, hasAllPermissions, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$PermissionsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"])();
    // Normalize permissions to array
    const permissionArray = Array.isArray(permissions) ? permissions : [
        permissions
    ];
    // Check permissions based on requireAny flag
    let hasRequiredPermissions = false;
    if (!isLoading) {
        if (requireAny) {
            hasRequiredPermissions = hasAnyPermission(permissionArray);
        } else {
            hasRequiredPermissions = hasAllPermissions(permissionArray);
        }
    }
    // Show loading state
    if (isLoading) {
        return showWhileLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: fallback
        }, void 0, false);
    }
    // Render based on permission check
    return hasRequiredPermissions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: fallback
    }, void 0, false);
};
_s(PermissionWrapper, "q8qbWcgOHdu5xrDcYLSPndbl7S4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$PermissionsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"]
    ];
});
_c = PermissionWrapper;
const __TURBOPACK__default__export__ = PermissionWrapper;
var _c;
__turbopack_context__.k.register(_c, "PermissionWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/context/SidebarContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/index.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$chevron$2d$down$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/chevron-down.svg.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$grid$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GridIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/grid.svg.js [app-client] (ecmascript) <export default as GridIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$group$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GroupIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/group.svg.js [app-client] (ecmascript) <export default as GroupIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$list$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/list.svg.js [app-client] (ecmascript) <export default as ListIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$docs$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocsIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/docs.svg.js [app-client] (ecmascript) <export default as DocsIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$crm$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CrmIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/crm.svg.js [app-client] (ecmascript) <export default as CrmIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$permissions$2f$PermissionWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/permissions/PermissionWrapper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$common$2f$LogoutConfirmModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/common/LogoutConfirmModal.tsx [app-client] (ecmascript)");
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
const navItems = [
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$grid$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GridIcon$3e$__["GridIcon"], {}, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
            lineNumber: 48,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        name: "Dashboard",
        path: "/admin/dashboard"
    },
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$group$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GroupIcon$3e$__["GroupIcon"], {}, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
            lineNumber: 53,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        name: "Roles & Permissions",
        path: "/admin/dashboard/roles",
        permission: "role.view"
    },
    // 
    // {
    //   icon: <VehicleIcon />,
    //   name: "Vehicle",
    //   subItems: [
    //     {
    //       name: "Tracking",
    //       path: "/admin/vehicle/trackings",
    //       permission: "vehicle.view",
    //     },
    //     {
    //       name: "Upgrade Requests",
    //       path: "/admin/vehicle/upgrade",
    //       permission: "upgradeRequest.view"
    //     },
    //   ],
    // },
    // 
    // {
    //   icon: <VehicleIcon />,
    //   name: "Vehicle Tracking",
    //   path: "/admin/vehicle/trackings",
    //   permission: "vehicle.view",
    // },
    // {
    //   icon: <BoltIcon />,
    //   name: "Upgrade Requests",
    //   path: "/admin/vehicle/upgrade",
    //   permission: "upgradeRequest.view",
    // },
    // {
    //   icon: <BoxIcon />,
    //   name: "Vessels",
    //   subItems: [
    //     {
    //       name: "Allocate Vessel",
    //       path: "/admin/vessels/allocate",
    //     },
    //     {
    //       name: "Vessels",
    //       path: "/admin/vessels",
    //     },
    //   ],
    // },
    //  {
    //   icon: <UserCircleIcon />,
    //   name: "Users",
    //   path: "/admin/users",
    //   permission: "user.view",
    // },
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$list$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListIcon$3e$__["ListIcon"], {}, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
            lineNumber: 113,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        name: "Teams",
        path: "/admin/teams",
        permission: "adminUser.view"
    },
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$crm$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CrmIcon$3e$__["CrmIcon"], {}, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
            lineNumber: 119,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        name: "Crm",
        subItems: [
            {
                name: "Cold Prospects",
                path: "/admin/crm/coldprospects",
                permission: "vehicle.view"
            }
        ]
    },
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$docs$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocsIcon$3e$__["DocsIcon"], {}, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
            lineNumber: 136,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        name: "Terms and Conditions",
        path: "/admin/settings/terms"
    }
];
// Account section icons as components
const ProfileIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-5 h-5",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
            lineNumber: 150,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
        lineNumber: 144,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = ProfileIcon;
const SettingsIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-5 h-5",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M10.4858 3.5L13.5182 3.5C13.9233 3.5 14.2518 3.82851 14.2518 4.23377C14.2518 5.9529 16.1129 7.02795 17.602 6.1682C17.9528 5.96567 18.4014 6.08586 18.6039 6.43667L20.1203 9.0631C20.3229 9.41407 20.2027 9.86286 19.8517 10.0655C18.3625 10.9253 18.3625 13.0747 19.8517 13.9345C20.2026 14.1372 20.3229 14.5859 20.1203 14.9369L18.6039 17.5634C18.4013 17.9142 17.9528 18.0344 17.602 17.8318C16.1129 16.9721 14.2518 18.0471 14.2518 19.7663C14.2518 20.1715 13.9233 20.5 13.5182 20.5H10.4858C10.0804 20.5 9.75182 20.1714 9.75182 19.766C9.75182 18.0461 7.88983 16.9717 6.40067 17.8314C6.04945 18.0342 5.60037 17.9139 5.39767 17.5628L3.88167 14.937C3.67903 14.586 3.79928 14.1372 4.15026 13.9346C5.63949 13.0748 5.63946 10.9253 4.15025 10.0655C3.79926 9.86282 3.67901 9.41401 3.88165 9.06303L5.39764 6.43725C5.60034 6.08617 6.04943 5.96581 6.40065 6.16858C7.88982 7.02836 9.75182 5.9539 9.75182 4.23399C9.75182 3.82862 10.0804 3.5 10.4858 3.5ZM13.5182 2L10.4858 2C9.25201 2 8.25182 3.00019 8.25182 4.23399C8.25182 4.79884 7.64013 5.15215 7.15065 4.86955C6.08213 4.25263 4.71559 4.61859 4.0986 5.68725L2.58261 8.31303C1.96575 9.38146 2.33183 10.7477 3.40025 11.3645C3.88948 11.647 3.88947 12.3531 3.40026 12.6355C2.33184 13.2524 1.96578 14.6186 2.58263 15.687L4.09863 18.3128C4.71562 19.3814 6.08215 19.7474 7.15067 19.1305C7.64015 18.8479 8.25182 19.2012 8.25182 19.766C8.25182 20.9998 9.25201 22 10.4858 22H13.5182C14.7519 22 15.7518 20.9998 15.7518 19.7663C15.7518 19.2015 16.3632 18.8487 16.852 19.1309C17.9202 19.7476 19.2862 19.3816 19.9029 18.3134L21.4193 15.6869C22.0361 14.6185 21.6701 13.2523 20.6017 12.6355C20.1125 12.3531 20.1125 11.647 20.6017 11.3645C21.6701 10.7477 22.0362 9.38152 21.4193 8.3131L19.903 5.68667C19.2862 4.61842 17.9202 4.25241 16.852 4.86917C16.3632 5.15138 15.7518 4.79856 15.7518 4.23377C15.7518 3.00024 14.7519 2 13.5182 2ZM9.6659 11.9999C9.6659 10.7103 10.7113 9.66493 12.0009 9.66493C13.2905 9.66493 14.3359 10.7103 14.3359 11.9999C14.3359 13.2895 13.2905 14.3349 12.0009 14.3349C10.7113 14.3349 9.6659 13.2895 9.6659 11.9999ZM12.0009 8.16493C9.88289 8.16493 8.1659 9.88191 8.1659 11.9999C8.1659 14.1179 9.88289 15.8349 12.0009 15.8349C14.1189 15.8349 15.8359 14.1179 15.8359 11.9999C15.8359 9.88191 14.1189 8.16493 12.0009 8.16493Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
            lineNumber: 166,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
        lineNumber: 160,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = SettingsIcon;
const LogoutIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-5 h-5",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144 3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116 12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864 7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
            lineNumber: 183,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
        lineNumber: 177,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = LogoutIcon;
const accountItems = [
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileIcon, {}, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
            lineNumber: 194,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        name: "Edit profile",
        path: "/admin/profile"
    },
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsIcon, {}, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
            lineNumber: 199,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        name: "Account settings",
        path: "/admin/profile/settings"
    }
];
const AppSidebar = ()=>{
    _s();
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebar"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const renderMenuItems = (navItems, menuType)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "flex flex-col gap-4",
            children: navItems.map((nav, index)=>{
                const navItemContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: [
                        nav.subItems ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleSubmenuToggle(index, menuType),
                            className: `menu-item group  ${hasActiveSubItem(nav) ? "menu-item-active" : "menu-item-inactive"} cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: ` ${hasActiveSubItem(nav) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`,
                                    children: nav.icon
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                    lineNumber: 231,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                (isExpanded || isHovered || isMobileOpen) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `menu-item-text`,
                                    children: nav.name
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                    lineNumber: 240,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                (isExpanded || isHovered || isMobileOpen) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$chevron$2d$down$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                                    className: `ml-auto w-5 h-5 ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "rotate-180 text-brand-500" : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                    lineNumber: 243,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                            lineNumber: 221,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : nav.path && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: nav.path,
                            className: `menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`,
                                    children: nav.icon
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                    lineNumber: 259,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                (isExpanded || isHovered || isMobileOpen) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `menu-item-text`,
                                    children: nav.name
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                    lineNumber: 268,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                            lineNumber: 254,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        nav.subItems && (isExpanded || isHovered || isMobileOpen) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: (el)=>{
                                subMenuRefs.current[`${menuType}-${index}`] = el;
                            },
                            className: "overflow-hidden",
                            style: {
                                height: openSubmenu?.type === menuType && openSubmenu?.index === index ? `${subMenuHeight[`${menuType}-${index}`]}px` : "0px"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-2 space-y-1 ml-9",
                                children: nav.subItems.map((subItem)=>{
                                    const subItemContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: subItem.path,
                                            className: `menu-dropdown-item ${isActive(subItem.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`,
                                            children: [
                                                subItem.name,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-1 ml-auto",
                                                    children: [
                                                        subItem.new && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `ml-auto ${isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"} menu-dropdown-badge `,
                                                            children: "new"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        subItem.pro && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `ml-auto ${isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"} menu-dropdown-badge `,
                                                            children: "pro"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                                            lineNumber: 310,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                            lineNumber: 290,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, subItem.name, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                        lineNumber: 289,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0));
                                    // Wrap subItem with PermissionWrapper if permission is specified
                                    if (subItem.permission) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$permissions$2f$PermissionWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            permissions: subItem.permission,
                                            requireAny: subItem.requireAny,
                                            children: subItemContent
                                        }, subItem.name, false, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                            lineNumber: 327,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0));
                                    }
                                    return subItemContent;
                                })
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                lineNumber: 286,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                            lineNumber: 274,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, nav.name, true, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
                // Wrap nav item with PermissionWrapper if permission is specified
                if (nav.permission) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$permissions$2f$PermissionWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        permissions: nav.permission,
                        requireAny: nav.requireAny,
                        children: navItemContent
                    }, nav.name, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                        lineNumber: 348,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                }
                return navItemContent;
            })
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
            lineNumber: 216,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    const [openSubmenu, setOpenSubmenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [subMenuHeight, setSubMenuHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [showLogoutModal, setShowLogoutModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const subMenuRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const isManualToggleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    function isActive(path) {
        // Exact match
        if (path === pathname) return true;
        // For admin dashboard path, only match exactly
        if (path === "/admin/dashboard") {
            return pathname === "/admin/dashboard" || pathname === "/admin/dashboard/";
        }
        // For admin profile path, only match exactly (not as prefix for /admin/profile/settings)
        if (path === "/admin/profile") {
            return pathname === "/admin/profile" || pathname === "/admin/profile/";
        }
        // For admin shipments path, only match exactly (not as prefix for /admin/vessels)
        if (path === "/admin/vessels") {
            return pathname === "/admin/vessels" || pathname === "/admin/vessels/";
        }
        // Check if pathname starts with the nav path and the next character is / or end of string
        // This ensures /vehicle/trackings matches /vehicle/trackings/1 but not /vehicle/trackings-something
        return pathname.startsWith(path + "/") || pathname === path;
    }
    // Check if any sub-item of a nav item is active
    function hasActiveSubItem(nav) {
        if (!nav.subItems) return false;
        return nav.subItems.some((subItem)=>isActive(subItem.path));
    }
    // Compute the matched submenu based on current pathname
    function getMatchedSubmenu() {
        let result = null;
        [
            "main"
        ].forEach((menuType)=>{
            const items = navItems;
            items.forEach((nav, index)=>{
                if (nav.subItems) {
                    nav.subItems.forEach((subItem)=>{
                        if (subItem.path === pathname) {
                            result = {
                                type: menuType,
                                index
                            };
                        }
                    });
                }
            });
        });
        return result;
    }
    const matchedSubmenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AppSidebar.useMemo[matchedSubmenu]": ()=>getMatchedSubmenu()
    }["AppSidebar.useMemo[matchedSubmenu]"], [
        pathname
    ]);
    // Update state when matched submenu changes - auto-open if sub-item is active
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppSidebar.useEffect": ()=>{
            // Only auto-open if not a manual toggle and a sub-item is active
            if (!isManualToggleRef.current && matchedSubmenu !== null) {
                setOpenSubmenu({
                    "AppSidebar.useEffect": (prev)=>{
                        // Only update if the value is actually different
                        if (prev === null || prev.type !== matchedSubmenu.type || prev.index !== matchedSubmenu.index) {
                            return matchedSubmenu;
                        }
                        return prev; // Return previous state to prevent unnecessary re-render
                    }
                }["AppSidebar.useEffect"]);
            }
            // Reset the manual toggle flag
            if (isManualToggleRef.current) {
                const timer = setTimeout({
                    "AppSidebar.useEffect.timer": ()=>{
                        isManualToggleRef.current = false;
                    }
                }["AppSidebar.useEffect.timer"], 200);
                return ({
                    "AppSidebar.useEffect": ()=>clearTimeout(timer)
                })["AppSidebar.useEffect"];
            }
        }
    }["AppSidebar.useEffect"], [
        matchedSubmenu
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppSidebar.useEffect": ()=>{
            // Set the height of the submenu items when the submenu is opened
            if (openSubmenu !== null) {
                const key = `${openSubmenu.type}-${openSubmenu.index}`;
                if (subMenuRefs.current[key]) {
                    setSubMenuHeight({
                        "AppSidebar.useEffect": (prevHeights)=>({
                                ...prevHeights,
                                [key]: subMenuRefs.current[key]?.scrollHeight || 0
                            })
                    }["AppSidebar.useEffect"]);
                }
            }
        }
    }["AppSidebar.useEffect"], [
        openSubmenu
    ]);
    const handleSubmenuToggle = (index, menuType)=>{
        isManualToggleRef.current = true; // Mark as manual toggle
        setOpenSubmenu((prevOpenSubmenu)=>{
            // If clicking the same submenu that's already open, close it
            // But only if no sub-item is currently active
            if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
                // Check if any sub-item is active - if so, don't close
                const navItem = navItems[index];
                if (navItem.subItems && hasActiveSubItem(navItem)) {
                    return prevOpenSubmenu; // Keep it open if a sub-item is active
                }
                return null; // Close if no sub-item is active
            }
            // Open the clicked submenu
            return {
                type: menuType,
                index
            };
        });
    };
    function handleLogoutClick() {
        setShowLogoutModal(true);
    }
    function handleLogoutConfirm() {
        logout();
        setShowLogoutModal(false);
        router.push("/admin/auth/signin");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: `fixed mt-16 flex flex-col lg:mt-0 h-[calc(100vh-4rem)] lg:h-screen top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`,
        onMouseEnter: ()=>!isExpanded && setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `pb-8 pt-4 flex shrink-0 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/admin/dashboard",
                    children: isExpanded || isHovered || isMobileOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                draggable: false,
                                className: "dark:hidden",
                                src: "/images/logo/logo.svg",
                                alt: "Logo",
                                width: 150,
                                height: 40
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                lineNumber: 517,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                draggable: false,
                                className: "hidden dark:block",
                                src: "/images/logo/logo-dark.svg",
                                alt: "Logo",
                                width: 150,
                                height: 40
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                lineNumber: 525,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/images/logo/logo-small.png",
                        alt: "Logo",
                        width: 32,
                        height: 32
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                        lineNumber: 535,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                    lineNumber: 514,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                lineNumber: 510,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col overflow-y-auto overflow-x-hidden duration-300 ease-linear no-scrollbar flex-1 min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-4",
                            children: renderMenuItems(navItems, "main")
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                            lineNumber: 546,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                        lineNumber: 545,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "pt-6 border-t border-gray-200 dark:border-gray-800",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "flex flex-col gap-4",
                                children: [
                                    accountItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: item.path && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: item.path,
                                                className: `menu-item group ${isActive(item.path) ? "menu-item-active" : "menu-item-inactive"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `${isActive(item.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`,
                                                        children: item.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                                        lineNumber: 564,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    (isExpanded || isHovered || isMobileOpen) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "menu-item-text",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                                        lineNumber: 573,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                                lineNumber: 559,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, item.name, false, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                            lineNumber: 557,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleLogoutClick,
                                            className: `menu-item mb-10 group menu-item-inactive w-full ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "menu-item-icon-inactive",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LogoutIcon, {}, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                                        lineNumber: 589,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                                    lineNumber: 588,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                (isExpanded || isHovered || isMobileOpen) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "menu-item-text",
                                                    children: "Sign out"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                                    lineNumber: 592,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                            lineNumber: 581,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                        lineNumber: 580,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                                lineNumber: 555,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                            lineNumber: 553,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                        lineNumber: 552,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                lineNumber: 544,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$common$2f$LogoutConfirmModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showLogoutModal,
                onClose: ()=>setShowLogoutModal(false),
                onConfirm: handleLogoutConfirm
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
                lineNumber: 600,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx",
        lineNumber: 497,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AppSidebar, "LGcSvWfNSpEwSQ/4TfNoHOyL0ag=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebar"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c3 = AppSidebar;
const __TURBOPACK__default__export__ = AppSidebar;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ProfileIcon");
__turbopack_context__.k.register(_c1, "SettingsIcon");
__turbopack_context__.k.register(_c2, "LogoutIcon");
__turbopack_context__.k.register(_c3, "AppSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/layout/Backdrop.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/context/SidebarContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const Backdrop = ()=>{
    _s();
    const { isMobileOpen, toggleMobileSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebar"])();
    if (!isMobileOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-40 bg-gray-900/50 lg:hidden",
        onClick: toggleMobileSidebar
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/layout/Backdrop.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Backdrop, "WsgFK5yVzNwtmsM8arBtfOlYq7I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebar"]
    ];
});
_c = Backdrop;
const __TURBOPACK__default__export__ = Backdrop;
var _c;
__turbopack_context__.k.register(_c, "Backdrop");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RouteGuard",
    ()=>RouteGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$PermissionsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/context/PermissionsContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$routes$2f$route$2d$matcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/routes/route-matcher.ts [app-client] (ecmascript)");
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
function RouteGuard({ children }) {
    _s();
    const { isAuthenticated, isLoading: isAuthLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { isLoading: isPermissionsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$PermissionsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Only show loading skeleton if auth is still loading (initial load)
    // Don't show skeleton if user is authenticated and we're just fetching permissions
    const isLoading = isAuthLoading || isPermissionsLoading && !isAuthenticated;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RouteGuard.useEffect": ()=>{
            if (!pathname) return;
            const needsProtection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$routes$2f$route$2d$matcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldProtectRoute"])(pathname);
            if (!isLoading && needsProtection && !isAuthenticated) {
                router.push("/admin/auth/signin");
            }
        }
    }["RouteGuard.useEffect"], [
        isAuthenticated,
        isLoading,
        router,
        pathname
    ]);
    // Show loading state while checking authentication (initial load only)
    // Don't show skeleton if user is already authenticated and we're just fetching permissions
    if (isLoading) {
        // Check if this is an auth route (should show simple skeleton)
        const isAuth = pathname ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$routes$2f$route$2d$matcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthRoute"])(pathname) : false;
        if (isAuth) {
            // Simple skeleton for auth pages
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center min-h-screen",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md space-y-4 p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "rectangular",
                                    height: 40,
                                    width: "100%"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "rectangular",
                                    height: 40,
                                    width: "100%"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "rectangular",
                                    height: 40,
                                    width: "100%"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                    lineNumber: 47,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 pt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "rectangular",
                                height: 200,
                                width: "100%"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this);
        }
        // Full admin panel skeleton for protected routes
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen xl:flex overflow-x-hidden w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed left-0 top-0 z-50 h-screen w-[90px] lg:w-[290px] border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col h-full p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    variant: "rectangular",
                                    height: 40,
                                    width: 120,
                                    className: "mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 flex-1",
                                children: [
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6,
                                    7,
                                    8
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "rectangular",
                                                width: 24,
                                                height: 24,
                                                className: "rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                lineNumber: 71,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "text",
                                                height: 16,
                                                width: "60%"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                lineNumber: 72,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                        lineNumber: 70,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-auto pt-4 border-t border-gray-200 dark:border-gray-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            variant: "circular",
                                            width: 40,
                                            height: 40
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "text",
                                                    height: 14,
                                                    width: "70%",
                                                    className: "mb-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "text",
                                                    height: 12,
                                                    width: "50%"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                            lineNumber: 80,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 min-w-0 overflow-x-hidden lg:ml-[90px] xl:ml-[290px] transition-all duration-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between p-4 md:p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "rectangular",
                                                width: 40,
                                                height: 40,
                                                className: "rounded-lg lg:hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                lineNumber: 95,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 max-w-md",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "rectangular",
                                                    height: 40,
                                                    width: "100%",
                                                    className: "rounded-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                lineNumber: 96,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "circular",
                                                width: 40,
                                                height: 40
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                lineNumber: 101,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "circular",
                                                width: 40,
                                                height: 40
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                lineNumber: 102,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "rectangular",
                                                width: 100,
                                                height: 36,
                                                className: "rounded-lg"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                lineNumber: 103,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 mx-auto max-w-screen-2xl md:p-6 w-full min-w-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "text",
                                                        height: 32,
                                                        width: 200,
                                                        className: "mb-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "text",
                                                        height: 16,
                                                        width: 300
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                variant: "rectangular",
                                                width: 120,
                                                height: 40,
                                                className: "rounded-lg"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                lineNumber: 117,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                        children: [
                                            1,
                                            2,
                                            3
                                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/3 p-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "rectangular",
                                                        width: 48,
                                                        height: 48,
                                                        className: "rounded-xl mb-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "text",
                                                        height: 16,
                                                        width: "60%",
                                                        className: "mb-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "text",
                                                        height: 24,
                                                        width: "40%"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                lineNumber: 123,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-b border-gray-100 dark:border-white/5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "text",
                                                    height: 20,
                                                    width: "30%"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                lineNumber: 133,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "divide-y divide-gray-100 dark:divide-white/5",
                                                children: [
                                                    1,
                                                    2,
                                                    3,
                                                    4,
                                                    5
                                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 flex items-center gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                variant: "circular",
                                                                width: 40,
                                                                height: 40
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                                lineNumber: 139,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                variant: "text",
                                                                height: 16,
                                                                width: "20%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                                lineNumber: 140,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                variant: "text",
                                                                height: 16,
                                                                width: "25%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                                lineNumber: 141,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                variant: "text",
                                                                height: 16,
                                                                width: "15%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                variant: "rectangular",
                                                                width: 80,
                                                                height: 24,
                                                                className: "rounded-full"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                                lineNumber: 143,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                                lineNumber: 136,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this);
    }
    // Check if route needs protection
    if (!pathname) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    const needsProtection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$routes$2f$route$2d$matcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldProtectRoute"])(pathname);
    // If route needs protection and user is not authenticated, don't render
    if (needsProtection && !isAuthenticated) {
        return null;
    }
    // Render children for public routes or authenticated users
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(RouteGuard, "gWpdtiBW+5Amj2nLTThcCIfCFF8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$PermissionsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = RouteGuard;
var _c;
__turbopack_context__.k.register(_c, "RouteGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/lib/routes/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
/**
 * Route protection module
 * 
 * This module provides utilities and components for route protection
 * in a modular architecture.
 * 
 * - route-matcher.ts: Utilities for determining route protection requirements
 * - route-guards.tsx: React components for protecting routes
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$routes$2f$route$2d$matcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/routes/route-matcher.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$routes$2f$route$2d$guards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/app/admin/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/context/SidebarContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$layout$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/layout/AppHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$layout$2f$AppSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/layout/AppSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$layout$2f$Backdrop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/layout/Backdrop.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$routes$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/routes/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$routes$2f$route$2d$guards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/routes/route-guards.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$routes$2f$route$2d$matcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/lib/routes/route-matcher.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
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
function AdminLayout({ children }) {
    _s();
    const { isExpanded, isHovered, isMobileOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebar"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Check if current route is an auth route (should not show sidebar/header)
    const isAuth = pathname ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$routes$2f$route$2d$matcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthRoute"])(pathname) : false;
    // Dynamic class for main content margin based on sidebar state
    const mainContentMargin = isMobileOpen ? "ml-0" : isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]";
    // For auth routes, render without sidebar/header (RouteGuard handles protection)
    if (isAuth) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$routes$2f$route$2d$guards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteGuard"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/layout.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this);
    }
    // For protected admin routes, show sidebar and header
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$lib$2f$routes$2f$route$2d$guards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteGuard"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen xl:flex overflow-x-hidden w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$layout$2f$AppSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/layout.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$layout$2f$Backdrop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/layout.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex-1 min-w-0 overflow-x-hidden transition-all  duration-300 ease-in-out ${mainContentMargin}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$layout$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/layout.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 mx-auto max-w-screen-2xl md:p-6 w-full min-w-0 overflow-x-hidden",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/layout.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/layout.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/layout.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/app/admin/layout.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(AdminLayout, "2OOzLXplPw/r//mv62uDyexrUPs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebar"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AdminLayout;
var _c;
__turbopack_context__.k.register(_c, "AdminLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_madina-glass-frontend_src_06205421._.js.map