import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Product } from "@/types/prisma-data-types";
import ProductCardView from "../card/product-card";

type RelatedProductCarosolProps = {
  products: Product[];
};

export function RelatedProductCarosol({
  products,
}: RelatedProductCarosolProps) {
  

  return (
    <div className="mt-5 flex justify-center w-full h-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {products.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/4">
              <div className="h-full w-full">
                <ProductCardView className="sm:w-[40rem]
              md:w-[40rem]" product={item}></ProductCardView>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      
      </Carousel>
    </div>
  );
}
