import prisma from "@/lib/prisma";
import { CartItem } from "@/types/cart/cart-type";
import { OrderItem } from "@/types/order/order-type";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

interface OrderDataType {
  userId: string;
  items: OrderItem[];
}

export async function POST(req: Request) {
  try {
    const { userId, items }: OrderDataType = await req.json();

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    console.log(userId)

    const productIds = items.map((item: any) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true }, // Fetch necessary fields
    });

    // Create a mapping of product prices
    const priceMap = new Map(
      products.map((product) => [product.id, product.price])
    );

    // Calculate total for each order item and overall order total
    let total = 0;
    const orderItems = items.map((item) => {
      const price = priceMap.get(item.id);
      const itemTotal = (price || 0) * item.quantity; // Default to 0 if not found
      total += itemTotal; // Accumulate total price

      const orderItem = {
        productId: item.id,
        productStockId: item.stockId,
        productVariantId: item.variantId!,
        quantity: item.quantity,
      };

      return orderItem;
    });

    // Create the order with calculated total
     await prisma.order.create({
      data: {
        userId,
        total,
        status: 0,
        items: {
          create: orderItems,
        },
      },
    });

    // Successful response
    return new NextResponse(JSON.stringify(orderItems), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to save cart data", { status: 500 });
  }
}
