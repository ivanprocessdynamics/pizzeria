import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Menu } from "@/components/Menu";
import { Reservations } from "@/components/Reservations";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AnimateIn } from "@/components/AnimateIn";
import { ScrollToTopButton } from "@/components/ScrollToTopButton"; // Importar el nuevo componente
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('inicio');

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.5, rootMargin: '-50px 0px -50px 0px' });
  const { ref: menuRef, inView: menuInView } = useInView({ threshold: 0.5, rootMargin: '-50px 0px -50px 0px' });
  const { ref: reservationsRef, inView: reservationsInView } = useInView({ threshold: 0.5, rootMargin: '-50px 0px -50px 0px' });
  const { ref: galleryRef, inView: galleryInView } = useInView({ threshold: 0.5, rootMargin: '-50px 0px -50px 0px' });
  const { ref: reviewsRef, inView: reviewsInView } = useInView({ threshold: 0.5, rootMargin: '-50px 0px -50px 0px' });
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.5, rootMargin: '-50px 0px -50px 0px' });
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.5, rootMargin: '-50px 0px -50px 0px' });

  useEffect(() => {
    if (contactInView) setActiveSection('contacto');
    else if (aboutInView) setActiveSection('nosotros');
    else if (reviewsInView) setActiveSection('reseñas');
    else if (galleryInView) setActiveSection('galeria');
    else if (reservationsInView) setActiveSection('reservas');
    else if (menuInView) setActiveSection('menu');
    else if (heroInView) setActiveSection('inicio');
  }, [heroInView, menuInView, reservationsInView, galleryInView, reviewsInView, aboutInView, contactInView]);

  return (
    <div className="bg-white text-gray-800">
      <Header activeSection={activeSection} />
      <main>
        <div id="inicio" ref={heroRef}>
          <AnimateIn direction="none" delay={0.2}>
            <Hero />
          </AnimateIn>
        </div>
        <div id="menu" ref={menuRef}>
          <Menu />
        </div>
        <div id="reservas" ref={reservationsRef}>
          <Reservations />
        </div>
        <div id="galeria" ref={galleryRef}>
          <Gallery />
        </div>
        <div id="reseñas" ref={reviewsRef}>
          <Reviews />
        </div>
        <div id="nosotros" ref={aboutRef}>
          <About />
        </div>
        <div id="contacto" ref={contactRef}>
          <Contact />
        </div>
      </main>
      <Footer />
      <ScrollToTopButton /> {/* Añadir el botón de volver arriba */}
    </div>
  );
};

export default Index;