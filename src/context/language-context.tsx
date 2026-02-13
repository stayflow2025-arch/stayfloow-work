"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

export type Locale = 'fr' | 'en' | 'ar' | 'es';

const localeDetails: Record<Locale, { name: string; flag: string; dir: 'ltr' | 'rtl' }> = {
    fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    en: { name: 'English', flag: '🇬🇧', dir: 'ltr' },
    ar: { name: 'العربية', flag: '🇩🇿', dir: 'rtl' },
    es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
};

const translations: Record<string, Record<Locale, string>> = {
    // Header
    "accommodations": { fr: "Hébergements", en: "Accommodations", ar: "أماكن الإقامة", es: "Alojamientos" },
    "car_rental": { fr: "Location de Voiture", en: "Car Rental", ar: "تأجير السيارات", es: "Alquiler de Coches" },
    "tours": { fr: "Circuits et Activités", en: "Tours & Activities", ar: "الجولات والأنشطة", es: "Tours y Actividades" },
    "become_partner": { fr: "Devenir Partenaire", en: "Become a Partner", ar: "كن شريكا", es: "Ser Socio" },
    "login": { fr: "Se Connecter", en: "Log In", ar: "تسجيل الدخول", es: "Iniciar Sesión" },
    "signup": { fr: "S'inscrire", en: "Sign Up", ar: "التسجيل", es: "Registrarse" },
    "open_menu": { fr: "Ouvrir le menu", en: "Open menu", ar: "افتح القائمة", es: "Abrir menú" },

    // Footer
    "footer_tagline": { fr: "Découvrez des séjours et des véhicules uniques en Algérie.", en: "Discover unique stays and vehicles in Algeria.", ar: "اكتشف إقامات ومركبات فريدة في الجزائر.", es: "Descubra estancias y vehículos únicos en Argelia." },
    "navigation": { fr: "Navigation", en: "Navigation", ar: "التنقل", es: "Navegación" },
    "company": { fr: "Entreprise", en: "Company", ar: "الشركة", es: "Empresa" },
    "about": { fr: "À propos", en: "About", ar: "معلومات عنا", es: "Sobre nosotros" },
    "contact": { fr: "Contact", en: "Contact", ar: "اتصل", es: "Contacto" },
    "legal": { fr: "Légal", en: "Legal", ar: "قانوني", es: "Legal" },
    "terms": { fr: "Conditions d'utilisation", en: "Terms of use", ar: "شروط الاستخدام", es: "Condiciones de uso" },
    "privacy": { fr: "Politique de confidentialité", en: "Privacy policy", ar: "سياسة الخصوصية", es: "Política de privacidad" },
    "rights_reserved": { fr: "Tous droits réservés.", en: "All rights reserved.", ar: "كل الحقوق محفوظة.", es: "Todos los derechos reservados." },

    // Partner CTA
    "partner_cta_title": { fr: "Devenez Partenaire StayFloow", en: "Become a StayFloow Partner", ar: "كن شريكًا في StayFloow", es: "Conviértase en socio de StayFloow" },
    "partner_cta_desc": { fr: "Vous avez une propriété, un véhicule, un circuit ou une activité à proposer ? Rejoignez notre communauté et commencez à gagner un revenu supplémentaire.", en: "Do you have a property, a vehicle, a tour or an activity to offer? Join our community and start earning extra income.", ar: "هل لديك عقار أو مركبة أو جولة أو نشاط لتقدمه؟ انضم إلى مجتمعنا وابدأ في كسب دخل إضافي.", es: "¿Tiene una propiedad, un vehículo, un tour o una actividad que ofrecer? Únase a nuestra comunidad y comience a ganar ingresos adicionales." },
    "start": { fr: "Démarrer", en: "Get Started", ar: "ابدأ", es: "Empezar" },

    // Home page
    "home_hero_title": { fr: "Votre Porte d'Entrée en Algérie", en: "Your Gateway to Algeria", ar: "بوابتك إلى الجزائر", es: "Su puerta de entrada a Argelia" },
    "home_hero_subtitle": { fr: "Découvrez des séjours uniques et authentiques à travers le pays.", en: "Discover unique and authentic stays across the country.", ar: "اكتشف إقامات فريدة وأصيلة في جميع أنحاء البلاد.", es: "Descubra estancias únicas y auténticas en todo el país." },
    "featured_stays": { fr: "Séjours Recommandés", en: "Featured Stays", ar: "إقامات مميزة", es: "Estancias destacadas" },
    "inspired_by_visit": { fr: "Inspiré de votre dernière visite", en: "Inspired by Your Last Visit", ar: "مستوحى من زيارتك الأخيرة", es: "Inspirado por su última visita" },

    // 🔥 Email Retargeting (les clés manquantes)
    "email_retargeting_title": {
        fr: "Reprenez là où vous vous êtes arrêté",
        en: "Pick up where you left off",
        ar: "تابع من حيث توقفت",
        es: "Continúa donde lo dejaste"
    },
    "email_retargeting_description": {
        fr: "Voici des recommandations basées sur votre dernière visite.",
        en: "Here are recommendations based on your last visit.",
        ar: "إليك بعض التوصيات بناءً على زيارتك الأخيرة.",
        es: "Aquí tienes recomendaciones basadas en tu última visita."
    },
    "email_retargeting_cta": {
        fr: "Voir les suggestions",
        en: "See suggestions",
        ar: "عرض الاقتراحات",
        es: "Ver sugerencias"
    },

    // Search Form
    "where_to": { fr: "Où allez-vous ?", en: "Where are you going?", ar: "أين تذهب؟", es: "¿A dónde vas?" },
    "all_destinations": { fr: "Toutes les destinations", en: "All destinations", ar: "كل الوجهات", es: "Todos los destinos" },
    "choose_dates": { fr: "Choisissez vos dates", en: "Choose your dates", ar: "اختر تواريخك", es: "Elige tus fechas" },
    "travelers": { fr: "voyageurs", en: "travelers", ar: "مسافرون", es: "viajeros" },
    "search": { fr: "Rechercher", en: "Search", ar: "بحث", es: "Buscar" },

    // Contact page
    "contact_us": { fr: "Contactez-nous", en: "Contact Us", ar: "اتصل بنا", es: "Contáctenos" },
    "contact_desc": { fr: "Une question, une suggestion ou un problème ? Remplissez le formulaire ou utilisez nos coordonnées.", en: "A question, a suggestion, or a problem? Fill out the form or use our contact details.", ar: "سؤال، اقتراح أو مشكلة؟ املأ النموذج أو استخدم معلومات الاتصال الخاصة بنا.", es: "Una pregunta, una sugerencia o un problema? Rellene el formulario o utilice nuestros datos de contacto." },
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  getLocaleDetails: (loc?: Locale) => { name: string; flag: string; dir: 'ltr' | 'rtl' };
  availableLocales: Locale[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('fr');

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDetails[locale].dir;
  }, [locale]);

  const t = useCallback((key: string): string => {
    return translations[key]?.[locale] || key;
  }, [locale]);

  const getLocaleDetails = (loc?: Locale) => {
    return localeDetails[loc || locale];
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, getLocaleDetails, availableLocales: Object.keys(localeDetails) as Locale[] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
