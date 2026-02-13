"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CollapsibleProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
};

const Collapsible = ({
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
}: CollapsibleProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  const isOpen = open !== undefined ? open : internalOpen;

  const toggle = () => {
    const newState = !isOpen;
    if (open === undefined) setInternalOpen(newState);
    onOpenChange?.(newState);
  };

  return (
    <div className={cn("w-full", className)}>
      {React.Children.map(children, (child: any) => {
        if (!child) return null;

        if (child.type === CollapsibleTrigger) {
          return React.cloneElement(child, { toggle, isOpen });
        }

        if (child.type === CollapsibleContent) {
          return React.cloneElement(child, { isOpen });
        }

        return child;
      })}
    </div>
  );
};

const CollapsibleTrigger = ({
  children,
  toggle,
  isOpen,
  className,
}: {
  children: React.ReactNode;
  toggle?: () => void;
  isOpen?: boolean;
  className?: string;
}) => (
  <button
    type="button"
    onClick={toggle}
    className={cn("cursor-pointer", className)}
    aria-expanded={isOpen}
  >
    {children}
  </button>
);

const CollapsibleContent = ({
  children,
  isOpen,
  className,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      "transition-all overflow-hidden",
      isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
      className
    )}
  >
    {children}
  </div>
);

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
