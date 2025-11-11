import { MapPin, Phone, Mail } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";

export const Contact = () => {
  const address = "Carrer de l'Alcalde Costa, 11, 25002 Lleida";

  return (
    <section id="contacto" className="py-12 md:py-24 bg-stone-50" aria-label="Sección de contacto y ubicación">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimateIn direction="bottom" delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-red-700">Encuéntranos</h2>
          </AnimateIn>
          <AnimateIn direction="bottom" delay={0.1}>
            <p className="text-lg text-gray-600 mt-2">¡Estamos esperándote!</p>
          </AnimateIn>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <AnimateIn direction="left" delay={0.2}>
              <h3 className="text-2xl font-semibold mb-4 text-green-700">Información de Contacto</h3>
            </AnimateIn>
            <div className="space-y-4 text-lg">
              <AnimateIn direction="left" delay={0.3}>
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-green-600" aria-hidden="true" />
                  <span aria-label={`Dirección: ${address}`}>{address}</span>
                </div>
              </AnimateIn>
              <AnimateIn direction="left" delay={0.4}>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-green-600" aria-hidden="true" />
                  <span aria-label="Número de teléfono: más treinta y cuatro, novecientos setenta y tres, veintidós, diez, diecinueve">+34 973 22 10 19</span>
                </div>
              </AnimateIn>
              <AnimateIn direction="left" delay={0.5}>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-green-600" aria-hidden="true" />
                  <span aria-label="Correo electrónico: reservas arroba bellapizzeria punto it">reservas@bellapizzeria.it</span>
                </div>
              </AnimateIn>
            </div>

            <AnimateIn direction="left" delay={0.6}>
              <h3 className="text-2xl font-semibold mt-8 mb-4 text-green-700">Horario</h3>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.7}>
              <p className="text-lg" aria-label="Horario de apertura">
                <strong>Lunes a Jueves:</strong> 18:00 - 23:00<br/>
                <strong>Viernes a Domingo:</strong> 12:00 - 00:00
              </p>
            </AnimateIn>
          </div>
          <AnimateIn direction="right" delay={0.8}>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.393419592887!2d0.6210436154349375!3d41.62259987924318!2m3!1f0!2f0!0f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a6e04111e4285f%3A0x15da959a3deda32c!2s'O%20Sole%20Mio'!5e0!3m2!1ses!2ses"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de la pizzería en Google Maps"
                aria-label="Mapa de Google con la ubicación de la pizzería"
              ></iframe>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};