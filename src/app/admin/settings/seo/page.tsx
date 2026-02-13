"use client";

import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  Search, 
  Wand2, 
  Lightbulb, 
  FileText, 
  Key, 
  Dot,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { 
  Alert, 
  AlertDescription, 
  AlertTitle 
} from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function SeoOptimizerPage() {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [pageType, setPageType] = useState('homepage');
  const [countryFocus, setCountryFocus] = useState('Both');
  const [entityName, setEntityName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      setTimeout(() => {
        setResult({
          title: "Séjour de Luxe | " + entityName,
          description: "Découvrez nos hébergements d'exception. Réservez votre séjour dès maintenant.",
          keywords: ["location", "vacances", "luxe", entityName]
        });
        setIsPending(false);
      }, 1500);
    } catch (err) {
      setError("Une erreur est survenue lors de la génération.");
      setIsPending(false);
    }
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Optimiseur SEO</h1>
        <p className="text-muted-foreground">
          Générez des méta-données optimisées pour vos pages grâce à l'IA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulaire */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Configuration
            </CardTitle>
            <CardDescription>
              Remplissez les informations pour obtenir des suggestions.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="entity">Nom de l'établissement / Page</Label>
                <Input 
                  id="entity" 
                  placeholder="ex: Villa Belle Vue" 
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Type de page</Label>
                <Select value={pageType} onValueChange={setPageType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homepage">Page d'accueil</SelectItem>
                    <SelectItem value="property">Fiche propriété</SelectItem>
                    <SelectItem value="blog">Article de blog</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Cible géographique</Label>
                <Select value={countryFocus} onValueChange={setCountryFocus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="EN">International (Anglais)</SelectItem>
                    <SelectItem value="Both">Multilingue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Générer les suggestions
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Résultats */}
        <div className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result ? (
            <Card className="border-green-200 bg-green-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Suggestions SEO
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="p-3 bg-white border rounded-md shadow-sm">
                  <p className="text-xs font-bold text-blue-600 truncate mb-1">
                    Aperçu Google
                  </p>
                  <h3 className="text-blue-800 text-lg hover:underline cursor-pointer font-medium mb-1">
                    {result.title}
                  </h3>
                  <p className="text-sm text-green-700 mb-1">
                    https://stayflow.com/votre-page
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {result.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <Key className="h-3 w-3" /> Mots-clés suggérés
                  </Label>

                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((kw: string, i: number) => (
                      <Badge key={i}>{kw}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
              <Lightbulb className="h-12 w-12 mb-4 opacity-20" />
              <p>Lancez l'analyse pour voir les recommandations s'afficher ici.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
