import { z } from 'zod';


export const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().optional(),
    price: z.number().positive('Price must be a positive number'),
    stock: z.number().int().min(0, 'Stock must be at least 0'),
  });
  
  export type ProductType = z.infer<typeof productSchema>;
export const orderSchema = z.object({
  userId: z.number().int(),
  products: z.array(productSchema),
  createdAt: z.date().optional(),
});

export type OrderType = z.infer<typeof orderSchema>;
