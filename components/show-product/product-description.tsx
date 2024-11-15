"use client";

import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  Share2,
  ShareIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Product, ProductVariantImage } from "@/types/prisma-data-types";
import ProductImageShowcase from "./image-carosol";
import { useSearchParams } from "next/navigation";
import useCartStore from "@/store/cart-slice";
import { CartItem } from "@/types/cart/cart-type";
import ProductDesTab from "./product-des-tab";
import { useGetProducts } from "@/services/product/queries";
import { RelatedProductCarosol } from "../carosol/related-product-carosl";

interface ProductDetailProps {
  product: Product;
}

const ProductShowCase: React.FC<ProductDetailProps> = ({ product }) => {
  const searchParams = useSearchParams();
  const { addToCart } = useCartStore();
  const { data, isLoading } = useGetProducts();

  const initialColor =
    searchParams.get("color") || product.variants[0]?.colorName || "";
  const initialSize =
    searchParams.get("size") || product.variants[0]?.sizes[0]?.size || "";

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [displayedImages, setDisplayedImages] = useState<ProductVariantImage[]>(
    []
  );

  const selectedVariant = product.variants.find(
    (variant) => variant.colorName === selectedColor
  );

  useEffect(() => {
    if (selectedVariant) {
      setDisplayedImages(selectedVariant.images);
      setSelectedSize(selectedVariant.sizes[0]?.size || ""); // Default to first available size
    } else if (product.variants.length > 0) {
      const firstVariant = product.variants[0];
      setSelectedColor(firstVariant.colorName);
      setDisplayedImages(firstVariant.images);
      setSelectedSize(firstVariant.sizes[0]?.size || ""); // Default to first available size
    }
  }, [selectedColor, selectedVariant, product]);

  useEffect(() => {
    const color = searchParams.get("color");
    const size = searchParams.get("size");

    if (color && color !== selectedColor) {
      setSelectedColor(color);
    }
    if (size && size !== selectedSize) {
      setSelectedSize(size);
    }
  }, [searchParams]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    const availableStock =
      selectedVariant?.sizes.find((s) => s.size === selectedSize)?.stock || 0;
    if (quantity < availableStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleColorChange = (color: string, colorName: string) => {
    setSelectedColor(colorName);
    updateUrl(colorName, selectedSize); // Update URL with colorName
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    updateUrl(selectedColor, size);
  };

  const updateUrl = (color: string, size: string) => {
    const newUrl = `/product/${product.id}?color=${color}&size=${size}`;
    window.history.pushState({}, "", newUrl); // Update the URL
  };

  const handleAddToCart = () => {
    const selectedStock = selectedVariant?.sizes.find(
      (s) => s.size === selectedSize
    );
    const cartData: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price - product.price * 0.3, // Example discount logic
      quantity: quantity,
      variantId: selectedVariant?.id,
      stockId: selectedStock?.id,
      size:
        selectedVariant && selectedVariant.sizes.length > 0
          ? selectedSize
          : undefined,
      color: selectedVariant?.color,
      colorName: selectedColor, // Store colorName as well
    };

    addToCart(cartData);
  };

  const subtotal = quantity * (product.price - product.price * 0.3); // Example discount logic

  if (isLoading && !data) {
    return <h1>Loading...</h1>;
  }
  if (!data) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div
        className="justify-between flex flex-col lg:flex-row gap-4
     lg:gap-12 bg-white py-5 text-[15px]"
      >
        <div className="flex-1">
          <ProductImageShowcase variants={displayedImages} />
        </div>
        <div className="md:p-3 flex-1">
          <div>
            <h2 className="text-lg font-bold font-gvf text-[24px]">
              {product.title}
            </h2>
            <p className="font-ppl mt-5 text-[15px]">{product.description}</p>
            <div className="mt-5 flex-col space-y-[5px]">
              <p>Vendor: Collette</p>
              <p>Product Type: {product.subcategory.name}</p>
              <p>
                Available Stock:{" "}
                {selectedVariant?.sizes.find((s) => s.size === selectedSize)
                  ?.stock || 0}
              </p>
            </div>
            <p className="text-[20px] font-[800] mt-5 font-gvf">
              ${(product.price - product.price * 0.3).toFixed(2)}{" "}
              <span className="line-through text-gray-500 text-[15px]">
                ${product.price.toFixed(2)}
              </span>
            </p>

            {product.variants.length > 0 ? (
              <div className="mt-4 ">
                <div className="flex space-x-3">
                  <h3 className="font-[500]">Color:</h3>
                  <h3 className="uppercase">{selectedVariant?.colorName}</h3>
                </div>
                <div className="flex space-x-2 mt-2">
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className={`w-6 h-6 rounded-full cursor-pointer border ${
                        selectedColor === variant.colorName
                          ? "border-gray-500"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: variant.color }}
                      onClick={() =>
                        handleColorChange(variant.color, variant.colorName)
                      } // Pass both color and colorName
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-4 text-gray-500">No colors available.</p>
            )}

            {selectedVariant && selectedVariant.sizes.length > 0 ? (
              <div className="mt-4">
                <h3>Size:</h3>
                <div className="flex space-x-3 mt-2">
                  {selectedVariant.sizes.map((size) => (
                    <button
                      key={size.id}
                      className={`border p-3 h-[3rem] w-[2.5rem]  ${
                        selectedSize === size.size ? "border-black" : ""
                      }`}
                      onClick={() => handleSizeChange(size.size)}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-4 text-gray-500">No sizes available.</p>
            )}

            {/* Quantity Selection */}
            <div className="mt-4">
              <h3 className="">Quantity:</h3>
              <div
                className="flex justify-between space-x-5 mt-2 border-[1.8px]
                   w-[10rem] py-4 px-5"
              >
                <button onClick={handleDecrease} className="font-[800]">
                  <MinusIcon size={15} />
                </button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}>
                  <PlusIcon size={15} />
                </button>
              </div>
              <p className="mt-2 font-gvf font-[700]">
                Subtotal: ${subtotal.toFixed(2)}
              </p>

              <div className="flex sm:space-x-3 md:space-x-5 md:items-center">
                <div className=" overflow-hidden group mt-5">
                  <button
                    onClick={handleAddToCart}
                    className="bg-black/90 w-[15rem] relative px-5 py-3 font-[400]
                   overflow-hidden group border-black border-[1.8px]"
                  >
                    <span
                      className="group-hover:text-black font-gvf font-[700] tracking-wider
                 relative z-10 text-white uppercase"
                    >
                      Add to cart
                    </span>
                    {/* Pseudo-element for filling effect */}
                    <span
                      className="absolute inset-0 bg-white group-hover:w-full 
                    transition-all duration-700 w-0"
                    ></span>
                  </button>
                </div>

                <div className="group sm:w-fit">
                  <div
                    className="sm:px-3 md:px-[10px] cursor-pointer
                group-hover:bg-black/95
                transition-all duration-700 sm:py-3 md:py-[10px] border-[1.8px] rounded-full mt-4"
                  >
                    <HeartIcon
                      className="group-hover:text-white
                transition-all duration-700 h-7 w-7"
                      strokeWidth="1.5"
                    ></HeartIcon>
                  </div>
                </div>

                <div className="mt-4 sm:mt-7">
                  <Share2 strokeWidth="1.5" size={30}></Share2>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-6 mt-10 font-ppl">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-gvf text-[20px] font-[700] text-gray-800">
                      Free Shipping
                    </h3>
                    <p className="text-gray-600">
                      Free standard shipping on orders over $99
                    </p>
                    <p className="text-sm text-gray-500">
                      Estimated to be delivered on 12/01/2022 - 15/10/2022.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-gvf text-[20px] font-[700] text-gray-800">
                      Free Returns
                    </h3>
                    <p className="text-gray-600">Learn More.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ProductDesTab></ProductDesTab>
      </div>

      <div className="mt-10 h-full sm:w-[20rem]">
        <h2 className="text-[25px] font-gvf font-[700]">Related Product</h2>

        <RelatedProductCarosol products={data}></RelatedProductCarosol>
      </div>
    </div>
  );
};

export default ProductShowCase;
