import prisma from "@/lib/prisma";
import { CartItem } from "@/types/cart/cart-type";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

interface CartDataType {
  userId: string;
  items: CartItem[];
}

export async function POST(req: Request) {
  try {
    const { userId, items }: CartDataType = await req.json();

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {
        items: {
          deleteMany: {}, // Clear existing items if updating
          create: items.map((item) => ({
            product: {
              connect: { id: item.id }, // Connect to the existing Product
            },
            quantity: item.quantity,
            productVariant: {
              connect: { id: item.variantId }, // Connect to the product variant if it exists
            },
            variantStock: {
              connect: { id: item.stockId }, // Connect to the product stock if it exists
            },
          })),
        },
      },
      create: {
        userId,
        items: {
          create: items.map((item) => ({
            product: {
              connect: { id: item.id }, // Connect to the existing Product
            },
            quantity: item.quantity,
            productVariant: {
              connect: { id: item.variantId }, // Connect to the product variant if it exists
            },
            variantStock: {
              connect: { id: item.stockId }, // Connect to the product stock if it exists
            },
          })),
        },
      },
    });

    // Successful response
    return new NextResponse(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to save cart data", { status: 500 });
  }
}
