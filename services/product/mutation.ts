import axiosInstance from "@/lib/axiosInstance";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabaseClient";
import { Product, ProductVariant } from "@/types/prisma-data-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function UploadImage(file: File) {
  // Generate file name and get file extension
  const fileName = Date.now().toString();
  const fileExt = file.name.split(".").pop();

  // Upload image to Supabase
  const { error: uploadError, data } = await supabase.storage
    .from("propertyImages")
    .upload(`${fileName}.${fileExt}`, file, {
      contentType: `image/${fileExt}`,
      upsert: false,
    });

  // Handle upload error
  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    throw new Error("Failed to upload image");
  }

  // Construct image URL
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${fileName}.${fileExt}`;

  console.log("Uploaded...");

  return imageUrl;
}

export async function DeleteImage(URL: string) {
  const urlParts = URL.split("/");
  const lastSegment = urlParts[urlParts.length - 1];
  const { data, error } = await supabase.storage
    .from("propertyImages")
    .remove([`${lastSegment}`]);

  if (error) {
    console.log(error);
  }

  console.log("Image deleted...");
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: async (updatedProduct: Product): Promise<Product> => {
      const response = await axiosInstance.post("/products", updatedProduct);

      // fetch(`/api/products`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updatedProduct),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to update the product');
      // }

      const data = await response.data;
      return data as Product;
    },
    onSuccess: (data) => {
      // Invalidate the cache for the products to refresh the list
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProductVariant() {
  const queryClient = useQueryClient();

  return useMutation<ProductVariant, Error, ProductVariant>({
    mutationFn: async (
      updatedProduct: ProductVariant
    ): Promise<ProductVariant> => {
      const response = await axiosInstance.put(
        "/products/variant",
        updatedProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      return data as ProductVariant;
    },
    onSuccess: (data) => {
      // Invalidate the cache for the products to refresh the list
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useCreateProductStock() {
  const queryClient = useQueryClient();

  return useMutation<
    Omit<ProductVariant, "id">,
    Error,
    Omit<ProductVariant, "id">
  >({
    mutationFn: async (
      createProductVariant: Omit<ProductVariant, "id">
    ): Promise<ProductVariant> => {
      const response = await axiosInstance.post(
        "/products/variant",
        createProductVariant,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      return data as ProductVariant;
    },
    onSuccess: (data) => {
      // Invalidate the cache for the products to refresh the list
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
export function useDeleteVariant() {
  const queryClient = useQueryClient(); // Used to invalidate or update cached queries

  return useMutation({
    mutationFn: async (variantId: number): Promise<void> => {
      await axiosInstance.delete(`/products/variant/${variantId}`);
    },
    onSuccess: () => {
      // Invalidate the cache for the products to refresh the list
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
