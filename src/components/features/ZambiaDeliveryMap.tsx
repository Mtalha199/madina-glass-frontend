"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Simple dynamic imports
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), {
  ssr: false,
});
const MapController = dynamic(() => import("./MapController").then((mod) => ({ default: mod.default })), {
  ssr: false,
});

// Cities data
const cities = [
  { name: "Lusaka", lat: -15.3875, lng: 28.3228, isCapital: true },
  { name: "Ndola", lat: -12.9683, lng: 28.6339 },
  { name: "Kitwe", lat: -12.8133, lng: 28.2136 },
  { name: "Chingola", lat: -12.5292, lng: 27.8839 },
  { name: "Kabwe", lat: -14.4469, lng: 28.4494 },
  { name: "Kapiri Mposhi", lat: -13.9667, lng: 28.6833 },
  { name: "Mazabuka", lat: -15.8567, lng: 27.7478 },
  { name: "Livingstone", lat: -17.8419, lng: 25.8544 },
  { name: "Choma", lat: -16.8094, lng: 26.9767 },
  { name: "Chipata", lat: -13.6333, lng: 32.6500 },
  { name: "Chirundu", lat: -15.9333, lng: 28.8500 },
  { name: "Nakonde", lat: -9.3428, lng: 32.7450, isNakonde: true },
  { name: "Siavonga", lat: -16.5381, lng: 28.7081 },
];

// Find Lusaka
let lusaka = null;
for (let i = 0; i < cities.length; i++) {
  if (cities[i].isCapital) {
    lusaka = cities[i];
    break;
  }
}

// Create routes
const routes: any[] = [];
for (let i = 0; i < cities.length; i++) {
  const city = cities[i];
  if (!city.isCapital && lusaka) {
    routes.push({
      from: lusaka,
      to: city,
      positions: [
        [lusaka.lat, lusaka.lng],
        [city.lat, city.lng],
      ],
    });
  }
}

export default function ZambiaDeliveryMap() {
  const [hoveredCity, setHoveredCity] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [leafletReady, setLeafletReady] = useState(false);
  const markerRefs = useRef<any>({});

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        setL(leaflet.default);
        // Fix marker icons
        if (leaflet.default.Icon.Default.prototype) {
          delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
        }
        leaflet.default.Icon.Default.mergeOptions({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
        // Simple timeout instead of requestAnimationFrame
        setTimeout(() => {
          setLeafletReady(true);
        }, 100);
      });
    }
  }, []);

  // Simple icon creation function
  function createDeliveryIcon(isNakonde: boolean, isCapital: boolean, isHighlighted: boolean) {
    if (!L) return undefined;
    let scale = 1;
    if (isHighlighted) {
      scale = 1.5;
    }
    
    if (isCapital) {
      return L.divIcon({
        className: "custom-marker",
        html: `<div style="width: ${12 * scale}px; height: ${12 * scale}px; background-color: #1d2939; border: ${2 * scale}px solid #1d2939; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>`,
        iconSize: [12 * scale, 12 * scale],
        iconAnchor: [6 * scale, 6 * scale],
      });
    }
    
    if (isNakonde) {
      return L.divIcon({
        className: "custom-marker",
        html: `<div style="width: ${14 * scale}px; height: ${14 * scale}px; background-color: #ff7a2e; border: ${3 * scale}px solid #d92d20; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>`,
        iconSize: [14 * scale, 14 * scale],
        iconAnchor: [7 * scale, 7 * scale],
      });
    }
    
    return L.divIcon({
      className: "custom-marker",
      html: `<div style="width: ${10 * scale}px; height: ${10 * scale}px; background-color: #ff7a2e; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>`,
      iconSize: [10 * scale, 10 * scale],
      iconAnchor: [5 * scale, 5 * scale],
    });
  }

  function handleCityClick(cityName: string) {
    setSelectedCity(cityName);
  }

  function handleCityHover(cityName: string | null) {
    setHoveredCity(cityName);
  }

  if (!mounted || !leafletReady) {
    return (
      <section className="w-full bg-white dark:bg-gray-900 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[600px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white dark:bg-gray-900 pb-12 sm:pb-16 md:pb-20 md:-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-2 -mb-20">
            <Image
              src="/images/icons/beforward-logo.svg"
              alt="BE FORWARD Logo"
              width={256}
              height={256}
              className="w-64 h-64"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-500 mb-2">
            CITY DELIVERY SERVICE
          </h2>
          <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 font-medium">
            RELIABLE DELIVERY ACROSS ZAMBIA
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Map Section */}
          <div className="lg:col-span-2 relative">
            <div className="relative w-full bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700" style={{ height: "600px", minHeight: "500px" }}>
              <MapContainer
                key={leafletReady ? "map-ready" : "map-loading"}
                center={[-13.1339, 27.8493]}
                zoom={6}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
                zoomControl={true}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution=""
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController selectedCity={selectedCity} markerRefs={markerRefs} cities={cities} />

                {/* Delivery Routes */}
                {routes.map((route, index) => {
                  let isSelectedRoute = false;
                  if (selectedCity === route.to.name) {
                    isSelectedRoute = true;
                  }
                  let isHoveredRoute = false;
                  if (hoveredCity === route.to.name) {
                    isHoveredRoute = true;
                  }
                  
                  let routeColor = "#333";
                  let routeWeight = 2;
                  let routeOpacity = 0.6;
                  let dashArray = "5, 5";
                  
                  if (isSelectedRoute || isHoveredRoute) {
                    routeColor = "#ff7a2e";
                    if (isSelectedRoute) {
                      routeWeight = 4;
                      dashArray = "10, 5";
                    } else {
                      routeWeight = 3;
                    }
                    routeOpacity = 0.9;
                  }
                  
                  return (
                    <Polyline
                      key={index}
                      positions={route.positions}
                      pathOptions={{
                        color: routeColor,
                        weight: routeWeight,
                        opacity: routeOpacity,
                        dashArray: dashArray,
                      }}
                    />
                  );
                })}

                {/* City Markers */}
                {L && cities.map((city) => {
                  let isHighlighted = false;
                  if (selectedCity === city.name || hoveredCity === city.name) {
                    isHighlighted = true;
                  }
                  
                  let isNakonde = false;
                  if (city.isNakonde) {
                    isNakonde = true;
                  }
                  
                  let isCapital = false;
                  if (city.isCapital) {
                    isCapital = true;
                  }
                  
                  const icon = createDeliveryIcon(isNakonde, isCapital, isHighlighted);
                  if (!icon) return null;
                  
                  return (
                    <Marker
                      key={city.name}
                      position={[city.lat, city.lng]}
                      icon={icon}
                      eventHandlers={{
                        mouseover: () => handleCityHover(city.name),
                        mouseout: () => handleCityHover(null),
                        click: () => handleCityClick(city.name),
                      }}
                      ref={(ref: any) => {
                        if (ref) {
                          markerRefs.current[city.name] = ref;
                        }
                      }}
                    >
                      <Popup>
                        <div className="text-center">
                          <strong className="text-gray-900">{city.name}</strong>
                          {city.isCapital ? <div className="text-xs text-gray-600">National Capital</div> : null}
                          <div className="text-xs text-gray-500 mt-1">Click to view route</div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>

          {/* Legend and City List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Legend */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase">
                Legend
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-0.5 border-t border-dashed border-gray-600"></div>
                  <span className="text-gray-700 dark:text-gray-300">Province boundary</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                  <span className="text-gray-700 dark:text-gray-300">National capital</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full border border-gray-600"></div>
                  <span className="text-gray-700 dark:text-gray-300">Town, village</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-brand-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">Delivery cities</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-brand-500 border-2 border-error-600"></div>
                  <span className="text-gray-700 dark:text-gray-300">Nakonde</span>
                </div>
              </div>
            </div>

            {/* City Delivery Route List */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                City Delivery Route List:
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto overflow-x-hidden">
                {cities
                  .filter((city) => !city.isCapital)
                  .map((city) => {
                    let isActive = false;
                    if (hoveredCity === city.name || selectedCity === city.name) {
                      isActive = true;
                    }
                    
                    let className = "flex items-center gap-2 py-2 px-3 rounded cursor-pointer transition-all duration-200 ";
                    if (isActive) {
                      className += "bg-brand-500 text-white shadow-md scale-[1.02]";
                    } else {
                      className += "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300";
                    }
                    
                    let dotClassName = "w-2.5 h-2.5 rounded-full shrink-0 ";
                    if (city.isNakonde) {
                      if (isActive) {
                        dotClassName += "bg-white border-2 border-white";
                      } else {
                        dotClassName += "bg-brand-500 border-2 border-error-600";
                      }
                    } else {
                      if (isActive) {
                        dotClassName += "bg-white";
                      } else {
                        dotClassName += "bg-brand-500";
                      }
                    }
                    
                    return (
                      <div
                        key={city.name}
                        className={className}
                        onMouseEnter={() => handleCityHover(city.name)}
                        onMouseLeave={() => handleCityHover(null)}
                        onClick={() => handleCityClick(city.name)}
                      >
                        <div className={dotClassName}></div>
                        <span className={`text-sm font-medium ${isActive ? "text-white" : ""}`}>
                          {city.name}
                        </span>
                        {isActive ? (
                          <svg
                            className="w-4 h-4 ml-auto text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        ) : null}
                      </div>
                    );
                  })}
                {/* Add Lusaka separately */}
                <div
                  className={`flex items-center gap-2 py-2 px-3 rounded cursor-pointer transition-all duration-200 ${
                    hoveredCity === "Lusaka" || selectedCity === "Lusaka"
                      ? "bg-brand-500 text-white shadow-md scale-[1.02]"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                  onMouseEnter={() => handleCityHover("Lusaka")}
                  onMouseLeave={() => handleCityHover(null)}
                  onClick={() => handleCityClick("Lusaka")}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      hoveredCity === "Lusaka" || selectedCity === "Lusaka"
                        ? "bg-white"
                        : "bg-gray-900"
                    }`}
                  ></div>
                  <span
                    className={`text-sm font-medium ${
                      hoveredCity === "Lusaka" || selectedCity === "Lusaka" ? "text-white" : ""
                    }`}
                  >
                    Lusaka
                  </span>
                  {(hoveredCity === "Lusaka" || selectedCity === "Lusaka") ? (
                    <svg
                      className="w-4 h-4 ml-auto text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
