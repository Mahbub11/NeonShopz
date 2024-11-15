import { InstaCarosolHome } from "@/components/carosol/insta-carol-home";
import { Instagram } from "lucide-react";
import React from "react";

export default function InstagramCarosol() {
  return (
    <div className="h-full w-full pt-[5rem] ">
      <div className="mt-[10rem] h-full  w-full ">
        <div className="h-[40rem] w-full">
          <div className="flex justify-center space-x-5">
            <Instagram className="mt-1" size={27}></Instagram>
            <h2
              className="text-[25px] font-[800] text-center
          font-gvf tracking-wide"
            >
              #ELLA ON INSTAGRAM
            </h2>
          </div>
          <p
            className="mt-5 font-ppl
            text-center"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
            officiis.
          </p>

          <div>
            <InstaCarosolHome></InstaCarosolHome>
          </div>

          <div className="w-full flex justify-center mt-5">
            <div className="w-fit overflow-hidden group mt-5">
              <button
                className="bg-black/90 relative px-5 py-3 font-[400]
                            overflow-hidden group"
              >
                <span className="group-hover:text-black relative z-10 text-white">
                  VIEW GALLERY
                </span>
                {/* Pseudo-element for filling effect */}
                <span
                  className="absolute inset-0 bg-gray-300 text-white group-hover:w-full 
                                  transition-all duration-700 w-0"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
