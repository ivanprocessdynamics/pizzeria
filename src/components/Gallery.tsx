"use client";

import React, { useEffect, useState, useRef } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { motion, useScroll, useTransform } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton"; // Importar Skeleton

export const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1935&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579751626657-72bc17c154f1?q=80&w=1974&auto=format&fit=crop",
    "https://www.istockphoto.com/photo/dolly-shot-close-up-of-nice-dining-chair-with-wooden-table-and-dish-sets-interior-gm1454811153-490341654?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_portrait_media&utm_term=restaurant",
    "https://www.istockphoto.com/photo/empty-rustic-design-restaurant-with-wooden-furniture-and-some-decorative-plants-gm1343182422-422093007?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_portrait_media&utm_term=restaurant",
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

const normalizeIstockPageToMedia = (url: string) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("istockphoto.com") && u.pathname.includes("/photo/")) {
      const m = u.pathname.match(/\/photo\/([^/]+)-gm(\d+)/i);
      if (m) {
        const slug = m[1];
        const id = m[2];
        return `https://media.istockphoto.com/id/${id}/photo/${slug}.jpg?b=1&s=612x612&w=0&k=20`;
      }
    }
    return url;
  } catch {
    return url;
  }
};

const optimizeImageSrc = (url: string) => {
  try {
    const normalized = normalizeIstockPageToMedia(url);
    const u = new URL(normalized);
    const heavyHosts = ["images.unsplash.com", "images.pexels.com", "media.istockphoto.com", "www.istockphoto.com"];
    if (heavyHosts.includes(u.hostname)) {
      const encoded = encodeURIComponent(normalized);
      return `https://wsrv.nl/?url=${encoded}&w=800&h=800&fit=cover&output=webp`;
    }
    return normalized;
  } catch {
    return url;
  }
};

const FALLBACK_IMG = "https://placehold.co/800x800?text=Imagen";

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>(FALLBACK_IMG);
  const optimized = optimizeImageSrc(src);

  useEffect(() => {
    let cancelled = false;
    const pre = new Image();
    pre.referrerPolicy = "no-referrer";
    pre.onload = () => { if (!cancelled) { setCurrentSrc(optimized); setImageLoaded(true); } };
    pre.onerror = () => { if (!cancelled) { setCurrentSrc(FALLBACK_IMG); setImageLoaded(true); } };
    pre.src = optimized;
    return () => { cancelled = true; };
  }, [optimized]);

  return (
    <div className="relative w-full h-full aspect-square">
      {!imageLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};