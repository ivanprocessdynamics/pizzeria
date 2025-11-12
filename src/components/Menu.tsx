"use client";

import React, { useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimateIn } from "@/components/AnimateIn";
import { Skeleton } from "@/components/ui/skeleton"; // Importar Skeleton

const menuData = {
  pizzas: [
    { name: "Pizza Margarita", ingredients: "Salsa de tomate, mozzarella fresca, albahaca", price: "€10.50", image: "https://cdn.colombia.com/gastronomia/2011/08/25/pizza-margarita-3684.webp" },
    { name: "Pizza Pepperoni", ingredients: "Salsa de tomate, mozzarella, pepperoni picante", price: "€12.00", image: "https://e-leclerc.es/wp-content/uploads/2025/02/Firefly-Pizza-de-Pepperoni-Champinones-y-Albahaca-Fresca-5245.jpg?w=800&quality=75" },
    { name: "Pizza Cuatro Quesos", ingredients: "Mozzarella, gorgonzola, parmesano, provolone", price: "€13.50", image: "https://www.novachef.es/media/images/pizza-cuatro-quesos.jpg" },
    { name: "Pizza Hawaiana", ingredients: "Salsa de tomate, mozzarella, jamón, piña", price: "€12.50", image: "https://www.papajohns.com.pe/media/catalog/product/p/i/pizza-hawaiana.png?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=500&canvas=500:500&format=jpeg" },
    { name: "Calzone Relleno", ingredients: "Pizza cerrada rellena de mozzarella, ricotta y salami", price: "€13.00", image: "https://alicante.com.ar/wp-content/uploads/2023/12/2688_receta.jpg" },
  ],
  postres: [
    { name: "Tiramisú Casero", ingredients: "El clásico postre italiano con café y mascarpone", price: "€6.00", image: "https://www.infobae.com/resizer/v2/JO2JVZL6SZGZVCJ3EOKTYNFTVE.jpg?auth=000034fa1f95a5c10ca0f6f31760967914f327256c836d5a7f3a353e3403102e&smart=true&width=992&height=566&quality=85" },
    { name: "Panna Cotta con Frutos del Bosque", ingredients: "Suave crema italiana con salsa de frutos rojos", price: "€5.50", image: "https://canalcocina.es/medias/publicuploads/2013/12/03/114142/1k132t3qvr9t58nzcjf9.jpg" },
    { name: "Helado Artesanal", ingredients: "3 bolas de gelato italiano casero", price: "€5.00", image: "https://fotografias.antena3.com/clipping/cmsimages01/2022/03/23/C753E5A8-CCA1-4A36-BAD4-025A130EC816/como-saber-realmente-helado-artesanal_97.jpg?crop=910,512,x58,y0&width=800&height=450&optimize=high&format=webply" },
  ],
  bebidas: [
    { name: "Vino Chianti", ingredients: "Vino tinto italiano de la Toscana", price: "€5.00/copa", image: "https://elsouvenir.com/wp-content/uploads/2023/02/vino-chianti-1.jpg" },
    { name: "Cerveza Italiana", ingredients: "Peroni, Moretti", price: "€4.00", image: "https://gastronomia-italiana.es/wp-content/uploads/2021/06/portada_cerveza.jpg" },
    { name: "Refrescos", ingredients: "Coca-Cola, Fanta, Sprite, Agua", price: "€3.00", image: "https://hips.hearstapps.com/hmg-prod/images/refrescos-portada-1653207586.jpg?crop=1.00xw:0.893xh;0,0&resize=1800:*" },
  ],
};

interface MenuItemProps {
  item: {
    name: string;
    ingredients: string;
    price: string;
    image: string;
  };
  isFlipped: boolean;
  onFlip: () => void;
  delay: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isFlipped, onFlip, delay }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <AnimateIn direction="bottom" delay={delay}>
      <div className="w-full h-96 [perspective:1000px] cursor-pointer" onClick={onFlip} aria-label={`Ver detalles de ${item.name}`}>
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        >
          {/* Front */}
          <div className="absolute w-full h-full [backface-visibility:hidden] rounded-lg overflow-hidden shadow-lg">
            {!imageLoaded && <Skeleton className="w-full h-full" />}
            <img
              src={item.image}
              alt={item.name}
              className={`w-full h-full object-cover ${imageLoaded ? 'block' : 'hidden'}`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <h3 className="text-2xl font-bold">{item.name}</h3>
            </div>
          </div>
          {/* Back */}
          <div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-lg overflow-hidden shadow-lg">
            <Card className="w-full h-full flex flex-col justify-between bg-gray-50">
              <CardHeader>
                <CardTitle className="text-green-700 text-2xl">{item.name}</CardTitle>
                <CardDescription className="text-base pt-2">{item.ingredients}</CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="font-bold text-xl text-gray-800">{item.price}</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
};

export const Menu = () => {
  const [flippedCards, setFlippedCards] = useState(new Set<string>());

  const handleFlip = (name: string) => {
    setFlippedCards(prev => {
      const newFlipped = new Set(prev);
      if (newFlipped.has(name)) {
        newFlipped.delete(name);
      } else {
        newFlipped.add(name);
      }
      return newFlipped;
    });
  };

  const renderMenuItems = (category: typeof menuData.clasicas) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {category.map((item, index) => (
        <MenuItem
          key={item.name}
          item={item}
          isFlipped={flippedCards.has(item.name)}
          onFlip={() => handleFlip(item.name)}
          delay={0.1 * index}
        />
      ))}
    </div>
  );

  return (
    <section id="menu" className="py-12 md:py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimateIn direction="bottom" delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-red-700">Nuestro Menú</h2>
          </AnimateIn>
          <AnimateIn direction="bottom" delay={0.1}>
            <p className="text-lg text-gray-600 mt-2">El auténtico sabor de Italia (pulsa en la imagen para ver detalles)</p>
          </AnimateIn>
        </div>
        <AnimateIn direction="bottom" delay={0.2}>
          <Tabs defaultValue="pizzas" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 max-w-2xl mx-auto" aria-label="Categorías del menú">
              <TabsTrigger value="pizzas" aria-controls="tabpanel-pizzas">Pizzas</TabsTrigger>
              <TabsTrigger value="postres" aria-controls="tabpanel-postres">Postres</TabsTrigger>
              <TabsTrigger value="bebidas" aria-controls="tabpanel-bebidas">Bebidas</TabsTrigger>
            </TabsList>
            <TabsContent value="pizzas" id="tabpanel-pizzas" role="tabpanel">
              {renderMenuItems(menuData.pizzas)}
            </TabsContent>
            <TabsContent value="postres" id="tabpanel-postres" role="tabpanel">
              {renderMenuItems(menuData.postres)}
            </TabsContent>
            <TabsContent value="bebidas" id="tabpanel-bebidas" role="tabpanel">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {menuData.bebidas.map((item, index) => (
                  <MenuItem
                    key={item.name}
                    item={item}
                    isFlipped={flippedCards.has(item.name)}
                    onFlip={() => handleFlip(item.name)}
                    delay={0.1 * index}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </AnimateIn>
      </div>
    </section>
  );
};