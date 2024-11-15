'use client'
import { useQuery } from '@tanstack/react-query';

import { Product, getProductDataSelect } from '@/types/prisma-data-types';
import { fetchProducts } from '@/server/action/product/get-all-products';

export function useGetProducts() {
    return useQuery<Product[]>({
      queryKey: ['products'],
      queryFn: fetchProducts,
      staleTime: 1000 * 60 * 5, // Optional: Cache for 5 minutes
     
    });
  }
  