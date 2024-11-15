"use client";
import ProductCardView from "@/components/card/product-card";
import { ColorPickerCheckbox } from "@/components/checkbox/color-picker-checkbox";
import { PropertyFeatureCheckbox } from "@/components/checkbox/multiple-checkbox-holder";
import { SizePickerCheckbox } from "@/components/checkbox/size-picker-checkbox";
import { DualRangeSlider } from "@/components/slidebar/dualrangesidebar";
import BreadCampProductHolder from "@/container/product/bread-camp-product-holder";
import { useFilters } from "@/hook/usePropertySearchFilter";
import { productBananr } from "@/public";
import { useGetProducts } from "@/services/product/queries";
import { Filter, Menu, Tally2, Tally3, Tally4 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Page() {
  // Array of cloth brand names
  const clothBrands = [
    "Cosmopolis",
    "Suitó",
    "Milancélos",
    "Blazéro",
    "Glamos",
    "Metropolis",
    "Valkyrio",
    "Scarvéro",
    "Congué",
  ];

  const [values, setValues] = useState([0, 1400]);
  const { filters, updateFilters } = useFilters();
  const { data, isLoading } = useGetProducts();
  const [gridNumber, setGridNumber] = useState(3);
  const [openSheet, setOpenSheet] = useState(false);

  if (isLoading && !data) {
    return <h1>Loading...</h1>;
  }
  if (!data) {
    return <h1>Loading...</h1>;
  }

  // Dynamic width for product card based on gridNumber
  const cardWidth =
    gridNumber === 2
      ? "w-[40rem]"
      : gridNumber === 3
      ? "w-[20rem]"
      : gridNumber === 4
      ? "w-[15rem]"
      : "w-[25rem]";

  // Class for the selected grid button
  const getButtonClass = (gridValue: number) =>
    `border-[1.5px] py-1 ${gridValue === gridNumber ? "border-black" : ""}`;

  return (
    <section className="w-full font-ppl mt-[-1rem]">
      <div className="flex justify-center w-full space-x-8">
        <div className="h-auto md:p-4">
          <div className="md:px-10 md:w-[90%] sm:w-full mx-auto ">
            <BreadCampProductHolder title={""}></BreadCampProductHolder>

            <main className="w-full h-full flex space-x-10">
              <div className="relative lg:block xl:hidden">
                <Dialog open={openSheet} onOpenChange={setOpenSheet}>
                  <DialogContent className="overflow-y-scroll h-[40rem]">
                    <div className="w-[20rem]  h-full py-5  flex-col space-y-5">
                      <div className="md:px-2">
                        <h2 className="text-[20px] font-[800] font-gvf tracking-wider uppercase">
                          Category
                        </h2>
                        <hr className="mt-1 h-[2px] bg-black"></hr>
                        <div className="mt-5">
                          <ul className="flex flex-col space-y-2 text-[15px] ml-3">
                            {clothBrands.map((brand, index) => (
                              <li
                                key={index}
                                className="group ml-[-1rem] flex space-x-3 items-center cursor-pointer"
                              >
                                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transform transition-all mt-1">
                                  {"> "}
                                </span>
                                <p className="transform transition-all group-hover:translate-x-3 group-hover:translate-y-0">
                                  {brand}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Filter Components */}
                      <div>
                        <h2 className="text-[20px] font-[800] font-gvf tracking-wider uppercase">
                          Price
                        </h2>
                        <hr className="mt-1 h-[2px] bg-black"></hr>
                        <div className="mt-5">
                          <DualRangeSlider
                            value={values}
                            onValueChange={setValues}
                            min={0}
                            max={100}
                            step={1}
                          />
                        </div>

                        {/* Other filters like product type, brand, color, size... */}
                        <div className="mt-10">
                          <h2 className="text-[20px] font-[800] font-gvf tracking-wider uppercase">
                            Product type
                          </h2>
                          <hr className="mt-1 h-[2px] bg-black"></hr>
                          <div className="mt-4 ml-3">
                            <PropertyFeatureCheckbox
                              onFormDataChange={(selectedItems) =>
                                updateFilters({ selectedItems })
                              }
                            />
                          </div>
                        </div>

                        {/* Color Picker */}
                        <div className="mt-10">
                          <h2 className="text-[20px] font-[800] font-gvf tracking-wider uppercase">
                            Color
                          </h2>
                          <hr className="mt-1 h-[2px] bg-black"></hr>
                          <div className="mt-5">
                            <ColorPickerCheckbox
                              onFormDataChange={(selectedItems) =>
                                updateFilters({ selectedItems })
                              }
                            ></ColorPickerCheckbox>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="w-[20rem] hidden
               xl:block h-auto py-5  flex-col space-y-5">
                <div className="md:px-2">
                  <h2 className="text-[20px] font-[800] font-gvf tracking-wider uppercase">
                    Category
                  </h2>
                  <hr className="mt-1 h-[2px] bg-black"></hr>
                  <div className="mt-5">
                    <ul className="flex flex-col space-y-2 text-[15px] ml-3">
                      {clothBrands.map((brand, index) => (
                        <li
                          key={index}
                          className="group ml-[-1rem] flex space-x-3 items-center cursor-pointer"
                        >
                          <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transform transition-all mt-1">
                            {"> "}
                          </span>
                          <p className="transform transition-all group-hover:translate-x-3 group-hover:translate-y-0">
                            {brand}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Filter Components */}
                <div>
                  <h2 className="text-[20px] font-[800] font-gvf tracking-wider uppercase">
                    Price
                  </h2>
                  <hr className="mt-1 h-[2px] bg-black"></hr>
                  <div className="mt-5">
                    <DualRangeSlider
                      value={values}
                      onValueChange={setValues}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>

                  {/* Other filters like product type, brand, color, size... */}
                  <div className="mt-10">
                    <h2 className="text-[20px] font-[800] font-gvf tracking-wider uppercase">
                      Product type
                    </h2>
                    <hr className="mt-1 h-[2px] bg-black"></hr>
                    <div className="mt-4 ml-3">
                      <PropertyFeatureCheckbox
                        onFormDataChange={(selectedItems) =>
                          updateFilters({ selectedItems })
                        }
                      />
                    </div>
                  </div>

                  {/* Color Picker */}
                  <div className="mt-10">
                    <h2 className="text-[20px] font-[800] font-gvf tracking-wider uppercase">
                      Color
                    </h2>
                    <hr className="mt-1 h-[2px] bg-black"></hr>
                    <div className="mt-5">
                      <ColorPickerCheckbox
                        onFormDataChange={(selectedItems) =>
                          updateFilters({ selectedItems })
                        }
                      ></ColorPickerCheckbox>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content area */}
              <div className="flex-1 h-full md:py-10 ">
                <div className="relative group overflow-hidden font-montreal">
                  <Image
                    className="h-full w-full 
                      sm:h-[10rem] cursor-pointer transition-transform duration-500 group-hover:scale-105"
                    src={productBananr}
                    alt="Category One"
                    height={1111}
                    width={2222}
                  />
                </div>

                <div className="mt-5">
                  <h2 className="font-gvf uppercase font-[800] text-[20px]">
                    New In
                  </h2>
                  <p className="w-[90%] text-[15px]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nostrum ea inventore quis alias quaerat. Aspernatur omnis
                    delectus nulla harum reprehenderit.
                  </p>
                </div>
                <hr className="h-2 w-full mt-10"></hr>

                {/* Grid View */}
                <div className="mt-10">
                  <div className="flex items-center space-x-3">
                    <div className="mt-2 lg:block sm:block xl:hidden">
                      <button onClick={() => setOpenSheet(true)}>
                        <Filter size={24}></Filter>
                      </button>
                    </div>
                    <h2 className="font-gvf uppercase font-[800] text-[20px]">
                      View As
                    </h2>
                    <div className="sm:hidden flex space-x-2 text-gray-600">
                      {/* View As Buttons */}
                      <div>
                        <button
                          onClick={() => setGridNumber(2)}
                          className={getButtonClass(2)}
                        >
                          <Tally2 className="ml-2" />
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => setGridNumber(3)}
                          className={getButtonClass(3)}
                        >
                          <Tally3 className="ml-1" />
                        </button>
                      </div>
                      <div className="lg:hidden xl:block">
                        <button
                          onClick={() => setGridNumber(4)}
                          className={getButtonClass(4)}
                        >
                          <Tally4 />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div
                    className={`mt-10 w-full h-full grid gap-5 
                      sm:grid-cols-1 
                      ${
                        gridNumber === 2
                          ? "grid-cols-2"
                          : gridNumber === 3
                          ? "grid-cols-3"
                          : "grid-cols-4"
                      }
                    `}
                  >
                    {data.map((data, index) => (
                      <div key={index} className="">
                        <ProductCardView
                          className={cardWidth} // Apply dynamic width
                          product={data!}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}
