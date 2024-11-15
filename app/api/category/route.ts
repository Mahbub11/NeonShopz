import prisma from "@/lib/prisma";
import { Category, getCategory } from "@/types/prisma-data-types";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  const data: Omit<Category, "id"> = await req.json();

  if (!data) {
    return new NextResponse("No data provided", { status: 400 });
  }
  const { name } = data;
  if (!data) {
    return new NextResponse("missing Data", { status: 400 });
  }
  const newCategory = await prisma.category.create({
    data: {
      name: data.name,
    },
  });

  return res.status(201).json(newCategory);

  // Check if data exists
}

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const data = await prisma.category.findMany({
      select: getCategory(),
    });
    return Response.json(data);
  } catch (error) {
    return new NextResponse("Failed to fetch Category", { status: 500 });
  }
}

export async function PUT(req: Request, res: NextApiResponse) {
  const data: Category = await req.json();

  if (!data) {
    return new NextResponse("No data provided", { status: 400 });
  }
  const { name, id } = data;
  if (!data) {
    return new NextResponse("missing Data", { status: 400 });
  }

  try {
    const newCategory = await prisma.category.update({
      data: {
        name: name,
      },
      where: { id: id },
    });

    return new NextResponse(JSON.stringify(newCategory), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to Update Category", { status: 500 });
  }
}
