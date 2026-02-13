"use client";

console.log("DEBUG: CrossSellCard loaded");

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  Compass,
  BedDouble,
  Calendar as CalendarIcon,
  Users,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type BookedItemType = "property" | "car" | "circuit";

export function CrossSellCard({
  location,
  bookedItemType,
}: {
  location: string;
  bookedItemType?: BookedItemType;
}) {
  console.log("DEBUG: Rendering CrossSellCard", { location, bookedItemType });

  const [circuitDates, setCircuitDates] = useState<DateRange | undefined>();
  const [participants, setParticipants] = useState(2);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  useEffect(() => {
    if (circuitDates?.from && circuitDates.to) {
      setIsDatePopoverOpen(false);
    }
  }, [circuitDates]);

  const suggestions = [
    {
      type: "property" as const,
      title: `Trouver un hébergement`,
      description: `Découvrez les meilleurs hôtels, appartements et villas à ${location} pour vous reposer.`,
      href: `/search?location=${location}`,
      image: "https://picsum.photos/seed/cross-sell-property/800/600",
      imageHint: "hotel room interior",
      icon: BedDouble,
    },
    {
      type: "car" as const,
      title: "Louer une voiture",
      description: `Déplacez-vous en toute liberté et découvrez ${location} et ses alentours à votre propre rythme.`,
      href: "/cars",
      image: "https://picsum.photos/seed/cross-sell-car/800/600",
      imageHint: "car driving scenic road",
      icon: Car,
    },
    {
      type: "circuit" as const,
      title: "Réserver un circuit ou une activité",
      description:
        "Laissez-vous guider par des experts locaux pour une expérience immersive et inoubliable.",
      href: "/circuits",
      image: "https://picsum.photos/seed/cross-sell-tour/800/600",
      imageHint: "group hiking landscape",
      icon: Compass,
    },
  ];

  const filteredSuggestions = suggestions.filter(
    (s) => s.type !== bookedItemType
  );

  const getCircuitLink = () => {
    const params = new URLSearchParams();
    if (circuitDates?.from) params.set("from", circuitDates.from.toISOString());
    if (circuitDates?.to) params.set("to", circuitDates.to.toISOString());
    if (participants > 0) params.set("participants", String(participants));
    return `/circuits?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="font-headline text-3xl font-bold">
        Complétez Votre Séjour à {location}
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Maintenant que votre réservation est confirmée, pourquoi ne pas explorer
        les environs ?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSuggestions.map((suggestion) => {
          const Icon = suggestion.icon;

          return (
            <Card
              key={suggestion.type}
              className="overflow-hidden group text-left"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={suggestion.image}
                  alt={suggestion.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={suggestion.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="h-7 w-7 text-primary" />
                  <h3 className="font-headline text-2xl font-bold">
                    {suggestion.title}
                  </h3>
                </div>

                <p className="text-muted-foreground mb-4">
                  {suggestion.description}
                </p>

                {suggestion.type === "circuit" ? (
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    {/* Dates */}
                    <div className="flex-grow">
                      <Label>Dates</Label>
                      <Popover
                        open={isDatePopoverOpen}
                        onOpenChange={setIsDatePopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            className={cn(
                              "w-full justify-start text-left font-normal mt-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                              !circuitDates && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {circuitDates?.from ? (
                              circuitDates.to ? (
                                <>
                                  {format(circuitDates.from, "dd LLL y", {
                                    locale: fr,
                                  })}{" "}
                                  -{" "}
                                  {format(circuitDates.to, "dd LLL y", {
                                    locale: fr,
                                  })}
                                </>
                              ) : (
                                format(circuitDates.from, "dd LLL y", {
                                  locale: fr,
                                })
                              )
                            ) : (
                              <span>Choisissez vos dates</span>
                            )}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            selected={circuitDates}
                            onSelect={setCircuitDates}
                            initialFocus
                            locale={fr}
                            disabled={{ before: new Date() }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Participants */}
                    <div>
                      <Label>Personnes</Label>
                      <div className="relative mt-1">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={participants}
                          onChange={(e) =>
                            setParticipants(Math.max(1, Number(e.target.value)))
                          }
                          min={1}
                          className="pl-10 w-28"
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    <Button asChild>
                      <Link href={getCircuitLink()}>
                        Voir <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Button asChild>
                    <Link href={suggestion.href}>
                      Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
