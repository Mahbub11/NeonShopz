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
import { HomeHeroType } from "@/types/bannar-data-type";

export default function HomeHeroCarosol({ data }: { data: HomeHeroType[] }) {
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
    <div className="w-full h-full mx-auto flex justify-center">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="">
          {data.map((variant) => {
            return (
              <CarouselItem key={variant.id}>
                {variant.bannar_url ? (
                  <div className="w-full h-full relative">
                    <Image
                      priority
                      className="object-cover sm:h-[30rem] h-full w-full"
                      src={variant.bannar_url}
                      alt={variant.brand_name || "Brand Image"}
                      width={480}
                      height={480}
                    />
                    {variant.position === 0 ? (
                      <div>
                        <div
                          className="absolute sm:top-[30%] md:top-[20%] lg:top-[45%]
                     md:left-[20%] sm:left-2"
                        >
                          <h2
                            className="md:text-[30px] sm:text-[30px] lg:text-[50px] font-[800]
                       font-gvf tracking-wider uppercase"
                          >
                            {variant.brand_name}
                          </h2>

                          <p
                            className="md:mt-4 md:w-[60%] font-montreal tracking-wide sm:line-clamp-2
                      "
                          >
                            {variant.description}
                          </p>

                          <div className="w-fit overflow-hidden group mt-5">
                            <button
                              className="bg-black/90 relative px-3 py-3 font-[400]
                   overflow-hidden group"
                            >
                              <span className="group-hover:text-black relative z-10 text-white">
                                Make an enquiry
                              </span>
                              {/* Pseudo-element for filling effect */}
                              <span
                                className="absolute inset-0 bg-white group-hover:w-full 
                    transition-all duration-[1500ms] w-0"
                              ></span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div
                          className="absolute sm:top-[30%] sm:left-2 md:top-[20%] lg:top-[45%]
                    lg:right-0 md:left-[50%] "
                        >
                          <div className="">
                            <h2
                              className="md:text-[30px] sm:text-[30px] lg:text-[50px] font-[800]
                          font-gvf tracking-wider uppercase"
                            >
                              {variant.brand_name}
                            </h2>

                            <p
                              className="mt-4 lg:w-[60%] font-montreal tracking-wide
                      "
                            >
                              {variant.description}
                            </p>

                            <div className="w-fit overflow-hidden group mt-5">
                              <button
                                className="bg-black/90 relative px-3 py-3 font-[400]
                            overflow-hidden group"
                              >
                                <span className="group-hover:text-black relative z-10 text-white">
                                  Make an enquiry
                                </span>
                                {/* Pseudo-element for filling effect */}
                                <span
                                  className="absolute inset-0 bg-white group-hover:w-full 
                                  transition-all duration-500 w-0"
                                ></span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
{
  /* <Image
                    priority
                    className="rounded-md object-cover 
                    md:h-auto md:w-full"
                    width={500}
                    height={720}
                    src={variant.bannar_url}
                    alt={variant.brand_name ? variant.brand_name : ""}
                  /> */
}
