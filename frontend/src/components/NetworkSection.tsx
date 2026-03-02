import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { apiUrl } from "@/lib/api";

type Association = {
  _id: string;
  name: string;
  activityTypes?: string[];
};

const hoverAccents = [
  "hover:border-magenta/40",
  "hover:border-gold/40",
  "hover:border-turquoise/40",
  "hover:border-orange/40",
  "hover:border-sky-blue/40",
  "hover:border-magenta/40",
  "hover:border-gold/40",
  "hover:border-turquoise/40",
  "hover:border-orange/40",
  "hover:border-sky-blue/40",
  "hover:border-magenta/40",
  "hover:border-gold/40",
];

const NetworkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<number | null>(null);
  const [associations, setAssociations] = useState<Association[]>([]);

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const response = await fetch(apiUrl("/api/associations/public"));
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erro ao carregar entidades");
        }

        setAssociations(data.data || []);
      } catch {
        setAssociations([]);
      }
    };

    fetchAssociations();
  }, []);

  const featuredAssociations = associations.slice(0, 12);
  const remainingCount = Math.max(associations.length - featuredAssociations.length, 0);

  return (
    <section id="entidades" ref={ref} className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Uma rede do bem: <span className="text-primary">{associations.length || 0} causas</span>, um só coração.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Cada doação feita à FEAPP é distribuída entre as entidades federadas,
            garantindo que o máximo de pessoas seja alcançado. Clique em qualquer
            entidade para ver a descrição completa ou acesse a lista completa.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {featuredAssociations.map((association, i) => (
            <motion.div
              key={association._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Dialog open={selected === i} onOpenChange={(open) => setSelected(open ? i : null)}>
                <DialogTrigger asChild>
                  <div className={`group bg-background border border-border rounded-xl p-4 text-center ${hoverAccents[i]} hover:shadow-warm transition-all cursor-pointer grayscale hover:grayscale-0`}>
                    <Heart className="w-6 h-6 text-muted-foreground mx-auto mb-2 group-hover:text-primary group-hover:scale-110 transition-all" />
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {association.name}
                    </p>
                    <span className="text-xs text-muted-foreground mt-1 inline-block">
                      {(association.activityTypes || []).join(", ") || "Atuação social"}
                    </span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{association.name}</DialogTitle>
                    <DialogDescription>{(association.activityTypes || []).join(", ") || "Atuação social"}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Entidade ativa da rede FEAPP.
                  </div>
                  <DialogClose asChild>
                    <button className="mt-4 inline-flex items-center rounded-md bg-primary px-3 py-1 text-sm text-white">Fechar</button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <Link to="/entidades" className="inline-block rounded-md border border-border px-4 py-2 text-sm hover:bg-accent">Ver as {remainingCount} entidades restantes</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NetworkSection;
