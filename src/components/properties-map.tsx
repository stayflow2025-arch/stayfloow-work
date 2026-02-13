"use client";

console.log("DEBUG: PropertiesMap loaded");

import Image from "next/image";
import type { Property } from "@/lib/data";
import { Card } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCurrency } from "@/context/currency-context";

// Coordonnées statiques simulées
const cityCoordinates: Record<string, { top: string; left: string }> = {
  // ... (toutes tes coordonnées inchangées)
  // Je n'ai rien modifié ici, tu peux garder exactement les mêmes valeurs.
  "Adrar": { top: "80%", left: "25%" },
  "Aïn Defla": { top: "38%", left: "42%" },
  "Aïn Témouchent": { top: "45%", left: "18%" },
  "Alger": { top: "35%", left: "45%" },
  "Annaba": { top: "30%", left: "85%" },
  "Batna": { top: "48%", left: "72%" },
  "Béchar": { top: "65%", left: "15%" },
  "Béjaïa": { top: "32%", left: "60%" },
  "Biskra": { top: "60%", left: "68%" },
  "Blida": { top: "37%", left: "44%" },
  "Bordj Bou Arréridj": { top: "40%", left: "58%" },
  "Bouira": { top: "40%", left: "50%" },
  "Boumerdès": { top: "36%", left: "48%" },
  "Chlef": { top: "40%", left: "35%" },
  "Constantine": { top: "38%", left: "75%" },
  "Djelfa": { top: "55%", left: "48%" },
  "El Bayadh": { top: "60%", left: "30%" },
  "El Oued": { top: "75%", left: "78%" },
  "El Tarf": { top: "32%", left: "90%" },
  "Ghardaïa": { top: "65%", left: "50%" },
  "Guelma": { top: "35%", left: "82%" },
  "Illizi": { top: "82%", left: "75%" },
  "Jijel": { top: "33%", left: "70%" },
  "Khenchela": { top: "52%", left: "80%" },
  "Laghouat": { top: "60%", left: "45%" },
  "M'Sila": { top: "45%", left: "55%" },
  "Mascara": { top: "48%", left: "25%" },
  "Médéa": { top: "42%", left: "45%" },
  "Mila": { top: "39%", left: "70%" },
  "Mostaganem": { top: "42%", left: "28%" },
  "Naâma": { top: "55%", left: "20%" },
  "Oran": { top: "40%", left: "20%" },
  "Ouargla": { top: "70%", left: "60%" },
  "Oum El Bouaghi": { top: "45%", left: "80%" },
  "Relizane": { top: "43%", left: "32%" },
  "Saïda": { top: "52%", left: "22%" },
  "Sétif": { top: "42%", left: "65%" },
  "Sidi Bel Abbès": { top: "48%", left: "20%" },
  "Skikda": { top: "31%", left: "80%" },
  "Souk Ahras": { top: "38%", left: "88%" },
  "Tamanrasset": { top: "90%", left: "40%" },
  "Tébessa": { top: "50%", left: "90%" },
  "Tiaret": { top: "48%", left: "38%" },
  "Tindouf": { top: "75%", left: "5%" },
  "Tipaza": { top: "33%", left: "40%" },
  "Tissemsilt": { top: "45%", left: "40%" },
  "Tizi Ouzou": { top: "35%", left: "52%" },
  "Tlemcen": { top: "50%", left: "15%" },

  // Égypte
  "Alexandrie": { top: "30%", left: "40%" },
  "Assouan": { top: "85%", left: "55%" },
  "Assiout": { top: "60%", left: "48%" },
  "Beheira": { top: "32%", left: "45%" },
  "Beni Suef": { top: "45%", left: "47%" },
  "Le Caire": { top: "38%", left: "50%" },
  "Dakahlia": { top: "33%", left: "52%" },
  "Damiette": { top: "28%", left: "55%" },
  "Fayoum": { top: "42%", left: "45%" },
  "Gharbia": { top: "35%", left: "48%" },
  "Gizeh": { top: "40%", left: "49%" },
  "Ismaïlia": { top: "35%", left: "58%" },
  "Kafr El Sheikh": { top: "30%", left: "48%" },
  "Louxor": { top: "75%", left: "58%" },
  "Marsa Matrouh": { top: "35%", left: "25%" },
  "Minya": { top: "50%", left: "46%" },
  "Menoufia": { top: "36%", left: "49%" },
  "Nouvelle Vallée": { top: "70%", left: "35%" },
  "Nord Sinaï": { top: "38%", left: "70%" },
  "Port Saïd": { top: "29%", left: "60%" },
  "Qalyubia": { top: "37%", left: "51%" },
  "Qena": { top: "70%", left: "56%" },
  "Mer Rouge": { top: "65%", left: "70%" },
  "Sharqia": { top: "34%", left: "53%" },
  "Sohag": { top: "65%", left: "52%" },
  "Sud Sinaï": { top: "48%", left: "75%" },
  "Suez": { top: "40%", left: "60%" },
  "Tanta": { top: "35%", left: "48%" },
};

function PropertyPin({ property }: { property: Property }) {
  const { formatPrice } = useCurrency();
  const coords = cityCoordinates[property.location];

  if (!coords) {
    console.warn("DEBUG: No coordinates for", property.location);
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: coords.top, left: coords.left }}
        >
          <div className="relative group cursor-pointer">
            <div className="absolute -bottom-1 -right-1 bg-primary group-hover:bg-primary/80 blur-md h-7 w-7 rounded-full transition-all"></div>
            <div className="relative bg-background text-primary font-bold text-sm px-3 py-1 rounded-full shadow-lg border-2 border-primary/50 flex items-center gap-1 transition-all group-hover:scale-110">
              <span>{formatPrice(property.price)}</span>
            </div>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-bold">{property.name}</p>
        <p>{property.location}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function PropertiesMap({ properties }: { properties?: Property[] }) {
  console.log("DEBUG: Rendering PropertiesMap", properties);

  if (!properties || properties.length === 0) {
    return (
      <Card className="w-full h-full rounded-2xl overflow-hidden relative">
        <Image
          src="https://picsum.photos/seed/world-map-background/1600/1200"
          alt="Carte du monde"
          fill
          className="object-cover grayscale brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white bg-black/50 px-4 py-2 rounded-lg">
            Aucune propriété à afficher sur la carte.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full rounded-2xl overflow-hidden relative">
      <Image
        src="https://picsum.photos/seed/world-map-background/1600/1200"
        alt="Carte du monde"
        fill
        className="object-cover grayscale brightness-50"
      />
      <TooltipProvider>
        <div className="relative w-full h-full">
          {properties.map((property) => (
            <PropertyPin key={property.id} property={property} />
          ))}
        </div>
      </TooltipProvider>
    </Card>
  );
}
