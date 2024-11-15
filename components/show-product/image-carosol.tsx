"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProductVariantImage } from "@/types/prisma-data-types";

export default function ProductImageShowcase({
  variants,
}: {
  variants: ProductVariantImage[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeThumbnail, setActiveThumbnail] = useState([0]);
  const searchParams = useSearchParams();

  const updatePreview = (index: number) => {
    api?.scrollTo(index);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("slidesInView", (e) => {
      setActiveThumbnail(e.slidesInView());
    });
  }, [api]);

  return (
    <div>
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {variants.map((variant) => {
            return (
              <CarouselItem  key={variant.id}>
                {variant.url ? (
                  <div className="h-full w-full">
                    <Image
                      priority
                      className="rounded-md object-cover h-full w-full"
                      width={500}
                      height={720}
                      src={variant.url}
                      alt={variant.altText ? variant.altText : ""}
                    />
                  </div>
                ) : null}
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="flex overflow-clip py-2 gap-4 mt-5">
          {variants.map((variant, index) => {
            return (
              <div key={variant.url}>
                {variant.url ? (
                  <Image
                    onClick={() => updatePreview(index)}
                    priority
                    className={cn(
                      index === activeThumbnail[0]
                        ? "opacity-100"
                        : "opacity-75",
                      "rounded-md transition-all duration-300 ease-in-out cursor-pointer hover:opacity-75"
                    )}
                    width={72}
                    height={48}
                    src={variant.url}
                    alt={variant.altText ? variant.altText : ""}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </Carousel>
    </div>
  );
}
