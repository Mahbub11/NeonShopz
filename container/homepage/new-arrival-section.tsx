"use client";
import ProductCardView from "@/components/card/product-card";
import { useGetProducts } from "@/services/product/queries";
import React from "react";

export default function NewArrivalSection() {
  const { data, isLoading } = useGetProducts();

  if (isLoading && !data) {
    return <h1>Loading...</h1>;
  }
  if (!data) {
    return <h1>Loading...</h1>;
  }

  console.log(data);
  return (
    <div className="py-10 px-5 font-montreal">
      <div className="flex items-center space-x-10">
        <div className="flex-1 h-[2px] bg-black"></div>
        <h2
          className="uppercase tracking-wider font-[800]
        text-gray-800 text-2xl"
        >
          New arrival
        </h2>

        <div className="flex-1 h-[2px] bg-black"></div>
      </div>

      <div className="mt-10 flex sm:flex-wrap space-x-8">
        {data.map((data, index) => {
          return (
            <div key={index} className="flex justify-center px-1 py-2">
              <ProductCardView className="sm:w-[40rem]
              md:w-[40rem]" product={data!}></ProductCardView>
            </div>
          );
        })}
      </div>
    </div>
  );
}
