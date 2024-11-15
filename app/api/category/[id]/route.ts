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
    const newCategory = await prisma.category.delete({
      where: { id: Number(id) },
    });

    return new NextResponse(JSON.stringify(newCategory), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch Category", { status: 500 });
  }
}
