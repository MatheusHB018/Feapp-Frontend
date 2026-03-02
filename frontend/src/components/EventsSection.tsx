import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PartyPopper } from "lucide-react";
import { apiUrl } from "@/lib/api";

type EventItem = {
  _id: string;
  name: string;
  date: string;
  description?: string;
  location: string;
};

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(apiUrl("/api/events/public"));
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erro ao carregar eventos");
        }

        setEvents(data.data || []);
      } catch {
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section id="eventos" ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Mobilização Social e Eventos Solidários
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Nossa missão é criar oportunidades para que a comunidade ajude.
            Organizamos eventos de grande porte que revertem diversão em doações.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {events.map((event, i) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative bg-card rounded-2xl p-8 shadow-card border border-border/50 hover:shadow-warm transition-shadow group"
            >
              {event.date && (
                <span className="absolute -top-3 left-6 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {new Date(event.date).toLocaleDateString("pt-BR", { month: "long", day: "2-digit" })}
                </span>
              )}
              <PartyPopper className="w-10 h-10 text-primary mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {event.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {event.description || `Evento em ${event.location}`}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
