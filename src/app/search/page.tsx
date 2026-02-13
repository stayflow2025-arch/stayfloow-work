'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { properties as initialProperties } from '@/lib/data';
import type { Property } from '@/lib/data';
import { PropertyCard } from '@/components/property-card';
import { PropertiesMap } from '@/components/properties-map';
import { FilterSidebar } from '@/components/filter-sidebar';

function SearchResults() {
    const searchParams = useSearchParams();
    const location = searchParams.get('location') || '';
    const [allProperties, setAllProperties] = useState<Property[]>(initialProperties);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

    useEffect(() => {
        try {
            const approvedProperties: Property[] = JSON.parse(localStorage.getItem('approvedProperties') || '[]');
            const combined = [...initialProperties, ...approvedProperties];
            
            const propertyMap = new Map();
            combined.forEach(p => propertyMap.set(p.id, p));
            const uniqueProperties = Array.from(propertyMap.values());
            
            setAllProperties(uniqueProperties);
        } catch (error) {
            console.error("Could not parse approved properties from localStorage", error);
            setAllProperties(initialProperties);
        }
    }, []);

    useEffect(() => {
        const results = allProperties
            .sort((a, b) => (b.isBoosted ? 1 : 0) - (a.isBoosted ? 1 : 0))
            .filter(p => 
                location ? p.location.toLowerCase().includes(location.toLowerCase()) : true
            );
        setFilteredProperties(results);
    }, [allProperties, location]);


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                <aside className="lg:col-span-1">
                    <FilterSidebar resultCount={filteredProperties.length} />
                </aside>

                <main className="lg:col-span-3">
                    <div className="lg:hidden mb-6">
                        <PropertiesMap properties={filteredProperties} />
                    </div>
                    <h1 className="text-3xl font-headline font-bold mb-2">
                        {location ? `Hébergements à ${location}` : 'Tous les hébergements'}
                    </h1>
                     <p className="text-muted-foreground mb-6">{filteredProperties.length} résultats trouvés</p>
                    
                    {filteredProperties.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {filteredProperties.map(property => (
                                <PropertyCard key={property.id} property={property} viewMode="list" />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-semibold mb-2">Aucun résultat</h2>
                            <p className="text-muted-foreground">Essayez d'ajuster vos filtres ou de rechercher un autre lieu.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
}
