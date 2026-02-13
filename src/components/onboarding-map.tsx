"use client";

console.log("DEBUG: OnboardingMap loaded");

import { Card } from "./ui/card";
import { cityCoordinates } from "@/lib/data";
import { useEffect, useState } from "react";

export function OnboardingMap({ location }: { location?: string }) {
  console.log("DEBUG: Rendering OnboardingMap with location:", location);

  // Protection SSR : éviter un rendu différent entre serveur et client
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const defaultCoords = { lat: 36.775, lon: 3.058 }; // Algiers
  let mapCoords = defaultCoords;
  let zoom = 6;

  if (location && cityCoordinates[location]) {
    mapCoords = cityCoordinates[location];
    zoom = 12;
  }

  const { lat, lon } = mapCoords;
  const bbox = `${lon - 0.05},${lat - 0.05},${lon + 0.05},${lat + 0.05}`;

  const mapSrc = location
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`
    : `https://www.openstreetmap.org/export/embed.html?bbox=0.5,33,8.5,37.5&layer=mapnik`;

  // Empêche le SSR de rendre l'iframe (évite mismatch)
  if (!isClient) {
    return (
      <Card className="w-full aspect-video rounded-lg overflow-hidden relative mt-4 bg-muted" />
    );
  }

  return (
    <Card className="w-full aspect-video rounded-lg overflow-hidden relative mt-4">
      {location ? (
        <iframe
          key={location} // Force re-render on location change
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapSrc}
        ></iframe>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <p className="text-muted-foreground text-center p-4">
            Sélectionnez une ville pour voir son emplacement sur la carte.
          </p>
        </div>
      )}
    </Card>
  );
}
