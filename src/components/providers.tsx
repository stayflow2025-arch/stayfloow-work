"use client";

console.log("DEBUG: Providers loaded");

import { CurrencyProvider } from "@/context/currency-context";
import { LanguageProvider } from "@/context/language-context";
import React, { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  console.log("DEBUG: Rendering Providers");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <CurrencyProvider>
        {children}
      </CurrencyProvider>
    </LanguageProvider>
  );
}
