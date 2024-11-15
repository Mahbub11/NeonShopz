import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params: { subCategoryId } }: { params: { subCategoryId: number } }
) {
  if (!subCategoryId) {
    return new NextResponse("No data provided", { status: 400 });
  }

  try {
    const newCategory = await prisma.subCategory.delete({
      where: { id: Number(subCategoryId) },
    });

    return new NextResponse(JSON.stringify(newCategory), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch Category", { status: 500 });
  }
}
