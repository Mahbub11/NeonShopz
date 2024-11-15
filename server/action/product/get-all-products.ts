"use client";
import axiosInstance from "@/lib/axiosInstance";
import prisma from "@/lib/prisma";
import { Product, getProductDataSelect } from "@/types/prisma-data-types";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get<Product[]>("/products");

  return response.data;
};
