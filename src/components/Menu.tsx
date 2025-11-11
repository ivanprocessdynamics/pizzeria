"use client";

import React, { useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimateIn } from "@/components/AnimateIn";
import { Skeleton } from "@/components/ui/skeleton"; // Importar Skeleton

const menuData = {
  pizzas: [
    { name: "Pizza Margarita", ingredients: "Salsa de tomate, mozzarella fresca, albahaca", price: "€10.50", image: "https://images.pexels.com/photos/428355/pexels-photo-428355.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { name: "Pizza Pepperoni", ingredients: "Salsa de tomate, mozzarella, pepperoni picante", price: "€12.00", image: "https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { name: "Pizza Cuatro Quesos", ingredients: "Mozzarella, gorgonzola, parmesano, provolone", price: "€13.50", image: "https://images.pexels.com/photos/140134/pexels-photo-140134.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { name: "Pizza Hawaiana", ingredients: "Salsa de tomate, mozzarella, jamón, piña", price: "€12.50", image: "https://images.pexels.com/photos/1527600/pexels-photo-1527600.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { name: "Calzone Relleno", ingredients: "Pizza cerrada rellena de mozzarella, ricotta y salami", price: "€13.00", image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Calzone.jpg" },
  ],
  postres: [
    { name: "Tiramisú Casero", ingredients: "El clásico postre italiano con café y mascarpone", price: "€6.00", image: "https://images.pexels.com/photos/29066516/pexels-photo-29066516.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { name: "Panna Cotta con Frutos del Bosque", ingredients: "Suave crema italiana con salsa de frutos rojos", price: "€5.50", image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Panna_cotta.jpg" },
    { name: "Helado Artesanal", ingredients: "3 bolas de gelato italiano casero", price: "€5.00", image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Gelato_al_cioccolato_e_pistacchio.jpg" },
  ],
  bebidas: [
    { name: "Vino Chianti", ingredients: "Vino tinto italiano de la Toscana", price: "€5.00/copa", image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Glass_of_red_wine.jpg" },
    { name: "Cerveza Italiana", ingredients: "Peroni, Moretti", price: "€4.00", image: "https://images.pexels.com/photos/1672304/pexels-photo-1672304.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { name: "Refrescos", ingredients: "Coca-Cola, Fanta, Sprite, Agua", price: "€3.00", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Soft_drinks.jpg" },
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