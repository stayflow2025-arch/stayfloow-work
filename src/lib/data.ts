import type { ElementType } from 'react';

export type Amenity =
  | 'Wifi' | 'Piscine' | 'Cuisine' | 'Climatisation' | 'Parking'
  | 'Télévision' | 'Chauffage' | 'Lave-linge' | 'Espace de travail'
  | 'Sèche-cheveux' | 'Fer à repasser' | 'Balcon' | 'Vue sur la mer'
  | 'Jardin' | 'Jacuzzi' | 'Animaux autorisés';

export type CarFeature = 'Climatisation' | 'GPS' | 'Boîte automatique' | 'Siège bébé';
export type FuelType = 'Essence' | 'Diesel' | 'Électrique';

export type FacilityAmenity =
  | 'Restaurant' | 'Salle de sport' | 'Spa et centre de bien-être'
  | 'Bar' | 'Service d\'étage' | 'Réception ouverte 24h/24';

export type MealOption =
  | 'Petit-déjeuner inclus' | 'Demi-pension'
  | 'Pension complète' | 'Cuisine privée';

export type PlaceOfInterest =
  | 'Plage' | 'Centre-ville' | 'Musée' | 'Aéroport'
  | 'Montagne' | 'Parc national' | 'Site historique'
  | 'Magasin' | 'Centre commercial';

export const amenities: Amenity[] = [
  'Wifi','Piscine','Cuisine','Climatisation','Parking','Télévision','Chauffage',
  'Lave-linge','Espace de travail','Sèche-cheveux','Fer à repasser','Balcon',
  'Vue sur la mer','Jardin','Jacuzzi','Animaux autorisés'
];

export const carFeatures: CarFeature[] = [
  'Climatisation','GPS','Boîte automatique','Siège bébé'
];

export const propertyTypes = [
  'Appartement','Maison','Villa','Studio','Hôtel','Riad'
];

/* ============================================================
   ⭐ AJOUT MANQUANT : POPULAR FILTERS
   ============================================================ */

export const popularFilters = [
  "Annulation gratuite",
  "Petit-déjeuner inclus",
  "Parking gratuit",
  "Climatisation",
  "Wi-Fi gratuit"
];

export const houseAndVillaRoomTypes = [
  '1 Chambre','2 Chambres','3 Chambres','4 Chambres et plus',
  'Cuisine','Salon','Salle à manger','1 Salle de bain','2 Salles de bain ou plus'
];

export const carTypes = ['Citadine','Berline','SUV','Utilitaire','Luxe','Sport'];

export const fuelTypes: FuelType[] = ['Essence','Diesel','Électrique'];

export const facilityAmenities: FacilityAmenity[] = [
  'Restaurant','Salle de sport','Spa et centre de bien-être',
  'Bar','Service d\'étage','Réception ouverte 24h/24'
];

export const mealOptions: MealOption[] = [
  'Petit-déjeuner inclus','Demi-pension','Pension complète','Cuisine privée'
];

export const topRatedFeatures = [
  'Propreté','Confort','Emplacement','Personnel'
];

export const placesOfInterest: PlaceOfInterest[] = [
  'Plage','Centre-ville','Musée','Aéroport','Montagne',
  'Parc national','Site historique','Magasin','Centre commercial'
];

export const algerianCities = [
  "Adrar","Aïn Defla","Aïn Témouchent","Alger","Annaba","Batna","Béchar","Béjaïa",
  "Biskra","Blida","Bordj Bou Arréridj","Bouira","Boumerdès","Chlef","Constantine",
  "Djelfa","El Bayadh","El Oued","El Tarf","Ghardaïa","Guelma","Illizi","Jijel",
  "Khenchela","Laghouat","M'Sila","Mascara","Médéa","Mila","Mostaganem","Naâma",
  "Oran","Ouargla","Oum El Bouaghi","Relizane","Saïda","Sétif","Sidi Bel Abbès",
  "Skikda","Souk Ahras","Tamanrasset","Tébessa","Tiaret","Tindouf","Tipaza",
  "Tissemsilt","Tizi Ouzou","Tlemcen"
];

export const egyptianCities = [
  "Alexandrie","Assouan","Assiout","Beheira","Beni Suef","Le Caire","Dakahlia",
  "Damiette","Fayoum","Gharbia","Gizeh","Ismaïlia","Kafr El Sheikh","Louxor",
  "Marsa Matrouh","Minya","Menoufia","Nouvelle Vallée","Nord Sinaï","Port Saïd",
  "Qalyubia","Qena","Mer Rouge","Sharqia","Sharm El Sheikh","Sohag","Sud Sinaï",
  "Suez","Tanta"
];

export const allCities = [...algerianCities, ...egyptianCities].sort();

export const cityCoordinates: Record<string,{lat:number;lon:number}> = {
  // inchangé
};

/* ============================================================
   CIRCUIT FILTERS
   ============================================================ */

export const circuitThemes = [
  "Aventure",
  "Culture",
  "Nature",
  "Détente",
  "Gastronomie",
  "Patrimoine",
  "Découverte",
  "Sport & Randonnée"
];

export const circuitDurations = [
  "1-2 jours",
  "3-5 jours",
  "6-10 jours",
  "10+ jours"
];

/* ============================================================
   PROPERTIES
   ============================================================ */

export type NearbyAttraction = {
  name: string;
  type: PlaceOfInterest;
  distance: number;
};

export type Property = {
  id: string;
  slug: string;
  name: string;
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
  rating: number;
  stars?: number;
  reviewsCount: number;
  type: (typeof propertyTypes)[number];
  amenities: Amenity[];
  meals?: MealOption[];
  images: string[];
  description: string;
  host: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
  tags?: string[];
  isBoosted?: boolean;
  isHighDemand?: boolean;
  isWeekendOffer?: boolean;
  nearbyAttractions?: NearbyAttraction[];
  checkIn?: string;
  checkOut?: string;

  /* ⭐️ AJOUT POUR L’IA DE PRIX */
  demandScore?: number;
};

export const properties: Property[] = [
  // inchangé
];

/* ============================================================
   CARS
   ============================================================ */

export type Car = {
  id: string;
  brand: string;
  model: string;
  pricePerDay: number;
  features: CarFeature[];
  image: string;
};

export const cars: Car[] = [
  // inchangé
];

/* ============================================================
   USER & PAYMENT
   ============================================================ */

export const mockUser = {
  id: "1",
  name: "Utilisateur Test",
  email: "test@example.com",
  role: "user",
  isGenius: false
};

export const paymentSettings = {
  currency: "DZD",
  taxRate: 0.19,
  serviceFee: 0.05
};

/* ============================================================
   PENDING ENTITIES & CIRCUITS
   ============================================================ */

export type PendingCar = {
  id: string;
  brand: string;
  model: string;
  pricePerDay: number;
  features: CarFeature[];
  image: string;
};

export type PendingCircuit = {
  id: string;
  name: string;
  description: string;
  price: number;
  days: number;
  images: string[];
};

export type Circuit = {
  id: string;
  name: string;
  description: string;
  price: number;
  days: number;
  images: string[];
};

export const circuits: Circuit[] = [];
export const pendingCircuits: PendingCircuit[] = [];
export const pendingCars: PendingCar[] = [];