'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SearchForm } from '@/components/search-form';
import { PropertyCard } from '@/components/property-card';
import { AiRecommender } from '@/components/ai-recommender';
import { properties as initialProperties, mockUser } from '@/lib/data';
import type { Property } from '@/lib/data';
import Link from 'next/link';
import { PersonalizedRecommendations } from '@/components/personalized-recommendations';
import { EmailRetargetingCard } from '@/components/email-retargeting-card';
import { useLanguage } from '@/context/language-context';
import { useState, useEffect } from 'react';

export default function Home() {
  const { t } = useLanguage();
  const isGenius = mockUser?.isGenius || false;

  // 1. On initialise avec une liste vide pour éviter le décalage SSR/CSR
  const [properties, setProperties] = useState<Property[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const approvedProperties: Property[] = JSON.parse(
        localStorage.getItem('approvedProperties') || '[]'
      );

      const combined = [...initialProperties, ...approvedProperties];

      // Supprimer les doublons par ID
      const propertyMap = new Map();
      combined.forEach((p) => {
        if (p && p.id) propertyMap.set(p.id, p);
      });

      setProperties(Array.from(propertyMap.values()));
    } catch (error) {
      setProperties(initialProperties);
    }
  }, []);

  // 2. Sécurité : si pas monté → squelette invisible
  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  const featuredProperties = properties.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&q=80&w=2000"
          alt="Sahara Dunes"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-green-900/20" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold drop-shadow-lg">
            {t('home_hero_title') || 'StayFloow'}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 drop-shadow-md">
            {t('home_hero_subtitle') || 'Explorez le monde'}
          </p>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4">
          <Card className="shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <SearchForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recommendations */}
      <section className="container mx-auto px-4 pt-16">
        <PersonalizedRecommendations />
      </section>

      {/* Email Retargeting */}
      <section className="container mx-auto px-4">
        <EmailRetargetingCard />
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold mb-8 text-center">
          {t('featured_stays') || 'Nos séjours en vedette'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.length > 0 ? (
            featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isGenius={isGenius}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              Chargement des propriétés...
            </p>
          )}
        </div>

        <div className="text-center mt-8">
          <Link href="/search">
            {/* CORRECTION : Remplacement de size="lg" et variant="outline" par des classes Tailwind */}
            <Button 
              type="button" 
              className="h-12 px-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              {t('view_all_accommodations') || 'Tout voir'}
            </Button>
          </Link>
        </div>
      </section>

      {/* AI Recommender */}
      <section className="container mx-auto px-4">
        <AiRecommender />
      </section>
    </div>
  );
}
