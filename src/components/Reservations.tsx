"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimateIn } from "@/components/AnimateIn";
import { cn } from "@/lib/utils";
import { showSuccess } from "@/utils/toast";

export const Reservations = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState<string>("2");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);

  const timeOptions = [];
  for (let h = 18; h <= 23; h++) {
    timeOptions.push(`${h}:00`);
    if (h < 23) {
      timeOptions.push(`${h}:30`);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, phone, guests, date, time });
    showSuccess("¡Reserva confirmada! Te esperamos.");
    setName("");
    setPhone("");
    setGuests("2");
    setDate(undefined);
    setTime(undefined);
  };

  return (
    <section id="reservas" className="py-12 md:py-24" aria-label="Sección de reservas de mesa">
      <div className="container mx-auto px-4">
        <AnimateIn direction="bottom" delay={0}>
          <Card className="max-w-2xl mx-auto bg-gray-50/50 border-gray-200">
            <CardHeader className="text-center">
              <AnimateIn direction="bottom" delay={0.1}>
                <CardTitle className="text-3xl md:text-4xl font-bold text-red-700">Reserva tu Mesa</CardTitle>
              </AnimateIn>
              <AnimateIn direction="bottom" delay={0.2}>
                <CardDescription>Asegura tu lugar y vive la experiencia Bella Italia.</CardDescription>
              </AnimateIn>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulario de reserva de mesa">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimateIn direction="left" delay={0.3}>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input id="name" placeholder="Tu nombre completo" value={name} onChange={(e) => setName(e.target.value)} required aria-required="true" aria-label="Campo de nombre" />
                    </div>
                  </AnimateIn>
                  <AnimateIn direction="right" delay={0.4}>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" type="tel" placeholder="Tu número de teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} required aria-required="true" aria-label="Campo de teléfono" />
                    </div>
                  </AnimateIn>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AnimateIn direction="bottom" delay={0.5}>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Personas</Label>
                      <Select value={guests} onValueChange={setGuests} required>
                        <SelectTrigger id="guests" aria-label="Número de personas para la reserva">
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(10)].map((_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </AnimateIn>
                  <AnimateIn direction="bottom" delay={0.6}>
                    <div className="space-y-2">
                      <Label htmlFor="date">Fecha</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                            aria-label="Seleccionar fecha de reserva"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            locale={es}
                            aria-label="Calendario para seleccionar la fecha"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </AnimateIn>
                  <AnimateIn direction="bottom" delay={0.7}>
                    <div className="space-y-2">
                      <Label htmlFor="time">Hora</Label>
                      <Select value={time} onValueChange={setTime} required>
                        <SelectTrigger id="time" aria-label="Seleccionar hora de reserva">
                          <SelectValue placeholder="Selecciona una hora" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </AnimateIn>
                </div>
                <AnimateIn direction="bottom" delay={0.8}>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6 mt-4" aria-label="Confirmar reserva">
                    Confirmar Reserva
                  </Button>
                </AnimateIn>
              </form>
            </CardContent>
          </Card>
        </AnimateIn>
      </div>
    </section>
  );
};