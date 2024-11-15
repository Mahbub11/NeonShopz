import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import ProductImageSlider from "./product-image-slider";
import { Product, ProductVariantImage } from "@/types/prisma-data-types";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || '');
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.sizes[0]?.size || '');
  const [displayedImages, setDisplayedImages] = useState<ProductVariantImage[]>([]);

  const selectedVariant = product.variants.find((variant) => variant.color === selectedColor);

  // Price calculations
  const originalPrice = product.price;
  const discountPrice = originalPrice - originalPrice * 0.3; // Example discount logic
  const subtotal = quantity * discountPrice;

  // Handlers
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const variant = product.variants.find((v) => v.color === color);
    if (variant) {
      setDisplayedImages(variant.images);
      setSelectedSize(variant.sizes[0]?.size || ''); // Reset to the first available size
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    // Update displayed images when the color changes
    const variant = product.variants.find((v) => v.color === selectedColor);
    if (variant) {
      setDisplayedImages(variant.images);
      setSelectedSize(variant.sizes[0]?.size || ''); // Reset to the first available size
    }
  }, [selectedColor]);

  useEffect(() => {
    // Initialize displayed images on mount
    if (product.variants.length > 0) {
      const initialVariant = product.variants[0];
      setSelectedColor(initialVariant.color);
      setDisplayedImages(initialVariant.images);
      setSelectedSize(initialVariant.sizes[0]?.size || ''); // Reset to the first available size
    }
  }, [product]);

  return (
    <div className="flex space-x-10">
      <div>
        <ProductImageSlider data={displayedImages} />
      </div>
      <div className="bg-white p-3">
        <h2 className="text-lg font-bold">{product.title}</h2>
        <div className="mt-5">
          <p>Product Type: {product.subcategory.name}</p>
        </div>
        <p className="text-xl font-semibold mt-5">
          ${discountPrice.toFixed(2)}{" "}
          <span className="line-through text-gray-500">
            ${originalPrice.toFixed(2)}
          </span>
        </p>

        {/* Size Selection */}
        {selectedVariant && selectedVariant.sizes.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Size:</h3>
            <div className="flex space-x-2 mt-3">
              {selectedVariant.sizes.map((size) => (
                <button
                  key={size.id}
                  className={`border p-3 rounded hover:bg-gray-200 ${
                    selectedSize === size.size ? "bg-gray-300" : ""
                  }`}
                  onClick={() => handleSizeChange(size.size)}
                >
                  {size.size}
                </button>
              ))}
            </div>
            <p className="mt-2">
              Available Stock: {selectedVariant.sizes.find((s) => s.size === selectedSize)?.stock || 0}
            </p>
          </div>
        )}

        {/* Color Selection */}
        {product.variants.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Color:</h3>
            <div className="flex space-x-2 mt-3">
              {product.variants.map((variant) => (
                <div
                  key={variant.id}
                  className={`w-6 h-6 rounded-full cursor-pointer border ${
                    selectedColor === variant.color
                      ? "border-gray-500"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: variant.color }}
                  onClick={() => handleColorChange(variant.color)}
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selection */}
        <div className="mt-4">
          <h3 className="font-semibold">Quantity:</h3>
          <div className="flex items-center space-x-5 mt-3 border-2 rounded-full w-min py-1 px-5">
            <button onClick={handleDecrease} className="font-bold">
              <MinusIcon size={15} />
            </button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>
              <PlusIcon size={15} />
            </button>
          </div>
          <p className="mt-2 font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
