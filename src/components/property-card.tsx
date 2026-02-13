"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Zap, Sparkles, AlertCircle, CalendarDays, MapPin, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

import type { Property } from "@/lib/data";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { useCurrency } from "@/context/currency-context";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { sendFavoriteReminderEmail } from "@/lib/mail";

type PropertyCardProps = {
  property: Property;
  isGenius?: boolean;
  viewMode?: "grid" | "list";
};

const getRatingColor = (rating: number) => {
  if (rating >= 8) return "bg-[hsl(var(--rating-excellent))]";
  if (rating >= 6) return "bg-[hsl(var(--rating-good))]";
  return "bg-[hsl(var(--rating-average))]";
};

export function PropertyCard({ property, isGenius = false, viewMode = "grid" }: PropertyCardProps) {
  const { formatPrice } = useCurrency();
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const discountedPrice = property.price * 0.9;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        const favorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorited(favorites.includes(property.id));
      } catch {}
    }
  }, [property.id, isMounted]);

  const handleFavoriteToggle = async () => {
    const newState = !isFavorited;
    setIsFavorited(newState);

    try {
      const favorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");

      if (newState) {
        localStorage.setItem("favorites", JSON.stringify([...new Set([...favorites, property.id])]));

        toast({
          title: "Ajouté aux favoris !",
          description: `${property.name} a été ajouté à votre liste.`,
        });

        await sendFavoriteReminderEmail({
          customerName: "Cher Voyageur",
          customerEmail: "stayflow2025@gmail.com",
          property,
        });
      } else {
        localStorage.setItem("favorites", JSON.stringify(favorites.filter((id) => id !== property.id)));

        toast({
          title: "Retiré des favoris",
          description: `${property.name} a été retiré de votre liste.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Could not access favorites in localStorage", error);
    }
  };

  /* ------------------------------------------------------------------
      LIST VIEW
  ------------------------------------------------------------------*/
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col md:flex-row">
        <div className="relative w-full md:w-[350px] flex-shrink-0 h-64 group">
          <Image
            src={property.images[0]}
            alt={property.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 350px"
          />

          {isMounted && (
            <Button
              onClick={handleFavoriteToggle}
              className="absolute top-2 right-2 h-9 w-9 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition z-10"
            >
              <Heart className={cn("h-5 w-5", isFavorited && "fill-red-500 text-red-500")} />
            </Button>
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex-grow p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-headline text-2xl font-bold leading-tight">
                  <Link href={`/properties/${property.id}`} className="hover:text-primary transition-colors">
                    {property.name}
                  </Link>
                </h3>

                <div className="flex items-center gap-2 mt-1">
                  <Link
                    href={`/search?location=${property.location}`}
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <MapPin className="h-4 w-4" /> {property.location}
                  </Link>

                  {property.stars && (
                    <div className="flex items-center gap-0.5">
                      {[...Array(property.stars)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-right">
                <div className="text-right">
                  <p className="font-bold text-sm">Excellent</p>
                  <p className="text-xs text-muted-foreground">{property.reviewsCount} avis</p>
                </div>

                <div
                  className={cn(
                    "flex items-center justify-center h-10 w-10 text-white font-bold rounded-md text-lg",
                    getRatingColor(property.rating)
                  )}
                >
                  {property.rating.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <div className="w-full">
                <div className="text-sm text-muted-foreground pt-2 line-clamp-2">{property.description}</div>

                {property.meals?.includes("Petit-déjeuner inclus") && (
                  <p className="text-sm font-semibold text-green-600 mt-2">Petit-déjeuner inclus</p>
                )}

                <div className="pt-2 flex flex-wrap gap-2">
                  {property.amenities.slice(0, 2).map((amenity) => (
                    <Badge key={amenity} className="border text-muted-foreground">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 flex flex-col justify-end items-end border-t md:border-t-0 md:border-l flex-shrink-0 w-full md:w-56">
            <div className="text-right mt-4 w-full">
              {isGenius && (
                <p className="text-2xl font-bold text-destructive flex items-center justify-end gap-2">
                  <Sparkles className="h-5 w-5" />
                  {formatPrice(discountedPrice)}
                </p>
              )}

              <p className={cn("font-bold text-2xl", isGenius && "text-base text-muted-foreground line-through")}>
                {formatPrice(property.price)}
              </p>

              <p className="text-xs text-muted-foreground -mt-1">/ nuit</p>

              <Button asChild className="mt-2 w-full bg-primary text-white hover:bg-primary/90">
                <Link href={`/properties/${property.id}`}>Voir les disponibilités</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  /* ------------------------------------------------------------------
      GRID VIEW
  ------------------------------------------------------------------*/
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative group">
        <div className="relative h-56 w-full">
          <Link href={`/properties/${property.id}`} className="block h-full w-full">
            <Image
              src={property.images[0]}
              alt={property.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        </div>

        <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
          {property.isBoosted && (
            <Badge className="bg-amber-400 text-amber-900 shadow-md border-amber-500">
              <Zap className="w-3 h-3 mr-1" />
              Boosté
            </Badge>
          )}

          {property.isWeekendOffer && (
            <Badge className="bg-violet-500 text-white shadow-md border-violet-600">
              <CalendarDays className="w-3 h-3 mr-1" />
              Offre Weekend
            </Badge>
          )}
        </div>

        {isMounted && (
          <Button
            onClick={handleFavoriteToggle}
            className="absolute top-2 right-2 h-9 w-9 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition z-10"
          >
            <Heart className={cn("h-5 w-5", isFavorited && "fill-red-500 text-red-500")} />
          </Button>
        )}
      </div>

      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-headline text-xl font-bold leading-tight">
            <Link href={`/properties/${property.id}`} className="hover:text-primary transition-colors">
              {property.name}
            </Link>
          </h3>

          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="font-bold text-base">{property.rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{property.location}</p>

        {property.isHighDemand && (
          <div className="flex items-center gap-1 text-xs text-destructive pt-1">
            <AlertCircle className="h-4 w-4" />
            <span>Très demandé !</span>
          </div>
        )}

        <Badge className="mt-2 border text-muted-foreground">{property.type}</Badge>
      </CardContent>

      <CardContent className="p-4 pt-0">
        <div>
          {isGenius && (
            <p className="text-lg font-bold text-destructive flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {formatPrice(discountedPrice)}
            </p>
          )}

          <p className={cn("font-bold text-lg", isGenius && "text-sm text-muted-foreground line-through")}>
            {formatPrice(property.price)} <span className="text-xs font-normal">/ nuit</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
