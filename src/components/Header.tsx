"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu as MenuIcon, Pizza } from "lucide-react";
import React, { useState, useEffect } from "react";

const ItalianFlag = () => (
  <div className="flex w-6 h-4 rounded-sm overflow-hidden shadow">
    <div className="w-1/3 bg-green-600"></div>
    <div className="w-1/3 bg-white"></div>
    <div className="w-1/3 bg-red-600"></div>
  </div>
);

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#menu", label: "Menú" },
    { href: "#reservas", label: "Reservas" },
    { href: "#galeria", label: "Galería" },
    { href: "#reseñas", label: "Opiniones" },
    { href: "#nosotros", label: "Quiénes Somos" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header className={`bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`} aria-label="Navegación principal">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#inicio" className="flex items-center gap-3 text-xl font-bold text-gray-800" aria-label="Ir a la sección de inicio">
          <Pizza className="h-8 w-8 text-red-600" />
          <span>Pizzería Bella Italia</span>
          <ItalianFlag />
        </a>

        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-gray-700 hover:text-red-600 transition-colors font-medium ${activeSection === link.href.substring(1) ? 'text-red-600 font-bold' : ''}`}
              aria-label={`Ir a la sección ${link.label}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://glovoapp.com/es/es" target="_blank" rel="noopener noreferrer">
            <Button className="hidden md:inline-flex bg-green-600 hover:bg-green-700 text-white font-bold" aria-label="Pedir comida online a través de Glovo">
              Pedir Online
            </Button>
          </a>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Abrir menú de navegación">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-6 mt-8" aria-label="Menú de navegación móvil">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`text-lg text-gray-700 hover:text-red-600 transition-colors font-medium ${activeSection === link.href.substring(1) ? 'text-red-600 font-bold' : ''}`}
                      aria-label={`Ir a la sección ${link.label}`}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a href="https://glovoapp.com/es/es" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-green-600 hover:bg-green-700 text-white font-bold mt-4 w-full" aria-label="Pedir comida online a través de Glovo">
                      Pedir Online
                    </Button>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};