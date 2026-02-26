"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapControllerProps {
  selectedCity: string | null;
  markerRefs: React.MutableRefObject<{ [key: string]: any }>;
  cities: Array<{ name: string; lat: number; lng: number }>;
}

export default function MapController({
  selectedCity,
  markerRefs,
  cities,
}: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (!selectedCity || !map) return;

    const city = cities.find((c) => c.name === selectedCity);
    if (!city) return;

    // Function to update map view safely
    const updateMapView = () => {
      try {
        // Check if map has the required methods and is initialized
        if (!map || typeof (map as any).setView !== 'function') {
          return;
        }

        // Check if map container exists (indicates map is ready)
        const mapContainer = (map as any)._container;
        if (!mapContainer) {
          return;
        }

        (map as any).setView([city.lat, city.lng], 8, {
          animate: true,
          duration: 0.5,
        });

        // Open popup for the selected marker after animation
        setTimeout(() => {
          const marker = markerRefs.current[selectedCity];
          if (marker && typeof marker.openPopup === 'function') {
            marker.openPopup();
          }
        }, 600);
      } catch (error) {
        console.error('Error setting map view:', error);
      }
    };

    // Check if map is already loaded by checking for container
    const mapContainer = (map as any)._container;
    if (mapContainer) {
      // Map is ready, update view immediately with a small delay for safety
      const timeoutId = setTimeout(updateMapView, 50);
      return () => clearTimeout(timeoutId);
    } else {
      // Map not ready yet, wait for it using whenReady
      if (typeof (map as any).whenReady === 'function') {
        (map as any).whenReady(updateMapView);
      } else {
        // Fallback: wait a bit for map to initialize
        const timeoutId = setTimeout(updateMapView, 300);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [selectedCity, map, cities, markerRefs]);

  return null;
}
