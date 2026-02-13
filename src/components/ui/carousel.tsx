"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
  children: React.ReactNode;
};

type CarouselContextProps = {
  orientation: "horizontal" | "vertical";
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  viewportRef: React.RefObject<HTMLDivElement>;
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used inside <Carousel>");
  return ctx;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ orientation = "horizontal", className, children }, ref) => {
    const viewportRef = React.useRef<HTMLDivElement>(null);

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const updateScrollState = React.useCallback(() => {
      const el = viewportRef.current;
      if (!el) return;

      if (orientation === "horizontal") {
        setCanScrollPrev(el.scrollLeft > 0);
        setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth);
      } else {
        setCanScrollPrev(el.scrollTop > 0);
        setCanScrollNext(el.scrollTop + el.clientHeight < el.scrollHeight);
      }
    }, [orientation]);

    const scrollPrev = React.useCallback(() => {
      const el = viewportRef.current;
      if (!el) return;

      if (orientation === "horizontal") {
        el.scrollBy({ left: -300, behavior: "smooth" });
      } else {
        el.scrollBy({ top: -300, behavior: "smooth" });
      }
    }, [orientation]);

    const scrollNext = React.useCallback(() => {
      const el = viewportRef.current;
      if (!el) return;

      if (orientation === "horizontal") {
        el.scrollBy({ left: 300, behavior: "smooth" });
      } else {
        el.scrollBy({ top: 300, behavior: "smooth" });
      }
    }, [orientation]);

    React.useEffect(() => {
      const el = viewportRef.current;
      if (!el) return;

      updateScrollState();
      el.addEventListener("scroll", updateScrollState);
      window.addEventListener("resize", updateScrollState);

      return () => {
        el.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }, [updateScrollState]);

    return (
      <CarouselContext.Provider
        value={{
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          viewportRef,
        }}
      >
        <div
          ref={ref}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { viewportRef, orientation } = useCarousel();

  return (
    <div ref={viewportRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export type { CarouselContextProps as CarouselApi };