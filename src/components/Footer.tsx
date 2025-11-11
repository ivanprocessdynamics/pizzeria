import { Pizza, Facebook, Instagram, Twitter } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8" aria-label="Pie de página">
      <div className="container mx-auto px-4 text-center">
        <AnimateIn direction="bottom" delay={0}>
          <div className="flex justify-center items-center gap-2 text-xl font-bold mb-4">
            <Pizza className="h-8 w-8 text-red-500" aria-hidden="true" />
            <span>Pizzería Bella Italia</span>
          </div>
        </AnimateIn>
        <AnimateIn direction="bottom" delay={0.1}>
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="hover:text-green-400 transition-colors" aria-label="Visitar nuestra página de Facebook"><Facebook /></a>
            <a href="#" className="hover:text-green-400 transition-colors" aria-label="Visitar nuestro perfil de Instagram"><Instagram /></a>
            <a href="#" className="hover:text-green-400 transition-colors" aria-label="Visitar nuestro perfil de Twitter"><Twitter /></a>
          </div>
        </AnimateIn>
        <AnimateIn direction="bottom" delay={0.2}>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Pizzería Bella Italia. Todos los derechos reservados.</p>
        </AnimateIn>
      </div>
    </footer>
  );
};