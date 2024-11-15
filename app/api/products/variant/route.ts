// import prisma from '@/lib/prisma';
// import { ProductVariant } from '@/types/prisma-data-types';
// import { NextApiResponse } from 'next';

// export async function PUT(req: Request, res: NextApiResponse) {

//   try {
//     // Parse the incoming JSON body
//     const data: ProductVariant = await req.json();

//     // Check if data exists
//     if (!data) {
//       return res.status(400).json({ message: 'No data provided' });
//     }

//     if (!data.id) {
//       return res.status(400).json({ message: 'Product variant ID is required' });
//     }

//     const imagesToKeepIds: number[] = data.images
//       .map((image) => image.id)
//       .filter((id): id is number => id !== undefined); // Ensure non-undefined IDs

//     const sizesToKeepIds: number[] = data.sizes
//       .map((size) => size.id)
//       .filter((id): id is number => id !== undefined); // Ensure non-undefined IDs

//     // Start a transaction to handle all operations
//     const result = await prisma.$transaction([
//       // 1. Update the product variant
//       prisma.productVariant.update({
//         where: { id: data.id },
//         data: {
//           color: data.color,
//         },
//       }),

//       // 2. Delete images that are no longer in the update
//       prisma.image.deleteMany({
//         where: {
//           variantId: data.id,
//           id: { notIn: imagesToKeepIds },
//         },
//       }),

//       // 3. Upsert images (update existing or create new)
//       ...data.images.map((image) =>
//         prisma.image.upsert({
//           where: { id: image.id || 0 },
//           update: {
//             url: image.url,
//             altText: image.altText,
//           },
//           create: {
//             url: image.url,
//             altText: image.altText,
//             variantId: data.id,
//           },
//         })
//       ),

//       // 4. Delete sizes that are no longer in the update
//       prisma.variantStock.deleteMany({
//         where: {
//           variantId: data.id,
//           id: { notIn: sizesToKeepIds },
//         },
//       }),

//       // 5. Upsert sizes (update existing or create new)
//       ...data.sizes.map((size) =>
//         prisma.variantStock.upsert({
//           where: { id: size.id || 0 },
//           update: {
//             size: size.size,
//             stock: size.stock,
//           },
//           create: {
//             size: size.size,
//             stock: size.stock,
//             variantId: data.id,
//           },
//         })
//       ),
//     ]);

//     // Return success response
//     return res.status(200).json({ message: 'Product variant updated successfully' });

//   } catch (error) {
//     console.error('Error updating product variant:', error);
//     return res.status(500).json({ message: 'Error updating product variant' });
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // Adjust the import based on your Prisma setup
import { NextResponse } from "next/server";
import { ProductVariant } from "@/types/prisma-data-types";

export async function POST(req: Request, res: NextApiResponse) {
  const data: Omit<ProductVariant, "id"> = await req.json();
  const { color,colorName, images, sizes, productId } = data;

  // Check if data exists
  if (!data) {
    return new NextResponse("No data provided", { status: 400 });
  }


  if (!images || !productId) {
    return new NextResponse("Missing Required Filed", { status: 400 });
  }

  try {
    // Use a transaction to ensure atomicity
    const result = await prisma.$transaction(async (prisma) => {
      const productVariant = await prisma.productVariant.create({
        data: {
          color,
          colorName,
          product: {
            connect: { id: productId },
          },
          sizes: {
            create: sizes.map((size: { size: string; stock: number }) => ({
              size: size.size,
              stock: size.stock,
            })),
          },
          images: {
            create: images.map(
              (image: { url: string; altText: string | null }) => ({
                url: image.url,
                altText: image.altText,
              })
            ),
          },
        },
      });
      return productVariant;
    });

    return new NextResponse("Created", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch listings", { status: 500 });
  }
}

export async function PUT(req: Request, res: NextApiResponse) {
  const data: ProductVariant = await req.json();
  const { id, productId,colorName, sizes, color, images } = data;

  if (!id || !productId || !sizes || !color || !images) {
    return new NextResponse("Missing Required Field", { status: 400 });
  }

  try {
    // Start a transaction to ensure atomicity
    const result = await prisma.$transaction(async (prisma) => {
      // Update the product variant
      const variant = await prisma.productVariant.update({
        where: { id },
        data: {
          color,
         colorName,
          // Handle sizes
          sizes: {
            deleteMany: {}, // Remove all existing sizes (consider optimizing this)
            create: sizes.map((size) => ({
              size: size.size,
              stock: size.stock,
            })),
          },
          // Handle images
          images: {
            deleteMany: {}, // Remove all existing images (consider optimizing this)
            create: images.map((image) => ({
              url: image.url,
              altText: image.altText || null,
            })),
          },
        },
      });
    });

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed toUpdate", { status: 500 });
  }
}
