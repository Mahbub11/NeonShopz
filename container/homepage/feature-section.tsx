import {
  categoryOne,
  categoryThree,
  categoryTwo,
  featureOne,
  featuteTwo,
  featureThree,
} from "@/public";
import Image from "next/image";
import React from "react";

export default function FeatureSection() {
  // Define an array of feature objects
  const features = [
    {
      id: 1,
      imageUrl: featureOne,
      name: "DORUS",
    },
    {
      id: 2,
      imageUrl: featuteTwo,
      name: "LANOS",
    },
    {
      id: 3,
      imageUrl: featureThree,
      name: "Editors Pick",
    },
  ];

  return (
    <div>
      <div className="flex items-center sm:space-x-3 md:space-x-10 mt-10">
        <div className="flex-1 h-[2px] bg-black"></div>
        <h2
          className="uppercase tracking-wider font-[800] text-gray-800
         text-2xl font-gvf"
        >
          Featured On Ella
        </h2>
        <div className="flex-1 h-[2px] bg-black"></div>
      </div>

      <div
        className="w-full h-full mt-10 
      flex justify-center gap-4 flex-wrap font-ppl"
      >
        {/* Map over the features array */}
        {features.map((feature) => (
          <div
            key={feature.id}
            className="relative xl:h-[30rem] xl:w-[25rem]
            lg:h-[25rem] lg:w-[20rem] flex-wrap

             group overflow-hidden font-montreal"
          >
            <Image
              className="h-full w-full cursor-pointer
               transition-transform duration-500 group-hover:scale-105 object-cover"
              src={feature.imageUrl}
              alt={feature.name}
              height={721}
              width={320}
            />
            {/* Text div centered over the image */}
          </div>
        ))}
      </div>
    </div>
  );
}
