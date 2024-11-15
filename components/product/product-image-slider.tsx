// components/ProductImageSlider.js
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { type Swiper as SwiperTypes } from "swiper";
import { ProductVariantImage } from "@/types/prisma-data-types";

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
    id: 1,
    title: "Computer and Accessories Sale For best price",
    originalPrice: 49.99,
    discountPrice: 29.99,
    image:
      "https://new-ella-demo.myshopify.com/cdn/shop/products/product-1-2_870x.jpg?v=1640334147",
    colors: ["#869de3", "#ed79a9", "#98ebb5"],
  },
  {
    id: 2,
    title: "Computer and Accessories Sale For best price",
    originalPrice: 49.99,
    discountPrice: 29.99,
    image:
      "https://new-ella-demo.myshopify.com/cdn/shop/products/product-loa-2_870x.jpg?v=1640334199",
    colors: ["#869de3", "#ed79a9", "#98ebb5"],
  },
  {
    id: 3,
    title: "Computer and Accessories Sale For best price",
    originalPrice: 49.99,
    discountPrice: 29.99,
    image:
      "https://new-ella-demo.myshopify.com/cdn/shop/products/product-laptop-1_8ba38545-e982-4cc5-a601-9f7adb782d6f_870x.jpg?v=1640334272",
    colors: ["#869de3", "#ed79a9", "#98ebb5"],
  },
  {
    id: 4,
    title: "Computer and Accessories Sale For best price",
    originalPrice: 49.99,
    discountPrice: 29.99,
    image:
      "https://new-ella-demo.myshopify.com/cdn/shop/products/product-loa-2_870x.jpg?v=1640334199",
    colors: ["#869de3", "#ed79a9", "#98ebb5"],
  },
  // Add more products as needed
];

 type PassProps={
  data: ProductVariantImage[]
}

  const ProductImageSlider: React.FC<PassProps> = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null);

  return (
    <div className="overflow-hidden w-[30rem]">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {data.map((product) => (
          <SwiperSlide key={product.id}>
            <Image
              className="w-full h-auto rounded-md transition-transform duration-500"
              src={product.url}
              alt={product.url}
              width={500}
              height={300}
              layout="responsive"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
          navigation={true}
        onSwiper={setThumbsSwiper}
        spaceBetween={1}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {data.map((product) => (
          <SwiperSlide key={product.id}>
            <Image
              className="h-[5rem] w-[5rem] rounded-md cursor-pointer"
              src={product.url}
              alt={product.url}
              width={50}
              height={50}
            
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageSlider;
