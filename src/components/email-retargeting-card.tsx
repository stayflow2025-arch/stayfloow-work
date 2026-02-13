"use client";

console.log("DEBUG: EmailRetargetingCard loaded");

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function EmailRetargetingCard() {
  const { t } = useLanguage();

  console.log("DEBUG: Rendering EmailRetargetingCard");

  return (
    <Card className="bg-secondary/40 border border-primary/20 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-6 w-6 text-primary" />
          {t("email_retargeting_title")}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm opacity-80">
          {t("email_retargeting_description")}
        </p>

        {/* Correction : suppression de size="lg" */}
        <Button className="w-full py-3 text-base">
          {t("email_retargeting_cta")}
        </Button>
      </CardContent>
    </Card>
  );
}
