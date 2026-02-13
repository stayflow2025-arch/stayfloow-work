"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { properties, cars } from "@/lib/data";
import { bookings } from "@/lib/bookings-data";
import { useCurrency } from "@/context/currency-context";
import {
  CircleDollarSign,
  Eye,
  Percent,
  Calendar,
  MessageSquare,
  Building,
  Car as CarIcon,
  Compass,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

const partnerId = "mock-partner-1";

// Listings du partenaire
const partnerListings = [
  ...properties.slice(1, 3).map((p) => ({ ...p, itemType: "Hébergement" })),
  ...cars.slice(0, 1).map((c) => ({
    ...c,
    itemType: "Véhicule",
    name: `${c.brand} ${c.model}`
  }))
];

const partnerBookings = bookings.slice(0, 2);

const totalEarnings = partnerBookings.reduce(
  (acc, booking) => acc + booking.totalAmount * 0.8,
  0
);

const totalViews = 12500;
const totalBookingsCount = partnerBookings.length;
const conversionRate = ((totalBookingsCount / totalViews) * 100).toFixed(2);

export default function PartnerDashboardPage() {
  const { formatPrice } = useCurrency();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-4xl font-headline font-bold">Tableau de Bord Partenaire</h1>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gains Totaux (Net)</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalEarnings)}</div>
            <p className="text-xs text-muted-foreground">Après déduction des frais de service</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vues des Annonces (30j)</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15.2% par rapport au mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations (30j)</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalBookingsCount}</div>
            <p className="text-xs text-muted-foreground">Nombre total de réservations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Vues / Réservations</p>
          </CardContent>
        </Card>
      </div>

      {/* Annonces + Réservations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Annonces */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Vos Annonces</span>
              <Button className="text-sm px-3 py-1 border rounded-md">
                Gérer les disponibilités
              </Button>
            </CardTitle>
            <CardDescription>Aperçu de vos biens et services listés sur StayFloow.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Annonce</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Évaluation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnerListings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium">{listing.name}</TableCell>
                    <TableCell>
                      <Badge className="flex items-center gap-1 w-fit border px-2 py-1">
                        {listing.itemType === "Hébergement" && <Building className="h-3 w-3" />}
                        {listing.itemType === "Véhicule" && <CarIcon className="h-3 w-3" />}
                        {listing.itemType === "Circuit" && <Compass className="h-3 w-3" />}
                        {listing.itemType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex items-center justify-end gap-1">
                      {(listing as any).rating && (
                        <>
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <span>{(listing as any).rating}</span>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Réservations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Réservations Récentes</span>
              <Button className="text-sm px-3 py-1 border rounded-md">
                Voir tout
              </Button>
            </CardTitle>
            <CardDescription>Vos dernières réservations et les conversations associées.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partnerBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-semibold">{booking.itemName}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.customer.name} - {booking.dates}
                    </p>
                  </div>
                  <Button className="p-2 rounded-md">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
