'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { CategoryData, Product, getProductDataSelect } from '@/types/prisma-data-types';
import { fetchProducts } from '@/server/action/product/get-all-products';
import { getCategories } from './api';

export function useGetCategories() {
    return useQuery<CategoryData[]>({
      queryKey: ['categories'],
      queryFn: getCategories,
      staleTime: 1000 * 60 * 5, // Optional: Cache for 5 minutes
      refetchOnWindowFocus: false, // Optional: Disable refetch on window focus
    });
  }
  

