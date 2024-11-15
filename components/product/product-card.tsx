import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { satoshi } from "@/public/fonts";
import { Button } from "../ui/button";
import ProductViewQuick from "./product-quick-view";
import { Product } from "@/types/prisma-data-types";
import useCartStore from "@/store/cart-slice";
import Link from "next/link";
import { CartItem } from "@/types/cart/cart-type";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();

  // Check if product has variants
  const hasVariants = product.variants.length > 0;
  const initialColor = hasVariants ? product.variants[0].color : ''; // Default to an empty string if no variants

  const [selectedColor, setSelectedColor] = useState<string>(initialColor);
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
      size: product.variants[0]?.sizes[0]?.size ||undefined,
      color: selectedColor ||undefined,
      colorName: selectedColor || undefined, // Store colorName as well
    };


    addToCart(cartData);
  };

  return (
    <div className={cn([satoshi.className])}>
      <div className="flex justify-center items-center overflow-visible">
        <motion.div
          className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden"
          whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative overflow-hidden group">
            {displayedImages.length > 0 && (
              <Image
                className="h-[12rem] w-[20rem] rounded-md transition-transform duration-500 group-hover:scale-105"
                src={displayedImages[0]} // Display the first image of the selected color
                alt={product.title}
                width={200}
                height={100}
              />
            )}

            <div className="absolute inset-0 w-full h-full flex justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
              <ProductViewQuick product={product} />
            </div>
          </div>

          <div className="px-4 py-3">
            <Link href={`/product/${product.id}?id=${product.id}`}>
              <h3 className="text-lg font-semibold">{product.title}</h3>
            </Link>

            <div className="flex items-baseline mt-2">
              <p className="text-gray-500 line-through mr-2">
                ${product.price + 30}
              </p>{" "}
              <p className="text-red-500 font-bold">${product.price}</p>
            </div>

            {hasVariants && (
              <div className="flex mt-4">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`w-8 h-8 rounded-full border-2 mx-1 ${
                      selectedColor === variant.color
                        ? "border-gray-500"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: variant.color }}
                    onClick={() => handleColorChange(variant.color)}
                  />
                ))}
              </div>
            )}

            <Button
              variant="ghost"
              className="rounded-full mt-8 w-full border border-black hover:bg-blue-400 hover:text-white"
              onClick={handleQuickAdd}
            >
              Quick Add
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCard;
