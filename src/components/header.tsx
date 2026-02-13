"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MountainSnow, Menu } from "lucide-react";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet"; // ⭐ Chemin RELATIF pour Cloudflare

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useLanguage } from "@/context/language-context";

export function Header() {
  const { t } = useLanguage();

  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navLinks = [
    { href: "/search", label: t("accommodations") },
    { href: "/cars", label: t("car_rental") },
    { href: "/circuits", label: t("tours") },
    { href: "/partner/onboarding", label: t("become_partner") },
  ];

  if (!isClient) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm h-16" />
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <MountainSnow className="h-6 w-6 text-primary" />
          <span className="font-headline text-2xl font-bold tracking-tight">
            StayFloow
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Desktop user menu */}
          <div className="hidden md:flex items-center gap-1">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="relative h-10 w-10 rounded-full bg-transparent hover:bg-accent">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/user-fatiha/100/100" />
                      <AvatarFallback>FV</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">Fatiha Voyageuse</p>
                      <p className="text-xs text-muted-foreground">
                        fatiha.voyage@email.com
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/dashboard">Mon Compte</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Mes Favoris</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">{t("login")}</Button>
                </Link>
                <Link href="/signup">
                  <Button>{t("signup")}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent className="w-80 sm:w-96">
                <div className="mt-6">
                  <nav className="flex flex-col gap-4 text-lg">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
