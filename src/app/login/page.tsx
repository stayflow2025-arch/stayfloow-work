"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Exemple : si l'utilisateur est déjà connecté
    const isLogged = false;
    if (isLogged) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Connexion</h1>
        <p className="text-muted-foreground mt-4">
          Le formulaire sera ajouté ici.
        </p>
      </div>
    </div>
  );
}
