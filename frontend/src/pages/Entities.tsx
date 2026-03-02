
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import Header from "@/components/Header";
import { apiUrl } from "@/lib/api";

type Association = {
  _id: string;
  name: string;
  activityTypes?: string[];
};

const hoverAccents = new Array(12).fill("hover:border-magenta/40");

const Entities = () => {
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

  const others = associations.slice(12);

  return (
    <main className="min-h-screen pt-24 pb-12 bg-muted" ref={ref}>
      <Header />
      <div className="container mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-8"
        >
          <h1 className="text-2xl font-bold">Entidades da Rede ({others.length} restantes)</h1>
          <p className="mt-2 text-muted-foreground">Lista completa das entidades não exibidas no destaque.</p>
        </motion.header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {others.map((association, i) => (
            <motion.div key={association._id} initial={{ opacity: 0, scale: 0.98 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.03 }}>
              <Dialog open={selected === i} onOpenChange={(open) => setSelected(open ? i : null)}>
                <DialogTrigger asChild>
                  <div className={`group bg-background border border-border rounded-xl p-4 text-center ${hoverAccents[i % hoverAccents.length]} hover:shadow transition-all cursor-pointer`}>
                    <Heart className="w-6 h-6 text-muted-foreground mx-auto mb-2 group-hover:text-primary" />
                    <p className="text-sm font-semibold text-foreground">{association.name}</p>
                    <span className="text-xs text-muted-foreground mt-1 inline-block">{(association.activityTypes || []).join(", ") || "Atuação social"}</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{association.name}</DialogTitle>
                    <DialogDescription>{(association.activityTypes || []).join(", ") || "Atuação social"}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-2 text-sm text-muted-foreground">Entidade ativa da rede FEAPP.</div>
                  <DialogClose asChild>
                    <button className="mt-4 inline-flex items-center rounded-md bg-primary px-3 py-1 text-sm text-white">Fechar</button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Entities;
