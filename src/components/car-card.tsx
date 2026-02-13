"use client";

console.log("DEBUG: CarCard loaded");

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type Car = {
  id: string;
  name: string;
  brand: string;
  image: string;
  pricePerDay: number;
  rating?: number;
  transmission?: string;
  fuel?: string;
  seats?: number;
};

export function CarCard({
  car,
  viewMode = "grid",
}: {
  car: Car;
  viewMode?: "grid" | "list";
}) {
  console.log("DEBUG: Rendering CarCard:", car);

  if (!car) {
    console.error("DEBUG: CarCard received undefined car");
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
          src={car.image}
          alt={car.name}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-4 space-y-2 flex-1">
        <CardTitle className="text-lg font-bold">{car.name}</CardTitle>
        <p className="text-sm opacity-80">{car.brand}</p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          {car.transmission && <span>{car.transmission}</span>}
          {car.fuel && <span>• {car.fuel}</span>}
          {typeof car.seats === "number" && <span>• {car.seats} places</span>}
        </div>

        {typeof car.rating === "number" && (
          <div className="flex items-center gap-1 text-primary mt-1">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="font-semibold">{car.rating}</span>
          </div>
        )}

        <p className="font-bold text-lg mt-2">
          {car.pricePerDay.toLocaleString("fr-DZ")} DZD / jour
        </p>
      </CardContent>
    </Card>
  );
}
