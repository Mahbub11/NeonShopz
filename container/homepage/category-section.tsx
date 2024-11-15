import { categoryOne, categoryThree, categoryTwo } from "@/public";
import Image from "next/image";
import React from "react";

export default function CategorySection() {
  return (
    <div>
      <div className="py-10 flex justify-center flex-wrap gap-5">
        {/* Category One */}
        <div className="relative group overflow-hidden font-montreal">
          <Image
            className="h-full w-full cursor-pointer
            group-hover:opacity-70 transition-transform
             duration-500 group-hover:scale-105"
            src={categoryOne}
            alt="Category One"
            height={1111}
            width={2222}
          />
          {/* Text div centered over the image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="cursor-pointer text-white text-2xl font-[500] link-flash w-fit">
              Editors Pick
            </h2>
          </div>
        </div>

        {/* Category Two */}
        <div className="relative group overflow-hidden font-montreal">
          <Image
            className="h-full w-full cursor-pointer
            group-hover:opacity-70 transition-transform duration-500 group-hover:scale-105"
            src={categoryTwo}
            alt="Category One"
            height={1111}
            width={2222}
          />
          {/* Text div centered over the image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="cursor-pointer text-white text-2xl font-[500] link-flash w-fit">
              Editors Pick
            </h2>
          </div>
        </div>

        {/* Category Three */}
        <div className="relative group overflow-hidden font-montreal">
          <Image
            className="h-full w-full cursor-pointer
            group-hover:opacity-70 transition-transform duration-500 group-hover:scale-105"
            src={categoryThree}
            alt="Category One"
            height={1111}
            width={2222}
          />
          {/* Text div centered over the image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="cursor-pointer text-white text-2xl font-[500] link-flash w-fit">
              Editors Pick
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
