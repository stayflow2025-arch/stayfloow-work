"use client";

import React, { useState, useTransition } from "react";
import type { Property } from "@/lib/data";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";

import {
  getPriceRecommendation,
  type PriceRecommendationOutput,
} from "@/ai/flows/price-recommendation-flow";

/* ------------------------------------------------------------------
   COMPOSANT PRINCIPAL
-------------------------------------------------------------------*/

export function PriceRecommender({ property }: { property: Property }) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<PriceRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRecommendation = () => {
    setError(null);
    setResult(null);

    startTransition(async () => {
      try {
        const response = await getPriceRecommendation(property);

        if (!response) {
          setError("Impossible d'obtenir une recommandation de prix.");
          return;
        }

        setResult(response);
      } catch (e) {
        console.error("DEBUG: Error during price recommendation:", e);
        setError("Une erreur est survenue lors de l'analyse.");
      }
    });
  };

  return (
    <Card className="bg-secondary/30">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Recommandation de Prix IA
        </CardTitle>
        <CardDescription>
          Analyse intelligente du marché pour optimiser votre tarif.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert className="mb-4 bg-red-600 text-white">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result ? (
          <div className="space-y-6">
            <Alert>
              <AlertTitle>Prix Recommandé</AlertTitle>
              <AlertDescription className="text-lg font-semibold">
                {result.recommendedPrice} DZD
              </AlertDescription>
            </Alert>

            <div>
              <h4 className="font-semibold mb-2 text-lg">Confiance</h4>

              {/* ✔️ Badge corrigé */}
              <Badge className="bg-secondary text-secondary-foreground">
                {result.confidence}%
              </Badge>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-lg">Raisons</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {result.reasoning.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-lg">Facteurs du Marché</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {result.marketFactors.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-8">
            Cliquez sur le bouton pour obtenir une recommandation de prix.
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-6">
        <Button onClick={handleRecommendation} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            "Obtenir une recommandation"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
