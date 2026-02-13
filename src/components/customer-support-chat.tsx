"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomerSupportChat() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Bouton flottant */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "scale-0" : "scale-100"
        )}
      >
        <Button
          onClick={handleToggle}
          className="rounded-full shadow-lg w-16 h-16 flex items-center justify-center"
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
      </div>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 bg-white shadow-xl rounded-lg p-4 w-80">
          <p className="font-semibold mb-2">Support client</p>
          <p className="text-sm text-muted-foreground">
            Comment pouvons-nous vous aider ?
          </p>

          <Button
            onClick={handleToggle}
            className="mt-4 w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            Fermer
          </Button>
        </div>
      )}
    </>
  );
}
