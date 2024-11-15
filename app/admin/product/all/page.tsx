"use client";
import AddProductForm from "@/components/admin/products/add-product-form";
import DashboardNav from "@/components/admin/navigation/DashboardNav";
import { BarChart, Package, PenIcon } from "lucide-react";
import Image from "next/image";
import { ProductDataTable } from "@/components/admin/products/table/data-table";
import { ProductColumns } from "@/components/admin/products/table/columns";
import prisma from "@/lib/prisma";
import { getProductDataSelect, Product } from "@/types/prisma-data-types";
import { useQuery } from "@tanstack/react-query";
import { useGetProducts } from "@/services/product/queries";
import { ProductDrawer } from "@/components/admin/products/drawer/edit-product-drawer";

export default function Page() {
  // const products = await prisma.product.findMany({
  //   include:getProductDataSelect()
  // });

  // console.log(products)

  const { data: products, isLoading, error } = useGetProducts();

  console.log(products)

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // const products={
  //   "id": 1,
  //   "title": "Stylish T-Shirt",
  //   "description": "A comfortable and stylish t-shirt for all occasions.",
  //   "price": 29.99,
  //   "stock": 25,
  //   "variants": [
  //     {
  //       "id": 1,
  //       "size": "S",
  //       "color": "Red",
  //       "stock": 10,
  //       "images": [
  //         {
  //           "id": 1,
  //           "url": "https://example.com/images/red-shirt-front.jpg",
  //           "altText": "Front view of red t-shirt"
  //         },
  //         {
  //           "id": 2,
  //           "url": "https://example.com/images/red-shirt-back.jpg",
  //           "altText": "Back view of red t-shirt"
  //         }
  //       ]
  //     }
  //   ]
  // }
  
  return (
    <div className="w-[90%] md:w-[90%] px-2 py-2 mt-10 mx-auto">
      <ProductDataTable
        data={products!}
        columns={ProductColumns}
      ></ProductDataTable>
    </div>
  );
}
