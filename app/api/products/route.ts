import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { productSchema } from "@/schema/order/order";
import { NextRequest, NextResponse } from "next/server";
import {
  Product,
  ProductVariant,
  getProductDataSelect,
} from "@/types/prisma-data-types";

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.product.findMany({
      select: getProductDataSelect(),
    });
    return Response.json(data);
  } catch (error) {}
}
