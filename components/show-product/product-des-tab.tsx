"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function ProductDesTab() {
  const [select, setSelect] = useState("one");
  return (
    <div>
      <div className="h-full w-full  mt-[3rem] relative">
        <div className="md:hidden lg:relative w-full h-full"></div>
        <div className="lg:hidden ">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className="text-[25px] no-underline font-gvf
              font-[700]
              "
              >
                {" "}
                Description
              </AccordionTrigger>
              <AccordionContent>
                Nam tempus turpis at metus scelerisque placerat nulla deumantos
                solicitud felis. Pellentesque diam dolor, elementum etos
                lobortis des mollis ut risus. Sedcus faucibus an sullamcorper
                mattis drostique des commodo pharetras loremos. Donec pretium
                egestas sapien et mollis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger
                className="text-[25px] no-underline font-gvf
              font-[700]
              "
              >
                {" "}
                Additional Information
              </AccordionTrigger>
              <AccordionContent>
                Nam tempus turpis at metus scelerisque placerat nulla deumantos
                solicitud felis. Pellentesque diam dolor, elementum etos
                lobortis des mollis ut risus. Sedcus faucibus an sullamcorper
                mattis drostique des commodo pharetras loremos. Donec pretium
                egestas sapien et mollis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger
                className="text-[25px] no-underline font-gvf
              font-[700]
              "
              >
                {" "}
                Shipping & Return
              </AccordionTrigger>
              <AccordionContent>
                Nam tempus turpis at metus scelerisque placerat nulla deumantos
                solicitud felis. Pellentesque diam dolor, elementum etos
                lobortis des mollis ut risus. Sedcus faucibus an sullamcorper
                mattis drostique des commodo pharetras loremos. Donec pretium
                egestas sapien et mollis.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Tabs
          defaultValue={select}
          className=" mx-auto sm:hidden md:hidden lg:block 
          lg:ml-[-5rem] xl:ml-0"
        >
          <TabsList
            className="xl:w-[60%] xl:mx-auto lg:w-full lg:ml-7 mx-auto bg-transparent
           flex justify-between space-x-10"
          >
            <TabsTrigger
              onSelect={() => setSelect("one")}
              style={{ boxShadow: "none" }}
              className="bg-transparent font-gvf text-[25px] font-[700]
              border-b-[5px] border-transparent 
            rounded-none relative data-[state=active]::link_custom"
              value="one"
            >
              Description
            </TabsTrigger>

            <TabsTrigger
              onSelect={() => setSelect("two")}
              style={{ boxShadow: "none" }}
              className="bg-transparent font-gvf text-[25px] font-[700]
              border-b-[5px] border-transparent 
            rounded-none relative "
              value="two"
            >
              Additional Information
            </TabsTrigger>

            <TabsTrigger
              className="bg-transparent font-gvf text-[25px] font-[700]
              border-b-[5px] border-transparent 
            rounded-none relative "
              style={{ boxShadow: "none" }}
              value="four"
            >
              Shipping & Return
            </TabsTrigger>
          </TabsList>
          <hr className="mt-2 h-[1.5px] bg-black w-[95%] ml-10 mx-auto top-[31px] z-10 "></hr>
          <TabsContent value="one" className="mt-10 w-full ">
            <div className="font-ppl text-[15px]">
              <p className="leading-[30px]">
                Nam tempus turpis at metus scelerisque placerat nulla deumantos
                solicitud felis. Pellentesque diam dolor, elementum etos
                lobortis des mollis ut risus. Sedcus faucibus an sullamcorper
                mattis drostique des commodo pharetras loremos. Donec pretium
                egestas sapien et mollis.
              </p>

              <div className="mt-10">
                <h2 className="font-gvf text-[17px] font-[700]">
                  Simple Unordered List
                </h2>
                <div className="ml-5">
                  <ul className="list-disc mt-4 flex-col space-y-3">
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-gvf text-[17px] font-[700]">
                  Simple Unordered List
                </h2>
                <div className="ml-5">
                  <ul className="list-decimal mt-4 flex-col space-y-3">
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="two">
            <div className="font-ppl text-[15px] mt-10 px-10">
              <p className="leading-[30px]">
                Nam tempus turpis at metus scelerisque placerat nulla deumantos
                solicitud felis. Pellentesque diam dolor, elementum etos
                lobortis des mollis ut risus. Sedcus faucibus an sullamcorper
                mattis drostique des commodo pharetras loremos. Donec pretium
                egestas sapien et mollis.
              </p>

              <div className="mt-10">
                <h2 className="font-gvf text-[17px] font-[700]">
                  Simple Unordered List
                </h2>
                <div className="mt-5 space-y-10 flex-col w-full">
                  <div className="w-full flex space-x-5">
                    <h2>Comodous:</h2>
                    <p>Comodous in tempor ullamcorper miaculis</p>
                  </div>
                  <div className="flex  space-x-5">
                    <h2>Mattis laoreet:</h2>
                    <p>Pellentesque vitae neque mollis urna mattis laoreet</p>
                  </div>
                  <div className="flex  space-x-5">
                    <h2>Divamus de ametos:</h2>
                    <p>
                      Proin molestie egestas orci ac suscipit risus posuere
                      loremous
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="four">
            <div className="font-ppl text-[15px] mt-10 px-10">
              <h2 className="font-gvf text-[20px] tracking-wider font-[700]">
                Returns Policy
              </h2>
              <p className="leading-[30px]">
                Nam tempus turpis at metus scelerisque placerat nulla deumantos
                solicitud felis. Pellentesque diam dolor, elementum etos
                lobortis des mollis ut risus. Sedcus faucibus an sullamcorper
                mattis drostique des commodo pharetras loremos. Donec pretium
                egestas sapien et mollis.Sedcus faucibus an sullamcorper mattis
                drostique des commodo pharetras loremos. Donec pretium egestas
                sapien et mollis.
              </p>
            </div>
            <div className="font-ppl text-[15px] mt-10 px-10">
              <h2 className="font-gvf text-[20px] tracking-wider font-[700]">
                Shipping
              </h2>
              <p className="leading-[30px]">
                Nam tempus turpis at metus scelerisque placerat nulla deumantos
                solicitud felis. Pellentesque diam dolor, elementum etos
                lobortis des mollis ut risus. Sedcus faucibus an sullamcorper
                mattis drostique des commodo pharetras loremos. Donec pretium
                egestas sapien et mollis.Sedcus faucibus an sullamcorper mattis
                drostique des commodo pharetras loremos. Donec pretium egestas
                sapien et mollis.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <hr className="h-2 w-full mt-10 sm:hidden"></hr>
      </div>
    </div>
  );
}
