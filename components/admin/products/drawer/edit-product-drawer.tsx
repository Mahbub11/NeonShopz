// ProductDrawer.tsx
"use client";

import { useState, useEffect } from "react";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VariantComponent } from "./productVariant";
import { number } from "zod";
import { FullProductSchema } from "@/schema/product/product-schema";
import { useUpdateProduct } from "@/services/product/mutation";

const cachedProduct1= {
  "id": 1,
  "title": "Stylish T-Shirt",
  "description": "A comfortable and stylish t-shirt for all occasions.",
  "price": 29.99,
  "tags": ["fashion", "clothing", "t-shirts"],
  "productVariants": [
    {
      "id": 1,
      "productId": 1,
      "color": "Red",
      "images": [
        {
          "id": 1,
          "url": "https://example.com/images/red-shirt-front.jpg",
          "altText": "Front view of red t-shirt"
        },
        {
          "id": 2,
          "url": "https://example.com/images/red-shirt-back.jpg",
          "altText": "Back view of red t-shirt"
        }
      ],
      "sizes": [
        {
          "id": 1,
          "variantId": 1,
          "size": "S",
          "stock": 10
        },
        {
          "id": 2,
          "variantId": 1,
          "size": "M",
          "stock": 5
        },
        {
          "id": 3,
          "variantId": 1,
          "size": "L",
          "stock": 2
        },
        {
          "id": 4,
          "variantId": 1,
          "size": "XL",
          "stock": 0
        }
      ]
    },
    {
      "id": 2,
      "productId": 1,
      "color": "Blue",
      "images": [
        {
          "id": 3,
          "url": "https://example.com/images/blue-shirt-front.jpg",
          "altText": "Front view of blue t-shirt"
        },
        {
          "id": 4,
          "url": "https://example.com/images/blue-shirt-back.jpg",
          "altText": "Back view of blue t-shirt"
        }
      ],
      "sizes": [
        {
          "id": 5,
          "variantId": 2,
          "size": "S",
          "stock": 8
        },
        {
          "id": 6,
          "variantId": 2,
          "size": "M",
          "stock": 6
        },
        {
          "id": 7,
          "variantId": 2,
          "size": "L",
          "stock": 3
        },
        {
          "id": 8,
          "variantId": 2,
          "size": "XL",
          "stock": 1
        }
      ]
    }
  ]
}

interface VariantStock {
  id?: number; 
  size: string; 
  stock: number; 
}
interface ProductVariant {
  id: number;
  productId:number,
  sizes: VariantStock[];
  color: string;
  images: { id: number; url: string; altText: string | null }[];
}


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  variants: ProductVariant[];
}

interface ProductDrawerProps {
  productId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDrawer({
  productId,
  isOpen,
  onClose,
}: ProductDrawerProps) {
  const [formValues, setFormValues] = useState<Product>({
    id: productId,
    title: "",
    description: "",
    price: 0,
    stock: 0,
    variants: [],
  });

  const queryClient = useQueryClient();
  const { mutate: updateProduct } = useUpdateProduct();

  const cachedProducts = queryClient.getQueryData<Product[]>(["products"]);
  const cachedProduct = cachedProducts?.find(
    (product) => product.id === productId
  );

  console.log(productId)

  useEffect(() => {
    if (isOpen && cachedProduct) {
      setFormValues({
        id: cachedProduct.id,
        title: cachedProduct.title,
        description: cachedProduct.description,
        price: cachedProduct.price,
        stock: cachedProduct.variants.reduce((sum, variant) =>
          sum + variant.sizes.reduce((sizeSum, size) => sizeSum + size.stock, 0),
          0
        ),
        variants: cachedProduct.variants.map(variant => ({
          id: variant.id,
          productId: cachedProduct.id,
          sizes: variant.sizes, // Use sizes correctly
          color: variant.color,
    
          images: variant.images,
        })),
      });
    }
  }, [isOpen,cachedProducts]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value, 10) : value,
    }));
  };

 
 
  const handleSubmit = async () => {
    const parsedData = FullProductSchema.safeParse(formValues);
    if (parsedData.error) {
      console.log("we have a error");
    }
    console.log(formValues);
  //  updateProduct(formValues);

    // console.log(parsedData);

    // const response = await fetch(`/api/products/${productId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formValues),
    // });

    // if (response.ok) {
    //   onClose();
    // }
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={onClose}>
      <ScrollArea>
        <DrawerContent className="overflow-scroll h-[80%]">
          <div className="p-4 w-[90%] md:w-[80%] mx-auto">
            <DrawerClose className="mb-4">Close</DrawerClose>
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block mb-2">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  placeholder="Product Title"
                />
              </div>

              <div>
                <label htmlFor="description" className="block mb-2">
                  Description
                </label>
                <Input
                  id="description"
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  placeholder="Product Description"
                />
              </div>

              <div>
                <label htmlFor="price" className="block mb-2">
                  Price
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formValues.price}
                  onChange={handleInputChange}
                  placeholder="Product Price"
                />
              </div>

              <div>
                <label htmlFor="stock" className="block mb-2">
                  Stock
                </label>
                <Input
                  disabled
                  id="stock"
                  name="stock"
                  type="number"
                  value={formValues.stock}
                  onChange={handleInputChange}
                  placeholder="Product Stock"
                />
              </div>

              {/* Variants Section */}
              <h3 className="text-2xl font-semibold text-center">Variants</h3>
              <div className="flex space-x-8">
                {formValues.variants.map((variant) => (
                  <VariantComponent
                    key={variant.id}
                    variant={variant}
                    />
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Save Product</Button>
            </div>
          </div>
        </DrawerContent>
      </ScrollArea>
    </Drawer>
  );
}
