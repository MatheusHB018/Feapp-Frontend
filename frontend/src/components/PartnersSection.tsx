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
import { partners as staticPartners } from "@/data/partners";

type Partner = {
  _id?: string;
  id?: string;
  name: string;
  website?: string;
  logoUrl?: string;
  description?: string;
  sectors?: string[];
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
};

const hoverAccents = [
  "hover:border-gold/40",
  "hover:border-turquoise/40",
  "hover:border-orange/40",
  "hover:border-sky-blue/40",
  "hover:border-magenta/40",
];

const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<number | null>(null);
  const [partners, setPartners] = useState<Partner[]>(staticPartners);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(apiUrl("/api/partners/public"));
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Erro ao carregar parceiros");

        if (data.data && data.data.length > 0) {
          setPartners(data.data);
        }
      } catch {
        // Mantém os dados estáticos em caso de erro
      }
    };

    fetchPartners();
  }, []);

  const featured = partners.slice(0, 8);
  const remainingCount = Math.max(partners.length - featured.length, 0);

  return (
    <section id="parceiros" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Empresas Parceiras: <span className="text-primary">{partners.length}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Empresas que apoiam a FEAPP com patrocínio, estrutura e divulgação — conheça algumas das parceiras.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {featured.map((partner, i) => (
            <motion.div key={partner._id ?? partner.id ?? i} initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Dialog open={selected === i} onOpenChange={(open) => setSelected(open ? i : null)}>
                <DialogTrigger asChild>
                  <div className={`group bg-background border border-border rounded-xl p-4 text-center ${hoverAccents[i % hoverAccents.length]} hover:shadow transition-all cursor-pointer`}> 
                    {partner.logoUrl ? (
                      <img src={partner.logoUrl} alt={partner.name} className="w-12 h-12 object-contain mx-auto mb-2" />
                    ) : (
                      <Heart className="w-6 h-6 text-muted-foreground mx-auto mb-2 group-hover:text-primary" />
                    )}
                    <p className="text-sm font-semibold text-foreground leading-tight">{partner.name}</p>
                    <span className="text-xs text-muted-foreground mt-1 inline-block">{(partner.sectors || []).join(', ') || 'Parceiro'}</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{partner.name}</DialogTitle>
                    <DialogDescription>{(partner.sectors || []).join(', ') || 'Setor'}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-2 text-sm text-muted-foreground">{partner.description || 'Parceiro institucional da FEAPP.'}</div>
                  <div className="mt-3 text-sm text-muted-foreground">
                    {partner.contactName && <div>Contato: {partner.contactName}</div>}
                    {partner.contactEmail && <div>E-mail: {partner.contactEmail}</div>}
                    {partner.contactPhone && <div>Telefone: {partner.contactPhone}</div>}
                  </div>
                  <div className="mt-3">
                    {partner.website && (
                      <a className="inline-flex items-center gap-2 text-sm text-primary" href={partner.website} target="_blank" rel="noreferrer">
                        Visitar site
                      </a>
                    )}
                  </div>
                  <DialogClose asChild>
                    <button className="mt-4 inline-flex items-center rounded-md bg-primary px-3 py-1 text-sm text-white">Fechar</button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>

        {remainingCount > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} className="text-center mt-8">
            <Link to="/parceiros" className="inline-block rounded-md border border-border px-4 py-2 text-sm hover:bg-accent">Ver os {remainingCount} parceiros restantes</Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PartnersSection;
