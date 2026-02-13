"use client";

console.log("DEBUG: CircuitFilterSidebar loaded");

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { circuitThemes } from "@/lib/data";
import { useCurrency } from "@/context/currency-context";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function CircuitFilterSidebar({ resultCount }: { resultCount: number }) {
  console.log("DEBUG: Rendering CircuitFilterSidebar");

  const { formatPrice, convertFromDZD, currency } = useCurrency();

  const maxPriceDZD = 300000;
  const maxPriceConverted =
    Math.ceil(convertFromDZD(maxPriceDZD)) || maxPriceDZD;

  const [priceRange, setPriceRange] = useState([
    convertFromDZD(20000) || 20000,
    convertFromDZD(150000) || 150000,
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
              Budget (par personne)
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-4">
              <Slider
                value={priceRange}
                max={maxPriceConverted}
                step={currency === "DZD" ? 1000 : 10}
                onValueChange={setPriceRange}
                className="mt-4"
              />

              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{formatPrice(priceRange[0], true)}</span>
                <span>{formatPrice(priceRange[1], true)}</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Thèmes */}
          <AccordionItem value="themes">
            <AccordionTrigger className="p-4 font-semibold">
              Thèmes du circuit
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
              {circuitThemes.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={`theme-${item}`} />
                  <Label htmlFor={`theme-${item}`} className="font-normal">
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
