"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";

interface Review {
  name: string;
  rating: number;
  comment: string;
}

const reviews: Review[] = [
  {
    name: "Ana García",
    rating: 5,
    comment: "¡La mejor pizza que he probado en años! La masa es perfecta y los ingredientes se notan fresquísimos. El ambiente es muy acogedor. Volveremos seguro.",
  },
  {
    name: "Carlos Pérez",
    rating: 5,
    comment: "Un rincón de Italia en plena ciudad. La pizza 'Bella Italia' es una obra de arte. El servicio fue rápido y muy amable. ¡Totalmente recomendado!",
  },
  {
    name: "Laura Martínez",
    rating: 4,
    comment: "Nos encantó la cena. Las pizzas especiales son muy originales y sabrosas. El único 'pero' es que el local estaba un poco lleno, ¡mejor reservar!",
  },
  {
    name: "Miguel Sánchez",
    rating: 5,
    comment: "Siempre que venimos salimos encantados. La atención es de 10 y la calidad de la comida insuperable. ¡Mis hijos adoran la pizza de pepperoni!",
  },
  {
    name: "Sofía Ruiz",
    rating: 5,
    comment: "Un lugar con mucho encanto y una comida deliciosa. Probamos varios platos y todos estaban exquisitos. ¡Sin duda, un referente en la ciudad!",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <Star key={i} fill={i < rating ? "currentColor" : "none"} className="h-5 w-5" />
    ))}
  </div>
);

export const FeaturedTestimonials: React.FC = () => {
  return (
    <AnimateIn direction="bottom" delay={0.2}>
      <div className="max-w-3xl mx-auto mb-16">
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index}>
                <Card className="bg-white border-gray-200 shadow-lg p-6 md:p-8">
                  <CardHeader className="flex flex-col items-center text-center pb-4">
                    <Quote className="h-10 w-10 text-red-600 mb-4" />
                    <p className="text-xl md:text-2xl italic text-gray-800 leading-relaxed mb-4">
                      "{review.comment}"
                    </p>
                    <StarRating rating={review.rating} />
                  </CardHeader>
                  <CardContent className="text-center pt-4">
                    <p className="font-bold text-lg text-green-800">- {review.name}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </AnimateIn>
  );
};