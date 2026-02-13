"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MountainSnow, Globe, ChevronDown } from "lucide-react";
import { useCurrency } from "@/context/currency-context";
import { useLanguage } from "@/context/language-context";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import type { Currency } from "@/context/currency-context";
import type { Locale } from "@/context/language-context";
import { SiInstagram, SiFacebook, SiTiktok } from "@icons-pack/react-simple-icons";
import { useState, useEffect } from "react";

type SocialLinks = {
  instagram: string;
  facebook: string;
  tiktok: string;
};

export function Footer() {
  const { currency, setCurrency, getCurrencySymbol, getCurrencyFlag } = useCurrency();
  const { locale, setLocale, t, getLocaleDetails, availableLocales } = useLanguage();
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedLinks = localStorage.getItem("socialMediaSettings");
        if (savedLinks) {
          setSocialLinks(JSON.parse(savedLinks));
        }
      } catch (error) {
        console.error("Could not load social media links from localStorage", error);
      }
    }
  }, []);

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  const currencies: Currency[] = ["DZD", "EUR", "USD", "GBP", "CHF", "EGP"];

  return (
    <footer className="border-t bg-card">
      {!isAdminPage && (
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-headline font-bold mb-4 text-primary-foreground">
              {t("partner_cta_title")}
            </h2>
            <p className="max-w-3xl mx-auto mb-8 text-primary-foreground/90">
              {t("partner_cta_desc")}
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center">
                  {t("start")}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/partner/onboarding">{t("add_property")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/partner/onboarding/cars">{t("add_vehicle")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/partner/onboarding/circuits">{t("add_tour")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <MountainSnow className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl font-bold">StayFloow</span>
            </Link>

            <p className="text-sm text-muted-foreground">{t("footer_tagline")}</p>

            {socialLinks &&
              (socialLinks.instagram ||
                socialLinks.facebook ||
                socialLinks.tiktok) && (
                <div className="flex items-center gap-4 mt-2">
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <SiInstagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                  )}
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <SiFacebook className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                  )}
                  {socialLinks.tiktok && (
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                    >
                      <SiTiktok className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                  )}
                </div>
              )}
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t("navigation")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-foreground">
                  {t("accommodations")}
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-muted-foreground hover:text-foreground">
                  {t("car_rental")}
                </Link>
              </li>
              <li>
                <Link href="/circuits" className="text-muted-foreground hover:text-foreground">
                  {t("tours")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t("company")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-muted-foreground hover:text-foreground">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t("legal")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/partner/login" className="text-muted-foreground hover:text-foreground">
                  Espace Partenaire
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} StayFloow. {t("rights_reserved")}
          </p>

          <div className="flex items-center gap-4">
            {/* LANGUE */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center px-4 py-2 bg-transparent hover:bg-accent">
                  <span className="text-lg mr-2">{getLocaleDetails().flag}</span>
                  {getLocaleDetails().name}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {availableLocales.map((loc) => {
                  const details = getLocaleDetails(loc);
                  return (
                    <DropdownMenuItem key={loc} onSelect={() => handleLocaleChange(loc)}>
                      <span className="mr-3 text-lg">{details.flag}</span>
                      <span>{details.name}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* DEVISE */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center px-4 py-2 bg-transparent hover:bg-accent">
                  <span className="text-lg mr-2">{getCurrencyFlag(currency as Currency)}</span>
                  {currency}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {currencies.map((c) => (
                  <DropdownMenuItem key={c} onSelect={() => handleCurrencyChange(c)}>
                    <span className="mr-3 text-lg">{getCurrencyFlag(c)}</span>
                    <span>
                      {c} ({getCurrencySymbol(c)})
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </footer>
  );
}
