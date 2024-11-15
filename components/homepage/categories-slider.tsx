"use client";

// components/CategoriesSlider.tsx

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";
import { integralCF, satoshi } from "@/public/fonts";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Electronics", image: "https://picsum.photos/200/300?random=1" },
  { name: "Fashion", image: "https://picsum.photos/200/300?random=2" },
  { name: "Home & Garden", image: "https://picsum.photos/200/300?random=3" },
  { name: "Sports", image: "https://picsum.photos/200/300?random=4" },
  { name: "Toys", image: "https://picsum.photos/200/300?random=5" },
  { name: "Books", image: "https://picsum.photos/200/300?random=6" },
];

const CategoriesSlider = () => {
  return (
    <div  className={cn([integralCF.className, "my-4 w-full mx-auto mt-[10rem]"])} >
      <h2 className="text-xl font-bold text-center mb-2">Shop by Categories</h2>
      <Swiper
        className="px-5 mt-10"
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={5}
        navigation
        loop={true}
        pagination={{ clickable: true }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index} className="flex justify-center  px-5 py-5">
            <div className="flex justify-center items-center overflow-visible">
              {" "}
              {/* Flex to center */}
              <motion.div
                className="flex flex-col items-center w-[12rem]
                 h-[12rem] px-3 py-5 bg-white rounded-full " // Added shadow for better visibility
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }} // Scale effect on hover
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  className="rounded-md w-[5rem] h-[5rem] mt-5"
                  src={category.image}
                  alt={category.name}
                  width={200}
                  height={200}
                  onError={(e) => {
                    e.currentTarget.src = "/images/fallback.jpg"; // Fallback image
                  }}
                />
                <div className={  cn([satoshi.className,"mt-5 text-center font-bold"])}>
                  {category.name}
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesSlider;
