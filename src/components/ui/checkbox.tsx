"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onChange, ...props }, ref) => {
    return (
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
          {...props}
        />

        <span
          className={cn(
            "flex h-4 w-4 items-center justify-center rounded-sm border border-primary ring-offset-background",
            "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            "transition-colors",
            checked
              ? "bg-primary text-primary-foreground"
              : "bg-background text-transparent",
            className
          )}
        >
          <Check className="h-4 w-4" />
        </span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";