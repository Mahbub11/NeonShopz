import { string, z } from "zod";

export const  ProductSchema = z.object({
     id: z.number().optional(),
    title: z.string().min(2, { message: "Name must be at least 2 characters" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters" }),
    price:  z.coerce.number().positive("Price must be a positive number"),
    subcategoryId: z.string().transform((val) => {
    const num = Number(val);
    if (isNaN(num)) {
      throw new Error("subcategoryId must be a valid number");
    }
    return num; // Transform the string to a number
  }).optional(),
  })
  export type ProductSchema = z.infer<typeof ProductSchema>


export const imageSchema = z.object({
  id: z.number(),
  url: z.string().url(),
  altText: z.string().nullable(),
});

export const variantSchema = z.object({
  id: z.number(),
  size: z.string().nullable(),
  color: z.string(),
  stock: z.number().min(0),
  images: z.array(imageSchema),
});

export const FullProductSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().min(0),
  variants: z.array(variantSchema).min(1),
});