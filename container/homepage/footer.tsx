import {
  Facebook,
  Instagram,
  TicketIcon,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <div>
      <div className=" w-full bg-[#232323]  font-ppl">
        <footer className=" text-gray-200 py-12 mt-12 md:px-5">
          <div className="mx-auto h-full w-full  ">
            <div
              className="flex sm:flex-col sm:space-y-5
                 w-full justify-between sm:pl-5"
                 >
              {/* Shop Section */}
              <div>
                <h3
                  className=" text-lg mb-4 uppercase
                tracking-wider font-gvf"
                >
                  Shop
                </h3>
                <ul className="space-y-3 font-ppl text-[13px]">
                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      New in
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      Women
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      Men
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      Shoes
                    </a>
                  </li>

                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      Top Brands
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      Sale & Special Offers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Information Section */}
              <div>
                <h3 className=" text-lg mb-4 tracking-wider uppercase font-gvf">
                  Information
                </h3>
                <ul className="space-y-3 font-ppl text-[13px]">
                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className=" text-lg mb-4 uppercase tracking-wider font-gvf">
                  Shop
                </h3>
                <ul className="space-y-3 font-ppl text-[13px]">
                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      New in
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      Women
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      Men
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      Shoes
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white link-flash2">
                      Bags & Accessories
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter Section */}
              <div>
                <h3 className=" text-[23px] mb-4 font-gvf tracking-wide">
                  Newsletter Sign Up
                </h3>
                <p className="mb-4 font-ppl text-[14px] sm:w-[70%]">
                  Sign up for exclusive updates, new arrivals & insider only
                  discounts
                </p>
                <div className="flex ">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="md:px-10 sm:px-5 md:w-[18rem] text-gray-900 bg-transparent
                    border-[1px]  focus:outline-none"
                  />
                  <div className="w-fit overflow-hidden group ml-3">
                    <button
                      className="bg-black/90 relative px-5 py-3 font-[400]
                            overflow-hidden group"
                    >
                      <span
                        className="group-hover:text-black
                      tracking-wider  relative z-10 text-white"
                      >
                        SUBMIT
                      </span>
                      {/* Pseudo-element for filling effect */}
                      <span
                        className="absolute inset-0 bg-white group-hover:w-full 
                                  transition-all duration-700 w-0"
                      ></span>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex space-x-5 mt-5">
                    <a
                      href="#"
                      className="bg-white w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center border-2 group transition-all"
                    >
                      <Facebook
                        strokeWidth="1px"
                        fill="#000000"
                        size={25}
                        className="group-hover:scale-105 inset-0 transition-all"
                      />
                    </a>

                    <a
                      href="#"
                      className="bg-white w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center border-2 group transition-all"
                    >
                      <Instagram
                        strokeWidth="1px"
                        fill="#000000"
                        size={25}
                        className="group-hover:scale-105 inset-0 transition-all"
                      />
                    </a>
                    <a
                      href="#"
                      className="bg-white w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center border-2 group transition-all"
                    >
                      <Youtube
                        strokeWidth="1px"
                        fill="#000000"
                        size={25}
                        className="group-hover:scale-105 inset-0 transition-all"
                      />
                    </a>
                    <a
                      href="#"
                      className="bg-white w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center border-2 group transition-all"
                    >
                      <Twitter
                        strokeWidth="1px"
                        fill="#000000"
                        size={25}
                        className="group-hover:scale-105 inset-0 transition-all"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
            </div>

            {/* Copyright Section */}
            <div className="text-center text-gray-400 mt-10">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
