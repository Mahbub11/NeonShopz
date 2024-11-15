"use client";

// components/NewProductSlider.tsx

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";
import { integralCF, satoshi } from "@/public/fonts";
import { cn } from "@/lib/utils";
import { TrackNextIcon, TrackPreviousIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { Swiper as SwiperCore } from "swiper/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "../product/product-card";
import { useGetProducts } from "@/services/product/queries";

const categories = [
  { name: "Electronics", image: "https://picsum.photos/200/300?random=1" },
  { name: "Fashion", image: "https://picsum.photos/200/300?random=2" },
  { name: "Home & Garden", image: "https://picsum.photos/200/300?random=3" },
  { name: "Sports", image: "https://picsum.photos/200/300?random=4" },
  { name: "Toys", image: "https://picsum.photos/200/300?random=5" },
  { name: "Books", image: "https://picsum.photos/200/300?random=6" },
];
export interface Product {
  id: number;
  title: string;
  originalPrice: number;
  discountPrice: number;
  image: string;
  colors: string[];
}
const products: Product[] = [
  {
    id: 91,
    title: "Computer and Accessories Sale For best price",
    originalPrice: 49.99,
    discountPrice: 29.99,
    image:
      "https://new-ella-demo.myshopify.com/cdn/shop/products/product-loa-2_870x.jpg?v=1640334199",
    colors: ["#869de3", "#ed79a9", "#98ebb5"],
  },
  {
    id: 92,
    title: "Computer and Accessories Sale For best price",
    originalPrice: 49.99,
    discountPrice: 29.99,
    image:
      "https://new-ella-demo.myshopify.com/cdn/shop/products/product-laptop-1_8ba38545-e982-4cc5-a601-9f7adb782d6f_870x.jpg?v=1640334272",
    colors: ["#869de3", "#ed79a9", "#98ebb5"],
  },
  {
    id: 93,
    title: "Computer and Accessories Sale For best price",
    originalPrice: 49.99,
    discountPrice: 29.99,
    image:
      "https://new-ella-demo.myshopify.com/cdn/shop/products/product-tivi-1_ad5097e1-ea23-4ccf-b4a5-dc2c9b4f35f1_870x.jpg?v=1640334208",
    colors: ["#869de3", "#ed79a9", "#98ebb5"],
  },
  {
    id: 94,
    title: "Computer and Accessories Sale For best price",
    originalPrice: 49.99,
    discountPrice: 29.99,
    image:
      "https://new-ella-demo.myshopify.com/cdn/shop/products/product-1-2_870x.jpg?v=1640334147",
    colors: ["#869de3", "#ed79a9", "#98ebb5"],
  },
  // Add more products as needed
];

const NewProductSlider = () => {
  const swiperRef = useRef<SwiperCore>();

  const { data, isLoading } = useGetProducts();

  if (isLoading && !data) {
    return <h1>Loading...</h1>;
  }

  console.log(data);

  return (
    <div
      className={cn([
        integralCF.className,
        "my-4 w-full mx-auto mt-[10rem] relative",
      ])}
    >
      <h2 className="text-xl font-bold ml-2 mb-2">New Product</h2>
      <Swiper
        className="px-5 mt-10"
        spaceBetween={2}
        slidesPerView={3}
        loop={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {data!.map((product, index) => (
          <SwiperSlide key={index} className="flex justify-center px-1 py-2">
            <ProductCard product={product}></ProductCard>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute left-0 top-[40%] transform -translate-y-1/2 z-10 ml-3">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="border-2 bg-transparent/30 p-2 rounded-full "
        >
          <ArrowLeft color="white" />
        </button>
      </div>
      <div className="absolute right-0 top-[40%] transform -translate-y-1/2 z-10 mr-3">
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="border-2 bg-transparent/30 p-2 rounded-full "
        >
          <ArrowRight color="white" />
        </button>
      </div>
    </div>
  );
};

export default NewProductSlider;
