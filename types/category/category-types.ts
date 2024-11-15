import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

const subCategorySchema = z.object({
  name: z.string().min(1, "Subcategory name is required"),
  categoryId: z.number().int().positive("Category ID must be a positive integer"),
});

export { categorySchema, subCategorySchema };
