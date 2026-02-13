console.log("DEBUG: price-recommendation-flow loaded");

export type PriceRecommendationOutput = {
  recommendedPrice: number;
  confidence: number;
  reasoning: string[];
  marketFactors: string[];
};

export async function getPriceRecommendation(property: {
  name: string;
  location: string;
  price: number;
  rooms?: number;
  rating?: number;
  demandScore?: number;
}) {
  console.log("DEBUG: Using fallback getPriceRecommendation()");

  return new Promise<PriceRecommendationOutput>((resolve) => {
    setTimeout(() => {
      const demandScore = property.demandScore ?? 60;

      const adjustment =
        demandScore > 70
          ? 1.15
          : demandScore > 50
          ? 1.05
          : 0.95;

      const recommendedPrice = Math.round(property.price * adjustment);

      resolve({
        recommendedPrice,
        confidence:
          demandScore > 70
            ? 92
            : demandScore > 50
            ? 78
            : 65,
        reasoning: [
          `Analyse basée sur la demande actuelle pour ${property.location}.`,
          `Le bien "${property.name}" présente un score de demande de ${demandScore}/100.`,
          `Le prix actuel (${property.price} DZD) a été ajusté selon les tendances du marché.`,
        ],
        marketFactors: [
          "Tendance générale du marché dans la région",
          "Disponibilité des biens similaires",
          "Historique des réservations",
          "Attractivité du quartier",
        ],
      });
    }, 1200);
  });
}
