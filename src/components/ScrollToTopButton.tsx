"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Muestra u oculta el botón basado en el scroll
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Aparece después de 300px de scroll
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Desplaza la página al inicio
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <AnimateIn direction="none" delay={0} duration={0.3}>
      <Button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg bg-red-600 hover:bg-red-700 text-white transition-opacity duration-300 ${
          isVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        size="icon"
        aria-label="Volver al inicio de la página"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </AnimateIn>
  );
};