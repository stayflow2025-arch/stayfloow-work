"use client";

console.log("DEBUG: CarFilterSidebar loaded");

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { carFeatures, carTypes, fuelTypes } from "@/lib/data";
import { useCurrency } from "@/context/currency-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function CarFilterSidebar({ resultCount }: { resultCount: number }) {
  console.log("DEBUG: Rendering CarFilterSidebar");

  const { formatPrice, convertFromDZD, currency } = useCurrency();

  const maxPriceDZD = 20000;
  const maxPriceConverted =
    Math.ceil(convertFromDZD(maxPriceDZD)) || maxPriceDZD;

  const [priceRange, setPriceRange] = useState([
    convertFromDZD(2000) || 2000,
    convertFromDZD(15000) || 15000,
  ]);

  return (
    <Card className="sticky top-24">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-xl">Filtres</CardTitle>
      </CardHeader>

      <CardContent className="p-0 max-h-[calc(100vh-12rem)] overflow-y-auto">
        {/* ✔️ Accordion corrigé : plus de type / defaultValue */}
        <Accordion className="w-full">
          
          {/* Budget */}
          <AccordionItem value="budget">
            <AccordionTrigger className="p-4 font-semibold">
              Budget (par jour)
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-4">
              <Slider
                value={priceRange}
                max={maxPriceConverted}
                step={currency === "DZD" ? 500 : 5}
                onValueChange={setPriceRange}
                className="mt-4"
              />

              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{formatPrice(priceRange[0], true)}</span>
                <span>{formatPrice(priceRange[1], true)}</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Type de véhicule */}
          <AccordionItem value="type">
            <AccordionTrigger className="p-4 font-semibold">
              Type de véhicule
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
              {carTypes.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={`type-${item}`} />
                  <Label htmlFor={`type-${item}`} className="font-normal">
                    {item}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Transmission */}
          <AccordionItem value="transmission">
            <AccordionTrigger className="p-4 font-semibold">
              Boîte de vitesses
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
              {["Manuelle", "Automatique"].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={`trans-${item}`} />
                  <Label htmlFor={`trans-${item}`} className="font-normal">
                    {item}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Carburant */}
          <AccordionItem value="fuel">
            <AccordionTrigger className="p-4 font-semibold">
              Type de carburant
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
              {fuelTypes.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={`fuel-${item}`} />
                  <Label htmlFor={`fuel-${item}`} className="font-normal">
                    {item}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Équipements */}
          <AccordionItem value="features">
            <AccordionTrigger className="p-4 font-semibold">
              Équipements
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
              {carFeatures.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={`feat-${item}`} />
                  <Label htmlFor={`feat-${item}`} className="font-normal">
                    {item}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Bouton final */}
        <div className="p-4 border-t">
          <Button className="w-full">
            Afficher les {resultCount || 0} résultats
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
