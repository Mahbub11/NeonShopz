import axiosInstance from "@/lib/axiosInstance";
import { Category, Subcategories } from "@/types/prisma-data-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, deleteSubCategory } from "./api";

export function useAddCategory() {
  const queryClient = useQueryClient();

  return useMutation<Omit<Category, "id">, Error, Omit<Category, "id">>({
    mutationFn: async (newCategory) => {
      const response = await axiosInstance.post("/category", newCategory, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the cache for categories to refresh the list
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useAddSubCategory() {
  const queryClient = useQueryClient();

  return useMutation<
    Omit<Subcategories, "id">,
    Error,
    Omit<Subcategories, "id">
  >({
    mutationFn: async (subCat) => {
      const response = await axiosInstance.post("/subcategory", subCat, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the cache for categories to refresh the list
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useEditSubCategory() {
  const queryClient = useQueryClient();

  return useMutation<Subcategories, Error, Subcategories>({
    mutationFn: async (subCat) => {
      const response = await axiosInstance.put("/subcategory", subCat, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the cache for categories to refresh the list
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
export function useDeleteSubCategory() {
  const queryClient = useQueryClient(); // Used to invalidate or update cached queries

  return useMutation({
    mutationFn: (categoryId: number) => deleteSubCategory(categoryId), // Function to call when mutation is triggered
    onSuccess: () => {
      // Invalidate categories cache to refetch updated list after deletion
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      console.error("Failed to delete category:", error);
      // Handle any errors, maybe show a toast notification or alert
    },
  });
}

export function useEditCategory() {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, Category>({
    mutationFn: async (Cat) => {
      const response = await axiosInstance.put("/category", Cat, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the cache for categories to refresh the list
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient(); // Used to invalidate or update cached queries

  return useMutation({
    mutationFn: (categoryId: number) => deleteCategory(categoryId), // Function to call when mutation is triggered
    onSuccess: () => {
      // Invalidate categories cache to refetch updated list after deletion
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      console.error("Failed to delete category:", error);
      // Handle any errors, maybe show a toast notification or alert
    },
  });
}
