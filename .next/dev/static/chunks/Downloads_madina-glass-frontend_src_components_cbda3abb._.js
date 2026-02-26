(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/madina-glass-frontend/src/components/roles/modals/FormModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormModal",
    ()=>FormModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$modal$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/modal/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/button/Button.tsx [app-client] (ecmascript)");
;
;
;
const FormModal = ({ isOpen, onClose, title, onSubmit, onCancel, submitLabel = "Save", cancelLabel = "Cancel", isSubmitting = false, isLoading = false, className = "max-w-[600px] p-5 lg:p-10", children, footer })=>{
    const handleCancel = ()=>{
        if (onCancel) {
            onCancel();
        } else {
            onClose();
        }
    };
    const defaultFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-end w-full gap-3 mt-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                size: "sm",
                variant: "outline",
                onClick: handleCancel,
                disabled: isSubmitting || isLoading,
                children: cancelLabel
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/FormModal.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                size: "sm",
                onClick: onSubmit,
                disabled: isSubmitting || isLoading,
                children: isSubmitting ? "Saving..." : submitLabel
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/FormModal.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/FormModal.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$modal$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        isOpen: isOpen,
        onClose: handleCancel,
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "font-semibold text-gray-800 mb-6 text-title-sm dark:text-white/90",
                children: title
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/FormModal.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "space-y-5",
                onSubmit: (e)=>{
                    e.preventDefault();
                    onSubmit();
                },
                children: [
                    children,
                    footer !== undefined ? footer : defaultFooter
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/FormModal.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/FormModal.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = FormModal;
var _c;
__turbopack_context__.k.register(_c, "FormModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/form/Label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
const Label = ({ htmlFor, children, className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        htmlFor: htmlFor,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])(// Default classes that apply by default
        "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400", // User-defined className that can override the default margin
        className),
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/form/Label.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Label;
const __TURBOPACK__default__export__ = Label;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/form/input/InputField.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Input = ({ type = "text", id, name, placeholder, defaultValue, value, onChange, className = "", min, max, step, disabled = false, success = false, error = false, hint, required = false, autoComplete })=>{
    // Determine input styles based on state (disabled, success, error)
    let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;
    // Add styles for the different states
    if (disabled) {
        inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    } else if (error) {
        inputClasses += ` text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500`;
    } else if (success) {
        inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500`;
    } else {
        inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: type,
                id: id,
                name: name,
                placeholder: placeholder,
                defaultValue: defaultValue,
                value: value,
                onChange: onChange,
                min: min,
                max: max,
                step: step,
                disabled: disabled,
                required: required,
                autoComplete: autoComplete,
                className: inputClasses
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/form/input/InputField.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `mt-1.5 text-xs ${error ? "text-error-500" : success ? "text-success-500" : "text-gray-500"}`,
                children: hint
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/form/input/InputField.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/form/input/InputField.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Input;
const __TURBOPACK__default__export__ = Input;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/form/input/TextArea.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const TextArea = ({ id, placeholder = "Enter your message", rows = 3, value = "", onChange, className = "", disabled = false, error = false, hint = "", maxLength })=>{
    const handleChange = (e)=>{
        if (onChange) {
            onChange(e.target.value);
        }
    };
    let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden ${className}`;
    if (disabled) {
        textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    } else if (error) {
        textareaClasses += ` bg-transparent text-gray-400 border-gray-300 focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800`;
    } else {
        textareaClasses += ` bg-transparent text-gray-400 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                id: id,
                placeholder: placeholder,
                rows: 10,
                value: value,
                onChange: handleChange,
                disabled: disabled,
                maxLength: maxLength,
                className: textareaClasses
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/form/input/TextArea.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `mt-2 text-sm ${error ? "text-error-500" : "text-gray-500 dark:text-gray-400"}`,
                children: hint
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/form/input/TextArea.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/form/input/TextArea.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = TextArea;
const __TURBOPACK__default__export__ = TextArea;
var _c;
__turbopack_context__.k.register(_c, "TextArea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/form/Select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const Select = ({ options, placeholder = "Select an option", onChange, className = "", defaultValue = "", value, disabled = false, id })=>{
    _s();
    // If value prop is provided, use controlled component pattern
    // Otherwise, use uncontrolled pattern with internal state
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultValue);
    // Use controlled value if provided, otherwise use internal state
    const selectedValue = isControlled ? value : internalValue;
    const handleChange = (e)=>{
        const newValue = e.target.value;
        // Only update internal state if uncontrolled
        if (!isControlled) {
            setInternalValue(newValue);
        }
        onChange(newValue); // Trigger parent handler
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
        id: id,
        className: `h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${selectedValue ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`,
        value: selectedValue,
        onChange: handleChange,
        disabled: disabled,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "",
                disabled: true,
                className: "text-gray-700 dark:bg-gray-900 dark:text-gray-400",
                children: placeholder
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/form/Select.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                    value: option.value,
                    className: "text-gray-700 dark:bg-gray-900 dark:text-gray-400",
                    children: option.label
                }, option.value, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/form/Select.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/form/Select.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Select, "d2NLwGQqashc9uQuwvF6mBPsoMM=");
_c = Select;
const __TURBOPACK__default__export__ = Select;
var _c;
__turbopack_context__.k.register(_c, "Select");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormField",
    ()=>FormField,
    "SelectInput",
    ()=>SelectInput,
    "TextInput",
    ()=>TextInput,
    "TextareaInput",
    ()=>TextareaInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$form$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/form/Label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$form$2f$input$2f$InputField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/form/input/InputField.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$form$2f$input$2f$TextArea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/form/input/TextArea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$form$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/form/Select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/ui/skeleton/Skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/index.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$chevron$2d$down$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/icons/chevron-down.svg.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
;
;
;
;
;
;
;
const FormField = ({ label, error, hint, required, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$form$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                htmlFor: label.toLowerCase().replace(/\s+/g, "-"),
                children: [
                    label,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-error-500",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
                        lineNumber: 31,
                        columnNumber: 20
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
                lineNumber: 29,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children,
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-sm text-error-500",
                children: error
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
                lineNumber: 34,
                columnNumber: 15
            }, ("TURBOPACK compile-time value", void 0)),
            hint && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-sm text-gray-500 dark:text-gray-400",
                children: hint
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
        lineNumber: 28,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = FormField;
const TextInput = ({ id, value, onChange, placeholder, type = "text", error, hint })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$form$2f$input$2f$InputField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        type: type,
        id: id,
        placeholder: placeholder,
        value: value,
        onChange: (e)=>onChange(e.target.value),
        error: !!error,
        hint: hint
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
        lineNumber: 60,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = TextInput;
const TextareaInput = ({ id, value, onChange, placeholder, rows = 4, error, hint })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$form$2f$input$2f$TextArea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        id: id,
        placeholder: placeholder,
        rows: rows,
        value: value,
        onChange: onChange,
        error: !!error,
        hint: hint
    }, void 0, false, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
        lineNumber: 90,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = TextareaInput;
const SelectInput = ({ id, value, onChange, options, placeholder = "Select an option", error, isLoading, loadingText = "Loading..." })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$form$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                options: options,
                placeholder: placeholder,
                onChange: onChange,
                defaultValue: value,
                className: error ? "border-error-500" : ""
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
                lineNumber: 123,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$icons$2f$chevron$2d$down$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {}, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
                    lineNumber: 131,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
                lineNumber: 130,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$ui$2f$skeleton$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "text",
                    height: 16,
                    width: "30%"
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx",
        lineNumber: 122,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = SelectInput;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "FormField");
__turbopack_context__.k.register(_c1, "TextInput");
__turbopack_context__.k.register(_c2, "TextareaInput");
__turbopack_context__.k.register(_c3, "SelectInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/roles/hooks/useZodForm.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useZodForm",
    ()=>useZodForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useZodForm = ({ initialValues, schema })=>{
    _s();
    const [values, setValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialValues);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const initialValuesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(initialValues);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useZodForm.useEffect": ()=>{
            initialValuesRef.current = initialValues;
        }
    }["useZodForm.useEffect"], [
        initialValues
    ]);
    const setValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useZodForm.useCallback[setValue]": (field, value)=>{
            setValues({
                "useZodForm.useCallback[setValue]": (prev)=>{
                    if (prev[field] === value) return prev;
                    return {
                        ...prev,
                        [field]: value
                    };
                }
            }["useZodForm.useCallback[setValue]"]);
            // Clear error for this field when value changes
            setErrors({
                "useZodForm.useCallback[setValue]": (prev)=>{
                    if (!prev[field]) return prev;
                    const next = {
                        ...prev
                    };
                    delete next[field];
                    return next;
                }
            }["useZodForm.useCallback[setValue]"]);
        }
    }["useZodForm.useCallback[setValue]"], []);
    const validate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useZodForm.useCallback[validate]": ()=>{
            const result = schema.safeParse(values);
            if (result.success) {
                setErrors({});
                return true;
            }
            const newErrors = {};
            result.error.issues.forEach({
                "useZodForm.useCallback[validate]": (issue)=>{
                    const field = issue.path[0];
                    if (!newErrors[field]) {
                        newErrors[field] = issue.message;
                    }
                }
            }["useZodForm.useCallback[validate]"]);
            setErrors(newErrors);
            return false;
        }
    }["useZodForm.useCallback[validate]"], [
        schema,
        values
    ]);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useZodForm.useCallback[reset]": (newValues)=>{
            setValues(newValues || initialValuesRef.current);
            setErrors({});
        }
    }["useZodForm.useCallback[reset]"], []);
    const setFormValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useZodForm.useCallback[setFormValues]": (newValues)=>{
            setValues({
                "useZodForm.useCallback[setFormValues]": (prev)=>({
                        ...prev,
                        ...newValues
                    })
            }["useZodForm.useCallback[setFormValues]"]);
        }
    }["useZodForm.useCallback[setFormValues]"], []);
    return {
        values,
        errors,
        setValue,
        validate,
        reset,
        setFormValues
    };
};
_s(useZodForm, "0PHKaz0stg5D+KhN5pNRp2b1RD8=");
const __TURBOPACK__default__export__ = useZodForm;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/roles/utils/schemas.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRoleSchema",
    ()=>createRoleSchema,
    "createUserSchema",
    ()=>createUserSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
;
const createRoleSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    identifier: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Identifier is required").regex(/^[a-z0-9_]+$/, "Identifier must be lowercase letters, numbers, and underscores only"),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Name is required"),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Description is required")
});
const createUserSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Name is required"),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Email is required").email("Please enter a valid email address"),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    roleId: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Role is required")
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/roles/modals/CreateRoleModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$modals$2f$FormModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/roles/modals/FormModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$utils$2f$formFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/roles/utils/formFields.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$hooks$2f$useZodForm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/roles/hooks/useZodForm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$utils$2f$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/roles/utils/schemas.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const initialFormValues = {
    identifier: "",
    name: "",
    description: ""
};
const CreateRoleModal = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(_c = _s(({ isOpen, onClose, onSave, isSaving = false })=>{
    _s();
    const { values, errors, setValue, validate, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$hooks$2f$useZodForm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useZodForm"])({
        initialValues: initialFormValues,
        schema: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$utils$2f$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRoleSchema"]
    });
    // Reset form when modal opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateRoleModal.useEffect": ()=>{
            if (isOpen) {
                reset();
            }
        }
    }["CreateRoleModal.useEffect"], [
        isOpen,
        reset
    ]);
    const handleSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CreateRoleModal.useCallback[handleSubmit]": async ()=>{
            if (validate()) {
                try {
                    await onSave(values);
                    reset();
                    onClose();
                } catch (error) {
                    console.error("Error creating role:", error);
                }
            }
        }
    }["CreateRoleModal.useCallback[handleSubmit]"], [
        validate,
        values,
        onSave,
        reset,
        onClose
    ]);
    const handleCancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CreateRoleModal.useCallback[handleCancel]": ()=>{
            reset();
            onClose();
        }
    }["CreateRoleModal.useCallback[handleCancel]"], [
        reset,
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$modals$2f$FormModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormModal"], {
        isOpen: isOpen,
        onClose: onClose,
        onCancel: handleCancel,
        title: "Create Role",
        onSubmit: handleSubmit,
        submitLabel: "Create Role",
        isSubmitting: isSaving,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$utils$2f$formFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                label: "Identifier",
                error: errors.identifier,
                hint: "Lowercase letters, numbers, and underscores only",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$utils$2f$formFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInput"], {
                    id: "identifier",
                    value: values.identifier,
                    onChange: (value)=>setValue("identifier", value),
                    placeholder: "e.g., admin, manager, user",
                    error: !!errors.identifier
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/CreateRoleModal.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/CreateRoleModal.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$utils$2f$formFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                label: "Name",
                error: errors.name,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$utils$2f$formFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInput"], {
                    id: "name",
                    value: values.name,
                    onChange: (value)=>setValue("name", value),
                    placeholder: "e.g., Administrator, Manager, User",
                    error: !!errors.name
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/CreateRoleModal.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/CreateRoleModal.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$utils$2f$formFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                label: "Description",
                error: errors.description,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$utils$2f$formFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextareaInput"], {
                    id: "description",
                    value: values.description,
                    onChange: (value)=>setValue("description", value),
                    placeholder: "Enter role description",
                    error: !!errors.description
                }, void 0, false, {
                    fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/CreateRoleModal.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/CreateRoleModal.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/madina-glass-frontend/src/components/roles/modals/CreateRoleModal.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "a8Jt/4ohIcJLnFIjsB6CSAdvbZ0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$hooks$2f$useZodForm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useZodForm"]
    ];
})), "a8Jt/4ohIcJLnFIjsB6CSAdvbZ0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$src$2f$components$2f$roles$2f$hooks$2f$useZodForm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useZodForm"]
    ];
});
_c1 = CreateRoleModal;
CreateRoleModal.displayName = "CreateRoleModal";
const __TURBOPACK__default__export__ = CreateRoleModal;
var _c, _c1;
__turbopack_context__.k.register(_c, "CreateRoleModal$React.memo");
__turbopack_context__.k.register(_c1, "CreateRoleModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_madina-glass-frontend_src_components_cbda3abb._.js.map