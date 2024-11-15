'use server'
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { auth } from "@/auth";
import { ProductSchema } from "@/schema/product/product-schema";

import { revalidatePath } from "next/cache";

export const createProduct = actionClient
  .schema(ProductSchema)
  .action(async ({ parsedInput: { title, description, price, id,subcategoryId } }) => {
    try {

      const session = await auth();
      console.log(session)

      console.log(subcategoryId)
      if (id) {
        const currentProduct = await prisma.product.findFirst({
          where: {
            id:{
                equals:id
            }
          }
        });

        // if (!currentProduct) return { error: "Product not found" };

        // const editProduct = await DBInstance.update(products)
        //   .set({ description, price, title })
        //   .where(eq(products.id, id))
        //   .returning();

        // revalidatePath("/dashboard/products");
        // return { success: `Product ${editProduct[0].title} has been update` };
      }

      if (!id) {
        const newProduct = await prisma.product.create({
          data: {
              title: title,
              description: description,
              price:price,
              userId:session?.user.id!,
              stock:0,
              subcategoryId:subcategoryId!
              
          }
      });

        revalidatePath("/dashboard/products");
        return {
          success: `New Product ${newProduct.title} has been created`,
        };
      }
    } catch (error) {
      console.log(error);

      return { error: "Failed to create product" };
    }
  });
