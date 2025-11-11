"use client";

import React, { useState, useRef } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { motion, useScroll, useTransform } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton"; // Importar Skeleton

export const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1935&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579751626657-72bc17c154f1?q=80&w=1974&auto=format&fit=crop",
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yTransforms = [
    useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]),
    useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]),
    useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]),
    useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]),
  ];

  return (
    <section id="galeria" className="py-12 md:py-24 bg-stone-50 overflow-hidden" ref={ref} aria-label="Galería de imágenes de nuestro restaurante">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimateIn direction="bottom" delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-green-700">Nuestros Momentos</h2>
          </AnimateIn>
          <AnimateIn direction="bottom" delay={0.1}>
            <p className="text-lg text-gray-600 mt-2">Un vistazo a nuestra casa</p>
          </AnimateIn>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <AnimateIn key={index} direction="bottom" delay={0.1 * index}>
              <motion.div style={{ y: yTransforms[index % yTransforms.length] }} className="overflow-hidden rounded-lg shadow-lg relative h-full w-full">
                <ImageWithSkeleton src={src} alt={`Galería de Pizzería ${index + 1}`} />
              </motion.div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
};

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-full aspect-square">
      {!imageLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};