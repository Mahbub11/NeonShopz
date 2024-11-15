"use client";

// components/HeroCarousel.tsx

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroCarousel = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample texts corresponding to each image
  const texts = [
    "Welcome to EllaShop! Discover Amazing Products",
    "Quality You Can Trust. Your Style, Your Choice",
    "Shop with Confidence. Explore Our Collections",
    "Exclusive Offers Await You. Shop Now!",
    "Find Your Perfect Match. Start Shopping Today!",
  ];

  // Fetch images from the API
  useEffect(() => {
    const fetchImages = async () => {
      const imageUrls = await Promise.all(
        Array.from({ length: 5 }, (_, index) =>
          fetch(`https://picsum.photos/800/400?random=${index}`).then(
            (res) => res.url
          )
        )
      );
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, [images]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative overflow-hidden h-[50vh] w-full">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-live="polite"
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            onError={(e) => {
              e.currentTarget.src = "/images/fallback.jpg"; // Fallback image
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              key={currentIndex} // Reset animation on index change
              className="text-white text-3xl font-bold text-center"
              initial={{ y: 50, opacity: 0 }} // Start below the view
              animate={{
                y: 0, // Move to the original position
                opacity: 1, // Fade in
              }}
              exit={{ y: 50, opacity: 0 }} // Move out to the bottom and fade out
              transition={{ duration: 1 }} // Animation duration
            >
              <p className="line-clamp-2">{texts[currentIndex]}</p> {/* Ensures 2 lines */}
            </motion.div>
          </div>
        </motion.div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer transition duration-200 ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => handleDotClick(index)} // Make dots clickable
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
