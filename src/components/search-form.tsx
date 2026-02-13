"use client";

console.log("DEBUG: SearchForm loaded");

import { Search } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function SearchForm() {
  console.log("DEBUG: Rendering SearchForm");
  const { t } = useLanguage();

  return (
    <form className="flex items-center gap-2">
      <Search className="h-5 w-5" />
      <input
        type="text"
        placeholder={t("search")}
        className="border rounded px-3 py-2 w-full"
      />
    </form>
  );
}
