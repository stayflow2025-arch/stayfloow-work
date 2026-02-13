"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ALERT DIALOG SANS RADIX
 * Version simplifiée mais 100% compatible UI
 */

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      {open && (
        <div
          className="fixed inset-0 bg-black/80 animate-in fade-in-0"
          onClick={() => onOpenChange(false)}
        />
      )}
      {open && children}
    </div>
  );
}

export function AlertDialogTrigger({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}

export function AlertDialogContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative z-50 w-full max-w-lg rounded-lg bg-background p-6 shadow-lg animate-in fade-in-0 zoom-in-95",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AlertDialogHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}>
      {children}
    </div>
  );
}

export function AlertDialogTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

export function AlertDialogDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function AlertDialogFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}>
      {children}
    </div>
  );
}

export function AlertDialogCancel({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-md border bg-background hover:bg-accent mt-2 sm:mt-0",
        className
      )}
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
    >
      {children}
    </button>
  );
}