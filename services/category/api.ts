import axiosInstance from "@/lib/axiosInstance";
import { CategoryData, Subcategories } from "@/types/prisma-data-types";

export const getCategories = async (): Promise<CategoryData[]> => {
    console.log('Fetching posts with cursor:'); // Debug log
    const response = await axiosInstance.get<CategoryData[]>('/category');
    return response.data;
  };

  export const createSubCategory = async (): Promise<Omit<Subcategories, "id">> => {
    const response = await axiosInstance.get<Subcategories>('/subcategory');
    return response.data;
  };

  export async function deleteSubCategory(subCategoryId: number): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/subcategory/${subCategoryId}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error; // Re-throw the error so it can be caught in the useMutation onError
    }
  }


  export async function deleteCategory(CategoryId: number): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/category/${CategoryId}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error; // Re-throw the error so it can be caught in the useMutation onError
    }
  }