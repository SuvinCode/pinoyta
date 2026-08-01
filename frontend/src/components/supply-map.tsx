"use client";

import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, MapPin, ShieldCheck, ExternalLink, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface SupplyDrop {
  id: string;
  lat: number;
  lng: number;
  locationName: string;
  barangay: string;
  items: string;
  capacity: string;
  submittedBy: string;
  role: string;
  verified: boolean;
  timestamp: string;
}

const mockDrops: SupplyDrop[] = [
  {
    id: "1",
    lat: 9.456,
    lng: 125.542,
    locationName: "Brgy. San Roque Central School",
    barangay: "San Roque",
    items: "150 Food Packs, 80 Water Containers, First Aid Kits",
    capacity: "145 / 200 Families",
    submittedBy: "Coordinator Lando",
    role: "Evacuation Center Manager",
    verified: true,
    timestamp: "12 mins ago",
  },
  {
    id: "2",
    lat: 9.521,
    lng: 125.489,
    locationName: "Kitcharao Tribal Hall",
    barangay: "Kitcharao",
    items: "200 Rice Sacks, Hygiene Kits",
    capacity: "90 / 120 Families",
    submittedBy: "Datu Makusog",
    role: "Tribal Council Leader",
    verified: true,
    timestamp: "25 mins ago",
  },
  {
    id: "3",
    lat: 9.389,
    lng: 125.612,
    locationName: "Alegria Riverbank Drop Point",
    barangay: "Alegria",
    items: "50 Emergency Rations (Unconfirmed)",
    capacity: "Unknown",
    submittedBy: "Anonymous Caller",
    role: "Unverified Community Source",
    verified: false,
    timestamp: "45 mins ago",
  },
  {
    id: "4",
    lat: 9.498,
    lng: 125.580,
    locationName: "Upper Ridge Community Outpost",
    barangay: "San Roque Uplands",
    items: "30 Tarpaulins, Water Purification Tablets",
    capacity: "35 / 50 Families",
    submittedBy: "Health Worker Maria",
    role: "Barangay Health Worker",
    verified: true,
    timestamp: "1 hour ago",
  },
  {
    id: "5",
    lat: 9.321,
    lng: 125.431,
    locationName: "Tubay Coastal Shelter",
    barangay: "Tubay",
    items: "Bottled Water & Blankets",
    capacity: "210 / 250 Families",
    submittedBy: "Unverified Local Post",
    role: "Anonymous Social Media Report",
    verified: false,
    timestamp: "2 hours ago",
  },
];

export default function SupplyLiveMap() {
  const [filter, setFilter] = useState<"all" | "verified" | "unverified">("all");
  const [selectedDrop, setSelectedDrop] = useState<SupplyDrop>(mockDrops[0]);
  const [mapType, setMapType] = useState<"roadmap" | "satellite" | "terrain">("roadmap");
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const googleTileUrls = {
    roadmap: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    satellite: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    terrain: "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
  };

  useEffect(() => {
    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [9.456, 125.542],
          zoom: 11,
          zoomControl: false,
        });

        L.control.zoom({ position: "bottomright" }).addTo(map);

        const tileLayer = L.tileLayer(googleTileUrls[mapType], {
          maxZoom: 20,
          attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>',
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }).addTo(map);

        tileLayerRef.current = tileLayer;
        mapInstanceRef.current = map;
      }

      updateMarkers(L);
    });

    return () => {
      isMounted = false;
    };
  }, [filter, mapType]);

  const updateMarkers = (L: any) => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const filteredDrops = mockDrops.filter((drop) => {
      if (filter === "verified") return drop.verified;
      if (filter === "unverified") return !drop.verified;
      return true;
    });

    filteredDrops.forEach((drop) => {
      const isVerified = drop.verified;

      const markerHtml = `
        <div class="relative flex flex-col items-center cursor-pointer group">
          ${
            isVerified
              ? `<span class="absolute -top-1 h-8 w-8 rounded-full bg-[#2563eb]/40 animate-ping"></span>`
              : ""
          }
          <div class="h-8 w-8 rounded-full flex items-center justify-center border-2 shadow-lg ${
            isVerified
              ? "bg-[#2563eb] text-white border-white"
              : "bg-gray-400 text-white border-gray-200 border-dashed"
          }">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <span class="mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap shadow ${
            isVerified ? "bg-[#0038a8] text-white" : "bg-gray-700 text-gray-200 opacity-80"
          }">
            ${drop.barangay}
          </span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: "custom-gmap-marker",
        iconSize: [36, 48],
        iconAnchor: [18, 48],
      });

      const marker = L.marker([drop.lat, drop.lng], { icon: customIcon }).addTo(
        mapInstanceRef.current
      );

      marker.on("click", () => {
        setSelectedDrop(drop);
        mapInstanceRef.current.panTo([drop.lat, drop.lng]);
      });

      markersRef.current.push(marker);
    });
  };

  const handleMapTypeChange = (type: "roadmap" | "satellite" | "terrain") => {
    setMapType(type);
    if (tileLayerRef.current && mapInstanceRef.current) {
      tileLayerRef.current.setUrl(googleTileUrls[type]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151] rounded-xl shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-[#eff6ff] dark:bg-[#1e3a8a]/40 flex items-center justify-center text-[#2563eb]">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#111827] dark:text-[#f9fafb] flex items-center gap-1.5">
              Live Google Maps Supply Tracker
              <Badge className="bg-[#2563eb] text-white text-[10px] px-1.5 py-0 font-bold">Google Maps</Badge>
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Agusan-Surigao Region • High-Visibility GIS</p>
          </div>
        </div>

        {/* Layer Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
            {(["roadmap", "satellite", "terrain"] as const).map((t) => (
              <Button
                key={t}
                size="sm"
                variant={mapType === t ? "default" : "ghost"}
                onClick={() => handleMapTypeChange(t)}
                className={`h-7 text-xs px-2.5 capitalize font-bold ${
                  mapType === t ? "bg-[#2563eb] text-white" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {t}
              </Button>
            ))}
          </div>

          {/* Verification Filters */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
            <Button
              size="sm"
              variant={filter === "all" ? "default" : "ghost"}
              onClick={() => setFilter("all")}
              className={`h-7 text-xs px-2.5 font-bold ${filter === "all" ? "bg-[#0038a8] text-white" : "text-gray-700 dark:text-gray-300"}`}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filter === "verified" ? "default" : "ghost"}
              onClick={() => setFilter("verified")}
              className={`h-7 text-xs px-2.5 font-bold ${filter === "verified" ? "bg-[#2563eb] text-white" : "text-gray-700 dark:text-gray-300"}`}
            >
              <ShieldCheck className="h-3 w-3 mr-1" /> Verified
            </Button>
            <Button
              size="sm"
              variant={filter === "unverified" ? "default" : "ghost"}
              onClick={() => setFilter("unverified")}
              className={`h-7 text-xs px-2.5 font-bold ${filter === "unverified" ? "bg-gray-500 text-white" : "text-gray-700 dark:text-gray-300"}`}
            >
              Grayed
            </Button>
          </div>
        </div>
      </div>

      {/* Google Maps Container */}
      <div className="relative w-full h-[380px] rounded-xl overflow-hidden border border-[#e5e7eb] dark:border-[#374151] shadow-sm">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        <div className="absolute top-3 left-3 z-20 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-[#374151] shadow-2xs flex items-center gap-2 text-xs font-bold text-[#111827] dark:text-[#f9fafb]">
          <span className="h-2 w-2 rounded-full bg-[#2563eb] animate-pulse" />
          <span>Google Maps Live Data • Caraga Region</span>
        </div>

        {selectedDrop && (
          <a
            href={`https://www.google.com/maps?q=${selectedDrop.lat},${selectedDrop.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 z-20 bg-white dark:bg-[#111827] hover:bg-blue-50 text-[#2563eb] px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-[#374151] shadow-2xs text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Navigation className="h-3.5 w-3.5" />
            Open in Google Maps
            <ExternalLink className="h-3 w-3 ml-0.5" />
          </a>
        )}
      </div>

      {/* Selected Drop Card */}
      {selectedDrop && (
        <Card className={`transition-all border-2 shadow-2xs ${
          selectedDrop.verified 
            ? "bg-white dark:bg-[#1f2937] border-[#2563eb]/40" 
            : "bg-gray-50/70 dark:bg-gray-800/40 border-gray-300 dark:border-gray-700 opacity-90"
        }`}>
          <CardHeader className="pb-3 border-b border-[#e5e7eb] dark:border-[#374151]">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2 font-extrabold text-[#111827] dark:text-[#f9fafb]">
                  <MapPin className={`h-4 w-4 ${selectedDrop.verified ? "text-[#2563eb]" : "text-gray-400"}`} />
                  {selectedDrop.locationName}
                </CardTitle>
                <CardDescription className="text-xs mt-0.5 font-medium">
                  Coordinates: {selectedDrop.lat}° N, {selectedDrop.lng}° E • Reported {selectedDrop.timestamp}
                </CardDescription>
              </div>

              {selectedDrop.verified ? (
                <Badge className="bg-[#2563eb] text-white border-none font-bold">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1" /> VERIFIED ROLE
                </Badge>
              ) : (
                <Badge variant="outline" className="text-gray-600 dark:text-gray-400 border-dashed border-gray-400 bg-gray-100 dark:bg-gray-800 font-bold">
                  <AlertTriangle className="h-3.5 w-3.5 mr-1 text-amber-500" /> GRAYED / UNVERIFIED
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">Supply Inventory</span>
              <p className="text-sm font-bold text-[#111827] dark:text-[#f9fafb] mt-0.5">
                {selectedDrop.items}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-[#eff6ff] dark:bg-[#1e3a8a]/30 p-2.5 rounded-lg border border-blue-200 dark:border-blue-900">
                <span className="text-[10px] text-[#1d4ed8] dark:text-[#93c5fd] uppercase font-bold">Capacity Status</span>
                <p className="text-xs font-bold text-[#ce2029] dark:text-[#f87171] mt-0.5">{selectedDrop.capacity}</p>
              </div>

              <div className="bg-[#f9fafb] dark:bg-[#111827] p-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold">Reporter</span>
                <p className="text-xs font-bold text-[#111827] dark:text-[#f9fafb] mt-0.5 truncate">
                  {selectedDrop.submittedBy}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate font-medium">{selectedDrop.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
