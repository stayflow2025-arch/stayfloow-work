"use client";

console.log("DEBUG: CircuitCard loaded");

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { MapPin, Star } from "lucide-react";

type Circuit = {
  id: string;
  title: string;
  country: string;
  image: string;
  duration: string;
  price: number;
  rating?: number;
};

export function CircuitCard({
  circuit,
  viewMode = "grid",
}: {
  circuit: Circuit;
  viewMode?: "grid" | "list";
}) {
  console.log("DEBUG: Rendering CircuitCard:", circuit);

  if (!circuit) {
    console.error("DEBUG: CircuitCard received undefined circuit");
    return null;
  }

  return (
    <Card
      className={cn(
        "overflow-hidden border border-primary/20 shadow-sm transition hover:shadow-lg",
        viewMode === "list" && "flex"
      )}
    >
      <div
        className={cn(
          viewMode === "list" ? "w-48 h-40 relative" : "w-full h-40 relative"
        )}
      >
        <Image
          src={circuit.image}
          alt={circuit.title}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-4 space-y-2 flex-1">
        <CardTitle className="text-lg font-bold">{circuit.title}</CardTitle>

        <p className="text-sm opacity-80 flex items-center gap-1">
          <MapPin className="h-4 w-4 text-primary" />
          {circuit.country}
        </p>

        <p className="text-sm opacity-80">{circuit.duration}</p>

        {typeof circuit.rating === "number" && (
          <div className="flex items-center gap-1 text-primary mt-1">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="font-semibold">{circuit.rating}</span>
          </div>
        )}

        <p className="font-bold text-lg mt-2">
          {circuit.price.toLocaleString("fr-DZ")} DZD
        </p>
      </CardContent>
    </Card>
  );
}
