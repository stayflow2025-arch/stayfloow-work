"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Accordion({ className, children }: AccordionProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

type ItemProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

export function AccordionItem({ children, className }: ItemProps) {
  return <div className={cn("border rounded-md", className)}>{children}</div>;
}

type TriggerProps = {
  children: React.ReactNode;
  className?: string;
};

export function AccordionTrigger({ children, className }: TriggerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className={cn(
        "w-full flex items-center justify-between p-4 font-medium transition",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 transition-transform",
          open && "rotate-180"
        )}
      />
    </button>
  );
}

type ContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function AccordionContent({ children, className }: ContentProps) {
  return (
    <div className={cn("px-4 pb-4 text-sm text-muted-foreground", className)}>
      {children}
    </div>
  );
}
