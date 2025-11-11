"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay"; // Importar el plugin de autoplay

export const Hero = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
      title: "La Tradición Italiana en Cada Bocado",
      subtitle: "Pizzas artesanales horneadas a la leña con ingredientes frescos.",
    },
    {
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
      title: "Sabor que Une a la Familia",
      subtitle: "El lugar perfecto para compartir momentos inolvidables.",
    },
    {
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop",
      title: "Ingredientes Frescos, Pasión Verdadera",
      subtitle: "Seleccionamos lo mejor de la tierra para llevarlo a tu mesa.",
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const currentBackgroundImage = slides[currentSlide].image;

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-fixed transition-all duration-500 ease-in-out"
      style={{ backgroundImage: `url(${currentBackgroundImage})` }}
      aria-label="Sección de inicio con carrusel de promociones"
    >
      <div className="absolute inset-0 bg-black/50"></div> {/* Overlay for readability */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center"> {/* Center content */}
        <Carousel 
          className="w-full h-full" 
          opts={{ loop: true }} 
          plugins={[
            Autoplay({
              delay: 4000, // Cambia cada 4 segundos
              stopOnInteraction: false, // No se detiene al interactuar
              stopOnMouseEnter: true, // Se detiene si el ratón está encima
            }),
          ]}
          setApi={setApi} 
          aria-label="Carrusel de imágenes promocionales"
        >
          <CarouselContent className="h-full">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="h-full">
                <div
                  className="relative h-full w-full flex flex-col items-center justify-center text-center text-white p-4"
                  aria-label={`Slide ${index + 1}: ${slide.title}`}
                >
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">{slide.title}</h1>
                  <p className="mt-4 text-lg md:text-xl max-w-2xl">{slide.subtitle}</p>
                  <div className="mt-8 flex gap-4">
                    <a href="#menu">
                      <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold" aria-label="Ver nuestro menú">
                        Ver Menú
                      </Button>
                    </a>
                    <a href="#reservas">
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-red-600 border-red-600 bg-white hover:bg-red-600 hover:text-white font-bold"
                        aria-label="Reservar una mesa"
                      >
                        Reservar Mesa
                      </Button>
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" aria-label="Diapositiva anterior" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" aria-label="Diapositiva siguiente" />
        </Carousel>
      </div>
    </section>
  );
};