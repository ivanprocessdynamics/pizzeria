import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";
import { FeaturedTestimonials } from "@/components/FeaturedTestimonials";

const reviews = [
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
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 text-yellow-400" aria-label={`Valoración de ${rating} estrellas`}>
    {[...Array(5)].map((_, i) => (
      <Star key={i} fill={i < rating ? "currentColor" : "none"} className="h-5 w-5" aria-hidden="true" />
    ))}
  </div>
);

export const Reviews = () => {
  return (
    <section id="reseñas" className="py-12 md:py-24 bg-white" aria-label="Sección de opiniones de clientes">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimateIn direction="bottom" delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-red-700">Lo que dicen nuestros clientes</h2>
          </AnimateIn>
          <AnimateIn direction="bottom" delay={0.1}>
            <p className="text-lg text-gray-600 mt-2">Nuestra mayor satisfacción es tu sonrisa.</p>
          </AnimateIn>
        </div>

        <FeaturedTestimonials />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <AnimateIn key={index} direction="bottom" delay={0.1 * index}>
              <Card className="flex flex-col justify-between bg-stone-50/50 border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300" aria-label={`Reseña de ${review.name}`}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg text-green-800">{review.name}</p>
                    <StarRating rating={review.rating} />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex gap-2">
                    <Quote className="h-8 w-8 text-gray-300 flex-shrink-0" aria-hidden="true" />
                    <p className="text-gray-700 italic">"{review.comment}"</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">Reseña de Google</p>
                </CardFooter>
              </Card>
            </AnimateIn>
          ))}
        </div>
        <div className="text-center mt-12">
          <AnimateIn direction="bottom" delay={0.4}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold" aria-label="Leer más opiniones en Google">
                Leer más opiniones en Google
              </Button>
            </a>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};