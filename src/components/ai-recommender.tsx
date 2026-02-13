"use client";

console.log("DEBUG: AiRecommender loaded");

import React, { useState, useTransition } from "react";
import { tailorRecommendationsViaUI } from "@/ai/flows/tailor-recommendations-via-ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, Sparkles } from "lucide-react";

export function AiRecommender() {
  if (typeof window === "undefined") {
    console.log("DEBUG: AiRecommender SSR render skipped");
    return null;
  }

  const [isPending, startTransition] = useTransition();
  const [recommendationToolEnabled, setRecommendationToolEnabled] = useState(true);
  const [userPreferences, setUserPreferences] = useState(
    "Un endroit calme avec une belle vue, proche des restaurants."
  );
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    startTransition(async () => {
      console.log("DEBUG: Calling tailorRecommendationsViaUI");

      const response = await tailorRecommendationsViaUI({
        userPreferences,
        recommendationToolEnabled,
        pastBookings:
          "A séjourné dans un appartement 2 chambres à Oran en juillet.",
        travelerProfiles:
          "Famille avec 2 enfants, aime les activités en plein air.",
      });

      console.log("DEBUG: Response from AI:", response);

      if (!response || !response.accommodations) {
        console.error("DEBUG: Invalid AI response:", response);
        setResult("Aucune recommandation disponible.");
        return;
      }

      setResult(
        typeof response.accommodations === "string"
          ? response.accommodations
          : JSON.stringify(response.accommodations, null, 2)
      );
    });
  };

  return (
    <Card className="bg-secondary/50 border-2 border-primary/20 shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="font-headline text-3xl">
          Recommandations par IA
        </CardTitle>
        <CardDescription className="max-w-md mx-auto">
          Laissez notre assistant IA trouver le séjour parfait pour vous.
          Décrivez vos préférences et nous nous occupons du reste.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="preferences" className="font-semibold">
              Vos préférences de voyage
            </Label>
            <Textarea
              id="preferences"
              placeholder="Ex: vue sur mer, piscine, adapté aux enfants..."
              value={userPreferences}
              onChange={(e) => setUserPreferences(e.target.value)}
              className="bg-card"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="ai-switch"
              checked={recommendationToolEnabled}
              onCheckedChange={setRecommendationToolEnabled}
            />
            <Label htmlFor="ai-switch">
              Activer les recommandations personnalisées
            </Label>
          </div>

          <div className="text-center">
            {/* ⭐ Correction : suppression de size="lg" */}
            <Button
              type="submit"
              disabled={isPending}
              className="px-6 py-3 text-base"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                "Obtenir des recommandations"
              )}
            </Button>
          </div>
        </form>
      </CardContent>

      {result && (
        <CardFooter>
          <Card className="w-full bg-card">
            <CardHeader>
              <CardTitle>Nos suggestions pour vous</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{result}</p>
            </CardContent>
          </Card>
        </CardFooter>
      )}
    </Card>
  );
}
