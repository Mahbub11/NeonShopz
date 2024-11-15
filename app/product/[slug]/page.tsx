import ProductShowCase from "@/components/show-product/product-description";
import BreadCampHolder from "@/container/product-show/bread-camp-holder";
import prisma from "@/lib/prisma";
import { productSchema } from "@/schema/order/order";
import { fetchProducts } from "@/server/action/product/get-all-products";
import { getProductDataSelect } from "@/types/prisma-data-types";
import React from "react";

export async function generateStaticParams() {
  const data = await prisma.product.findMany();
  if (data) {
    const slugID = data.map((variant) => ({ slug: variant.id.toString() }));
    return slugID;
  }
  return [];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(params.slug), // Ensure params.slug is converted to a number
    },
    select: getProductDataSelect(),
  });

  // Handle the case when no product is found
  if (!product) {
    return <div className="h-full w-full">No product found</div>;
  }

  return (
    <>
      <section className="w-full font-ppl mt-[-1rem]">
        <div className="flex justify-center w-full">
          <div className=" h-auto md:p-4">
            <div className="md:px-10 md:w-[80%] h-full mx-auto sm:w-full ">
             <BreadCampHolder title={product.title}></BreadCampHolder>
              <ProductShowCase product={product} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
