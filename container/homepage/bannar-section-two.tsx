import React from "react";

export default function SectiontwoBannar() {
  return (
    <div className="h-full w-full font-ppl">
      <div className="h-full w-full ">
        <div
          className="opacity-95 relative"
          style={{
            backgroundImage: `url(${"./images/sideShow.jpg"})`, // Set the background image dynamically
            backgroundSize: "cover", // Ensure the image covers the entire div
            backgroundPosition: "center", // Center the image within the div
            height: "40rem", // Set a fixed height for the div
          }}
        >
          <div
            className="absolute  top-[45%]
                    left-[20%] "
          >
            <h2
              className="text-[50px] font-[800]
                       font-gvf tracking-wider uppercase"
            >
              COSMOPOLIS
            </h2>

            <p
              className="mt-4 md:w-[60%] font-montreal tracking-wide
                      "
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              impedit fugiat Nihil impedit fugiat
            </p>

            <div className="w-fit overflow-hidden group mt-5">
              <button
                className="bg-black/90 relative px-5 py-3 font-[400]
                   overflow-hidden group"
              >
                <span
                  className="group-hover:text-black uppercase
                 relative z-10 text-white"
                >
                  Shop Now
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
      </div>
    </div>
  );
}
