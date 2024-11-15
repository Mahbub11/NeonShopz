"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DeleteImage,
  UploadImage,
  useCreateProductStock,
} from "@/services/product/mutation";
import { ProductVariant } from "@/types/prisma-data-types";

interface Image {
  id?: number;
  url: string;
  altText: string | null;
}

interface VariantStock {
  id?: number;
  size: string;
  stock: number;
}

interface AddStockModalProps {
  productId: number;
  onClose: () => void;
}

export function AddStockModal({ productId, onClose }: AddStockModalProps) {
  const [localVariant, setLocalVariant] = useState<Omit<ProductVariant, "id">>({
    productId: productId,
    color: "",
    colorName: "",
    images: [],
    sizes: [],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const mutation = useCreateProductStock();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalVariant((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await UploadImage(file);
    setLocalVariant((prev) => ({
      ...prev,
      images: [...prev.images, { url: imageUrl, altText: null }],
    }));
    setImageFile(null);
  };

  const handleRemoveImage = async (imageUrl: string) => {
    const getImage = localVariant.images.find(
      (image) => image.url === imageUrl
    );
    if (!getImage) return;

    await DeleteImage(getImage.url).then(() => {
      setLocalVariant((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img.url !== imageUrl),
      }));
    });
  };

  const handleAddSize = () => {
    setLocalVariant((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size: "", stock: 0 }],
    }));
  };

  const handleRemoveSize = (index: number) => {
    setLocalVariant((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  const handleSizeChange = (
    index: number,
    field: "size" | "stock",
    value: string | number
  ) => {
    setLocalVariant((prev) => {
      const sizes = [...prev.sizes];
      sizes[index] = { ...sizes[index], [field]: value };
      return { ...prev, sizes };
    });
  };

  const handleCreateVariant = () => {
    mutation.mutate(localVariant, {
      onSuccess: () => {
        console.log("Variant created successfully");
        // Optionally, reset the form or redirect
      },
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Stock</DialogTitle>
          <DialogDescription>
            Please specify the stock details for the variant.
          </DialogDescription>
        </DialogHeader>
        <div className="p-2 mb-2 rounded border-4 border-b-blue-300 w-full">
          <div>
            <label htmlFor="color" className="block mb-1">
              Color
            </label>
            <Input
              type="color"
              id="color"
              name="color"
              value={localVariant.color}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="cname" className="block mb-1">
              Color Name
            </label>
            <Input
              type="text"
              id="cname"
              name="colorName"
              value={localVariant.colorName}
              onChange={handleInputChange}
            />
          </div>

          {/* Sizes Section */}
          <h4 className="text-md font-semibold mt-4">Sizes</h4>
          {localVariant.sizes.map((size, index) => (
            <div key={index} className="flex items-center mb-2">
              <Input
                value={size.size}
                placeholder="Size (e.g., S, M, L)"
                onChange={(e) =>
                  handleSizeChange(index, "size", e.target.value)
                }
                className="mr-2"
              />
              <Input
                type="number"
                value={size.stock}
                placeholder="Stock"
                onChange={(e) =>
                  handleSizeChange(index, "stock", parseInt(e.target.value, 10))
                }
                className="mr-2"
              />
              <Button
                variant="destructive"
                onClick={() => handleRemoveSize(index)}
              >
                Remove Size
              </Button>
            </div>
          ))}
          <Button onClick={handleAddSize} className="mt-2">
            Add Size
          </Button>

          {/* Image Section */}
          <h4 className="text-md font-semibold mt-4">Images</h4>
          <div className="flex flex-wrap gap-10">
            {localVariant.images.map((image, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center justify-between">
                  <img
                    src={image.url}
                    alt={image.altText || "Variant image"}
                    className="w-20 h-20 object-cover"
                  />
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveImage(image.url)}
                  >
                    Delete
                  </Button>
                </div>
                <label htmlFor={`altText-${index}`} className="block mt-2">
                  Alt Text
                </label>
                <Input
                  id={`altText-${index}`}
                  value={image.altText || ""}
                  onChange={(e) => {
                    const { value } = e.target;
                    setLocalVariant((prev) => {
                      const updatedImages = prev.images.map((img, idx) =>
                        idx === index ? { ...img, altText: value } : img
                      );
                      return { ...prev, images: updatedImages };
                    });
                  }}
                />
              </div>
            ))}
          </div>

          {/* Image upload input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2"
          />
          {imageFile && <p>Selected file: {imageFile.name}</p>}

          <Button onClick={handleCreateVariant} className="mt-2">
            Create Variant
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
