"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface ContactPageContentProps {
  t: (key: string) => string;
  toast: any;
}

export default function ContactPageContent({ t, toast }: ContactPageContentProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: any) => {
    toast({
      title: t("contact.successTitle"),
      description: t("contact.successMessage"),
    });

    console.log("Form submitted:", values);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">{t("contact.title")}</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* NAME */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.name")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("contact.namePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.email")}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t("contact.emailPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MESSAGE */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.message")}</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full border rounded p-2"
                    rows={5}
                    placeholder={t("contact.messagePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {t("contact.send")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
