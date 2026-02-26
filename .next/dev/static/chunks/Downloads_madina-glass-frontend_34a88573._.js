(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/madina-glass-frontend/src/components/features/MapController.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MapController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function MapController({ selectedCity, markerRefs, cities }) {
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapController.useEffect": ()=>{
            if (!selectedCity || !map) return;
            const city = cities.find({
                "MapController.useEffect.city": (c)=>c.name === selectedCity
            }["MapController.useEffect.city"]);
            if (!city) return;
            // Function to update map view safely
            const updateMapView = {
                "MapController.useEffect.updateMapView": ()=>{
                    try {
                        // Check if map has the required methods and is initialized
                        if (!map || typeof map.setView !== 'function') {
                            return;
                        }
                        // Check if map container exists (indicates map is ready)
                        const mapContainer = map._container;
                        if (!mapContainer) {
                            return;
                        }
                        map.setView([
                            city.lat,
                            city.lng
                        ], 8, {
                            animate: true,
                            duration: 0.5
                        });
                        // Open popup for the selected marker after animation
                        setTimeout({
                            "MapController.useEffect.updateMapView": ()=>{
                                const marker = markerRefs.current[selectedCity];
                                if (marker && typeof marker.openPopup === 'function') {
                                    marker.openPopup();
                                }
                            }
                        }["MapController.useEffect.updateMapView"], 600);
                    } catch (error) {
                        console.error('Error setting map view:', error);
                    }
                }
            }["MapController.useEffect.updateMapView"];
            // Check if map is already loaded by checking for container
            const mapContainer = map._container;
            if (mapContainer) {
                // Map is ready, update view immediately with a small delay for safety
                const timeoutId = setTimeout(updateMapView, 50);
                return ({
                    "MapController.useEffect": ()=>clearTimeout(timeoutId)
                })["MapController.useEffect"];
            } else {
                // Map not ready yet, wait for it using whenReady
                if (typeof map.whenReady === 'function') {
                    map.whenReady(updateMapView);
                } else {
                    // Fallback: wait a bit for map to initialize
                    const timeoutId = setTimeout(updateMapView, 300);
                    return ({
                        "MapController.useEffect": ()=>clearTimeout(timeoutId)
                    })["MapController.useEffect"];
                }
            }
        }
    }["MapController.useEffect"], [
        selectedCity,
        map,
        cities,
        markerRefs
    ]);
    return null;
}
_s(MapController, "IoceErwr5KVGS9kN4RQ1bOkYMAg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c = MapController;
var _c;
__turbopack_context__.k.register(_c, "MapController");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/madina-glass-frontend/src/components/features/MapController.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Downloads/madina-glass-frontend/src/components/features/MapController.tsx [app-client] (ecmascript)"));
}),
"[project]/Downloads/madina-glass-frontend/node_modules/@react-leaflet/core/lib/context.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTEXT_VERSION",
    ()=>CONTEXT_VERSION,
    "LeafletContext",
    ()=>LeafletContext,
    "createLeafletContext",
    ()=>createLeafletContext,
    "extendContext",
    ()=>extendContext,
    "useLeafletContext",
    ()=>useLeafletContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
const CONTEXT_VERSION = 1;
function createLeafletContext(map) {
    return Object.freeze({
        __version: CONTEXT_VERSION,
        map
    });
}
function extendContext(source, extra) {
    return Object.freeze({
        ...source,
        ...extra
    });
}
const LeafletContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function useLeafletContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(LeafletContext);
    if (context == null) {
        throw new Error('No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>');
    }
    return context;
}
}),
"[project]/Downloads/madina-glass-frontend/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMap",
    ()=>useMap,
    "useMapEvent",
    ()=>useMapEvent,
    "useMapEvents",
    ()=>useMapEvents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f40$react$2d$leaflet$2f$core$2f$lib$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/@react-leaflet/core/lib/context.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/madina-glass-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function useMap() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f40$react$2d$leaflet$2f$core$2f$lib$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLeafletContext"])().map;
}
function useMapEvent(type, handler) {
    const map = useMap();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(function addMapEventHandler() {
        // @ts-ignore event type
        map.on(type, handler);
        return function removeMapEventHandler() {
            // @ts-ignore event type
            map.off(type, handler);
        };
    }, [
        map,
        type,
        handler
    ]);
    return map;
}
function useMapEvents(handlers) {
    const map = useMap();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$madina$2d$glass$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(function addMapEventHandlers() {
        map.on(handlers);
        return function removeMapEventHandlers() {
            map.off(handlers);
        };
    }, [
        map,
        handlers
    ]);
    return map;
}
}),
]);

//# sourceMappingURL=Downloads_madina-glass-frontend_34a88573._.js.map