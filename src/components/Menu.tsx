"use client";

import React, { useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimateIn } from "@/components/AnimateIn";
import { Skeleton } from "@/components/ui/skeleton"; // Importar Skeleton

const menuData = {
  clasicas: [
    { name: "Margherita", ingredients: "Salsa de tomate, mozzarella fresca, albahaca", price: "€10.50", image: "https://images.unsplash.com/photo-1598021680925-92e8f46d8014?q=80&w=1964&auto=format&fit=crop" },
    { name: "Prosciutto", ingredients: "Salsa de tomate, mozzarella, jamón cocido", price: "€12.00", image: "https://images.unsplash.com/photo-1552539618-7eec9b4d1796?q=80&w=2002&auto=format&fit=crop" },
    { name: "Quattro Formaggi", ingredients: "Mozzarella, gorgonzola, parmesano, provolone", price: "€13.50", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop" },
    { name: "Diavola", ingredients: "Salsa de tomate, mozzarella, salami picante", price: "€12.50", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983d34?q=80&w=2070&auto=format&fit=crop" },
    { name: "Capricciosa", ingredients: "Salsa de tomate, mozzarella, jamón, champiñones, alcachofas", price: "€13.00", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96b47?q=80&w=1964&auto=format&fit=crop" },
    { name: "Marinara", ingredients: "Salsa de tomate, ajo, orégano, aceite de oliva", price: "€9.50", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1964&auto=format&fit=crop" },
  ],
  especiales: [
    { name: "Bella Italia", ingredients: "Mozzarella, tomate cherry, rúcula, prosciutto crudo, lascas de parmesano", price: "€15.00", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1935&auto=format&fit=crop" },
    { name: "Tartufo e Funghi", ingredients: "Crema de trufa, mozzarella, champiñones portobello, aceite de trufa", price: "€16.50", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1928&auto=format&fit=crop" },
    { name: "Burratina", ingredients: "Salsa de tomate, burrata fresca, tomates secos, pesto", price: "€15.50", image: "https://images.unsplash.com/photo-1627485810092-7910ea0716c9?q=80&w=1935&auto=format&fit=crop" },
    { name: "Salmone e Avocado", ingredients: "Crème fraîche, salmón ahumado, aguacate, eneldo", price: "€17.00", image: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?q=80&w=1964&auto=format&fit=crop" },
    { name: "Nduja Calabrese", ingredients: "Salsa de tomate, mozzarella, nduja picante, cebolla caramelizada", price: "€14.50", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1964&auto=format&fit=crop" },
  ],
  entrantes: [
    { name: "Bruschetta Italiana", ingredients: "Tomate, albahaca, ajo y aceite de oliva sobre pan crujiente", price: "€6.50", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=1964&auto=format&fit=crop" },
    { name: "Burrata con Tomate", ingredients: "Burrata cremosa, tomates cherry, rúcula y reducción balsámica", price: "€8.50", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=1964&auto=format&fit=crop" },
    { name: "Focaccia con Romero", ingredients: "Pan plano italiano con aceite de oliva, sal marina y romero", price: "€5.00", image: "https://images.unsplash.com/photo-1534353341328-ffa698c5a9dc?q=80&w=1964&auto=format&fit=crop" },
    { name: "Antipasto Misto", ingredients: "Selección de embutidos italianos, quesos y verduras", price: "€12.00", image: "https://images.unsplash.com/photo-1623428454614-abaf00244e52?q=80&w=1964&auto=format&fit=crop" },
  ],
  postres: [
    { name: "Tiramisù", ingredients: "El clásico postre italiano con café y mascarpone", price: "€6.00", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1964&auto=format&fit=crop" },
    { name: "Panna Cotta", ingredients: "Suave crema italiana con salsa de frutos rojos", price: "€5.50", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1964&auto=format&fit=crop" },
    { name: "Cannoli Siciliano", ingredients: "Crujiente pasta rellena de ricotta dulce", price: "€6.50", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1964&auto=format&fit=crop" },
    { name: "Gelato Artesanal", ingredients: "3 bolas de helado italiano casero", price: "€5.00", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1964&auto=format&fit=crop" },
  ],
  bebidas: [
    { name: "Agua Mineral", ingredients: "500ml", price: "€2.50", image: "https://images.unsplash.com/photo-1553564426-7914e7413a55?q=80&w=1964&auto=format&fit=crop" },
    { name: "Refresco", ingredients: "Coca-Cola, Fanta, Sprite", price: "€3.00", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=1964&auto=format&fit=crop" },
    { name: "Cerveza Italiana", ingredients: "Peroni, Moretti", price: "€4.00", image: "https://images.unsplash.com/photo-1617886322207-62a43f5bca3a?q=80&w=1964&auto=format&fit=crop" },
    { name: "Vino de la Casa", ingredients: "Tinto o Blanco", price: "€5.00 / copa", image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1c?q=80&w=1964&auto=format&fit=crop" },
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
          <Tabs defaultValue="clasicas" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-gray-100 max-w-4xl mx-auto" aria-label="Categorías del menú">
              <TabsTrigger value="clasicas" aria-controls="tabpanel-clasicas">Clásicas</TabsTrigger>
              <TabsTrigger value="especiales" aria-controls="tabpanel-especiales">Especiales</TabsTrigger>
              <TabsTrigger value="entrantes" aria-controls="tabpanel-entrantes">Entrantes</TabsTrigger>
              <TabsTrigger value="postres" aria-controls="tabpanel-postres">Postres</TabsTrigger>
              <TabsTrigger value="bebidas" aria-controls="tabpanel-bebidas">Bebidas</TabsTrigger>
            </TabsList>
            <TabsContent value="clasicas" id="tabpanel-clasicas" role="tabpanel">
              {renderMenuItems(menuData.clasicas)}
            </TabsContent>
            <TabsContent value="especiales" id="tabpanel-especiales" role="tabpanel">
              {renderMenuItems(menuData.especiales)}
            </TabsContent>
            <TabsContent value="entrantes" id="tabpanel-entrantes" role="tabpanel">
              {renderMenuItems(menuData.entrantes)}
            </TabsContent>
            <TabsContent value="postres" id="tabpanel-postres" role="tabpanel">
              {renderMenuItems(menuData.postres)}
            </TabsContent>
            <TabsContent value="bebidas" id="tabpanel-bebidas" role="tabpanel">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
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