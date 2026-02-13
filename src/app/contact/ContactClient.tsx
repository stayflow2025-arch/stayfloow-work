"use client";

import { useLanguage } from "@/context/language-context";
import { useToast } from "@/hooks/use-toast";
import ContactPageContent from "./ContactPageContent";

export default function ContactClient() {
  const { t } = useLanguage();
  const { toast } = useToast();

  return <ContactPageContent t={t} toast={toast} />;
}
