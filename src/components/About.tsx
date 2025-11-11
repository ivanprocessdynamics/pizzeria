"use client";

import React from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { motion, useScroll, useTransform } from "framer-motion";

export const About = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); // Movimiento vertical sutil

  return (
    <section id="nosotros" className="py-12 md:py-24 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimateIn direction="left" delay={0}>
            <motion.div style={{ y }} className="relative h-full w-full">
              <img 
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop" 
                alt="Interior de la pizzería"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </motion.div>
          </AnimateIn>
          <div className="text-center md:text-left">
            <AnimateIn direction="right" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-green-700">Nuestra Historia</h2>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <div className="w-24 h-1 bg-red-600 my-4 mx-auto md:mx-0"></div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.3}>
              <p className="text-gray-700 leading-relaxed mb-4">
                Desde 1985, Pizzería Bella Italia ha sido el sueño de la familia Rossi, hecho realidad. Trajimos desde Nápoles las recetas de nuestra nonna, con el secreto de una masa fermentada lentamente y el amor por los ingredientes frescos y locales.
              </p>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.4}>
              <p className="text-gray-700 leading-relaxed">
                Cada pizza que servimos es un homenaje a nuestra herencia, un pedazo de Italia en tu mesa. Somos más que una pizzería; somos un lugar de encuentro, de celebraciones y de buenos recuerdos. ¡Benvenuti a casa!
              </p>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
};