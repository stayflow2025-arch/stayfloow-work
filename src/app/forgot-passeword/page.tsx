"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { KeyRound, Loader2 } from 'lucide-react';
import { sendPasswordResetEmail } from '@/lib/mail';
import { useState } from 'react';

const forgotPasswordSchema = z.object({
  email: z.string().email("L'adresse email est invalide."),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setIsSending(true);

    try {
      await sendPasswordResetEmail({ userEmail: values.email, userType: 'customer' });
    } catch (e) {
      console.error("Password reset email failed to send:", e);
    }

    toast({
      title: "Email envoyé !",
      description: "Si un compte existe pour cet email, vous recevrez un lien pour réinitialiser votre mot de passe.",
    });

    setIsSending(false);
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
            <KeyRound className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Mot de passe oublié</CardTitle>
          <CardDescription>Saisissez votre email pour recevoir un lien de réinitialisation.</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="votre@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* ⭐ Correction finale : aucun size, aucun variant */}
              <Button 
                type="submit"
                className="w-full h-11 px-8 flex items-center justify-center"
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  "Envoyer le lien"
                )}
              </Button>

            </form>
          </Form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Retour à la{" "}
            <Link href="/auth/login" className="font-semibold text-primary hover:underline">
              page de connexion
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
