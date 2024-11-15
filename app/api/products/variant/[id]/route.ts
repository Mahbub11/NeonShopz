import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: number } }
) {
  if (!id) {
    return new NextResponse("No data provided", { status: 400 });
  }

  try {
    const newProductVariants = await prisma.productVariant.delete({
      where: { id: Number(id) },
    });

    return new NextResponse(JSON.stringify(newProductVariants), { status: 200 });
  } catch (error) {
    return new NextResponse("Product Variant Delete Failed!", { status: 500 });
  }
}
