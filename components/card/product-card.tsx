import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { satoshi } from "@/public/fonts";
import { Button } from "../ui/button";
import { Product } from "@/types/prisma-data-types";
import useCartStore from "@/store/cart-slice";
import Link from "next/link";
import { CartItem } from "@/types/cart/cart-type";
import { EyeIcon, Heart, PlusIcon, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCardView: React.FC<ProductCardProps> = ({
  product,
  className,
}) => {
  const { addToCart } = useCartStore();

  // Check if product has variants
  const hasVariants = product.variants.length > 0;
  const initialColor = hasVariants ? product.variants[0].color : ""; // Default to an empty string if no variants

  const [selectedColor, setSelectedColor] = useState<string>(initialColor);
  const [hoveredImage, setHoveredImage] = useState<string>(""); // Track hovered image URL
  const [displayedImages, setDisplayedImages] = useState<string[]>(
    hasVariants ? product.variants[0].images.map((img) => img.url) : []
  );

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const selectedVariant = product.variants.find(
      (variant) => variant.color === color
    );
    if (selectedVariant) {
      setDisplayedImages(selectedVariant.images.map((img) => img.url));
    }
  };

  const handleQuickAdd = () => {
    const cartData: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price - product.price * 0.3, // Example discount logic
      quantity: 1,
      variantId: product.variants[0].id,
      stockId: product.variants[0].sizes[0].id,
      size: product.variants[0]?.sizes[0]?.size || undefined,
      color: selectedColor || undefined,
      colorName: selectedColor || undefined, // Store colorName as well
    };

    addToCart(cartData);
  };
  const handleImageHover = () => {
    // Find all variants except for the currently selected one
    const availableVariants = product.variants.filter(
      (variant) => variant.color !== selectedColor
    );

    // Pick a random variant (excluding the selected one)
    const randomVariant =
      availableVariants[Math.floor(Math.random() * availableVariants.length)];

    if (randomVariant) {
      // Set the image from the random variant (e.g., second image if it exists)
      setHoveredImage(
        randomVariant.images[1]?.url || randomVariant.images[0].url
      );
    }
  };

  const handleImageLeave = () => {
    setHoveredImage(""); // Reset to default image when hover leaves
  };

  return (
    <div className="flex justify-center relative w-full items-center overflow-visible font-ppl text-gray-700">
      <div>
        <div className="relative overflow-hidden group">
          <div className="w-full flex justify-between absolute top-5 z-10">
            <div className="bg-transparent backdrop-blur-md px-3 py-1 rounded-r-sm"></div>
            <div
              className="bg-transparent/30 
            transform translate-x-[120px]
            group-hover:translate-x-[2px] transition-all
             duration-500 backdrop-blur-md px-3 py-3 rounded-l-sm flex-col space-y-5"
            >
              <Heart stroke="#FFFF" size={20} />
              <EyeIcon stroke="#FFFF" size={20} />
            </div>
          </div>

          {/* Show hovered image or default image */}
          <Image
            priority
            className={cn(
              "h-full cursor-pointer transition-all duration-500 ease-in-out group-hover:scale-105",
              className
            )} // Apply transition to image
            src={hoveredImage || displayedImages[0]} // If hoveredImage is set, use it; otherwise, show the first image
            alt={product.title}
            width={200}
            height={100}
            onMouseEnter={handleImageHover} // Change the image on hover (for variant)
            onMouseLeave={handleImageLeave} // Reset image when hover leaves
          />

          <div
            onClick={handleQuickAdd}
            className=" transform translate-y-full
            group-hover:translate-y-[-55px] transition-all duration-500 absolute
            w-full flex justify-between pointer-events-auto cursor-pointer"
          >
            <div
              className="h-[3.5rem] tracking-wider w-full uppercase text-[25px]
                  font-[700] py-3 text-white bg-black/80 flex justify-center items-center"
            >
              Quick Add
            </div>
          </div>
        </div>

        <div className="px-4 py-3">
          <Link href={`/product/${product.id}?id=${product.id}`}>
            <h3
              className="text-center text-gray-600 tracking-wide font-[500] uppercase
            line-clamp-1"
            >
              {product.title}
            </h3>
            <p className="line-clamp-2 font-ppl text-[13px] font-[500] mt-3 text-black">
              {product.description}
            </p>
          </Link>

          <div className="flex text-center justify-center w-full mt-2">
            <p className="text-gray-500 line-through mr-2 text-[14px] mt-[2px]">
              ${product.price + 30}
            </p>{" "}
            <p className="text-gray-800 font-bold">${product.price}</p>
          </div>

          {/* Color variants */}
          {hasVariants && (
            <div className="mt-4 flex justify-center">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  className={`w-5 h-5 rounded-full border-2 mx-1 ${
                    selectedColor === variant.color
                      ? "border-gray-500"
                      : "border-gray-200"
                  }`}
                  style={{ backgroundColor: variant.color }}
                  onClick={() => handleColorChange(variant.color)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardView;
