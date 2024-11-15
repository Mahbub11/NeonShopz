import { Prisma } from "@prisma/client";

export function getProductDataSelect() {
  return {
    id: true,
    title: true,
    description: true,
    price: true,
    stock: true,
    subcategory:{
      select: {
        id: true,
        name: true,
        categoryId:true
      },
    },
    variants: {
      select: {
        id: true,
        color: true,
        colorName:true,
        productId:true,
        sizes: {
          select: {
            id: true,
            size: true,
            stock: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            altText: true,
          },
        },
      },
    },
    tags: {
      select: {
        id: true,
        name: true,
      },
    },
    productTag: {
      select: {
        tagId: true,
      },
    },
  } satisfies Prisma.ProductSelect;
}

export function getCategory() {
  return {
    id: true,
    name: true,
    subcategories: {
      select: {
        id: true,
        name: true,
      },
    },
  };
}

export interface Subcategories {
  id: number;
  categoryId:number,
  name: string;
}

export interface CategoryData{
  id: number;
  name: string;
  subcategories: Subcategories[];
}

export interface ProductVariantImage {
  id?: number;
  url: string;
  altText: string | null;
}

export interface VariantStock {
  id?: number;
  size: string;
  stock: number;
}
export interface ProductVariant {
  id: number;
  productId: number;
  sizes: VariantStock[];
  color: string;
  colorName:string,
  images: ProductVariantImage[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  variants: ProductVariant[];
  subcategory:Subcategories
}

export interface Category {
  id: number;
  name: string;
}
