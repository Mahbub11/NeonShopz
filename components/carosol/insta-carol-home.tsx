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

export function InstaCarosolHome() {
  // Generate an array of objects with id and image_url
  const items = Array.from({ length: 10 }).map((_, index) => ({
    id: index + 1,
    image_url: `https://picsum.photos/200/200?random=${index + 1}`, // Example image URL
  }));

  return (
    <div className="mt-[5rem] flex justify-center w-full h-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full px-5"
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/4">
              <div className="h-[15rem] w-full">
                <Image
                  height={300}
                  width={300}
                  src={item.image_url}
                  alt={`Image ${item.id}`}
                  className="object-cover h-full w-full rounded-sm
                  hover:scale-105 inset-0 transition-all duration-700 ease-out"
                ></Image>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-[4rem]" />
        <CarouselNext className="mr-[4rem]" />
      </Carousel>
    </div>
  );
}
