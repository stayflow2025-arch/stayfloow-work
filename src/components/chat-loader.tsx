"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const CustomerSupportChat = dynamic(
  () =>
    import("@/components/customer-support-chat").then(
      (mod) => mod.default
    ),
  {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="rounded-full shadow-lg w-16 h-16 flex items-center justify-center"
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
      </div>
    ),
  }
);

export function ChatLoader() {
  return <CustomerSupportChat />;
}
