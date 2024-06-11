import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComponentsCarouselNavigation from "../../components/ComponentsCarouselNavigation";
import { images } from "./imageByIndex";
import { Component } from "react";

const HomeHeader = () => {
  const images = [
    "photos/monteverde/monteverde-1.jpg",
    "photos/monteverde/monteverde-2.jpg",
    "photos/monteverde/monteverde-3.jpg",
    "photos/monteverde/monteverde-4.jpg",
  ];

  const [imageIndex, setImageIndex] = useState(0);
  const nextImage = () => {
    setImageIndex((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setImageIndex(
      (prevImage) => (prevImage - 1 + images.length) % images.length,
    );
  };

  return (
    <div className="relative h-screen w-screen">
      <AnimatePresence initial={false}>
        {images.map(
          (image, index) =>
            index === imageIndex && (
              <motion.img
                key={index}
                src={image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                loading="lazy"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ),
        )}
      </AnimatePresence>
      <div className="absolute top-0 h-1/2 w-full bg-gradient-to-t from-transparent to-zinc-600 "></div>
      <motion.div
        className="absolute inset-x-0 top-28 flex items-center justify-center text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div>
          <h1 className="text-6xl">A Brilliant Move</h1>
          <p className="mt-2 text-xl">
            Discover the differences that set Verde Two apart from the rest
          </p>
        </div>
      </motion.div>
      <div className="absolute flex h-full w-full flex-col justify-between px-4 py-24 text-white md:px-24 lg:justify-end">
        <ComponentsCarouselNavigation
          prevImage={prevImage}
          nextImage={nextImage}
          selected={imageIndex}
          total={images.length}
        />
      </div>
    </div>
  );
};

export default HomeHeader;