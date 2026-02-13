"use client";

console.log("DEBUG: PerformanceAnalyzer loaded");

import React, { useState, useTransition } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Lightbulb, TrendingUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";

/* ------------------------------------------------------------------
   TYPE LOCAL — remplace "@/ai/types"
-------------------------------------------------------------------*/
export type SitePerformanceOutput = {
  performanceSummary: string;
  keyObservations: string[];
  actionableRecommendations: {
    recommendation: string;
    priority: "Haute" | "Moyenne" | "Basse";
  }[];
};

/* ------------------------------------------------------------------
   MOCK IA FALLBACK
-------------------------------------------------------------------*/
async function analyzeSitePerformance(): Promise<SitePerformanceOutput> {
  console.log("DEBUG: Using fallback analyzeSitePerformance()");

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        performanceSummary:
          "Votre site fonctionne correctement, mais plusieurs optimisations peuvent améliorer la conversion.",
        keyObservations: [
          "Temps de chargement légèrement élevé sur mobile.",
          "Certaines recherches populaires ne mènent pas à des réservations.",
          "Les utilisateurs souhaitent plus de filtres avancés.",
        ],
        actionableRecommendations: [
          {
            recommendation:
              "Optimiser les images pour réduire le temps de chargement sur mobile.",
            priority: "Haute",
          },
          {
            recommendation:
              "Ajouter un filtre 'Animaux autorisés' dans la recherche.",
            priority: "Moyenne",
          },
          {
            recommendation:
              "Augmenter l’offre de villas à Constantine pour répondre à la demande.",
            priority: "Haute",
          },
        ],
      });
    }, 1200)
  );
}

/* ------------------------------------------------------------------
   COMPOSANT PRINCIPAL
-------------------------------------------------------------------*/

export function PerformanceAnalyzer() {
  console.log("DEBUG: Rendering PerformanceAnalyzer");

  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SitePerformanceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = () => {
    console.log("DEBUG: Starting performance analysis…");

    setError(null);
    setResult(null);

    startTransition(async () => {
      try {
        const response = await analyzeSitePerformance();

        if (!response) {
          console.error("DEBUG: analyzeSitePerformance returned null");
          setError("Impossible d'obtenir les résultats de l'analyse.");
          return;
        }

        console.log("DEBUG: Performance analysis result:", response);
        setResult(response);
      } catch (e) {
        console.error("DEBUG: Error during analysis:", e);
        setError("Une erreur est survenue lors de l'analyse.");
      }
    });
  };

  /* ------------------------------------------------------------------
     NOUVELLE VERSION : retourne des classes Tailwind
  -------------------------------------------------------------------*/
  const getPriorityBadgeClass = (priority: "Haute" | "Moyenne" | "Basse") => {
    switch (priority) {
      case "Haute":
        return "bg-red-600 text-white";
      case "Moyenne":
        return "bg-yellow-400 text-black";
      case "Basse":
        return "bg-green-600 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <Card className="bg-secondary/30">
      <CardHeader>
        <CardTitle className="font-headline text-3xl flex items-center gap-2">
          <Lightbulb className="h-8 w-8 text-primary" />
          Analyse de Performance IA
        </CardTitle>
        <CardDescription className="mt-2">
          Obtenez une analyse intelligente des performances de votre site et des
          recommandations pour améliorer la conversion.
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
              <TrendingUp className="h-4 w-4" />
              <AlertTitle>Résumé de la Performance</AlertTitle>
              <AlertDescription>
                {result.performanceSummary}
              </AlertDescription>
            </Alert>

            <div>
              <h4 className="font-semibold mb-2 text-lg">Observations Clés</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {result.keyObservations.map((obs, i) => (
                  <li key={i}>{obs}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-lg">
                Recommandations Actionnables
              </h4>
              <div className="space-y-3">
                {result.actionableRecommendations.map((rec, i) => (
                  <Card key={i} className="bg-background/70">
                    <CardContent className="p-4 flex items-start justify-between gap-4">
                      <p className="text-sm">{rec.recommendation}</p>

                      {/* ✔️ Badge corrigé */}
                      <Badge className={getPriorityBadgeClass(rec.priority)}>
                        {rec.priority}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-8">
            Cliquez sur le bouton pour lancer une nouvelle analyse.
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-6">
        <Button onClick={handleAnalysis} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            "Lancer une nouvelle analyse"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
