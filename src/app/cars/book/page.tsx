"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SiPaypal } from "@icons-pack/react-simple-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function BookCarPage() {
  const router = useRouter();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  const handleBooking = () => {
    console.log("Booking confirmed");
  };

  return (
    <div className="container mx-auto px-4 py-8">

      {/* BOUTON RETOUR */}
      <Button onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24 p-4 space-y-4">
            <h2 className="text-xl font-semibold">Réserver votre voiture</h2>

            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full justify-start text-left font-normal">
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "dd MMM yyyy", { locale: fr })} →{" "}
                        {format(date.to, "dd MMM yyyy", { locale: fr })}
                      </>
                    ) : (
                      format(date.from, "dd MMM yyyy", { locale: fr })
                    )
                  ) : (
                    "Choisir une date"
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            <Button className="w-full" onClick={handleBooking}>
              <SiPaypal className="mr-2 h-4 w-4" /> Payer avec PayPal
            </Button>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Détails du véhicule</h3>
            <p className="text-muted-foreground">
              Informations sur la voiture sélectionnée…
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
