"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DeleteImage,
  UploadImage,
  useDeleteVariant,
  useUpdateProductVariant,
} from "@/services/product/mutation";

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

interface ProductVariant {
  id: number;
  productId: number;
  color: string;
  images: Image[];
  sizes: VariantStock[];
}

export function VariantComponent({ variant }: { variant: ProductVariant }) {
  const [localVariant, setLocalVariant] = useState<ProductVariant>(variant);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const mutation = useUpdateProductVariant();
  const deleteMutation=useDeleteVariant()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalVariant((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleRemoveImage = async (imageId: string) => {
    const getImage = localVariant.images.find((image) => image.url === imageId);
    if (!getImage) return;

    await DeleteImage(getImage.url).then(() => {
      setLocalVariant((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img.url !== imageId),
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

  const handleDeleteVariant = () => {
    // Implement variant deletion logic here
    deleteMutation.mutate(localVariant.id, {
      onSuccess: () => {

        console.log(variant)
        setLocalVariant(variant);
        console.log("Variant deleted successfully");
      },
    });
    
  };

  const handleSave = () => {
    // mutation.mutate(localVariant, {
    //   onSuccess: () => {
    //     console.log("Variant updated successfully");
    //   },
    // });
  };

  return (
    <div className="p-2 mb-2 rounded border-4 border-b-blue-300 w-[40%]">
      <div>
        <label htmlFor={`color-${localVariant.id}`} className="block mb-1">
          Color
        </label>
        <Input
          type="color"
          id={`color-${localVariant.id}`}
          name="color"
          value={localVariant.color}
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
            onChange={(e) => handleSizeChange(index, "size", e.target.value)}
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
        {localVariant.images.map((image) => (
          <div key={image.id} className="mb-2">
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
            <label
              htmlFor={`altText-${localVariant.id}-${image.id}`}
              className="block mt-2"
            >
              Alt Text
            </label>
            <Input
              id={`altText-${localVariant.id}-${image.id}`}
              value={image.altText || ""}
              onChange={(e) => {
                const { value } = e.target;
                setLocalVariant((prev) => {
                  const updatedImages = prev.images.map((img) =>
                    img.id === image.id ? { ...img, altText: value } : img
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

      <Button onClick={handleDeleteVariant} className="mt-2">
        Delete Variant
      </Button>
      <Button onClick={handleSave} className="mt-2">
        Update Variant
      </Button>
    </div>
  );
}
