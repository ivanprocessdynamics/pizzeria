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
    "https://plus.unsplash.com/premium_photo-1674147605306-7192b6208609?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

const fetchIstockOgImage = async (pageUrl: string): Promise<string | null> => {
  try {
    const proxied = `https://r.jina.ai/http://${pageUrl.replace(/^https?:\/\//, "")}`;
    const res = await fetch(proxied, { cache: "no-store" });
    if (!res.ok) return null;
    const html = await res.text();
    const re1 = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i;
    const re2 = /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i;
    const re3 = /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["'][^>]*>/i;
    const m = html.match(re1) || html.match(re2) || html.match(re3);
    if (m && m[1]) return m[1];
    return null;
  } catch {
    return null;
  }
};

const isIstockPage = (url: string) => {
  try {
    const u = new URL(url);
    return u.hostname.includes("istockphoto.com") && u.pathname.includes("/photo/");
  } catch {
    return false;
  }
};

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
}

const buildProxy = (raw: string) => `https://wsrv.nl/?url=${encodeURIComponent(raw)}&w=800&h=800&fit=cover&output=webp`;

const candidatesForSrc = (url: string): string[] => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("istockphoto.com") && u.pathname.includes("/photo/")) {
      const m = u.pathname.match(/\/photo\/([^/]+)-gm(\d+)/i);
      if (m) {
        const slug = m[1];
        const id = m[2];
        return [
          buildProxy(`https://media.istockphoto.com/id/${id}/photo/${slug}.jpg?b=1&s=612x612&w=0&k=20`),
          buildProxy(`https://media.istockphoto.com/id/${id}/es/foto/${slug}.jpg?b=1&s=612x612&w=0&k=20`),
        ];
      }
    }
    // Generic proxy for other hosts
    return [buildProxy(url)];
  } catch {
    return [buildProxy(url)];
  }
};

const FALLBACK_IMG = "https://placehold.co/800x800?text=Imagen";

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>(FALLBACK_IMG);

  useEffect(() => {
    let cancelled = false;
    const baseCandidates = candidatesForSrc(src);
    const run = async () => {
      let list = baseCandidates;
      if (isIstockPage(src)) {
        try {
          const resolved = await fetchIstockOgImage(src);
          if (resolved) list = [buildProxy(resolved), ...baseCandidates];
        } catch {}
      }
      let idx = 0;
      const tryNext = () => {
        if (cancelled || idx >= list.length) {
          setCurrentSrc(FALLBACK_IMG);
          setImageLoaded(true);
          return;
        }
        const test = new Image();
        test.referrerPolicy = "no-referrer";
        test.onload = () => { if (!cancelled) { setCurrentSrc(list[idx]); setImageLoaded(true); } };
        test.onerror = () => { idx += 1; tryNext(); };
        test.src = list[idx];
      };
      tryNext();
    };
    run();
    return () => { cancelled = true; };
  }, [src]);

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