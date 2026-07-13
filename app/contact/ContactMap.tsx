"use client";

import { MapPin } from "lucide-react";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/mapcn-map";

const NASHIK = {
  longitude: 73.7898,
  latitude: 19.9975,
};

export function ContactMap() {
  return (
    <Map
      center={[NASHIK.longitude, NASHIK.latitude]}
      zoom={13}
      minZoom={4}
      maxZoom={18}
      pitch={12}
      theme="dark"
      cooperativeGestures
      className="contact-map-canvas"
    >
      <MapMarker
        longitude={NASHIK.longitude}
        latitude={NASHIK.latitude}
        anchor="bottom"
      >
        <MarkerContent className="contact-map-marker">
          <span className="contact-map-marker-pulse" aria-hidden="true" />
          <span className="contact-map-marker-icon">
            <MapPin size={18} strokeWidth={2} aria-hidden="true" />
          </span>
        </MarkerContent>
        <MarkerTooltip className="contact-map-tooltip">
          SNAB Innovations · Nashik
        </MarkerTooltip>
      </MapMarker>

      <MapControls
        position="top-right"
        showCompass
        showFullscreen
        showLocate
      />
    </Map>
  );
}
