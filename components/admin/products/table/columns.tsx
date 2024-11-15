"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { AddStockModal } from "./add-stock-modal";
import { Button } from "@/components/ui/button";
import { ProductDrawer } from "../drawer/edit-product-drawer";
import { Product } from "@/types/prisma-data-types";


export const ProductColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  // {
  //   accessorKey: "stock",
  //   header: "Stock",
  //   // Custom cell to display the sum of stock from variants
  //   cell: ({ row }) => {
    
  //     const totalStock = row.original.variants.reduce((sum, variant) => sum + variant.stock, 0);
  //     return <span>{totalStock}</span>;
  //   },
  // },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {/* Add Stock Button */}
        <AddStockButton productId={row.original.id} />
        {/* Edit Product Button */}
        <EditProductButton productId={row.original.id} />
      </div>
    ),
  },
];

function AddStockButton({ productId }: { productId: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={openModal} className="btn">
        Add Stock
      </button>
      {isOpen && <AddStockModal productId={productId} onClose={closeModal} />}
    </>
  );
}


// Placeholder for the ProductDrawer component
function EditProductButton({ productId }: { productId: number }) {

  console.log(productId)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <Button onClick={openDrawer} variant="secondary">
        Edit
      </Button>
      <ProductDrawer productId={productId} isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
}